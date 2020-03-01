//Setting up hard-coded arrays for video playback and video information
let happyTitles = ["Happy", "Uptown Funk", "CAN'T STOP THE FEELING"];
let happyArtists = ["Pharrell Williams", "Mark Ronson ft. Bruno Mars", "Justin Timberlake"]

let sadTitles = ["When I Was Your Man", "i hate u, i love u", "Wake Me Up When September Ends", "Say Something"];
let sadArtists = ["Bruno Mars", "gnash ft. olivia o-brien", "Green Day", "A Great Big World & Christina Aguilera"];

let url = "../music";
let happyParams = "270deg, #e9ec5e, #ff2278";
let sadParams = "270deg, #02bee8, #7a33bf";


function initPlayer() {
  playHappy();
  togglePlay(); //since playHappy() already calls togglePlay(), this will just pause the player again (big brain)
  document.getElementById("playStatusBtn").innerHTML = "Play";
}

function playHappy() {
  setTrack("happy");
  setBg("happy");
  togglePlay();
}

function playSad() {
  setTrack("sad");
  setBg("sad");
  togglePlay();
}

function togglePlay() {
  let ele = document.getElementById("music");
  let btn = document.getElementById("playStatusBtn");
  if(ele.paused) {
    ele.play();
    btn.innerHTML = "Pause";
  } else {
    ele.pause();
    btn.innerHTML = "Play";
  }
}

var prevIndex = -1;
var i = -1;
function genNewIndex(dir) {
  while(i == prevIndex) {
    i = Math.floor(Math.random() * eval(dir+"Titles").length);
  }
  prevIndex = i;
  return i;
}

function setTrack(dir) {
  console.log(dir);
  i = genNewIndex(dir);
  document.getElementById("music").src = url + "/" + dir + "/" + i  + ".mp3";
  console.log(url + "/" + dir + "/" + i + ".mp3");
  document.getElementById("title").innerHTML = eval(dir+"Titles")[i];
  document.getElementById("artist").innerHTML = "By: " + eval(dir+"Artists")[i];
}

function setBg(dir) {
  var ele = document.getElementById("bg");
  ele.style.background = "linear-gradient(" + eval(dir + "Params") + ")";
  //console.log("linear-gradient(" + eval(dir + "Params") + ")");
  ele.style.animation = "grad 9s ease infinite";
  ele.style.backgroundSize = "400% 400%";

}

//VIDEO CODE BELOW
window.addEventListener("load", function(){
  // [1] GET ALL THE HTML ELEMENTS
  var video = document.getElementById("vid-show"),
      canvas = document.getElementById("vid-canvas"),
      take = document.getElementById("vid-take");

  // [2] ASK FOR USER PERMISSION TO ACCESS CAMERA
  // WILL FAIL IF NO CAMERA IS ATTACHED TO COMPUTER
  navigator.mediaDevices.getUserMedia({ video : true })
  .then(function(stream) {
    // [3] SHOW VIDEO STREAM ON VIDEO TAG
    video.srcObject = stream;
    video.play();

    // [4] WHEN WE CLICK ON "TAKE PHOTO" BUTTON
    take.addEventListener("click", function(){
      // Create snapshot from video
      var draw = document.createElement("canvas");
      draw.width = video.videoWidth;
      draw.height = video.videoHeight;
      var context2D = draw.getContext("2d");
      context2D.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      // Put into canvas container
      canvas.innerHTML = "";
      canvas.appendChild(draw);
    });
  })
  .catch(function(err) {
    document.getElementById("vid-controls").innerHTML = "Please enable access and attach a camera";
  });
});
