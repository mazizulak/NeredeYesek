var config = {
    apiKey: "AIzaSyC83fcF4D4JhK2rBClQ-xid1U6SaVH9Xlc",
      authDomain: "project2-hw1.firebaseapp.com",
      databaseURL: "https://project2-hw1.firebaseio.com",
      storageBucket: "project2-hw1.appspot.com",
      messagingSenderId: "980282935378"
 };
firebase.initializeApp(config);
var FIRRef = firebase.database().ref();

var Restaurants = FIRRef.child('Restaurants');

FIRRef.child('Restaurants').child('Balıkev').on("value", function(snapshot) {
   console.log(snapshot.val());
    var restname = snapshot.val().name;
  console.log(restname);
  document.getElementById('restname').innerHTML = restname;
}, function (error) {
   console.log("Error: " + error.code);
});