<?php

function getArticlesWithLimit($limit) {
  global $db;
  $stmt = $db->prepare("SELECT * FROM article ORDER BY id DESC LIMIT ?");
  $stmt->bind_param("d", $limit);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}
