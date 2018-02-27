var test;
//show image
//got the url sequence
function buildUrlObj(imageURL){
	//create the imageURLobj
	var imageURLobj = {};
	for(var i = 0;i < imageURL.length;i++){
		imageURLobj[imageURL[i].imageID] = imageURL[i].url;
	}
	globalImageURLobj = imageURLobj;
	preLoadImage(imageURLobj);
}


//preload image
function preLoadImage(imageURLobj){

	var images = new Array();
	loadedimage = 0;

//==================================test 
	var imageCount = 10;
	//var imageCount = globalSequence[globalWorkerObj.finishLevel].length;

	function imageloadpost(){
		//control the progress bar
		var proportion = ((loadedimage/imageCount).toFixed(2) * 70).toFixed(0);
		$(".block-box").css({'display':'none'});
		$(".warning-box").css({'display':'none'});
		$(".summary-box").css({'display':'none'});
		$(".game-box").css({'display':'none'});
		$(".loading").css({'display':'block'});
		$('.shader').css({'width':proportion + "%"});
		loadedimage++;
		if(loadedimage == imageCount){
			$('.shader').css({'width':'70%'});
			//initialize the vigilance variable
			globalVigilance.nonRepeatIndex = new Array();
			globalVigilance.cursor = 0;
			getVigilance(globalWorkerObj.finishLevel);
			//go to ready to page()
			readyGame();
		}
	}

	//==================================test 
	//for(var i = 0;i < globalSequence[globalWorkerObj.finishLevel].length;i++){
	for(var i = 0;i < 10;i++){
		var imageID = 'I' + globalSequence[globalWorkerObj.finishLevel][i][0];
		images[i] = new Image()
		images[i].src = imageURLobj[imageID];
		images[i].onload = function(){
			imageloadpost();
		}
		images[i].onerror = function(){
			console.log(i);
			console.log(i,globalSequence[globalWorkerObj.finishLevel][i][0]);
			imageloadpost();
		}
	}


}

//before game
function readyGame(){

	$(".loading").css({'display':'none'});
	$(".game-box").css({'display':'block'});
	$(".imageContainer").css({'display':'none'});
	$(".before-instructions").css({'display':'block'});
	$("#begingame-button").css({ 'display': 'block' });
	//register click event to show image
	//be careful, don't bind event for two times!
	$('#begingame-button').unbind('click').click(function() {});
	$("#begingame-button").click(function(){
		imageShow();
	})
}



function imageShow(){

	//vis107
	//vis881  //extreme image test picture

	$(".before-instructions").css({'display':'none'});
	$("#begingame-button").css({ 'display': 'none' });
	$(".imageContainer").css({'display':'block'});
	$('.shader').css({'width':'0%'});    //reset the progress bar
	
	//param set-up
	var showTime = 1000;
	var pauseTime = 1400;
	var index = 0;
	var showFeedThread;  //the showFeed time function
	var isKeydown = 0;  //if user press the key, then change to 1;
	var isWarning = 0;  //if user failed in vigilance task, then change to 1;
	//==================================test 
	var imageCount = 10;
	//var imageCount = globalSequence[globalWorkerObj.finishLevel].length;

	//vigilance param set-up
	//globalVigilance.vigilanceIndex = new Array();
	//globalVigilance.hitCount = 0;
	
	//globalVigilance.faCount = 0;

	//show images
	var _showImage = function() {

		
		
		if(index == imageCount - 1){
			//stop show images
			clearInterval(showImageThread);	
		}
		isKeydown = 0;
		var imageID = 'I' + globalSequence[globalWorkerObj.finishLevel][index][0];
		var src  = globalImageURLobj[imageID];
		//console.log(index);
		index++;
		//register the keyboard event
		$(document).on("keydown",function(e){
			if(e.keyCode == '32'){
				//record repeat state
				isKeydown = 1;
				isWarning = recordRepeat(index - 1,globalWorkerObj.finishLevel);
				if(isWarning == 1){
					clearInterval(showImageThread);
					clearInterval(showFeedThread);
					//update practice times
					globalWorkerObj.warningTimes = parseInt(globalWorkerObj.warningTimes) + 1;
					updateUserWarning(globalWorkerObj.WorkerID,globalWorkerObj.warningTimes);
				}
			}
		})
		//change image
		$('.visImage').attr("src",src);
		$('.feedbackImage').attr("src",'/images/defult_feedback.png');
		$(".feedbackImage").css({'display':'none'});
		$(".visImage").css({'display':'block'});
		//change progress bar
		var proportion = ((index/imageCount).toFixed(2) * 70).toFixed(0);
		$('.shader').css({'width':proportion + "%"});
	}

	//show feedback
	var _showFeedback = function(){	
		//abandon keyboard event.
		$(document).off("keydown");
		//record non-repeat state
		if(isKeydown == 0){
			isWarning = recordState(index - 1,globalWorkerObj.finishLevel);
			if(isWarning == 1){
				clearInterval(showFeedThread);
				clearInterval(showImageThread);
				//update practice times
				globalWorkerObj.warningTimes = parseInt(globalWorkerObj.warningTimes) + 1;
				updateUserWarning(globalWorkerObj.WorkerID,globalWorkerObj.warningTimes);
			}
		}	
		//change to feedback image
		$(".visImage").css({'display':'none'});
		$(".feedbackImage").css({'display':'block'});
		if(index == imageCount){
			$('.feedbackImage').attr("src",'');  //delete the visImage
			//update user log
			var userlog = "";
			for(var i = 0;i < globalSequence[globalWorkerObj.finishLevel].length; i++){
				userlog = userlog + globalSequence[globalWorkerObj.finishLevel][i][0] + ',' + globalSequence[globalWorkerObj.finishLevel][i][3] + ';';
			}
			updateUser(globalWorkerObj.WorkerID,userlog,globalWorkerObj.finishLevel);
			//stop show feedback
			clearInterval(showFeedThread);
		}	
	}

	//show add1s
	var _add1s = function(){
		showFeedThread = setInterval(_showFeedback,showTime+pauseTime);
	}
	
	var showImageThread = setInterval(_showImage, showTime+pauseTime);
	setTimeout(_add1s, showTime);

}

//state: 1: filler hits, 2: filler miss 3. filler false alarm 4. filler correct rejection
//state: 5: target hits, 6: target miss 7. target false alarm 8. target correct rejection
//record the user repeat action
function recordRepeat(index,level){

	var isWarning = 0;
	
	//if participant see this image for first time
	if(globalSequence[level][index][1] == 0){
		$('.feedbackImage').attr("src",'/images/false.png');		
		//whether this image is a target image
		if(globalSequence[level][index][2] == 0){
			//filler false alarm
			globalSequence[level][index][3] = 3;
		}
		else{
			//target false alarm
			globalSequence[level][index][3] = 7;
		}
		//check vigilance
		globalVigilance.cursor++;
		if(globalVigilance.cursor >= 5){
			isWarning = checkWarning(globalVigilance.cursor,globalWorkerObj.finishLevel);
		}
	}
	else{
		$('.feedbackImage').attr("src",'/images/correct.png');
		//if participant see this image for second time
		if(globalSequence[level][index][2] == 0){
			//filler hits
			globalSequence[level][index][3] = 1;
		}
		else{
			//target hits
			globalSequence[level][index][3] = 5;
		}
	}

	return isWarning;
}

//record the user other state
function recordState(index,level){

	var isWarning = 0;
	
	//if participant see this image for first time
	if(globalSequence[level][index][1] == 0){
		//whether this image is a target image
		if(globalSequence[level][index][2] == 0){
			//filler correct rejection
			globalSequence[level][index][3] = 4;
		}
		else{
			//target correct rejection
			globalSequence[level][index][3] = 8;
		}
		//check vigilance
		globalVigilance.cursor++;
		if(globalVigilance.cursor >= 5){
			isWarning = checkWarning(globalVigilance.cursor,globalWorkerObj.finishLevel);
		}
	}
	else{
		//if participant see this image for second time
		if(globalSequence[level][index][2] == 0){
			//filler miss
			globalSequence[level][index][3] = 2;
		}
		else{
			//target miss
			globalSequence[level][index][3] = 6;
		}
	}

	return isWarning;
}

function getVigilance(level){
	//list all repeat fillers
	for(var i = 0; i < globalSequence[level].length; i++){
		//vigilance task: filler repeat
		// if(globalSequence[level][i][1] == 1 && globalSequence[level][i][2] == 0){
		// 	globalVigilance.vigilanceIndex.push(globalSequence[level][i][0]);
		// }
		if(globalSequence[level][i][1] == 0){
			globalVigilance.nonRepeatIndex.push(i);
		}
	}
}


function checkWarning(cursor,level){

	var isWarning = 0;

	var start = cursor - 5;
	var faCount = 0;
	for(var i = start; i < cursor; i++){
		var imageID = globalVigilance.nonRepeatIndex[i];
		if(globalSequence[level][imageID][3] == 3 || globalSequence[level][imageID][3] == 7){
			faCount++;
		}
	}
	if((faCount / 5).toFixed(2) > 0.5){
		//showWarning();
		isWarning = 1;
	}
	return isWarning;
}




















