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

	//register the click event
	$("#start-practice").click(function(){
		startPractice();
	});
	$("#skip-practice").click(function(){
		startGame();
	});

});


//if user exist, back to start page
function enterStartpage(data){
	$(".header-instructions").text("Welcome back! You may try the practice again, or skip right on to the game.");
	$(".workID-box").remove();
	$(".demo-box").css({'display':'none'});
	$(".game-box").css({'display':'block'});

	globalWorkerObj.WorkerID = data.WorkID;
	globalWorkerObj.finishLevel = data.finishLevel;
	globalWorkerObj.isBlocked = data.isBlocked;
	globalWorkerObj.practiceTimes = data.practiceTimes;
	globalWorkerObj.warningTimes = data.warningTimes;
	//globalWorkerID = data.WorkID;

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

//start Practice
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

	//generate image sequence

	
}

//start realExperiment
function startGame(){
	//load interface
	$(".game-box").css({ 'display': 'none' });
	$(".practice-button").css({ 'display': 'none' });
	$(".block").css({ 'display': 'none' });
	$(".instructions").css({ 'display': 'none' });
	$(".visImage").css({'display':'none'});

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
	console.log("levelSummary");
	//show summary dataset

	$(".game-box").css({ 'display': 'none' });
	$(".summary-box").css({'display':'block'});
	var performance = computeData(parseInt(globalWorkerObj.finishLevel) - 1);
	console.log(performance);
	$("#hit-p").text("The number of visualization was recognized when shown for the second time: " 
		+ performance.hitCount + " / " + performance.totalRepeat);
	$("#miss-p").text("The number of visualization was not recognized (missed) when shown for the second time: " 
		+ performance.missCount + " / " + performance.totalRepeat);
	$("#fa-p").text("The number of visualization was mistakenly recognized when shown for the first time: " 
		+ performance.faCount + " / " + performance.totalNonRepeat);
	$("#cr-p").text("The number of visualization was shown for the first time and not mistakenly recognized: " 
		+ performance.crCount + " / " + performance.totalNonRepeat);
 
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
			getImageUrl(globalSequence[globalWorkerObj.finishLevel]);	
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
}

















































