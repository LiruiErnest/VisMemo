/*used to operate user collection*/

//check if the worker is exist in database
function checkUserExist(){
 
	//var testdata = {'WorkID':"{'$in':['A1FJI3JI434J43','A23DFFEFERE']}"};
	//var testdata = {'WorkID':'A1FJI3JI434J43'};

    var workerID = $('.workID-input').val();
    //var workerID = {'WorkID':"{'$in':['A1FJI3JI434J43','222']}"};

    if(workerID != ''){

        workerIDJSON = {'WorkerID':workerID};

        $.ajax({
        type:"POST",
        data:workerIDJSON,
        url:'users/checkworker',
        dataType: 'JSON',
        success:function(data){
            if(data.msg.length != 0){
                //console.log(data);
                //if the user has been blocked
                if(parseInt(data.msg[0].isBlocked) == 1){
                    //if finished all levels:
                    if(parseInt(data.msg[0].finishLevel) == 17){
                        showBlock(4);
                    }
                    else if(parseInt(data.msg[0].warningTimes) == 3){
                        showBlock(1);
                    }
                    else if(parseInt(data.msg[0].practiceTimes) == 3){
                        showBlock(3);
                    }
                    else{
                        showBlock(2);
                    }                  
                }
                else{
                    //go to main page
                    enterStartpage(data.msg[0]);
                }            
            }
            else{
                //go to information collection page
                enterConsentPage(workerID);
                //enterInvestpage(workerID);
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



//insert a worker record to database
function insertUser(workerID){
    
    //console.log(workerID);

    var errorCount = 0;
    if(($('#genderSelect').val() != '') && $('input[name=visualRate]').is(':checked') != false){

        var newWorker = {
            'Age': $('#age-text').val(),
            'Country': $('#country2').val(),
            'Gender': $('#genderSelect').val(),
            'proficiency':$('input[name=visualRate]:checked').val(),
            'WorkerID':workerID,
            'code':{'L0':'','L1':'','L2':'','L3':'','L4':'','L5':'','L6':'','L7':'','L8':'','L9':'','L10':''
        ,'L11':'','L12':'','L13':'','L14':'','L15':'','L16':''},
            'finishLevel':0,
            'isBlocked':0,
            'passPractice':0,
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
            dataObj.WorkerID = workerID;
            dataObj.finishLevel = 0;
            dataObj.isBlocked = 0;
            dataObj.practiceTimes = 0;
            dataObj.warningTimes = 0;
            dataObj.passPractice = 0;
            enterStartpage(dataObj);
        },
        error:function(data){
            //console.log(data);
        }
        });
        $('#demowarning').css({'display':'none'});

    }
    else if(parseInt($('#age-text').val()) < 18){
        $('#demowarning').text("You must older than 18 years old to participate our experiment!");
        $('#demowarning').css({'display':'block'});
    }
    else{
        $('#demowarning').css({'display':'block'});
    }
}

//update a worker's record
function updateUser(workerID,labResult,level){
    //{$set:{labLevel:labResult}}
    var dataJson = {
            'labResult': labResult,
            'level':level,
            'WorkerID':workerID,
        }
    //console.log(dataJson);
    $.ajax({
        type:"PUT",
        data:dataJson,
        url:'users/updateworkerlab',
        dataType: 'JSON',
        success:function(data){
            //console.log(data);
            var codelevel = "code[L" + globalWorkerObj.finishLevel + "]";
            globalWorkerObj.code = data.msg[codelevel];
            globalWorkerObj.finishLevel = parseInt(globalWorkerObj.finishLevel) + 1;
            //enter feedback page and ready to next level
            levelSummary();
        },
        error:function(data){
            
        }
    }); 
}

//update a worker's practiceStatus
function updateUserPractice(workerID,practiceTimes,passPractice){
    var dataJson = {
        'WorkerID':workerID,
        'practiceTimes':practiceTimes,
        'passPractice':passPractice
    }
    //console.log(dataJson);
    $.ajax({
        type:"PUT",
        data:dataJson,
        url:'users/updateworkerpractice',
        dataType: 'JSON',
        success:function(data){
            //console.log(data);
            if(parseInt(globalWorkerObj.passPractice) == 1){
                //pass
                showPractice(1);
            }
            else{
                if(parseInt(globalWorkerObj.practiceTimes) < 3){
                    //show practice fail and let use do again
                    showPractice(2);
                }
                else{
                    //block user
                    showBlock(3);
                }
            }
            
        },
        error:function(data){
            
        }
    }); 
}


//update a worker's warningTimes
function updateUserWarning(workerID,warningTimes){
    var dataJson = {
        'warningTimes': warningTimes,
        'WorkerID':workerID,
    }
    //console.log(dataJson);
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















