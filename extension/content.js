// GitHub 검색 결과 페이지에서 국가 뱃지를 주입하는 Content Script

// country_detector.js의 COUNTRY_DISPLAY (content script는 import 불가 → 인라인 복사)
const COUNTRY_DISPLAY = {
  'KR': '한국', 'JP': '일본', 'CN': '중국', 'TW': '대만',
  'US': '미국', 'GB': '영국', 'DE': '독일', 'FR': '프랑스',
  'IN': '인도', 'BR': '브라질', 'RU': '러시아', 'CA': '캐나다',
  'AU': '호주', 'NL': '네덜란드', 'ES': '스페인', 'IT': '이탈리아',
  'SE': '스웨덴', 'NO': '노르웨이', 'DK': '덴마크', 'FI': '핀란드',
  'PL': '폴란드', 'CZ': '체코', 'UA': '우크라이나', 'CH': '스위스',
  'AT': '오스트리아', 'BE': '벨기에', 'PT': '포르투갈', 'IL': '이스라엘',
  'SG': '싱가포르', 'HK': '홍콩', 'TR': '터키', 'MX': '멕시코',
  'AR': '아르헨티나', 'ID': '인도네시아', 'VN': '베트남', 'TH': '태국',
  'PH': '필리핀', 'MY': '말레이시아', 'EG': '이집트', 'ZA': '남아공',
  'NG': '나이지리아', 'RO': '루마니아', 'HU': '헝가리', 'GR': '그리스',
  'NZ': '뉴질랜드', 'IE': '아일랜드', 'AE': 'UAE', 'SA': '사우디',
  'PK': '파키스탄', 'BD': '방글라데시', 'IR': '이란', 'CO': '콜롬비아',
};

const PROCESSED_ATTR = 'data-ghcf-done';
let filterSettings = { mode: 'all', countries: [] }; // mode: all | include | exclude

// ─────────────────────────────────────────────
// 설정 로드
// ─────────────────────────────────────────────

async function loadFilterSettings() {
  return new Promise(resolve => {
    chrome.storage.local.get('filter_settings', data => {
      if (data.filter_settings) filterSettings = data.filter_settings;
      resolve();
    });
  });
}

// ─────────────────────────────────────────────
// 검색 결과에서 레포 아이템 추출
// ─────────────────────────────────────────────

function findRepoItems() {
  // GitHub 검색 결과 셀렉터 (GitHub DOM 변경에 대비해 다중 전략 사용)
  const strategies = [
    // 최신 GitHub (2024~)
    () => document.querySelectorAll('[data-testid="results-list"] > div, [data-testid="results-list"] > li'),
    // 구 GitHub
    () => document.querySelectorAll('.repo-list-item, .search-result-item'),
    // 범용 fallback: /owner/repo 패턴 링크가 포함된 상위 컨테이너
    () => {
      const links = document.querySelectorAll('a[href]');
      const items = new Set();
      for (const link of links) {
        if (isRepoLink(link.getAttribute('href'))) {
          const item = link.closest('li, article, div[class*="result"], div[class*="repo"]');
          if (item) items.add(item);
        }
      }
      return [...items];
    },
  ];

  for (const strategy of strategies) {
    const results = strategy();
    if (results.length > 0) return [...results];
  }
  return [];
}

function isRepoLink(href) {
  if (!href) return false;
  // /owner/repo 형태 (슬래시 2개, 쿼리/해시 없음)
  return /^\/[^\/]+\/[^\/]+$/.test(href.split('?')[0].split('#')[0]);
}

function extractOwnerAndRepoFromItem(item) {
  const links = item.querySelectorAll('a[href]');
  for (const link of links) {
    const href = link.getAttribute('href');
    if (isRepoLink(href)) {
      const parts = href.split('/');
      return { owner: parts[1], repo: parts[2] };
    }
  }
  return null;
}

// 뱃지를 주입할 위치 찾기
function findInjectionTarget(item) {
  // 레포 제목 링크 (가장 눈에 잘 띄는 곳)
  const repoTitleLink = [...item.querySelectorAll('a[href]')]
    .find(a => isRepoLink(a.getAttribute('href')));

  return repoTitleLink || null;
}

// ─────────────────────────────────────────────
// 뱃지 생성
// ─────────────────────────────────────────────

function createBadge(country, confidence, displayName) {
  const badge = document.createElement('span');
  badge.className = 'ghcf-badge';

  if (country === 'Unknown') {
    badge.classList.add('ghcf-badge--unknown');
    badge.innerHTML = '<span class="ghcf-code">??</span> Unknown';
    badge.title = '국가를 감지할 수 없습니다';
  } else if (confidence >= 0.75) {
    badge.classList.add('ghcf-badge--certain');
    badge.innerHTML = `<span class="ghcf-code">${country}</span> ${displayName}`;
    badge.title = `국가: ${displayName} (확실, ${Math.round(confidence * 100)}%)`;
  } else {
    badge.classList.add('ghcf-badge--guess');
    badge.innerHTML = `<span class="ghcf-code">${country}</span> ${displayName}?`;
    badge.title = `국가: ${displayName} (추측, 신뢰도 ${Math.round(confidence * 100)}%)`;
  }

  badge.setAttribute('data-ghcf-country', country);
  return badge;
}

function createLoadingBadge() {
  const badge = document.createElement('span');
  badge.className = 'ghcf-badge ghcf-badge--loading';
  badge.textContent = '···';
  return badge;
}

// ─────────────────────────────────────────────
// 필터링 로직
// ─────────────────────────────────────────────

function shouldHideItem(country) {
  if (filterSettings.mode === 'all') return false;
  if (filterSettings.mode === 'include') {
    return !filterSettings.countries.includes(country);
  }
  if (filterSettings.mode === 'exclude') {
    return filterSettings.countries.includes(country);
  }
  return false;
}

// ─────────────────────────────────────────────
// 메인 처리 함수
// ─────────────────────────────────────────────

async function processItems() {
  const items = findRepoItems();

  for (const item of items) {
    if (item.hasAttribute(PROCESSED_ATTR)) continue;
    item.setAttribute(PROCESSED_ATTR, 'true');

    const parsed = extractOwnerAndRepoFromItem(item);
    if (!parsed) continue;
    const { owner, repo } = parsed;

    const target = findInjectionTarget(item);
    if (!target) continue;

    // 로딩 뱃지 먼저 표시
    const loadingBadge = createLoadingBadge();
    target.insertAdjacentElement('afterend', loadingBadge);

    // background.js에 국가 정보 요청 (레포명도 같이 전달)
    chrome.runtime.sendMessage({ type: 'GET_COUNTRY', username: owner, repo }, response => {
      loadingBadge.remove();
      if (!response || response.error) return;

      const { country, confidence } = response;
      const displayName = COUNTRY_DISPLAY[country] || country;
      const badge = createBadge(country, confidence, displayName);
      target.insertAdjacentElement('afterend', badge);
      console.log(`[GHCF] ${owner} → ${country} (${Math.round(confidence * 100)}%)`);


      // 필터 적용
      if (shouldHideItem(country)) {
        item.style.display = 'none';
      }
    });
  }
}

// ─────────────────────────────────────────────
// 페이지 변경 감지 (GitHub Turbo 대응)
// ─────────────────────────────────────────────

let processingTimeout = null;

function scheduleProcess() {
  clearTimeout(processingTimeout);
  processingTimeout = setTimeout(processItems, 500);
}

// Turbo 이벤트 (GitHub SPA 네비게이션)
document.addEventListener('turbo:load', scheduleProcess);
document.addEventListener('turbo:render', scheduleProcess);

// MutationObserver로 동적 DOM 변경 감지
const observer = new MutationObserver(mutations => {
  const hasNewNodes = mutations.some(m => m.addedNodes.length > 0);
  if (hasNewNodes) scheduleProcess();
});

observer.observe(document.body, { childList: true, subtree: true });

// 설정 변경 감지
chrome.storage.onChanged.addListener((changes) => {
  if (changes.filter_settings) {
    filterSettings = changes.filter_settings.newValue;
    // 이미 주입된 뱃지에 필터 재적용
    document.querySelectorAll('[data-ghcf-country]').forEach(badge => {
      const country = badge.getAttribute('data-ghcf-country');
      const item = badge.closest(`[${PROCESSED_ATTR}]`);
      if (item) {
        item.style.display = shouldHideItem(country) ? 'none' : '';
      }
    });
  }
});

// 초기 실행
loadFilterSettings().then(scheduleProcess);
