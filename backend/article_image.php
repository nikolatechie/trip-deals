<?php

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  header('Content-Type: image/jpeg');
  $img_name = $_GET['img_name'];
  $img_path = "./images/" . $img_name;
  readfile($img_path);
} elseif ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Using POST request to save an image before updating an article because
  // PATCH request containing an image and JSON data is having problems in PHP
  require_once("auth.php");
  requireAdminSignIn();
  $image = $_FILES['image'];

  // Validation
  if ($image === null || strpos($image['type'], 'image/') !== 0) {
    http_response_code(400); // Bad Request
    echo json_encode(["errorMessage" => "Invalid file type! Please upload an image."]);
    exit;
  }

  // Move image to images folder
  require_once("travel_news_helpers.php");
  $img_name = moveUploadedImage($image);
  echo json_encode(array("imgName" => $img_name));
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(array("errorMessage" => "Invalid request method."));
}
