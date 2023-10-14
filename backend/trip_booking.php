<?php

header("Content-Type: application/json");
require_once("db.php");
require_once("auth.php");
require_once("trip_booking_helpers.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  requireUserSignIn();
  $user_id = getUserId($conn);
  $bookings = getUserBookings($user_id, $conn);
  echo json_encode(array("bookings" => $bookings));
} else if ($_SERVER["REQUEST_METHOD"] === "POST") {
  requireUserSignIn();
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $id = $data["id"];
  $from_date = $data["fromDate"];
  $to_date = $data["toDate"];
  $travelers = intval($data["travelers"]);

  // Validation
  if ($travelers < 1 || $travelers > 10) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Number of travelers must be between 1 and 10."]);
    exit;
  }

  $total_cost = $travelers * getDealPrice($id, $conn) * date_diff(new DateTime($from_date), new DateTime($to_date))->days;

  // Insert a new trip booking into the database
  $stmt = $conn->prepare("INSERT INTO `booking`(`deal_id`, `user_id`, `travelers`, `total_cost`, `from_date`, `to_date`) VALUES (?,?,?,?,?,?)");
  $stmt->bind_param("ddddss", $id, getUserId($conn), $travelers, $total_cost, $from_date, $to_date);

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
