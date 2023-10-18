<?php

require_once("./config/db.php");

function getDealsWithLimit($limit) {
  global $db;
  $stmt = $db->prepare("SELECT * FROM deal ORDER BY to_date ASC LIMIT ?");
  $stmt->bind_param("d", $limit);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

function getDestination($id) {
  global $db;
  $stmt = $db->prepare("SELECT destination FROM deal WHERE id = ?");
  $stmt->bind_param("d", $id);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();

  if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    return $row['destination'];
  }

  return null;
}

function getPricePerDay($id) {
  global $db;
  $stmt = $db->prepare("SELECT price_per_day FROM deal WHERE id = ?");
  $stmt->bind_param("d", $id);
  $stmt->execute();
  $result = $stmt->get_result();
  $stmt->close();

  if ($result && $result->num_rows === 1) {
    $row = $result->fetch_assoc();
    return $row['price_per_day'];
  }

  return null;
}

function getAllDeals() {
  global $db;
  $stmt = $db->prepare("SELECT * FROM deal ORDER BY to_date ASC");
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

function filterByDates($from_date, $to_date) {
  global $db;
  $stmt = $db->prepare("SELECT * FROM deal WHERE NOT (? <= from_date OR ? >= to_date)");
  $stmt->bind_param("ss", $to_date, $from_date);
  $stmt->execute();
  $result = $stmt->get_result();
  return $result->fetch_all(MYSQLI_ASSOC);
}

function saveDeal($destination, $from_date, $to_date, $price) {
  global $db;
  $stmt = $db->prepare("INSERT INTO `deal`(`destination`, `from_date`, `to_date`, `price_per_day`) VALUES (?,?,?,?)");
  $stmt->bind_param("sssd", $destination, $from_date, $to_date, $price);
  return $stmt->execute();
}

function updateDeal($id, $destination, $from_date, $to_date, $price) {
  global $db;
  $stmt = $db->prepare("UPDATE deal SET destination=?, from_date=?, to_date=?, price_per_day=? WHERE id=?");
  $stmt->bind_param("sssdd", $destination, $from_date, $to_date, $price, $id);
  return $stmt->execute();
}

function deleteById($id) {
  global $db;
  $stmt = $db->prepare("DELETE FROM deal WHERE id = ?");
  $stmt->bind_param("d", $id);
  return $stmt->execute();
}
