var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
    ID: String,
    BID_ID: String,
    TEN_EV: String,
    START: String,
    END: String,
    LINK_BAIVIET: String,
    DIEMTICHLUY: Number,
});
var Event = mongoose.model('Event', eventSchema, 'events');
module.exports = Event;