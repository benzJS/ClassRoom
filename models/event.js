var mongoose = require('mongoose');
var eventSchema = new mongoose.Schema({
    CLASS_ID: String,
    ORGANIZER: String,
    EV_NAME: String,
    START: String,
    END: String,
    TOPIC_LINK: String,
    EV_SCORE: Number
});
var Event = mongoose.model('Event', eventSchema, 'events');
module.exports = Event;