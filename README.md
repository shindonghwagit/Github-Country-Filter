# GitHub Country Filter

GitHub 검색 결과를 국가별로 필터링할 수 있는 Chrome 익스텐션 + 웹 서비스

---

## 프로젝트 개요

GitHub에서 레포지토리를 검색할 때 **어느 나라 개발자의 프로젝트인지 필터링할 수 없는 문제**를 해결합니다.  
레포 owner의 `location` 정보를 분석하고, 없는 경우 이름 패턴 / 커밋 메시지 언어로 국가를 추측합니다.

---

## 주요 기능

- **국가 뱃지 표시** — GitHub 검색 결과 각 레포에 국가 뱃지 자동 주입
- **국가 필터링** — 원하는 국가만 보기 / 특정 국가 제외
- **국가 추측 로직** — `location` 미입력 유저도 다음 기준으로 추측
  - 이름에 한자 포함 → 중국/일본/한국
  - 이름에 키릴 문자 포함 → 러시아/동유럽
  - 최근 커밋 메시지 언어 감지 (`langdetect`)
  - README 언어 보조 분석
- **웹 서비스** — 키워드 검색 + 국가 필터를 웹에서도 사용 가능

---

## 아키텍처

```
[ Chrome Extension ]              [ Web App ]
  GitHub 검색 결과 DOM 후킹          키워드 검색 UI
  owner 목록 추출                        |
         |                               |
  [ Content Script ]              [ Next.js Frontend ]
         |                               |
  [ Background Service Worker ]          |
         |_______________________________|
                        |
               [ FastAPI Backend ]
                        |
              ┌─────────┴──────────┐
         GitHub API           langdetect
         (user location)    (언어 감지)
              |
         국가 코드 반환
```

---

## 기술 스택

| 영역 | 기술 |
|------|------|
| 웹 프론트엔드 | Next.js + Tailwind CSS |
| 백엔드 | FastAPI (Python) |
| 국가 감지 | GitHub REST API + langdetect |
| 익스텐션 | Vanilla JS (Manifest V3) |
| 배포 | Vercel (웹) + Railway (백엔드) |

---

## 디렉토리 구조

```
github-country-filter/
├── extension/               # Chrome 익스텐션
│   ├── manifest.json
│   ├── content.js           # GitHub 페이지 DOM 후킹
│   ├── background.js        # API 요청 처리
│   └── popup/               # 익스텐션 팝업 UI
│
├── web/                     # Next.js 웹 앱
│   ├── pages/
│   ├── components/
│   └── ...
│
├── backend/                 # FastAPI 서버
│   ├── main.py
│   ├── github_api.py        # GitHub API 래퍼
│   ├── country_detector.py  # 국가 추측 로직
│   └── requirements.txt
│
└── README.md
```

---

## 시작하기

### 백엔드

```bash
cd backend
pip install -r requirements.txt

# .env 파일 생성
echo "GITHUB_TOKEN=your_token_here" > .env

uvicorn main:app --reload
```

### 웹

```bash
cd web
npm install
npm run dev
```

### 익스텐션 (개발 모드)

1. Chrome → `chrome://extensions/`
2. "개발자 모드" 활성화
3. "압축해제된 확장 프로그램 로드" → `extension/` 폴더 선택

---

## 환경 변수

| 변수명 | 설명 |
|--------|------|
| `GITHUB_TOKEN` | GitHub Personal Access Token (rate limit 5000 req/h) |

---

## 국가 추측 로직

```
location 필드 있음
    → 텍스트 파싱 → 국가 코드 매핑

location 없음
    → 이름 문자셋 분석
        - 한자 포함: CN / JP / KR 후보
        - 키릴 문자: RU / 동유럽
    → 최근 커밋 메시지 langdetect
    → README 언어 감지
    → 모두 실패 시: Unknown
```

---

## 알려진 한계

- `location`은 자유 텍스트라 정확도가 완벽하지 않음
- GitHub API rate limit: 인증 시 5,000 req/h
- 커밋 메시지가 영어인 경우 언어 추측 불가능

---

## 라이선스

MIT

---

## Privacy Policy

GitHub Country Filter does not collect or transmit any personal data.

- **GitHub Personal Access Token**: Stored only in your browser's local storage. Never sent to any external server other than api.github.com.
- **API calls**: Only GitHub's public API (api.github.com) is used to detect country information from public profile data.
- **No tracking**: No analytics, no ads, no external servers.
- **Local only**: All data (cache, settings, token) is stored locally in your browser and never leaves your device.

For questions, open an issue on this repository.
