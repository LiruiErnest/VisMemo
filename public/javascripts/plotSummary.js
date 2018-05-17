//used to plot summary chart

//plot score data
function plotScore(){

	var width = 250;
	var height = 220;
	var level = new Array();
	for(var i = 0;i < 17;i++){
		level[i] = i+1;
	}

	var levelScale = d3.scalePoint()
		.domain(level)
		.range([0,width]);

	var scoreScale = d3.scaleLinear()
		.domain([0,1])
		.range([height,0]);

	var score = new Array();
	var historyScore = globalWorkerObj.performance.split(',');
	for(var i = 0; i < historyScore.length;i++){
		score[i] = parseFloat(historyScore[i]);
	}

	var lineGenerator = d3.line()
		.x(function(d,i){
			var index = i+1;
			return levelScale(index);
		})
		.y(function(d,i){
			return scoreScale(d);
		})

	var line = lineGenerator(score);

	var scoreSvg = d3.select('#level-chart').append("svg")
		.attr("class","svg")
		.attr("width",350)
		.attr("height",300);

	var xAxis = d3.axisBottom(levelScale)

	var yAxis = d3.axisLeft(scoreScale)
		.tickFormat(d3.format(".0%"));

	scoreSvg.append("g")
		.attr("transform", "translate(70,250)")
      	.call(xAxis)
      .append("text")
      .style("font-size","0.9rem")
      .attr("fill", "#000")
      .attr("x",240)
      .attr("y", 25)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Level");

    scoreSvg.append("g")
		.attr("transform", "translate(70,30)")
      	.call(yAxis)
      .append("text")
      .attr("fill", "#000")
      .style("font-size","0.9rem")
      .attr("transform", "rotate(-90)")
      .attr("x",10)
      .attr("y", -55)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Score (%)");

    scoreSvg.append("g")
    	.append('path')
    	.attr("class","scoreline")
    	.attr("transform", "translate(70,30)")
		.attr('d', line);

	//tips
 	tip = d3.tip().attr('class', 'd3-tip').html(function(d,i) { 
 		var rate = d*100;
 		var level = i+1;
 		rate = rate.toFixed(2);
 		return "<strong>Level: "+level+"</strong><br><strong>"+"Score"+": </strong> <span style='color:red'>" + rate + "%</span>";
 	});

 	scoreSvg.call(tip);

	scoreSvg
	.selectAll('circle')
	.data(score)
	.enter()
	.append('circle')
	.attr('cx', function(d,i) {
		return levelScale(i+1);
	})
	.attr("transform", "translate(70,30)")
	.attr('cy', function(d) {
		return scoreScale(d);
	})
	.on("mouseover",function(d,i){
		d3.select(this).style("fill",function(){
            return "#BDC3C7";
        });
        d3.select(this).attr("r",4);
        d3.select(this).style("cursor", "pointer"); 
        tip.show(d,i);
    })
    .on("mouseout",function(){
        d3.select(this).style("fill",function(d){
        	return "#34495E"
        })
        d3.select(this).attr("r",3);
        d3.select(this).style("cursor", "default"); 
        tip.hide();
    })
	.style("fill","#34495E")
	.attr('r', 3);

	var textX = levelScale(parseInt(globalWorkerObj.finishLevel)) + 50;
	var nowLevel = parseInt(globalWorkerObj.finishLevel) - 1;
	var textY = scoreScale(score[nowLevel]) + 30;
	
	// scoreSvg.append("text")
 //      .attr("fill", "#359ad7")
 //      .attr("x",textX)
 //      .attr("y", textY)
 //      .attr("dy", "0.71em")
 //      .attr("text-anchor", "end")
 //      .text(function(){
 //      	var nowscore = score[nowLevel] * 100;
 //      	return nowscore + '%';
 //      });
}

//plot Reward data
function plotReward(){
	var width = 250;
	var height = 220;
	var level = new Array();
	for(var i = 0;i <= 17;i++){
		level[i] = i;
	}

	var levelScale = d3.scalePoint()
		.domain(level)
		.range([0,width]);

	var rewardScale = d3.scaleLinear()
		.domain([0,6.8])
		.range([height,0]);

	var nowLevel = new Array();
	for(var i = 0; i <= parseInt(globalWorkerObj.finishLevel);i++){
		nowLevel[i] = i;
	}

	var lineGenerator = d3.line()
		.x(function(d,i){
			return levelScale(d);
		})
		.y(function(d,i){
			var reward = 0.4 * d;
			return rewardScale(reward);
		})

	var line = lineGenerator(nowLevel);
	var lineback = lineGenerator(level);

	var rewardSvg = d3.select('#reward-chart').append("svg")
		.attr("class","svg")
		.attr("width",350)
		.attr("height",300);

	var xAxis = d3.axisBottom(levelScale)

	var yAxis = d3.axisLeft(rewardScale)

	rewardSvg.append("g")
		.attr("transform", "translate(70,250)")
      	.call(xAxis)
      .append("text")
      .attr("fill", "#000")
      .attr("x",240)
      .attr("y", 25)
      .style("font-size","0.9rem")
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Level");

    rewardSvg.append("g")
		.attr("transform", "translate(70,30)")
      	.call(yAxis)
      .append("text")
      .style("font-size","0.9rem")
      .style("font-family","Arial")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("x",10)
      .attr("y", -50)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text("Money ($)");

	rewardSvg.append("g")
    	.append('path')
    	.attr("class","rewardbackline")
    	.attr("transform", "translate(70,30)")
		.attr('d', lineback)

	var textX = levelScale(parseInt(globalWorkerObj.finishLevel)) + 40;
	var textY = rewardScale(parseInt(globalWorkerObj.finishLevel) * 0.4) + 30;
	
	rewardSvg.append("text")
      .attr("fill", "#1ABC9C")
      .attr("x",165)
      .attr("y", 135)
      .attr("dy", "0.71em")
      .attr("text-anchor", "end")
      .text(function(){
      	var nowreward = (0.4 * parseInt(globalWorkerObj.finishLevel)).toFixed(2);
      	return '$'+nowreward;
      });

	rewardSvg.append("g")
    	.append('path')
    	.attr("class","rewardline")
    	.attr("transform", "translate(70,30)")
		.attr('d', line);
}








