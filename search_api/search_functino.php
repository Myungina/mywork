<?php
global $dictionary;
$keywd = trim($keywd);
$dictionary = loadKeywordDictionary();
 //260512 검색 로직 변경 
 function loadKeywordDictionary() {

    $result = sql_query("SELECT DISTINCT keyword FROM cm_lecture_category WHERE keyword != ''");
    $dictionary = [];
    while ($row = sql_fetch_array($result)) {
        $words = explode(',', $row['keyword']);
        foreach ($words as $w) {
            $w = trim($w);
            if ($w) $dictionary[] = $w;
        }
    }
    // 짧은 것부터 정렬
    usort($dictionary, fn($a, $b) => mb_strlen($a, 'UTF-8') - mb_strlen($b, 'UTF-8'));    
    return array_unique($dictionary);
}


 //검색어 형태소 분리 (한글, 숫자, 영문 단위로 분리)
function splitKoreanNumberKeyword($keyword) {
	//preg_match_all('/[가-힣]+|[0-9]+|[a-zA-Z]+/u', $keyword, $matches);
    preg_match_all('/\S+/u', trim($keyword), $matches);
    return $matches[0];
}

// 사전 기반으로 검색어 형태소 분리
function tokenizeByDictionary($keyword, $dictionary) {
    $fullKeyword = str_replace(' ', '', $keyword);
    $remainder = $fullKeyword;
    $tokens = [];

    foreach ($dictionary as $word) {
        $wordNoSpace = str_replace(' ', '', $word);
        $pos = mb_strpos($remainder, $wordNoSpace, 0, 'UTF-8');
        if ($pos !== false) {
            $tokens[] = $word;
            $remainder = mb_substr($remainder, 0, $pos, 'UTF-8')
                       . mb_substr($remainder, $pos + mb_strlen($wordNoSpace, 'UTF-8'), null, 'UTF-8');
        }
    }

    if (count($tokens) == 1) { //사전 매칭 실패시 검색한 문장 그대로 이용
        return [$keyword];
    }

    if ($remainder) {
        $tokens[] = $remainder;
    }       

    return $tokens;
}

//검색어 배열 생성 및 sql문 설정
function buildSearchLike($field, $keyword, $operator = 'AND')
{
    global $dictionary;

    $keyword = trim($keyword);

    // 1순위 : 원문 그대로
    $conditions = [
        "{$field} LIKE '%" . sql_real_escape_string($keyword) . "%'",
        "REPLACE({$field},' ','') LIKE '%" .
        sql_real_escape_string(str_replace(' ','',$keyword)) . "%'"
    ];

    // 2순위 : 공백 기준 분리
    $words = splitKoreanNumberKeyword($keyword);

    if(count($words) > 1){

        $conditions[] = '(' . implode(" {$operator} ", array_map(function($word) use ($field){

            return "REPLACE({$field},' ','') LIKE '%" .
                sql_real_escape_string(str_replace(' ','',$word)) .
                "%'";

        }, $words)) . ')';
    }

    // 3순위 : 사전 기반 분리
    $dictTokens = [];

    foreach($words as $word){

        $tokens = tokenizeByDictionary($word, $dictionary);

        if(!empty($tokens)){
            $dictTokens = array_merge($dictTokens, $tokens);
        }
    }

    $dictTokens = array_unique($dictTokens);

    if(count($dictTokens) > 1){

        $conditions[] = '(' . implode(' AND ', array_map(function($token) use ($field){

            return "REPLACE({$field},' ','') LIKE '%" .
                sql_real_escape_string(str_replace(' ','',$token)) .
                "%'";

        }, $dictTokens)) . ')';
    }

    return '(' . implode(' OR ', $conditions) . ')';
}

//검색키워드 하이라이트
function highlightKeyword($text, $keyword, $keywords_col = '') {
    global $dictionary;  // loadKeywordDictionary() 결과 재사용

    $searchWords = splitKoreanNumberKeyword($keyword);
    $highlights = [];

    foreach ($searchWords as $word) {

		// 원본 키워드 추가
		$highlights[] = $word;

		$tokens = tokenizeByDictionary($word, $dictionary);

		if (!empty($tokens)) {
			$highlights = array_merge($highlights, $tokens);
		}
	}

    $highlights = array_unique($highlights);

    foreach ($highlights as $word) {
        $word = trim($word);
        if (!$word) continue;
        $text = preg_replace(
            '/(?![^<]*>)(' . preg_quote($word, '/') . ')/iu',
            '<span class="col-red">$1</span>',
            $text
        );
    }
    return $text;
}