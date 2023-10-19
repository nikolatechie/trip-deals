<?php

require_once("./data/paths.php");
define("BASE_URL", "/api/");

// Get the request method and path
$request_method = $_SERVER['REQUEST_METHOD'];
$request_path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove the base URL from the request path
if (strpos($request_path, BASE_URL) === 0) {
  $request_path = substr($request_path, strlen(BASE_URL));
}

if (str_ends_with($request_path, '/')) {
  $request_path = substr_replace($request_path, '', -1);
}

// Define an array of supported API endpoints
$endpoints = [
  'sign_in' => CONTROLLERS_PATH . '/sign_in.php',
  'sign_out' => CONTROLLERS_PATH . '/sign_out.php',
  'contact' => CONTROLLERS_PATH . '/contact.php',
  'home_page' => CONTROLLERS_PATH . '/home_page.php',
  'travel_news' => CONTROLLERS_PATH . '/travel_news.php',
  'article_image' => CONTROLLERS_PATH . '/article_image.php',
  'trip_deals' => CONTROLLERS_PATH . '/trip_deals.php',
  'trip_booking' => CONTROLLERS_PATH . '/trip_booking.php'
];

// Check if the requested endpoint exists
if (array_key_exists($request_path, $endpoints)) {
  // Include the corresponding endpoint file
  require_once $endpoints[$request_path];
} else {
  // Return a 404 Not Found response for unknown endpoints
  http_response_code(404);
  echo json_encode(['errorMessage' => 'Endpoint not found!']);
}
