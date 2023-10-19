<?php

function isValidLength($field, $min_length, $max_length): bool {
  $length = strlen($field);
  return $length >= $min_length && $length <= $max_length;
}

function isImage($image): bool {
  return $image !== null || strpos($image['type'], 'image/') === 0;
}
