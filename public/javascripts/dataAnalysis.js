//used to take data analysis
function computeData(level){
	
	var performance = new Object();
	var hitCount = 0; //hit count
	var missCount = 0;   //miss count
	var faCount = 0;  //false alarm count 
	var crCount = 0;  //correct rejection count
	var totalRepeat = 0;
	var totalNonRepeat = 0;
	//count performance data.
	for(var i = 0; i < globalSequence[0].length; i++){
		if(globalSequence[level][i][1] == 0){
			totalNonRepeat++;
			if(globalSequence[level][i][3] == 4 || globalSequence[level][i][3] == 8){
				crCount++;
			}
			if(globalSequence[level][i][3] == 3 || globalSequence[level][i][3] == 7){
				faCount++;
			}
		}
		else{
			totalRepeat++;
			if(globalSequence[level][i][3] == 2 || globalSequence[level][i][3] == 6){
				missCount++;
			}
			if(globalSequence[level][i][3] == 1 || globalSequence[level][i][3] == 5){
				hitCount++;
			}
		}
	}

	performance.hitCount = hitCount;
	performance.missCount = missCount;
	performance.faCount = faCount;
	performance.crCount = crCount;
	performance.totalRepeat = totalRepeat;
	performance.totalNonRepeat = totalNonRepeat;

	return performance;
}