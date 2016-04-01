var currentsoundcloudsong1;
var placeholder;
var createElement;
var playSound;

var createElement2;
var placeholder2;

var playlist;
var soundIndex;

var test = 0;
//var mood = 'happy';

var previousMood;

/**
 * create the soundcloud Widget
 */
function createSoundcloudWidget(mood){

    var fixedMood = mood.happiness;

    placeholder2 = document.getElementById('soundcloudWidget');

    //creating an iframe
    createElement2 = document.createElement('iframe');

    //put iframe in a div
    createElement2.setAttribute('id', "soundcloudPlayer");

    //mood check
    if (fixedMood == 'unhappy'){
        createElement2.setAttribute("src", "https://w.soundcloud.com/player/?url=https://soundcloud.com/user-338121756/sets/phaenna1&auto_play=true");
    }
    else if(fixedMood == 'happy') {
        createElement2.setAttribute("src", "https://w.soundcloud.com/player/?url=https://soundcloud.com/danielhowie362014/sets/relaxing&auto_play=true");
    }
    else  {
        createElement2.setAttribute("src", "https://w.soundcloud.com/player/?url=https://soundcloud.com/csuarez/sets/happy&auto_play=true");
    }



    //style
    createElement2.style.width = '100%';
    createElement2.style.height = '350px';
    createElement2.style.border = 0;

    //add to div
    placeholder2.appendChild(createElement2);

    if(previousMood == fixedMood)
    {
        console.log("Nothing has changed for createSoundcloudWidget");
    }
    else
    {
        previousMood = fixedMood;
    }
    ajaxRequest(immersiveBackground);
    soundcloudApi(fixedMood);
}


/**
 * Soundcloud api
 */
function soundcloudApi(mood) {
    (function () {

        var widgetIframe = document.getElementById('soundcloudPlayer'),
            widget = SC.Widget(widgetIframe);

        //widget.bind(SC.Widget.Events.READY, nameOfYourFunction);

        widget.bind(SC.Widget.Events.READY, function () {
            console.log('dit is test nummer 1!');

            if(previousMood != mood)
            {
                widget.bind(SC.Widget.Events.FINISH, function () {
                    test = 0;
                    //console.log(soundIndex);
                    //if(soundIndex >= playlist) {
                    soundIndex = 0;
                    //console.log(soundIndex);
                    deleteLastSound();
                    deleteLastWidget();
                    createSoundcloudWidget(mood);
                    //}
                });
            }
            else
            {
                console.log("Nothing has changed...");
            }

            function testTest() {

                console.log("hij komt wel in deze functie, maar niet in de Events.PLAY!!");

                widget.bind(SC.Widget.Events.PLAY, function () {
                    console.log('dit is test nummer 2!');

                    // get information about currently playing sound
                    widget.getCurrentSound(function (currentSound) {
                        console.log('dit is test nummer 3!');

                        //get all songs in playlist
                        widget.getSounds(function (Sounds) {
                            //console.log(Sounds.length);
                            playlist = Sounds.length;
                        });

                        //get the index of the song
                        widget.getCurrentSoundIndex(function (currentSoundIndex) {
                            console.log('dit is test nummer 4!');

                            //console.log(currentSoundIndex);
                            soundIndex = currentSoundIndex + 1;
                            //console.log(soundIndex);
                            test = test + 1;
                            console.log(test);
                        });

                        //console.log(currentSound);

                        currentsoundcloudsong1 = currentSound['title'];

                        //check if currentsoundcloudsong is true
                        if (currentsoundcloudsong1) {
                            deleteLastSound();
                            console.log('hierdoor dus!!!!');
                        }

                        currentSoundcloudSong();

                    });
                });
            }
            testTest();
        });

    }());
}

/**
 * put the currentsound in a div
 */
function currentSoundcloudSong() {

    //create p with current song
    createHTMLElement('p', currentsoundcloudsong1);
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

/**
 * delete the latest widget
 */
function deleteLastWidget() {
    createElement2.remove(placeholder2);
}
