<?php

header("Content-Type: application/json");
require_once(DATA_PATH . "/auth_constants.php");
require_once(REPOSITORY_PATH . "/user_repository.php");
session_start();

function isCustomerSignedIn() {
  return isset($_SESSION[ROLE]) && $_SESSION[ROLE] === CUSTOMER;
}

function isAdminSignedIn() {
  return isset($_SESSION[ROLE]) && $_SESSION[ROLE] === ADMIN;
}

function isUserSignedIn() {
  return isset($_SESSION[ROLE]);
}

function requireCustomerSignIn() {
  if (!isCustomerSignedIn()) {
    http_response_code(401);
    echo json_encode(["errorMessage" => "You must be signed in as a customer!"]);
    exit;
  }
}

function requireAdminSignIn() {
  if (!isAdminSignedIn()) {
    http_response_code(401);
    echo json_encode(["errorMessage" => "You must be signed in as an administrator!"]);
    exit;
  }
}

function requireUserSignIn() {
  if (!isUserSignedIn()) {
    http_response_code(401);
    echo json_encode(["errorMessage" => "You must be signed in!"]);
    exit;
  }
}

function signIn($username, $password) {
  $user = findByUsername($username);

  if ($user !== null) {
    // User exists
    $hashed_password = $user['password'];

    if (password_verify($password, $hashed_password)) {
      // Passwords match
      $_SESSION['username'] = $username;
      $_SESSION[ROLE] = $user[ROLE];
      return true;
    }
  }

  return false;
}
