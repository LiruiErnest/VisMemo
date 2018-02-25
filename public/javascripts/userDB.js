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
                enterStartpage(workerID);
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

//insert a worker record to database
function insertUser(workerID){
    
    console.log(workerID);

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
            'labResult':'',
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
            console.log(data);
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
function updateUser(workerID){

}












