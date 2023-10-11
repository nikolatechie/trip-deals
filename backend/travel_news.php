<?php

header("Content-Type: application/json");
require_once("auth.php");

function fetchTravelArticles(): array {
  $data = file_get_contents("https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml");
  $data = simplexml_load_string($data);
  $articles = array();

  foreach ($data->channel->item as $item) {
    $media = $item->children('http://search.yahoo.com/mrss/');
    $dc = $item->children('http://purl.org/dc/elements/1.1/');

    $articles[] = array(
      "title" => (string)$item->title,
      "link" => (string)$item->link,
      "description" => (string)$item->description,
      "pubDate" => (string)$item->pubDate,
      "img" => (string)$media->content->attributes()['url'],
      "creator" => (string)$dc->creator
    );
  }

  return $articles;
}

if ($_SERVER["REQUEST_METHOD"] === "GET") {
  echo json_encode(array("articles" => fetchTravelArticles()));
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(array("errorMessage" => "Invalid request method."));
}

$conn->close();
