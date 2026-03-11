# 1. 시대 ai 강의/교재 추천 가이드
## 1. 개요
### 해당 페이지 React구조를 유지하도록 설게됨.<br>

1. 모든 페이지는 components 디렉토리 안에 생성한다.
2. JS 파일명 제일 앞글자는 대문자를 사용하다.
3. CND React는 모듈/파일분리 개념이 없으므로 컴포넌트 분리는 FN + props 으로 진행한다.
4. 공통사용 stats는 app.js에 선언, 개별 사용은 해당 .js파일에 선언한다.
5. 파일 생성시 index.html에 함께 선언한다.<br>
    5-1.선언시 app.js는 맨 하단에 있어야한다.
6. css는 파일 생성/수정/삭제 모두 가능하다.
7. _common.php파일은 기존 db연동을 위한 파일[삭제 금지]

## 2. 디렉토리 구조도
### 1.1 디렉토리 [사용중인 파일]
```
/
├── ai/
│   ├──  api/
│   │       ├── _common.php                      # db연동 위한 기본파일                
│   │       ├── certification.php                # 자격증 데이터 API
│   │       ├── csCenterApi.php                  # 상담 신청 API (날자 셋팅 전용)
│   │       ├── exam_info.php                    # 자격증 정보 API
│   │       └── productApi.php                   # 카테고리별 상품 정보 API 
│   ├── frontend/                   
│   │       └──  index.html                       # index
│   ├── includes/                                 # 데이터
│   │       ├── certifications_data.php           # 자격증 정보 Arr
│   │       └── exam_info_data.php                # 카테고리 정보 Arr
│   └── public/                                   # front UI / JS
│           ├──  css
│           │     ├── layout.css                  # 페이지 레이아웃
│           │     ├── tailwind-custom.css         # tailwind 커스텀용 css 
│           │     └── variables.css               # 기본 사용 css
│           ├──  js
│           │     ├── Components/
│           │     │     ├── app.js                #reactDOM
│           │     │     ├── Component.js          # API로드 / 효과 스크립트
│           │     │     ├── Footer.js             # footer
│           │     │     └── Header.js            # header
│           │     │ 
│           │     ├── Pages/
│           │     │     ├── AiLecRecomend.js      # 메인 컨테이너 - 자격증 알아보기 / 자격증 정보 탭
│           │     │     ├── AiRecomendRes.js      # 메인 컨테이너 -> 추천결과 세션
│           │     │     ├── AiResult.js           # 결과 -> ai분석 세션
│           │     │     ├── LecSearch.js          # 자격증 검색
│           │     │     │ 
│           │     │     ├── ResTab/                     # 자격증 상세보기 탭
│           │     │     │     ├── Acceptance.js         # 합격현황
│           │     │     │     ├── ExamDta.js            # 시험안내 
│           │     │     │     ├── LecCareer.js          # 진로/전망
│           │     │     │     ├── LetDtl.js             # 개요 
│           │     │     │     └── LecFaq.js             # QnA 
│           │     │     ├── Modal/                      # 팝업
│           │     │     │     ├── Modal_compare.js      # 비교 모달
│           │     │     │     ├── Modal_cscenter.js     # 상담 신청 모달 
│           │     │     └──   └── Modal_product.js      # 강의 상품 목록 모달 
│           │     │     
│           │     ├── Theme/    
│           │     │     ├── Icon.js               # Icon css
└──         └──   └──   └── Theme.js              # react 선언 테마

```

## 3 API Documentation

#### 1.자격증 정보
1. 파일명:  certifications.php
2. Method: GET
3. URL : ai/api/certifications.php
4. Content-Type :	application/json; charset=utf-8
5. Body :  ai/includes/certifications_data.php
6. Request Parameters : selectedCert / String
```PHP
"스포츠지도사 2급" => [                            //카테고리명
    'cat_id' => ''                              //카테고리 ID                                      
    'category' => "생활/산업기술",                //대카테고리
    'difficulty' => 1,                          //난이도  difficulty-difficultyLabel 
    'difficultyLabel' => "쉬움",                 // 1:쉬움 , 2:보통 , 3:중상, 4:어려움, 5: 최고난도
    'badge' => "BEST",                          //'베스트' 뱃지
    'duration' => [
        'min' => 3,                             //최소기간
        'max' => 6,                             //최대기간
        'optimal' => 4                          //최적 기간
    ],
    'monthlyHours' => [                         //월 학습시간
        'min' => 40,  
        'recommended' => 50
    ], 
    'examSchedule' => [                         //시험일정
        'year' => 2025,                         //년도 default
        'round' => "필기: 4월 /실기: 5월"         //시험정보 -> 시험일정
    ],
    'passRate' => ['overall' => 60],            //합격률 (int , char은 큰따옴표사용 ex: "절대평가")
    'cost' => ['total' => "20~30만원"],          // 예상비용
    'outlook' => 4,                             //전망 (별점)
    'salary' => [                               //예상 연봉
        'entry' => 2400,                        //신입
        'mid' => 3200,                          //중견
        'senior' => 4000                        //고경력
    ],
    'suitable' => [                             //개요-> 이런분꼐 추천합니다.
        "체육 전공자", "스포츠 강사 희망자", "헬스트레이너"
    ],
    'tags' => ["스포츠", "지도", "체육"],          // 해시태그
    'description' => "자격증 설명분",             //자격증 설명
    'overview' => "스포츠지도사는 전문체육 또는..",  //자격증 상세 소개
    'employment' => [                           //주요 취업처                
        "체육시설", 
        "학교", 
        "스포츠센터"
    ], 
    'studyTips' => [                            //합격을 위한 학습 전략
        "전략적 과목 선택", 
        "과락 방어 전략"
    ], 
    'allPassTit' => "1차 5개년 평균",             //합격률 아래 맨트 (default:전체 평균)
    'career' => [ 
        'description' => "고소득 전문직으로, 개인", //진로 및 전망 (삭제가능)
        'fields' => [                           //주요 활동 분야 없을시 employment츌룍
            "특허법률사무소 개설", 
            "특허법인 취업"
        ] 
    ],
    'examInfo' => [                                   // 시험 과목안내 (예시 : 소방설비기사)
        'subjects' => [                               //과목
            'first' => [                              //대분류 ['first', 'second', 'third']
                'examTit' => "1차 시험",               //대분류 타이틀
                'examSubTxt' => ["필기" , "필기2"],     //대분류 소타이틀 Arr
                'examList' => [
                    ["유아체육론", "노인체육론"],         //소타이들 필기 - 과목
                    ["스포츠사회학", "운동역학"]          //소타이틀 필기2 - 과목
                ],
            ],
        ],
        'passStandard' => "필기: 과목당 40점"             //합격기준
    ],
    'faq' => [                                              //수동 QnA
        [
        'q' => "",                                               
        'a' => ""]
    ],
    'passHistory' => [                                  // 연도별 합격자 현황
        [
            'year' => 2025,                             //연도
            'firstApplied' => 1138,                     //응시자
             'firstPassed' => 201,                      //합격자
             'firstRate' => 17.66                       //합격률
         ]
        
    ],
],
```

#### 2. AI 종합 분석 리포트
1. 파일명:  exam_info.php
2. Method: GET
3. URL : ai/api/exam_info.php
4. Content-Type :	application/json; charset=utf-8
5. Body :ai/includes/exam_info_data.php
6. Request Parameters : selectedCert / String 
```php
'변리사' => [ //카테고리명 
    'examSubjects' => '', // 시험과목
    'examFormat' => '',   //시험형태 
    'passStandard' => '', //합격기준
    'examSchedule' => '', //시험일정
    'studyTip' => '',     //합격 핵심 전략
    'careerPath' => '',   //진로 및 활용
    'advantage' => ''     //취득 이점
],
```

#### 3. 상품 정보 API
1. 파일명:  Modal_product.js
2. Method: GET 
3. URL : /ai/api/productApi.php
4. Request Parameters : selectedCatId / String
5. Response : data[] <br>
   1. setList(data.list);  //상품 목록<br>
   2. setCnt(data.total_count);  //전체 상품 카운트
```php
RES :
[
    'total_count' : '' ,//모든 상품 갯수
    'list':[
        'title':''  , //과정 이름 ex)환급과정 / 종합과정 등
        'item':[     , // 개별 상품 정보
            'cm_benefit' : ''  , //상품 페네빗
            'cm_it_name' : ''  , //상품명
            'it_auto_status' : "1"  , // 자동상태
            'it_book_set' : "Y"   , //교재포함
            'it_cat_id' : ""  , //카테고리 아이디
            'it_id' : ''  , // 상품 코드
            'it_info' : "138"  , //과정 코드
            'it_info_name' : ""  , //강의 신청정보 상품이름
            'it_info_txt' : "환급 과정"  , //과정 명
            'it_link_info' : ""  , //연결 URL
            'it_none_dc' : ''  , //할인여부
            'it_notice_1' : ""  , //강의 구성
            'it_notice_9' : ""  , //수강기간
            'it_notice_10' : null  , // 빈값
            'it_price_1' : "530,000"  , //상품가격
            'it_sorting_idx' : ''  , //정렬순서
            'it_sug_price' :  ''  , //정가
            'item_sorting_idx' : "1"   , //정렬순서
            'price_to_coupon' : ''  , //쿠폰 할인 포함된 판매가격
            'trigger_event' :  "다음회차"  , // 동영상 수강연장
            'max_coupon_list' : [
                    'coupon_edate' : ''  , //쿠폰 종료날자
                    'coupon_sdate' : ''  , //쿠폰 시작날자
                    'cp_doc' : ''  , // 이벤트 설명
                    'cp_id' : ''  , //쿠폰 id
                    'cp_info_txt' : "20% 특별할인"  , //쿠폰 설명 
                    'cp_max_price' : "100000"  , //쿠폰 사용 최소 금액
                    'cp_name' : ''  , //쿠폰명
                    'cp_period_days' : ""  , // 쿠폰사용 기간
                    'cp_period_edate' : ""  , //쿠폰 사용 종료날자 (받은날로부터 cp_period_day 이후)
                    'cp_period_sdate' : "2026-01-30 16:00:00"  , //쿠폰 받은 일자
                    'cp_period_use' : "0"  , //적용 기간 0:생성일 / 1:설정일
                    'cp_price' : ""  , //할인 금액 or 할인율
                    'cp_price_type' : "1"  , //할인 방식 0: 금액 / 1:퍼센트
                    'len' : "2"  //cp_price 의 글자 수..
            ]   
        ]
    ]        
]
```

#### 4. 상담 신청 모달 API
##### 4-1. 상담 전용 카테고리
1. 파일명:  Modal_cscenter.js
2. Method: POST
3. URL : /popkon/ajax_open_fmb_cate_select.php
4. Request : json_encode
5. Request Parameters : selectedCatId / String
6. Response : fav_cate

##### 4-2 . 상담 날자 
1. 파일명:  Modal_cscenter.js
2. Method: GET
3. URL : /ai/api/csCenterApi.php
4. Request : json
5. Request Parameters : 'data' / String
6. Response : setCounselDayList

##### 4-2 . 상담 신청 submit
1. 파일명:  Modal_cscenter.js
2. Method: POST
3. URL : /popkon/ajax_go_counsel.php
4. Request : json
5. Response
```javascript
 //상담신정 submit
POST:[
    'fav' : '',         // 선택된 카테고리 이름    
    'ph' : '',          // 입력된 핸드폰 번호
    'have_time' : '',   // 개인정보 동의 유무
]
RES : 1 || 2 || 3   => 정상 등록      
```

## 4. js status
```javascript
const [dataLoaded, setDataLoaded] = useState(false);         //데이터 로딩
const [step, setStep] = useState(0);                         //질문 스텝
const [userProfile, setUserProfile] = useState({             //사용자 선택 값 
    background: "",
    duration: "",
    employment: "",
    dailyHours: 3,
    interests: [],
    goal: "",
    budget: ""
}); 
const [recommendations, setRecommendations] = useState([]);     //추천 데이터
const [showResults, setShowResults] = useState(false);          //결과 페이지 true:show
const [selectedCert, setSelectedCert] = useState(null);         //선택된 카테고리  
const [activeTab, setActiveTab] = useState('overview');         //자격증 상세보기 탭
const [compareList, setCompareList] = useState([]);             //비교 리스트 
const [showCompare, setShowCompare] = useState(false);          //비교 리스트 모달 true: show
const [searchQuery, setSearchQuery] = useState("");             //카테고리 검색값 
const [showAllCerts, setShowAllCerts] = useState(false);        //모든 카테고리 보기 
const [selectedCategory, setSelectedCategory] = useState("전체"); //자격증 검색데이터 default:전체
const [aiAnalysisLines, setAiAnalysisLines] = useState([]);     //추천 결과 ai추천 데이터 ( 타자효과있던곳)
const [showAiAnalysis, setShowAiAnalysis] = useState(false);    //추천결과 상세보기 ture: show
const [isFromAllCerts, setIsFromAllCerts] = useState(false);    //자격증 목록 view여부 treu:show
const [isAnalyzing, setIsAnalyzing] = useState(false);          //추천 결과 view treu:show
const [showCsmodal, setShowCsmodal] = useState(false);          //상담팝업 treu:show
const [visibleRecommendations, setVisibleRecommendations] = useState([]); //추천결과 카테고리 기준 배열
const [showproduct, setShowproduct] = useState(false);          //상품 목록 view treu:show
const [selectedCatId, setSelectedCatId] = useState(null);       //선택된 cat_id (상품/상담 모달에서 사용)
const [productList, setProductList] = useState([]);             //상품 목록 html
const [cateName , setCateName] = useState(null);                //선택된 카테고리 네임 (상품/상담 모달에서 사용)
```



**최초 작성일**: 2026-02-24
**마지막 수정일**: 2026-03-03
**작성자**: ina
**수정자** : 