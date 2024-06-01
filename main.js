Peter_pan_song_1="";
Harry_potter_theme_song_2="";
leftWrist_x=0;
leftWrist_y=0;
rightWrist_y=0;
rightWrist_x=0;
score_leftWrist=0;
score_rightWrist=0;
Peter_pan_song="";
Harry_potter_theme_song="";

function setup()
{
    canvas=createCanvas(600,530);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,model_loaded);
    poseNet.on('pose',gotposes);
}
function preload()
{
    Peter_pan_song_1 = loadSound("music2.mp3");
    Harry_potter_theme_song_2 = loadSound("music.mp3");
}

function draw()
{
    image(video,0,0,600,530);
    fill("#00ff00");
    stroke ("#ff0000");
    
    Peter_pan_song=Peter_pan_song_1.isPlaying();
    console.log(Peter_pan_song);


    Harry_potter_theme_song=Harry_potter_theme_song_2.isPlaying();
    console.log(Harry_potter_theme_song);


    if(score_leftWrist>0.2)
    {
        circle(leftWrist_x,leftWrist_y,20);
        Harry_potter_theme_song_2.stop();
        if(Peter_pan_song == false)
            {
                Peter_pan_song_1.play();
            }
    else
    {
        console.log("Song Name: Peter Pan Song");
        document.getElementById("song_id").innerHTML="Song Name: Peter Pan Song";
    }
}

    if(score_rightWrist > 0.2)
        {
            circle(rightWrist_x,rightWrist_y,20);
            Peter_pan_song_1.stop();
            if(Harry_potter_theme_song == false)
                {
                    Harry_potter_theme_song_2.play();
                }
    else
    {
        console.log("Song Name: Harry Potter Theme Song");
        document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
    }
    }
}
function model_loaded()
{
    console.log("PoseNet is initialized");

}
function gotposes(results){
    if(results.length > 0)
        {
            console.log(results);

            score_leftWrist = results[0].pose.keypoints[9].score;
            console.log(score_leftWrist);

            score_rightWrist = results[0].pose.keypoints[10].score;
            console.log(score_rightWrist);
            
            leftWrist_x = results[0].pose.leftWrist.x;
            leftWrist_y = results[0].pose.leftWrist.y;
            console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);
            
            rightWrist_x = results[0].pose.rightWrist.x;
            rightWrist_y = results[0].pose.rightWrist.y;
            console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
        }
    }
