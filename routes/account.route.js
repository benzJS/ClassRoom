var router = require('express').Router();
var User = require('../models/user');
var cache = require('memory-cache');

router.get('/', (req, res) => {
    res.render('./account/account');
})

router.post('/signin', (req, res) => {
    User.find({EMAIL: req.body.email}, (err, data) => {
        if (data == "" || data[0].PASSWD != req.body.passwd){
            res.render('account/account', {err: "Mật khẩu hoặc email không đúng, hãy thử lại"});
        }
        else{
            if(cache.get('currentAccount')) cache.del('currentAccount');
            cache.put('currentAccount', data[0]);
            console.log(cache.get('currentAccount'));
            // res.render('index', {currentAccount: cache.get('currentAccount')});
            res.redirect('/');
        }
    })
})

router.get('/logout', (req, res) => {
    cache.del('currentAccount');
    res.redirect('/')
})

module.exports = router;