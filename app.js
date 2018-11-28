var express = require('express');
var app = express();
var path = require('path');
var server = app.listen(3000, () => {
    console.log('Listening');
})
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var User = require('./models/user');
var homeRoute = require('./routes/home.route');
var accountRoute = require('./routes/account.route')

mongoose.connect('mongodb://localhost/classroom', {useNewUrlParser: true})
app.set('views', './views')
app.set('view engine', 'ejs');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log(`${socket.id} just connected`);
    socket.on('Signin', data => {
        User.find({EMAIL: data.EMAIL}, (err, user) => {
            if(user == "" || user.PASSWD != data.passwd){
                socket.emit('SigninState', true);
            }
            else{
                socket.emit('SigninState', false);
            }
        })
    })
})
app.use('/', homeRoute);
app.use('/account', accountRoute);