import { cueTimer } from "./modules/cuepoints.js";

document.addEventListener("DOMContentLoaded", init)
var myCues;
function init() {

    // create a playlist of functions to call at certain moments in the video.
   myCues = [
        { seconds: 27, callback: func1 },
        { seconds: 9, callback: func2 },
        { seconds: 63, callback: func4 },
        { seconds: 110, callback: func6 },
        { seconds: 120, callback: func4 },
        { seconds: 50, callback: func5 }
    ];

    // setup the cuepoint timer
    cueTimer.setup("vid", myCues);

    // create shortcut variables
    const vid = document.querySelector("#vid");
    const selectVid = document.querySelector("#video_select");
    const selectTxt = document.querySelector("#text-track");
    const display = document.getElementById("transcript");
    const transcript_en = document.getElementById("transcript-en");
    const showHide = document.getElementById("show-hide");

    // initialize video select dropdown behavior
    selectVid.addEventListener("change", (e) => {
 
        // depending on which video is selected, change the cues
        // and change the captions.
        if (e.target.value == 'vids/Jefferson_Airplane_White_Rabbit .mp4') {
            
            // choose the english caption text
            selectTrack(null, vid, 'en');

            // reset the cues playlist
            myCues = [
                { seconds: 27, callback: func1 },
                { seconds: 9, callback: func2 },
                { seconds: 15, callback: func3 },
                { seconds: 25, callback: func6 },
                { seconds: 37, callback: func2 },
                { seconds: 50, callback: func5 }
            ];
            // recreate the cue timer
            cueTimer.setup("vid", myCues);

        } else if(e.target.value == 'vids/Jimi_Hendrix_Experience_All_Along_The_Watchtower.mp4') {
            // if bunny video, empty the myCues array
            // and change the caption texts
            myCues.splice(0, myCues.length);
            selectTrack(null, vid, 'en-bunny');
        }
        // finally, swap the video to play
        selectVideo(e, vid);
    });

    // initialize video captions dropdown behavior
    selectTxt.addEventListener("change", (e) => {
        const id = e.target.value;
        selectTrack(e, vid, id);
    });

    // initialize text transcript display (english)
    transcript_en.addEventListener(
        "click",
        function (e) {
            e.preventDefault();
            webvttTranscript("captions/synergy.vtt", display);
    });   
}
//the custom callback functions to trigger when a cuepoint is hit.
//You can code up whatever behavior you need in your own callbacks

function func1() {
    document.querySelector("#vid").style = "outline : 10px solid purple";
}

function func2() {
    let pop = document.querySelector(".pop");
    pop.innerHTML = "<p>Sick guitar intro</p>";
    document.querySelector(".pop").classList.toggle("hide");
    setTimeout(() => {
        document.querySelector(".pop").classList.toggle("hide");
    }, 2000);
    document.querySelector("#web").src = "imgs/queen.png";
}

function func3() {
    const pop = document.querySelector(".pop");
    pop.innerHTML = "<p>Drugs are bad m'kay</p>";
    pop.classList.toggle("hide");
    setTimeout(() => {
        document.querySelector(".pop").classList.toggle("hide");
    }, 2000);
    document.querySelector("#vid").style = "outline: 0px solid purple";
    document.querySelector("#web").src =
        "imgs/tallAlice.jpg";
}

function func4() {
    document.querySelector("#web").src =
        "imgs/caterpillar.png";
}

function func5() {
    document.querySelector("#web").src =
        "imgs/rabbit.png";
}

function func6() {
    document.querySelector("#web").src = "imgs/whiteKnight.png";
}

