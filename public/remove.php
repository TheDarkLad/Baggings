<?php
$target_file = $_POST["fileToRemove"];
unlink($target_file);
?>