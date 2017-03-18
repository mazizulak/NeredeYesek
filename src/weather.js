var xmlhttp = new XMLHttpRequest();
var url = "http://api.openweathermap.org/data/2.5/weather?id=745044&APPID=f7a1f7201de17dc71fd2dc59b503ed4b&units=metric&type=accurate";

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var myArr = JSON.parse(this.responseText);
        myFunction(myArr);
    }
};
xmlhttp.open("GET", url, true);
xmlhttp.send();

function myFunction(arr) {
    console.log(arr);
    //var obj = JSON.parse('arr');
    console.log(arr.weather[0].main);
    console.log(arr.main.temp);
}


