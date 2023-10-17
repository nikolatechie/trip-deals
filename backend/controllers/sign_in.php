<?php

header("Content-Type: application/json");
session_start();
require_once("./config/db.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Extract body
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data["username"];
    $password = $data["password"];

    // Validation
    require_once("./helpers/validation.php");

    if (!isValidLength($username, 4, 30)) {
        http_response_code(400); // Bad Request
        echo json_encode(["errorMessage" => "Username length must be between 4 and 30."]);
        exit;
    }

    if (!isValidLength($password, 5, 40)) {
        http_response_code(400); // Bad Request
        echo json_encode(["errorMessage" => "Password length must be between 5 and 40."]);
        exit;
    }

    // Retrieve the user
    $stmt = $db->prepare("SELECT * FROM user WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        // Username is valid
        $row = $result->fetch_assoc();
        $hashed_password = $row['password'];

        if (password_verify($password, $hashed_password)) {
            // Passwords match
            $_SESSION['username'] = $username;
            $role = $row['role'];
            $_SESSION['role'] = $role;
            echo json_encode(["success" => true, "role" => $role]);
        } else {
            // Authentication failed
            http_response_code(401);
            echo json_encode(["errorMessage" => "Invalid credentials!"]);
        }
    } else {
        // User not found
        http_response_code(401);
        echo json_encode(["errorMessage" => "Invalid credentials!"]);
    }

    $stmt->close();
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("errorMessage" => "Invalid request method."));
}

$db->close();
