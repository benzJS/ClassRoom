var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    ID: String,
    EMAIL: String,
    PASSWD: String,
    DIEMTICHLUY: Number
});
var User = mongoose.model('User', userSchema, 'users');
module.exports = User;
