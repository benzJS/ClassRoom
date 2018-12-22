var router = require('express').Router();
var cache = require('memory-cache');
var ThamGiaLop = require('../models/thamgialop');
var LopHoc = require('../models/lophoc');
var Event = require('../models/event');

router.get('/:ID_LOPHOC', (req, res) => {
    if(cache.get('currentAccount')){
        ThamGiaLop.find({ID_USERS: cache.get('currentAccount')._id}, (err, data) => {
            let currentClassIndex = data.findIndex((e) => { return e.ID_LOPHOC == req.params.ID_LOPHOC });
            if(currentClassIndex != -1){
                LopHoc.find({_id: req.params.ID_LOPHOC}, (err, currentClass) => {
                    Event.find({CLASS_ID: currentClass[0]._id}, (err, classEvents) => {
                        console.log(classEvents);
                        res.render('class', {currentClass: currentClass[0], currentAccount: cache.get('currentAccount'), FULLPERMISSION: data[currentClassIndex].FULLPERMISSION, events: classEvents});
                    })
                })
            }
        })
    }
})

module.exports = router;