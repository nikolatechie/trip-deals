<?php

session_start();

// Connecting to the database
$conn = new mysqli("localhost", "root", "", "trip_deals");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Extract body
    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data["username"];
    $password = $data["password"];

    // Retrieve the user
    $stmt = $conn->prepare("SELECT * FROM user WHERE username = ?");
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
            echo json_encode(["success" => true]);
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
    $conn->close();
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(array("errorMessage" => "Invalid request method."));
}

?>