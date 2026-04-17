import { detectCountry } from './country_detector.js';

const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7일
const CACHE_KEY = 'country_cache';

// ─────────────────────────────────────────────
// 캐시 관리
// ─────────────────────────────────────────────

async function getFromCache(username) {
  const data = await chrome.storage.local.get(CACHE_KEY);
  const cache = data[CACHE_KEY] || {};
  const entry = cache[username];
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) return null;
  if (!Array.isArray(entry.result?.reasons)) return null;
  return entry.result;
}

async function saveToCache(username, result) {
  const data = await chrome.storage.local.get(CACHE_KEY);
  const cache = data[CACHE_KEY] || {};
  cache[username] = { result, timestamp: Date.now() };
  await chrome.storage.local.set({ [CACHE_KEY]: cache });
}

// ─────────────────────────────────────────────
// GitHub API 호출
// ─────────────────────────────────────────────

async function getToken() {
  const data = await chrome.storage.local.get('github_token');
  return data.github_token || null;
}

async function githubFetch(path, token) {
  const headers = { 'Accept': 'application/vnd.github+json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`https://api.github.com${path}`, { headers });

  if (res.status === 403 || res.status === 429) {
    const reset = res.headers.get('X-RateLimit-Reset');
    throw new Error(`rate_limit:${reset}`);
  }
  if (!res.ok) throw new Error(`github_error:${res.status}`);
  return res.json();
}

async function fetchReadme(owner, repo, token) {
  try {
    const data = await githubFetch(`/repos/${owner}/${repo}/readme`, token);
    // base64 디코딩
    const raw = atob(data.content.replace(/\n/g, ''));
    // UTF-8 디코딩 (한글/일본어 등 멀티바이트)
    return decodeURIComponent(escape(raw));
  } catch {
    return '';
  }
}

async function fetchUserData(username, repo) {
  const token = await getToken();

  const requests = [
    githubFetch(`/users/${username}`, token),
    githubFetch(`/users/${username}/events/public?per_page=30`, token),
  ];

  // 레포가 있으면 README도 함께 요청
  if (repo) {
    requests.push(fetchReadme(username, repo, token));
  }

  const [profile, events, readmeResult] = await Promise.allSettled(requests);

  const user = profile.status === 'fulfilled' ? profile.value : {};
  const eventList = events.status === 'fulfilled' ? events.value : [];
  const readmeText = readmeResult?.status === 'fulfilled' ? (readmeResult.value || '') : '';

  const recentCommitMessages = eventList
    .filter(e => e.type === 'PushEvent')
    .flatMap(e => (e.payload?.commits || []).map(c => c.message))
    .slice(0, 20);

  return {
    login: username,
    name: user.name || '',
    location: user.location || '',
    bio: user.bio || '',
    blog: user.blog || '',
    company: user.company || '',
    recentCommitMessages,
    readmeText,
  };
}

// ─────────────────────────────────────────────
// 국가 조회 메인 로직
// ─────────────────────────────────────────────

async function getCountry(username, repo) {
  // 캐시 확인
  const cached = await getFromCache(username);
  if (cached) return { ...cached, cached: true };

  // GitHub API 호출
  let userData;
  try {
    userData = await fetchUserData(username, repo);
  } catch (err) {
    const msg = err.message || '';
    if (msg.startsWith('rate_limit:')) {
      const resetAt = parseInt(msg.split(':')[1]) * 1000;
      return { error: 'rate_limit', resetAt };
    }
    return { error: 'fetch_failed', country: 'Unknown', confidence: 0 };
  }

  // 국가 감지
  const result = detectCountry(userData);
  console.log(`[GHCF] ${username}`, {
    location: userData.location,
    name: userData.name,
    bio: userData.bio?.slice(0, 50),
    commits: userData.recentCommitMessages.slice(0, 3),
    result,
  });

  // 캐시 저장
  await saveToCache(username, result);

  return result;
}

// ─────────────────────────────────────────────
// 메시지 핸들러
// ─────────────────────────────────────────────

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  if (msg.type === 'GET_COUNTRY') {
    getCountry(msg.username, msg.repo).then(sendResponse);
    return true; // 비동기 응답을 위해 true 반환
  }

  if (msg.type === 'GET_CACHE_STATS') {
    chrome.storage.local.get(CACHE_KEY).then(data => {
      const cache = data[CACHE_KEY] || {};
      sendResponse({ count: Object.keys(cache).length });
    });
    return true;
  }

  if (msg.type === 'CLEAR_CACHE') {
    chrome.storage.local.remove(CACHE_KEY).then(() => sendResponse({ ok: true }));
    return true;
  }
});
