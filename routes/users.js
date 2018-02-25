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
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});


module.exports = router;
