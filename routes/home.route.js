var router = require('express').Router();
var cache = require('memory-cache');
var Event = require('../models/event');
var LopHoc = require('../models/lophoc');
var ThamGiaLop = require('../models/thamgialop');
var mongoose = require('mongoose');

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
router.get('/c/:ID_LOPHOC', (req, res) => {
  // console.log(req.params.ID_LOPHOC);
  if(cache.get('currentAccount')){
    LopHoc.find({_id: req.params.ID_LOPHOC}, (err, currentClass) => {
      ThamGiaLop.find({_id: currentClass._id}, (err, data) => {
        cache.put('currentClass', currentClass)
        res.render('class', {currentClass: currentClass, currentAccount: cache.get('currentAccount'), FULLPERMISSION: data.FULLPERMISSION});
      })
    })
  }
})

module.exports = router;

