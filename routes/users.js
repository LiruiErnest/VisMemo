var express = require('express');
var router = express.Router();
var crypto = require('crypto');


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
    
    var WorkerID = req.body.WorkerID;
    var level = req.body.level;
    var nextlevel = parseInt(level) + 1;
    var labLevel = "labResult"  + '[L' + level + ']';
    var labResult = req.body.labResult;
    var performance = req.body.performance;

    // create the code
    var codeHash = crypto.createHash('md5');
    codeHash.update(WorkerID+level);
    var code = codeHash.digest('hex');
    var codeLevel = "code" + '[L' + level + ']';

    // create the object literal
    var setArgs = {};
    setArgs[labLevel] = labResult;
    setArgs[codeLevel] = code;
    setArgs['finishLevel'] = nextlevel;
    setArgs['performance'] = performance;

    if(parseInt(nextlevel) == 5){
        setArgs['isBlocked'] = 1;
    }

    var condition = {$set:setArgs};

    collection.findOneAndUpdate({'WorkerID':WorkerID},condition, function(err, result){
        res.send(
            (err === null) ? { msg: result} : { msg: err }
        );
    });
});

//update the Warning Times of a worker
router.put('/updateworkerwarning',function(req,res){
    var db = req.db;
    var collection = db.get('user');
    
    var WorkerID = req.body.WorkerID;
    var warningTimes = req.body.warningTimes;
    // create the object literal

    var setArgs = {};
    setArgs['warningTimes'] = warningTimes;

    if(parseInt(warningTimes) == 3){
        setArgs['isBlocked'] = 1;
    }
   
    var condition = {$set:setArgs};

    collection.findOneAndUpdate({'WorkerID':WorkerID},condition, function(err, result){
        res.send(
            (err === null) ? { msg: result} : { msg: err }
        );
    });
});

//update the state of user, and block user
router.put('/updateworkerblock',function(req,res){
    var db = req.db;
    var collection = db.get('user');
    
    var WorkerID = req.body.WorkerID;
    // create the object literal

    var setArgs = {};
    setArgs['isBlocked'] = 1;
    setArgs['finishLevel'] = 5;
   
    var condition = {$set:setArgs};

    collection.findOneAndUpdate({'WorkerID':WorkerID},condition, function(err, result){
        res.send(
            (err === null) ? { msg: result} : { msg: err }
        );
    });
});

//update the Practice Times of a worker
router.put('/updateworkerpractice',function(req,res){
    var db = req.db;
    var collection = db.get('user');
    
    var WorkerID = req.body.WorkerID;
    var practiceTimes = req.body.practiceTimes;
    var passPractice = req.body.passPractice;
    // create the object literal

    var setArgs = {};
    setArgs['practiceTimes'] = practiceTimes;

    if(parseInt(practiceTimes) == 3){
        setArgs['isBlocked'] = 1;
    }

    if(parseInt(passPractice) == 1){
        setArgs['passPractice'] = 1;
    }
   
    var condition = {$set:setArgs};

    collection.findOneAndUpdate({'WorkerID':WorkerID},condition, function(err, result){
        res.send(
            (err === null) ? { msg: result} : { msg: err }
        );
    });
});

//update the subResult of a worker
router.put('/updateworkersubresult',function(req,res){
    var db = req.db;
    var collection = db.get('user');
    
    var WorkerID = req.body.WorkerID;
    //var level = req.body.level;
    var subResult = req.body.subResult;
    // create the object literal

    var setArgs = {};
    //console.log(WorkerID,subResult);
    setArgs['subResult'] = subResult;
   
    var condition = {$set:setArgs};

    collection.find

    collection.findOneAndUpdate({'WorkerID':WorkerID},condition, function(err, result){
        res.send(
            (err === null) ? { msg: result} : { msg: err }
        );
    });
});


module.exports = router;
