var express = require('express');
var router = express.Router();

/*search images by imageid*/
router.post('/getImageUrl', function(req, res) {
    var db = req.db;
    var collection = db.get('imagedata');
    //var imageIDInt = parseInt(req.body.imageID);
    var b = req.body.imageID;
    var c = b.split(',');
    var searchCondition = {'imageID': {$in:c}};
    collection.find(searchCondition,{'type':0,'source':0,'isTarget':0,'category':0,'comments':0,'filename':0,'_id':0},function(err, result){
        res.send(
            (err === null) ? { msg: result } : { msg: err }
        );
    });
});


module.exports = router;