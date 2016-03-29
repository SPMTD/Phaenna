<?php

function determineHappiness($value, $userCount)
{
    $average = ($value / $userCount) * 100;
    global $happinessLevel;

    if($average >= 0 && $average <= 40)
    {
        $happinessLevel = "unhappy";
    }
    else if($average >= 41 && $average <= 70)
    {
        $happinessLevel = "neutral";
    }
    else if($average >= 71)
    {
        $happinessLevel = "happy";
    }
    else
    {
        $happinessLevel = "neutral";
    }
    return $happinessLevel;
}
