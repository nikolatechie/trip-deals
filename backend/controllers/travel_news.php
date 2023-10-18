<?php

header("Content-Type: application/json");
require_once("./helpers/auth_helpers.php");
require_once("./config/db.php");
require_once("./helpers/travel_news_helpers.php");

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  $articles_rss = fetchTravelArticles();

  // Add fetched articles to the database
  foreach ($articles_rss as $article) {
    if (articleAlreadyExists($article, $db)) continue;
    // Download and save the image
    $img_name =  downloadAndSaveImage($article["img_url"]);
    $article["img_name"] = $img_name;
    addArticle($article, $db);
  }

  echo json_encode(["articles" => fetchAllFromDatabase($db)]);
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
  requireAdminSignIn();
  // Extract body
  $title = $_POST["title"];
  $description = $_POST["description"];
  $pub_date = date("D, j M Y G:i");
  $image = $_FILES['image'];

  // Validation
  require_once("./helpers/validation.php");

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
  $article = [
    "title" => $title, "description" => $description, "link" => null,
    "creator" => $_SESSION["username"], "pub_date" => $pub_date, "img_name" => $img_name
  ];
  $result = addArticle($article, $db);

  if ($result) {
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }
} elseif ($_SERVER["REQUEST_METHOD"] === "PATCH") {
  requireAdminSignIn();
  // Extract body
  $_PATCH = json_decode(file_get_contents('php://input'), true);
  $id = $_PATCH["id"];
  $title = $_PATCH["title"];
  $description = $_PATCH["description"];
  $old_image = $_PATCH["oldImage"];
  $new_image = $_PATCH["newImage"];

  // Validation
  require_once("./helpers/validation.php");

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

  // Update existing article
  $stmt;
  if ($new_image !== null) {
    // We need to update the image too
    $stmt = $db->prepare("UPDATE article SET title=?, description=?, img_name=? WHERE id=?");
    $stmt->bind_param("sssd", $title, $description, $new_image, $id);
  } else {
    // We're just updating title and description
    $stmt = $db->prepare("UPDATE article SET title=?, description=? WHERE id=?");
    $stmt->bind_param("ssd", $title, $description, $id);
  }

  if ($stmt->execute()) {
    if ($old_image !== null) {
      removeFile("./images/" . $old_image);
    }
    echo json_encode(["success" => true]);
  } else {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while executing the query."]);
  }

  $stmt->close();
} elseif ($_SERVER["REQUEST_METHOD"] === "DELETE") {
  requireAdminSignIn();
  // Extract ID
  $_DELETE = json_decode(file_get_contents('php://input'), true);
  $id = $_DELETE["id"];
  $img_name = $_DELETE["imgName"];

  $stmt = $db->prepare("DELETE FROM article WHERE id = ?");
  $stmt->bind_param("d", $id);

  if ($stmt->execute()) {
    if ($img_name !== null) {
      removeFile("./images/" . $img_name);
    }
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
