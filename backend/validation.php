<?php

function isValidLength($field, $min_length, $max_length): bool {
  $length = strlen($field);
  return $length >= $min_length && $length <= $max_length;
}
