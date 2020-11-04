const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
var router = express.Router();
var unirest = require('unirest');
let request = require('request');
const mysql = require("mysql");
var where = require('node-where');



//***********POSTS**********//

/* GET Postlist page. */
router.get('/postlist', function(req, res) {
  var db = require("../db");
  var Posts = db.Mongoose.model('postslist', db.PostSchema,
'postslist');
  Posts.find({}).lean().exec(
     function (e, docs) {
      res.json(docs);
      res.end();  });
});


/* POST to Add User Service */
router.post('/addpost', function (req, res) {
  console.log(req.body)
  var content = req.body.content;
  var userName = "user";
  console.log(userName)
  console.log(content)

  var db = require("../db");
  
  var Posts = db.Mongoose.model('posts', db.PostSchema,
'posts');
  var user = new Posts({ username: userName, content:
content, date: new Date() });
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
          // res.redirect("userlist");
      }
  });
});


//******************************************************** */
// *GET* test
router.get('/', function(req, res, next){
  res.send("Express is running successfully!");
});



//***********USERS**********//
/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
  });


/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('userslist', db.UserSchema,
'userslist');
  Users.find({}).lean().exec(
     function (e, docs) {
      res.json(docs);
      res.end();  });
});


/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
  });

/* POST to Add User Service */
router.post('/adduser', function (req, res) {

  console.log(req.body)
  var userName = req.body.username;
  var userPassword = req.body.password;
  var num = 0;
  console.log(userName)
  console.log(userPassword)

  var db = require("../db");
  
  var Users = db.Mongoose.model('userslist', db.UserSchema,
'userslist');
  var user = new Users({ "username": userName, "password":
userPassword, status: 0});
console.log(user)
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
          res.redirect("userlist");

          console.log(user)
          // res.redirect("userlist");
      }
  });
});


router.post('/login', async function (req, res) {
  var db = require("../db");
  var Users = await db.Mongoose.model('userslist', db.UserSchema,
      'userslist');
  var userName = req.body.username;
  var userPassword = req.body.password;
  await Users.find({ "username": userName, "password": userPassword }, (err, users) => {
      if (users.length) {
          res.json(users);
          res.end();
      } else {
          res.json();
          res.end();
      }
  });
});


/* GET ONE users. */
router.get('/user/:id', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('userslist', db.UserSchema,
'userslist');
  User.find({ _id: req.params.id }).lean().exec(function (e,
docs) {
      res.json(docs);
      res.end();
  });
});


/* POST ONE users. */
router.post('/users/', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('userslist', db.UserSchema,
'userslist');
  var newuser = new User({ username: req.body.name, password:
req.body.password });
  newuser.save(function (err) {
      if (err) {
          res.status(500).json({ error: err.message });
          res.end();
          return;
      }
      res.json(newuser);
      res.end();
  });
});


// /* PUT ONE user. */
// router.put('/users/:id', function (req, res, next) {
//   var db = require('../db');
//   var User = db.Mongoose.model('userslist', db.UserSchema,
// 'userslist');
//   User.findOneAndUpdate({ _id: req.params.id }, req.body,
// { upsert: true }, function (err, doc) {
//       if (err) {
//           res.status(500).json({ error: err.message });
//           res.end();
//           return;
//       }
//       res.json(req.body);
//       res.end();
//   });
// });


// /* DELETE ONE user. */
// router.delete('/users/:id', function (req, res, next) {
//   var db = require('../db');
//   var User = db.Mongoose.model('userslist',
// db.UserSchema, 'userslist');
//   User.find({ _id: req.params.id }).remove(function (err) {
//       if (err) {
//           res.status(500).json({ error: err.message });
//           res.end();
//           return;
//       }
//       res.json({success: true});
//       res.end();
//   });
// });


//***********USERS**********//



//***********CITY/WEATHER**********//

let cidade = 'Miami';


/* GET Place. */
router.post('/place', function (req, res, next) {
  // console.log(req)
  console.log(req.body)

  let cidade = req.body.City;
  console.log(cidade)

 
let url = `http://api.weatherstack.com/current?access_key=f18a154e8af2d05014336d0c78ea763f&query=${cidade}`
let dados ='';
 
// *REQUEST* connect to external api
request(url, function (err, response, body) {
 if(err){
  console.log('error:', error);
 } else {
 let weather = JSON.parse(body);

 if(typeof weather !== "undefined"){

 

 //dados = 'Dados Metereológicos para a ${location.name}: -Temperatura: ${current.temperature}ºC%'
 if(typeof weather.location !== "undefined"){
 local = weather.location
 hora = weather.location.localtime
 temperatura = weather.current.temperature
 tempo = weather.current.temperature
 icon = weather.current.weather_icons
 current = weather.current
 icon=current.weather_icons

cityname=local.name
description = weather.current.weather_descriptions
wind = weather.current.wind_speed
uv = weather.current.uv_index
day = weather.current.is_day

 }
 console.log(icon)

 recjson = ({
   city: cityname,
   weather_description: description,
   windspeed: wind,
   uv_index: uv,
   is_day: day
 })

 jsontosend = ({obj1:current,obj2:icon})
 delete current['weather_icons'];

 icon = undefined;
 current = JSON.parse(JSON.stringify(current));

 dados = "Local: "+ local+ "; Hora: "+ hora
 console.log(jsontosend);
 console.log(current);

 console.log(weather)
 console.log("*"*30);

 console.log(recjson);

// *GET* weather page
 router.get('/weather', function(req, res, next){
  res.send(jsontosend);
});

// *GET* city page
router.get('/city', function(req, res, next){
  res.send(local);
});


// *GET* recommendations page
router.get('/recommendations', function(req, res, next){
  res.send(recjson);
});

   }}
});
});













/* GET Place. */
router.post('/forecast', function (req, res, next) {
  // console.log(req)
  console.log(req.body)

  let cidade = req.body.City;
  console.log(cidade)

 
let url = `http://api.weatherstack.com/forecast?access_key=f18a154e8af2d05014336d0c78ea763f&query=${cidade}&forecast_days=7`
let dados ='';
 
// *REQUEST* connect to external api
request(url, function (err, response, body) {
 if(err){
  console.log('error:', error);
 } else {
 let weather = JSON.parse(body);
 //dados = 'Dados Metereológicos para a ${location.name}: -Temperatura: ${current.temperature}ºC%'
 local = weather.location
 hora = weather.location.localtime
 temperatura = weather.current.temperature
 tempo = weather.current.weather_descriptions
 icon = weather.current.weather_icons
 current = weather.current
 icon=current.weather_icons

 console.log(tempo)
 console.log(tempo.includes("cloud"))

 if (tempo.includes("sun")){
   var icon = "https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F455426581041768615%2F&psig=AOvVaw2_NvLkgUL3pnbW1fBDJOGd&ust=1604458151567000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCz7sOu5ewCFQAAAAAdAAAAABAW"
 }
 if( tempo.indexOf("cloud") > -1 ) {
   console.log("oieeeeeeeee")
    var icon = "https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fgifer.com%2Fen%2Fsp&psig=AOvVaw0vIRKh9laKqmRDdiQaHue_&ust=1604458757337000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiYneiw5ewCFQAAAAAdAAAAABA1"
 }
 else if (tempo.includes("cloud")){
  var icon = "https://www.google.com.br/url?sa=i&url=https%3A%2F%2Fgifer.com%2Fen%2Fsp&psig=AOvVaw0vIRKh9laKqmRDdiQaHue_&ust=1604458757337000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMiYneiw5ewCFQAAAAAdAAAAABA1"
}
 console.log(icon)

 jsontosend = ({obj1:current,obj2:icon})
 delete current['weather_icons'];

 icon = undefined;
 current = JSON.parse(JSON.stringify(current));

 dados = "Local: "+ local+ "; Hora: "+ hora
 console.log(jsontosend);
 console.log(current);
 console.log(tempo);

 console.log(weather)

// *GET* weather page
 router.get('/weather', function(req, res, next){
  res.send(jsontosend);
});

// *GET* city page
router.get('/city', function(req, res, next){
  res.send(local);
});

   }
});
});

module.exports = router;





//https://medium.com/@jootorres_11979/integra%C3%A7%C3%A3o-de-api-usando-dedos-meteorol%C3%B3gicos-com-node-js-dc3c383af030