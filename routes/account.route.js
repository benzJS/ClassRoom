var router = require('express').Router();
var User = require('../models/user');

router.get('/', (req, res) => {
    res.render('./account/account');
})

router.post('/signin', (req, res) => {
    User.find({email: req.body.email}, (err, data) => {
        console.log(data[0].mk, req.body.passwd);
        if (data == "" || data[0].mk != req.body.passwd){
            res.render('account/account', {err: "Mật khẩu hoặc email không đúng, hãy thử lại"})
            return;
        }
        else{
            
        }
    })
})


module.exports = router;