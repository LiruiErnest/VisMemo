/*used to operate user collection*/

//check if the worker is exist in database
function checkUserExist(){
 
	//var testdata = {'WorkID':"{'$in':['A1FJI3JI434J43','A23DFFEFERE']}"};
	//var testdata = {'WorkID':'A1FJI3JI434J43'};

    var workerID = $('.workID-input').val();
    //var workerID = {'WorkID':"{'$in':['A1FJI3JI434J43','222']}"};

    if(workerID != ''){

        workerIDJSON = {'WorkID':workerID};

        $.ajax({
        type:"POST",
        data:workerIDJSON,
        url:'users/checkworker',
        dataType: 'JSON',
        success:function(data){
            if(data.msg.length != 0){
                //go to main page
                enterStartpage(data.msg[0]);
                //console.log(data);
            }
            else{
                //go to information collection page
                enterInvestpage(workerID);
                //console.log(data);
            }
        },
        error:function(data){
            //console.log(data);
        }
    });
        $('#warningText').css({'display':'none'});
    }
    else{
        $('#warningText').css({'display':'block'});
    }
}

//find the user's level
function getUserLevel(workerID){



}

//check the user


//insert a worker record to database
function insertUser(workerID){
    
    //console.log(workerID);

    var errorCount = 0;
    if(($('#genderSelect').val() != '') && ($('#age-text').val() != '') && ($('#country-text').val() != '')){

        var newWorker = {
            'Age': $('#age-text').val(),
            'Country': $('#country-text').val(),
            'Gender': $('#genderSelect').val(),
            'WorkID':workerID,
            'code':'',
            'finishLevel':0,
            'isBlocked':0,
            'labResult':{'L0':'','L1':'','L2':'','L3':'','L4':'','L5':'','L6':'','L7':'','L8':'','L9':'','L10':''
        ,'L11':'','L12':'','L13':'','L14':'','L15':'','L16':''},
            'practiceTimes':0,
            'warningTimes':0
        }

        $.ajax({
        type:"POST",
        data:newWorker,
        url:'users/addworker',
        dataType: 'JSON',
        success:function(data){
            alert('register success!');
            var dataObj = new Object();
            dataObj.WorkID = workerID;
            dataObj.finishLevel = 0;
            dataObj.isBlocked = 0;
            dataObj.practiceTimes = 0;
            dataObj.warningTimes = 0;
            enterStartpage(dataObj);
        },
        error:function(data){
            console.log(data);
        }
        });
        $('#warningText2').css({'display':'none'});

    }
    else{
        $('#warningText2').css({'display':'block'});
    }
}

//update a worker's record
function updateUser(workerID,labResult,level){
    //{$set:{labLevel:labResult}}
    var dataJson = {
            'labResult': labResult,
            'level':level,
            'WorkID':workerID,
        }
    console.log(dataJson);
    $.ajax({
        type:"PUT",
        data:dataJson,
        url:'users/updateworkerlab',
        dataType: 'JSON',
        success:function(data){
            //console.log(data);
            globalWorkerObj.finishLevel = parseInt(globalWorkerObj.finishLevel) + 1;
            //enter feedback page and ready to next level
            levelSummary();
        },
        error:function(data){
            
        }
    }); 
}


//update a worder's practiceTimes
function updateUserWarning(workerID,warningTimes){
    var dataJson = {
        'warningTimes': warningTimes,
        'WorkID':workerID,
    }
    console.log(dataJson);
    $.ajax({
        type:"PUT",
        data:dataJson,
        url:'users/updateworkerwarning',
        dataType: 'JSON',
        success:function(data){
            if(parseInt(globalWorkerObj.warningTimes) < 3){
                showWarning();
            }
            else{
                showBlock(1);
            }
        },
        error:function(data){
            
        }
    }); 
}















