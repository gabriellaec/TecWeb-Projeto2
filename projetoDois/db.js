var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/projeto2');


var userSchema = new mongoose.Schema({
    username: String,
    password: String
}, { collection: 'usercollection' }
);

var postSchema = new mongoose.Schema({
    city: String,
    username: String,
    content: String,
    date: Date
}, { collection: 'postslist' }
);


module.exports = { Mongoose: mongoose, UserSchema: userSchema, PostSchema: postSchema }




//projetoDois