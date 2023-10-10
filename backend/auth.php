<?php

// Check if user/admin is signed in
session_start();

function isCustomerSignedIn() {
    return isset($_SESSION['role']) && $_SESSION['role'] === "customer";
}

function isAdminSignedIn() {
    return isset($_SESSION['role']) && $_SESSION['role'] === "admin";
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
