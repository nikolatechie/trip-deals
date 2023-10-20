<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $username = $data["username"];
  $password = $data["password"];
  $repeat_password = $data["repeatPassword"];

  // Validation
  require_once(HELPERS_PATH . "/validation_helpers.php");

  if (!isValidLength($username, 4, 30)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Username length must be between 4 and 30."]);
    exit;
  }

  if (!isValidLength($password, 5, 40)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Password length must be between 5 and 40."]);
    exit;
  }

  if ($password !== $repeat_password) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Passwords don't match!"]);
    exit;
  }

  require_once(HELPERS_PATH . "/auth_helpers.php");
  if (register($username, $password)) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(401);
    echo json_encode(["errorMessage" => "An error occurred while trying to register user!"]);
  }
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(["errorMessage" => "Invalid request method."]);
}
