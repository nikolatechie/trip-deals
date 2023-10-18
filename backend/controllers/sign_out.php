<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  session_start();
  session_unset();
  session_destroy();
  echo json_encode(["success" => true]);
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(["errorMessage" => "Invalid request method."]);
}
