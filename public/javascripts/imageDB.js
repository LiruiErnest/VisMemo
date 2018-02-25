//used to operate the imagedata database

//obtain the url of image from sequence, 120s per times
//input: 120 globalSequence, output 120 url
function getImageUrl(imageSequence){
	//console.log(imageSequence);
	var imageIDArr = "";
	for(var i = 0;i < imageSequence.length;i++){
		if(i == imageSequence.length-1){
			imageIDArr = imageIDArr + 'I' + imageSequence[i][0].toString();
		}else{
			imageIDArr = imageIDArr + 'I' + imageSequence[i][0].toString() + ',';
		}	
	}
	

	//search imageURL from database
	var imageIDJSON = {'imageID':imageIDArr};
 	$.ajax({
            type: 'POST',
            data: imageIDJSON,
            url: '/images/getImageUrl',
            dataType: 'JSON'
        }).done(function( data ) {
        	buildUrlObj(data.msg);
        });

}

 