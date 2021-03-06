var config = {
    apiKey: "AIzaSyC83fcF4D4JhK2rBClQ-xid1U6SaVH9Xlc",
      authDomain: "project2-hw1.firebaseapp.com",
      databaseURL: "https://project2-hw1.firebaseio.com",
      storageBucket: "project2-hw1.appspot.com",
      messagingSenderId: "980282935378"
   };
  firebase.initializeApp(config);
  var FIRRef = firebase.database().ref();
  var memberContainer = document.getElementById("membercontainer");

//window.addEventListener("ewfwef", getRst());
var table;
var globalCell;
var oldRestName;
var oldPrice;
var oldLocation;
var oldDuration;
var newDuration;
var newRestName;
var newPrice;
var newLocation;
var check=0;
var counter =1;
var countForPoints = 1;
var voter,point;
var updatedObj, totalpoint;
var restVoters;
var dropDownForMembers ='<paper-listbox class="dropdown-content" id="memberList">';
if(document.getElementById("restaurant")==null){
  console.log("restaurant is null");
  //nothing
  location.reload();
}else{
  console.log("else girdim restaurant");
  var Members = FIRRef.child('Users');
  Members.on('value',function(snapshot){
    snapshot.forEach(function(childSnapshot) {
                       if(check==1){
                       return;
                       }
       console.log(dropDownForMembers);
       console.log(childSnapshot.val().name);                
      dropDownForMembers = dropDownForMembers+'\n<paper-item id="member'+counter+'">'+childSnapshot.val().name +'</paper-item>';
      counter++;
      if(counter == snapshot.numChildren()+1){
        dropDownForMembers += '\n</paper-listbox>\n';
        memberContainer.innerHTML = dropDownForMembers;
      }
    })
  });

  
  

  var Restaurants = FIRRef.child('Restaurants');
  table = document.getElementById("restaurant").getElementsByTagName('tbody')[0];
  Restaurants.on('value',function(snapshot){
    snapshot.forEach(function(childSnapshot) {
                     if(check==1){
                     return;
                     }
  //  console.log(childSnapshot.val().name)
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var img = document.createElement('img');
    img.style.height = '65px';
    img.style.width = '65px';
    if(childSnapshot.val().picture==""){
        img.src='../images/defaultPlaceImage.png';
    }else{
        img.src=childSnapshot.val().picture;
    }

    cell1.appendChild(img);
    cell2.innerHTML = childSnapshot.val().name;
    cell3.innerHTML = childSnapshot.val().price;
    cell4.innerHTML = childSnapshot.val().location;
    cell5.innerHTML = '<paper-button onclick="editRestaurant('+table.rows.length+');" raised class="red"><i class="material-icons">create</i></paper-button>';
    })
  });
}
function addRestaurant(){
    check=1;
    var restName = document.getElementById("addName");
    var restLocation = document.getElementById("addLocation");
    var restPrice = document.getElementById("addPrice");
    var restDuration = document.getElementById("addDuration");
    var row = table.insertRow(table.rows.length);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var img = document.createElement('img');
    img.style.height = '65px';
    img.style.width = '65px';
    img.src='../images/defaultPlaceImage.png';
    cell1.appendChild(img);
    cell2.innerHTML = restName.value;
    cell3.innerHTML = restPrice.value;
    cell4.innerHTML = restLocation.value
    cell5.innerHTML = '<paper-button onclick="editRestaurant('+table.rows.length+');" raised class="red"><i class="material-icons">create</i></paper-button>';
    var restaurantId;
    //firebase add
    var Restaurantref = FIRRef.child('Restaurants');
    Restaurantref.on('value',function(snapshot){
                      restaurantId=snapshot.numChildren();
                      });
    Restaurantref.child(restaurantId+1).set({
    'accessType': 'Walk',
    'duration': restDuration.value,
    'visitTimes': 0,
    'visitedYesterday': 0,
    'location':restLocation.value,
    'name' : restName.value,
    'picture': "",
    'points': 0,
    'price': parseInt(restPrice.value)
    });
    restName.value="";
    restLocation.value="";
    restPrice.value="";
}

function editRestaurant(cell){
    check=1;
    var name = table.rows[cell-1].cells[1].innerHTML;
    var price = table.rows[cell-1].cells[2].innerHTML;
    var location = table.rows[cell-1].cells[3].innerHTML;
    oldRestName=table.rows[cell-1].cells[1].innerHTML;
    oldPrice=table.rows[cell-1].cells[2].innerHTML;
    oldLocation=table.rows[cell-1].cells[3].innerHTML;
    globalCell = cell-1;
    console.log(table.rows[cell-1].cells[1].innerHTML);
    dialogForEdit.open();
    var RestaurantName = document.getElementById("editRestaurantName");
    RestaurantName.value = name;
    newRestName=document.getElementById("editRestaurantName");
    var RestaurantPrice = document.getElementById("editRestaurantPrice");
    RestaurantPrice.value = price;
    newPrice=document.getElementById("editRestaurantPrice");
    var editRestaurantLocation = document.getElementById("editRestaurantLocation");
    editRestaurantLocation.value = location;
    newLocation=document.getElementById("editRestaurantLocation");
}
function saveRestaurant(){
    check=1;
    table.rows[globalCell].cells[1].innerHTML = document.getElementById("editRestaurantName").value;
    table.rows[globalCell].cells[2].innerHTML = document.getElementById("editRestaurantPrice").value;
    table.rows[globalCell].cells[3].innerHTML = document.getElementById("editRestaurantLocation").value;
    var selectedMember = document.getElementById("memberList").selected;
    var selectedPoint = document.getElementById("pointList").selected;
    voter = document.getElementById('member'+(selectedMember+1)).innerHTML;
    voter = nameFixer(voter);
    point = selectedPoint+1;
    console.log('voter: '+voter);
    console.log('selectedMember: '+selectedMember);
    console.log('point: '+point);
    var RestaurantsRef = FIRRef.child('Restaurants');
    RestaurantsRef.on('value',function(snapshot){
                snapshot.forEach(function(childSnapshot) {
                                console.log(oldRestName);
                                 if(childSnapshot.val().name==oldRestName){
                                 childSnapshot.ref.update({"name":newRestName.value});
                                 childSnapshot.ref.update({"price":newPrice.value});
                                 childSnapshot.ref.update({"location":newLocation.value});
                                  
                                  updatedObj = {};
                                  updatedObj[voter] = -point;
                                  childSnapshot.ref.child("Voters").update(updatedObj);
                                  restVoters = childSnapshot.ref.child("Voters");
                                  
                                    totalpoint =  0;
                                    countForPoints = 1;
                                    restVoters.on('value',function(snapshot2){
                                      snapshot2.forEach(function(childSnapshot2){
                                          totalpoint += childSnapshot2.val();
                                          console.log('totalpoint: '+totalpoint);
                                          if(snapshot2.numChildren()==countForPoints){
                                            console.log("counter: "+countForPoints);
                                            console.log("totalpoint yazıldı: "+totalpoint);
                                            childSnapshot.ref.update({"points":totalpoint});
                                          }
                                          countForPoints++;
                                      })
                                  });
                                  


                                  }
                                 })
                });
    //Mail bilgisi de firebase e buradan gönderilecek
}

function nameFixer(str){
  var fixedStr ='';
  var ckk = 0;
  for (var i = 0 ; i < str.length ; i++) {
    if(str[i] != ' ' && str[i] !='\n'){
      ckk = 1;
    }
    if(ckk==1){
      fixedStr += str[i];
        if(str[i+1]=='\n'){
          return fixedStr;
        } 
    }
  }

}