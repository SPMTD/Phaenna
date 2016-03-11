
function clickedButton(element)
{
    var btn = element.id;
    var color = "white";
    var color2 = "grey";
    var change = false;

    // alert(btn);

    getRule();

    if(btn == 0)
    {
        color = "#0174DF";
        color2 = "#01A9DB";

        cssRule.deleteRule("0%");
        cssRule.deleteRule("50%");
        cssRule.deleteRule("100%");
        cssRule.appendRule("0% {background:" + color + "}");
        cssRule.appendRule("50% {background:" + color2 + "}");
        cssRule.appendRule("100% {background:" + color + "}");
        var music = "audio/unhappy_1.mp3";
    }
    else if(btn == 1)
    {
        color = "#58FAAC";
        color2 = "#01DF74";

        cssRule.deleteRule("0%");
        cssRule.deleteRule("50%");
        cssRule.deleteRule("100%");
        cssRule.appendRule("0% {background:" + color + "}");
        cssRule.appendRule("50% {background:" + color2 + "}");
        cssRule.appendRule("100% {background:" + color + "}");
        var music = "audio/neutral_1.mp3";
    }
    else if(btn == 2)
    {
        color = "#A9F5D0";
        color2 ="#9FF781";

        cssRule.deleteRule("0%");
        cssRule.deleteRule("50%");
        cssRule.deleteRule("100%");
        cssRule.appendRule("0% {background:" + color + "}");
        cssRule.appendRule("50% {background:" + color2 + "}");
        cssRule.appendRule("100% {background:" + color + "}");
        var music = "audio/happy_1.mp3";
    }


    var song = document.getElementById('mp3');
    song.src=music;
    var audio = document.getElementById('musicPlayer');
    audio.load();
    audio.play();
}

var cssRule;

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
