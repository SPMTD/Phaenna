<?php
    include("conn.php");
    include("determineHappiness.php");

    //Select everything...
    $query = "SELECT * FROM happiness";
    $result = mysqli_query($db, $query);
    $currentData = mysqli_fetch_array($result);

    //Get values from myMood
    $value = $_POST['value'];
    $userAmount = $_POST['userAmount'];

    //Add values to database values
    $newValue = $currentData['value'] + $value;
    $newAmount = $currentData['userCount'] + $userAmount;

    //update database
    $updateQuery = "UPDATE happiness SET value = ".$newValue.", userCount = ".$newAmount;
    mysqli_query($db, $updateQuery);

    $generalHappiness = determineHappiness($newValue, $newAmount);

    $returnData = [
        "val" => $newValue,
        "userA" => $newAmount,
        "happiness" => $generalHappiness
    ];

    header("Content-type: application/json");
    echo json_encode($returnData);

