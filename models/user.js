var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
    MSSV: String,
    EMAIL: String,
    HOTEN: String,
    PASSWD: String,
    DIEMTICHLUY: Number
});
var User = mongoose.model('User', userSchema, 'users');
module.exports = User;
