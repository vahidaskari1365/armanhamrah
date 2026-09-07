<?php
/**
 * آرمان همراه — دریافت فرم نظرسنجی و شکایت مشتری
 *
 * This endpoint is deployed with the Vite public assets to the PHP-enabled
 * production host. No mail credential is ever exposed to the browser.
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store, max-age=0');

const RECIPIENT_EMAIL = 'info@armanhamrah.com';
const RATE_LIMIT_WINDOW = 900; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

$allowedOrigins = [
    'https://armanhamrah.com',
    'https://www.armanhamrah.com',
    'https://armanhamrah-01.vercel.app',
    'http://localhost:5173',
    'http://localhost:8080',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:8080',
];

function respond(array $payload, int $status = 200): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function request_origin_is_allowed(array $allowedOrigins): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if ($origin === '') {
        // Non-browser requests are still protected by server-side validation,
        // the honeypot field, and the IP rate limit below.
        return true;
    }

    if (in_array($origin, $allowedOrigins, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        return true;
    }

    // Arena's private previews need to render the app without weakening the
    // production allow-list for unrelated domains.
    if (preg_match('#^https://[a-z0-9-]+\.e2b\.app$#i', $origin) === 1) {
        header('Access-Control-Allow-Origin: ' . $origin);
        header('Vary: Origin');
        return true;
    }

    return false;
}

function string_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function clean_text(array $data, string $key, string $label, int $maxLength, bool $required = true): string
{
    $value = $data[$key] ?? '';

    if (!is_string($value)) {
        throw new InvalidArgumentException($label . ' نامعتبر است.');
    }

    $value = trim($value);
    if ($required && $value === '') {
        throw new InvalidArgumentException($label . ' الزامی است.');
    }

    if (string_length($value) > $maxLength) {
        throw new InvalidArgumentException($label . ' بیش از حد طولانی است.');
    }

    return $value;
}

function normalize_persian_digits(string $value): string
{
    return strtr($value, [
        '۰' => '0', '۱' => '1', '۲' => '2', '۳' => '3', '۴' => '4',
        '۵' => '5', '۶' => '6', '۷' => '7', '۸' => '8', '۹' => '9',
        '٠' => '0', '١' => '1', '٢' => '2', '٣' => '3', '٤' => '4',
        '٥' => '5', '٦' => '6', '٧' => '7', '٨' => '8', '٩' => '9',
    ]);
}

function validate_phone(string $phone): void
{
    $digits = preg_replace('/\D/u', '', normalize_persian_digits($phone));
    $length = $digits === null ? 0 : strlen($digits);

    if ($length < 8 || $length > 15) {
        throw new InvalidArgumentException('شماره تلفن همراه نامعتبر است.');
    }
}

function validate_email(string $email): void
{
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new InvalidArgumentException('ایمیل نامعتبر است.');
    }
}

function client_ip(): string
{
    $forwarded = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
    if ($forwarded !== '') {
        return trim(explode(',', $forwarded)[0]);
    }

    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

/**
 * Keeps only a short-lived hash of the IP address in the server temp directory.
 * It helps prevent automated mail abuse without persisting customer data.
 */
function rate_limit_exceeded(string $ip): bool
{
    $directory = rtrim(sys_get_temp_dir(), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'armanhamrah-form-rate-limit';
    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        // If the host does not permit a temp directory, do not block valid
        // customers; the honeypot and validation still remain in place.
        return false;
    }

    $file = $directory . DIRECTORY_SEPARATOR . hash('sha256', $ip) . '.json';
    $handle = @fopen($file, 'c+');
    if ($handle === false) {
        return false;
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return false;
        }

        $contents = stream_get_contents($handle);
        $entries = is_string($contents) ? json_decode($contents, true) : [];
        $entries = is_array($entries) ? $entries : [];
        $now = time();
        $entries = array_values(array_filter($entries, static function ($timestamp) use ($now): bool {
            return is_int($timestamp) && $timestamp > ($now - RATE_LIMIT_WINDOW);
        }));

        if (count($entries) >= RATE_LIMIT_MAX_REQUESTS) {
            return true;
        }

        $entries[] = $now;
        rewind($handle);
        ftruncate($handle, 0);
        fwrite($handle, json_encode($entries));
        fflush($handle);
        return false;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function escape_html(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

function email_html(string $title, array $fields): string
{
    $rows = '';
    foreach ($fields as $field) {
        $label = escape_html((string) $field['label']);
        $value = escape_html((string) ($field['value'] === '' ? '—' : $field['value']));
        $rows .= '<tr>'
            . '<td style="width:35%;padding:12px 16px;border-bottom:1px solid #e5e7eb;background:#f9fafb;color:#374151;font-weight:700;vertical-align:top;">' . $label . '</td>'
            . '<td style="padding:12px 16px;border-bottom:1px solid #e5e7eb;color:#111827;line-height:1.9;white-space:pre-wrap;word-break:break-word;">' . $value . '</td>'
            . '</tr>';
    }

    return '<!doctype html><html lang="fa" dir="rtl"><head><meta charset="UTF-8">'
        . '<meta name="viewport" content="width=device-width, initial-scale=1.0"></head>'
        . '<body style="margin:0;padding:24px;background:#f3f4f6;color:#111827;font-family:Tahoma,Arial,sans-serif;">'
        . '<div style="max-width:720px;margin:0 auto;overflow:hidden;border:1px solid #e5e7eb;border-radius:16px;background:#ffffff;">'
        . '<div style="padding:24px 28px;background:#111827;color:#ffffff;">'
        . '<p style="margin:0 0 8px;color:#fdba74;font-size:13px;font-weight:700;">آرمان همراه ارتباطات آریا</p>'
        . '<h1 style="margin:0;font-size:22px;line-height:1.6;">' . escape_html($title) . '</h1></div>'
        . '<div style="padding:24px 28px;"><table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;"><tbody>'
        . $rows
        . '</tbody></table></div>'
        . '<div style="padding:18px 28px;border-top:1px solid #e5e7eb;background:#f9fafb;color:#6b7280;font-size:12px;line-height:1.8;">این پیام به‌صورت خودکار از وب‌سایت armanhamrah.com ارسال شده است.</div>'
        . '</div></body></html>';
}

function safe_subject(string $value): string
{
    return preg_replace('/[\r\n]+/', ' ', $value) ?? 'فرم مشتریان آرمان همراه';
}

function encode_subject(string $subject): string
{
    $subject = safe_subject($subject);
    if (function_exists('mb_encode_mimeheader')) {
        return mb_encode_mimeheader($subject, 'UTF-8', 'B', "\r\n");
    }

    return '=?UTF-8?B?' . base64_encode($subject) . '?=';
}

function get_survey_email(array $data): array
{
    $customerName = clean_text($data, 'customerName', 'نام مشتری', 150);
    $warrantyNumber = clean_text($data, 'warrantyNumber', 'شماره گارانتی', 100);
    $mobile = clean_text($data, 'mobile', 'تلفن همراه', 30);
    $suggestions = clean_text($data, 'suggestions', 'پیشنهاد یا انتقاد', 4000);
    validate_phone($mobile);

    if (!isset($data['ratings']) || !is_array($data['ratings'])) {
        throw new InvalidArgumentException('پاسخ‌های نظرسنجی نامعتبر است.');
    }

    $satisfactionLabels = [
        'very-poor' => 'بسیار ضعیف',
        'poor' => 'ضعیف',
        'average' => 'متوسط',
        'good' => 'خوب',
        'excellent' => 'عالی',
    ];
    $resolutionLabels = [
        'very-low' => 'خیلی کم',
        'low' => 'کم',
        'average' => 'متوسط',
        'high' => 'زیاد',
        'very-high' => 'خیلی زیاد',
    ];
    $questions = [
        'acceptanceTime' => ['رضایت از مدت زمان پذیرش دستگاه', $satisfactionLabels],
        'repairTime' => ['رضایت از مدت زمان تعمیرات و تحویل', $satisfactionLabels],
        'serviceCost' => ['رضایت از هزینه‌های پرداختی نسبت به خدمات', $satisfactionLabels],
        'staffBehavior' => ['رضایت از رفتار و برخورد پرسنل', $satisfactionLabels],
        'repairUpdates' => ['رضایت از اطلاع‌رسانی روند تعمیر', $satisfactionLabels],
        'serviceCenterAccess' => ['رضایت از دسترسی به مرکز خدمات', $satisfactionLabels],
        'issueResolution' => ['میزان رفع کامل ایرادات ثبت‌شده', $resolutionLabels],
    ];

    $fields = [
        ['label' => 'نام و نام خانوادگی / نام شرکت', 'value' => $customerName],
        ['label' => 'شماره گارانتی / پذیرش', 'value' => $warrantyNumber],
        ['label' => 'تلفن همراه', 'value' => $mobile],
    ];

    foreach ($questions as $key => [$label, $values]) {
        $rating = clean_text($data['ratings'], $key, $label, 30);
        if (!isset($values[$rating])) {
            throw new InvalidArgumentException('یکی از پاسخ‌های نظرسنجی نامعتبر است.');
        }
        $fields[] = ['label' => $label, 'value' => $values[$rating]];
    }

    $fields[] = ['label' => 'پیشنهاد یا انتقاد', 'value' => $suggestions];
    $fields[] = ['label' => 'زمان ثبت', 'value' => date('Y/m/d H:i')];

    return [
        'title' => 'فرم نظرسنجی مشتریان',
        'subject' => 'نظرسنجی خدمات پس از فروش — ' . $customerName,
        'fields' => $fields,
        'replyTo' => '',
    ];
}

function get_complaint_email(array $data): array
{
    $receiptNumber = clean_text($data, 'receiptNumber', 'شماره قبض پذیرش / کارت گارانتی', 100);
    $firstName = clean_text($data, 'firstName', 'نام', 80, false);
    $lastName = clean_text($data, 'lastName', 'نام خانوادگی', 100);
    $province = clean_text($data, 'province', 'استان', 100);
    $city = clean_text($data, 'city', 'شهرستان', 100);
    $mobile = clean_text($data, 'mobile', 'تلفن همراه', 30);
    $email = clean_text($data, 'email', 'ایمیل', 255, false);
    $description = clean_text($data, 'description', 'شرح موضوع شکایت', 5000);
    $expertOpinion = clean_text($data, 'expertOpinion', 'نظر کارشناسی شرکت', 2000, false);
    validate_phone($mobile);
    if ($email !== '') {
        validate_email($email);
    }

    $complaintTypeLabels = [
        'device-issues' => 'مشکلات ظاهری و فنی دستگاه',
        'technician-behavior' => 'نحوه برخورد سرویس‌کار',
        'response-time' => 'مدت زمان پاسخگویی تا اجرای فاکتور',
        'technical-knowledge' => 'میزان دانش فنی سرویس‌کار در ارائه خدمات',
        'payment-request' => 'دریافت وجه توسط سرویس‌کار',
        'late-service' => 'عدم حضور به‌موقع یا تأخیر در انجام خدمت',
        'insufficient-explanation' => 'عدم ارائه سرویس یا توضیحات کافی درباره عملکرد دستگاه',
    ];
    $rawTypes = $data['complaintTypes'] ?? null;
    if (!is_array($rawTypes) || count($rawTypes) === 0 || count($rawTypes) > count($complaintTypeLabels)) {
        throw new InvalidArgumentException('حداقل یک مصداق شکایت را انتخاب کنید.');
    }

    $types = [];
    foreach ($rawTypes as $type) {
        if (!is_string($type) || !isset($complaintTypeLabels[$type])) {
            throw new InvalidArgumentException('یکی از مصادیق شکایت نامعتبر است.');
        }
        $types[] = $complaintTypeLabels[$type];
    }

    return [
        'title' => 'فرم رسیدگی به شکایت مشتریان',
        'subject' => 'شکایت مشتری — ' . $lastName . ' — ' . $receiptNumber,
        'fields' => [
            ['label' => 'شماره قبض پذیرش / شماره کارت گارانتی', 'value' => $receiptNumber],
            ['label' => 'نام', 'value' => $firstName],
            ['label' => 'نام خانوادگی', 'value' => $lastName],
            ['label' => 'استان', 'value' => $province],
            ['label' => 'شهرستان', 'value' => $city],
            ['label' => 'تلفن همراه', 'value' => $mobile],
            ['label' => 'ایمیل', 'value' => $email],
            ['label' => 'مصادیق شکایت', 'value' => implode('، ', $types)],
            ['label' => 'شرح موضوع شکایت', 'value' => $description],
            ['label' => 'نظر کارشناسی شرکت', 'value' => $expertOpinion],
            ['label' => 'زمان ثبت', 'value' => date('Y/m/d H:i')],
        ],
        'replyTo' => $email,
    ];
}

if (!request_origin_is_allowed($allowedOrigins)) {
    respond(['success' => false, 'message' => 'Origin not allowed.'], 403);
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(['success' => false, 'message' => 'Method not allowed.'], 405);
}

$contentLength = isset($_SERVER['CONTENT_LENGTH']) ? (int) $_SERVER['CONTENT_LENGTH'] : 0;
if ($contentLength > 25000) {
    respond(['success' => false, 'message' => 'Request is too large.'], 413);
}

$rawBody = file_get_contents('php://input');
if ($rawBody === false || $rawBody === '') {
    respond(['success' => false, 'message' => 'Invalid form payload.'], 400);
}

try {
    $payload = json_decode($rawBody, true, 512, JSON_THROW_ON_ERROR);
} catch (Throwable $error) {
    respond(['success' => false, 'message' => 'Invalid form payload.'], 400);
}

if (!is_array($payload) || !isset($payload['formType']) || !is_string($payload['formType']) || !isset($payload['data']) || !is_array($payload['data'])) {
    respond(['success' => false, 'message' => 'Invalid form payload.'], 400);
}

if (!in_array($payload['formType'], ['survey', 'complaint'], true)) {
    respond(['success' => false, 'message' => 'Unknown form type.'], 400);
}

// Honeypot: automated scripts often populate every input, while customers never see this one.
if (isset($payload['website']) && is_string($payload['website']) && trim($payload['website']) !== '') {
    respond(['success' => true, 'message' => 'Form received.']);
}

if (rate_limit_exceeded(client_ip())) {
    respond(['success' => false, 'message' => 'Too many submissions. Please try again later.'], 429);
}

try {
    date_default_timezone_set('Asia/Tehran');
    $email = $payload['formType'] === 'survey'
        ? get_survey_email($payload['data'])
        : get_complaint_email($payload['data']);
} catch (InvalidArgumentException $error) {
    respond(['success' => false, 'message' => $error->getMessage()], 400);
} catch (Throwable $error) {
    error_log('Unable to validate Arman Hamrah service form.');
    respond(['success' => false, 'message' => 'Unable to validate form.'], 400);
}

$from = getenv('FORM_EMAIL_FROM') ?: 'Arman Hamrah Forms <info@armanhamrah.com>';
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: ' . $from,
];
if ($email['replyTo'] !== '') {
    $headers[] = 'Reply-To: ' . $email['replyTo'];
}

$sent = @mail(
    RECIPIENT_EMAIL,
    encode_subject($email['subject']),
    email_html($email['title'], $email['fields']),
    implode("\r\n", $headers)
);

if (!$sent) {
    error_log('Unable to send Arman Hamrah service form email (' . $payload['formType'] . ').');
    respond(['success' => false, 'message' => 'Unable to send email.'], 502);
}

respond(['success' => true, 'message' => 'Form submitted.']);
