<?php

header("Content-Type: application/json");
require_once("auth.php");
require_once("db.php");
require_once("validation.php");
require_once("travel_news_helpers.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  $articles_rss = fetchTravelArticles();

  // Add fetched articles to the database
  foreach ($articles_rss as $article) {
    if (articleAlreadyExists($article, $conn)) continue;
    // Download and save the image
    $img_name =  downloadAndSaveImage($article["img_url"]);
    $article["img_name"] = $img_name;
    addArticle($article, $conn);
  }

  echo json_encode(array("articles" => fetchAllFromDatabase($conn)));
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
  requireAdminSignIn();
  // Extract body
  $title = $_POST["title"];
  $description = $_POST["description"];
  $pub_date = date("D, j M Y G:i");
  $image = $_FILES['image'];

  // Validation
  require_once("validation.php");

  if (!isValidLength($title, 4, 400)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Title length must be between 4 and 400."]);
    exit;
  }

  if (!isValidLength($description, 4, 1000)) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Description length must be between 4 and 1000."]);
    exit;
  }

  if ($image === null || strpos($image['type'], 'image/') !== 0) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Invalid file type! Please upload an image."]);
    exit;
  }

  // Move image to images folder
  $img_name = moveUploadedImage($image);

  // Insert a new article into the database
  $article = array(
    "title" => $title, "description" => $description, "link" => null,
    "creator" => $_SESSION["username"], "pub_date" => $pub_date, "img_name" => $img_name
  );
  $result = addArticle($article, $conn);

  if ($result) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(array("errorMessage" => "Invalid request method."));
}

$conn->close();
