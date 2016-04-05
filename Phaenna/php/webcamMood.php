<?php
require_once "conn.php";

//Store the sent mood in a variable and create a variable for the numeric value
$mood = $_GET['mood'];
$numMood = 0;

//Store the correct numeric value in the numeric variable
switch ($mood) {
    case 'positief':
        $numMood = 0.9;
        break;
    case 'neutraal':
        $numMood = 0.5;
        break;
    case 'negatief':
        $numMood = 0.1;
        break;
}

//Add the mood
$query = "UPDATE happiness SET value = value + $numMood, userCount = userCount + 1";
$db->query($query);

//Close the database connection
$db->close();
