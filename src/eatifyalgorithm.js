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
var weatherUrl = "https://api.apixu.com/v1/current.json?key=16552f582d5040f082c144652172803&q=Istanbul";
var myArr;
var result;
var dd;
var mm;
var finished = 0;
var maxPoint = 1;
var counter = 0;
var is_month_finished = 0;
var normalizedDuration, normalizedVisitTimes, normalizedPrice, normalizedPoints;
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        myArr = JSON.parse(this.responseText);
        console.log('Weather data: '+myArr.current.condition.text);

        runMonthlyTask();
        
    }
};
xmlhttp.open("GET", weatherUrl, true);
xmlhttp.send();

function runMonthlyTask() { //Runs every month
	var today = new Date();
	dd = today.getDate();
	mm = today.getMonth()+1; //January is 0!
	var FirDay;
	var FirMonth;
	FIRRef.child("Month").on('value', function(snapshot) {
		FirMonth=snapshot.val();
		if(mm!=FirMonth){
			console.log("monthly Task Run");
			FIRRef.update({"Month":mm});
			Restaurants = FIRRef.child('Restaurants');
		    Restaurants.orderByChild("points").on('value',function(snapshot2){
			    snapshot2.forEach(function(childSnapshot) {
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
			    childSnapshot.ref.update({"visitedYesterday": 0});	
			    childSnapshot.ref.update({"visitTimes": 0});    
			    counter++;
			    if(counter == snapshot2.numChildren()){
			    	is_month_finished = 1;
			    	counter = 0;
			    	runDailyTask();
	    }
    })
  });
		}else{
			runDailyTask();
		}
	});

	

}

  
function runDailyTask(){
	var today = new Date();
	dd = today.getDate();
	mm = today.getMonth()+1; //January is 0!
	var FirDay;
	var FirMonth;
	FIRRef.child("Day").on('value', function(snapshot) {
			FirDay=snapshot.val();
			if(dd!=FirDay){
				console.log("Daily Task Run");
				FIRRef.update({"Day":dd});
				CalculateDaily = FIRRef.child('Restaurants');
			    CalculateDaily.orderByChild("systempoint").on('value',function(snapshot2){
				    snapshot2.forEach(function(childSnapshot) {
				    	console.log("Daily snapshot içindeyim");
				    	if(childSnapshot.val().visitedYesterday!=1){
				    		console.log("İlk ife girdim");
				    		if((childSnapshot.val().accessType == 'Walk') &&(myArr.current.condition.text == 'Heavy rain' ||myArr.current.condition.text == 'Heavy rain at times' ||myArr.current.condition.text == 'Moderate rain' || myArr.current.condition.text == 'Patchy freezing drizzle nearby' || myArr.current.condition.text == 'Patchy freezing drizzle nearby' || myArr.current.condition.text == 'Blowing snow') ){
				   			// nothing
				   			console.log("bişi yapmadım");
							}
							else{
								console.log("else girdim daily");
								console.log("childSnapshot.val().sysytemPoint: "+childSnapshot.val().systempoint);
								console.log("finished in degeri: "+finished);
								if(finished < 1){
									finished = 4;
									console.log("finished 1 oldu");	
									selectedRest_systemPoint = childSnapshot.val().systempoint;
									FIRRef.once('value',function(snapshot3){
									var oldRestaurant = snapshot3.val().Result;
									FIRRef.child("Restaurants").child(oldRestaurant).ref.update({"visitedYesterday":0});
							  		console.log('Result added as: '+ childSnapshot.key);
									FIRRef.update({"Result":childSnapshot.key});
									FIRRef.child("Restaurants").child(childSnapshot.key).ref.update({"visitedYesterday":1});
									console.log("Update restaurant başladı başlayacak");
									updateRestaurant(childSnapshot.key);
				  				});
								}
							    

				}
	    	}	
    })
  });
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

	

}

function updateRestaurant(key){
	console.log("updaterestaurant başladı");
	restRef = FIRRef.child('Restaurants').child(key);
    restRef.once('value',function(data){
    	console.log("Şimdi bu restaurantı update ediyorum: "+ data.val().name);
		var oldvisitTime=data.val().visitTimes;
		var oldsystempoint = data.val().systempoint;
		FIRRef.child("Restaurants").child(key).ref.update({"visitTimes":oldvisitTime+1});
		FIRRef.child("Restaurants").child(key).ref.update({"systempoint":oldsystempoint + 0.075});
		FIRRef.child("Restaurants").child(key).ref.update({"visitedYesterday":1});
		resultRestaurant.innerHTML = data.val().name;
		resultRestaurantImage.src= data.val().picture;
		dialogForMail.open();
  });
}
