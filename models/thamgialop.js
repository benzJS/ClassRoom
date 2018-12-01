var mongoose = require('mongoose');
var thamGiaLopSchema = new mongoose.Schema({
    ID_USER: String,
    ID_LOPHOC: String
});
var ThamGiaLop = mongoose.model('ThamGiaLop', thamGiaLopSchema, 'thamgialop');
module.exports = ThamGiaLop;