function writeHappinessLevel(happiness)
{
    var cont = document.getElementById("currentMood");

    //console.log("YOU GOT AT WRITE SHIT");
    var img = showImage(happiness);
    cont.appendChild(img);

}
/**
 * Checking the mood and appending the right image.
 * @param happiness
 * @returns {Element}
 */
function showImage(happiness){
    var img = document.createElement("img");
    if(happiness == "happy"){
        //console.log("HAPPY");
        img.src = "http://emojipedia-us.s3.amazonaws.com/cache/a0/38/a038e6d3f342253c5ea3c057fe37b41f.png";
        //img.alt = "BEING FUCKING HAPPY";
    }
    else if(happiness == "neutral") {
        //console.log("NEUTRAL");
        img.src = "http://www.charbase.com/images/glyph/128528";
        //img.alt = "BEING FUCKING NEUTRAL";
    }
    else {
        //console.log("UNHAPPY");
        img.src = "https://invigs365.files.wordpress.com/2014/08/sad-emoji.png";
        //img.alt = "BEING FUCKING UNHAPPY";
    }
    return img;
}