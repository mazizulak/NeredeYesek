var config = {
    apiKey: "AIzaSyC83fcF4D4JhK2rBClQ-xid1U6SaVH9Xlc",
      authDomain: "project2-hw1.firebaseapp.com",
      databaseURL: "https://project2-hw1.firebaseio.com",
      storageBucket: "project2-hw1.appspot.com",
      messagingSenderId: "980282935378"
   };
  firebase.initializeApp(config);
  var FIRRef = firebase.database().ref();

//window.addEventListener("ewfwef", getRst());

if(document.getElementById("restaurant")==null){
  console.log("restaurant is null");
  //nothing
  location.reload();
}else{
  console.log("else girdim restaurant");
  var Restaurants = FIRRef.child('Restaurants');
    var table = document.getElementById("restaurant").getElementsByTagName('tbody')[0];
  Restaurants.on('value',function(snapshot){
    snapshot.forEach(function(childSnapshot) {
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
    img.src=childSnapshot.val().picture;
    //img.src ="../images/nusret.jpg";
    cell1.appendChild(img);
    cell2.innerHTML = childSnapshot.val().name;
    cell3.innerHTML = childSnapshot.val().price;
    cell4.innerHTML = childSnapshot.val().location;
    cell5.innerHTML = '<paper-button onclick="editRestaurant('+table.rows.length+');" raised class="red"><i class="material-icons">create</i></paper-button>';
    })
  });
}

function editRestaurant(cell){
    var name = table.rows[cell-1].cells[1].innerHTML;
    globalCell = cell-1;
    console.log(table.rows[cell-1].cells[1].innerHTML);
    dialogForEdit.open();
    var RestaurantName = document.getElementById("editRestaurantName");
    RestaurantName.value = name;
    var RestaurantPrice = document.getElementById("editRestaurantPrice");
    RestaurantPrice.value = name;
    var editRestaurantLocation = document.getElementById("editRestaurantLocation");
    editRestaurantLocation.value = name;
    //userMail.value = "";
}
