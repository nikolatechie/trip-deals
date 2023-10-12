<?php

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  header('Content-Type: image/jpeg');
  $img_name = $_GET['img_name'];
  $img_path = "./images/" . $img_name;
  readfile($img_path);
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(array("errorMessage" => "Invalid request method."));
}
