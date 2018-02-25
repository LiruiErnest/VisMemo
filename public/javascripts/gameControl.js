//This script mainly define the logic of the whole game.
//var globalWorkerID;
var globalSequence;
var globalImageURLobj;
var globalWorkerObj = new Object();


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
	globalWorkerObj.warningTimes = 0;
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
function levelFeedback(){
	console.log("showfeedback");
	//show feedback dataset

	//if level < 17

	//go other level

	//block user
	
}




































