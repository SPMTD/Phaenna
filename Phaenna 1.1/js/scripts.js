window.onload = init();
var cssRule;

/**
 * Execute when DOM loads
 */
function init()
{
    var unh = document.getElementById('btn_unhappy');
    var neu = document.getElementById('btn_neutral');
    var hap = document.getElementById('btn_happy');

    unh.addEventListener('click', btnClickHandler);
    neu.addEventListener('click', btnClickHandler);
    hap.addEventListener('click', btnClickHandler);
}

/**
 * Generic click handler.
 *
 * @param e
 */

function btnClickHandler(e)
{
    var btn = e.target.id;

    immersiveBackground(btn);
}

/**
 * Checks what colors need to be used
 *
 * @param element
 */
function immersiveBackground(element)
{
    getRule();

    var color;
    var color2;

    switch(element)
    {
        case "btn_unhappy":
            color = "#A9E2F3";
            color2 = "#0080FF";
            break;
        case "btn_neutral":
            color = "#A9F5BC";
            color2 = "#81F781";
            break;
        case "btn_happy":
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


