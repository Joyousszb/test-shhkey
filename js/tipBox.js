/**
 * Created by Lynn on 2016/11/11.
 */
var time;
function alert(str,type,duration) {
    var duration=duration||2000;
    if(type == 0){
        $("#actionResult").css("borderRadius","0px 0px 10px 10px");
        $("#actionResult").css("padding","20px");
        $("#actionResult").css("textAlign","left");
        $("#actionResult").html(str);
        $("#actionDiv").css("display","block").css("top","0px");;
        $("#actionResult").css("background-color", "#56D3F7");
        time = setTimeout(function () {
            // $("#actionDiv").slideUp();
             $("#actionDiv").css("top","-250px");
        },duration);
    }
    else if(type == 1){
        $("#actionResult").css("borderRadius","0 0 10px 10px");
        $("#actionResult").css("padding","20px");
         $("#actionResult").css("textAlign","left");
        $("#actionResult").html(str);
        $("#actionDiv").css("display","block").css("top","0px");;
        $("#actionResult").css("background-color", "#EB3E2E");
        time = setTimeout(function () {
            // $("#actionDiv").slideUp();
             $("#actionDiv").css("top","-250px");
        },duration);
    }
    else {
        $("#actionResult").css("borderRadius","0 0 10px 10px");
        $("#actionResult").css("padding","20px");
         $("#actionResult").css("textAlign","left");
        $("#actionResult").html(str);
        $("#actionDiv").slideDown();
        $("#actionDiv").css("display","block").css("top","0px");
        $("#actionResult").css("background-color","#E9ED50");
        time = setTimeout(function () {
            // $("#actionDiv").slideUp();
            $("#actionDiv").css("top","-250px");
        },duration);
    }
}
