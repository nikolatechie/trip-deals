<?php

// Check if user/admin is signed in
session_start();

function isUserSignedIn() {
    return isset($_SESSION['username']);
}

function requireSignIn() {
    if (!isUserSignedIn()) {
        http_response_code(401);
        echo json_encode(["errorMessage" => "You must be signed in!"]);
        exit;
    }
}

?>