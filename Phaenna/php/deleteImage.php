<?php
//Store the sent URL in a variable
$url = $_GET['url'];

//Take just the filename from the URL and delete the file
$fileName = basename($url);
$result = unlink('temp/' . $fileName);

//Echo the result
echo json_encode($result);
