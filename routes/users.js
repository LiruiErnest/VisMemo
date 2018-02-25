var express = require('express');
var router = express.Router();



/*search user by workid*/
router.post('/checkworker', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.find(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: result } : { msg: err }
        );
    });
});

//add a worker to database
router.post('/addworker', function(req, res) {
    var db = req.db;
    var collection = db.get('user');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: req.body } : { msg: err }
        );
    });
});


//update the labResult of a worker
router.put('/updateworkerlab',function(req,res){
    var db = req.db;
    var collection = db.get('user');
    
    var WorkID = req.body.WorkID;
    var level = req.body.level;
    var nextlevel = parseInt(level) + 1;
    var labLevel = "labResult"  + '[L' + level + ']';
    var labResult = req.body.labResult;

    // create the object literal
    var setArgs = {};
    setArgs[labLevel] = labResult;
    setArgs['finishLevel'] = nextlevel;
    var condition = {$set:setArgs};

    collection.findOneAndUpdate({'WorkID':WorkID},condition, function(err, result){
        res.send(
            (err === null) ? { msg: result} : { msg: err }
        );
    });
});

module.exports = router;
