<?php

define("HOME_LIMIT", 5);

function getDeals() {
  require_once("./repository/deal_repository.php");
  return getDealsWithLimit(HOME_LIMIT);
}

function getArticles() {
  require_once("./repository/article_repository.php");
  return getArticlesWithLimit(HOME_LIMIT);
}
