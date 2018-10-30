var router = require('express').Router();
var User = require('../models/user');

router.get('/', (req, res) => {
    res.render('./account/account');
})

router.post('/signin', (req, res) => {
    User.find({email: req.body.email}, (err, data) => {
        if (data == "" || data.mk != req.body.passwd){
            var errs = ["Mật khẩu hoặc email không đúng, hãy thử lại"];
            res.render('./account/account', {errs: errs})
            return;
        }
    })
})


module.exports = router;