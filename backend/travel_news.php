<?php

header("Content-Type: application/json");
require_once("auth.php");
require_once("db.php");
require_once("validation.php");

function fetchTravelArticles(): array {
  $data = file_get_contents("https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml");
  $data = simplexml_load_string($data);
  $articles = array();

  foreach ($data->channel->item as $item) {
    $media = $item->children('http://search.yahoo.com/mrss/');
    $dc = $item->children('http://purl.org/dc/elements/1.1/');

    $title = (string)$item->title;
    $link = (string)$item->link;
    $description = (string)$item->description;
    $pub_date = (string)$item->pubDate;
    $img_url = (string)$media->content->attributes()['url'];
    $creator = (string)$dc->creator;

    // Validation
    if (
      $title === null || !isValidLength($title, 1, 400) ||
      $link === null || !isValidLength($link, 10, 400) ||
      $description === null || !isValidLength($description, 1, 1000) ||
      $pub_date === null || !isValidLength($pub_date, 5, 40) ||
      $img_url === null || !isValidLength($img_url, 10, 400) ||
      $creator === null || !isValidLength($creator, 5, 200)
    ) {
      continue;
    }

    $articles[] = array(
      "title" => $title,
      "link" => $link,
      "description" => $description,
      "pub_date" => $pub_date,
      "img_url" => $img_url,
      "creator" => $creator
    );
  }

  return $articles;
}

function downloadAndSaveImage($imageUrl) {
  // Create a unique filename for the image
  $filename = "./images/" . uniqid() . ".jpg";

  // Download the image and save it to the specified filename
  try {
    file_put_contents($filename, file_get_contents($imageUrl));
  } catch (Exception $_) {
    return null;
  }

  return $filename;
}

function articleAlreadyExists($article, $conn) {
  $stmt = $conn->prepare("SELECT * FROM article WHERE title=? AND pub_date=? AND creator=?");
  $stmt->bind_param("sss", $article["title"], $article["pub_date"], $article["creator"]);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->num_rows > 0;
}

function addArticle($article, $conn) {
  $stmt = $conn->prepare(
    "INSERT INTO `article`(`title`, `description`, `url`, `creator`, `pub_date`, `img_name`) VALUES (?,?,?,?,?,?)"
  );
  $stmt->bind_param(
    "ssssss",
    $article["title"],
    $article["description"],
    $article["link"],
    $article["creator"],
    $article["pub_date"],
    $article["img_name"]
  );
  $stmt->execute();
}

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
} else {
  http_response_code(405); // Method Not Allowed
  echo json_encode(array("errorMessage" => "Invalid request method."));
}

$conn->close();
