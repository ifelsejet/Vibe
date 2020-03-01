//Setting up hard-coded arrays for video playback and video information
let happyTitles = ["Happy", "Uptown Funk", "CAN'T STOP THE FEELING", "Shake It Off", "Shape of You"];
let happyArtists = ["Pharrell Williams", "Mark Ronson ft. Bruno Mars", "Justin Timberlake", "Taylor Swift", "Ed Sheeran"];

let sadTitles = ["When I Was Your Man", "i hate u, i love u", "Wake Me Up When September Ends", "Say Something", "Hello"];
let sadArtists = ["Bruno Mars", "gnash ft. olivia o-brien", "Green Day", "A Great Big World & Christina Aguilera", "Adele"];

let angryTitles = ["House of Wolves", "Down With The Sickness", "Bulls On Parade", "The Fight Song", "Till' I Collapse"];
let angryArtists = ["My Chemical Romance", "Disturbed", "Rage Against The Machine", "Marilyn Mansion", "Eminem"];

let url = "../music";
let happyParams = "270deg, #e9ec5e, #ff2278";
let sadParams = "270deg, #02bee8, #7a33bf";
let angryParams = "270deg, #840029, #a91834, #f64d52";


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

function playAngry() {
  //setTrack("angry");
  setBg("angry");
  //togglePlay();
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

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function saveImg() {
  let data = document.getElementById("pic").toDataURL();
  $.ajax({
    type: "POST",
    url: "process.php",
    data: {
       imgBase64: data
    }
  }).done(function(o) {
    console.log('saved');
  });
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
    //  draw.width = video.videoWidth;
    //  draw.height = video.videoHeight;
      var context2D = draw.getContext("2d");
      context2D.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      //hey idk whats going on.... just do it (tm)
      var pic = document.getElementById("pic");
      pic.width = video.videoWidth;
      pic.height = video.videoHeight;
      var context2D = pic.getContext("2d");
      context2D.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      pic.style.display = "inline";
      // Put into canvas container
      canvas.innerHTML = "";
      canvas.appendChild(draw);

      sleep(500);
      saveImg();
      });
  })
  .catch(function(err) {
    document.getElementById("vid-controls").innerHTML = "Please enable access and attach a camera";
  });
});
