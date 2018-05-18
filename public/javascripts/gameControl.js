//This script mainly define the logic of the whole game.
//var globalWorkerID;
var globalSequence;
var globalImageURLobj;
var globalWorkerObj = new Object();
var globalVigilance = new Object();


$(document).ready(function() {

	$('.submitworkID-button').unbind('click').click(function() {});
	$(".submitworkID-button").click(function(){
		//====================test
		//updateUser("5","1,2;3,4;5,8;",1);
		checkUserExist();
	});



});


//exit the game, ask user to re-login the game.
function returnToMain(){
	
	$(".header-instructions").text("");
	$('.workID-input').val('');
	$('.game-name').css({'display':'block'});
	$('.progress-bar').css({ 'display': 'none' });
	$('.summary-box').css({'display':'none'});
	$('.svg').remove();
	globalWorkerObj.WorkerID = null;
	globalWorkerObj.finishLevel = null;
	globalWorkerObj.isBlocked = null;
	globalWorkerObj.practiceTimes = 0;
	globalWorkerObj.warningTimes = null;
	globalWorkerObj.passPractice = null;
	globalWorkerObj.performance = null;

	$(".workID-box").css({'display':'block'});

	$('.submitworkID-button').unbind('click').click(function() {});
	$(".submitworkID-button").click(function(){
		checkUserExist();
	});
}

//if user exist, back to start page
function enterStartpage(data){
	
	$(".workID-box").css({'display':'none'});
	$(".demo-box").css({'display':'none'});
	$(".practice-box").css({'display':'none'});
	$(".visImage").css({'display':'none'});

	//$(".header-instructions").text("Instructions");
	$(".game-box").css({'display':'block'});
	$(".practice-button").css({ 'display': 'block'});
	$(".block").css({ 'display': 'block'});
	$(".instructions").css({ 'display': 'block'});
	$(".game-instructions").css({ 'display': 'block' });
	$(".game-instructions").text("Thanks for taking part in our online memory game. Please click the \"Practice\" button to begin.");

	globalWorkerObj.WorkerID = data.WorkerID;
	globalWorkerObj.finishLevel = data.finishLevel;
	globalWorkerObj.isBlocked = data.isBlocked;
	globalWorkerObj.practiceTimes = 0;
	globalWorkerObj.warningTimes = data.warningTimes;
	globalWorkerObj.passPractice = data.passPractice;
	globalWorkerObj.performance = data.performance;

	//test ==============
	// $(".game-box").css({'display':'none'});
	// $('.summary-box').css({'display':'block'});
	// plotScore();
	// plotReward();
	//testend ===============

	//register the click event
	if(parseInt(parseInt(globalWorkerObj.finishLevel)) > 0){
		$('.game-instructions').css({'text-align':'center'});
		$(".game-instructions").text("Welcome back! Please take the practice test to continue your game!");
	}

	$('#start-practice').unbind('click').click(function() {});
	$("#start-practice").click(function(){
		//test pass the practice
		globalWorkerObj.isPracticeMode = 0;
		//globalWorkerObj.isPracticeMode = 1;
		startGame();

	});
	// $('#skip-practice').unbind('click').click(function() {});
	// $("#skip-practice").click(function(){
	// 	if(parseInt(globalWorkerObj.passPractice) == 0){		
	// 		$('#practiceNotification').css({'display':'block'});
	// 	}
	// 	else{
	// 		globalWorkerObj.isPracticeMode = 0;
	// 		startGame();
	// 	}		
	// });
}

function enterConsentPage(workerID){
	$(".workID-box").remove();
	$(".consent-box").css({'display':'block'});
	$('#consentAgree-button').unbind('click').click(function() {});
	$("#consentAgree-button").click(function(){			
		enterInvestpage(workerID);
	});
	$('#consentDecline-button').unbind('click').click(function() {});
	$("#consentDecline-button").click(function(){
		$('#consentAgree-button').css({'display':'none'});
		$('#consentDecline-button').css({'display':'none'});
		$(".consent-form-box").css({'display':'none'});
		$('.consent-instructions').css({'top':'45%'})
		$('.consent-instructions').text("Thank you for your interest in our research. You can participate in our game in the future.")
	});
}

//if user doesn't exist, go to a new page
function enterInvestpage(workerID){
    populateCountries("country2");
	$(".workID-box").remove();
	$(".consent-box").remove();
	$(".demo-box").css({'display':'block'});
	$('#demoSubmit').unbind('click').click(function() {});
	$("#demoSubmit").click(function(){
		insertUser(workerID);
	})
	$('#demoSkip').unbind('click').click(function() {});
	$("#demoSkip").click(function(){
		insertUser(workerID);
	})
}

//start Practice, useless
function startPractice(){
	//load images
	$(".game-box").css({ 'display': 'none' });
	$(".practice-button").css({ 'display': 'none' });
	$(".block").css({ 'display': 'none' });
	$(".instructions").css({ 'display': 'none' });

	$(".loading").css({'display':'block'});
	$(".game-name").css({'display':'none'});
	//hide header
	$(".header-instructions").css({'display':'none'});
	$(".header-instructions-game").css({'display':'block'});
	$('.header-instructions-game').text("Press the 'Space' bar immediately after you see an image you saw before.");
	$('.progress-bar').css({ 'display': 'block' });
	
}

//start realExperiment
function startGame(){
	//load interface
	$(".game-box").css({ 'display': 'none' });
	$(".game-instructions").css({ 'display': 'none' });
	$(".practice-button").css({ 'display': 'none' });
	$(".block").css({ 'display': 'none' });
	$(".instructions").css({ 'display': 'none' });
	$(".visImage").css({'display':'none'});
	$('#practiceNotification').css({'display':'none'});

	$(".loading").css({'display':'block'});
	$(".game-name").css({'display':'none'});
	$(".header-instructions").css({'display':'block'});
	$(".header-instructions-game").css({'display':'none'});
	$('.header-instructions').text("Instruction");
	//$('.header-instructions').text("Press the 'Space' key any time you see image you saw before");
	$('.progress-bar').css({ 'display': 'block' });

	//check user's status, level
	var level = globalWorkerObj.finishLevel;
	//obtain the image sequence
	globalSequence = generateGamesquence();

	//get url from database and begin the game
	getImageUrl(globalSequence[globalWorkerObj.finishLevel]);

}

//count Time
function TimeCount() {
    flag = setTimeout('TimeCount()', 1000);  
    if (countTime == 1){
        TimeClose();
        returnToMain();
    }
    countTime--;
    var remainTime = secondToMinute(countTime);
    $('#summary-time').text("Rest time remaining: " + remainTime);
    //console.log(countTime);
}

function TimeClose() {
    //$('#MailNotify,#globalDiv').css('display', 'none');
    clearTimeout(flag);
    //returnToMain();
}

//show Feedback page
function levelSummary(){
	//show summary dataset
	$(".header-instructions").css({'display':'block'});
	$(".header-instructions-game").css({'display':'none'});
	$('.header-instructions').text("Summary");
	$(".game-box").css({ 'display': 'none' });
	$(".summary-box").css({'display':'block'});

	plotReward();
	plotScore();

	countTime = 300;
	TimeCount();

	

	$('#summary-nowlevel').text(parseInt(globalWorkerObj.finishLevel));

 	$("#levelcode").text(globalWorkerObj.code);

	jumpNextLevel();
	
}

//jump to next level
function jumpNextLevel(){

	$('#summary-exit-button').unbind('click').click(function() {});
	$("#summary-exit-button").click(function(){
		TimeClose();
		returnToMain();
	});
	//if level < 17
	if(parseInt(globalWorkerObj.finishLevel) < 17){
		//go to other level
		$("#nextlevel-button").css({'display':'block'});
		//unbinding first!
		$('#nextlevel-button').unbind('click').click(function() {});
		$("#nextlevel-button").click(function(){
			TimeClose();
			$('.svg').remove();
			//get url from database and begin the game
			getImageUrl(globalSequence[globalWorkerObj.finishLevel]);	
		});		
	}

	//block user, will not use database, just use finishLevel is ok
	if(globalWorkerObj.finishLevel == 17){
		$('#summary-rest-time').text("Congratulations! You have finished all levels of our game!");
		//showBlock(4);
		//console.log("byebye");
	}
}

//show warning page
function showWarning(){
	console.log("warning");
	$(".game-box").css({ 'display': 'none' });
	$(".warning-box").css({'display':'block'});
	$("#redolevel-button").css({'display':'none'});
	$('.feedbackImage').attr("src",'');
	$('.visImage').attr("src",'');
	if(parseInt(globalWorkerObj.warningTimes) < 3){
		$("#redolevel-button").css({'display':'block'});
		$('#redolevel-button').unbind('click').click(function() {});
		$("#redolevel-button").click(function(){
			//get url from database and begin the game
			//getImageUrl(globalSequence[globalWorkerObj.finishLevel]);	
			startGame();
		});
	}
}

//show practice page
function showPractice(practiceParam){	
	$(".game-box").css({ 'display': 'none' });
	$(".practice-box").css({'display':'block'});
	$("#repractice-button").css({'display':'none'});
	$('.feedbackImage').attr("src",'');
	$(".feedbackImage").css({'display':'none'});
	$('.visImage').attr("src",'');
	$(".visImage").css({'display':'none'});

	if(practiceParam == 1){
		//if user pass the practice test
		$('#practice-text').text("Congratulations! You passed the practice test. Please click the button below to enter the real game.");
		$("#repractice-button").text("Start");
		$("#repractice-button").css({'display':'block'});
		$('#repractice-button').unbind('click').click(function() {});
		$("#repractice-button").click(function(){
			//begin game
			globalWorkerObj.isPracticeMode = 0;
			startGame();
		});
	}
	else if(practiceParam == 2){
		//if user never passed the practice and failed
		//console.log("practice fail");
		var remainTimes = 3 - parseInt(globalWorkerObj.practiceTimes);
		$('#RemainPracticeTime').text(remainTimes);
		$("#repractice-button").css({'display':'block'});
		$('#repractice-button').unbind('click').click(function() {});
		$("#repractice-button").click(function(){
			//re-practice
			startGame();
		});
	}
	else{
		//if user passed the practice before and failed
		$('#practice-text').text("Sorry, you just failed in our practice test, please redo the practice test by clicking the 'redo' practice button.");
		$("#repractice-button").text("Practice again");
		$("#repractice-button").css({'display':'block'});
		$("#goback-button").css({'display':'block'});
		$('#repractice-button').unbind('click').click(function() {});
		$("#repractice-button").click(function(){
			//re-practice
			startGame();
		});
		$("#goback-button").unbind('click').click(function() {});
		$("#goback-button").click(function(){
			//begin game
			globalWorkerObj.isPracticeMode = 0;
			startGame();
		});
	}
}


//show block page
function showBlock(blockParam){
	console.log("block!")
	//warning fail
	if(blockParam == 1){
		$(".workID-box").css({ 'display': 'none' });
		$(".game-box").css({ 'display': 'none' });
		$(".block-box").css({'display':'block'});
		$('.feedbackImage').attr("src",'');
		$('.visImage').attr("src",'');
		$(".block-instructions").text("Sorry, according to our records, you have been warned by the system three times, we regret that we cannot allow you to continue to participate in our game.");
	}
	//isBlock at the beginning
	else if(blockParam == 2){
		$(".workID-box").css({ 'display': 'none' });
		$(".game-box").css({ 'display': 'none' });
		$(".block-box").css({'display':'block'});
		$('.feedbackImage').attr("src",'');
		$('.visImage').attr("src",'');
		$(".block-instructions").text("sorry, you have been blocked from our system!");
	}
	else if(blockParam == 3){
		$(".workID-box").css({ 'display': 'none' });
		$(".game-box").css({ 'display': 'none' });
		$(".block-box").css({'display':'block'});
		$('.feedbackImage').attr("src",'');
		$('.visImage').attr("src",'');
		$(".block-instructions").text("Sorry, according to our records, you have conducted our tests for three times and you didn’t pass. We regret that we cannot let you participate in our game.");
	}
	else if(blockParam == 4){
		$(".workID-box").css({ 'display': 'none' });
		$(".game-box").css({ 'display': 'none' });
		$(".block-box").css({'display':'block'});
		$('.feedbackImage').attr("src",'');
		$('.visImage').attr("src",'');
		$(".block-instructions").text("Dear participant, thank you for your participation, you have completed all the levels, hope to see you in our other games in the future!");
	}
	else{

	}
}



















































