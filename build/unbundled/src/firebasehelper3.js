function addRestaurant(){check=1;var e=document.getElementById("addName"),t=document.getElementById("addLocation"),a=document.getElementById("addPrice"),l=table.insertRow(table.rows.length),n=l.insertCell(0),r=l.insertCell(1),i=l.insertCell(2),o=l.insertCell(3),s=l.insertCell(4),c=document.createElement("img");c.style.height="65px",c.style.width="65px",c.src="../images/defaultPlaceImage.png",n.appendChild(c),r.innerHTML=e.value,i.innerHTML=a.value,o.innerHTML=t.value,s.innerHTML='<paper-button onclick="editRestaurant('+table.rows.length+');" raised class="red"><i class="material-icons">create</i></paper-button>';var d=FIRRef.child("Restaurants");d.push({"access type":"walk",duration:1e3,gone:0,limit:0,location:t.value,name:e.value,picture:"",price:parseInt(a.value),"weather-sens":1e3}),e.value="",t.value="",a.value=""}function editRestaurant(e){check=1;var t=table.rows[e-1].cells[1].innerHTML,a=table.rows[e-1].cells[2].innerHTML,l=table.rows[e-1].cells[3].innerHTML;oldRestName=table.rows[e-1].cells[1].innerHTML,oldPrice=table.rows[e-1].cells[2].innerHTML,oldLocation=table.rows[e-1].cells[3].innerHTML,globalCell=e-1,console.log(table.rows[e-1].cells[1].innerHTML),dialogForEdit.open();var n=document.getElementById("editRestaurantName");n.value=t,newRestName=document.getElementById("editRestaurantName");var r=document.getElementById("editRestaurantPrice");r.value=a,newPrice=document.getElementById("editRestaurantPrice");var i=document.getElementById("editRestaurantLocation");i.value=l,newLocation=document.getElementById("editRestaurantLocation")}function saveRestaurant(){check=1,table.rows[globalCell].cells[1].innerHTML=document.getElementById("editRestaurantName").value,table.rows[globalCell].cells[2].innerHTML=document.getElementById("editRestaurantPrice").value,table.rows[globalCell].cells[3].innerHTML=document.getElementById("editRestaurantLocation").value;var e=FIRRef.child("Restaurants");e.on("value",function(e){e.forEach(function(e){console.log(oldRestName),e.val().name==oldRestName&&(e.ref.update({name:newRestName.value}),e.ref.update({price:newPrice.value}),e.ref.update({location:newLocation.value}))})})}var config={apiKey:"AIzaSyC83fcF4D4JhK2rBClQ-xid1U6SaVH9Xlc",authDomain:"project2-hw1.firebaseapp.com",databaseURL:"https://project2-hw1.firebaseio.com",storageBucket:"project2-hw1.appspot.com",messagingSenderId:"980282935378"};firebase.initializeApp(config);var FIRRef=firebase.database().ref(),table,globalCell,oldRestName,oldPrice,oldLocation,newRestName,newPrice,newLocation,check=0;if(null==document.getElementById("restaurant"))console.log("restaurant is null"),location.reload();else{console.log("else girdim restaurant");var Restaurants=FIRRef.child("Restaurants");table=document.getElementById("restaurant").getElementsByTagName("tbody")[0],Restaurants.on("value",function(e){e.forEach(function(e){if(1!=check){var t=table.insertRow(table.rows.length),a=t.insertCell(0),l=t.insertCell(1),n=t.insertCell(2),r=t.insertCell(3),i=t.insertCell(4),o=document.createElement("img");o.style.height="65px",o.style.width="65px",""==e.val().picture?o.src="../images/defaultPlaceImage.png":o.src=e.val().picture,a.appendChild(o),l.innerHTML=e.val().name,n.innerHTML=e.val().price,r.innerHTML=e.val().location,i.innerHTML='<paper-button onclick="editRestaurant('+table.rows.length+');" raised class="red"><i class="material-icons">create</i></paper-button>'}})})}