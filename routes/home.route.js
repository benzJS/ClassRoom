var router = require('express').Router();


router.get('', (req, res) => {
  res.render('index');
})
router.get('/insertEv', (req, res) => {
  res.render('index');
})

module.exports = router;

