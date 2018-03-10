//global variable
var globalData;
$(document).ready(function(){

	//plot table 1
	d3.csv("data/1.csv",function(error,data){
		//console.log(data);
		if(error) throw error;
		setTimeout(function(){}, 1000);
		test(data);
	})

})


function test(data){
	globalData = data;
	var images = new Array();
	for(var i = 0;i < 2068;i++){
		var imageID = i;
		images[i] = new Image()
		images[i].src = data[i].url;
		
		images[i].onload = function(){
			//imageloadpost();
			console.log(i);
		}
		images[i].onerror = function(){
			console.log(i);
			//console.log(i);
			//console.log(i,globalSequence[globalWorkerObj.finishLevel][i][0]);
			//imageloadpost();
		}
	}
}

//draw table
function drawTable(data,object){

	if(data.length == 0){
		return false;
	}

	var table = d3.select("#" + object).append("table");
	var titles = d3.keys(data[0]);
	var headers = table.append('thead').append('tr')
		.selectAll('th')
		.data(titles).enter()
		.append('th')
		.text(function (d){
			return d;
		})

	var rows = table.append("tbody").selectAll('tr')
		.data(data).enter()
		.append('tr')

	var cells = rows.selectAll('td')
		.data(function(d){
			return titles.map(function(k){
				return {'value':d[k],'name':k};
			});
		}).enter()
		.append('td')
		.text(function(d){
			return d.value;
		})

	return true;
}

//draw piechart
function drawPiechart(data,object,radius,isSingle){

	if(data.length == 0)
		return false;

	var colorDomain = d3.keys(data[0]).filter(function(key){return key != "Item";});
	var colorRange = ["#2dba9d", "#3fc977", "#359ad7", "#985fb2", "#3d576c"];

	var color = d3.scaleOrdinal()
		.domain(colorDomain)
		.range(colorRange);

	var radius = radius;

 	//legend
 	var legend = d3.select("#"+object).append("svg")
 		.attr("class",legend)
 		.attr("width",radius * 2)
 		.attr("heitht",radius * 2)
 		.selectAll("g")
 		.data(color.domain()).enter()
 		.append("g")
 		.attr("transform",function(d,i){return "translate(0," + i*20 + ")";});

 	legend.append("rect")
 		.attr("width",18)
 		.attr("height",18)
 		.style("fill",color);

 	legend.append("text")
 		.attr("x",24)
 		.attr("y",9)
 		.attr("dy",".35em")  //Using dy=0.35em can help vertically centre text regardless of font size
 		.text(function(d){
 			return d + " 20% percent";
 		})

 	var pieSvg = d3.select("#"+object).selectAll(".pie")
 		.data(data).enter()
 		.append("svg")
 		.attr("class","pieSvg")
 		.attr("width", radius * 2)
 		.attr("height", radius * 2 + 20)
 		.append("g")
 		.attr("transform","translate(" + radius + "," + radius + ")");

 	data.forEach(function(d) {
        d.ratio = color.domain().map(function(k) {
            return {name: k, value: +d[k]};
        });
    });

    var pieGenerator = d3.pie()
    	.sort(null)
    	.value(function(d){
    		return d.value;
    	})

    var arcGenerator = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

    pieSvg.selectAll(".arc")
 		.data(function(d){
 			return pieGenerator(d.ratio)
 		}).enter()
 		.append("path")
 		.attr("class","arc")
 		.attr('d',function(d, i) {
 			return arcGenerator.outerRadius(100 * d.data.value)(d, i);  			
 		})
 		.style("fill",function(d){
 			return color(d.data.name);
 		})

 	pieSvg.append("text")
            .attr("dy", ".35em")
            .attr("x",0)
            .attr("y",radius + 10)
            .style("text-anchor", "middle")
            .text(function(d) { 
            	if(isSingle == 1){
            		return "Income percentages";
            	}
            	else{
            		return d.Item;
            	} 
            });

	return true;
}

//draw barchart
function drawBarchart(data,object){

	if(data.length == 0)
		return false;

	var colorDomain = d3.keys(data[0]).filter(function(key){return key != "Item";});
	var colorRange = ["#2dba9d", "#3fc977", "#359ad7", "#985fb2", "#3d576c"];

	var color = d3.scaleOrdinal()
		.domain(colorDomain)
		.range(colorRange);

	var basicUnit = 0.5;   //each per mill's pixel

	var group = d3.select("#"+object).append("svg")
		.attr("class","grouplegend")
		.attr("width",1000)
		.attr("height",30)

	var Tag = group.selectAll(".text")
		.data(colorDomain).enter()
		.append("text")
		.attr("x",function(d){
			var xoffset;
 			switch(d){
 				case(colorDomain[0]):
 					xoffset = 310;
 					break;
 				case(colorDomain[1]):
 					xoffset = 410;
 					break;
 				case(colorDomain[2]):
 					xoffset = 520;
 					break;
 				case(colorDomain[3]):
 					xoffset = 640; 
 					break;
 				case(colorDomain[4]):
 					xoffset = 880; 
 					break;
 				default:
 					break;
 			}	
 			return xoffset;				
		})
		.attr("y",20)
		.text(function(d){
			return d;
		});
		
	var legend = d3.select("#"+object).append("svg")
 		.attr("class",legend)
 		.attr("width",240)
 		.attr("height",360)
 		.selectAll("g")
 		.data(data).enter()
 		.append("g")
 		.attr("transform",function(d,i){
 			if(i > 0)
 			return "translate(0," + (i*20+40)  + ")";
 		});

 	legend.append("text")
 		.attr("x",24)
 		.attr("y",9)
 		.attr("dy",".35em")  //Using dy=0.35em can help vertically centre text regardless of font size
 		.text(function(d){
 			return d.Item;
 		})

 	var barSvg = d3.select("#"+object)
 		.append("svg")
 		.attr("id","barSvg")
 		.attr("width",800)
 		.attr("height",360);

 	//transfer the data to an array
 	var dataArr = new Array();
 	for(var i = 0; i < data.length; i++){
 		for(var j = 0; j < colorDomain.length; j++){
 			var dataItem = new Array(data[i]["Item"],colorDomain[j],parseFloat(data[i][colorDomain[j]]));
 			dataArr.push(dataItem);
 		}
 	}

 	barSvg.selectAll(".bar")
 		.data(dataArr).enter()
 		.append("rect")
 		.attr("id",function(d,i){
 			return "bar"+i;
 		})
 		.attr("x",function(d,i){
 			var xoffset;
 			switch(d[1]){
 				case(colorDomain[0]):
 					xoffset = 100 - (d[2]*1000*basicUnit);
 					break;
 				case(colorDomain[1]):
 					xoffset = 210 - (d[2]*1000*basicUnit);
 					break;
 				case(colorDomain[2]):
 					xoffset = 330 - (d[2]*1000*basicUnit);
 					break;
 				case(colorDomain[3]):
 					xoffset = 475 - (d[2]*1000*basicUnit);
 					break;
 				case(colorDomain[4]):
 					xoffset = 775 - (d[2]*1000*basicUnit);
 					break;
 				default:
 					break;
 			}	
 			return xoffset;				
 		})
 		.attr("y",function(d,i){
 			var yoffset;		
 			if(i < 5){
 				yoffset = Math.floor(i/5) * 20;
 			}
 			else{
 				yoffset = Math.floor(i/5) * 20 + 40;
 			}
 			return yoffset;
 		})
 		.attr("width",function(d,i){
 			return d[2]*1000*basicUnit;
 		})
 		.attr("height",15)
 		.style("fill",function(d,i){
 			return color(d[1])
 		});


 	//axis
 	var x = d3.scaleLinear()
				.domain([0, 1])
				.range([0, 500]);

	var xAxis = d3.axisBottom(x)
    	.ticks(10);

    var axisSvg = d3.select("#"+object)
    	.append("svg")
 		.attr("id","axisSvg")
 		.attr("width",800)
 		.attr("height",60);

    axisSvg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(20,0)")
      .call(xAxis)
}

//draw interactive barchart
function drawInterBarchart(data,object){

	if(data.length == 0)
		return false;

	var width = 200;
	var height = 1000;

 	var colorDomain = d3.keys(data[0]).filter(function(d,i){
 		return i % 2 == 1;
 	});
 	var colorRange = ["#2dba9d", "#3fc977", "#359ad7", "#985fb2", "#3d576c"];

	var color = d3.scaleOrdinal()
		.domain(colorDomain)
		.range(colorRange);

	//scale
 	var xLowest = d3.scaleLinear()
			.domain([0,d3.max(data,function(d){
				return parseFloat(d.Lowest);
			})])
			.range([0, width]);

	var xSecond = d3.scaleLinear()
			.domain([0,d3.max(data,function(d){
				return parseFloat(d.Second);
			})])
			.range([0, width]);

	var xThird = d3.scaleLinear()
			.domain([0,d3.max(data,function(d){
				return parseFloat(d.Third);
			})])
			.range([0, width]);

	var xFourth = d3.scaleLinear()
			.domain([0,d3.max(data,function(d){
				return parseFloat(d.Fourth);
			})])
			.range([0, width]);

	var xHighest = d3.scaleLinear()
			.domain([0,d3.max(data,function(d){
				return parseFloat(d.Highest);
			})])
			.range([0, width]);

	//transfer the data to an array
	var category = d3.keys(data[0]).filter(function(d,i){
 		return i % 2 == 0;
 	});

 	var dataArr = new Array();
 	for(var i = 0; i < data.length; i++){
 		for(var j = 0; j < colorDomain.length; j++){

 			var dataItem = new Array(data[i][category[j]],colorDomain[j],parseFloat(data[i][colorDomain[j]]));
 			dataArr.push(dataItem);
 		}
 	}

 	var group = d3.select("#"+object).append("svg")
		.attr("class","grouplegend")
		.attr("width",1060)
		.attr("height",30)

	var Tag = group.selectAll(".text")
		.data(colorDomain).enter()
		.append("text")
		.attr("x",function(d){
			var xoffset;
 			switch(d){
 				case(colorDomain[0]):
 					xoffset = 10;
 					break;
 				case(colorDomain[1]):
 					xoffset = 210;
 					break;
 				case(colorDomain[2]):
 					xoffset = 420;
 					break;
 				case(colorDomain[3]):
 					xoffset = 640; 
 					break;
 				case(colorDomain[4]):
 					xoffset = 850; 
 					break;
 				default:
 					break;
 			}	
 			return xoffset;				
		})
		.attr("y",20)
		.text(function(d){
			return d;
		});

 	//tips
 	tip = d3.tip().attr('class', 'd3-tip').html(function(d) { 
 		var itemName = d[0].replace("*",'');
 		return "<strong>"+itemName+": </strong> <span style='color:red'>$" + d[2] + "</span>";
 	});

 	var barSvg = d3.select("#"+object)
 		.append("svg")
 		.attr("id","barCostSvg")
 		.attr("width",1060)
 		.attr("height",800);

  	barSvg.call(tip);

 	barSvg.selectAll(".bar")
 		.data(dataArr).enter()
 		.append("rect")
 		.attr("id",function(d,i){
 			return "bar"+i;
 		})
 		.attr("x",function(d,i){
 			if(i % 5 == 0){
 				return 10;
 			}
 			else if(i % 5 == 1){
 				return 220;
 			}
 			else if(i % 5 == 2){
 				return 430;
 			}
 			else if(i % 5 == 3){
 				return 640;
 			}
 			else{
 				return 850;
 			}
 		})
 		.attr("y",function(d,i){
 			return Math.floor(i/5)*15;
 		})
 		.attr("width",function(d,i){
 			if(i % 5 == 0){
 				return xLowest(d[2]);
 			}
 			else if(i % 5 == 1){
 				return xSecond(d[2]);
 			}
 			else if(i % 5 == 2){
 				return xThird(d[2]);
 			}
 			else if(i % 5 == 3){
 				return xFourth(d[2]);
 			}
 			else{
 				return xHighest(d[2]);
 			}
 		})
 		.attr("height",14)
 		.on("mouseover",function(d){
			d3.select(this).style("fill",function(){
                return "#e54e44";
            });
            tip.show(d);
        })
        .on("mouseout",function(){
            d3.select(this).style("fill",function(d){
            	return color(d[1])
            })
            tip.hide();
        })
 		.style("fill",function(d,i){
 			return color(d[1])
 		});

 	


	var xLowestAxis = d3.axisBottom(xLowest)
    	.ticks(10);
    var xSecondAxis = d3.axisBottom(xSecond)
    	.ticks(10);
    var xThirdAxis = d3.axisBottom(xThird)
    	.ticks(10);
    var xFourthAxis = d3.axisBottom(xFourth)
    	.ticks(10);
    var xHighestAxis = d3.axisBottom(xHighest)
    	.ticks(10);

    //juck code, I'll fix it in the future
    barSvg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(10,760)")
    	.call(xLowestAxis)
    .selectAll("text")
    	.style("text-anchor", "end")
    	.attr("dx", "-.8em")
    	.attr("dy", "-.55em")
    	.attr("transform", "rotate(-90)" );

    barSvg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(220,760)")
    	.call(xSecondAxis)
    .selectAll("text")
    	.style("text-anchor", "end")
    	.attr("dx", "-.8em")
    	.attr("dy", "-.55em")
    	.attr("transform", "rotate(-90)" );

    barSvg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(430,760)")
    	.call(xThirdAxis)
    .selectAll("text")
    	.style("text-anchor", "end")
    	.attr("dx", "-.8em")
    	.attr("dy", "-.55em")
    	.attr("transform", "rotate(-90)" );

    barSvg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(640,760)")
    	.call(xFourthAxis)
    .selectAll("text")
    	.style("text-anchor", "end")
    	.attr("dx", "-.8em")
    	.attr("dy", "-.55em")
    	.attr("transform", "rotate(-90)" );

    barSvg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(850,760)")
    	.call(xHighestAxis)
    .selectAll("text")
    	.style("text-anchor", "end")
    	.attr("dx", "-.8em")
    	.attr("dy", "-.55em")
    	.attr("transform", "rotate(-90)" );
    

}









