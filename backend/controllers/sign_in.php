<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $username = $data["username"];
  $password = $data["password"];

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

  require_once(HELPERS_PATH . "/auth_helpers.php");
  if (signIn($username, $password)) {
    echo json_encode(["success" => true, "role" => $_SESSION['role']]);
  } else {
    http_response_code(401);
    echo json_encode(["errorMessage" => "Invalid credentials!"]);
  }
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(["errorMessage" => "Invalid request method."]);
}
