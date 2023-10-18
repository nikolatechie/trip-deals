<?php

header("Content-Type: application/json");
require_once("./helpers/auth_helpers.php");
require_once("./config/db.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  // Get all contact messages
  requireAdminSignIn();
  $stmt = $db->prepare("SELECT * FROM contact");
  $stmt->execute();
  $result = $stmt->get_result();
  $result_messages = $result->fetch_all(MYSQLI_ASSOC);
  echo json_encode(["messages" => $result_messages]);
  $stmt->close();
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $subject = $data["subject"];
  $email = $data["email"];
  $message = $data["message"];

  // Validation
  require_once("./helpers/validation.php");

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

  // Insert a new message into the database
  $stmt = $db->prepare("INSERT INTO `contact`(`subject`, `email`, `message`) VALUES (?,?,?)");
  $stmt->bind_param("sss", $subject, $email, $message);

  if ($stmt->execute()) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }

  $stmt->close();
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
  requireAdminSignIn();
  // Extract ID
  $data = json_decode(file_get_contents("php://input"), true);
  $id = $data['id'];

  $stmt = $db->prepare("DELETE FROM contact WHERE ID = ?");
  $stmt->bind_param("d", $id);

  if ($stmt->execute()) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }

  $stmt->close();
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(["errorMessage" => "Invalid request method."]);
}

$db->close();
