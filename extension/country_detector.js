// ─────────────────────────────────────────────
// 국가 데이터
// ─────────────────────────────────────────────

const COUNTRY_MAP = {
  // 한국
  'korea': 'KR', 'south korea': 'KR', 'republic of korea': 'KR', 'rok': 'KR',
  '한국': 'KR', '대한민국': 'KR', '韓國': 'KR',
  // 일본
  'japan': 'JP', '日本': 'JP', 'にほん': 'JP', 'にっぽん': 'JP',
  // 중국
  'china': 'CN', 'mainland china': 'CN', "people's republic of china": 'CN', 'prc': 'CN',
  '中国': 'CN', '中國': 'CN',
  // 대만
  'taiwan': 'TW', 'republic of china': 'TW', 'roc': 'TW', '台湾': 'TW', '台灣': 'TW',
  // 미국
  'united states': 'US', 'usa': 'US', 'us': 'US', 'america': 'US',
  'united states of america': 'US', 'u.s.a.': 'US', 'u.s.': 'US',
  // 영국
  'united kingdom': 'GB', 'uk': 'GB', 'great britain': 'GB',
  'britain': 'GB', 'england': 'GB', 'scotland': 'GB', 'wales': 'GB',
  // 독일
  'germany': 'DE', 'deutschland': 'DE', 'allemagne': 'DE',
  // 프랑스
  'france': 'FR', 'frankreich': 'FR',
  // 인도
  'india': 'IN', 'bharat': 'IN', 'भारत': 'IN',
  // 브라질
  'brazil': 'BR', 'brasil': 'BR',
  // 러시아
  'russia': 'RU', 'russian federation': 'RU', 'россия': 'RU', 'российская федерация': 'RU',
  // 캐나다
  'canada': 'CA',
  // 호주
  'australia': 'AU', 'oz': 'AU',
  // 네덜란드
  'netherlands': 'NL', 'holland': 'NL', 'nederland': 'NL',
  // 스페인
  'spain': 'ES', 'españa': 'ES', 'espana': 'ES',
  // 이탈리아
  'italy': 'IT', 'italia': 'IT',
  // 스웨덴
  'sweden': 'SE', 'sverige': 'SE',
  // 노르웨이
  'norway': 'NO', 'norge': 'NO',
  // 덴마크
  'denmark': 'DK', 'danmark': 'DK',
  // 핀란드
  'finland': 'FI', 'suomi': 'FI',
  // 폴란드
  'poland': 'PL', 'polska': 'PL',
  // 체코
  'czech republic': 'CZ', 'czechia': 'CZ', 'česká republika': 'CZ',
  // 우크라이나
  'ukraine': 'UA', 'україна': 'UA',
  // 스위스
  'switzerland': 'CH', 'schweiz': 'CH', 'suisse': 'CH', 'svizzera': 'CH',
  // 오스트리아
  'austria': 'AT', 'österreich': 'AT',
  // 벨기에
  'belgium': 'BE', 'belgique': 'BE', 'belgië': 'BE',
  // 포르투갈
  'portugal': 'PT',
  // 이스라엘
  'israel': 'IL', 'ישראל': 'IL',
  // 싱가포르
  'singapore': 'SG', '新加坡': 'SG',
  // 홍콩
  'hong kong': 'HK', 'hk': 'HK', '香港': 'HK',
  // 터키
  'turkey': 'TR', 'türkiye': 'TR',
  // 멕시코
  'mexico': 'MX', 'méxico': 'MX',
  // 아르헨티나
  'argentina': 'AR',
  // 인도네시아
  'indonesia': 'ID',
  // 베트남
  'vietnam': 'VN', 'viet nam': 'VN', 'việt nam': 'VN',
  // 태국
  'thailand': 'TH', 'ไทย': 'TH',
  // 필리핀
  'philippines': 'PH',
  // 말레이시아
  'malaysia': 'MY',
  // 이집트
  'egypt': 'EG', 'مصر': 'EG',
  // 모로코
  'morocco': 'MA', 'المغرب': 'MA',
  // 나이지리아
  'nigeria': 'NG',
  // 남아공
  'south africa': 'ZA',
  // 루마니아
  'romania': 'RO', 'românia': 'RO',
  // 헝가리
  'hungary': 'HU', 'magyarország': 'HU',
  // 그리스
  'greece': 'GR', 'ελλάδα': 'GR', 'hellas': 'GR',
  // 뉴질랜드
  'new zealand': 'NZ', 'nz': 'NZ',
  // 아일랜드
  'ireland': 'IE', 'éire': 'IE',
  // UAE
  'uae': 'AE', 'united arab emirates': 'AE', 'الإمارات': 'AE',
  // 사우디
  'saudi arabia': 'SA', 'المملكة العربية السعودية': 'SA',
  // 이란
  'iran': 'IR', 'ايران': 'IR',
  // 파키스탄
  'pakistan': 'PK',
  // 방글라데시
  'bangladesh': 'BD',
  // 스리랑카
  'sri lanka': 'LK',
  // 네팔
  'nepal': 'NP',
  // 콜롬비아
  'colombia': 'CO',
  // 칠레
  'chile': 'CL',
  // 카자흐스탄
  'kazakhstan': 'KZ', 'қазақстан': 'KZ',
  // 벨라루스
  'belarus': 'BY', 'беларусь': 'BY',
  // 슬로바키아
  'slovakia': 'SK', 'slovensko': 'SK',
  // 크로아티아
  'croatia': 'HR', 'hrvatska': 'HR',
  // 불가리아
  'bulgaria': 'BG', 'българия': 'BG',
  // 세르비아
  'serbia': 'RS', 'србија': 'RS',
  // 리투아니아
  'lithuania': 'LT', 'lietuva': 'LT',
  // 라트비아
  'latvia': 'LV', 'latvija': 'LV',
  // 에스토니아
  'estonia': 'EE', 'eesti': 'EE',
};

const CITY_MAP = {
  // 한국
  'seoul': 'KR', '서울': 'KR', 'busan': 'KR', '부산': 'KR',
  'incheon': 'KR', '인천': 'KR', 'daegu': 'KR', '대구': 'KR',
  'daejeon': 'KR', '대전': 'KR', 'gwangju': 'KR', '광주': 'KR',
  'suwon': 'KR', '수원': 'KR', 'ulsan': 'KR', '울산': 'KR',
  // 일본
  'tokyo': 'JP', '東京': 'JP', 'osaka': 'JP', '大阪': 'JP',
  'kyoto': 'JP', '京都': 'JP', 'yokohama': 'JP', '横浜': 'JP',
  'nagoya': 'JP', '名古屋': 'JP', 'sapporo': 'JP', '札幌': 'JP',
  'fukuoka': 'JP', '福岡': 'JP', 'kobe': 'JP', '神戸': 'JP',
  // 중국
  'beijing': 'CN', '北京': 'CN', 'shanghai': 'CN', '上海': 'CN',
  'shenzhen': 'CN', '深圳': 'CN', 'guangzhou': 'CN', '广州': 'CN',
  'chengdu': 'CN', '成都': 'CN', 'hangzhou': 'CN', '杭州': 'CN',
  'wuhan': 'CN', '武汉': 'CN', "xi'an": 'CN', '西安': 'CN',
  'nanjing': 'CN', '南京': 'CN', 'chongqing': 'CN', '重庆': 'CN',
  // 대만
  'taipei': 'TW', '台北': 'TW', '臺北': 'TW',
  'kaohsiung': 'TW', '高雄': 'TW', 'taichung': 'TW', '台中': 'TW',
  // 미국
  'new york': 'US', 'nyc': 'US', 'san francisco': 'US', 'sf': 'US',
  'los angeles': 'US', 'seattle': 'US', 'chicago': 'US', 'boston': 'US',
  'austin': 'US', 'portland': 'US', 'denver': 'US', 'atlanta': 'US',
  'miami': 'US', 'dallas': 'US', 'houston': 'US', 'washington dc': 'US',
  'silicon valley': 'US', 'mountain view': 'US', 'palo alto': 'US', 'redmond': 'US',
  // 영국
  'london': 'GB', 'manchester': 'GB', 'birmingham': 'GB',
  'edinburgh': 'GB', 'glasgow': 'GB', 'cambridge': 'GB', 'oxford': 'GB',
  // 독일
  'berlin': 'DE', 'munich': 'DE', 'münchen': 'DE', 'hamburg': 'DE',
  'frankfurt': 'DE', 'cologne': 'DE', 'köln': 'DE', 'stuttgart': 'DE',
  // 프랑스
  'paris': 'FR', 'lyon': 'FR', 'marseille': 'FR', 'toulouse': 'FR', 'bordeaux': 'FR',
  // 인도
  'bangalore': 'IN', 'bengaluru': 'IN', 'mumbai': 'IN', 'bombay': 'IN',
  'delhi': 'IN', 'new delhi': 'IN', 'hyderabad': 'IN', 'pune': 'IN',
  'chennai': 'IN', 'kolkata': 'IN', 'ahmedabad': 'IN',
  // 러시아
  'moscow': 'RU', 'москва': 'RU', 'saint petersburg': 'RU',
  'st. petersburg': 'RU', 'санкт-петербург': 'RU', 'novosibirsk': 'RU',
  // 캐나다
  'toronto': 'CA', 'vancouver': 'CA', 'montreal': 'CA', 'calgary': 'CA', 'ottawa': 'CA',
  // 호주
  'sydney': 'AU', 'melbourne': 'AU', 'brisbane': 'AU', 'perth': 'AU',
  // 브라질
  'são paulo': 'BR', 'sao paulo': 'BR', 'rio de janeiro': 'BR', 'brasilia': 'BR',
  // 네덜란드
  'amsterdam': 'NL', 'rotterdam': 'NL', 'eindhoven': 'NL', 'utrecht': 'NL',
  // 스페인
  'madrid': 'ES', 'barcelona': 'ES', 'valencia': 'ES', 'seville': 'ES',
  // 이탈리아
  'rome': 'IT', 'roma': 'IT', 'milan': 'IT', 'milano': 'IT', 'turin': 'IT', 'torino': 'IT',
  // 스웨덴
  'stockholm': 'SE', 'gothenburg': 'SE', 'göteborg': 'SE',
  // 노르웨이
  'oslo': 'NO', 'bergen': 'NO',
  // 덴마크
  'copenhagen': 'DK', 'københavn': 'DK',
  // 핀란드
  'helsinki': 'FI', 'espoo': 'FI', 'tampere': 'FI',
  // 폴란드
  'warsaw': 'PL', 'warszawa': 'PL', 'krakow': 'PL', 'kraków': 'PL',
  // 우크라이나
  'kyiv': 'UA', 'kiev': 'UA', 'київ': 'UA', 'kharkiv': 'UA', 'odessa': 'UA',
  // 스위스
  'zurich': 'CH', 'zürich': 'CH', 'geneva': 'CH', 'genève': 'CH', 'bern': 'CH',
  // 이스라엘
  'tel aviv': 'IL', 'jerusalem': 'IL', 'haifa': 'IL',
  // 싱가포르
  'singapore': 'SG',
  // 홍콩
  'hong kong': 'HK',
  // 인도네시아
  'jakarta': 'ID', 'bandung': 'ID', 'surabaya': 'ID',
  // 터키
  'istanbul': 'TR', 'ankara': 'TR', 'izmir': 'TR',
  // 멕시코
  'mexico city': 'MX', 'guadalajara': 'MX', 'monterrey': 'MX',
  // 아르헨티나
  'buenos aires': 'AR',
  // 베트남
  'ho chi minh city': 'VN', 'hcmc': 'VN', 'hanoi': 'VN', 'hà nội': 'VN',
  // 태국
  'bangkok': 'TH',
  // 필리핀
  'manila': 'PH', 'cebu': 'PH',
  // 말레이시아
  'kuala lumpur': 'MY', 'kl': 'MY',
  // 이집트
  'cairo': 'EG', 'القاهرة': 'EG',
  // 아일랜드
  'dublin': 'IE',
  // 포르투갈
  'lisbon': 'PT', 'lisboa': 'PT', 'porto': 'PT',
  // 체코
  'prague': 'CZ', 'praha': 'CZ', 'brno': 'CZ',
  // 오스트리아
  'vienna': 'AT', 'wien': 'AT',
  // 벨기에
  'brussels': 'BE', 'bruxelles': 'BE',
  // 루마니아
  'bucharest': 'RO', 'bucurești': 'RO',
  // 헝가리
  'budapest': 'HU',
  // 그리스
  'athens': 'GR', 'thessaloniki': 'GR',
  // 뉴질랜드
  'auckland': 'NZ', 'wellington': 'NZ',
  // UAE
  'dubai': 'AE', 'abu dhabi': 'AE',
  // 사우디
  'riyadh': 'SA', 'jeddah': 'SA',
  // 파키스탄
  'karachi': 'PK', 'lahore': 'PK', 'islamabad': 'PK',
  // 방글라데시
  'dhaka': 'BD',
  // 나이지리아
  'lagos': 'NG', 'abuja': 'NG',
  // 남아공
  'johannesburg': 'ZA', 'cape town': 'ZA', 'pretoria': 'ZA',
  // 콜롬비아
  'bogota': 'CO', 'bogotá': 'CO',
  // 이란
  'tehran': 'IR',
};

// 알려진 플랫폼 도메인 → 국가
const PLATFORM_MAP = {
  'naver.com': 'KR', 'tistory.com': 'KR', 'velog.io': 'KR', 'brunch.co.kr': 'KR',
  'zenn.dev': 'JP', 'qiita.com': 'JP', 'note.com': 'JP',
  'csdn.net': 'CN', 'zhihu.com': 'CN', 'juejin.cn': 'CN', 'cnblogs.com': 'CN',
  'habr.com': 'RU', 'vk.com': 'RU',
};

// ccTLD → 국가
const TLD_MAP = {
  '.kr': 'KR', '.co.kr': 'KR',
  '.jp': 'JP',
  '.cn': 'CN', '.com.cn': 'CN',
  '.tw': 'TW', '.com.tw': 'TW',
  '.de': 'DE', '.fr': 'FR', '.ru': 'RU',
  '.uk': 'GB', '.co.uk': 'GB',
  '.in': 'IN', '.co.in': 'IN',
  '.br': 'BR', '.com.br': 'BR',
  '.au': 'AU', '.com.au': 'AU',
  '.ca': 'CA', '.nl': 'NL', '.es': 'ES', '.it': 'IT',
  '.se': 'SE', '.no': 'NO', '.dk': 'DK', '.fi': 'FI',
  '.pl': 'PL', '.ua': 'UA', '.ch': 'CH', '.il': 'IL',
  '.sg': 'SG', '.hk': 'HK', '.tr': 'TR', '.mx': 'MX',
  '.ar': 'AR', '.vn': 'VN', '.th': 'TH', '.id': 'ID',
  '.my': 'MY', '.eg': 'EG', '.za': 'ZA', '.ng': 'NG',
  '.pt': 'PT', '.ie': 'IE', '.cz': 'CZ', '.at': 'AT',
  '.be': 'BE', '.ro': 'RO', '.hu': 'HU', '.gr': 'GR',
  '.nz': 'NZ', '.ae': 'AE', '.sa': 'SA', '.pk': 'PK',
  '.bd': 'BD', '.ir': 'IR', '.co': 'CO',
};

// 알려진 회사명 → 국가
const COMPANY_MAP = {
  'kakao': 'KR', 'naver': 'KR', 'krafton': 'KR', 'nexon': 'KR',
  'ncsoft': 'KR', 'netmarble': 'KR', 'samsung': 'KR', 'line': 'JP',
  'rakuten': 'JP', 'mercari': 'JP', 'fujitsu': 'JP', 'ntt': 'JP',
  'baidu': 'CN', 'tencent': 'CN', 'alibaba': 'CN', 'bytedance': 'CN',
  'xiaomi': 'CN', 'huawei': 'CN',
};

// 국가 표시명
export const COUNTRY_DISPLAY = {
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
  'LK': '스리랑카', 'NP': '네팔', 'MA': '모로코',
};

// ─────────────────────────────────────────────
// 감지 함수들
// ─────────────────────────────────────────────

function createSignal(country, confidence, source, reason) {
  return { country, confidence, source, reason };
}

function quoteValue(value) {
  return `"${String(value).trim()}"`;
}

function parseLocation(location) {
  if (!location) return [];

  const normalized = location.toLowerCase().trim();

  // 무의미한 location 필터링
  const JUNK = ['earth', 'remote', 'internet', 'worldwide', 'global', 'everywhere', 'world', 'online', 'universe', 'home'];
  if (JUNK.some(j => normalized === j)) return [];

  const found = new Map(); // country -> strongest location signal

  const remember = (country, confidence, reason) => {
    const prev = found.get(country);
    if (!prev || confidence > prev.confidence) {
      found.set(country, { confidence, reason });
    }
  };

  const tryMatch = (text, confidence) => {
    if (COUNTRY_MAP[text]) {
      remember(
        COUNTRY_MAP[text],
        confidence,
        `location matches country keyword ${quoteValue(text)}`
      );
    }
    if (CITY_MAP[text]) {
      remember(
        CITY_MAP[text],
        confidence - 0.05,
        `location mentions city keyword ${quoteValue(text)}`
      );
    }
  };

  // 1. 전체 문자열 매칭
  tryMatch(normalized, 0.95);

  // 2. 쉼표/슬래시로 분리해서 각 부분 매칭
  const parts = normalized.split(/[,\/|·\s]+/).map(p => p.trim()).filter(p => p.length > 1);
  for (const part of parts) {
    tryMatch(part, 0.92);
  }

  // 3. 부분 포함 검사 (Seoul, South Korea 같은 복합 지명)
  for (const [key, code] of Object.entries(COUNTRY_MAP)) {
    if (normalized.includes(key) && !found.has(code)) {
      remember(code, 0.88, `location contains country keyword ${quoteValue(key)}`);
    }
  }
  for (const [key, code] of Object.entries(CITY_MAP)) {
    if (normalized.includes(key) && !found.has(code)) {
      remember(code, 0.83, `location contains city keyword ${quoteValue(key)}`);
    }
  }

  return [...found.entries()].map(([country, details]) =>
    createSignal(country, details.confidence, 'location', details.reason)
  );
}

function analyzeBlogUrl(blog) {
  if (!blog) return [];
  try {
    const url = new URL(blog.startsWith('http') ? blog : 'https://' + blog);
    const hostname = url.hostname.toLowerCase();

    // 알려진 플랫폼
    for (const [platform, code] of Object.entries(PLATFORM_MAP)) {
      if (hostname.endsWith(platform)) {
        return [
          createSignal(
            code,
            0.85,
            'blog_platform',
            `blog URL uses regional platform ${quoteValue(platform)}`
          ),
        ];
      }
    }

    // ccTLD 검사 (길이 순 정렬로 .co.kr 우선 처리)
    const sortedTlds = Object.keys(TLD_MAP).sort((a, b) => b.length - a.length);
    for (const tld of sortedTlds) {
      if (hostname.endsWith(tld)) {
        return [
          createSignal(
            TLD_MAP[tld],
            0.80,
            'blog_tld',
            `blog URL ends with country TLD ${quoteValue(tld)}`
          ),
        ];
      }
    }
  } catch {
    // URL 파싱 실패 무시
  }
  return [];
}

function analyzeCompany(company) {
  if (!company) return [];
  const normalized = company.toLowerCase().replace(/[@\s]/g, '');
  for (const [name, code] of Object.entries(COMPANY_MAP)) {
    if (normalized.includes(name)) {
      return [
        createSignal(
          code,
          0.70,
          'company',
          `company field includes ${quoteValue(name)}`
        ),
      ];
    }
  }
  return [];
}

function analyzeCharset(text, contextLabel = 'text') {
  if (!text) return [];
  const signals = [];

  // 한글 (한국어) — 매우 확실
  if (/[\uAC00-\uD7AF\u1100-\u11FF\u3130-\u318F]/.test(text)) {
    signals.push(createSignal('KR', 0.95, 'charset_hangul', `${contextLabel} contains Hangul`));
  }

  // 히라가나/가타카나 (일본어) — 매우 확실
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
    signals.push(createSignal('JP', 0.95, 'charset_kana', `${contextLabel} contains Kana`));
  }

  // CJK 한자만 있고 한글/가나 없을 때 → 중국어 가능성
  const hasCJK = /[\u4E00-\u9FFF\u3400-\u4DBF]/.test(text);
  const hasKorean = signals.some(s => s.country === 'KR');
  const hasJapanese = signals.some(s => s.country === 'JP');
  if (hasCJK && !hasKorean && !hasJapanese) {
    signals.push(createSignal('CN', 0.70, 'charset_cjk', `${contextLabel} contains CJK ideographs`));
  }

  // 키릴 문자 (러시아/동유럽)
  if (/[\u0400-\u04FF]/.test(text)) {
    signals.push(createSignal('RU', 0.75, 'charset_cyrillic', `${contextLabel} contains Cyrillic`));
  }

  // 데바나가리 (힌디/인도어)
  if (/[\u0900-\u097F]/.test(text)) {
    signals.push(createSignal('IN', 0.90, 'charset_devanagari', `${contextLabel} contains Devanagari`));
  }

  // 태국 문자
  if (/[\u0E00-\u0E7F]/.test(text)) {
    signals.push(createSignal('TH', 0.95, 'charset_thai', `${contextLabel} contains Thai script`));
  }

  // 히브리 문자
  if (/[\u0590-\u05FF]/.test(text)) {
    signals.push(createSignal('IL', 0.85, 'charset_hebrew', `${contextLabel} contains Hebrew`));
  }

  // 아랍 문자
  if (/[\u0600-\u06FF]/.test(text)) {
    signals.push(createSignal('AE', 0.60, 'charset_arabic', `${contextLabel} contains Arabic script`));
  }

  return signals;
}

// 커밋 메시지 + bio 언어 분석
function analyzeTextLanguage(texts) {
  if (!texts || texts.length === 0) return [];

  const combined = texts.join(' ');
  const signals = [];

  // 문자셋 기반 분석으로 대부분 커버
  const charsetSignals = analyzeCharset(combined, 'bio / README / recent commits');
  signals.push(...charsetSignals);

  // 라틴 문자로만 이루어진 텍스트는 국가 특정 어려움
  // 단, 특정 언어 키워드로 힌트 가능
  const lower = combined.toLowerCase();
  if (charsetSignals.length === 0) {
    // 한국어 로마자 단서
    if (/\b(feat|fix|추가|수정|개선|삭제|변경)\b/.test(lower)) {
      // 아직 확실하지 않으므로 패스
    }
  }

  return signals;
}

// ─────────────────────────────────────────────
// 신호 집계 및 최종 결과 반환
// ─────────────────────────────────────────────

function aggregateSignals(signals) {
  if (signals.length === 0) {
    return { country: 'Unknown', confidence: 0, sources: [], reasons: [] };
  }

  const scores = {};
  for (const signal of signals) {
    scores[signal.country] = (scores[signal.country] || 0) + signal.confidence;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [topCountry, topScore] = sorted[0];
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const normalizedConfidence = topScore / totalScore;

  const reasons = signals
    .filter(signal => signal.country === topCountry)
    .sort((a, b) => b.confidence - a.confidence)
    .reduce((items, signal) => {
      if (!items.some(item => item.text === signal.reason)) {
        items.push({
          source: signal.source,
          confidence: signal.confidence,
          text: signal.reason,
        });
      }
      return items;
    }, []);

  return {
    country: topCountry,
    confidence: Math.min(normalizedConfidence, 1.0),
    sources: signals.map(s => s.source),
    reasons,
  };
}

// ─────────────────────────────────────────────
// 메인 export
// ─────────────────────────────────────────────

export function detectCountry(userData) {
  const signals = [];

  // Stage 1: location 파싱 (가장 신뢰도 높음)
  signals.push(...parseLocation(userData.location));

  // Stage 2: 블로그 URL
  signals.push(...analyzeBlogUrl(userData.blog));

  // Stage 3: 회사명
  signals.push(...analyzeCompany(userData.company));

  // Stage 4: 이름 + bio 문자셋 분석
  const nameAndBio = [userData.name, userData.bio].filter(Boolean).join(' ');
  signals.push(...analyzeCharset(nameAndBio, 'name / bio'));

  // Stage 5: 커밋 메시지 + bio + README 언어 분석
  const texts = [
    userData.bio,
    userData.readmeText?.slice(0, 2000), // README 앞 2000자만
    ...(userData.recentCommitMessages || []),
  ].filter(Boolean);
  signals.push(...analyzeTextLanguage(texts));

  return aggregateSignals(signals);
}

export function countryToFlag(isoCode) {
  if (!isoCode || isoCode === 'Unknown') return '🌐';
  return [...isoCode.toUpperCase()]
    .map(c => String.fromCodePoint(0x1F1E0 + c.charCodeAt(0) - 65))
    .join('');
}
