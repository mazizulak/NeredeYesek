var config = {
    apiKey: "AIzaSyC83fcF4D4JhK2rBClQ-xid1U6SaVH9Xlc",
      authDomain: "project2-hw1.firebaseapp.com",
      databaseURL: "https://project2-hw1.firebaseio.com",
      storageBucket: "project2-hw1.appspot.com",
      messagingSenderId: "980282935378"
	 };
	firebase.initializeApp(config);
	var FIRRef = firebase.database().ref();

if(document.getElementById("member")==null){
	console.log("member is null");
	//nothing
	location.reload();
}else{
	console.log("else girdim member");
	var Members = FIRRef.child('Users');
		var table = document.getElementById("member").getElementsByTagName('tbody')[0];
	Members.on('value',function(snapshot){
	  snapshot.forEach(function(childSnapshot) {
	//  console.log(childSnapshot.val().name)
	  var row = table.insertRow(table.rows.length);
	  //table.rows[1].height = '100'
	  var cell1 = row.insertCell(0);
	  var cell2 = row.insertCell(1);
	  var cell3 = row.insertCell(2);
	  var cell4 = row.insertCell(3);
	  var img = document.createElement('img');
	  img.style.height = '65px';
	  img.style.width = '65px';
	  img.src=childSnapshot.val().picture;
	  cell1.appendChild(img);
	  cell2.innerHTML = childSnapshot.val().name;
	  cell3.innerHTML = childSnapshot.val().voted;
	  cell4.innerHTML = '<paper-button raised class="red"><i class="material-icons">create</i></paper-button>';
	  })
	});
}

function addMember(){
	var userName = document.getElementById("newUserName");
	var userMail = document.getElementById("newUserMail");
	console.log(userMail.value+"   "+userName.value);
	userName.value = "";
	userMail.value = "";
}
