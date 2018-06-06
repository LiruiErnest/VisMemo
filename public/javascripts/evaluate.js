//get the wrong image
// function getTargetImage() {
//     var repTarget = {};
//     var currentLevel = globalWorkerObj.finishLevel - 1;
//     var repTargetHIT = new Array();
//     var repTargetMISS = new Array();
//     for (var i = 0; i < 120; i++) {
//         if (globalSequence[currentLevel][i][1] == 1 && globalSequence[currentLevel][i][2]) {
//             if (globalSequence[currentLevel][i][3] == 5) {
//                 repTargetHIT.push(globalSequence[currentLevel][i][0]);
//             } else if (globalSequence[currentLevel][i][3] == 6) {
//                 repTargetMISS.push(globalSequence[currentLevel][i][0]);
//             }
//         }
//     }
//     repTarget.repTargetHIT = repTargetHIT;
//     repTarget.repTargetMISS = repTargetMISS;
//     return repTarget;
// }


function getTagImage(){
    var getTagImage = [];
    for(var i = 915; i <= 934; i++){
        getTagImage.push(i);
    }
    evaluateSequence =  getTagImage;
    //get Url
    getImageUrl(evaluateSequence);
}


function showEvaluation(data) {
    evaluateUrl = data;
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

    //console.log(globalRepeatSequence);
    evaluateCount = evaluateSequence.length; //the length of all repeated target image
    evaluateIndex = 0;
    //change image
    imageID = 'I' + evaluateSequence[0];

    var evatext = "Evaluation: Please look at the image on the left and answer the questions using range slider (";
    var progress = (evaluateIndex+1) + '/' + evaluateCount + ')'; 
    var text = evatext + progress;  
    $('.header-instructions').text(text);

    var src = evaluateUrl[evaluateIndex].url;
    $('.eva-img').attr("src", src);
    // //bind actions
    $('#eva-next').unbind('click').click(function() {});
    $("#eva-next").click(function() {

        getSubResult();

        updateSubComment(globalWorkerObj.WorkerID,globalSubResult);

        //store data
        // showNextEvaluation();
    })

    
}


//get current subjective result
function getSubResult(){
	var fa = $('#familiarity').val();
    var co = $('#style').val();
    var ha = $('#happy').val();
    var la = $('#layout').val();
    var int = $('#interesting').val();

    var currentImage = evaluateSequence[evaluateIndex];
    var currentResult = currentImage + ',' + fa + ',' + co + ',' + ha + ',' + la + ',' + int + ';'; 
    globalSubResult = globalSubResult + currentResult;

}

//show next evaluate image
function showNextEvaluation() {
    evaluateIndex++;
    if(evaluateIndex < evaluateCount) {
    	var evatext = "Evaluation: Please look at the image on the left and answer the questions using range slider (";
		var progress = (evaluateIndex+1) + '/' + evaluateCount + ')'; 
		var text = evatext + progress; 
		$('.header-instructions').text(text);

    	//reset slider
        resetOption();
        imageID = 'I' + evaluateSequence[evaluateIndex];
        //reset image
        var src = evaluateUrl[evaluateIndex].url;
        $('.eva-img').attr("src", src);

    }
    else{
    	// levelSummary();
        updateUserBlock(globalWorkerObj.WorkerID);
    }
}


//showCode
function showCode(){
    $('.header-instructions').text("Thanks");
}

function resetOption(){
	var fa = $('#familiarity');
    var co = $('#style');
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














