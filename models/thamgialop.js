var mongoose = require('mongoose');
var thamGiaLopSchema = new mongoose.Schema({
    ID_USERS: String,
    ID_LOPHOC: String,
    FULLPERMISSION: String
});
var ThamGiaLop = mongoose.model('ThamGiaLop', thamGiaLopSchema, 'thamgialop');
module.exports = ThamGiaLop;