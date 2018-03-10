// used to generate the image sequence
function generateGamesquence(){

	//define experiment parameter
	var fillerCount = 1658;
	var targetCount = 410;
	var levelCount = 17;
	var levelImageCount = 120;
	var totalImageCount = levelCount * levelImageCount;
	var fillerSpacingMin = 2;
	var fillerSpacingMax = 7;
	var targetSpacingMin = 92;
	var targetSpacingMax = 110;


	//generate non-repeating random number, the range is the number of all images
	var imageArr = getRandom(totalImageCount,0,fillerCount + targetCount - 1);

	//z	`1console.log(imageArr);

	//generate 17*120 image information array
	var imageInfoArr = new Array();
	for(var i = 0; i < levelCount; i++){
		var levelArr = new Array();
		for(var j = 0; j < levelImageCount; j++){
			var imageInfo = new Array(imageArr[i * levelImageCount + j],0,0,0);
			levelArr.push(imageInfo);
		}
		imageInfoArr.push(levelArr);
	}
	//console.log(imageInfoArr);

	//寻找每个level中的target，生成repeat
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

	

	//设立vigilance repeat image
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