<?php

require_once("./repository/deal_repository.php");

function getDeals($destination, $travelers, $from_date, $to_date, $max_price, $display_all) {
  $result_deals = [];

  if ($display_all) {
    return getAllDeals();
  }

  $deals = filterByDates($from_date, $to_date);

  foreach ($deals as $deal) {
    $deal_destination = strtolower($deal['destination']);
    $min_date = max(new DateTime($from_date), new DateTime($deal['from_date']));
    $max_date = min(new DateTime($to_date), new DateTime($deal['to_date']));
    $days_diff = date_diff($min_date, $max_date)->days;
    $price_per_person = $deal['price_per_day'];
    $total_price = $travelers * $days_diff * $price_per_person;

    // Filter by destination and price
    if ($destination !== "" && !str_contains($deal_destination, $destination)) continue;
    if ($max_price > 0.0 && $total_price > $max_price + (0.05 * $max_price)) continue; // 5% threshold
    array_push($result_deals, $deal);
  }

  return $result_deals;
}

function addDeal($destination, $from_date, $to_date, $price) {
  return saveDeal($destination, $from_date, $to_date, $price);
}

function editDeal($id, $destination, $from_date, $to_date, $price) {
  return updateDeal($id, $destination, $from_date, $to_date, $price);
}

function deleteDeal($id) {
  return deleteById($id);
}
