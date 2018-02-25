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
	//var imageCount = 5;
	var imageCount = globalSequence[globalWorkerObj.finishLevel].length;

	function imageloadpost(){
		//control the progress bar
		var proportion = ((loadedimage/imageCount).toFixed(2) * 70).toFixed(0);
		$('.shader').css({'width':proportion + "%"});
		loadedimage++;
		if(loadedimage == imageCount){
			$('.shader').css({'width':'70%'});
			//alert("all images have been loaded!");
			//go to ready to page()
			readyGame();
		}
	}

	//==================================test 
	for(var i = 0;i < globalSequence[globalWorkerObj.finishLevel].length;i++){
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
	$(".before-instructions").css({'display':'block'});
	$("#begingame-button").css({ 'display': 'block' });
	//register click event to show image
	$("#begingame-button").click(function(){
		imageShow();
	})
}



function imageShow(){

	//vis107
	//vis881  //纵横比测试图

	$(".before-instructions").css({'display':'none'});
	$("#begingame-button").css({ 'display': 'none' });
	$(".imageContainer").css({'display':'block'});
	
	var showTime = 1000;
	var pauseTime = 1400;
	var index = 0;
	var showFeedThread;
	//==================================test 
	//var imageCount = 5;
	var imageCount = globalSequence[globalWorkerObj.finishLevel].length;

	$('.shader').css({'width':'0%'});    //reset the progress bar

	


	//show images
	var _showImage = function() {
		
		if(index == imageCount - 1){
			//stop show images
			clearInterval(showImageThread);	
		}
		var imageID = 'I' + globalSequence[globalWorkerObj.finishLevel][index][0];
		var src  = globalImageURLobj[imageID];
		//console.log(index);
		index++;
		//register the keyboard event
		$(document).on("keydown",function(e){
			if(e.keyCode == '32'){
				//record repeat state
				recordRepeat(index - 1,globalWorkerObj.finishLevel);
			}
		})
		//change image
		$('.visImage').attr("src",src);
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
		recordState(index - 1,globalWorkerObj.finishLevel);
		//change to feedback image
		$(".visImage").css({'display':'none'});
		$(".feedbackImage").css({'display':'block'});
		if(index == imageCount){
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
	
	//if participant see this image for first time
	if(globalSequence[level][index][1] == 0){
		//whether this image is a target image
		if(globalSequence[level][index][2] == 0){
			//filler false alarm
			globalSequence[level][index][3] = 3;
		}
		else{
			//target false alarm
			globalSequence[level][index][3] = 7;
		}
	}
	else{
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
}

//record the user other state
function recordState(index,level){
	
	//if participant see this image for first time
	if(globalSequence[level][index][1] == 1){
		//whether this image is a target image
		if(globalSequence[level][index][2] == 0){
			//filler correct rejection
			globalSequence[level][index][3] = 4;
		}
		else{
			//target correct rejection
			globalSequence[level][index][3] = 8;
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
}





















