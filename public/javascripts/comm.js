//Define common functions of the whole system

//get random array
function getRandom(numCount,numMin,numMax) {
    var numList = [];
    //var numMin = 0;
    //var numMax = 2069;
    var listLen = numMax - numMin + 1;

    var outPut = [];

    // 将所有数顺序装填到数字列表中
    for (var i = numMin; i < numMax + 1; i++) {
        numList.push(i);
    }

    var randNum;
    for (var j = 0; j < numCount; j++) {
        // 产生一个小于列表长度的随机数randNum
        randNum = Math.floor(Math.random() * listLen);
        // 将列表的第randNum项输出
        outPut.push(numList[randNum]);
        // 将列表的最后一项替换到刚被取出的数的位置
        numList[randNum] = numList[listLen - 1];
        // 列表长度减一,即列表最后一项不会再被取到;
        listLen--;
    }

    return outPut;
}

//time tansform
function secondToMinute(s){
    var t;
    if(s > -1){
        var hour = Math.floor(s/3600);
        var min = Math.floor(s/60) % 60;
        var sec = s % 60;
        // if(hour < 10) {
        //     t = '0'+ hour + ":";
        // } else {
        //     t = hour + ":";
        // }
        if(min < 10){t = '0' + min + ":";}
        else{t = min + ':'}
        if(sec < 10){t += "0";}
        t += sec;
    }
    return t;
}

//check if age valid
function isValidAge(age){
    if(age == ''){
        $('#demowarning').css({'display':'none'});
        return true;
    }
    if(isNaN(age)){
        $('#demowarning').text("Your age must be a number!");
        $('#demowarning').css({'display':'block'});
        return false;
    }
    else{
       if(age > 17 && age < 150){
            $('#demowarning').css({'display':'none'});
            return true;
        }
        else{
            $('#demowarning').text("You must be at least 18 years old to participate in our game!");
            $('#demowarning').css({'display':'block'});
            return false;
        } 
    }  
}
























