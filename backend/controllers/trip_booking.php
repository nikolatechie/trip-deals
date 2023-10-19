<?php

header("Content-Type: application/json");
require_once(HELPERS_PATH . "/auth_helpers.php");
require_once(HELPERS_PATH . "/trip_booking_helpers.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  requireUserSignIn();
  $user_id = getUserId();
  $bookings = getUserBookings($user_id);
  echo json_encode(["bookings" => $bookings]);
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

  if (addBooking($id, $travelers, $from_date, $to_date)) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(["errorMessage" => "Invalid request method."]);
}
