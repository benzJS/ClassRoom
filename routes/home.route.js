var router = require('express').Router();
var cache = require('memory-cache');

router.get('', (req, res) => {
  if(cache.get('currentAccount'))
    return res.render('index', {currentAccount: cache.get('currentAccount')});
  res.render('index')
})
router.get('/insertEv', (req, res) => {
  res.render('index');
})

module.exports = router;

