<?php

header("Content-Type: application/json");
session_start();

function isCustomerSignedIn() {
    return isset($_SESSION['role']) && $_SESSION['role'] === "customer";
}

function isAdminSignedIn() {
    return isset($_SESSION['role']) && $_SESSION['role'] === "admin";
}

function isUserSignedIn() {
    return isset($_SESSION['role']);
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
    require_once("./repository/user_repository.php");
    $user = findByUsername($username);

    if ($user !== null) {
        // User exists
        $hashed_password = $user['password'];

        if (password_verify($password, $hashed_password)) {
            // Passwords match
            session_start();
            $_SESSION['username'] = $username;
            $_SESSION['role'] = $user['role'];
            return true;
        }
    }

    return false;
}
