var mongoose = require('mongoose');
var lopHocSchema = new mongoose.Schema({
    TENLOP: String,
    ID_CHUNHIEM: String
});
var LopHoc = mongoose.model('LopHoc', lopHocSchema, 'lophoc');
module.exports = LopHoc;