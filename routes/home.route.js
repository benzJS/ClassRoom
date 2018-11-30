var router = require('express').Router();
var cache = require('memory-cache');
var Event = require('../models/event')

router.get('', (req, res) => {
  if(cache.get('currentAccount'))
  {
    Event.find({}, (err, allEvents) => {
      res.render('index', {currentAccount: cache.get('currentAccount'), events: allEvents});
    })
  }
  else{
    res.render('index')
  }
})
router.get('/insertEv', (req, res) => {
  res.render('index');
})

module.exports = router;

