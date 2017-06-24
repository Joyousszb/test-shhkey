/* create By Lynn 2017-04-01*/

$(function(){
	rankingList();
detail();

})
	//单篇文章信息
function detail(){
//	alert(localStorage.code);
	var sendData={
		code:localStorage.code
	};
	$.ajax({
		type:"post",
		contentType: "application/x-www-form-urlencoded",
        data:sendData,       
		url:host+"/terminal/info/detail",
		xhrFields: {withCredentials: true},
        crossDomain: true,
        success:function(json){
        	
        	if(json.code==2000){
        		$("#newsTitle").text(json.data.info.title);
        		$("#creatTime").text(json.data.info.createTime);
        		$("#newsContet").append(json.data.info.content);
        	}else{
        		alert(json.message);
        	}
        },
        error:function(){alert('交互异常');}
	});
}
//资讯排行榜
function rankingList(){
	$("#ranking").children().remove();
	$.ajax({
		url:host+"/terminal/info/getRankingList",
		xhrFields: {withCredentials: true},
        crossDomain: true,
        success:function(json){
        	if(json.code==2000){
        		for(var i=0;i<json.data.list.length;i++){
        			$("#ranking").append($('<li><span>'+(i+1)+'</span><a onclick="goToDetail(this)" id="'+json.data.list[i].code+'" href="info_companyNewsDetail.html"><p>'+json.data.list[i].title+'</p></a></li>'));
        		}
        		
        	}else{alert(json.message);}
        },
        error:function(){
        	alert("交互异常");
        }
	});
}
function goToDetail(e){
	localStorage.code=$(e).attr('id');
}