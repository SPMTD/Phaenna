<?php
/**
 * Created by PhpStorm.
 * User: Stefan
 * Date: 29-3-2016
 * Time: 11:13
 */
//Include the Unirest file
require_once 'includes/Unirest.php';

//Store the sent URL in a variable
$url = $_GET['url'];

//Store the facial recognition result in a variable
$response = Unirest\Request::get("https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?attribute=gender%2Cage%2Csmiling&url=" . $url,
    array(
        "X-Mashape-Key" => "2BaUnsw8LKmshORBSmAWpgOILbFVp1cXjNJjsnInzt9s3qbWrt",
        "Accept" => "application/json"
    )
);

//Send the data from the facial recognition back to the client
header('Content-type: application/json');
echo json_encode($response);
