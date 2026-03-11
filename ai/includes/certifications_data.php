<?php
    /**
     * 자격증 데이터 (PHP 배열)
     * 원본: ai_lecture_system.html의 certificationsDB
     */

    return [
        "감정평가사" => [
            'cat_id' => '001108',
            'pageUrl' => '/cp/?cat_id=001108',
            'category' => "전문자격", 'difficulty' => 4, 'difficultyLabel' => "어려움",
            'duration' => ['min' => 18, 'max' => 36, 'optimal' => 24],
            'monthlyHours' => ['min' => 100, 'recommended' => 120],
            'examSchedule' => ['year' => 2025, 'first' => "4월", 'second' => "7월", 'round' => "1차 4월, 2차 7월"],
            'passRate' => ['overall' => 9],
            'cost' => ['total' => "160~200만원"],
            'outlook' => 5,
            'salary' => ['entry' => 5000, 'mid' => 7000, 'senior' => 12000],
            'suitable' => ["부동산 관심자", "경제학 전공자", "금융권 경력자"],
            'tags' => ["고소득", "전문직", "부동산", "금융"],
            'description' => "토지·건물·기계 등의 경제적 가치를 평가하는 전문가",
            'overview' => "감정평가사는 토지, 건물, 기계, 항공기, 선박, 유가증권 등 유무형 재산의 경제적 가치를 판정하여 가액으로 표시하는 전문가입니다. 공시지가 조사·평가, 기업체 자산 재평가, 금융기관 담보물 평가 등의 업무를 수행합니다.",
            'employment' => ["감정평가법인", "금융기관", "공기업"],
            'certPath' => ["공인중개사", "감정평가사"],
            'studyTips' => ["감정평가이론이 핵심", "부동산학원론 기초 탄탄히", "2차 실무 계산 연습"],
            'career' => [
                'description' => "고소득 전문직으로, 감정평가법인 취업, 개인 사무소 개업, 금융기관·공기업 등 다양한 진로가 있습니다.",
                'fields' => ["감정평가법인 취업", "개인 감정평가사무소 개업", "금융기관 담보평가팀", "공기업 자산평가 부서", "법원 감정인"]
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => ["1차 시험"],
                        'examSubTxt' => ["필기시험"],
                        'examList' => [["민법", "경제학원론", "부동산학원론", "회계학", "감정평가 관계법규"]],
                    ],
                    'second' => [
                        'examTit' => ["2차 시험"],
                        'examSubTxt' => ["실기/논술"],
                        'examList' => [["감정평가실무", "감정평가이론", "감정평가및보상법규"]],
                    ],
                ],
                'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ]
        ],
        "경비지도사" => [
            'cat_id' => '001002',
            'pageUrl' => '/cp/?cat_id=001002',
            'category' => "전문자격", 'difficulty' => 4, 'difficultyLabel' => "어려움",
            'duration' => ['min' => 4, 'max' => 8, 'optimal' => 6],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'date' => "11월", 'note' => "1차·2차 동시"],
            'passRate' => ['overall' => 11],
            'cost' => ['total' => "40~50만원"],
            'outlook' => 3,
            'salary' => ['entry' => 2800, 'mid' => 3500, 'senior' => 4500],
            'suitable' => ["군·경찰 경력자", "보안업 관심자", "체력 자신있는 분"],
            'tags' => ["보안", "경비", "안전"],
            'description' => "경비업무의 전문적 관리·감독을 담당하는 전문가",
            'overview' => "경비지도사는 경비업법에 근거하여 민간경비원을 관리·감독하는 전문인력입니다. 사람의 신변보호, 국가중요시설 방호, 시설 안전 업무를 담당하는 경비원들을 효율적으로 지도합니다.",
            'employment' => ["경비업체", "보안회사", "대기업 보안팀"],
            'studyTips' => ["1차 과목은 ‘선택과 집중’", "2차 과목은 ‘만점을 목표로’", "기출문제 완벽 분석"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차",
                        'examSubTxt' => [""],
                        'examList' => [["법학개론", "민간경비론"]],
                    ],
                    'second' => [
                        'examTit' => "2차 (일반경비지도사 기준)",
                        'examSubTxt' => [""],
                        'examList' => [["경비업법", "경호학"]],
                    ],
                ],
                'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차 시험 : 상대평가", //합격기준
            ],
        ],
        "경영지도사" => [
            'cat_id' => '001093',
            'pageUrl' => '/cp/?cat_id=001093',
            'category' => "전문자격", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 10, 'max' => 18, 'optimal' => 12],
            'monthlyHours' => ['min' => 60, 'recommended' => 70],
            'examSchedule' => ['year' => 2025, 'first' => "3월", 'second' => "10월", 'round' => "1차 4월, 2차 7월"],
            'passRate' => ['overall' => 23],
            'cost' => ['total' => "50~65만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3500, 'mid' => 5000, 'senior' => 7000],
            'suitable' => ["경영 컨설팅 관심자", "MBA 준비자", "중소기업 지원 희망자"],
            'tags' => ["경영", "컨설팅", "중소기업"],
            'description' => "중소기업의 경영진단과 지도를 담당하는 전문가",
            'overview' => "경영지도사는 중소기업 경영 문제에 대한 종합 진단(경영컨설팅)을 수행하는 국가 전문자격사입니다. 인사·조직·노무, 재무·회계, 생산관리, 유통·판매관리 등에 대한 진단, 지도, 자문 업무를 담당합니다.",
            'employment' => ["컨설팅펌", "중소기업진흥공단", "프리랜서"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => ["1차"],
                        'examSubTxt' => [""],
                        'examList' => [["중소기업관계법령", "회계학개론", "경영학", "기업진단론", "조사방법론", "영어(공인어학성적 제출로 대체)"]],
                    ],
                    'second' => [
                        'examTit' => ["2차 마케팅분야"],
                        'examSubTxt' => [""],
                        'examList' => [["마케팅관리론", "시장조사론", "소비자행동론"]],
                    ],
                ],
//'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
            'studyTips' => ["인적자원/재무/마케팅 분야 선택", "실무 사례 학습"]
        ],
        "공인노무사" => [
            'cat_id' => '001092',
            'pageUrl' => '/cp/?cat_id=001092',
            'category' => "전문자격", 'difficulty' => 4, 'difficultyLabel' => "어려움",
            'duration' => ['min' => 18, 'max' => 36, 'optimal' => 24],
            'monthlyHours' => ['min' => 80, 'recommended' => 200],
            'examSchedule' => ['year' => 2025, 'first' => "5월", 'second' => "8월", 'third' => "11월", 'round' => "1차 5월, 2차 8월, 3차 11월"],
            'passRate' => ['overall' => 10],
            'cost' => ['total' => "60~150만원"],
            'outlook' => 5,
            'salary' => ['entry' => 4000, 'mid' => 6000, 'senior' => 10000],
            'suitable' => ["노동법 관심자", "인사담당 경력자", "상담 능력자"],
            'tags' => ["노동", "법률", "인사", "전문직"],
            'description' => "노동관계 법령 업무대행, 노사관계 컨설팅 전문가",
            'overview' => "공인노무사는 노동관계법령 및 노무관리 분야의 전문가로서, 근로자의 채용부터 퇴직까지 모든 법률문제를 담당하는 노사관계 전문가입니다. 노동조합 설립, 단체교섭, 부당해고 구제신청 등의 업무를 대리합니다.",
            'employment' => ["노무법인", "대기업 인사팀", "노동위원회"],
            'studyTips' => ["노동법이 가장 중요", "판례 학습 핵심", "2차 사례형 대비"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => ["1차 시험"],
                        'examSubTxt' => ["필기시험"],
                        'examList' => [["노동법 1", "노동법 2", "민법", "사회보험법", "경제학원론, 경영학개론 택 1"]],
                    ],
                    'second' => [
                        'examTit' => ["2차 시험"],
                        'examSubTxt' => ["논술"],
                        'examList' => [["노동법", "인사노무관리론", "행정쟁송법", "경영조직론, 노동경제학, 민사소송법 택 1"]],
                    ],
                    'third' => [
                        'examTit' => ["3차 시험"],
                        'examSubTxt' => ["「공인노무사법」 제4조제3항의 평정사항"],
                        'examList' => [["국가관, 사명감 등 정신자세", " 전문지식과 응용능력", "예의, 품행 및 성실성", "의사 발표의 정확성과 논리성"]],
                    ],
                ],
                'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
        ],
        "법무사" => [
            'cat_id' => '001132',
            'pageUrl' => '/cp/?cat_id=001132',
            'category' => "전문자격", 'difficulty' => 5, 'difficultyLabel' => "최상", 'badge' => "BEST",
            'duration' => ['min' => 24, 'max' => 36, 'optimal' => 30],
            'monthlyHours' => ['min' => 100, 'recommended' => 120],
            'examSchedule' => ['year' => 2025, 'first' => "8월 30일", 'second' => "10월 31일~11월 1일", 'round' => "1차 8월, 2차 11월"],
            'passRate' => ['overall' => 21],
            'cost' => ['total' => "150~220만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3500, 'mid' => 5000, 'senior' => 8000],
            'suitable' => ["법률 관심자", "꼼꼼한 성격", "문서 작성 능력자"],
            'tags' => ["법률", "등기", "소송", "전문직"],
            'description' => "등기, 공탁, 소송서류 작성을 대행하는 법률전문가",
            'overview' => "법무사는 법원과 검찰청에 제출하는 서류의 작성 및 등기·공탁 업무를 대행하는 법률 전문가입니다. 부동산 등기, 법인 등기, 소송서류 작성 등의 업무를 수행하며, 법률 서비스의 접근성을 높입니다.",
            'employment' => ["법무사사무소", "법무법인", "기업 법무팀"],
            'studyTips' => ["민법이 핵심", "조문과 판례 숙지", "2차 논술 연습"],
            'career' => [
                'description' => "고소득 전문직으로, 개인 법무사 사무소 개업, 합동 법인, 기업 법무팀, 법무 교육 등 다양한 진로가 있습니다."
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["객관식"],
                        'examList' => [
                            ["민법", "상법", " 민사집행법", "부동산등기법"]
                        ],
                    ],
                    'second' => [
                        'examTit' => " 2차 시험",
                        'examSubTxt' => ["주관식"],
                        'examList' => [
                            ["민사소송법", "형사소송법", "부동산등기법"]
                        ],
                    ],
                ],
                'passStandard' => "상대평가"
            ]
        ],
        "변리사" => [
            'cat_id' => '001110',
            'pageUrl' => '/cp/?cat_id=001110',
            'category' => "전문자격", 'difficulty' => 5, 'difficultyLabel' => "최상",
            'duration' => ['min' => 24, 'max' => 48, 'optimal' => 36],
            'monthlyHours' => ['min' => 110, 'recommended' => 130],
            'examSchedule' => ['year' => 2025, 'first' => "2월 15일", 'second' => "7월 18~19일", 'round' => "1차 4월, 2차 7월"],
            'passRate' => ['overall' => 18],
            'cost' => ['total' => "200~250만원"],
            'outlook' => 5,
            'salary' => ['entry' => 5000, 'mid' => 8000, 'senior' => 15000],
            'suitable' => ["이공계 전공자", "영어 능통자", "지적재산권 관심자"],
            'tags' => ["특허", "지적재산", "이공계", "고소득"],
            'description' => "특허·상표·디자인 등 산업재산권 출원 대리 전문가",
            'overview' => "변리사는 특허, 실용신안, 상표, 디자인 등 산업재산권의 출원부터 등록까지 모든 절차를 대리하는 전문자격사입니다. 산업재산권 분쟁사건 대리, 특허법원 소송 대리, 기업 지식재산권 자문 등의 업무를 수행합니다.",
            'employment' => ["특허법인", "대기업 IP팀", "연구소"],
            'studyTips' => ["특허법+민사소송법 핵심", "영어 명세서 능력 필요", "이공계 지식 활용"],
            'career' => [
                'description' => "4차 산업 유망 직업으로, 고소득 전문직 TOP 4에 해당합니다. 특허법인, 대기업 IP팀, 연구소 등 다양한 진로가 있습니다.",
                'fields' => ["특허법률사무소 개설", "특허법인 취업", "대기업 특허팀/IP팀", "특허청 심사관", "연구소 기술이전팀"]
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => ["1차 시험"],
                        'examSubTxt' => ["필기시험"],
                        'examList' => [["산업재산권법", "민법개론", "자연과학개론"]],
                    ],
                    'second' => [
                        'examTit' => ["2차 시험"],
                        'examSubTxt' => ["실기/논술"],
                        'examList' => [["특허법", "상표법", "민사소송법", "선택과목"]],
                    ],
                ],
                'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 선택 50점, 필수 각 40점, 평균 60점"
            ],
            'passHistory' => [
                ['year' => 2025, 'firstApplied' => 1138, 'firstPassed' => 201, 'firstRate' => 17.66],
                ['year' => 2024, 'firstApplied' => 1149, 'firstPassed' => 200, 'firstRate' => 17.4]
            ],
            'faq' => [
                ['q' => "변리사 시험에 이공계 전공이 필수인가요?", 'a' => "필수는 아니지만, 2차 시험의 자연과학개론과 실무에서 이공계 지식이 크게 유리합니다."]
            ]
        ],
        "행정사" => [
            'cat_id' => '001011',
            'pageUrl' => '/cp/?cat_id=001011',
            'category' => "전문자격", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 8, 'max' => 12, 'optimal' => 10],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'first' => "5월 31일", 'second' => "9월 27일", 'round' => '1차 5월, 2차 10월'],
            'passRate' => ['overall' => 16],
            'cost' => ['total' => "50~60만원"],
            'outlook' => 3,
            'salary' => ['entry' => 2500, 'mid' => 4000, 'senior' => 5000],
            'suitable' => ["행정 업무 관심자", "민원 업무 경력자", "40-50대 이직자"],
            'tags' => ["행정", "민원", "허가", "창업"],
            'description' => "행정기관 제출 서류 작성을 대행하는 행정전문가",
            'overview' => "행정사는 다른 사람의 위임을 받아 행정기관 제출 서류의 작성, 번역, 제출 대행, 인허가 신청 대리 등을 수행합니다. 정년 없는 평생 직업으로 안정적인 수입을 기대할 수 있습니다.",
            'employment' => ["행정사사무소", "법무법인", "출입국대행업체"],
            'studyTips' => ["행정법이 핵심", "2차 논술형 연습", "실무 법령 숙지"],
            'career' => [
                'description' => "정년 없는 평생 직업으로, 3,000개가 넘는 방대한 업무 분야가 있습니다. 창업에 유리한 자격증입니다.",
                'fields' => ["행정사사무소 개설", "법인 설립 대행", "출입국 업무 대행", "인허가 업무 대행", "사기업/공공기관 취업"]
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => ["1차 시험"],
                        'examSubTxt' => ["필기시험"],
                        'examList' => [["민법(총칙)", "행정법", "행정학개론"]],
                    ],
                    'second' => [
                        'examTit' => ["2차 시험"],
                        'examSubTxt' => ["실기/논술"],
                        'examList' => [["민법(계약)", "행정절차론", "사무관리론", "행정사실무법[일반 행정사]"]],
                    ],
                ],
                'passStandard' => "1,2차 공통: 매 과목 40점 이상, 전 과목 평균 60점 이상"
            ],
            'passHistory' => [
                ['year' => 2025, 'firstApplied' => 6320, 'firstPassed' => 2518, 'firstRate' => 39.8]
            ],
            'faq' => [
                ['q' => "행정사 업무 범위가 얼마나 넓은가요?", 'a' => "3,000개가 넘는 업무 분야가 있으며, 인허가, 출입국, 법인설립 등 다양한 행정 업무를 대행할 수 있습니다."]
            ]
        ],

// ==================== 금융/보험/회계 (8개) ====================
        "보험계리사" => [
            'cat_id' => '001135',
            'pageUrl' => '/cp/?cat_id=001135',
            'category' => "금융/보험/회계", 'difficulty' => 5, 'difficultyLabel' => "최상",
            'duration' => ['min' => 36, 'max' => 60, 'optimal' => 48],
            'monthlyHours' => ['min' => 100, 'recommended' => 120],
            'examSchedule' => ['year' => 2025, 'round' => "1차 4월, 2차 7월"],
            'passRate' => ['overall' => 23],
            'allPassTit' => "1차 5개년 평균",
            'cost' => ['total' => "80만원"],
            'outlook' => 5,
            'salary' => ['entry' => 5000, 'mid' => 8000, 'senior' => 15000],
            'suitable' => ["수학 전공자", "통계학 전공자", "금융권 희망자"],
            'tags' => ["보험", "수학", "금융", "고소득"],
            'description' => "보험상품 가격 산출과 리스크 관리 전문가",
            'overview' => "보험계리사는 보험료 산출, 책임준비금 계상, 보험상품 개발, 위험 분석·평가 등을 수행하는 보험 수리 전문가입니다. 수학·통계적 분석을 활용하여 보험 및 금융의 불확실성을 관리합니다.",
            'employment' => ["보험사", "금융감독원", "컨설팅펌"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차",
                        'examSubTxt' => [""],
                        'examList' => [["보험계약법", "보험업법 및 근로자퇴직급여보장법", "경제학원론", "보험수학", "회계원리"]],
                    ],
                    'second' => [
                        'examTit' => "2차",
                        'examSubTxt' => [""],
                        'examList' => [["계리리스크관리", "보험수리핛", "연금수리학", "계리모형론", "재무관리 및 금융공학"]],
                    ],
                ],
//'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
            'studyTips' => ["수리통계 기초 필수", "보험수학 집중", "장기전 각오"],
            'allPassTit' => "1차 5개년 평균",
        ],
        "빅데이터분석기사" => [
            'cat_id' => '001119',
            'pageUrl' => '/cp/?cat_id=001119',
            'category' => "금융/보험/회계", 'difficulty' => 2, 'difficultyLabel' => "보통",
            'duration' => ['min' => 3, 'max' => 6, 'optimal' => 4],
            'monthlyHours' => ['min' => 50, 'recommended' => 55],
            'examSchedule' => ['year' => 2025, 'round' => "연 2회"],
            'passRate' => ['overall' => 52],
            'cost' => ['total' => "25~40만원"],
            'outlook' => 5,
            'salary' => ['entry' => 3500, 'mid' => 5000, 'senior' => 7000],
            'suitable' => ["데이터 분석 관심자", "통계학 전공자", "파이썬 가능자"],
            'tags' => ["빅데이터", "데이터분석", "AI", "파이썬"],
            'description' => "대용량 데이터 분석으로 가치를 도출하는 전문가",
            'overview' => "빅데이터분석기사는 대용량 데이터에서 유용한 정보를 추출하고 결과를 예측하는 데이터 분석 전문가입니다. 빅데이터 분석 기획, 데이터 수집·저장·처리, 분석 및 시각화 업무를 수행합니다.",
            'employment' => ["IT기업", "금융사", "유통사", "컨설팅펌"],
            'studyTips' => ["파이썬/R 코딩 필수", "통계학 기초 중요", "실기 코딩 테스트 연습"],

            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["빅데이터분석기획", "빅데이터탐색", " 빅데이터모델링", "빅데이터결과해석\n"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["빅데이터분석실무"]
                        ],
                    ],
                ],
            ]

        ],
        "세무사" => [
            'cat_id' => '001138',
            'pageUrl' => '/cp/?cat_id=001138',
            'category' => "금융/보험/회계", 'difficulty' => 4, 'difficultyLabel' => "어려움", 'badge' => "200% 환급",
            'duration' => ['min' => 18, 'max' => 36, 'optimal' => 24],
            'monthlyHours' => ['min' => 100, 'recommended' => 200],
            'examSchedule' => ['year' => 2025, 'first' => "5월", 'second' => "7월", 'round' => "1차 5월, 2차 7월"],
            'passRate' => ['overall' => 12],
            'cost' => ['total' => "80~130만원"],
            'outlook' => 5,
            'salary' => ['entry' => 4000, 'mid' => 6000, 'senior' => 10000],
            'suitable' => ["회계 경력자", "세법 관심자", "숫자에 강한 사람"],
            'tags' => ["세무", "회계", "고소득", "전문직"],
            'description' => "세금 관련 신고대리, 세무조정 업무 조세전문가",
            'overview' => "세무사는 납세자를 대리하여 세금 관련 신고·신청·청구 업무를 수행하는 조세 전문가입니다. 세무대리, 기장대리, 세무조정, 세무자문, 행정심판대리 등의 업무를 담당합니다.",
            'employment' => ["세무법인", "회계법인", "대기업 세무팀"],
            'studyTips' => ["세법 암기량 많음", "회계학 CPA 수준 대비", "최신 세법개정 반영"],
            'career' => [
                'description' => "고소득 전문직으로, 세무법인 취업, 개인 세무사무소 개업, 기업 세무팀 등 다양한 진로가 있습니다.",
                'fields' => ["세무법인 취업", "개인 세무사무소 개업", "회계법인", "대기업 세무팀", "국세청 등 공공기관"]
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["필기시험"],
                        'examList' => [["재정학", "세법학개론", "회계학개론", "선택과목 상법, 민법, 행정소송법 택 1"]],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["실기/논술"],
                        'examList' => [["세법학1부", "세법학2부", "회계학1부", "회계학2부"]],
                    ],
                ],
                'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
            'faq' => [
                ['q' => "세무사와 회계사의 차이는 무엇인가요?", 'a' => "세무사는 세무 업무 전문, 회계사는 회계감사까지 가능합니다. 세무사가 준비기간이 짧고 합격률이 높습니다."]
            ]
        ],
        "손해사정사" => [
            'cat_id' => '001067',
            'pageUrl' => '/cp/?cat_id=001067',
            'category' => "금융/보험/회계", 'difficulty' => 3, 'difficultyLabel' => "중상", 'badge' => "BEST",
            'duration' => ['min' => 6, 'max' => 12, 'optimal' => 8],
            'monthlyHours' => ['min' => 60, 'recommended' => 80],
            'examSchedule' => ['year' => 2025, 'round' => "1차 4월, 2차 7월"],
            'passRate' => ['overall' => 15],
            'cost' => ['total' => "110~120만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3500, 'mid' => 5000, 'senior' => 7000],
            'suitable' => ["보험업 종사자", "법률 관심자", "분석력 있는 분"],
            'tags' => ["보험", "손해", "사고", "전문직"],
            'description' => "보험사고 발생 시 손해액과 보험금 산정 전문가",
            'overview' => "손해사정사는 보험사고 발생 시 손해액과 보험금을 객관적·공정하게 산정하는 전문가입니다. 보험금 지급의 객관성을 확보하여 보험계약자와 피해자의 권익을 보호합니다.",
            'employment' => ["손해보험사", "손해사정법인", "독립사정사"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["객관식"],
                        'examList' => [["보험업법", "손해사정이론", "보험계약법(상법 중 보험편)"]],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["논술형"],
                        'examList' => [["2차시험 논술형", "의학이론", "책임, 근재보험", "제3보험", "자동차보험(대인)"]],
                    ],
                ],
//'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
            'studyTips' => ["신체/차량/재물 종목 선택", "보험약관 숙지 필수", "법률 기초 필요"]
        ],
        "손해평가사" => [
            'cat_id' => '001058',
            'pageUrl' => '/cp/?cat_id=001058',
            'category' => "금융/보험/회계", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 4, 'max' => 8, 'optimal' => 5],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'first' => "5월", 'second' => "8월", 'round' => "1차 5월, 2차 8월"],
            'passRate' => ['overall' => 14],
            'cost' => ['total' => "50~60만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5500],
            'suitable' => ["농업 관심자", "보험업 관심자", "현장 업무 선호자"],
            'tags' => ["농업", "재해", "보험"],
            'description' => "농작물 피해에 대한 손해 평가를 담당하는 전문가",
            'overview' => "손해평가사는 농어업재해보험에서 손해액을 공정하게 산정하는 전문가입니다. 기후변화로 자연재해가 빈번해지면서 농어가 보호를 위해 2015년 국가자격으로 신설되었습니다.",
            'employment' => ["농협", "농업정책보험금융원", "손해평가법인"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["객관식"],
                        'examList' => [["상법 [보험편]", "농어업재해보험법", "재배학 및 원예작물학"]],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["서술형"],
                        'examList' => [["농작물재해보험 및 가축재해보험의 이론과 실무", "농작물재해보험 및 가축재해보험 손해평가의 이론과 실무"]],
                    ],
                ],
//'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
            'studyTips' => ["농업재해보험법 숙지", "농작물 특성 이해", "공식 암기 필요"]
        ],
        "신용분석사" => [
            'cat_id' => '003016',
            'pageUrl' => '/cp/?cat_id=003016',
            'category' => "금융/보험/회계", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 2, 'max' => 4, 'optimal' => 3],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 28],
            'cost' => ['total' => "35~45만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5500],
            'suitable' => ["금융권 취업 희망자", "기업분석 관심자", "회계 기초 보유자"],
            'tags' => ["금융", "신용", "분석"],
            'description' => "기업의 신용 상태를 분석·평가하는 금융 전문가",
            'overview' => "신용분석사는 기업의 회계·비회계 자료를 분석하여 신용상태를 판단·평가하는 금융전문가입니다. 재무분석, 현금흐름분석, 시장환경분석을 통해 기업의 신용등급을 결정합니다.",
            'employment' => ["은행", "신용평가사", "여신전문금융사"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["객관식"],
                        'examList' => [["회계학Ⅰ", "회계학Ⅱ", "신용분석", "종합신용평가"]]
                    ],
// 'second' => [
//     'examTit' => "2차 시험",
//     'examSubTxt' => "필답형",
//     'examList' => ["농작물재해보험 및 가축재해보험의 이론과 실무", "농작물재해보험 및 가축재해보험 손해평가의 이론과 실무"]
// ],
                ],
//'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
            'studyTips' => ["재무제표 분석 핵심", "신용평가 모형 이해", "기출문제 반복"]
        ],
        "재경관리사" => [
            'cat_id' => '003006',
            'pageUrl' => '/cp/?cat_id=003006',
            'category' => "금융/보험/회계", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 2, 'max' => 4, 'optimal' => 3],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 8회"],
            'passRate' => ['overall' => 29],
            'cost' => ['total' => "20~30만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5500],
            'suitable' => ["재무담당자", "회계 입문자", "경리 업무자"],
            'tags' => ["회계", "재무", "세무", "실무"],
            'description' => "재무·회계·세무 실무 능력 인증 (삼일회계법인)",
            'overview' => "재경관리사는 회계, 세무, 원가, 경영관리 분야의 이론과 실무 능력을 겸비한 재경 전문가 자격입니다. 재무회계, 세무회계, 원가관리회계 지식을 바탕으로 기업의 재경업무를 수행합니다.",
            'employment' => ["대기업 재무팀", "금융기관", "회계법인"],
            'studyTips' => ["재무회계·세무회계·원가 3과목", "실무 위주 문제", "기출 분석"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["재무회계", "세무회계", "원가관리회계"]
                        ],
                    ],
                ],
            ]
        ],
        "투자자산운용사" => [
            'cat_id' => '003011',
            'pageUrl' => '/cp/?cat_id=003011',
            'category' => "금융/보험/회계", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 3, 'max' => 6, 'optimal' => 2],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 4회"],
            'passRate' => ['overall' => 39],
            'cost' => ['total' => "50~70만원"],
            'outlook' => 4,
            'salary' => ['entry' => 4000, 'mid' => 5000, 'senior' => 7000],
            'suitable' => ["금융권 취업 희망자", "투자 관심자", "증권사 희망자"],
            'tags' => ["투자", "자산운용", "금융", "증권"],
            'description' => "투자일임·투자자문 업무 수행 금융투자전문가",
            'overview' => "투자자산운용사는 펀드 등 집합투자재산의 운용업무를 수행하는 금융투자 전문가입니다. 주식, 채권, 파생상품 등 다양한 금융상품에 투자하여 고객의 자산을 운용합니다.",
            'employment' => ["증권사", "자산운용사", "은행 PB센터"],
            'studyTips' => ["금융상품 이해 핵심", "법규 암기", "계산문제 연습"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => ["1과목", "2과목", '3과목'],
                        'examList' => [
                            ["금융상품 및 세제", "투자운용 및 전략 II 및 투자분석", "직무윤리 및 법규 투자운용 및 전략 I"],
                            ["투자운용 및 전략 II 및 투자분석\n"],
                            ["직무윤리 및 법규 투자운용 및 전략 I"]
                        ],
                    ],
                ],
            ]
        ],

// ==================== 소방/전기/위험물 (9개) ====================
        "소방설비기사" => [
            'cat_id' => '001074',
            'pageUrl' => '/cp/?cat_id=001074',
            'category' => "소방/전기/위험물", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 3, 'max' => 8, 'optimal' => 5],
            'monthlyHours' => ['min' => 50, 'recommended' => 70],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 34],
            'allPassTit' => "전기/기계 평균",
            'cost' => ['total' => "20~50만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5500],
            'suitable' => ["전기/기계 관심자", "현장직 희망자", "안전 분야 관심자"],
            'tags' => ["소방", "안전", "설비", "기술"],
            'description' => "소방시설 설계·시공·감리 업무 담당 소방전문가",
            'overview' => "소방설비기사는 소방시설의 설계, 시공, 점검, 유지관리를 담당하는 전문가입니다. 건물의 대형화·고층화에 따라 화재 예방과 초기 진압의 중요성이 커지면서 전문인력 수요가 증가하고 있습니다.",
            'employment' => ["소방설비업체", "건설사", "대기업 안전팀"],
            'studyTips' => ["기계/전기 분야 선택", "소방원론·법규 기초", "실기 필답형"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "기계",
                        'examSubTxt' => ["필기", "실기"],
                        'examList' => [
                            ["소방안전관리론 및 화재역학", "소방수리학, 약제화학 및 소방전기", " 소방관련법령", "소방기계시설의 구조 및 원리"],
                            ["소방 기계시설 설계 및 시공 실무"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "전기",
                        'examSubTxt' => ["필기", "실기"],
                        'examList' => [
                            ["소방원론", "소방전기일반", "소방관계법규", "소방전기시설의 구조 및 원리"],
                            ["소방전기시설 설계 및 시공 실무"]
                        ],
                    ],
                ],
                'passStandard' => "기계  25% / 전기 42%"
            ],
        ],
        "소방시설관리사" => [
            'cat_id' => '001085',
            'pageUrl' => '/cp/?cat_id=001085',
            'category' => "소방/전기/위험물", 'difficulty' => 4, 'difficultyLabel' => "어려움",
            'duration' => ['min' => 12, 'max' => 24, 'optimal' => 18],
            'monthlyHours' => ['min' => 60, 'recommended' => 120],
            'examSchedule' => ['year' => 2025, 'round' => "1차 5월, 2차 9월"],
            'passRate' => ['overall' => 6],
            'cost' => ['total' => "50~90만원"],
            'outlook' => 4,
            'salary' => ['entry' => 6000, 'mid' => 8000, 'senior' => 9000],
            'suitable' => ["소방기사 보유자", "관리자급 희망자", "소방 경력자"],
            'tags' => ["소방", "관리", "안전"],
            'description' => "소방시설의 점검·정비·관리를 총괄하는 최상위 자격",
            'overview' => "소방시설관리사는 1,500㎡ 이상 건물의 소방시설을 점검하고 관할 소방서에 보고하는 전문가입니다. 방화관리자로 선임되어 건물의 화재 예방과 안전관리를 총괄합니다.",
            'employment' => ["소방시설관리업체", "대형건물 관리", "공공기관"],
            'studyTips' => ["소방기사 취득 후 도전", "점검실무 이해", "법규 철저히"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["소방안전관리론 및 화재역학", "소방수리학, 약제화학 및 소방전기", " 소방관련법령", "위험물의 성상 및 시설기준", "소방시설의 구조원리"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["소방시설의 점검", "소방시설의 설계 및 시공"]
                        ],
                    ],
                ],
            ],
        ],
        "위험물기능사" => [
            'cat_id' => '001083',
            'pageUrl' => '/cp/?cat_id=001083',
            'category' => "소방/전기/위험물", 'difficulty' => 1, 'difficultyLabel' => "하",
            'duration' => ['min' => 1, 'max' => 2, 'optimal' => 1.5],
            'monthlyHours' => ['min' => 30, 'recommended' => 40],
            'examSchedule' => ['year' => 2025, 'round' => "연 4회"],
            'passRate' => ['overall' => 41],
            'cost' => ['total' => "20~30만원"],
            'outlook' => 3,
            'salary' => ['entry' => 2400, 'mid' => 3000, 'senior' => 3500],
            'suitable' => ["화학 관심자", "주유소 취업 희망자", "산업현장 종사자"],
            'tags' => ["위험물", "안전", "화학", "입문"],
            'description' => "위험물을 안전하게 저장·취급하는 기능 인력",
            'overview' => "위험물기능사는 발화성, 인화성, 폭발성 위험물을 안전하게 취급·관리하는 기초 자격입니다. 위험물 취급소에서 각 류별 위험물 점검, 작업자 지시, 안전관리 업무를 수행합니다.",
            'employment' => ["주유소", "화학공장", "석유화학업체"],
            'studyTips' => ["위험물 종류별 특성 암기", "CBT 상시시험", "기출 위주"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["필기"],
                        'examList' => [
                            ["화재예방과 소화방법", "위험물의 화학적 성질 및 취급"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["실기"],
                        'examList' => [
                            ["위험물 취급 실무"]
                        ],
                    ],
                ],
            ],
        ],
        "위험물산업기사" => [
            'cat_id' => '001094',
            'pageUrl' => '/cp/?cat_id=001094',
            'category' => "소방/전기/위험물", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 2, 'max' => 4, 'optimal' => 3],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 48],
            'cost' => ['total' => "20~30만원"],
            'outlook' => 3,
            'salary' => ['entry' => 2800, 'mid' => 3500, 'senior' => 4000],
            'suitable' => ["화학 관련 전공자", "위험물 취급 업무자", "산업현장 경력자"],
            'tags' => ["위험물", "안전", "화학"],
            'description' => "위험물 제조·저장·취급 시설의 안전관리 담당자",
            'overview' => "위험물산업기사는 위험물 제조·저장·취급 시설의 안전관리를 담당하는 국가기술자격입니다. 위험물을 안전하게 취급·저장하고, 각 설비 및 시설에 대한 정기 안전점검을 수행합니다. 제1류~제6류 모든 위험물을 관리할 수 있어 취업 영역이 넓습니다.",
            'employment' => ["화학공장", "석유정제업체", "제조업체"],
            'studyTips' => ["위험물기능사 먼저 취득", "화학 기초 필요", "실기 작업형 연습"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["필기"],
                        'examList' => [
                            ["물질의 물리·화학적 성질", "화재예방 및 소화방법", " 위험물 성상 및 취급", "안전관리법령"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["실기"],
                        'examList' => [
                            ["위험물 취급 실무"]
                        ],
                    ],
                ],
                'passStandard' => "1차: 과목당 40점, 평균 60점/ 2차: 60점"
            ],
        ],
        "위험물기능장" => [
            'cat_id' => '001077',
            'pageUrl' => '/cp/?cat_id=001077',
            'category' => "소방/전기/위험물", 'difficulty' => 4, 'difficultyLabel' => "어려움",
            'duration' => ['min' => 12, 'max' => 24, 'optimal' => 18],
            'monthlyHours' => ['min' => 60, 'recommended' => 80],
            'examSchedule' => ['year' => 2025, 'round' => "연 2회"],
            'passRate' => ['overall' => 42],
            'cost' => ['total' => "30~40만원"],
            'outlook' => 3,
            'salary' => ['entry' => 3500, 'mid' => 4500, 'senior' => 5500],
            'suitable' => ["위험물 분야 숙련자", "관리감독 희망자", "경력 10년 이상"],
            'tags' => ["위험물", "기능장", "관리"],
            'description' => "위험물 분야 최고급 기술자격, 관리감독자 역할",
            'overview' => "위험물기능장은 위험물 관리 분야 최고 수준의 자격으로, 산업현장의 작업관리와 기능인력 지도·감독을 담당합니다. 경영계층과 생산계층을 연결하는 현장 중간관리자 역할을 수행합니다.",
            'employment' => ["대형 화학공장", "석유화학단지", "안전관리업체"],
            'studyTips' => ["실무경력 필수", "종합적 지식 요구", "실기 작업형 중요"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["필기"],
                        'examList' => [
                            ["일반화학 및 유체역학 ", "위험물의 성질 및 취급 ", "시설기준", "안전관리법령", "공업경영"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["실기"],
                        'examList' => [
                            ["위험물 취급 실무"]
                        ],
                    ],
                ],
                'passStandard' => "1차·2차: 60점"
            ],
        ],
        "전기기능사" => [
            'cat_id' => '001054',
            'pageUrl' => '/cp/?cat_id=001054',
            'category' => "소방/전기/위험물", 'difficulty' => 1, 'difficultyLabel' => "하",
            'duration' => ['min' => 3, 'max' => 6, 'optimal' => 4],
            'monthlyHours' => ['min' => 40, 'recommended' => 40],
            'examSchedule' => ['year' => 2025, 'round' => "연 4회"],
            'passRate' => ['overall' => 70],
            'cost' => ['total' => "15~25만원"],
            'outlook' => 3,
            'salary' => ['entry' => 2800, 'mid' => 3400, 'senior' => 4000],
            'suitable' => ["전기 입문자", "기술직 희망자", "현장 취업 희망자"],
            'tags' => ["전기", "기능사", "입문"],
            'description' => "전기 설비의 기초 설치·보수·점검 기능 인력",
            'overview' => "전기기능사는 전기설비의 설치, 보수, 검사, 시험, 관리를 수행하는 기초 기술자격입니다. 빌딩, 공장, 주택의 전선·케이블·전기기계 설치와 관리를 담당하며, 연간 1만 명 이상이 응시합니다.",
            'employment' => ["전기공사업체", "건설현장", "시설관리업체"],
            'studyTips' => ["전기이론 기초", "실기 작업 연습", "CBT 기출 반복"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["전기이론", "전기기기", " 소방관련법령", "전기설비"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["전기설비작업"]
                        ],
                    ],
                ],
            ],
        ],
        "전기(산업)기사" => [
            'cat_id' => '001063',
            'pageUrl' => '/cp/?cat_id=001063',
            'category' => "소방/전기/위험물", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 4, 'max' => 10, 'optimal' => 6],
            'monthlyHours' => ['min' => 60, 'recommended' => 80],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 32],
            'cost' => ['total' => "40~50만원"],
            'outlook' => 5,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5500],
            'suitable' => ["전기공학 전공자", "현장직 희망자", "공기업 취업 희망자"],
            'tags' => ["전기", "에너지", "공기업", "기술"],
            'description' => "전기설비의 설계·시공·감리를 담당하는 전기 전문가",
            'overview' => "전기기사는 전기설비의 설계, 시공, 검사, 운전, 유지보수를 담당하는 전문가입니다. 전기는 가장 기본적인 에너지로 관련 설비에 높은 전문성이 요구되며, 전력 산업 발전과 함께 수요가 꾸준합니다.",
            'employment' => ["한국전력", "한전KDN", "발전회사", "전기공사업체"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => ["객관식"],
                        'examList' => [["전기자기학", "전력공학", "전기기기", "회로이론 및 제어공학", "전기설비기술기준"]],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => ["필답형"],
                        'examList' => [["전기설비설계 및 관리"]],
                    ],
                ],
//'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
            'studyTips' => ["전력공학·회로이론 핵심", "계산문제 공식 암기", "기출 10년치"]
        ],
        "화재감식평가(산업)기사" => [
            'cat_id' => '001129',
            'pageUrl' => '/cp/?cat_id=001129',
            'category' => "소방/전기/위험물", 'difficulty' => 2, 'difficultyLabel' => "보통",
            'duration' => ['min' => 4, 'max' => 8, 'optimal' => 6],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 39],
            'cost' => ['total' => "30~40만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5500],
            'suitable' => ["소방 관심자", "과학수사 관심자", "분석력 있는 분"],
            'tags' => ["화재", "감식", "소방", "수사"],
            'description' => "화재 원인 및 피해 규모를 조사·평가하는 전문가",
            'overview' => "화재감식평가기사는 화재현장에서 원인조사, 피해조사, 화재분석을 통해 과학적으로 발생 원인을 규명하는 전문가입니다. 건축물, 전기, 가스, 차량 등 분야별 화재감식을 수행합니다.",
            'employment' => ["소방서", "보험사", "화재감식업체", "국과수"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => ["객관식"],
                        'examList' => [["화재조사론", "화재감식론", "증거물관리 및 법과학", "화재조사 보고 및 피해평가", "화재조사 관계법규"]],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => ["필답형"],
                        'examList' => [["화재감식 실무"]],
                    ],
                ],
                //'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
            'studyTips' => ["화재조사론 핵심", "연소공학 기초", "현장 조사 능력"]
        ],
        "화학분석기사" => [
            'cat_id' => '001112',
            'pageUrl' => '/cp/?cat_id=001112',
            'category' => "소방/전기/위험물", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 4, 'max' => 8, 'optimal' => 5],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 21],
            'cost' => ['total' => "30~40만원"],
            'outlook' => 3,
            'salary' => ['entry' => 3000, 'mid' => 3800, 'senior' => 4800],
            'suitable' => ["화학 전공자", "분석업무 관심자", "연구직 희망자"],
            'tags' => ["화학", "분석", "연구"],
            'description' => "화학적 방법과 기기를 활용하여 화학물질의 성분을 분석하는 전문가\n",
            'overview' => "화학분석기사는 화학물질의 성분과 특성을 분석하는 전문가입니다. 품질관리, 환경분석, 연구개발 등의 분야에서 각종 분석장비를 활용하여 정밀한 화학분석 업무를 수행합니다.",
            'employment' => ["화학업체", "제약회사", "환경분석업체", "연구소"],
            'studyTips' => ["분석화학 기초", "기기분석 이해", "실기 실험 연습"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => ["객관식"],
                        'examList' => [
                            ["화학의 이해와 환경·안전관리", "분석계획 수립과 분석화학 기초", " 화학물질 특성분석", "화학물질 구조 및 표면분석"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => ["복합형"],
                        'examList' => [
                            ["화학분석실무"]
                        ],
                    ],
                ],
                'passStandard' => "필기 : 100점 만점으로 과목당 40점 이상, 전과목 평균 60점 이상 / 실기 : 100점 만점 60점 이상"
            ],
        ],

        // ==================== 심리/상담 (4개) ====================
        "사회복지사 1급" => [
            'cat_id' => '001006',
            'pageUrl' => '/cp/?cat_id=001006',
            'category' => "심리/상담", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 3, 'max' => 6, 'optimal' => 4],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'date' => "매년 1월"],
            'passRate' => ['overall' => 40],
            'cost' => ['total' => "30~40만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2400, 'mid' => 3200, 'senior' => 4000],
            'suitable' => ["복지 관심자", "사회공헌 관심자", "사회복지학 전공자"],
            'tags' => ["복지", "상담", "사회공헌"],
            'description' => "사회복지 업무를 전문적으로 수행하는 복지 전문가",
            'overview' => "사회복지사는 청소년, 노인, 여성, 장애인 등 다양한 사회적·개인적 문제를 겪는 분들을 돕는 전문가입니다. 사회복지학 전문지식을 활용하여 문제를 진단·평가하고 해결을 지원합니다.",
            'employment' => ["사회복지관", "병원", "공공기관", "NGO"],
            'studyTips' => ["사회복지실천론 핵심", "법규 암기", "8영역 골고루"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["사회복지기초", "사회복지실천", "사회복지정책과 제도"]
                        ],
                    ],
                ],
            ],
        ],
        "임상심리사 2급" => [
            'cat_id' => '001013',
            'pageUrl' => '/cp/?cat_id=001013',
            'category' => "심리/상담", 'difficulty' => 2, 'difficultyLabel' => "보통",
            'duration' => ['min' => 6, 'max' => 12, 'optimal' => 9],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 34],
            'cost' => ['total' => "30~40만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2800, 'mid' => 3500, 'senior' => 4500],
            'suitable' => ["심리학 전공자", "병원 취업 희망자", "상담 관심자"],
            'tags' => ["심리", "임상", "상담", "병원"],
            'description' => "심리검사와 상담을 수행하는 임상심리 전문가",
            'overview' => "임상심리사는 국민의 심리적 건강을 위해 심리검사, 심리치료, 상담, 심리재활 등을 수행하는 전문가입니다. 병원, 상담센터, 학교 등에서 활동하며, 정신건강에 대한 관심 증가로 수요가 늘고 있습니다.",
            'employment' => ["정신과 병원", "상담센터", "Wee센터"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => ["객관식"],
                        'examList' => [["심리학개론", "이상심리학", "임상심리학", "심리상담", "심리검사"]],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => ["필답형"],
                        'examList' => [["기초심리평가", "기초심리상담", "심리치료", "임상심리의 자문, 교육, 재활"]],
                    ],
                ],
//'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
            'studyTips' => ["실기 서술형 난이도 높음", "심리검사 해석 중요", "실습수련 필수"]
        ],
        "직업상담사 2급" => [
            'cat_id' => '001001',
            'pageUrl' => '/cp/?cat_id=001001',
            'category' => "심리/상담", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 2, 'max' => 5, 'optimal' => 3],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 44],
            'cost' => ['total' => "35~50만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2800, 'mid' => 3400, 'senior' => 4000],
            'suitable' => ["취업지원 관심자", "상담 선호자", "HR 관심자"],
            'tags' => ["직업", "상담", "취업", "HR"],
            'description' => "구직자의 직업 선택과 취업을 지원하는 상담 전문가",
            'overview' => "직업상담사는 구직자에게 직업 정보 제공, 적성검사, 취업 상담 등을 수행하는 전문가입니다. 청년, 경력단절여성, 노인 등을 대상으로 진로 안내와 일자리 알선을 담당합니다.",
            'employment' => ["고용센터", "대학 취업지원센터", "직업훈련기관"],
            'studyTips' => ["직업상담학 핵심", "노동시장론 이해", "실기 서술 연습"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => [""],
                        'examList' => [["직업심리, 직업상담 및 취업지원", "직업정보", "노동시장", "고용노동관계법규(l)"]],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => [""],
                        'examList' => [["직업상담실무"]],
                    ],
                ],
//'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
        ],
        "청소년상담사" => [
            'cat_id' => '001007',
            'pageUrl' => '/cp/?cat_id=001007',
            'category' => "심리/상담", 'difficulty' => 1, 'difficultyLabel' => "쉬움", 'badge' => "BEST",
            'duration' => ['min' => 6, 'max' => 12, 'optimal' => 8],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'round' => "연 1회"],
            'passRate' => ['overall' => 75],
            'cost' => ['total' => "40~50만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2800, 'mid' => 3500, 'senior' => 4500],
            'suitable' => ["청소년 교육 관심자", "상담 전공자", "학교 근무 희망자"],
            'tags' => ["청소년", "상담", "교육"],
            'description' => "청소년의 심리상담과 진로지도를 담당하는 전문가",
            'overview' => "청소년상담사는 청소년기본법에 의한 국내 유일의 청소년 상담 국가자격입니다. 자격시험 합격 후 100시간 이상 연수과정을 마치면 여성가족부 장관이 자격을 부여합니다.",
            'employment' => ["청소년상담복지센터", "학교", "Wee센터"],
            'studyTips' => ["발달심리학 기초", "상담이론 숙지", "3급  → 2급 →1급 취득"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1급",
                        'examSubTxt' => ["필기 필수", "필기 선택(2과목)"],
                        'examList' => [
                            ["상담사 교육 및 사례지도", "청소년 관련법과 행정", "상담연구방법론의 실제"],
                            ["비행상담", "성상담", "약물상담", "위기상담"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "2급",
                        'examSubTxt' => ["필기 필수", "필기 선택(2과목)"],
                        'examList' => [
                            ["청소년 상담의 이론과 실제", "상담연구방법론의 기초", "심리측정 평가의 활용", "이상심리"],
                            ["진로상담", "집단상담", "가족상담", "학업상담"]
                        ],
                    ],
                    'third' => [
                        'examTit' => "3급",
                        'examSubTxt' => ["필기 필수", "필기 선택(1과목)"],
                        'examList' => [
                            ["발달심리", "집단상담의 기초", "심리측정 및 평가", "상담이론", "학습이론"],
                            ["청소년이해론", "청소년수련활동론"]
                        ],
                    ],
                ],
            ]

        ],

// ==================== 생활/산업기술 (7개) ====================
        "농산물품질관리사" => [
            'cat_id' => '001019',
            'pageUrl' => '/cp/?cat_id=001019',
            'category' => "생활/산업기술", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 8, 'max' => 12, 'optimal' => 4],
            'monthlyHours' => ['min' => 40, 'recommended' => 80],
            'examSchedule' => ['year' => 2025, 'round' => "1차 4월, 2차 7월"],
            'passRate' => ['overall' => 25],
            'cost' => ['total' => "20~40만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2800, 'mid' => 3500, 'senior' => 4500],
            'suitable' => ["농업 관심자", "유통업 종사자", "품질관리 경험자"],
            'tags' => ["농산물", "품질", "유통"],
            'description' => "농산물의 등급 판정과 품질관리를 담당하는 전문가",
            'overview' => "농산물품질관리사는 농산물의 품질 관리, 상품개발, 브랜드개발, 물류효율화, 판촉 등을 종합 관리하는 전문가입니다. 농산물 등급 판정, 수확 후 품질관리 기술지도 등의 업무를 수행합니다.",
            'employment' => ["농협", "농산물유통센터", "대형마트"],
            'studyTips' => ["농산물 품목별 특성", "등급기준 암기", "현장 실습"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["필기"],
                        'examList' => [
                            ["농산물품질관리 관계법령 (법, 시행령, 시행규칙)", "원예작물학", "수확 후 품질관리론", "농산물유통론"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["실기"],
                        'examList' => [
                            ["농산물품질관리 실무", "농산물등급판정 실무"]
                        ],
                    ],
                ],
                'passStandard' => "기계  25% / 전기 42%"
            ],

        ],
        "도로교통사고감정사" => [
            'cat_id' => '001134',
            'pageUrl' => '/cp/?cat_id=001134',
            'category' => "생활/산업기술", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 8, 'max' => 12, 'optimal' => 8],
            'monthlyHours' => ['min' => 50, 'recommended' => 80],
            'examSchedule' => ['year' => 2025, 'round' => "9월"],
            'passRate' => ['overall' => 26],
            'cost' => ['total' => "30~40만원"],
            'outlook' => 3,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5500],
            'suitable' => ["교통 분야 관심자", "경찰 경력자", "보험사 근무자"],
            'tags' => ["교통", "사고", "감정"],
            'description' => "도로교통사고의 원인과 과실을 분석하는 전문가",
            'overview' => "도로교통사고감정사는 교통사고의 정확한 발생원인을 과학적으로 규명하는 전문가입니다. 사고 현장 조사, 교통관련 법규 해석, 사고 재현, 감정서 작성 등의 업무를 수행합니다.",
            'employment' => ["보험사", "교통안전공단", "법원 감정인"],
            'studyTips' => ["교통법규 숙지", "사고재현 기법", "물리학 기초"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["필기"],
                        'examList' => [
                            ["교통관련 법규", "교통사고 조사론", "교통사고 재현론", "차량 운동학"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["논술"],
                        'examList' => [
                            ["교통사고 분석 및 재현 실무"]
                        ],
                    ],
                ],
            ]
        ],
        "맞춤형화장품조제관리사" => [
            'cat_id' => '001103',
            'pageUrl' => '/cp/?cat_id=001103',
            'category' => "생활/산업기술", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 4, 'max' => 6, 'optimal' => 5],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 2회"],
            'passRate' => ['overall' => 20],
            'cost' => ['total' => "25~35만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2800, 'mid' => 3400, 'senior' => 4000],
            'suitable' => ["화장품 관심자", "뷰티업계 종사자", "창업 희망자"],
            'tags' => ["화장품", "뷰티", "조제"],
            'description' => "개인 맞춤형 화장품을 조제·판매하는 전문가",
            'overview' => "맞춤형화장품조제관리사는 소비자 요구에 따라 화장품을 혼합·소분하는 전문가입니다. 화장품 내용물 간 혼합, 원료 추가, 소분 업무를 담당하며, 맞춤형 뷰티 시장의 성장과 함께 수요가 급증하고 있습니다.",
            'employment' => ["화장품 매장", "뷰티숍", "맞춤화장품 창업"],
            'studyTips' => ["화장품법 숙지", "피부과학 기초", "조제 실습"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["화장품법의 이해", "화장품 제조 및 품질관리", "유통화장품의 안전관리", "맞춤형화장품의 이해"]
                        ],
                    ]
                ],
            ]
        ],
        "산업안전기사" => [
            'cat_id' => '001102',
            'pageUrl' => '/cp/?cat_id=001102',
            'category' => "생활/산업기술", 'difficulty' => 1, 'difficultyLabel' => "쉬움",
            'duration' => ['min' => 3, 'max' => 6, 'optimal' => 4],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 54],
            'cost' => ['total' => "20~40만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5000],
            'suitable' => ["산업현장 경력자", "안전관리 관심자", "공기업 취업 희망자"],
            'tags' => ["안전", "산업", "관리", "공기업"],
            'description' => "산업현장의 안전을 관리하는 안전 전문가",
            'overview' => "산업안전기사는 산업현장의 안전관리를 담당하는 전문가입니다. 모든 제조업체, 안전관리 대행업체, 정부기관 등에서 활동하며, 재해 예방과 안전 점검 업무를 수행합니다.",
            'employment' => ["대기업 안전팀", "건설사", "공기업", "안전컨설팅"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => ["객관식"],
                        'examList' => [["산업재해 예방 및 안전보건교육", "인간공학 및 위험성 평가 관리", "기계 기구 및 설비 안전 관리", "전기설비 안전 관리", "화학설비 안전 관리", "건설공사 안전 관리"]],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => ["복합형"],
                        'examList' => [["산업안전관리실무"]],
                    ],
                ],
//'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
            'studyTips' => ["산업안전관리론 핵심", "법규 암기 많음", "기출 반복"]
        ],
        "스포츠지도사 2급" => [
            'cat_id' => '001056',
            'pageUrl' => '/cp/?cat_id=001056',
            'category' => "생활/산업기술", 'difficulty' => 1, 'difficultyLabel' => "쉬움",
            'duration' => ['min' => 3, 'max' => 6, 'optimal' => 4],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "필기: 4월 /실기: 5월\n"],
            'passRate' => ['overall' => 60],
            'cost' => ['total' => "20~30만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2400, 'mid' => 3200, 'senior' => 4000],
            'suitable' => ["체육 전공자", "스포츠 강사 희망자", "헬스트레이너"],
            'tags' => ["스포츠", "지도", "체육"],
            'description' => "전문체육/생활체육 지도를 담당하는 스포츠 전문가",
            'overview' => "스포츠지도사는 전문체육 또는 생활체육 분야에서 각 종목을 지도하는 전문가입니다. 필기시험, 실기시험, 구술심사 합격 후 연수를 거쳐 자격을 취득하며, 체육시설과 학교 등에서 활동합니다.",
            'employment' => ["체육시설", "학교", "스포츠센터"],
            'studyTips' => ["전략적 과목 선택", "과락 방어 전략", "구술 시험 연계"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["필기"],
                        'examList' => [["유아체육론", "노인체육론", "특수체육론", "스포츠심리학", "운동생리학", "스포츠사회학", "운동역학", "스포츠교육학", "스포츠윤리", "한국체육사"]],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["구술"],
                        'examList' => [["실기평가", "규정포즈", "구술평가"]],
                    ],
                ],
                'passStandard' => "필기: 과목당 40점, 평균 60점/실기·구술: 70점\n"
            ],
        ],
        "연구실안전관리사" => [
            'cat_id' => '001127',
            'pageUrl' => '/cp/?cat_id=001127',
            'category' => "생활/산업기술", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 2, 'max' => 5, 'optimal' => 3],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "1차 7월, 2차 10월"],
            'passRate' => ['overall' => 17],
            'cost' => ['total' => "20~30만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3000, 'mid' => 3800, 'senior' => 4800],
            'suitable' => ["연구기관 종사자", "안전관리 관심자", "이공계 출신"],
            'tags' => ["연구실", "안전", "관리"],
            'description' => "대학·연구기관 연구실 안전환경을 관리하는 전문가",
            'overview' => "연구실안전관리사는 대학·연구기관의 연구실 안전환경 조성을 위한 전문가입니다. 연구실 안전점검, 위험요소 관리, 안전교육 등을 담당하며, 연구실 사고 예방에 핵심적인 역할을 수행합니다.",
            'employment' => ["대학", "연구소", "출연연구기관"],
            'studyTips' => ["연구실안전법 숙지", "화학물질 안전관리", "실험실 안전수칙"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["객관식"],
                        'examList' => [
                            ["연구실 안전 관련 법령", "연구실 안전관리 이론 및 체계", " 연구실 화학(가스) 안전관리", "연구실 기계 · 물리 안전관리"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["서술형"],
                        'examList' => [
                            ["연구실 안전관리 실무"]
                        ],
                    ]
                ],
                'passStandard' => "필기 : 100점 만점으로 과목당 40점 이상, 전과목 평균 60점 이상 / 실기 : 100점 만점 60점 이상", //합격기준
            ],
        ],
        "정보처리기사" => [
            'cat_id' => '001126',
            'pageUrl' => '/cp/?cat_id=001126',
            'category' => "생활/산업기술", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 3, 'max' => 6, 'optimal' => 4],
            'monthlyHours' => ['min' => 50, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 23],
            'cost' => ['total' => "15~20만원"],
            'outlook' => 5,
            'salary' => ['entry' => 3200, 'mid' => 4500, 'senior' => 6500],
            'suitable' => ["IT 취업 희망자", "컴퓨터공학 전공자", "개발자 희망자"],
            'tags' => ["IT", "개발", "프로그래밍", "취업"],
            'description' => "소프트웨어 개발과 정보시스템 구축 IT 전문가",
            'overview' => "정보처리기사는 정보시스템의 분석, 설계, 구현, 시험, 운영, 유지보수를 담당하는 IT 전문가입니다. IT 업계 취업의 기본 자격으로, 프로그래머, 시스템 분석가, 보안 전문가 등으로 활동할 수 있습니다.",
            'employment' => ["IT기업", "대기업 IT부서", "공기업", "스타트업"],
            'studyTips' => ["2020년 개편 후 난이도 상승", "프로그래밍 비중 증가", "실기 코딩 연습"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["소프트웨어설계", "소프트웨어개발", "데이터베이스 구축", "프로그래밍언어활용", "정보시스템 구축관리"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["정보처리 실무"]
                        ],
                    ]
                ],
            ],
        ],

// ==================== 무역/물류/유통 (5개) ====================
        "관세사" => [
            'cat_id' => '001059',
            'pageUrl' => '/cp/?cat_id=001059',
            'category' => "무역/물류/유통", 'difficulty' => 4, 'difficultyLabel' => "어려움",
            'duration' => ['min' => 18, 'max' => 30, 'optimal' => 24],
            'monthlyHours' => ['min' => 80, 'recommended' => 160],
            'examSchedule' => ['year' => 2025, 'first' => "3월", 'second' => "6월", 'round' => "1차 3월, 2차 6월"],
            'passRate' => ['overall' => 16],
            'cost' => ['total' => "50~90만원"],
            'outlook' => 5,
            'salary' => ['entry' => 4000, 'mid' => 6000, 'senior' => 8000],
            'suitable' => ["무역 관심자", "영어 능통자", "회계 기초 보유자"],
            'tags' => ["무역", "관세", "수출입", "전문직"],
            'description' => "수출입 통관과 관세 업무를 대행하는 무역 전문가",
            'overview' => "관세사는 수출입업체를 대리하여 통관 절차를 수행하는 무역 전문가입니다. 수출입 신고, 관세 납부, HS 품목분류, 관세법 관련 행정소송 등의 업무를 담당하며, 무역 분야 최고 전문자격으로 인정받습니다.",
            'employment' => ["관세법인", "무역회사", "물류회사"],
            'studyTips' => ["관세법이 가장 중요", "회계학 기초 필수", "FTA 관련 증가"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["필기"],
                        'examList' => [
                            ["관세법개론", "무역영어", " 내국소비세법", "회계학"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["논술"],
                        'examList' => [
                            ["관세법", "관세율표 및 상품학", "관세평가", "무역실무"]
                        ],
                    ],
                ],
            ]
        ],
        "물류관리사" => [
            'cat_id' => '001004',
            'pageUrl' => '/cp/?cat_id=001004',
            'category' => "무역/물류/유통", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 3, 'max' => 6, 'optimal' => 4],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'date' => "7월"],
            'passRate' => ['overall' => 40],
            'cost' => ['total' => "20~30만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5500],
            'suitable' => ["물류업 종사자", "유통 관심자", "SCM 관심자"],
            'tags' => ["물류", "유통", "SCM", "수출입"],
            'description' => "물류 시스템을 전문적으로 관리하는 물류 전문가",
            'overview' => "물류관리사는 물류시스템의 기획, 설계, 운영, 관리를 담당하는 물류 전문가입니다. 화물운송, 보관, 하역, 포장 등 물류 전반의 효율화와 비용절감을 위한 관리업무를 수행합니다.",
            'employment' => ["물류회사", "유통업체", "제조업체", "쿠팡/네이버"],
            'studyTips' => ["5과목 골고루", "기출 반복", "물류관련법규 암기"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["물류관리론", "화물운송론", " 국제물류론", "보관하역론", "물류관련법규"]
                        ],
                    ]
                ],
                'passStandard' => "과목당 40점 이상, 전 과목 평균 60점 이상", //합격기준
            ]
        ],
        "보세사" => [
            'cat_id' => '001069',
            'pageUrl' => '/cp/?cat_id=001069',
            'category' => "무역/물류/유통", 'difficulty' => 3, 'difficultyLabel' => "중상", 'badge' => "300% 환급",
            'duration' => ['min' => 6, 'max' => 12, 'optimal' => 8],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 1회"],
            'passRate' => ['overall' => 30],
            'cost' => ['total' => "35~50만원"],
            'outlook' => 3,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5000],
            'suitable' => ["무역업 종사자", "물류업 관심자", "관세사 준비자"],
            'tags' => ["보세", "관세", "무역"],
            'description' => "보세구역에서 물품 관리 및 통관 업무 담당자",
            'overview' => "보세사는 보세창고에서 수출입 화물을 전문적으로 관리하는 국가공인자격사입니다. 보세화물관리에 대한 세관공무원 업무 일부를 위탁받아 수행하며, 보세창고 운영인이 반드시 채용해야 하는 필수 인력입니다.",
            'employment' => ["보세창고", "자유무역지역", "관세법인"],
            'studyTips' => ["관세법 기초", "보세구역 관리 이해", "실무 중심"],
            'career' => [
                'description' => "수출입통관절차, 보세구역관리, 보세화물관리, 자율관리 및 관세벌칙, 수출입안전관리",  //자격증 상세소개
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["수출입통관절차", "보세구역관리", " 보세화물관리", "자율관리 및 관세벌칙", "수출입안전관리"]
                        ],
                    ]
                ],
            ]

        ],
        "원산지관리사" => [
            'cat_id' => '001073',
            'pageUrl' => '/cp/?cat_id=001073',
            'category' => "무역/물류/유통", 'difficulty' => 2, 'difficultyLabel' => "중", 'badge' => "300% 환급",
            'duration' => ['min' => 4, 'max' => 6, 'optimal' => 5],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 2회"],
            'passRate' => ['overall' => 40],
            'cost' => ['total' => "25~35만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2800, 'mid' => 3500, 'senior' => 4500],
            'suitable' => ["무역업 종사자", "FTA 업무자", "관세사 준비자"],
            'tags' => ["원산지", "FTA", "무역"],
            'description' => "FTA 원산지 판정 및 증명 업무를 담당하는 전문가",
            'overview' => "원산지관리사는 FTA 체결 확대에 따라 수출입 물품의 원산지를 관리하는 전문가입니다. 원산지증명서 발급, 원산지 검증 대응, FTA 활용 컨설팅 등의 업무를 수행합니다.",
            'employment' => ["무역회사", "관세법인", "제조업체"],
            'studyTips' => ["FTA 협정 이해", "원산지 결정기준", "HS코드 분류"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["FTA 협정 및 법령", "품목분류", " 원산지결정기준", "수출입통관"]
                        ],
                    ]
                ],
            ]
        ],
        "유통관리사 2급" => [
            'cat_id' => '001003',
            'pageUrl' => '/cp/?cat_id=001003',
            'category' => "무역/물류/유통", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 2, 'max' => 4, 'optimal' => 3],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 35],
            'cost' => ['total' => "20~30만원"],
            'outlook' => 3,
            'salary' => ['entry' => 2500, 'mid' => 3200, 'senior' => 4000],
            'suitable' => ["유통업 종사자", "마케팅 관심자", "MD 희망자"],
            'tags' => ["유통", "마케팅", "판매"],
            'description' => "유통업 관리 및 마케팅 실무 능력 인증",
            'overview' => "유통관리사는 소비자와 생산자 간의 커뮤니케이션, 소비자 동향 파악, 판매관리 등을 담당하는 유통 전문가입니다. 유통업체, 백화점에서 유통실무, 경영지도, 판매계획 수립 등의 업무를 수행합니다.",
            'employment' => ["대형마트", "백화점", "프랜차이즈", "MD"],
            'studyTips' => ["유통물류·일반관리 기반", "유통마케팅 고득점", "기출 반복"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["유통물류·일반관리", "상권분석", " 유통마케팅", "유통정보"]
                        ],
                    ]
                ],
                'passStandard' => "과목당 40점 이상, 전 과목 평균 60점 이상", //합격기준
            ]
        ],

// ==================== 나무/조경/식물 (4개) ====================
        "나무의사" => [
            'cat_id' => '001104',
            'pageUrl' => '/cp/?cat_id=001104',
            'category' => "나무/조경/식물", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 6, 'max' => 12, 'optimal' => 8],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'round' => "1차 2월, 2차 7월"],
            'passRate' => ['overall' => 30],
            'cost' => ['total' => "50~60만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5000],
            'suitable' => ["수목 관심자", "환경 분야 종사자", "식물학 전공자"],
            'tags' => ["수목", "진단", "치료"],
            'description' => "수목의 피해를 진단하고 치료하는 전문가",
            'overview' => "나무의사는 수목 진료에 관한 전문지식을 갖추고 수목의 피해를 진단·처방하는 전문가입니다. 산림청에서 시행하는 국가자격으로, 수목 보호와 관리에 대한 체계적인 서비스를 제공합니다.",
            'employment' => ["나무병원", "조경업체", "공원관리"],
            'studyTips' => ["수목병리학 핵심", "해충 진단 능력", "현장 실습"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["객관식"],
                        'examList' => [
                            ["수목병리학", "상권분석", " 수목해충학", "수목생리학", "산림토양학"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["복합형"],
                        'examList' => [
                            ["서술형 시험", "실기 시험"]
                        ],
                    ]
                ],
                'passStandard' => "1차 : 각 과목 40점 이상, 전과목 평균 60점 이상 / 2차 : 각 40점 이상, 전 과목 평균 60점 이상", //합격기준
            ]
        ],
        "식물보호기사" => [
            'cat_id' => '001136',
            'pageUrl' => '/cp/?cat_id=001136',
            'category' => "나무/조경/식물", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 4, 'max' => 6, 'optimal' => 5],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 45],
            'cost' => ['total' => "20~35만원"],
            'outlook' => 3,
            'salary' => ['entry' => 2800, 'mid' => 3500, 'senior' => 4500],
            'suitable' => ["농업 관심자", "식물학 전공자", "환경 관심자"],
            'tags' => ["식물", "병해충", "농업"],
            'description' => "식물의 병해충을 방제하는 전문가",
            'overview' => "식물보호기사는 농작물의 병해충 방제와 식물 보호에 관한 전문지식을 갖춘 기술인력입니다. 농약 안전사용, 병해충 진단, 친환경 방제 등의 업무를 수행하며, 농업 생산성 향상에 기여합니다.",
            'employment' => ["농협", "농업기술센터", "종묘회사"],
            'studyTips' => ["병해충 종류 암기", "방제법 이해", "실기 동정 연습"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => ["객관식"],
                        'examList' => [
                            ["식물병리학", "농림해충학", " 재배원론", "농약학"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => ["필답형"],
                        'examList' => [
                            ["식물보호 실무"]
                        ],
                    ]
                ],
                'passStandard' => "필기 : 100점 만점 기준 과목당 40점 이상, 전과목 평균 60점 이상 / 실기 : 100점 만점 기준 60점 이상", //합격기준
            ]
        ],
        "조경기능사" => [
            'cat_id' => '001064',
            'pageUrl' => '/cp/?cat_id=001064',
            'category' => "나무/조경/식물", 'difficulty' => 1, 'difficultyLabel' => "하",
            'duration' => ['min' => 2, 'max' => 4, 'optimal' => 3],
            'monthlyHours' => ['min' => 30, 'recommended' => 30],
            'examSchedule' => ['year' => 2025, 'round' => "연 4회"],
            'passRate' => ['overall' => 85],
            'cost' => ['total' => "30~40만원"],
            'outlook' => 3,
            'salary' => ['entry' => 2800, 'mid' => 3400, 'senior' => 4100],
            'suitable' => ["조경 입문자", "현장 기술자 희망자", "식물 관심자"],
            'tags' => ["조경", "기능", "입문"],
            'description' => "조경 관련 기초 기술을 보유한 기능 인력",
            'overview' => "조경기능사는 조경 분야의 기초 기술자격으로, 설계도면 판독, 시설물 설치, 지반 고르기, 나무 심기, 조경시설물 관리 등의 업무를 수행합니다.",
            'employment' => ["조경업체", "공원관리", "아파트관리"],
            'studyTips' => ["조경 기초 이론", "실기 작업 연습", "수목 식별"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["조경설계", "조경시공", " 조경관리"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["조경작업"]
                        ],
                    ]
                ],
            ]
        ],
        "조경(산업)기사" => [
            'cat_id' => '001065',
            'pageUrl' => '/cp/?cat_id=001065',
            'category' => "나무/조경/식물", 'difficulty' => 2, 'difficultyLabel' => "보통",
            'duration' => ['min' => 5, 'max' => 9, 'optimal' => 7],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 40],
            'cost' => ['total' => "35~50만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3400, 'mid' => 4000, 'senior' => 5500],
            'suitable' => ["조경학 전공자", "설계 관심자", "환경 관심자"],
            'tags' => ["조경", "설계", "환경"],
            'description' => "조경 설계와 시공을 담당하는 전문가",
            'overview' => "조경기사는 식물, 토목, 물, 조형물을 활용하여 생활공간을 아름답게 꾸미는 전문가입니다. 조경설계, 도면작성, 공사시공, 조경시설물 관리 등의 업무를 수행하며, 친환경 트렌드와 함께 전망이 밝습니다.",
            'employment' => ["조경설계사무소", "건설사", "지자체"],
            'studyTips' => ["조경설계론 핵심", "도면 해석 능력", "실기 작업형"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "조경기사",
                        'examSubTxt' => ["필기", "실기"],
                        'examList' => [
                            ["조경사 및 화재역학", "조경설계", " 조경시공구조학", "조경계획", "조경식재", "조경관리론"],
                            ["조경설계 및 시공실무"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "조경산업기사",
                        'examSubTxt' => ["필기", "실기"],
                        'examList' => [
                            ["조경계획 및 설계", "조경식재", "조경시공", "조경관리"],
                            ["조경설계 및 시공실무"]
                        ],
                    ],
                ],
            ]

        ],

// ==================== 언어/외국어 (2개) ====================
        "한국실용글쓰기" => [
            'cat_id' => '001130',
            'pageUrl' => '/cp/?cat_id=001130',
            'category' => "언어/외국어", 'difficulty' => 2, 'difficultyLabel' => "중하",
            'duration' => ['min' => 0.5, 'max' => 1, 'optimal' => 1],
            'monthlyHours' => ['min' => 20, 'recommended' => 30],
            'examSchedule' => ['year' => 2025, 'round' => "연 6회"],
            'passRate' => ['overall' => "-"],
            'cost' => ['total' => "8~11만원"],
            'outlook' => 3,
            'salary' => ['entry' => "가산점"],
            'suitable' => ["공무원 준비생", "취업 준비생", "글쓰기 관심자"],
            'tags' => ["글쓰기", "실용", "공무원"],
            'description' => "실용적인 글쓰기 능력을 검정하는 자격",
            'overview' => "한국실용글쓰기검정은 실용적인 글쓰기 능력을 평가하는 국가공인자격시험입니다. 공문서, 보고서, 기획서 등 실무에서 필요한 글쓰기 역량을 측정하며, 취업과 승진에 활용됩니다.",
            'employment' => ["공무원 가산점", "공기업 서류전형"],
            'studyTips' => ["실용문 작성 연습", "문장 교정 능력", "논리적 구성"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["선택형", "서술형"]
                        ],
                    ]
                ],
                'passStandard' => "점수 별 평가등급 상이", //합격기준
            ]

        ],
        "지텔프" => [
            'cat_id' => '001087',
            'pageUrl' => '/cp/?cat_id=001087',
            'category' => "언어/외국어", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 2, 'max' => 4, 'optimal' => 3],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "월 2회"],
            'passRate' => ['overall' => "점수제"],
            'cost' => ['total' => "20~25만원\n"],
            'outlook' => 4,
            'salary' => ['entry' => "가산점"],
            'suitable' => ["공무원 준비생", "취업 준비생", "영어 학습자"],
            'tags' => ["영어", "어학", "공무원", "G-TELP"],
            'description' => "실용 영어 능력을 측정하는 국제 공인 어학시험",
            'overview' => "G-TELP는 미국 국제테스트연구원(ITSC)에서 주관하는 글로벌 영어능력 평가인증시험입니다. UCLA, Georgetown University 등 저명 교수진이 개발에 참여했으며, 공무원 시험, 대기업 입사 등에 활용됩니다.",
            'employment' => ["공무원 가산점", "공기업 어학요건", "국가자격증 영어대체"],
            'studyTips' => ["문법·청취·독해 균형", "Level 2 집중", "기출 반복"],
            'career' => [
                'description' => "국가고시(공무원, 군무원, 소방, 경찰 등), 국가자격증(변리사, 회계사, 세무사, 노무사 등) 영어 대체시험으로 활용됩니다.",
                'fields' => ["공무원 영어대체시험", "국가자격증 영어대체", "기업체 채용/승진", "대학(원) 졸업자격"]
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["문법(Grammar)", "청취(Listening)", "독해 및 어휘(Reading & Vocabulary)"]
                        ],
                    ]
                ],
                'passStandard' => "각 영역 75% 이상 획득 시 Mastery 인정"
            ],
            'faq' => [
                ['q' => "지텔프 Level 2가 공무원 시험에 활용되나요?", 'a' => "네, Level 2가 공무원, 군무원, 국가자격증 등 영어대체 시험에 활용됩니다."]
            ]
        ],

// ==================== 면허증 (2개) ====================
        "영양사" => [
            'cat_id' => '001024',
            'pageUrl' => '/cp/?cat_id=001024',
            'category' => "면허증", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 4, 'max' => 6, 'optimal' => 5],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'date' => "매년 12월"],
            'passRate' => ['overall' => 70],
            'cost' => ['total' => "40~45만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2800, 'mid' => 3500, 'senior' => 4500],
            'suitable' => ["식품영양학 전공자", "급식 관심자", "건강 관심자"],
            'tags' => ["영양", "식품", "건강"],
            'description' => "영양 관리와 식단 계획을 담당하는 전문가",
            'overview' => "영양사는 건강증진과 질병 예방을 위해 영양관리와 급식관리를 담당하는 전문가입니다. 학교, 병원, 산업체 등에서 급식 계획, 영양 상담, 식단 작성, 위생관리 등의 업무를 수행합니다.",
            'employment' => ["학교급식", "병원", "기업체 급식"],
            'studyTips' => ["영양학 기초", "급식관리 실무", "식품위생"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["영양학 및 생화학", "영양교육, 식사요법 및 생리학", "식품학 및 조리원리", "급식, 위생 및 관계법규"]
                        ],
                    ]
                ],
            ],
        ],
        "위생사" => [
            'cat_id' => '001041',
            'pageUrl' => '/cp/?cat_id=001041',
            'category' => "면허증", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 3, 'max' => 5, 'optimal' => 4],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 1회"],
            'passRate' => ['overall' => 50],
            'cost' => ['total' => "40~45만원"],
            'outlook' => 3,
            'salary' => ['entry' => 2800, 'mid' => 3500, 'senior' => 4200],
            'suitable' => ["보건학 전공자", "위생관리 관심자", "공무원 희망자"],
            'tags' => ["위생", "보건", "관리"],
            'description' => "위생 관리 업무를 담당하는 전문가",
            'overview' => "위생사는 식품위생, 환경위생 등을 점검하고 관리하는 전문가입니다. 식품 제조·가공업체, 단체급식소, 위생관련 공공기관 등에서 위생상태 개선과 감염 예방 업무를 수행합니다.",
            'employment' => ["보건소", "환경부", "식품업체"],
            'studyTips' => ["공중보건학 핵심", "위생관계법규", "기출 반복"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => [""],
                        'examList' => [["위생관계법령", "환경위생학", "위생곤충학", "공중보건학", "식품위생학"]],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => [""],
                        'examList' => [["실기 시험"]],

                    ],
                ],
            ],
        ],

// ==================== 기타 자격 (4개) ====================
        "관광통역안내사" => [
            'cat_id' => '001014',
            'pageUrl' => '/cp/?cat_id=001014',
            'category' => "기타 자격", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 6, 'max' => 12, 'optimal' => 8],
            'monthlyHours' => ['min' => 50, 'recommended' => 60],
            'examSchedule' => ['year' => 2025, 'round' => "필기 9월, 면접 11월"],
            'passRate' => ['overall' => 67],
            'cost' => ['total' => "40~45만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3000, 'mid' => 4500, 'senior' => 6000],
            'suitable' => ["외국어 능통자", "관광업 관심자", "여행 좋아하는 분"],
            'tags' => ["관광", "통역", "여행"],
            'description' => "외국인 관광객을 안내하는 전문 통역사",
            'overview' => "관광통역안내사는 외국인 관광객에게 우리나라의 역사, 문화, 관광자원을 외국어로 안내하는 대한민국 홍보대사입니다. 입국부터 출국까지 관광일정 전반의 편의를 제공합니다.",
            'employment' => ["여행사", "관광공사", "프리랜서 가이드"],
            'studyTips' => ["언어 선택 중요", "한국 관광지식", "면접 준비"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "1차 시험",
                        'examSubTxt' => ["필기"],
                        'examList' => [["관광국사", "관광자원해설", "관광법규", "관광학개론"]],
                    ],
                    'second' => [
                        'examTit' => "2차 시험",
                        'examSubTxt' => ["면접"],
                        'examList' => [["면접"]],
                    ],
                ],
                'passStandard' => "1차: 과목당 40점, 평균 60점 / 2차: 과목당 40점, 평균 60점"
            ],
        ],
        "매경테스트" => [
            'cat_id' => '001062',
            'pageUrl' => '/cp/?cat_id=001062',
            'category' => "기타 자격", 'difficulty' => 2, 'difficultyLabel' => "보통",
            'duration' => ['min' => 1, 'max' => 2, 'optimal' => 1.5],
            'monthlyHours' => ['min' => 20, 'recommended' => 30],
            'examSchedule' => ['year' => 2025, 'round' => "연 8회"],
            'passRate' => ['overall' => "점수제"],
            'cost' => ['total' => "10~15만원"],
            'outlook' => 4,
            'salary' => ['entry' => "취업 가산점"],
            'suitable' => ["취업 준비생", "경제 관심자", "금융권 희망자"],
            'tags' => ["경제", "시사", "취업"],
            'description' => "경제·경영 지식을 측정하는 능력 검정시험",
            'overview' => "매경TEST는 경제·경영 분야의 기초 개념과 응용력, 전략적 사고력을 측정하는 국가공인 비즈니스 사고력 테스트입니다. 대기업 채용·승진 가산점, 대학 졸업논문 대체 등의 혜택이 있습니다.",
            'employment' => ["대기업 서류전형", "금융권 가산점"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["경제", "경영"]
                        ],
                    ]
                ],
            ],
            'studyTips' => ["경제 시사 상식", "기업 분석 능력", "기출 반복"]
        ],
        "사회조사분석사 2급" => [
            'cat_id' => '001038',
            'pageUrl' => '/cp/?cat_id=001038',
            'category' => "기타 자격", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 3, 'max' => 5, 'optimal' => 4],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "연 3회"],
            'passRate' => ['overall' => 66],
            'cost' => ['total' => "20~30만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2800, 'mid' => 3500, 'senior' => 4500],
            'suitable' => ["통계학 관심자", "리서치 관심자", "데이터 분석 관심자"],
            'tags' => ["조사", "분석", "통계"],
            'description' => "사회조사와 통계분석을 수행하는 전문가",
            'overview' => "사회조사분석사는 시장조사, 여론조사 등의 계획 수립과 조사를 담당하며, 결과를 분석하여 통계보고서를 작성하는 전문가입니다. 정부기관, 대기업, 마케팅 회사 등 다양한 분야로 진출이 가능합니다.",
            'employment' => ["리서치기관", "마케팅회사", "공공기관"],
            'studyTips' => ["통계분석 기초", "설문설계 능력", "SPSS 활용"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필기",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["조사방법과 설계", "조사관리와 자료처리", " 통계분석과 활용"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "실기",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["사회조사분석실무(설문작성, 단순통계처리 및 분석)"]
                        ],
                    ],
                ],
            ]
        ],

        "한경 TESAT" => [
            'cat_id' => '001096',
            'pageUrl' => '/cp/?cat_id=001096',
            'category' => "기타 자격", 'difficulty' => 2, 'difficultyLabel' => "보통",
            'duration' => ['min' => 1, 'max' => 2, 'optimal' => 1.5],
            'monthlyHours' => ['min' => 20, 'recommended' => 30],
            'examSchedule' => ['year' => 2025, 'round' => "연 8회"],
            'passRate' => ['overall' => "점수제"],
            'cost' => ['total' => "10~15만원"],
            'outlook' => 4,
            'salary' => ['entry' => "취업 가산점"],
            'suitable' => ["취업 준비생", "경제 관심자", "금융권 희망자"],
            'tags' => ["경제", "시사", "취업"],
            'description' => "경제이해력을 측정하는 한국경제신문 주관 시험",
            'overview' => "TESAT은 한국경제신문이 주관하는 종합경제이해력 검증시험입니다. 복잡한 경제 현상의 이해력을 평가하며, 한국은행, 금융 공기업, 대기업 채용 가산점 등의 혜택이 있습니다.",
            'employment' => ["대기업 서류전형", "금융권 가산점"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["경제이론", "시사경제", "응용복합"]
                        ],
                    ]
                ],
            ],
            'studyTips' => ["경제학 기초", "시사 경제 이슈", "기출 유형 파악"]
        ],

// ==================== 공무원 (4개) ====================
        "9급 계리직" => [
            'cat_id' => '002002',
            'pageUrl' => '/gov/?cat_id=002002',
            'category' => "공무원", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 12, 'max' => 24, 'optimal' => 18],
            'monthlyHours' => ['min' => 80, 'recommended' => 100],
            'examSchedule' => ['year' => 2026, 'date' => "3월 28일"],
            'passRate' => ['overall' => "-"],
            'cost' => ['total' => "40~70만원"],
            'outlook' => 5,
            'salary' => ['entry' => 3000, 'mid' => 4000, 'senior' => 5000],
            'suitable' => ["우체국 근무 희망자", "안정적 직업 선호자", "금융 관심자"],
            'tags' => ["공무원", "우체국", "안정"],
            'description' => "우체국에서 금융·보험 업무를 담당하는 공무원",
            'overview' => "계리직 공무원은 우정사업본부 소속으로 전국 우체국 창구에서 우편취급 업무와 금융업무를 담당합니다. 우체국 예금, 보험, 우편물 접수 등의 업무를 수행하며, 안정적인 공무원 신분을 보장받습니다.",
            'employment' => ["우체국"],
            'studyTips' => ["과목별 전략적 비중 조절", "기출 중심 학습", "시간 관리 실전 훈련"],
            'career' => [
                'description' => "우체국 근무로 안정적인 공무원 생활이 보장됩니다. 주택자금 대부, 퇴직연금, 학자금 보조 등 다양한 복리후생 혜택이 있습니다.",
                'fields' => ["우체국 창구 업무", "우편취급 업무", "금융업무(예금/보험)", "회계업무"]
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["한국사(한국사능력검정시험 대체)", "우편일반", "예금일반", "보험일반", "컴퓨터일반(기초영어 포함)"]
                        ],
                    ]
                ],
                'passStandard' => "상대 평가",
                'regions' => [
                    ['region' => "서울", 'quota' => 35], ['region' => "경인", 'quota' => 45], ['region' => "부산", 'quota' => 30], ['region' => "강원", 'quota' => 13], ['region' => "경북", 'quota' => 12], ['region' => "전북", 'quota' => 11], ['region' => "전남", 'quota' => 29], ['region' => "충청", 'quota' => 26], ['region' => "제주", 'quota' => 10]
                ]
            ],
            'faq' => [['q' => "계리직은 2년마다 시험이 있나요?", 'a' => "네, 약 2년에 1번 정기적으로 채용시험이 시행됩니다."]]
        ],
        "9급 교정직" => [
            'cat_id' => '002014',
            'pageUrl' => ' /gov/?cat_id=002014',
            'category' => "공무원", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 12, 'max' => 24, 'optimal' => 18],
            'monthlyHours' => ['min' => 80, 'recommended' => 100],
            'examSchedule' => ['year' => 2025, 'date' => "4월"],
            'passRate' => ['overall' => 14],
            'cost' => ['total' => "100~180만원"],
            'outlook' => 4,
            'salary' => ['entry' => 3200, 'mid' => 4200, 'senior' => 5200],
            'suitable' => ["교정 분야 관심자", "안정적 직업 선호자", "심리학 관심자"],
            'tags' => ["공무원", "교정", "안정"],
            'description' => "교도소에서 수용자 관리를 담당하는 공무원",
            'overview' => "교정직 공무원은 법무부 소속으로 교도소, 구치소, 소년원 등에서 재소자를 관리하고 교정·교화하는 업무를 수행합니다. 재소자의 구금, 계호, 작업훈련, 교화교육, 생활지도 등을 담당합니다.",
            'employment' => ["교도소", "구치소"],
            'studyTips' => ["교정학 추가과목", "체력검정 준비", "면접 인성검사"],
            'career' => [
                'description' => "교도소, 구치소에서 근무하며, 공무원으로서 안정적인 신분이 보장됩니다.",
                'fields' => ["재소자 구금·계호", "직업훈련·교화교육", "생활지도", "교도소 행정업무"]
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["국어", "영어", "한국사", "형사소송법개론", "교정학개론"]
                        ],
                    ],
                ],
                'passStandard' => "필기 합격 후 체력검정(20M 왕복달리기, 악력, 윗몸일으키기) 통과 필요"
            ]
        ],
        "9급 운전직" => [
            'cat_id' => '002015',
            'pageUrl' => ' /gov/?cat_id=002015',
            'category' => "공무원", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 6, 'max' => 12, 'optimal' => 9],
            'monthlyHours' => ['min' => 60, 'recommended' => 80],
            'examSchedule' => ['year' => 2025, 'round' => "연 1회"],
            'passRate' => ['overall' => "-"],
            'cost' => ['total' => "50~60만원"],
            'outlook' => 4,
            'salary' => ['entry' => 2800, 'mid' => 3800, 'senior' => 4800],
            'suitable' => ["운전 경력자", "안정적 직업 선호자", "현장직 선호자"],
            'tags' => ["공무원", "운전", "안정"],
            'description' => "관용차량 운전을 담당하는 공무원",
            'overview' => "운전직 공무원은 구청, 시청, 군청 등 관공서에서 차량 운행 및 관리, 공문서 수발, 차량 점검 등의 업무를 담당합니다. 시험 과목이 적고 영어 과목이 없어 상대적으로 준비가 수월합니다.",
            'employment' => ["중앙부처", "지자체"],
            'studyTips' => ["고빈출 암기 집중", "기출 중심 반복", "과락 방지 점수 관리"],
            'career' => [
                'description' => "중앙부처, 지자체에서 관용차량 운전 업무를 담당합니다.",
                'fields' => ["관용차량 운전", "차량 유지관리", "의전 업무"]
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => ["[경채]"],
                        'examList' => [["사회", "자동차구조원리", "도로교통법규"]],
                    ],
                ],
                'passStandard' => "상대평가"
            ]
        ],
        "9급 지역인재" => [
            'cat_id' => '002006',
            'pageUrl' => ' /gov/?cat_id=002006',
            'category' => "공무원", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 6, 'max' => 9, 'optimal' => 7],
            'monthlyHours' => ['min' => 80, 'recommended' => 100],
            'examSchedule' => ['year' => 2025, 'round' => "연 1회"],
            'passRate' => ['overall' => 30],
            'cost' => ['total' => "45만원"],
            'outlook' => 5,
            'salary' => ['entry' => 3300, 'mid' => 4000, 'senior' => 5000],
            'suitable' => ["특성화고 졸업자", "안정적 직업 선호자", "지역 거주자"],
            'tags' => ["공무원", "지역", "안정", "특성화고"],
            'description' => "특성화고·마이스터고 졸업자 대상 지역인재 9급 공무원",
            'overview' => "지역인재 수습직원 제도는 공직사회의 지역대표성 강화를 위해 특성화고, 마이스터고 등의 우수 졸업(예정)자를 9급 수습직원으로 선발하는 제도입니다. 6개월 수습 후 국가공무원으로 임용됩니다.",
            'employment' => ["지자체", "지역 공공기관"],
            'studyTips' => ["거주요건 확인", "지역 선발인원 파악", "일반행정과 동일"],
            'career' => [
                'description' => "지자체, 지역 공공기관에서 행정/기술 직군으로 근무합니다.",
                'fields' => ["행정 직군", "세무 직군", "기술 직군(전산, 건축 등)"]
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["국어", "영어", "한국사"]
                        ],
                    ],
                    'passStandard' => "특성화고/마이스터고 졸업(예정)자, 해당 지역 거주요건 충족"
                ]
            ],
            'faq' => [['q' => "지역인재 시험은 누가 응시할 수 있나요?", 'a' => "특성화고·마이스터고 졸업(예정)자로서 해당 지역 거주요건을 충족해야 합니다."]]
        ],

// ==================== 대학/학점 (2개) ====================
        "검정고시" => [
            'cat_id' => '005001',
            'pageUrl' => ' /cp/?cat_id=005001',
            'category' => "대학/학점", 'difficulty' => 1, 'difficultyLabel' => "쉬움",
            'duration' => ['min' => 3, 'max' => 6, 'optimal' => 4],
            'monthlyHours' => ['min' => 30, 'recommended' => 40],
            'examSchedule' => ['year' => 2025, 'round' => "연 2회"],
            'passRate' => ['overall' => 75],
            'cost' => ['total' => "55~70만원"],
            'outlook' => 4,
            'salary' => ['entry' => "학력 취득"],
            'suitable' => ["학력 취득 필요자", "조기 취업 희망자", "학업 중단자"],
            'tags' => ["학력", "검정고시", "고졸"],
            'description' => "초·중·고등학교 졸업 학력을 인정받는 시험",
            'overview' => "검정고시는 정규 학교에 진학하지 못한 분들에게 학력을 인정해주는 국가시험입니다. 초등학교, 중학교, 고등학교 졸업자격으로 구분되며, 합격 시 해당 학력이 공식 인정됩니다.",
            'employment' => ["학력 인정", "대학 진학 자격"],
            'studyTips' => ["과목별 기초 다지기", "기출문제 반복", "합격선 60점"],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "고졸",
                        'examSubTxt' => ["필수", "선택(1과목 선택)"],
                        'examList' => [
                            ["국어", "수학", " 영어", "사회", "과학", "한국사"],
                            ["도덕", "기술 · 가정", "체육", "음악"]
                        ],
                    ],
                    'second' => [
                        'examTit' => "중졸",
                        'examSubTxt' => ["필수", "선택(1과목 선택)"],
                        'examList' => [
                            ["국어", "수학", " 영어", "사회", "과학"],
                            ["도덕", "기술 · 가정", "체육", "음악", "미술"]
                        ],
                    ],
                ],
            ]

        ],
        "독학사" => [
            'cat_id' => '005002',
            'pageUrl' => ' /cp/?cat_id=005002',
            'category' => "대학/학점", 'difficulty' => 2, 'difficultyLabel' => "중",
            'duration' => ['min' => 12, 'max' => 24, 'optimal' => 18],
            'monthlyHours' => ['min' => 40, 'recommended' => 50],
            'examSchedule' => ['year' => 2025, 'round' => "1과정 3월, 2과정 5월,<br>3과정 8월, 4과정 11월"],
            'passRate' => ['overall' => 5],
            'cost' => ['total' => "120~140만원"],
            'outlook' => 4,
            'salary' => ['entry' => "학위 취득"],
            'suitable' => ["독학으로 학위 취득 희망자", "직장인", "비용 절감 원하는 분"],
            'tags' => ["학위", "독학", "대학"],
            'description' => "독학으로 학사 학위를 취득하는 제도",
            'overview' => "독학학위제(독학사)는 국가가 시행하는 학위취득 시험으로, 대학을 다니지 않고도 학사학위를 취득할 수 있는 제도입니다. 4단계 시험을 통과하면 교육부 장관 명의의 학위를 수여받습니다.",
            'employment' => ["학위 인정", "대학원 진학 자격"],
            'studyTips' => ["1~4단계 순차 진행", "전공 선택 신중히", "과목별 교재 학습"],
            'career' => [
                'description' => "단기 학위 취득으로 대학원 진학·학사편입·국가자격 응시의 '시간적 추월차선'을 확보하는 가장 실용적인 발판입니다."
            ],
            'examInfo' => [
                'subjects' => [
                    'first' => [
                        'examTit' => "필수 과목",
                        'examSubTxt' => [""],
                        'examList' => [
                            ["전공과정별 시험과목 상이"]
                        ],
                    ]
                ],
                'passStandard' => "1~3과정 : 각 과목 100점을 만점으로 하여 전 과목 60점 이상을 득점 / 4과정 : 총점합격제의 경우 총점(600점)의 60% 이상 득점(360점), 과목별합격제의 경우 100점 만점으로 전과목 60점 이상 득점\n"
            ]
        ],

// ==================== 안쌤 영재교육 (2개) ====================
        "영재교육원" => [
            'cat_id' => '011001',
            'pageUrl' => ' /cp/?cat_id=011001',
            'category' => "안쌤 영재교육", 'difficulty' => 3, 'difficultyLabel' => "중상",
            'duration' => ['min' => 6, 'max' => 12, 'optimal' => 8],
            'monthlyHours' => ['min' => 15, 'recommended' => 20],
            'examSchedule' => ['year' => 2025, 'round' => "10~11월"],
            'passRate' => ['overall' => 15],
            'cost' => ['total' => "100~150만원"],
            'outlook' => 5,
            //'salary' => [ 'entry' => "교육 기회" ],
            'suitable' => ["영재성 있는 학생", "창의력 있는 학생", "수학·과학 우수자"],
            'tags' => ["영재", "교육", "창의"],
            'description' => "영재 학생을 위한 특별 교육 프로그램 입학",
            'overview' => "영재교육원은 영재교육진흥법에 따라 운영되는 영재교육 프로그램입니다. 수학, 과학, 정보, 발명 등 분야별로 영재성을 가진 학생을 선발하여 심화교육을 제공합니다.",
            'employment' => ["영재교육원 입학"],
            'studyTips' => ["창의적 문제해결력", "수학·과학 심화", "면접 준비"]
        ],
        "과고/영재고" => [
            'cat_id' => '011001',
            'pageUrl' => ' /cp/?cat_id = 011001',
            'category' => "안쌤 영재교육", 'difficulty' => 4, 'difficultyLabel' => "어려움",
            'duration' => ['min' => 12, 'max' => 24, 'optimal' => 18],
            'monthlyHours' => ['min' => 25, 'recommended' => 30],
            'examSchedule' => ['year' => 2025, 'round' => "5~9월"],
            'passRate' => ['overall' => "-"],
            'cost' => ['total' => "200~400만원"],
            'outlook' => 5,
            /*'salary' => [ 'entry' => "교육 기회" ],*/
            'suitable' => ["수학·과학 우수 학생", "연구 관심 학생", "영재교육원 출신"],
            'tags' => ["영재", "과학고", "입시"],
            'description' => "과학고·영재고 입학을 위한 준비 과정",
            'overview' => "과학고와 영재고는 수학·과학 분야에 뛰어난 재능을 가진 학생들을 조기에 발굴·육성하는 특수목적고등학교입니다. 심화된 수학·과학 교육과정을 통해 미래 과학기술 인재를 양성합니다.",
            'employment' => ["과학고/영재고 입학"],
            'studyTips' => ["심화수학·과학", "자기소개서 준비", "면접 대비"]
        ]
    ];
