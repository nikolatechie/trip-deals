<?php

require_once(REPOSITORY_PATH . "/contact_repository.php");

function getAllMessages() {
  return findAllMessages();
}

function insertNewMessage($subject, $email, $message) {
  return saveMessage($subject, $email, $message);
}

function removeMessage($id) {
  return deleteMessage($id);
}
