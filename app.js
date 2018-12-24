var express = require('express');
var app = express();
var path = require('path');
var server = app.listen(3000, () => {
    console.log('Listening');
})
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var homeRoute = require('./routes/home.route');
var accountRoute = require('./routes/account.route');
var classRoute = require('./routes/class.route');
var cache = require('memory-cache');

var Event = require('./models/event');

mongoose.connect('mongodb://localhost/classroom', {useNewUrlParser: true})
app.set('views', './views')
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRoute);
app.use('/account', accountRoute);
app.use('/c', classRoute);

io.on('connection', socket => {
    socket.on('insert-event', eventData => {
        var eventObject = eventData;
        eventObject.CLASS_ID = cache.get('currentClass');
        eventObject.ORGANIZER = cache.get('currentAccount')._id;
        // console.log(eventObject);
        new Event(eventObject).save();
    });
})