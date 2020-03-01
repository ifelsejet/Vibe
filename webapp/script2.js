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
  const db = firebase.firestore();

  
var fileUploadEvent = document.getElementById('fileUpload');
fileUploadEvent.addEventListener('change', function(e){

  var file = e.target.files[0];
  var storageRef = storage.ref(file.name);
  var fileName = "" + file.name;
  
 

  //store image in firebase storage
  storageRef.put(file).then(function() {
      
      //get download url for image and store to firestore
      storage.ref().child(fileName).getDownloadURL().then(function(url) { 
          var Image = document.getElementById('image')
          
          Image.src = url
          Image.className = "resize";


          
              console.log("run bitch");
              db.collection('Posts').doc().set({
                  Img: url
                  
              }).then(
                  
              )
              
              //window.location.href = "../index.html";
          
          
          
          
      })
  

  })