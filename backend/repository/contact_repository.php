<?php

require_once(CONFIG_PATH . "/db.php");

function findAllMessages() {
  global $db;
  $stmt = $db->prepare("SELECT * FROM contact");
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

function saveMessage($subject, $email, $message) {
  global $db;
  $stmt = $db->prepare("INSERT INTO `contact`(`subject`, `email`, `message`) VALUES (?,?,?)");
  $stmt->bind_param("sss", $subject, $email, $message);
  return $stmt->execute();
}

function deleteMessage($id) {
  global $db;
  $stmt = $db->prepare("DELETE FROM contact WHERE ID = ?");
  $stmt->bind_param("d", $id);
  return $stmt->execute();
}
