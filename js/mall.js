var host = 'http://dr.promontory7.cn/DrAgriculture-0.1';
$(function(){
	
	$.ajax({
		url:host+"/terminal/GoodsCategory/list",
	    success:function(data){
	          		if(data.code == 2000){
	          			alert("成功1");
		          		var $gcLen = data.data.goodsCategories.length;
		          		for (var $i = 0; $i < $gcLen; $i++) {
		          			var $gcs = data.data.goodsCategories[$i];
		          			if($gcs.sort == 1){
		          				goodslist($gcs.code,$('.frt ul li'));
		          			}else if($gcs.sort == 2){
		          				goodslist($gcs.code,$('.mt ul li'));
		          			}
		          		}
	          		}else{
	          			alert("失败1");
	          		}
	          },
	          error:function(){
	          		alert('NO');
	          }
	})
})

function goodslist(categoryCode,$elem){
	var sd = {
		categoryCode:categoryCode
	}

	$.ajax({
		type:'post',
		url:host+"/terminal/goods/list",
		async:true,
		dataType: "json",
	    contentType: "application/json",
	    data: JSON.stringify(sd),

	          success:function(data){
	          		if(data.code == 2000){
	          			alert("成功，2")
	          			var courLen = $elem.length;
	          			for (var i = 0; i < courLen; i++) {
	          				var $cT = data.data.couresTopics[i];
	          				if($cT.categoryCode == categoryCode){
	          					var $ImgList = $("<img src='"+$cT.defaultImage+"' alt=''><div class='price'><p>"+$cT.title+"</p><p>￥</p><p>"+$cT.price+"</p></div>"+
								    "<div class='join without'><i></i><p>加入购物车</p></div>");
	          					$elem.eq(i).append($ImgList);
	          				}
	          			}
	          		}else{
	          			alert("失败，2");
	          		}
	          },
	          error:function(){
	          		var courLen = $elem.length;
	          			for (var i = 0; i < courLen; i++) {
	          				var $cT = data.data.couresTopics[i];
	          				if($cT.categoryCode == categoryCode){
	          					var $ImgList = $("<img src='"+$cT.defaultImage+"' alt=''><div class='price'><p>"+$cT.title+"</p><p>￥</p><p>"+$cT.price+"</p></div>"+
								    "<div class='join without'><i></i><p>加入购物车</p></div>");
	          					$elem.eq(i).append($ImgList);
	          				}
	          			};
	          }
	})
}

$(function(){
	//限制字符个数
	$('.price p').each(function(){
		var maxwidth=18;
		if($(this).text().length>maxwidth){
			$(this).text($(this).html().substring(0,maxwidth));
			$(this).html($(this).html()+'...');
		}
	});

	var $li = $('.littermore ul li');
	var $len = $li.length;
	for (var $i = 0; $i < $len; $i++) {
		(function($i){
			var $n = $li.eq($i);
			var $cName = $n.find('div').eq(0).attr('class');
			var $cName1 = $n.find('div').eq(1).attr('class');
			$n.mouseover(function(){
				var $a = $n.find('div').eq(1).attr('class').replace(/ without/,'');
				$n.find('div').eq(0).attr('class',$cName+' without');				
				$n.find('div').eq(1).attr('class',$a);
			}).mouseout(function(){
				var $b = $n.find('div').eq(0).attr('class').replace(/ without/,'');
				$n.find('div').eq(0).attr('class',$b);
				$n.find('div').eq(1).attr('class',$cName1);
			})
		})($i);
	};

	$('.choice li').click(function(){
		 window.location.href='detail.html';
	});

	// $('.choice li i').click(function(){
	// 	window.location.href='car.html';
	// 	return false;
	// });

	$('.littermore img').click(function(){
		window.location.href='detail.html';
	});

	// $('.join').click(function(){
	// 	window.location.href='car.html';
	// })
	// 
	
})