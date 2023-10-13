<?php

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
    require_once("validation.php");

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

function downloadAndSaveImage($image_url) {
  // Create a unique filename for the image
  $filename = uniqid() . ".jpg";
  $path = "./images/" . $filename;

  // Download the image and save it to the specified filename
  try {
    file_put_contents($path, file_get_contents($image_url));
  } catch (Exception $_) {
    return null;
  }

  return $filename;
}

function articleAlreadyExists($article, $conn) {
  $stmt = $conn->prepare("SELECT * FROM article WHERE title=? AND creator=?");
  $stmt->bind_param("ss", $article["title"], $article["creator"]);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();
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
  $result = $stmt->execute();
  $stmt->close();
  return $result;
}

function fetchAllFromDatabase($conn) {
  $stmt = $conn->prepare("SELECT * FROM article ORDER BY id DESC");
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();
  return $result->fetch_all(MYSQLI_ASSOC);
}

function moveUploadedImage($image) {
  $img_name = uniqid() . ".jpg";
  $img_path = "./images/" . $img_name;
  if (!move_uploaded_file($image['tmp_name'], $img_path)) {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while saving the image."]);
    exit;
  }
  return $img_name;
}

function removeFile($file) {
  unlink($file);
}
