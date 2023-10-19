<?php

require_once(CONFIG_PATH . "/db.php");

function getArticlesWithLimit($limit) {
  global $db;
  $stmt = $db->prepare("SELECT * FROM article ORDER BY id DESC LIMIT ?");
  $stmt->bind_param("d", $limit);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

function doesExist($creator, $pub_date, $title) {
  global $db;
  $stmt = $db->prepare("SELECT * FROM article WHERE creator=? AND (pub_date=? OR title=?)");
  $stmt->bind_param("sss", $creator, $pub_date, $title);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();
  return $result->num_rows > 0;
}

function saveArticle($title, $description, $link, $creator, $pub_date, $img_name) {
  global $db;
  $stmt = $db->prepare(
    "INSERT INTO `article`(`title`, `description`, `url`, `creator`, `pub_date`, `img_name`) VALUES (?,?,?,?,?,?)"
  );
  $stmt->bind_param(
    "ssssss",
    $title,
    $description,
    $link,
    $creator,
    $pub_date,
    $img_name
  );
  return $stmt->execute();
}

function getAllArticles() {
  global $db;
  $stmt = $db->prepare("SELECT * FROM article ORDER BY id DESC");
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();
  return $result->fetch_all(MYSQLI_ASSOC);
}

function updateArticleAndImage($title, $description, $new_image, $id) {
  global $db;
  $stmt = $db->prepare("UPDATE article SET title=?, description=?, img_name=? WHERE id=?");
  $stmt->bind_param("sssd", $title, $description, $new_image, $id);
  return $stmt->execute();
}

function updateArticleOnly($title, $description, $id) {
  global $db;
  $stmt = $db->prepare("UPDATE article SET title=?, description=? WHERE id=?");
  $stmt->bind_param("ssd", $title, $description, $id);
  return $stmt->execute();
}

function delete($id) {
  global $db;
  $stmt = $db->prepare("DELETE FROM article WHERE id = ?");
  $stmt->bind_param("d", $id);
  return $stmt->execute();
}
