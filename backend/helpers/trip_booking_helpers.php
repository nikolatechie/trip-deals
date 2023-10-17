<?php

function getDealPrice($id, $db) {
  $stmt = $db->prepare("SELECT price_per_day FROM deal WHERE id = ?");
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

function getUserId($db) {
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

function getUserBookings($user_id, $db) {
  $stmt = $db->prepare("SELECT * FROM booking WHERE user_id = ?");
  $stmt->bind_param("d", $user_id);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();
  $raw_bookings = $result->fetch_all(MYSQLI_ASSOC);
  $bookings = [];

  foreach ($raw_bookings as $booking) {
    $stmt = $db->prepare("SELECT destination FROM deal WHERE id = ?");
    $stmt->bind_param("d", $booking["deal_id"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result && $result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $booking["destination"] = $row["destination"];
      $bookings[] = $booking;
    }
  }

  return $bookings;
}
