<?php

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  require_once("./helpers/home_helpers.php");
  require_once("./config/db.php");
  echo json_encode(["deals" => getDeals(), "articles" => getArticles()]);
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(["errorMessage" => "Invalid request method."]);
}
