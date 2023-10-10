<?php

require_once("auth.php");
require_once("db.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  // Get all contact messages
  requireAdminSignIn();
  $stmt = $conn->prepare("SELECT * FROM contact");
  $stmt->execute();
  $result = $stmt->get_result();
  $result_messages = $result->fetch_all(MYSQLI_ASSOC);
  header("Content-Type: application/json");
  echo json_encode(["messages" => $result_messages]);
  $stmt->close();
} else if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $subject = $data["subject"];
  $email = $data["email"];
  $message = $data["message"];

  // Insert a new message into the database
  $stmt = $conn->prepare("INSERT INTO `contact`(`subject`, `email`, `message`) VALUES (?,?,?)");
  $stmt->bind_param("sss", $subject, $email, $message);

  if ($stmt->execute()) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }

  $stmt->close();
} else if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
  requireAdminSignIn();
  // Extract ID
  $data = json_decode(file_get_contents("php://input"), true);
  $id = $data['id'];

  $stmt = $conn->prepare("DELETE FROM contact WHERE ID = ?");
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
  echo json_encode(array("errorMessage" => "Invalid request method."));
}

$conn->close();
