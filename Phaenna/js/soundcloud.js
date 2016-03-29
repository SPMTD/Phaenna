var soundcloudArray = [];
var currentsoundcloudsong1;
var placeholder;
var createElement;
var playSound;

/**
 * create the soundcloud Widget
 */
function createSoundcloudWidget(mood){
    //position
    var placeholder = document.getElementById('soundcloudWidget');

    //creating an iframe
    var createElement = document.createElement('iframe');

    //put iframe in a div
    createElement.setAttribute('id', "soundcloudPlayer");

    //mood check
    if (mood == 'unhappy'){
        createElement.setAttribute("src", "https://w.soundcloud.com/player/?url=https://soundcloud.com/user-338121756/sets/phaenna1&auto_play=true");
    }
    else if(mood == 'happy') {
        createElement.setAttribute("src", "https://w.soundcloud.com/player/?url=https://soundcloud.com/user-338121756/sets/phaenna4&auto_play=true");
    }
    else  {
        createElement.setAttribute("src", "https://w.soundcloud.com/player/?url=https://soundcloud.com/user-338121756/sets/phaenna2&auto_play=true");
    }

    //style
    createElement.style.width = '50%';
    createElement.style.height = '275px';
    createElement.style.border = 0;

    //add to div
    placeholder.appendChild(createElement);

    soundcloudApi();
}


/**
 * Soundcloud api
 */
function soundcloudApi() {
    (function () {

        var widgetIframe = document.getElementById('soundcloudPlayer'),
            widget = SC.Widget(widgetIframe);

        widget.bind(SC.Widget.Events.READY, function () {
            widget.bind(SC.Widget.Events.PLAY, function () {
                // get information about currently playing sound
                widget.getCurrentSound(function (currentSound) {
                    //console.log(currentSound);
                    //console.log(currentSound['title']);

                    currentsoundcloudsong1 = currentSound['title'];

                    //check if currentsoundcloudsong is true
                    if(currentsoundcloudsong1){
                        deleteLastSound();
                    }

                    currentSoundcloudSong();
                });
            });
        });
    }());
}

/**
 * put the currentsound in a array
 */
function currentSoundcloudSong() {

    soundcloudArray = [currentsoundcloudsong1];

    //soundcloudArray.pop();
    soundcloudArray.push(soundcloudArray[0]);
    soundcloudArray.pop();
    console.log(soundcloudArray[0]);
    console.log(soundcloudArray);

    createHTMLElement('p', soundcloudArray[0]);
}


/**
 * Create the html element
 * @param element
 * @param content
 */
function createHTMLElement(element, content) {

    //get the element by id
    placeholder = document.getElementById('soundcloudSong');

    //creating the element
    createElement = document.createElement(element);
    createElement.innerHTML = content;

    //add to DOM
    //playsound is the variable for the mobile version!!
    playSound = placeholder.appendChild(createElement);
}

/**
 * delete the latest sound
 */
function deleteLastSound() {
    //check if create element is true
    if(createElement){
        createElement.remove(placeholder);
    }
}
