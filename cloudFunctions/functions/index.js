const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.MoodData = functions.firestore.document("MoodData/{docID}").onCreate(snap => {
    
    var newVal = (snap.data());
    var word = newVal["Sad"]

     return db.collection("PiData").doc("NewInfo").set({
        Sad: word

    })
});


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.PullFromPi = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
