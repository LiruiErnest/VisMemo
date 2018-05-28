// used to generate the image sequence
function generateGamesquence(ispractice){

	//define experiment parameter
	var fillerCount = 207;
	var targetCount = 50;
	var levelCount = 1;
	var levelImageCount = 120;
	var totalImageCount = levelCount * levelImageCount;
	var fillerSpacingMin = 2;
	var fillerSpacingMax = 7;
	var targetSpacingMin = 55;
	var targetSpacingMax = 109;

	

	var imageInfoArr = new Array();

	//=========practice mode==========
	if(ispractice == 1){
		//generate non-repeating random number, the range is the number of all images
		var imageArr = getRandom(30,1,30);
		for(var i = 0; i < 1; i++){
			var levelArr = new Array();
			for(var j = 0; j < 30; j++){
				var imageInfo = new Array(imageArr[i * 30 + j],0,0,0);
				levelArr.push(imageInfo);
			}
			imageInfoArr.push(levelArr);
		}

		//setting up vigilance repeat image
		for(var i = 0; i < levelCount; i++){
			for(var j = 0; j < 30; j++){
				//if this image is a filler image
				if(imageInfoArr[i][j][0] < fillerCount - 1){
					var validRepeat = 0;
					var tryTimes = 0;
					while(validRepeat == 0){
						//var k = j + _.random(fillerSpacingMin,(fillerSpacingMax) > levelImageCount - j - 1 ? levelImageCount - j - 1 : fillerSpacingMax);
						var k = j + _.random(fillerSpacingMin,fillerSpacingMax);
						if(k > 30 - 1){
							k = 30 - 1;
						}

						if(imageInfoArr[i][k][2] == 1){
							//if it's an target image, try other random
							tryTimes++;
							//if try for max times, stop try.
							if(tryTimes == fillerSpacingMax - fillerSpacingMin){
								validRepeat = 1;
							} 
						}
						else{
							//var space = k - j;
							//console.log(space);
							imageInfoArr[i][k][0] = imageInfoArr[i][j][0];   //repeat image
							imageInfoArr[i][k][1] = 1;   //update isRepeat parameter
							validRepeat = 1;     //break the loop
							j = k; //jump to next j
						}
					}
				}
				if(j == 30 - fillerSpacingMin){
					j = 30;  //break the loop
				}
			}
		}

		//console.log(imageInfoArr);

		return imageInfoArr;


	}

	//generate non-repeating random number, the range is the number of all images
	var imageArr = getRandom(totalImageCount,1,fillerCount + targetCount);

	//generate 17*120 image information array
	for(var i = 0; i < levelCount; i++){
		var levelArr = new Array();
		for(var j = 0; j < levelImageCount; j++){
			var imageInfo = new Array(imageArr[i * levelImageCount + j],0,0,0);
			levelArr.push(imageInfo);
		}
		imageInfoArr.push(levelArr);
	}
	//console.log(imageInfoArr);

	//search target of each level，generate repeat
	for(var i = 0; i < levelCount; i++){
		//target number 
		for(var j = 0; j < levelImageCount; j++){
			//this image is an target image
			if(imageInfoArr[i][j][0] >= fillerCount - 1){				
				imageInfoArr[i][j][2] = 1;
				//if this target image can be repeat
				if(j <= levelImageCount - targetSpacingMin - 1){
					var k = j + _.random(targetSpacingMin, 
					(levelImageCount - j - 1)> targetSpacingMax ? targetSpacingMax : levelImageCount - j - 1);  //still to be debate
					//var space = k - j;
					//console.log(space);
					imageInfoArr[i][k][0] = imageInfoArr[i][j][0];  //repeat image
					imageInfoArr[i][k][1] = 1;
					imageInfoArr[i][k][2] = 1;
				}
			}
		}
	}

	//setting up vigilance repeat image
	for(var i = 0; i < levelCount; i++){
		for(var j = 0; j < levelImageCount; j++){
			//if this image is a filler image
			if(imageInfoArr[i][j][0] < fillerCount - 1){
				var validRepeat = 0;
				var tryTimes = 0;
				while(validRepeat == 0){
					//var k = j + _.random(fillerSpacingMin,(fillerSpacingMax) > levelImageCount - j - 1 ? levelImageCount - j - 1 : fillerSpacingMax);
					var k = j + _.random(fillerSpacingMin,fillerSpacingMax);
					if(k > levelImageCount - 1){
						k = levelImageCount - 1;
					}

					if(imageInfoArr[i][k][2] == 1){
						//if it's an target image, try other random
						tryTimes++;
						//if try for max times, stop try.
						if(tryTimes == fillerSpacingMax - fillerSpacingMin){
							validRepeat = 1;
						} 
					}
					else{
						//var space = k - j;
						//console.log(space);
						imageInfoArr[i][k][0] = imageInfoArr[i][j][0];   //repeat image
						imageInfoArr[i][k][1] = 1;   //update isRepeat parameter
						validRepeat = 1;     //break the loop
						j = k; //jump to next j
					}
				}
			}
			if(j == levelImageCount - fillerSpacingMin){
				j = levelImageCount;  //break the loop
			}
		}
	}

	//console.log(imageInfoArr);

	return imageInfoArr;
}



//generate score ordered sequence
function generateScoreOrderSequence(){
	
}