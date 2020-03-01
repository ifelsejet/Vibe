const firebaseConfig = {
  apiKey: "AIzaSyAOlXkSpNIMUZFFiAEvUBts7ttexz90zL0",
  authDomain: "vibe-269707.firebaseapp.com",
  databaseURL: "https://vibe-269707.firebaseio.com",
  projectId: "vibe-269707",
  storageBucket: "vibe-269707.appspot.com",
  messagingSenderId: "129843277105",
  appId: "1:129843277105:web:6f976526c34fc66bd01410",
  measurementId: "G-MR7QZXDVDS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();



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
  setTrack("angry");
  setBg("angry");
  togglePlay();
}

function togglePlay() {
  let ele = document.getElementById("music");
  let btn = document.getElementById("playStatusBtn");

      
      if(ele.paused) {
        ele.muted = false;
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
      take = document.getElementById("dl-btn");

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
     // canvas.appendChild(draw);
      var imageDataURL = draw.toDataURL("image/png");
      document.querySelector('#dl-btn').href = imageDataURL;

      
      
    //  console.log(typeof blob);
    // var storageRef = storage.ref("images/");
    // draw.toBlob(function(blob){

    //   var image = new Image();
    //   var delayInMilliseconds = 1000; //1 second

    //     setTimeout(function() {
    //       //your code to be executed after 1 second
          
    //       image.src = blob;
    //     }, delayInMilliseconds);
        
    //     //var uploadTask = storageRef.put(blob);
      
      
      
      
      
    // })
    
      /*storageRef.put(IMG_).then(function() {
        console.log("pic ");
      });*/
      

      
    });
  })
  .catch(function(err) {
    document.getElementById("vid-controls").innerHTML = "Please enable access and attach a camera";
  });
});



var fileUploadEvent = document.getElementById('browse');
fileUploadEvent.addEventListener('change', function(e){
var url2;
var file = e.target.files[0];
var storageRef = storage.ref(file.name);
var fileName = "" + file.name;



//store image in firebase storage
storageRef.put(file).then(function() {
    
    //get download url for image and store to firestore
    storage.ref().child(fileName).getDownloadURL().then(function(url2) { 
      console.log(url2)

            console.log("run bitch");
            firebase.database().ref('PiData/NewInfo').set({
                img: url2
            });
            
            //window.location.href = "../index.html";
        
        
        
        
    })


  });
});

function takeSnapshot(){

  var hidden_canvas = document.querySelector('canvas'),
      video = document.querySelector('video.camera_stream'),
      image = document.querySelector('img.photo'),

      // Get the exact size of the video element.
      width = video.videoWidth,
      height = video.videoHeight,

      // Context object for working with the canvas.
      context = hidden_canvas.getContext('2d');

  // Set the canvas to the same dimensions as the video.
  hidden_canvas.width = width;
  hidden_canvas.height = height;

  // Draw a copy of the current frame from the video on the canvas.
  context.drawImage(video, 0, 0, width, height);

  // Get an image dataURL from the canvas.
  var imageDataURL = hidden_canvas.toDataURL('image/png');

  // Set the dataURL as source of an image element, showing the captured photo.

    // Set the href attribute of the download button.
    document.querySelector('#dl-btn').href = imageDataURL;


}