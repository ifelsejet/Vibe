//Setting up hard-coded arrays for video playback and video information
var happyTitles = ["Happy", "Uptown Funk", "CAN'T STOP THE FEELING"];
var happyArtists = ["Pharrell Williams", "Mark Ronson ft. Bruno Mars", "Justin Timberlake"]

var sadTitles = ["When I Was Your Man", "i hate u, i love u", "Wake Me Up When September Ends", "Say Something"];
var sadArtists = ["Bruno Mars", "gnash ft. olivia o-brien", "Green Day", "A Great Big World & Christina Aguilera"];

let url = "../music";
//let suffix = "?autoplay=1&muted=0";

function initPlayer() {
  playHappy();
  togglePlay(); //since playHappy() already calls togglePlay(), this will just pause the player again (big brain)
  document.getElementById("playStatusBtn").innerHTML = "Play";
}

function playHappy() {
  setTrack("happy");
  togglePlay();
}

function playSad() {
  setTrack("sad");
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
