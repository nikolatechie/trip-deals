<?php

header("Content-Type: application/json");
require_once(HELPERS_PATH . "/auth_helpers.php");
require_once(HELPERS_PATH . "/deals_helpers.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  // Extract parameters
  $destination = strtolower($_GET["destination"]);
  $from_date = $_GET["fromDate"];
  $to_date = $_GET["toDate"];
  $travelers = intval($_GET["travelers"]);
  $max_price = floatval($_GET["maxPrice"]);
  $display_all = filter_var($_GET["displayAll"], FILTER_VALIDATE_BOOLEAN);
  echo json_encode(["deals" => getDeals($destination, $travelers, $from_date, $to_date, $max_price, $display_all)]);
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
  requireAdminSignIn();
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $destination = $data["destination"];
  $from_date = $data["fromDate"];
  $to_date = $data["toDate"];
  $price = $data["price"];

  // Validation
  require_once(HELPERS_PATH . "/validation_helpers.php");

  if (!isValidLength($destination, 5, 200)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Destination length must be between 5 and 200."]);
    exit;
  }

  if (addDeal($destination, $from_date, $to_date, $price)) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }
} elseif ($_SERVER["REQUEST_METHOD"] === "PUT") {
  requireAdminSignIn();
  // Extract body
  $data = json_decode(file_get_contents('php://input'), true);
  $id = $data["id"];
  $destination = $data["destination"];
  $from_date = $data["fromDate"];
  $to_date = $data["toDate"];
  $price = $data["price"];

  // Validation
  require_once(HELPERS_PATH . "/validation_helpers.php");

  if (!isValidLength($destination, 5, 200)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Destination length must be between 5 and 200."]);
    exit;
  }

  if (editDeal($id, $destination, $from_date, $to_date, $price)) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
  requireAdminSignIn();
  // Extract ID
  $data = json_decode(file_get_contents('php://input'), true);
  $id = $data["id"];

  if (deleteDeal($id)) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(["errorMessage" => "Invalid request method."]);
}
