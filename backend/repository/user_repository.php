<?php

require_once(CONFIG_PATH . "/db.php");

function findByUsername($username) {
  global $db;
  $stmt = $db->prepare("SELECT * FROM user WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();

  if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    return $user;
  }

  return null;
}

function _getUserId() {
  global $db;
  $stmt = $db->prepare("SELECT id FROM user WHERE username = ?");
  $stmt->bind_param("s", $_SESSION['username']);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();

  if ($result && $result->num_rows === 1) {
    $row = $result->fetch_assoc();
    return $row['id'];
  }

  http_response_code(500);
  echo json_encode(["errorMessage" => "An error occurred while fetching the user ID."]);
  exit;
}

function registerUser($username, $hashed_password) {
  global $db;
  $stmt = $db->prepare("INSERT INTO `user`(`username`, `password`) VALUES (?, ?)");
  $stmt->bind_param("ss", $username, $hashed_password);
  return $stmt->execute();
}
