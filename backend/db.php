<?php

// Connecting to the database
$conn = new mysqli("localhost", "root", "", "trip_deals");
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

?>