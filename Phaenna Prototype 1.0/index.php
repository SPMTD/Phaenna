<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Phaenna Prototype 1.0</title>
        <link rel="stylesheet" href="css/master.css">
        <script type="text/javascript" src="js/scripts.js"></script>
    </head>
    <body>

    <div id="container">


        <button id = "0" type="button" name="btn_unhappy" onclick="clickedButton(this)">Unhappy</button>
        <button id = "1" type="button" name="btn_neutral" onclick="clickedButton(this)">Neutral</button>
        <button id = "2" type="button" name="btn_happy" onclick="clickedButton(this)">Happy</button>

        <div class="musicPlayerDiv">
            <audio id = "musicPlayer" autoplay = "true" controls prelod="none">
                <source id="mp3" src="audio/neutral_1.mp3" type="audio/mp3" />
            </audio>
        </div>
    </div>
    </body>
</html>
