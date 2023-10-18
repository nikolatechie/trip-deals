<?php

require_once("./repository/article_repository.php");

function fetchTravelArticles() {
  $data = file_get_contents("https://rss.nytimes.com/services/xml/rss/nyt/Travel.xml");
  $data = simplexml_load_string($data);
  $articles = [];

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
    require_once("./helpers/validation_helpers.php");

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

    $articles[] = [
      "title" => $title,
      "link" => $link,
      "description" => $description,
      "pub_date" => $pub_date,
      "img_url" => $img_url,
      "creator" => $creator
    ];
  }

  return $articles;
}

function genRandImgName() {
  return uniqid() . ".jpg";
}

function downloadAndSaveImage($image_url) {
  // Create a unique filename for the image
  $filename = genRandImgName();
  $path = "./images/" . $filename;

  // Download the image and save it to the specified filename
  try {
    file_put_contents($path, file_get_contents($image_url));
  } catch (Exception $_) {
    return null;
  }

  return $filename;
}

function articleAlreadyExists($article) {
  return doesExist($article['creator'], $article['pub_date'], $article['title']);
}

function addArticle($article) {
  return saveArticle(
    $article['title'],
    $article['description'],
    $article['link'],
    $article['creator'],
    $article['pub_date'],
    $article['img_name']
  );
}

function fetchAllFromDatabase() {
  return getAllArticles();
}

function moveUploadedImage($image, $img_name) {
  $img_path = "./images/" . $img_name;
  if (!move_uploaded_file($image['tmp_name'], $img_path)) {
    http_response_code(500);
    echo json_encode(["errorMessage" => "An error occurred while saving the image."]);
    exit;
  }
}

function removeFile($file) {
  unlink($file);
}

function editArticleAndImage($title, $description, $new_image, $id) {
  return updateArticleAndImage($title, $description, $new_image, $id);
}

function editArticleOnly($title, $description, $id) {
  return updateArticleOnly($title, $description, $id);
}

function deleteArticle($id) {
  return delete($id);
}
