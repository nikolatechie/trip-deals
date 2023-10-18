<?php

require_once("./repository/deal_repository.php");
require_once("./repository/article_repository.php");
define("HOME_LIMIT", 5);

function getTopDeals() {
  return getDealsWithLimit(HOME_LIMIT);
}

function getTopArticles() {
  return getArticlesWithLimit(HOME_LIMIT);
}
