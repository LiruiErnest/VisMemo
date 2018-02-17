//This script mainly define the logic of the whole game.

$(document).ready(function() {

	//register the click event
	$("#start-practice").click(function(){
		//load images
		//$(".content-box").css({ 'display': 'none' });
		$(".loading").css({'display':'block'});
		$(".name").css({'display':'none'});
		$('.title-instructions').text("Press the 'Space' key any time you see image you see before");
		$('.progress-bar').css({ 'display': 'block' });
	})

});