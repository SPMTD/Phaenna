<?php
    include('conn.php');
    include('determineHappiness.php');

    $query = "SELECT * FROM happiness";
    $result = mysqli_query($db, $query);
    $data = mysqli_fetch_array($result);

//    $happiness = $_POST['happiness'];

    $value = $data['value'];
    $userAmount = $data['userCount'];
//    $happinessValue = $value / $userAmount;

    $generalHappiness = determineHappiness($value, $userAmount);

    $returnData = [
        "happiness" => $generalHappiness
    ];

    header("Content-type: application/json");
    echo json_encode($returnData);

//    echo $happinessValue;
