<?php

function getDealsWithLimit($limit) {
  global $db;
  $stmt = $db->prepare("SELECT * FROM deal ORDER BY to_date ASC LIMIT ?");
  $stmt->bind_param("d", $limit);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}
