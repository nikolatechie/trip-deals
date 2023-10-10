<?php

session_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  session_unset();

  if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '');
  }

  session_destroy();
  echo json_encode(["success" => true]);
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(array("errorMessage" => "Invalid request method."));
}
