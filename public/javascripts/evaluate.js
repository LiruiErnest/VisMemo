//get the wrong image
function getTargetImage() {
    var repTarget = {};
    var currentLevel = globalWorkerObj.finishLevel - 1;
    var repTargetHIT = new Array();
    var repTargetMISS = new Array();
    for (var i = 0; i < 120; i++) {
        if (globalSequence[currentLevel][i][1] == 1 && globalSequence[currentLevel][i][2]) {
            if (globalSequence[currentLevel][i][3] == 5) {
                repTargetHIT.push(globalSequence[currentLevel][i][0]);
            } else if (globalSequence[currentLevel][i][3] == 6) {
                repTargetMISS.push(globalSequence[currentLevel][i][0]);
            }
        }
    }
    repTarget.repTargetHIT = repTargetHIT;
    repTarget.repTargetMISS = repTargetMISS;
    return repTarget;
}

function showEvaluation() {
    $(".header-instructions").css({
        'display': 'block'
    });
    $(".header-instructions-game").css({
        'display': 'none'
    });
    $('.header-instructions').text("Evaluation: Please look at the image on the left and answer the questions using range slider");
    $(".game-box").css({
        'display': 'none'
    });
    $(".evaluate-box").css({
        'display': 'block'
    });
    $('.progress-bar').css(
    {
    	'display':'none'
    })
    var repTarget = getTargetImage();
    
    for (var i = 0; i < repTarget.repTargetHIT.length; i++) {
        globalRepeatSequence.push(repTarget.repTargetHIT[i]);
    }
    for (var i = 0; i < repTarget.repTargetMISS.length; i++) {
        globalRepeatSequence.push(repTarget.repTargetMISS[i]);
    }
    //console.log(globalRepeatSequence);
    globalRepeatCount = globalRepeatSequence.length; //the length of all repeated target image
    globalRepeatIndex = 0;
    //change image
    imageID = 'I' + globalRepeatSequence[0];

    if(globalRepeatSequence.length != 0){
		var evatext = "Evaluation: Please look at the image on the left and answer the questions using range slider (";

		var progress = (globalRepeatIndex+1) + '/' + globalRepeatCount + ')'; 

		var text = evatext + progress;  

    	$('.header-instructions').text(text);
    	var src = globalImageURLobj[imageID];
    	$('.eva-img').attr("src", src);
    	//bind actions
    	$('#eva-next').unbind('click').click(function() {});
    	$("#eva-next").click(function() {

    		getSubResult();

    		updateSubComment(globalWorkerObj.WorkerID,globalSubResult);

        	//store data
        	//showNextEvaluation();
    	})
    }
    else{
    	levelSummary();
    }

    
}


//get current subjective result
function getSubResult(){
	var fa = $('#familiarity').val();
    var co = $('#colorful').val();
    var ha = $('#happy').val();
    var la = $('#layout').val();
    var int = $('#interesting').val();

    var currentImage = globalRepeatSequence[globalRepeatIndex];
    var currentResult = currentImage + ',' + fa + ',' + co + ',' + ha + ',' + la + ',' + int + ';'; 
    globalSubResult = globalSubResult + currentResult;

}

//show next evaluate image
function showNextEvaluation() {
    globalRepeatIndex++;
    if(globalRepeatIndex < globalRepeatCount) {
    	var evatext = "Evaluation: Please look at the image on the left and answer the questions using range slider (";

		var progress = (globalRepeatIndex+1) + '/' + globalRepeatCount + ')'; 

		var text = evatext + progress; 
		$('.header-instructions').text(text);
    	//reset slider
        resetOption();
        imageID = 'I' + globalRepeatSequence[globalRepeatIndex]
        //reset image
        var src = globalImageURLobj[imageID];
        $('.eva-img').attr("src", src);

    }
    else{
    	levelSummary();
    }
}
//check if user select subjective options
function checkSubject() {
	
    resetSlide(int);

}

function resetOption(){
	var fa = $('#familiarity');
    var co = $('#colorful');
    var ha = $('#happy');
    var la = $('#layout');
    var int = $('#interesting');
    resetSlide(fa);
    resetSlide(co);
    resetSlide(ha);
    resetSlide(la);
    resetSlide(int);
}

//initialize slider
function resetSlide(r) {
	r.val("1");
    r.css({
        'background-image': '-webkit-linear-gradient(left ,#16a085 0%,#16a085 ' + 0 + '%,#fff ' + 0 + '%, #fff 100%)'
    });
}














