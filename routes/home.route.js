var router = require('express').Router();
var cache = require('memory-cache');
var Event = require('../models/event');
var LopHoc = require('../models/lophoc');
var ThamGiaLop = require('../models/thamgialop');
var mongoose = require('mongoose');

router.get('/', (req, res) => {
  if(cache.get('currentAccount')){
    ThamGiaLop.find({ID_USERS: cache.get('currentAccount')._id}, (err, data) => {
      LopHoc.find({_id: data[0].ID_LOPHOC}, (err, classData) => {
        res.render('index', {classes: classData, currentAccount: cache.get('currentAccount')});
      })
    })
  }
  else{
    res.render('index');
  }
})

router.get('/game', (req, res) => {
  res.render('game');
})

module.exports = router;

