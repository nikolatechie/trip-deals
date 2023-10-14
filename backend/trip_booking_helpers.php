<?php

function getDealPrice($id, $conn) {
  $stmt = $conn->prepare("SELECT price_per_day FROM deal WHERE id = ?");
  $stmt->bind_param("d", $id);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();

  if ($result && $result->num_rows === 1) {
    $row = $result->fetch_assoc();
    return $row['price_per_day'];
  }

  http_response_code(500);
  echo json_encode(["errorMessage" => "An error occurred while fetching the deal price."]);
  exit;
}

function getUserId($conn) {
  $stmt = $conn->prepare("SELECT id FROM user WHERE username = ?");
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
