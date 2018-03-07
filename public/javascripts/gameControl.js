//This script mainly define the logic of the whole game.
//var globalWorkerID;
var globalSequence;
var globalImageURLobj;
var globalWorkerObj = new Object();
var globalVigilance = new Object();


$(document).ready(function() {

	var imageInfoArr = {};

	$(".submitworkID-button").click(function(){
		//====================test
		//updateUser("5","1,2;3,4;5,8;",1);
		checkUserExist();
	});

	

});


//if user exist, back to start page
function enterStartpage(data){
	$(".header-instructions").text("Welcome back! You may try the practice again, or skip right on to the game.");
	$(".workID-box").remove();
	$(".demo-box").css({'display':'none'});
	$(".practice-box").css({'display':'none'});
	$(".visImage").css({'display':'none'});
	$(".game-box").css({'display':'block'});
	$(".practice-button").css({ 'display': 'block'});
	$(".block").css({ 'display': 'block'});
	$(".instructions").css({ 'display': 'block'});


	globalWorkerObj.WorkerID = data.WorkerID;
	globalWorkerObj.finishLevel = data.finishLevel;
	globalWorkerObj.isBlocked = data.isBlocked;
	globalWorkerObj.practiceTimes = data.practiceTimes;
	globalWorkerObj.warningTimes = data.warningTimes;
	globalWorkerObj.passPractice = data.passPractice;

	//register the click event
	$('#start-practice').unbind('click').click(function() {});
	$("#start-practice").click(function(){
		globalWorkerObj.isPracticeMode = 1;
		startGame();
	});
	$('#skip-practice').unbind('click').click(function() {});
	$("#skip-practice").click(function(){
		if(parseInt(globalWorkerObj.passPractice) == 0){		
			$('#practiceNotification').css({'display':'block'});
		}
		else{
			globalWorkerObj.isPracticeMode = 0;
			startGame();
		}		
	});
}

//if user doesn't exist, go to a new page
function enterInvestpage(workerID){
	$(".header-instructions").text("Please fill your basic information below");
	$(".workID-box").remove();
	$(".demo-box").css({'display':'block'});
	//globalWorkerID = workerID;
	$("#demoSubmit").click(function(){
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
	$('.header-instructions').text("Press the 'Space' key any time you see image you see before");
	$('.progress-bar').css({ 'display': 'block' });
	
}

//start realExperiment
function startGame(){
	//load interface
	$(".game-box").css({ 'display': 'none' });
	$(".practice-button").css({ 'display': 'none' });
	$(".block").css({ 'display': 'none' });
	$(".instructions").css({ 'display': 'none' });
	$(".visImage").css({'display':'none'});
	$('#practiceNotification').css({'display':'none'});

	$(".loading").css({'display':'block'});
	$(".game-name").css({'display':'none'});
	$('.header-instructions').text("Press the 'Space' key any time you see image you see before");
	$('.progress-bar').css({ 'display': 'block' });

	//check user's status, level
	var level = globalWorkerObj.finishLevel;
	//obtain the image sequence
	globalSequence = generateGamesquence();

	//get url from database and begin the game
	getImageUrl(globalSequence[globalWorkerObj.finishLevel]);

}


//show Feedback page
function levelSummary(){
	//show summary dataset

	$(".game-box").css({ 'display': 'none' });
	$(".summary-box").css({'display':'block'});
	var performance = computeData(parseInt(globalWorkerObj.finishLevel) - 1,globalSequence[0].length);
	//console.log(performance);
	$("#hit-p").text("The number of visualization was recognized when shown for the second time: " 
		+ performance.hitCount + " / " + performance.totalRepeat);
	$("#miss-p").text("The number of visualization was not recognized (missed) when shown for the second time: " 
		+ performance.missCount + " / " + performance.totalRepeat);
	$("#fa-p").text("The number of visualization was mistakenly recognized when shown for the first time: " 
		+ performance.faCount + " / " + performance.totalNonRepeat);
	$("#cr-p").text("The number of visualization was shown for the first time and not mistakenly recognized: " 
		+ performance.crCount + " / " + performance.totalNonRepeat);
 	$("#levelcode").text(globalWorkerObj.code);
	jumpNextLevel();
	
}

//jump to next level
function jumpNextLevel(){

	//if level < 17
	if(parseInt(globalWorkerObj.finishLevel) < 17){
		//go to other level
		$("#nextlevel-button").css({'display':'block'});
		//unbinding first!
		$('#nextlevel-button').unbind('click').click(function() {});
		$("#nextlevel-button").click(function(){
			//get url from database and begin the game
			getImageUrl(globalSequence[globalWorkerObj.finishLevel]);	
		});
	}

	//block user, will not use database, just use finishLevel is ok
	if(globalWorkerObj.finishLevel == 17){
		console.log("byebye");
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
		$('#practice-text').text("Congratulations! you passed the practice test, click the button to go back main page");
		$("#repractice-button").text("Go game");
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
		console.log("practice fail");
		$("#repractice-button").css({'display':'block'});
		$('#repractice-button').unbind('click').click(function() {});
		$("#repractice-button").click(function(){
			//re-practice
			startGame();
		});
	}
	else{
		//if user passed the practice before and failed
		$('#practice-text').text("Oops! you almostly pass our test, would you like to redo the practice or begin the game?");
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
		$(".game-box").css({ 'display': 'none' });
		$(".block-box").css({'display':'block'});
		$("#generateCode-button").css({'display':'block'});
		$('.feedbackImage').attr("src",'');
		$('.visImage').attr("src",'');
		$("#block-text").text("sorry, you have been warning for bad performance three times, you will be blocked from our experiment, click the button below to generate your reward code, thanks for you participation!");
	}
	//isBlock at the beginning
	else if(blockParam == 2){
		$(".game-box").css({ 'display': 'none' });
		$(".block-box").css({'display':'block'});
		$("#generateCode-button").css({'display':'none'});
		$('.feedbackImage').attr("src",'');
		$('.visImage').attr("src",'');
		$("#block-text").text("sorry, you have been blocked");
	}
	else if(blockParam == 3){
		$(".game-box").css({ 'display': 'none' });
		$(".block-box").css({'display':'block'});
		$("#generateCode-button").css({'display':'none'});
		$('.feedbackImage').attr("src",'');
		$('.visImage').attr("src",'');
		$("#block-text").text("sorry, you failed in our practice three times, you have been blocked by our system");
	}
	else{

	}
}

















































