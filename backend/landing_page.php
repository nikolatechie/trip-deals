<?php

header("Content-Type: application/json");
require_once("db.php");

function getDeals($conn) {
  $stmt = $conn->prepare("SELECT * FROM deal ORDER BY to_date ASC LIMIT 5");
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

function getArticles($conn) {
  $stmt = $conn->prepare("SELECT * FROM article ORDER BY id DESC LIMIT 5");
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  $deals = getDeals($conn);
  $articles = getArticles($conn);
  echo json_encode(array("deals" => $deals, "articles" => $articles));
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(array("errorMessage" => "Invalid request method."));
}

$conn->close();
