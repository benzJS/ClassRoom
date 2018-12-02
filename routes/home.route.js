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
    });
  }
  else{
    res.render('index');
  }
})
// router.get('/c/:ID_LOPHOC', (req, res) => {
//   if(cache.get('currentAccount')){
//     LopHoc.find({_id: req.params.ID_LOPHOC}, (err, currentClass) => {
//       ThamGiaLop.find({ID_USER: cache.get('currentAccount')._id}, (err, data) => {
//         console.log(data[0].FULLPERMISSION);
//         res.render('class', {currentClass: currentClass[0], currentAccount: cache.get('currentAccount'), FULLPERMISSION: data[0].FULLPERMISSION});
//       });
//     });
//   }
// });

router.get('/c/:ID_LOPHOC', (req, res) => {
  if(cache.get('currentAccount')){
    ThamGiaLop.find({ID_USERS: cache.get('currentAccount')._id}, (err, data) => {
      console.log(data);
      let currentClassIndex = data.findIndex((e) => { return e.ID_LOPHOC == req.params.ID_LOPHOC }); console.log(currentClassIndex);
      if( currentClassIndex != -1){
        LopHoc.find({_id: req.params.ID_LOPHOC}, (err, currentClass) => {
          console.log(data[currentClassIndex].FULLPERMISSION);
          res.render('class', {currentClass: currentClass[0], currentAccount: cache.get('currentAccount'), FULLPERMISSION: data[currentClassIndex].FULLPERMISSION});
        })
      }
    })
  }
});

module.exports = router;

