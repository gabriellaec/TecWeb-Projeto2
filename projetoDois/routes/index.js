var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var app = express();
let request = require('request');


// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// Import routes
//let apiRoutes = require("./routes")
// Use Api routes in the App
//app.use('/api', apiRoutes)

// Send message for default route
router.get('/', function(req, res, next){
  res.send("Express is running successfully!");
});


 
//let apiKey = 'e306bc0cb38032abdae3550cf4782400';
let cidade = 'Guarda';
let url = `http://api.weatherstack.com/current?access_key=f18a154e8af2d05014336d0c78ea763f&query=${cidade}`
let dados ='';
 
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

 router.get('/weather', function(req, res, next){
  res.send(jsontosend);
});


router.get('/city', function(req, res, next){
  res.send(local);
});

   }
});


module.exports = router;





// router.get('/api', function(req, res, next){
//   unirest.get("https://currency-exchange.p.rapidapi.com/exchange")
//     .header("x-rapidAPI-key", "766086636dmsh77c84dc0a496b5bp1d67e4jsne48fe28337f8")
//     .header("x-rapidapi-host", "currency-exchange.p.rapidapi.com")
//     .header(	"useQueryString", true)

//     .query({
//       "q": "1.0",
// 	    "from": "SGD",
// 	      "to": "MYR"

//     })
    
//     .end(function (result) {
//       if (res.error) throw new Error(res.error);

//       res.json(result);
//       res.end();
//     });
//   })

// app.get('/', function(req, res){
//   unirest.get("https://community-open-weather-map.p.rapidapi.com/weather")
//     .header("X-RapidAPI-Key", "766086636dmsh77c84dc0a496b5bp1d67e4jsne48fe28337f8")
//     .header("x-rapidapi-host", "community-open-weather-map.p.rapidapi.com")
//     .query({
//         'appid' : '2172797',
//         'lon': '12.4924',
//         'lat': '41.8902',
//         'units': 'metric',
//         'mode': 'html'
//     })
//     .end(function (result) {
//         res.writeHead(200, {"Content-Type": "text/html"});
//         res.write(result.body);
//         console.log('Colosseum, I am coming!');
//     });
//   })
 

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// /* GET Userlist page. */
// router.get('/userlist', function(req, res) {
//   var db = require("../db");
//   var Users = db.Mongoose.model('usercollection', db.UserSchema,
// 'usercollection');
//   Users.find({}).lean().exec(
//      function (e, docs) {
//       res.json(docs);
//       res.end();
//   });
// });

// /* GET New User page. */
// router.get('/newuser', function(req, res) {
//   res.render('newuser', { title: 'Add New User' });
//   });


//   /* POST to Add User Service */
// router.post('/adduser', function (req, res) {
//   var db = require("../db");
//   var userName = req.body.username;
//   var userEmail = req.body.useremail;
//   var Users = db.Mongoose.model('usercollection', db.UserSchema,
// 'usercollection');
//   var user = new Users({ username: userName, email:
// userEmail });
//   user.save(function (err) {
//       if (err) {
//           console.log("Error! " + err.message);
//           return err;
//       }
//       else {
//           console.log("Post saved");
//           res.redirect("userlist");
//       }
//   });
// });

// /* GET ONE users. */
// router.get('/user/:id', function (req, res, next) {
//   var db = require('../db');
//   var User = db.Mongoose.model('usercollection', db.UserSchema,
// 'usercollection');
//   User.find({ _id: req.params.id }).lean().exec(function (e,
// docs) {
//       res.json(docs);
//       res.end();
//   });
// });

// /* POST ONE users. */
// router.post('/users/', function (req, res, next) {
//   var db = require('../db');
//   var User = db.Mongoose.model('usercollection', db.UserSchema,
// 'usercollection');
//   var newuser = new User({ username: req.body.name, email:
// req.body.email });
//   newuser.save(function (err) {
//       if (err) {
//           res.status(500).json({ error: err.message });
//           res.end();
//           return;
//       }
//       res.json(newuser);
//       res.end();
//   });
// });


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




//https://medium.com/@jootorres_11979/integra%C3%A7%C3%A3o-de-api-usando-dedos-meteorol%C3%B3gicos-com-node-js-dc3c383af030