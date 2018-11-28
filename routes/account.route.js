var router = require('express').Router();
var User = require('../models/user');

router.get('/', (req, res) => {
    res.render('./account/account');
})

router.post('/signin', (req, res) => {
    User.find({EMAIL: req.body.email}, (err, data) => {
        console.log(data);
        console.log(req.body.email);
        if (data == "" || data[0].PASSWD != req.body.passwd){
            res.render('account/account', {err: "Mật khẩu hoặc email không đúng, hãy thử lại"})
            return;
        }
        else{
            res.render('index');
        }
    })
})


module.exports = router;