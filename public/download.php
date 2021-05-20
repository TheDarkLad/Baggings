<?php
$target_dir = "uploads/";
$url = $_POST["fileToDownload"];
$file_name = $target_dir . $_POST["targetName"];

// Function to write image into file
if(file_put_contents($file_name, file_get_contents($url))) {
    echo "File downloaded successfully";
}
else {
    echo "File downloading failed.";
}

?>