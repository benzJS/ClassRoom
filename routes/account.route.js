var router = require('express').Router();
var User = require('../models/user');
var cache = require('memory-cache');

router.get('/', (req, res) => {
    if(cache.get('currentAccount')){
        res.redirect('/');
    }
    else{
        if(cache.get('signInFailed')){
            return res.render('./account/account', {err: cache.get('signInFailed')})
        }
        return res.render('./account/account')
    }
})

router.post('/signin', (req, res) => {
    User.find({EMAIL: req.body.email}, (err, data) => {
        if (data == "" || data[0].PASSWD != req.body.passwd){
            cache.put('signInFailed', 'Username or password incorrect');
            res.redirect('/account');
        }
        else{
            if(cache.get('currentAccount')) cache.del('currentAccount');
            cache.put('currentAccount', data[0]);
            res.redirect('/');
        }
    })
})

router.get('/logout', (req, res) => {
    cache.del('currentAccount');
    res.redirect('/')
})

module.exports = router;