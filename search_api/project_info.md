``
### pc/mo검색 로직 고도화


- PC와 모바일 검색 기능을 통합 개선하여 검색 결과 일관성 확보
- 검색어를 쿠키에 저장하는 기능을 개발하여 최근 검색어 유지 기능 구현
- 검색 조건을 개선하여 **'상담사 기출' → '%상담사%기출%'** 형태의 검색이 가능하도록 검색 정확도 향상
- PC와 모바일 간 상이하게 조회되던 검색 결과 로직을 수정하여 동일한 결과를 제공하도록 개선
- 검색어 저장 기능을 공통 플러그인으로 모듈화하여 여러 페이지에서 재사용 가능하도록 구현

## 특징

- 검색어 원문 우선 검색
- 공백 유무와 관계없는 검색 지원
- Dictionary 기반 형태소 검색 지원
- SQL 조건 자동 생성
- 검색 결과 하이라이트 제공
- Dictionary는 최초 1회만 로드하여 재사용(Global)

## 함수

1. splitKoreanNumberKeyword() : 공백단위 분리
2. tokenizeByDictionary(): DB 사전기반 키워드 분리
3. buildSearchLike : 키워드 기준으로 SQL LIKE문 생성 -> 검색
4. highlightKeyword : 키워드 기준 결과 데이터 검색어 하이라이트

# 처리 방식
키워드 : '전기 기사'

1.splitKoreanNumberKeyword() 
    {'전기','기사'}
2.tokenizeByDictionary() => 등록된 키워드 : '전기기사','기사'
    키워드 기반 분리 
    RES: {'전기','기사'}
3.buildSearchLike()
     1순위 : 원문 검색 => title LIKE '%전기 기사%'  || REPLACE(title,' ','') LIKE '%전기기사%'
     2순위 : 공백 기준 검색 => (
                                REPLACE(title,' ','') LIKE '%전기%'
                                AND
                                REPLACE(title,' ','') LIKE '%기사%'
                              )
    3순위 : Dictionary 검색 => (
                                REPLACE(title,' ','') LIKE '%전기%'
                                AND
                                REPLACE(title,' ','') LIKE '%기사%'
                               )
4. highlightKeyword() => <span class="col-red">전기</span><span class="col-red">기사</span> 실기 강의