var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    level: String
});
var User = mongoose.model('User', userSchema, 'user');
module.exports = User;
