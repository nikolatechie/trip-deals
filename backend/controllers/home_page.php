<?php

header("Content-Type: application/json");
require_once("./config/db.php");

function getDeals($db) {
  $stmt = $db->prepare("SELECT * FROM deal ORDER BY to_date ASC LIMIT 5");
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

function getArticles($db) {
  $stmt = $db->prepare("SELECT * FROM article ORDER BY id DESC LIMIT 5");
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  $deals = getDeals($db);
  $articles = getArticles($db);
  echo json_encode(array("deals" => $deals, "articles" => $articles));
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(array("errorMessage" => "Invalid request method."));
}

$db->close();
