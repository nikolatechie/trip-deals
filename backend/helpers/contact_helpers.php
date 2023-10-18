<?php

require_once("./repository/contact_repository.php");

function getAllMessages() {
  return findAllMessages();
}

function insertNewMessage($subject, $email, $message) {
  return saveMessage($subject, $email, $message);
}

function removeMessage($id) {
  return deleteMessage($id);
}
