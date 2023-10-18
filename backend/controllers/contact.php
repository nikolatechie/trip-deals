<?php

header("Content-Type: application/json");
require_once("./helpers/auth_helpers.php");
require_once("./helpers/contact_helpers.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  // Get all contact messages
  requireAdminSignIn();
  echo json_encode(["messages" => getAllMessages()]);
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $subject = $data["subject"];
  $email = $data["email"];
  $message = $data["message"];

  // Validation
  require_once("./helpers/validation_helpers.php");

  if (!isValidLength($subject, 3, 50)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Subject length must be between 3 and 50."]);
    exit;
  }

  if (!isValidLength($email, 5, 80)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Email length must be between 5 and 80."]);
    exit;
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Invalid email format."]);
    exit;
  }

  if (!isValidLength($message, 20, 1000)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Message length must be between 20 and 1000."]);
    exit;
  }

  if (insertNewMessage($subject, $email, $message)) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
  requireAdminSignIn();
  // Extract ID
  $data = json_decode(file_get_contents("php://input"), true);
  $id = $data['id'];

  if (removeMessage($id)) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(["errorMessage" => "Invalid request method."]);
}
