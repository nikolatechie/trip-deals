<?php

require_once(REPOSITORY_PATH . "/deal_repository.php");
require_once(REPOSITORY_PATH . "/article_repository.php");
define("HOME_LIMIT", 5);

function getTopDeals() {
  return getDealsWithLimit(HOME_LIMIT);
}

function getTopArticles() {
  return getArticlesWithLimit(HOME_LIMIT);
}
