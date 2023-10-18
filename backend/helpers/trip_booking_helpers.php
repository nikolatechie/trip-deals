<?php

require_once("./repository/user_repository.php");
require_once("./repository/booking_repository.php");
require_once("./repository/deal_repository.php");

function calculateBookingPrice($id) {
  $price_per_day = getPricePerDay($id);

  if ($price_per_day === null) {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while fetching the deal price."]);
    exit;
  }

  return $price_per_day;
}

function getUserId() {
  return _getUserId();
}

function getUserBookings($user_id) {
  $raw_bookings = getBookings($user_id);
  $bookings = [];

  foreach ($raw_bookings as $booking) {
    $destination = getDestination($booking['deal_id']);
    if ($destination !== null) {
      $booking['destination'] = $destination;
      $bookings[] = $booking;
    }
  }

  return $bookings;
}

function addBooking($id, $travelers, $from_date, $to_date) {
  $total_cost = $travelers * calculateBookingPrice($id) * date_diff(new DateTime($from_date), new DateTime($to_date))->days;
  return saveBooking($id, getUserId(), $travelers, $total_cost, $from_date, $to_date);
}
