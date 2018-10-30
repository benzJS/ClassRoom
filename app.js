var express = require('express');
var app = express();
var server = app.listen(3000, () => {
    console.log('Listening');
})
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var io = require('socket.io')(server);
var User = require('./models/user');
var accountRoute = require('./routes/account.route')

mongoose.connect('mongodb://localhost/applypj', {useNewUrlParser: true})
app.set('views', './views')
app.set('view engine', 'pug');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

io.on('connection', (socket) => {
    console.log(`${socket.id} just connected`);
    socket.on('Signin', data => {
        User.find({email: data.email}, (err, user) => {
            console.log(data);
        })
    })
})
app.get('/', (req, res) => {
    console.log(server);
    User.find({}, (err, data) => {
        matchedData = data.filter(user => user.email.indexOf(req.query.q) !== -1)
        res.render('index', {data: matchedData});
    })
})

app.use('/account', accountRoute);