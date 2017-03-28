var config = {
    apiKey: "AIzaSyC83fcF4D4JhK2rBClQ-xid1U6SaVH9Xlc",
      authDomain: "project2-hw1.firebaseapp.com",
      databaseURL: "https://project2-hw1.firebaseio.com",
      storageBucket: "project2-hw1.appspot.com",
      messagingSenderId: "980282935378"
	 };
	firebase.initializeApp(config);
	var FIRRef = firebase.database().ref();


var resultRestaurant = document.getElementById('resultRestaurant');
var resultRestaurantImage = document.getElementById('resultRestaurantImage');
var Restaurants;
var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?id=745044&APPID=f7a1f7201de17dc71fd2dc59b503ed4b&units=metric&type=accurate";
var myArr;
var result;
var dd;
var mm;
var maxPoint = 1;
var normalizedDuration, normalizedVisitTimes, normalizedPrice, normalizedPoints;
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myArr = JSON.parse(this.responseText);
        decideToUpdate();
        
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function runMonthlyTask() { //Runs every month
	Restaurants = FIRRef.child('Restaurants');
    Restaurants.orderByChild("points").on('value',function(snapshot){
	    snapshot.forEach(function(childSnapshot) {
	    	if(maxPoint>0){
	    		maxPoint = childSnapshot.val().points;
	    	}
	    normalizedPoints = ((childSnapshot.val().points)/maxPoint)*5;
	    normalizedPrice = (parseInt(childSnapshot.val().price)/3)*5;
	    normalizedDuration = (childSnapshot.val().duration/18)*5; //Normalize duration 
	    normalizedVisitTimes = (childSnapshot.val().visitTimes/10)*5 // The limit is 10 for a rest for a month
	    result = 0.5*normalizedPoints - 0.15*normalizedDuration - 0.15*normalizedVisitTimes - 0.2*normalizedPrice;
	    console.log('Restaurant Name: '+childSnapshot.val().name);
	    console.log('maxPoint: '+maxPoint);
	    console.log('Point: '+(-childSnapshot.val().points));
	    console.log('duration: '+childSnapshot.val().duration);
	    console.log('normalizedDuration: '+normalizedDuration);
	    console.log('normalizedPrice: '+normalizedPrice);
	    console.log('normalizedPoints: '+normalizedPoints);
	    console.log('normalizedVisitTimes: '+normalizedVisitTimes);
	    console.log('result: '+ result);
	    childSnapshot.ref.update({"systempoint": -result});	
    })
  });
    console.log('Weather data: '+myArr);
    console.log('Weather main: '+myArr.weather[0].main);
    console.log('Weather temp: '+myArr.main.temp);

}

function decideToUpdate(){ // Runs every day

	var today = new Date();
	dd = today.getDate();
	mm = today.getMonth()+1; //January is 0!
	var FirDay;
	var FirMonth;
	FIRRef.child("Day").on('value', function(snapshot) {
		FirDay=snapshot.val();
		if(dd!=FirDay){
			runDailyTask();
			console.log("Daily Task Run");
		}else{
			FIRRef.on('value',function(snapshot2){
				console.log(snapshot2.val().Result);
				FIRRef.child('Restaurants').child(snapshot2.val().Result).on('value',function(snapshot3){
					resultRestaurant.innerHTML = snapshot3.val().name;
				    resultRestaurantImage.src= snapshot3.val().picture;
  				});
  			});
		}
    });
	FIRRef.child("Month").on('value', function(snapshot) {
		FirMonth=snapshot.val();
		if(mm!=FirMonth){
			runMonthlyTask();
			console.log("monthly Task Run");

		}
	});
	
    

}
  
function runDailyTask(){

	FIRRef.update({"Day":dd});

	CalculateDaily = FIRRef.child('Restaurants');
    CalculateDaily.orderByChild("points").on('value',function(snapshot){
	    snapshot.forEach(function(childSnapshot) {
	    	if(childSnapshot.val().visitedYesterday!=1){
	    		if((childSnapshot.val().accessType == 'Walk') &&(myArr.weather[0].main == 'Rain' || myArr.weather[0].main == 'Snow' ||myArr.weather[0].main == 'Extreme') ){
	   			// nothing
				}
				else{
					FIRRef.update({"Result":childSnapshot.key});
					updateRestaurant(childSnapshot.key);
					
				}
	    	}	
    })
  });

}

function updateRestaurant(key){
	FIRRef.child("Restaurants").child(key).ref.update({"visitedYesterday":1});
	restRef = FIRRef.child('Restaurants').child(key);
    restRef.on('value',function(snapshot){
		var oldvisitTime=snapshot.val().visitTimes;
		var oldsystempoint = snapshot.val().systempoint;
		FIRRef.child("Restaurants").child(key).ref.update({"visitTimes":oldvisitTime+1});
		FIRRef.child("Restaurants").child(key).ref.update({"systempoint":oldsystempoint + 0.075});
		resultRestaurant.innerHTML = snapshot.val().name;
		resultRestaurantImage.src= snapshot.val().picture;
  });
}
