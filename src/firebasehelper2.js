var config = {
    apiKey: "AIzaSyC83fcF4D4JhK2rBClQ-xid1U6SaVH9Xlc",
      authDomain: "project2-hw1.firebaseapp.com",
      databaseURL: "https://project2-hw1.firebaseio.com",
      storageBucket: "project2-hw1.appspot.com",
      messagingSenderId: "980282935378"
	 };
	firebase.initializeApp(config);
	var FIRRef = firebase.database().ref();
var table;
var globalCell;
if(document.getElementById("member")==null){
	console.log("member is null");
	//nothing
	location.reload();
}else{
	console.log("else girdim member");
	var Members = FIRRef.child('Users');
	table = document.getElementById("member").getElementsByTagName('tbody')[0];
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
	  cell4.innerHTML = '<paper-button onclick="editMember('+table.rows.length+');" raised class="red"><i class="material-icons">create</i></paper-button>';
	  })
	});
}

function addMember(){
	var userName = document.getElementById("newUserName");
	var userMail = document.getElementById("newUserMail");
	//table = document.getElementById("member").getElementsByTagName('tbody')[0];
	var row = table.insertRow(table.rows.length);
	var cell1 = row.insertCell(0);
	var cell2 = row.insertCell(1);
	var cell3 = row.insertCell(2);
	var cell4 = row.insertCell(3);
	var img = document.createElement('img');
	img.style.height = '65px';
	img.style.width = '65px';
	img.src='../images/defaultProfileImage.png';
	cell1.appendChild(img);
	cell2.innerHTML = userName.value;
	cell3.innerHTML = '0';
	cell4.innerHTML = '<paper-button onclick="editMember('+table.rows.length+');" raised class="red"><i class="material-icons">create</i></paper-button>';
	console.log(userMail.value+"   "+userName.value);
	userName.value = "";
	userMail.value = "";
}

function editMember(cell){
	var name = table.rows[cell-1].cells[1].innerHTML;
	globalCell = cell-1;
	console.log(table.rows[cell-1].cells[1].innerHTML);
	dialogForEdit.open();
	var userName = document.getElementById("editUserName");
	//var userMail = document.getElementById("newUserMail"); // Firebaseden çekilecek
	userName.value = name;
	//userMail.value = "";
}
function saveMember(){
	table.rows[globalCell].cells[1].innerHTML = document.getElementById("editUserName").value;
	//Mail bilgisi de firebase e buradan gönderilecek
}