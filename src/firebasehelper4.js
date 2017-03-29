var config = {
    apiKey: "AIzaSyC83fcF4D4JhK2rBClQ-xid1U6SaVH9Xlc",
      authDomain: "project2-hw1.firebaseapp.com",
      databaseURL: "https://project2-hw1.firebaseio.com",
      storageBucket: "project2-hw1.appspot.com",
      messagingSenderId: "980282935378"
	 };
	firebase.initializeApp(config);
	var FIRRef = firebase.database().ref();
    var mostvisited = document.getElementById("MostVisited");
    var leastvisited = document.getElementById("LeastVisited");
    var totalvote = document.getElementById("TotalVote");
    var restcount = document.getElementById("restCount");
    var usercount = document.getElementById("userCount");
restRef = FIRRef.child('Restaurants');
restRef.orderByChild("visitTimes").limitToFirst(1).once('value',function(snapshot2){
    snapshot2.forEach(function(childSnapshot) {
                      leastvisited.innerHTML = childSnapshot.val().name;
                      // least visited rest
  })
});
restRef = FIRRef.child('Restaurants');
var visitTime=0;
var counter=1;
var mostVisitedRest="";
restRef.orderByChild("visitTimes").on('value',function(snapshot2){
        snapshot2.forEach(function(childSnapshot) {
                if(snapshot2.numChildren()==counter){
                          mostvisited.innerHTML=childSnapshot.val().name;
                          //Most Visited Restaurant
                }
                          counter++;
    })
});

restRef = FIRRef.child('Restaurants');
restRef.once('value',function(snapshot2){
             restcount.innerHTML=snapshot2.numChildren();//Restaurant number
});
userRef = FIRRef.child('Users');
userRef.once('value',function(snapshot2){
             usercount.innerHTML=snapshot2.numChildren();//User number
});
var voteCount=0;
var counter2=1;
restRef.on('value',function(snapshot2){
           snapshot2.forEach(function(childSnapshot) {
                             if(childSnapshot.hasChild("Voters")){
                             var key=childSnapshot.key;
                             VotersRef=FIRRef.child('Restaurants').child(key).child("Voters");
                             VotersRef.once('value',function(votersnapshot){
                                            voteCount+=votersnapshot.numChildren();
                             })
                             }
        if(counter2==snapshot2.numChildren()){
         totalvote.innerHTML=voteCount;// Total Vote
        }
        counter2++;
    })
});

ga('send', {
   hitType: 'pageview',
   page: "https://project2-hw1.firebaseapp.com"
});


