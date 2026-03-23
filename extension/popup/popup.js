const COUNTRIES = [
  { code: 'KR', name: '🇰🇷 한국' }, { code: 'JP', name: '🇯🇵 일본' },
  { code: 'CN', name: '🇨🇳 중국' }, { code: 'TW', name: '🇹🇼 대만' },
  { code: 'US', name: '🇺🇸 미국' }, { code: 'GB', name: '🇬🇧 영국' },
  { code: 'DE', name: '🇩🇪 독일' }, { code: 'FR', name: '🇫🇷 프랑스' },
  { code: 'IN', name: '🇮🇳 인도' }, { code: 'BR', name: '🇧🇷 브라질' },
  { code: 'RU', name: '🇷🇺 러시아' }, { code: 'CA', name: '🇨🇦 캐나다' },
  { code: 'AU', name: '🇦🇺 호주' }, { code: 'NL', name: '🇳🇱 네덜란드' },
  { code: 'ES', name: '🇪🇸 스페인' }, { code: 'IT', name: '🇮🇹 이탈리아' },
  { code: 'SE', name: '🇸🇪 스웨덴' }, { code: 'NO', name: '🇳🇴 노르웨이' },
  { code: 'PL', name: '🇵🇱 폴란드' }, { code: 'UA', name: '🇺🇦 우크라이나' },
  { code: 'CH', name: '🇨🇭 스위스' }, { code: 'IL', name: '🇮🇱 이스라엘' },
  { code: 'SG', name: '🇸🇬 싱가포르' }, { code: 'HK', name: '🇭🇰 홍콩' },
  { code: 'TR', name: '🇹🇷 터키' }, { code: 'MX', name: '🇲🇽 멕시코' },
  { code: 'ID', name: '🇮🇩 인도네시아' }, { code: 'VN', name: '🇻🇳 베트남' },
  { code: 'TH', name: '🇹🇭 태국' }, { code: 'PH', name: '🇵🇭 필리핀' },
  { code: 'MY', name: '🇲🇾 말레이시아' }, { code: 'ZA', name: '🇿🇦 남아공' },
  { code: 'AE', name: '🇦🇪 UAE' }, { code: 'SA', name: '🇸🇦 사우디' },
  { code: 'Unknown', name: '🌐 Unknown' },
];

// ─────────────────────────────────────────────
// 상태
// ─────────────────────────────────────────────

let filterMode = 'all';
let selectedCountries = [];

// ─────────────────────────────────────────────
// 초기화
// ─────────────────────────────────────────────

async function init() {
  // 국가 선택 옵션 채우기
  const select = document.getElementById('countrySelect');
  for (const c of COUNTRIES) {
    const opt = document.createElement('option');
    opt.value = c.code;
    opt.textContent = c.name;
    select.appendChild(opt);
  }

  // 저장된 설정 불러오기
  const data = await chrome.storage.local.get(['github_token', 'filter_settings']);

  if (data.github_token) {
    document.getElementById('tokenInput').value = data.github_token;
    setTokenStatus('저장됨', 'ok');
  }

  if (data.filter_settings) {
    filterMode = data.filter_settings.mode || 'all';
    selectedCountries = data.filter_settings.countries || [];
  }

  applyFilterModeUI();
  renderTags();
  loadCacheStats();
}

// ─────────────────────────────────────────────
// 토큰
// ─────────────────────────────────────────────

function setTokenStatus(msg, type = '') {
  const el = document.getElementById('tokenStatus');
  el.textContent = msg;
  el.className = 'token-status ' + type;
}

document.getElementById('saveToken').addEventListener('click', async () => {
  const token = document.getElementById('tokenInput').value.trim();
  if (!token) {
    setTokenStatus('토큰을 입력해주세요', 'error');
    return;
  }
  if (!token.startsWith('ghp_') && !token.startsWith('github_pat_')) {
    setTokenStatus('올바른 GitHub Token 형식이 아닙니다', 'error');
    return;
  }
  await chrome.storage.local.set({ github_token: token });
  setTokenStatus('저장되었습니다 ✓', 'ok');
});

document.getElementById('toggleVisibility').addEventListener('click', () => {
  const input = document.getElementById('tokenInput');
  input.type = input.type === 'password' ? 'text' : 'password';
});

// ─────────────────────────────────────────────
// 필터 설정
// ─────────────────────────────────────────────

document.querySelectorAll('input[name="filterMode"]').forEach(radio => {
  radio.addEventListener('change', async (e) => {
    filterMode = e.target.value;
    applyFilterModeUI();
    await saveFilterSettings();
  });
});

function applyFilterModeUI() {
  // 라디오 버튼 상태 반영
  const radio = document.querySelector(`input[name="filterMode"][value="${filterMode}"]`);
  if (radio) radio.checked = true;

  // 국가 선택 UI 표시 여부
  const selector = document.getElementById('countrySelector');
  if (filterMode === 'all') {
    selector.classList.remove('visible');
  } else {
    selector.classList.add('visible');
  }
}

document.getElementById('addCountry').addEventListener('click', async () => {
  const select = document.getElementById('countrySelect');
  const code = select.value;
  if (code && !selectedCountries.includes(code)) {
    selectedCountries.push(code);
    renderTags();
    await saveFilterSettings();
  }
});

function renderTags() {
  const list = document.getElementById('tagList');
  list.innerHTML = '';
  for (const code of selectedCountries) {
    const country = COUNTRIES.find(c => c.code === code);
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.innerHTML = `${country?.name || code} <button class="tag-remove" data-code="${code}">×</button>`;
    list.appendChild(tag);
  }
}

document.getElementById('tagList').addEventListener('click', async (e) => {
  if (e.target.classList.contains('tag-remove')) {
    const code = e.target.getAttribute('data-code');
    selectedCountries = selectedCountries.filter(c => c !== code);
    renderTags();
    await saveFilterSettings();
  }
});

async function saveFilterSettings() {
  await chrome.storage.local.set({
    filter_settings: { mode: filterMode, countries: selectedCountries }
  });
}

// ─────────────────────────────────────────────
// 캐시
// ─────────────────────────────────────────────

function loadCacheStats() {
  chrome.runtime.sendMessage({ type: 'GET_CACHE_STATS' }, response => {
    if (response) {
      document.getElementById('cacheInfo').textContent = `${response.count}명의 유저 정보 저장됨`;
    }
  });
}

document.getElementById('clearCache').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'CLEAR_CACHE' }, () => {
    document.getElementById('cacheInfo').textContent = '캐시가 초기화되었습니다';
  });
});

// ─────────────────────────────────────────────
// 실행
// ─────────────────────────────────────────────

init();
