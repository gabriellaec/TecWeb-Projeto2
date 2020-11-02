const cors = require('cors')
const express = require('express')
const app = express()
app.use(cors())
var router = express.Router();
var unirest = require('unirest');
let request = require('request');
const mysql = require("mysql");
var where = require('node-where');

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
  });


// *GET* test
router.get('/', function(req, res, next){
  res.send("Express is running successfully!");
});


// // *CONNECT* to mysql
// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "gabi8009",
//   database: "Projeto2"
// });


/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = require("../db");
  var Users = db.Mongoose.model('usercollection', db.UserSchema,
'usercollection');
  Users.find({}).lean().exec(
     function (e, docs) {
      res.json(docs);
      res.end();  });
});

// router.get('/register', function(req, res, next){
//   console.log(req)
//   const username = req.body.username
//   const password = req.body.password

//   if (username && password){
//     db.query("INSERT INTO pessoas (nome, senha) VALUES (?,?)"
//     , [username,password],
//     (err,result) =>{
//       console.log(err);
//     }
//     );
//   }
 
// });

/* GET New User page. */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Add New User' });
  });

/* POST to Add User Service */
router.post('/adduser', function (req, res) {
  var db = require("../db");
  var userName = req.body.username;
  var userPassword = req.body.userpassword;
  var Users = db.Mongoose.model('usercollection', db.UserSchema,
'usercollection');
  var user = new Users({ username: userName, password:
userPassword });
  user.save(function (err) {
      if (err) {
          console.log("Error! " + err.message);
          return err;
      }
      else {
          console.log("Post saved");
          res.redirect("userlist");
      }
  });
});


router.post('/login', async function (req, res) {
  var db = require("../db");
  var Users = await db.Mongoose.model('usercollection', db.UserSchema,
      'usercollection');
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
  var User = db.Mongoose.model('usercollection', db.UserSchema,
'usercollection');
  User.find({ _id: req.params.id }).lean().exec(function (e,
docs) {
      res.json(docs);
      res.end();
  });
});


/* POST ONE users. */
router.post('/users/', function (req, res, next) {
  var db = require('../db');
  var User = db.Mongoose.model('usercollection', db.UserSchema,
'usercollection');
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
//   var User = db.Mongoose.model('usercollection', db.UserSchema,
// 'usercollection');
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
//   var User = db.Mongoose.model('usercollection',
// db.UserSchema, 'usercollection');
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


//let apiKey = 'e306bc0cb38032abdae3550cf4782400';
let cidade = 'Guarda';
let url = `http://api.weatherstack.com/current?access_key=f18a154e8af2d05014336d0c78ea763f&query=${cidade}`
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
 tempo = weather.current.temperature
 icon = weather.current.weather_icons
 current = weather.current
 icon=current.weather_icons

 console.log(icon)

 jsontosend = ({obj1:current,obj2:icon})
 delete current['weather_icons'];

 icon = undefined;
 current = JSON.parse(JSON.stringify(current));

 dados = "Local: "+ local+ "; Hora: "+ hora
 console.log(jsontosend);
 console.log(current);

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





module.exports = router;





//https://medium.com/@jootorres_11979/integra%C3%A7%C3%A3o-de-api-usando-dedos-meteorol%C3%B3gicos-com-node-js-dc3c383af030