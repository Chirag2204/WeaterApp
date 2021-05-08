const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
 console.log("Post request Accepted!");
  var cityName = req.body.cityName;
  var url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid={apikey}&units=metric#";

   //to get reponse using url of an API
  https.get(url,function(response){

   response.on("data",function(data){
     var weatherData = JSON.parse(data);
     var city = weatherData.name;
     var temperature = weatherData.main.temp;
     var description = weatherData.weather[0].description;
     var icon = weatherData.weather[0].icon;
     var imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png";

     console.log(temperature+" Celcius Degrees");
     console.log(description);

      res.write("<h1>Temperature at "+city+" is : "+temperature+" degree Celcius</h1>");
     res.write("<h3>Weather description : "+description+"</h3>")
     res.write("<img src = "+imageURL+">");
     res.send();
   });
  });
});

app.listen(3000,function(){
  console.log("Server Started!");
});
