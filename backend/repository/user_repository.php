<?php

function findByUsername($username) {
  require_once("./config/db.php");
  // Retrieve the user
  $stmt = $db->prepare("SELECT * FROM user WHERE username = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();

  if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    return $user;
  }

  return null;
}
