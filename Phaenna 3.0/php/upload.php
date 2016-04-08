<?php
//Create the image URL and upload it to the server
$imageURL = 'temp/cam' . md5(time()).rand(383,1000) . '.jpg';
move_uploaded_file($_FILES['webcam']['tmp_name'], $imageURL);

//Send the image URL back to the client
echo $imageURL;