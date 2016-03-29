window.onload = init();
var cssRule;
var currentValue = 0;
var currentUserAmount = 0;

/**
 * Execute when DOM loads
 */
function init()
{
    getDbValuesOnload();
}

/**
 * Get database values for immersivebackground() on page load
 *
 * @returns {boolean}
 */
function getDbValuesOnload()
{
    //Check food magazine for a generic ajaxhandler.
    var happiness = 0;
    $.ajax({
        url:'php/getDBValues.php',
        data: {
            happiness: happiness
        },
        success: function (data)
        {
            immersiveBackground(data.happiness);
            createSoundcloudWidget(data.happiness);
        },
        error: function ()
        {
            drawError();
        }
    });
    return false;
}

/**
 * Generic click handler.
 *
 * @param e
 */
function btnClickHandler(e)
{
    var btn = e.target.id;

    if(btn == "btn_submitRange")
    {
        var slider = document.getElementById('rangeMoodInput');

        btnAddValue(slider.value);
    }
    else
    {
        btnValue(btn);
    }
}

/**
 * add a value to the button that was clicked and adjust slider
 *
 * @param element
 */
function btnValue(element)
{
    var btnValue;
    switch(element)
    {
        case "btn_unhappy":
            btnValue = 0.1;
            break;
        case "btn_neutral":
            btnValue = 0.5;
            break;
        case "btn_happy":
            btnValue = 0.9;
            break;
        default:
            btnValue = 0.5;
            break;
    }


    var range = document.getElementById('rangeMoodInput');
    var rangeText = document.getElementById('rangeMoodInputText');

    range.value = btnValue * 100;
    rangeText.value = range.value;
}

/**
 * each click adds value given at btnValue()
 *
 * @param value
 */
function btnAddValue(value)
{
    var fixedValue = value / 100;
    totalValue = currentValue + fixedValue;
    totalUserAmount = currentUserAmount + 1;

    //currentValue = totalValue;
    //currentUserAmount = totalUserAmount;

    ajaxHandler(totalValue, totalUserAmount);
}

/**
 * ajax handler in order to translate javascript variables to php for the database
 *
 * @param value
 * @param userAmount
 */
function ajaxHandler(value, userAmount)
{
    $.ajax({
        url: "php/sendDataToDB.php", // current page
        type: 'POST',
        data: {
            value: value, // of if writing a JS variable remove the quotes.
            userAmount: userAmount,
            happiness: value / userAmount
        },
        success: function(data) {
            //console.log(data.happiness);
            immersiveBackground(data.happiness);
            //if(x == false)
            //{
            //    //deleteSoundcloudWidget
            //    //createSoundcloudWidget(data.happiness);
            //}
        },
        error: function()
        {
            drawError();
        }
    });
}

/**
 * Checks what colors need to be used
 *
 * @param element
 */
function immersiveBackground(mood)
{
    getRule();

    var color;
    var color2;

    switch(mood)
    {
        case "unhappy":
            color = "#A9E2F3";
            color2 = "#0080FF";
            break;
        case "neutral":
            color = "#A9F5BC";
            color2 = "#81F781";
            break;
        case "happy":
            color = "#F4FA58";
            color2 ="#BEF781";
            break;
        default:
            color = "";
            color2 = "";
    }

    if(color != "" || color2 != "")
    {
        pulseColors(color, color2)
    }
}

/**
 *Changes background color
 *
 * @param color1
 * @param color2
 */
function pulseColors(color1, color2)
{
    console.log(color1, color2);

    cssRule.deleteRule("0%");
    cssRule.deleteRule("50%");
    cssRule.deleteRule("100%");
    cssRule.appendRule("0% {background:" + color1 + "}");
    cssRule.appendRule("50% {background:" + color2 + "}");
    cssRule.appendRule("100% {background:" + color1 + "}");

    //Check value from DB every 10 seconds
    setInterval(ajaxHandler(0, 0), (10 * 1000));
}

/**
 * Function so the system knows what lines to change
 */
function getRule()
{
    var rule;

    var ss = document.styleSheets;

    for (var i = 0; i < ss.length; ++i)
    {
        // loop through all the rules!
        for (var x = 0; x < ss[i].cssRules.length; ++x) {

            rule = ss[i].cssRules[x];

            if (rule.name == "pulse" && rule.type == CSSRule.KEYFRAMES_RULE)
            {
                cssRule = rule;
            }
        }
    }
}

/**
 * Catch Error from getDbValues() & ajaxHandler()
 *
 */
function drawError()
{
    var container = document.getElementById("errorOutput");
    container.innerHTML = "There has been an error, please try again!";
}

//IGNORE THE LINES BELOW........





//
//function clickedButton(element)
//{
//    var btn = element.id;
//    var color = "white";
//    var color2 = "grey";
//    var change = false;
//
//    // alert(btn);
//
//    getRule();
//
//    if(btn == 0)
//    {
//        color = "#A9E2F3";
//        color2 = "#0080FF";
//
//        cssRule.deleteRule("0%");
//        cssRule.deleteRule("50%");
//        cssRule.deleteRule("100%");
//        cssRule.appendRule("0% {background:" + color + "}");
//        cssRule.appendRule("50% {background:" + color2 + "}");
//        cssRule.appendRule("100% {background:" + color + "}");
//        var music = "audio/unhappy_1.mp3";
//    }
//    else if(btn == 1)
//    {
//        color = "#A9F5BC";
//        color2 = "#81F781";
//
//        cssRule.deleteRule("0%");
//        cssRule.deleteRule("50%");
//        cssRule.deleteRule("100%");
//        cssRule.appendRule("0% {background:" + color + "}");
//        cssRule.appendRule("50% {background:" + color2 + "}");
//        cssRule.appendRule("100% {background:" + color + "}");
//        var music = "audio/neutral_1.mp3";
//    }
//    else if(btn == 2)
//    {
//        color = "#F4FA58";
//        color2 ="#BEF781";
//
//        cssRule.deleteRule("0%");
//        cssRule.deleteRule("50%");
//        cssRule.deleteRule("100%");
//        cssRule.appendRule("0% {background:" + color + "}");
//        cssRule.appendRule("50% {background:" + color2 + "}");
//        cssRule.appendRule("100% {background:" + color + "}");
//        var music = "audio/happy_1.mp3";
//    }
//
//
//    var song = document.getElementById('mp3');
//    song.src=music;
//    var audio = document.getElementById('musicPlayer');
//    audio.load();
//    audio.play();
//}
//
//var cssRule;


