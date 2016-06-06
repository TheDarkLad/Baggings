<?php
$target_file = $_POST["fileToRemove"];
unlink($target_file);

$next_page = $_POST["returnURL"];
header("LOCATION: $next_page");
?>