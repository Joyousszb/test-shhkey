/* create By Lynn 2017-04-01*/

$(window).ready(function(){
	//主页焦点图
	var btnLeft = $('.banner-btnLeft');
	var btnRight = $('.banner-btnRight');
	var aLi = $('.main_banner>ul>li');
	var ul = $('.main_banner>ul');
	var iNow = 0;

    //遍历添加ol>li的数量
	for(var i=0;i<aLi.length;i++){
		$('.main_banner>ol').append("<li></li>");
	}
    $('.main_banner>ol>li').eq(0).addClass("current");

    //点击左按钮 
    btnLeft.click(function(){
         iNow--;
          // 判断回流
         if(iNow<0){
              iNow=aLi.length-1;
         }
         aLi.eq(iNow).siblings().stop().animate({
          opacity:0
         
        },2000);
        aLi.eq(iNow).stop().animate({
          opacity:1
           
        },2000);
         $('.main_banner>ol>li').eq(iNow).addClass('current').siblings().removeClass('current');
     });

    // 点击右按钮 
       btnRight.click(function(){
         iNow++;
         if(iNow>aLi.length-1){
              iNow=0;
         }
         aLi.eq(iNow).siblings().stop().animate({
          opacity:0
         
        },2000);
        aLi.eq(iNow).stop().animate({
          opacity:1
           
        },2000);
         $('.main_banner>ol>li').eq(iNow).addClass('current').siblings().removeClass('current');

     });

     //手动切换
     $('.main_banner>ol>li').mouseover(function(){
		var n = $(this).index();
//        var iNow = $(this).index();
//        alert(iNow);
		iNow = n;
         aLi.eq(iNow).siblings().stop().animate({
          opacity:0
         
        },2000);
        aLi.eq(iNow).stop().animate({
          opacity:1
           
        },2000);
         $('.main_banner>ol>li').eq(iNow).addClass('current').siblings().removeClass('current');

     });
  // 封装函数体
 function move1(){
      aLi.eq(iNow).siblings().stop().animate({
          opacity:0
         
        },800);
        aLi.eq(iNow).stop().animate({
          opacity:1
        },2000);
      
         $('.main_banner>ol>li').eq(iNow).addClass('current').siblings().removeClass('current');
 }
 
 // 定个定时器的初始值

function run2(){ 
      iNow++;
       if(iNow>aLi.length-1){
              iNow=0;
         }
       move1();  
}
 
// 定时器
 timer = setInterval(run2,2000);	
  
 

//当鼠标划入，停止轮播图切换
  $(".main_banner").hover(function(){
    clearInterval(timer);
    btnLeft.removeClass("common");
    btnRight.removeClass("common");

 },function(){
    timer = setInterval(run2,2000);
    btnLeft.addClass("common");
    btnRight.addClass("common");
 })

})


//获取首页轮播图
$(function(){
	$.ajax({
		type:"get",
		url:host+"/homePage/index",
		success:function(json){
			if(json.code==2000){
				for (var i=0;i<json.data.Url.length;i++) {
					$("#main_banner ul").children().eq(li).css('background','url('+json.data.Url[i]+')');
				}			
			}else{
				alert(json.message);
			}
		},
		error:function(){
			alert("交互异常");
		}
	});
})



$(function(){
	fineGoods();
	fineNews();
})
//获取精品商品
function fineGoods(){
	$('#fine_goods_item_ul').children().remove();
	$.ajax({
		url:host+"/terminal/goods/homePage",
		success:function(json){
			if(json.code==2000){				
				for(var i=0;i<json.data.catagories.length;i++){
					var $name=json.data.catagories[i].name;
					if($name=="精选商品"){
						var $goods=json.data.catagories[i].goods
						for(var j=0;j<$goods.length;j++){
							var $li=$('<li>'+
							'<div id="'+$goods[j].code+'" class="fine_goods_wrap">'+
			                  '<div class="p-img">'+
			                     '<a href="detail.html" onclick="GoodsDetail(this)">'+
			                     '<img style="width:270px" src="'+$goods[j].defaultImage+'"><i><s>8.8折</s></i>'+
			                     '</a>'+
			                  '</div>'+
			                  '<div class="p-name">'+
			                    '<a href="#" onclick="localStorage.code= $(this).parent().parent().attr(\'id\'); window.location.href = \'detail.html\';"><em>'+$goods[j].title+'</em></a>'+
			                  '</div>'+
			                  '<div class="p-price">'+
			                     '<p><span style="font-size:12px;">¥ </span><b>'+($goods[j].price/100).toFixed(2)+'</b></p>'+ 
			                     '<s>原价：¥'+($goods[j].stock/100).toFixed(2)+'</s>'+
			                     '<a onclick="addToCar(this)" href="#"><img src="img/shopping_normal.png" alt=""></a>'+
			                  '</div>'+
			               '</div>'+
			            '</li>');
						$('#fine_goods_item_ul').append($li);
						}
					}
				}
				
			}
		},
		error:function(){
			alert('交互异常');
		}
	})
}

 //加入购物车
function addToCar(e){
 	sessionStorage.code=$(e).parent().parent().attr('id');
 	var sendData={
 		goodsCode:sessionStorage.code,
 		num:1
 	};
 	$.ajax({
		type:"post",
		dataType: "json",
        contentType: "application/x-www-form-urlencoded",//表单提交
        data:sendData,
        xhrFields: {withCredentials: true},
        crossDomain:true,
		url:host+"/terminal/shoppingCart/add",
		success:function(json){
			alert(json.message);
		},
		error:function(){
			alert("交互异常");
		}
 	})
 }

//获取精品栏目信息
function fineNews(){
	$('#infoListUL').children().remove();
	$('.emer_list').children().remove();
	$('.edu_list').children().remove();
	$.ajax({
			url:host+"/homePage/getOtherInfo",
			success:function(json){
				
				if(json.code==2000){
					for(var i=0;i<json.data.infoList.length;i++){
						var $infoListli=$('<li>'+
                      '<div class="conlumn_item">'+
                         '<div class="conlunm-img">'+
                           '<a href="#"><img src="img/column-1.jpg" alt=""></a>'+
                         '</div>'+
                         '<div class="conlunm-title">'+
                            '<a onclick="goToDetail(this)" id="'+json.data.infoList[i].code+'" href="info_companyNewsDetail.html"><em>'+json.data.infoList[i].title+'</em></a>'+
                            '<p>'+json.data.infoList[i].createTime+'</p>'+
                         '</div></div></li>');
						$('#infoListUL').append($infoListli);
					}
					for(var i=0;i<json.data.emergencyList.length;i++){
						var $emerListli=$('<li><i></i><a href="#">'+json.data.emergencyList[i].title+'</a><p>'+json.data.emergencyList[i].createTime+'</p></li>');
						$('.emer_list').append($emerListli);
					}
					for(var i=0;i<json.data.educationList.length;i++){
						var $eduListli=$('<li><i></i><a href="#">'+json.data.educationList[i].title+'</a><p>'+json.data.educationList[i].createTime+'</p></li>');
						$('.edu_list').append($eduListli);
					}
				}else{alert(json.message);}
			},
			error:function(){
				alert("交互异常");
			}
		})
}
//跳转资讯详情
function goToDetail(e){
	localStorage.code=$(e).attr('id');
}
//查看商品详情
function GoodsDetail(e){
	localStorage.code1= $(e).parent().parent().attr('id');
}
