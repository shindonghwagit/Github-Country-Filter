# GitHub Country Filter

GitHub 검색 결과 및 홈 피드를 국가별로 필터링할 수 있는 Chrome 익스텐션

---

## 프로젝트 개요

GitHub에서 레포지토리를 검색하거나 팔로우한 사람의 피드를 볼 때, **어느 나라 개발자의 프로젝트인지 한눈에 확인하고 필터링**할 수 있습니다.  
레포 owner의 `location` 정보를 분석하고, 없는 경우 이름 문자셋 / 블로그 URL / 커밋 메시지 언어 등으로 국가를 추측합니다.

---

## 주요 기능

- **국가 뱃지 표시** — 검색 결과 및 홈 피드 레포에 국가 뱃지 자동 주입
- **홈 피드 지원** — 팔로우한 사람의 활동 피드에서도 동작
- **국가 필터링** — 원하는 국가만 보기 / 특정 국가 제외
- **국가 추측 로직** — `location` 미입력 유저도 다음 기준으로 추측
  - 프로필 location 텍스트 파싱 (도시명 포함)
  - 블로그 URL의 ccTLD 및 플랫폼 분석 (예: `.kr`, `velog.io` → 한국)
  - 이름 / bio 문자셋 분석 (한글 → 한국, 히라가나 → 일본 등)
  - 최근 커밋 메시지 및 README 언어 감지
  - 회사명 매핑 (예: 카카오, 네이버 → 한국)

---

## 아키텍처

```
[ Chrome Extension ]
  GitHub 페이지 DOM 후킹 (검색 결과 / 홈 피드)
         |
  [ Content Script (content.js) ]
    레포 아이템 감지 → 뱃지 주입 → 필터링 적용
         |
  [ Background Service Worker (background.js) ]
    GitHub REST API 호출 (유저 프로필, 커밋, README)
         |
  [ country_detector.js ]
    location / 문자셋 / URL / 회사명 기반 국가 추측
```

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 익스텐션 | Vanilla JS (Manifest V3) |
| 국가 감지 | GitHub REST API + 자체 구현 JS 로직 |
| 데이터 저장 | Chrome Storage API |
| 배포 | Chrome Web Store |

---

## 디렉토리 구조

```
github-country-filter/
└── extension/
    ├── manifest.json
    ├── content.js           # GitHub 페이지 DOM 후킹 및 뱃지 주입
    ├── content.css          # 뱃지 스타일
    ├── background.js        # GitHub API 요청 처리 및 캐싱
    ├── country_detector.js  # 국가 추측 로직
    └── popup/               # 익스텐션 팝업 UI (필터 설정)
```

---

## 설치 방법

### Chrome Web Store

[Chrome Web Store에서 설치](#) ← 링크 추가 예정

### 개발 모드 (로컬)

1. 이 레포 클론
2. Chrome → `chrome://extensions/`
3. 우측 상단 **"개발자 모드"** 활성화
4. **"압축해제된 확장 프로그램 로드"** → `extension/` 폴더 선택

---

## 국가 추측 로직

```
1. location 필드 파싱 (신뢰도 최상)
     → 국가명 / 도시명 매핑

2. 블로그 URL 분석
     → ccTLD (.kr, .jp 등)
     → 플랫폼 (velog.io, zenn.dev, qiita.com 등)

3. 회사명 분석
     → 카카오, 네이버, Baidu 등

4. 이름 / bio 문자셋 분석
     → 한글 → KR, 히라가나/가타카나 → JP, 한자 → CN 등

5. 커밋 메시지 / README 언어 분석

6. 모두 실패 시 → Unknown
```

---

## 알려진 한계

- `location`은 자유 텍스트라 정확도가 완벽하지 않음
- GitHub API rate limit: 인증 시 5,000 req/h, 미인증 시 60 req/h
- 커밋 메시지 / README가 영어만 있는 경우 국가 추측 어려움

---

## 라이선스

MIT

---

## Privacy Policy

GitHub Country Filter does not collect or transmit any personal data.

- **GitHub Personal Access Token**: Stored only in your browser's local storage. Never sent to any external server other than `api.github.com`.
- **API calls**: Only GitHub's public API (`api.github.com`) is used to detect country information from public profile data.
- **No tracking**: No analytics, no ads, no external servers.
- **Local only**: All data (cache, settings, token) is stored locally in your browser and never leaves your device.

For questions, open an issue on this repository.
