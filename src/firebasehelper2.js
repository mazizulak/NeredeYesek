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
var oldUserName;
var newUserName;
var oldMail;
var newMail;
var check=0;
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
                       if(check==1){
                       return;
                       }
	//  console.log(childSnapshot.val().name)
	  var row = table.insertRow(table.rows.length);
	  //table.rows[1].height = '100'
	  var cell1 = row.insertCell(0);
	  var cell2 = row.insertCell(1);
	  var cell3 = row.insertCell(2);
	  var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
	  var img = document.createElement('img');
	  img.style.height = '65px';
	  img.style.width = '65px';
      if(childSnapshot.val().picture==""){
        img.src='../images/defaultProfileImage.png';
    	}else{
         img.src=childSnapshot.val().picture;
      }
        console.log("Simdi Cekiyorum"+childSnapshot.val().name);
	  cell1.appendChild(img);
	  cell2.innerHTML = childSnapshot.val().name;
	  cell3.innerHTML = childSnapshot.val().voted;
	  cell4.innerHTML = '<paper-button onclick="editMember('+table.rows.length+');" raised class="red"><i class="material-icons">create</i></paper-button>';
      cell5.innerHTML = childSnapshot.val().email
	  })
	});
}

function addMember(){
    check=1;
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

	var Usersref = FIRRef.child('Users');
    var newData={
    'email': userMail.value,
    'name': userName.value,
    'picture': "",
    'voted': 0
    };
    Usersref.push(newData);
    //table.refresh();
	//console.log(userMail.value+"   "+userName.value);
	userName.value = "";
	userMail.value = "";
}

function editMember(cell){
    check=1;
	var name = table.rows[cell-1].cells[1].innerHTML;
    var mail=table.rows[cell-1].cells[4].innerHTML;
    console.log(table.rows[cell-1].cells[4].innerHTML);
	globalCell = cell-1;
    oldUserName=table.rows[cell-1].cells[1].innerHTML;
    oldMail=table.rows[cell-1].cells[4].innerHTML;
	console.log(table.rows[cell-1].cells[1].innerHTML);
	dialogForEdit.open();
	var userName = document.getElementById("editUserName");
    var email = document.getElementById("editUserMail");
    newUserName=document.getElementById("editUserName");
    newMail=document.getElementById("editUserMail");
	email.value = mail;
    userName.value = name;
}
function saveMember(){
    check=1;
    console.log("Save started");
	table.rows[globalCell].cells[1].innerHTML = document.getElementById("editUserName").value;
    var Usersref = FIRRef.child('Users');
    Usersref.on('value',function(snapshot){
               snapshot.forEach(function(childSnapshot) {
                                if(childSnapshot.val().name==oldUserName){
                                childSnapshot.ref.update({"name":newUserName.value});
                                childSnapshot.ref.update({"email":newMail.value});
                                }
                })
               });
    console.log("Save finished");
	//Mail bilgisi de firebase e buradan gönderilecek
}
