//Setting up hard-coded arrays for video playback and video information
var happyTitles = ["Happy", "Uptown Funk", "CAN'T STOP THE FEELING"];
var happyArtists = ["Pharrell Williams", "Mark Ronson ft. Bruno Mars", "Justin Timberlake"]

var sadTitles = ["When I Was Your Man", "i hate u, i love u", "Wake Me Up When September Ends", "Say Something"];
var sadArtists = ["Bruno Mars", "gnash ft. olivia o-brien", "Green Day", "A Great Big World & Christina Aguilera"];

let url = "../music";
//let suffix = "?autoplay=1&muted=0";



function playHappy() {
  console.log("happy");
  i = Math.floor(Math.random() * happyTitles.length)+1;
  document.getElementById("music").src = url + "/happy/" + i + ".mp3";
  console.log(url + "/happy/" + i + ".mp3");

}

function playSad() {
  console.log("sad");
  i = Math.floor(Math.random() * sadTitles.length)+1;
  document.getElementById("music").src = url + "/sad/" + i  + ".mp3";
  console.log(url + "/sad/" + i + + ".mp3");
}
