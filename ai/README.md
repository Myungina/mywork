# 시대에듀 AI 강의·교재 추천 시스템

## 📋 프로젝트 개요

시대에듀의 67개 자격증에 대한 AI 기반 맞춤형 추천 시스템입니다.
원본 HTML 파일(All-in-one)을 **Frontend(React)** + **Backend(PHP API)** 구조로 분리하여 개발했습니다.

## 🏗️ 프로젝트 구조

```
ai/
├── api/                                    # Backend API
│   ├── certifications.php                  # 자격증 데이터 API
│   └── exam_info.php                       # 시험정보 데이터 API
│
├── frontend/                               # Frontend
│   ├── index.html                          # 메인 (API 사용) ⭐
│
├── includes/                               # Data
│   ├── certifications_data.php             # 자격증 데이터 (67개)
│   └── exam_info_data.php                  # 시험정보 데이터 (60개)
│
└── README.md                               # 이 문서
```

---

## 🚀 실행 방법

### 1. PHP 서버 실행

```bash
cd d:\sdedu\sdedu\ai
php -S localhost:8000
```

### 2. 브라우저 접속

- **메인 페이지**: https://www.sdedu.co.kr/ai/frontend/index.html

### 3. API 테스트

- 자격증 API: https://www.sdedu.co.kr/ai/api/certifications.php
- 시험정보 API: https://www.sdedu.co.kr/ai/api/exam_info.php

---

## 🔧 작업 과정

### Phase 1: 데이터 분리 (PHP)

**목표**: HTML 파일 내장 데이터를 PHP 파일로 분리

1. 원본 파일에서 `certificationsDB`, `examInfoDB` 추출
2. PHP 배열로 변환 후 `includes/` 디렉토리에 저장

### Phase 2: Backend API 생성

**목표**: RESTful API 엔드포인트 구축

#### `api/certifications.php`
- GET 요청으로 자격증 데이터 반환
- JSON 형식 응답
- CORS 헤더 설정
- 에러 처리

```json
{
  "success": true,
  "data": { ... },
  "count": 67
}
```

#### `api/exam_info.php`
- GET 요청으로 시험정보 데이터 반환
- 동일한 응답 구조

### Phase 3: Frontend 생성

**목표**: API를 사용하는 순수 HTML + React 애플리케이션

#### 주요 변경사항

1. **데이터 로딩**
   ```javascript
   // 기존 (원본)
   const certificationsDB = { ... };  // 직접 포함

   // 변경 (API)
   let certificationsDB = {};  // API에서 로드

   async function loadDataFromAPI() {
     const [certsRes, examRes] = await Promise.all([
       fetch('../api/certifications.php'),
       fetch('../api/exam_info.php')
     ]);
     // ...
   }
   ```

2. **로딩 상태 관리**
   ```javascript
   const [dataLoaded, setDataLoaded] = useState(false);

   useEffect(() => {
     loadDataFromAPI().then(success => {
       if (success) setDataLoaded(true);
     });
   }, []);

   if (!dataLoaded) {
     return <LoadingScreen />;
   }

## 📊 원본 vs API 버전 비교

### 공통점
- ✅ 동일한 데이터 사용 (includes 디렉토리)
- ✅ 동일한 UI/UX
- ✅ 동일한 기능 (AI 추천, 검색, 비교 등)

### 차이점

| 항목 | 원본 (standalone.html) | API 버전 (index.html) |
|------|----------------------|---------------------|
| 데이터 로딩 | JavaScript 객체로 직접 포함 | fetch() API 호출 |
| 파일 크기 | 233KB (데이터 포함) | 121KB (데이터 제외) |
| 로딩 시간 | 즉시 시작 | 네트워크 요청 시간 추가 |
| 서버 필요 | 선택적 | **필수** (PHP 서버) |
| 유지보수 | 데이터 변경 시 HTML 재생성 | 데이터 파일만 수정 |

---

## 📝 API 명세

### GET /api/certifications.php

**응답 형식**:
```json
{
  "success": true,
  "data": {
    "감정평가사": {
      "category": "전문자격",
      "difficulty": 4,
      "duration": { "min": 18, "max": 36, "optimal": 24 },
      "monthlyHours": { "min": 100, "recommended": 120 },
      "examSchedule": { "year": 2025, "first": "4월", "second": "7월" },
      ...
    },
    ...
  },
  "count": 67
}
```

**에러 응답**:
```json
{
  "success": false,
  "error": "Error message"
}
```

### GET /api/exam_info.php

동일한 응답 형식, 시험 정보 데이터 반환

---

## 🔒 CORS 설정

API 파일에 CORS 헤더가 설정되어 있어 다른 도메인에서도 접근 가능합니다.

```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
```

---

## 🚧 향후 개선 사항

### 1. 프로덕션 배포

- [ ] Tailwind CSS CDN → PostCSS 빌드
- [ ] Babel CDN → 사전 컴파일
- [ ] React production 빌드 최적화
- [ ] API 응답 캐싱

### 2. 기능 추가

- [ ] 북마크 기능 (localStorage)
- [ ] 학습 진도 관리
- [ ] 추천 알고리즘 개선
- [ ] 사용자 피드백 시스템

### 3. 보안

- [ ] API 인증/인가
- [ ] Rate limiting
- [ ] Input validation
- [ ] XSS/CSRF 방어

### 4. 성능

- [ ] API 응답 압축 (gzip)
- [ ] 이미지 최적화
- [ ] 코드 스플리팅
- [ ] Service Worker (PWA)

---

## 📚 기술 스택

- **Frontend**: React 18 (CDN), Tailwind CSS (CDN)
- **Backend**: PHP 7.4+
- **Data**: PHP Arrays
- **Tools**: Babel (Standalone)

---

## 🔗 참고 링크

- [React Hooks 규칙](https://react.dev/reference/rules/rules-of-hooks)
- [Tailwind CSS 설치](https://tailwindcss.com/docs/installation)
- [PHP Built-in Server](https://www.php.net/manual/en/features.commandline.webserver.php)

---

## 📄 라이선스

시대에듀 내부 프로젝트

---

## 💬 문의

프로젝트 관련 문의사항은 개발팀에 연락하세요.
