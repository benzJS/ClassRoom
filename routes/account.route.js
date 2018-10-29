var router = require('express').Router();


router.get('/', (req, res) => {
    res.render('./account/account');
})

router.get('/signin', (req, res) => {
    User.find({email: req.body.email}, (err, data) => {

    })
})


module.exports = router;