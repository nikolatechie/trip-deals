<?php

require_once("auth.php");
require_once("db.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  // Extract parameters
  $destination = strtolower($_GET["destination"]);
  $from_date = $_GET["fromDate"];
  $to_date = $_GET["toDate"];
  $travelers = intval($_GET["travelers"]);
  $max_price = floatval($_GET["maxPrice"]);

  // Select available deals
  $stmt = $conn->prepare("SELECT * FROM deal WHERE NOT (? <= fromDate OR ? >= toDate)");
  $stmt->bind_param("ss", $to_date, $from_date);
  $stmt->execute();
  $result = $stmt->get_result();
  $deals = $result->fetch_all(MYSQLI_ASSOC);
  $result_deals = [];

  foreach ($deals as $deal) {
    $deal_destination = strtolower($deal['destination']);
    $min_date = max(new DateTime($from_date), new DateTime($deal['fromDate']));
    $max_date = min(new DateTime($to_date), new DateTime($deal['toDate']));
    $days_diff = date_diff($min_date, $max_date)->days;
    $price_per_person = $deal['pricePerDay'];
    $total_price = $travelers * $days_diff * $price_per_person;

    // Filter by destination and price
    if ($destination !== "" && !str_contains($deal_destination, $destination)) continue;
    if ($max_price > 0.0 && $total_price > $max_price + (0.05 * $max_price)) continue; // 5% threshold
    array_push($result_deals, $deal);
  }

  header("Content-Type: application/json");
  echo json_encode(["deals" => $result_deals]);
  $stmt->close();
} else if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $destination = $data["destination"];
  $dateFrom = $data["fromDate"];
  $dateTo = $data["toDate"];
  $price = $data["price"];

  // Insert a new trip deal into the database
  $stmt = $conn->prepare("INSERT INTO `deal`(`destination`, `fromDate`, `toDate`, `pricePerDay`) VALUES (?,?,?,?)");
  $stmt->bind_param("sssd", $destination, $dateFrom, $dateTo, $price);

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