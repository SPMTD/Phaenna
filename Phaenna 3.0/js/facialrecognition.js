//Global variables
var imageURL;
var results;

/**
 * Attach a click handler to the camera button and start the camera
 */
function createCamera()
{
    //Add an event listener to the button
    var cameraButton = document.getElementById('btn_camera');
    cameraButton.addEventListener('click', takeSnapshot);

    //Create the settings for the camera stream
    Webcam.set({
        width: 762,
        height: 420,
        image_format: 'jpeg',
        jpeg_quality: 90
    });

    Webcam.attach('#camera');
}

/**
 * Take a picture
 */
function takeSnapshot()
{
    //Take a picture
    Webcam.snap(saveSnapshot);
}

/**
 * Upload the picture to the server
 *
 * @param data_uri
 */
function saveSnapshot(data_uri)
{
    //Create an img element for the snapshot
    var img = document.createElement('img');
    img.setAttribute('id', 'photo');
    img.src = data_uri;

    //Append the image to the results div and upload it to the server
    results = document.getElementById('cameraResults');
    results.appendChild(img);
    Webcam.upload(data_uri, './php/upload.php', facialRecognition);
}

/**
 * Run the facial recognition on the picture
 *
 * @param code
 * @param text
 */
function facialRecognition(code, text)
{
    //Store the right path in the global imageURL variable
    imageURL = 'php/' + text;

    //Change the source of the photo
    var image = document.getElementById('photo');
    image.src = imageURL;

    //Make the AJAX call to the facial recognition API
    $.ajax({
        dataType: 'json',
        url: 'php/webcam.php',
        data: {
            url: image.src
        }
    }).done(storeMood);
}

/**
 * Stores the mood for each face found in the image
 *
 * @param data
 */
function storeMood(data)
{
    console.log(data);

    //Store the faces in a variable for easier use
    var faces = data.body.face;

    //Check if a face is recognized
    if (faces.length > 0) {
        //Set the mood for each face
        for (var i = 0; i < faces.length; i++) {
            var mood;
            var smiling = faces[i].attribute.smiling.value;
            if (smiling > 15) {
                mood = 'positief';
            } else if (smiling > 7.5) {
                mood = 'neutraal';
            } else {
                mood = 'negatief';
            }

            //Make the AJAX call to store the mood in the database
            $.ajax({
                url: 'php/webcamMood.php',
                data: {mood: mood}
            }).done(deleteImage);
        }
    } else {
        deleteImage();
    }

}

/**
 * Deletes the image from the server and the page
 */
function deleteImage() {
    //Get the URL of the image to delete
    var image = document.getElementById('photo');
    imageURL = image.src;

    //Make the AJAX call to delete the image
    $.ajax ({
        url: 'php/deleteImage.php',
        data: {url: imageURL}
    });

    while (results.firstChild) {
        results.removeChild(results.firstChild);
    }

    printResponse();
}

/**
 * Prints response so the user knows his mood has been submitted
 */
function printResponse() {
    var responseText = document.getElementById('submitResponseText');
    responseText.innerHTML = "You have submitted your mood";
}