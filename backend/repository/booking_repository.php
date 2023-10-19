<?php

require_once(CONFIG_PATH . "/db.php");

function getBookings($user_id) {
  global $db;
  $stmt = $db->prepare("SELECT * FROM booking WHERE user_id = ?");
  $stmt->bind_param("d", $user_id);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

// Get all bookings except $user_id's
function getOtherBookings($user_id) {
  global $db;
  $stmt = $db->prepare("SELECT * FROM booking WHERE user_id != ?");
  $stmt->bind_param("d", $user_id);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

function saveBooking($id, $user_id, $travelers, $total_cost, $from_date, $to_date) {
  global $db;
  $stmt = $db->prepare("INSERT INTO `booking`(`deal_id`, `user_id`, `travelers`, `total_cost`, `from_date`, `to_date`) VALUES (?,?,?,?,?,?)");
  $stmt->bind_param("ddddss", $id, $user_id, $travelers, $total_cost, $from_date, $to_date);
  return $stmt->execute();
}
