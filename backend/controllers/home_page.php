<?php

header("Content-Type: application/json");
require_once("./helpers/home_helpers.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  echo json_encode(["deals" => getTopDeals(), "articles" => getTopArticles()]);
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(["errorMessage" => "Invalid request method."]);
}
