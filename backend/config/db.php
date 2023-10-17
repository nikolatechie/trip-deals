<?php

// Connecting to the database
$db = new mysqli("localhost", "root", "", "trip_deals");
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
