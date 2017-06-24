
/* create By Lynn 2017-04-01*/
$(function(){
	init(1)
	rankingList();	
	//alert(localStorage.infoType);
})

function init(index){
	$("#newInfoUl").children().remove();
	var sendData={
		infoType:localStorage.infoType,
		pageNum:index,
		pageSize:"8"
	};
	var $type=localStorage.infoType;
	if($type=="NEWS_INFO"){
		$('#currentPager').text("公司新闻");
	}
	else if($type=="INDUSTRY_DYNAMICS"){
		$('#currentPager').text("行业动态");
	}
	else if($type=="POLICY_ANNOUNCEMENT"){
		$('#currentPager').text("政策公告");
	}
	else if($type=="PLANTING_TECHIQUE"){
		$('#currentPager').text("种植技术");
	}
	$.ajax({
		type:"post",
		dataType: "json",
        contentType: "application/x-www-form-urlencoded",//表单提交
        data:sendData,//json对象
		url:host+"/terminal/info/infoTypeArticle",
		xhrFields: {withCredentials: true},
        crossDomain: true,
 //       beforeSend:function(){alert(sendData.pageSize);},
        success:function(json){
        	
        	if(json.code==2000){
        		$("#currentPage").html(json.data.pager.pageNum);
        		$("#totalPage").html(json.data.pager.pageCount);
        		for(var i=0;i<json.data.list.length;i++){
        			var $li=$('<li><a href="#"><img src="img/shop_pic1.jpg" alt=""></a>'+
        			'<div class="summary"><h3><a onclick="goToDetail(this)" id="'+json.data.list[i].code+'"href="info_companyNewsDetail.html">'+json.data.list[i].title+'</a></h3>'+
        			'<p></p>'+
        			'<span>'+json.data.list[i].createTime+'</span></div></li>');
        			$("#newInfoUl").append($li);
        		}
        	}else{alert(json.message);}
        },
        error:function(){alert('交互异常');
        }
	});
}

//下一页
 function nextPage(){
            parseInt($("#currentPage").html())<parseInt($("#totalPage").html())&&$("#currentPage").html(parseInt($("#currentPage").html())+1)&&init($("#currentPage").html());

}
//上一页
function prevPage(){
            parseInt($("#currentPage").html())>1&&parseInt($("#currentPage").html())<=parseInt($("#totalPage").html())&&$("#currentPage").html(parseInt($("#currentPage").html())-1)&&init($("#currentPage").html());
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
