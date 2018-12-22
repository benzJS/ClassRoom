var router = require('express').Router();
var cache = require('memory-cache');
var Event = require('../models/event');
var LopHoc = require('../models/lophoc');
var ThamGiaLop = require('../models/thamgialop');
var mongoose = require('mongoose');

// router.get('', (req, res) => {
//   let tmp = 5;
//   if(cache.get('currentAccount'))
//   {
//     console.log(cache.get('currentAccount')._id);
//     ThamGiaLop.find({ID_USERS: cache.get('currentAccount')._id}, (err, data) => {
//       console.log(data);
//       data.forEach(document => {
//         LopHoc.find({_id: document.ID_LOPHOC}, (err, classInfo) => {
//           console.log(classInfo[0]);
//           tmp = 6;
//           // console.log(tmp);
//         })
//       })
//       console.log(tmp);
//       res.render('index', {classes: tmp});
//     })
//   }
//   else{
//     res.render('index');
//   }
// })

router.get('', (req, res) => {
  if(cache.get('currentAccount')){
    ThamGiaLop.find({ID_USERS: cache.get('currentAccount')._id}, (err, data) => {
      LopHoc.find({_id: data[0].ID_LOPHOC}, (err, classData) => {
        res.render('index', {classes: classData, currentAccount: cache.get('currenAccount')});
      })
    })
  }
  else{
    res.render('index');
  }
})

router.get('/c/:ID_LOPHOC', (req, res) => {
  if(cache.get('currentAccount')){
    ThamGiaLop.find({ID_USERS: cache.get('currentAccount')._id}, (err, data) => {
      let currentClassIndex = data.findIndex((e) => { return e.ID_LOPHOC == req.params.ID_LOPHOC });
      if( currentClassIndex != -1){
        LopHoc.find({_id: req.params.ID_LOPHOC}, (err, currentClass) => {
          res.render('class', {currentClass: currentClass[0], currentAccount: cache.get('currentAccount'), FULLPERMISSION: data[currentClassIndex].FULLPERMISSION});
        })
      }
    })
  }
});

module.exports = router;

