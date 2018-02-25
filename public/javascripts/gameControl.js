//This script mainly define the logic of the whole game.
var globalWorkerID;
var globalSequence;
var globalImageURLobj;


$(document).ready(function() {

	var imageInfoArr = {};

	$(".submitworkID-button").click(function(){
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
function enterStartpage(workerID){
	$(".header-instructions").text("Welcome back! You may try the practice again, or skip right on to the game.");
	$(".workID-box").remove();
	$(".game-box").css({'display':'block'});
	globalWorkerID = workerID;

}

//if user doesn't exist, go to a new page
function enterInvestpage(workerID){
	$(".header-instructions").text("Please fill your basic information below");
	$(".workID-box").remove();
	$(".demo-box").css({'display':'block'});
	globalWorkerID = workerID;
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
	var level = 1;
	//obtain the image sequence
	globalSequence = generateGamesquence();

	//get url from database and begin the game
	getImageUrl(globalSequence[0]);

}




































