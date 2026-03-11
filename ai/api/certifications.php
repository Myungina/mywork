<?php
/**
 * 자격증 데이터 API
 * GET /api/certifications.php
 *
 * 시대에듀 전체 자격증 데이터를 JSON으로 반환합니다.
 */

// CORS 설정 (프론트엔드와 백엔드가 다른 포트일 경우)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// OPTIONS 요청 처리 (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// GET 요청만 허용
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'error' => 'Method Not Allowed. Use GET request.'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    // 데이터 파일 로드
    $dataFile = __DIR__ . '/../includes/certifications_data.php';

    if (!file_exists($dataFile)) {
        throw new Exception('Data file not found: certifications_data.php');
    }

    $certificationsDB = include $dataFile;

    if (!is_array($certificationsDB)) {
        throw new Exception('Invalid data format');
    }

    // 성공 응답
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'data' => $certificationsDB,
        'count' => count($certificationsDB)
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

} catch (Exception $e) {
    // 에러 응답
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}
?>
