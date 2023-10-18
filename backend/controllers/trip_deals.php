<?php

header("Content-Type: application/json");
require_once("./helpers/auth_helpers.php");
require_once("./config/db.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  // Extract parameters
  $destination = strtolower($_GET["destination"]);
  $from_date = $_GET["fromDate"];
  $to_date = $_GET["toDate"];
  $travelers = intval($_GET["travelers"]);
  $max_price = floatval($_GET["maxPrice"]);
  $display_all = filter_var($_GET["displayAll"], FILTER_VALIDATE_BOOLEAN);
  $result_deals = [];
  $stmt;

  if ($display_all) {
    $stmt = $db->prepare("SELECT * FROM deal ORDER BY to_date ASC");
    $stmt->execute();
    $result = $stmt->get_result();
    $result_deals = $result->fetch_all(MYSQLI_ASSOC);
  } else {
    // Select available deals
    $stmt = $db->prepare("SELECT * FROM deal WHERE NOT (? <= from_date OR ? >= to_date)");
    $stmt->bind_param("ss", $to_date, $from_date);
    $stmt->execute();
    $result = $stmt->get_result();
    $deals = $result->fetch_all(MYSQLI_ASSOC);

    foreach ($deals as $deal) {
      $deal_destination = strtolower($deal['destination']);
      $min_date = max(new DateTime($from_date), new DateTime($deal['from_date']));
      $max_date = min(new DateTime($to_date), new DateTime($deal['to_date']));
      $days_diff = date_diff($min_date, $max_date)->days;
      $price_per_person = $deal['price_per_day'];
      $total_price = $travelers * $days_diff * $price_per_person;

      // Filter by destination and price
      if ($destination !== "" && !str_contains($deal_destination, $destination)) continue;
      if ($max_price > 0.0 && $total_price > $max_price + (0.05 * $max_price)) continue; // 5% threshold
      array_push($result_deals, $deal);
    }
  }

  echo json_encode(["deals" => $result_deals]);
  $stmt->close();
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
  requireAdminSignIn();
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $destination = $data["destination"];
  $date_from = $data["fromDate"];
  $date_to = $data["toDate"];
  $price = $data["price"];

  // Validation
  require_once("./helpers/validation.php");

  if (!isValidLength($destination, 5, 200)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Destination length must be between 5 and 200."]);
    exit;
  }

  // Insert a new trip deal into the database
  $stmt = $db->prepare("INSERT INTO `deal`(`destination`, `from_date`, `to_date`, `price_per_day`) VALUES (?,?,?,?)");
  $stmt->bind_param("sssd", $destination, $date_from, $date_to, $price);

  if ($stmt->execute()) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }

  $stmt->close();
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
  requireAdminSignIn();
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $id = $data["id"];
  $destination = $data["destination"];
  $date_from = $data["fromDate"];
  $date_to = $data["toDate"];
  $price = $data["price"];

  // Validation
  require_once("./helpers/validation.php");

  if (!isValidLength($destination, 5, 200)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Destination length must be between 5 and 200."]);
    exit;
  }

  // Update existing trip deal
  $stmt = $db->prepare("UPDATE deal SET destination=?, from_date=?, to_date=?, price_per_day=? WHERE id=?");
  $stmt->bind_param("sssdd", $destination, $date_from, $date_to, $price, $id);

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
  $data = json_decode(file_get_contents('php://input'), true);
  $id = $data["id"];

  $stmt = $db->prepare("DELETE FROM deal WHERE id = ?");
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
