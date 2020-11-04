var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/projeto2');



var postSchema = new mongoose.Schema({
    city: String,
    username: String,
    content: String,
    date: Date
}, { collection: 'postslist' }
);

var userSchema = new mongoose.Schema({
    status: Number,
    favourites: Array,
    username: String,
    password: String
}, { collection: 'userslist' }
);





module.exports = { Mongoose: mongoose, UserSchema: userSchema, PostSchema: postSchema }




//projetoDois