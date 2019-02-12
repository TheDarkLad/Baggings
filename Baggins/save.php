<?php
	$q=$_POST["json"];
	$target=$_POST["target"];
	$myfile = fopen($target, "w") or die("Unable to open file!");
	fwrite($myfile, $q);
	fclose($myfile);
?>