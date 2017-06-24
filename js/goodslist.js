var host = 'http://dr.promontory7.cn/DrAgriculture-0.1';
$(function(){
	$.ajax({
		type:'get',
		url:host+"/terminal/GoodsCategory/list",
		async:true,
		dataType: "json",
	          contentType: "application/json",

	          success:function(data){
	          		var $gcLen = data.data.goodsCategories.length;
	          		for (var $i = 0; $i < $gcLen; $i++) {
				goodslist(data.data.goodsCategories[$i].code);
	          		};
	          },
	          error:function(){
	          		console.log('No');
	          		var $gcLen = 2;
	          		for (var $i = 0; $i < $gcLen; $i++) {
				goodslist(data.data.goodsCategories[$i].code);
	          		};
	          }
	})
})



function goodslist(categoryCode){
	var sd = {
		categoryCode:categoryCode
	}

	$.ajax({
		type:'post',
		url:host+"/terminal/goods/list",
		async:true,
		data:sd,
		dataType: "json",
	          contentType: "application/json",
	          data: JSON.stringify(sd),

	          success:function(data){
	          		if(data.status == 200 && data.code == 2000){
	          			var courLen = data.data.couresTopics.length;
	          			for (var i = 0; i < courLen; i++) {
	          				var $cT = data.data.couresTopics[i];
	          				if($cT.categoryCode == categoryCode){
	          					var $glLi = $("<li></li>");
	          					var $ImgList = $("<img src="+$cT.defaultImage+" alt=''>"+"<b>8.0折</b>"+"<a href=''>正宗山养土鸡蛋农家自养农村散养新鲜山鸡蛋有机杂粮30枚</a>"+"<span class='red'>￥97.00</span>"+"<s class='old'>原价:￥116.50</s>"+"<i></i>");
	          					$glLi.append($ImgList);
	          					$('.gl ul').append($glLi);
	          				}
	          			};
	          		}
	          },
	          error:function(){
	          		alert('交互失败');
	          		var courLen = 10;
          			for (var i = 0; i < courLen; i++) {
          				var $cT = data.data.couresTopics[i];
          				if($cT.categoryCode == categoryCode){
          					var $glLi = $("<li></li>");
          					var $ImgList = $("<img src='http://img.mp.itc.cn/upload/20170301/3705c92d756547fcbdacc5fa1dc76e9a_th.jpg' alt=''>"+"<b>8.0折</b>"+"<a href=''>正宗山养土鸡蛋农家自养农村散养新鲜山鸡蛋有机杂粮30枚</a>"+"<span class='red'>￥97.00</span>"+"<s class='old'>原价:￥116.50</s>"+"<i></i>");
          					$glLi.append($ImgList);
          					$('.gl ul').append($glLi);
          				}
          			};
	          }
	})
}

$(function(){
	$('#dropdown').click(function(){
		var $reg = / without/;
		var $downClass = $('.down').attr('class');
		var $c = $downClass.replace($reg,'');
		$('.down').attr('class',$c);

		var $have = $reg.test($downClass);
		if(!$have){
			$('.down').attr('class',$downClass+' without');
		}
	});

	$('.gl ul li').click(function(){
		// alert($(this).index('.gl ul li'));
		$.ajax({
			type:'get',
			url:host+"/terminal/GoodsCategory/list",
			async:true,
			dataType: "json",
		          contentType: "application/json",

		          success:function(data){
		          		if(data.status == 200 && data.code == 2000){
		          			var $glcode = [];
		          			$glcode.push(data.data.couresTopics[$(this).index('.gl ul li')].code);
		          			window.localStorage.$glcode = JSON.stringify($glcode);
		          		}
		          },
		          error:function(){
		          		alert('交互No');
		          		var $glcode = [];
	          			$glcode.push(data.data.couresTopics[$(this).index('.gl ul li')].code);
	          			alert($glcode);
	          			window.localStorage.$glcode = JSON.stringify($glcode);
		          }
		})
	})

	var $len1 = $('.down li').length;
	for (var $z = 0; $z < $len1; $z++) {
		(function($z){
			$('.down li').eq($z).click(function(){
				var $h = $('.down li').eq($z).html();
				$('.place input').val($h);
			});
		})($z);
	};

	var $n =$('.morenum ul li').length;
	var $liWidth = parseInt($(".morenum ul li").css('width'));
	var $liRight = parseInt($(".pagination li").css('marginRight'));
	var $sum = $liRight + $liWidth;
	$('.morenum').css('width',$sum*6+'px');
	$('.morenum ul').css('width',$sum*$n+'px');
	$('.morenum ul li:first-child').attr('class','on');
	for (var $d = 0; $d < $n; $d++) {
		// console.log($('.morenum ul li').eq($d));
		$('.morenum ul li').eq($d).click(function(){
			// alert($d+1);
			$('.morenum ul li').attr('class','');
			$(this).attr('class','on');
			// 分页省略
			var $c=$(".morenum ul li").index($('.morenum ul li.on'));

			if($c < 3){
				$('.morenum ul').css('marginLeft','0px');
			}else if($c >= 3 && $c < $n-3){
				$('.morenum ul').css('marginLeft',-($sum*($c-2))+'px');
			}else if($c+2 >= $n-1){
				$('.morenum ul').css('marginLeft',-($sum*($n-6))+'px');
			}
			if($n>6){
				if($c>=2){
					if($c+2 < $n-2){
						$(".morenum ul li").eq($c+2).text('...');				
					}
					for (var $i = $c; $i < $n-4; $i++) {
						if($c+3 < $n-1){
							$(".morenum ul li").eq($i+3).hide();					
						}
					};
				}else{
					$(".morenum ul li").eq(4).text('...');
					for (var $j = 5; $j < $n-1; $j++) {
						$(".morenum ul li").eq($j).hide();					
					};
				}
			}
		})
	};


	// 点击向左滚动
	var $leftli = $('.left').parent('li');
	var $rightli = $('.right').parent('li');
	if(parseInt($('.morenum ul').css('marginLeft')) == 0){
		$leftli.css('backgroundColor','#F2F2F2');
		$rightli.css('backgroundColor','#fff');
		$leftli.unbind('click');
	}
	if(parseInt($('.morenum ul').css('marginLeft')) == -($sum*($n-6))){
		$rightli.css('backgroundColor','#F2F2F2');
		$leftli.css('backgroundColor','#fff');
		$rightli.unbind('click');
	}
	
	var $num = 0;
	$rightli.bind('click',function(){
		$num++;
		if($num <= $n-6){
			$('.morenum ul').css('marginLeft',-($sum*$num)+'px');
			if($num+4 < $n-2){
				$(".morenum ul li").eq($num+4).text('...');				
				for (var $a = $num+5; $a < $n-1; $a++) {
					$(".morenum ul li").eq($a).hide();
				};			
			}
		}else{
			$num = $n-6;
		}
	});
	$leftli.bind('click',function(){
		$num--;
		if($num >= 0){
			$('.morenum ul').css('marginLeft',-($sum*$num)+'px');
			$(".morenum ul li").eq(-4-$num).text('...');				
			for (var $b = -5-$num; $b < $n-1; $b++) {
				$(".morenum ul li").eq($b).hide();
			}			
		}else{
			$num = 0;
		}
	});

	$('.choice li').click(function(){
		 window.location.href='detail.html';
	});

	// $('.choice li i').click(function(){
	// 	window.location.href='car.html';
	// 	return false;
	// });
})