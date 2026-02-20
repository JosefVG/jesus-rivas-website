<?php
// send.php
declare(strict_types=1);

// ============ CONFIG ============
$TO_EMAIL  = "ljyiuuanng@gmail.com";     // <-- a dónde llega
$SITE_NAME = "Web Jesús Rivas";
$CSV_PATH  = __DIR__ . "/solicitudes.csv"; // guarda en el servidor

// ============ HELPERS ============
function clean(string $v): string {
  $v = trim($v);
  $v = str_replace(["\r", "\n"], " ", $v);
  return $v;
}

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
  http_response_code(405);
  echo "Método no permitido.";
  exit;
}

// ============ DATA ============
$name    = clean($_POST["name"] ?? "");
$email   = clean($_POST["email"] ?? "");
$message = trim($_POST["message"] ?? "");
$source  = clean($_POST["source"] ?? "Web");

if ($name === "" || $email === "" || $message === "") {
  http_response_code(400);
  echo "Faltan campos obligatorios.";
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo "Correo inválido.";
  exit;
}

// ============ SAVE TO CSV ============
$ts = date("Y-m-d H:i:s");
$writeHeader = !file_exists($CSV_PATH);

$fp = fopen($CSV_PATH, "a");
if ($fp === false) {
  http_response_code(500);
  echo "No se pudo guardar la solicitud.";
  exit;
}

if ($writeHeader) {
  fputcsv($fp, ["fecha", "origen", "nombre", "email", "mensaje"]);
}
fputcsv($fp, [$ts, $source, $name, $email, $message]);
fclose($fp);

// ============ SEND EMAIL ============
$subject = "Nueva solicitud desde {$SITE_NAME}";
$body =
"Se recibió una nueva solicitud:\n\n" .
"Nombre: {$name}\n" .
"Email: {$email}\n" .
"Origen: {$source}\n" .
"Fecha: {$ts}\n\n" .
"Mensaje:\n{$message}\n";

$fromDomain = $_SERVER["SERVER_NAME"] ?? "localhost";
$headers = [];
$headers[] = "From: {$SITE_NAME} <no-reply@{$fromDomain}>";
$headers[] = "Reply-To: {$name} <{$email}>";
$headers[] = "Content-Type: text/plain; charset=UTF-8";

@mail($TO_EMAIL, $subject, $body, implode("\r\n", $headers));

// ============ REDIRECT ============
header("Location: gracias.html");
exit;