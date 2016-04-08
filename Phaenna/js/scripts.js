/**
 * @author Thierry de Wit
 */

window.addEventListener('load', init);
var cssRule;
var previousColor1 = "";
var previousColor2 = "";

/**
 * Execute when DOM loads
 */
function init()
{
    ajaxRequest(createSoundcloudWidget);
}

/**
 * Generic AJAX handler (to prevent $.ajax everywhere)
 *
 * @param ajaxSuccessHandler
 * @param data
 */
function ajaxRequest(ajaxSuccessHandler, data)
{
    var happiness = 0;

    //Default ajax parameters
    var parameters = {
        dataType: 'json',
        url: 'php/getDBValues.php',
        type: 'POST',
        data: {
            happiness: happiness
        },
        error: function()
        {
            drawError();
        }
    };

    //If data is passed, add it to the AJAX parameters
    if (data) {
        parameters.data = data;
    }

    //Actual AJAX call (only jQuery needed!)
    $.ajax(parameters).done(ajaxSuccessHandler);
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
    var fixedMood = mood.happiness;

    switch(fixedMood)
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

    if(color != "" && color2 != "")
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
    if(previousColor1 == color1 || previousColor2 == color2)
    {
        console.log("Nothing has changed... Waiting...");
    }
    else
    {
        previousColor1 = color1;
        previousColor2 = color2;

        cssRule.deleteRule("0%");
        cssRule.deleteRule("50%");
        cssRule.deleteRule("100%");
        cssRule.appendRule("0% {background:" + color1 + "}");
        cssRule.appendRule("50% {background:" + color2 + "}");
        cssRule.appendRule("100% {background:" + color1 + "}");

        ajaxRequest(soundcloudApi);
    }
    //Check value from DB every 10 seconds
    setInterval(ajaxRequest(immersiveBackground), (10 * 1000));
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

