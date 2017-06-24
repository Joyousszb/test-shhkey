/* create By Lynn 2017-04-01*/

$(function(){	
	$('.main0Div').children().remove();
	stayCheck();	
	staySend();
	stayTake();	
})

//格式化日期
function getMyDate(str){  
            var oDate = new Date(str),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
         //   oHour = oDate.getHours(),  
         //   oMin = oDate.getMinutes(),  
         //  oSen = oDate.getSeconds(),  
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay);//最后拼接时间  
            return oTime;  
        };  
        //补0操作  
        function getzf(num){  
            if(parseInt(num) < 10){  
                num = '0'+num;  
            }  
            return num;  
        }  
//待付款
function stayCheck(){
		$('.main1Div').children().remove();
		var sendData={
			status:1
		};
		$.ajax({
			type:"post",
			dataType: "json",
	        contentType: "application/x-www-form-urlencoded",//表单提交
	        data:sendData,
	        xhrFields: {withCredentials: true},
	        crossDomain:true,
			url:host+"/terminal/orderItem/list",
			success:function(json){
				
				if(json.code==2000){
					var $orderItems=json.data.orderItems;
					if($orderItems.length==0){
						$('.main1Div').prev().hide();
						$('.main1Div').append($('<div style="text-align:center;color:#9c9c9c">暂无待付款订单...</div>'));
					}else{
						for (var j=0;j<$orderItems.length;j++) {						
							var $time=getMyDate($orderItems[j].createTime);
							var $table1=$('<table class="main0-table-content main1-allOrder" cellspacing="0" cellpadding="0">'+
										'<thead>'+
							    			'<tr>'+
							    				'<td style="width: 60px;"><input class="main1-allOrderCheck ch" type="checkbox"></td>'+
							    				'<td style="text-align: left;">'+$time+'</td>'+
							    				'<td colspan="6">订单号：'+$orderItems[j].code+'</td>'+
							    			'</tr>'+
							  			'</thead>'+  			
							    		'<tbody id="'+$orderItems[j].code+'"></tbody>'+							    						    									'</table>');
							$('.main1Div').append($table1);
							
						}
					
						
						for (var j=0;j<$orderItems.length;j++) {
							var $orderGoods=json.data.orderItems[j].orderGoods;
							for (var i=1;i<$orderGoods.length;i++) {
								
								$("#"+$orderItems[j].code).append($('<tr>'+
							    				'<td><input type="checkbox"></td>'+
							    				'<td><img style="width:100%" src="'+$orderGoods[0].defaultImage+'"></td>'+
							    				'<td>'+$orderGoods[0].title+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[0].price/100).toFixed(2)+'</span></td>'+
							    				'<td >'+$orderGoods[0].num+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[0].total/100).toFixed(2)+'</span></td>'+
							    				'<td width="91px" rowspan="'+$orderGoods.length+'" style="color:#e82330">待付款</td>'+
							    				'<td rowspan="'+$orderGoods.length+'" width="189px">'+
							    					'<button class="check-btn">立即支付</button>'+
							    					'<button class="cancel-btn" onclick="$(\'#cancerOrderModal\').toggle();$(\'.bg-grey\').show();sessionStorage.stayPayCode=$(this).parent().parent().parent().attr(\'id\')">取消订单</button>'+
							    				'</td>'+			    				
							    			'</tr>'));	
								var $tb1=$('<tr>'+
							    				'<td><input type="checkbox"></td>'+
							    				'<td><img style="width:100%" src="'+$orderGoods[i].defaultImage+'"></td>'+
							    				'<td>'+$orderGoods[i].title+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[i].price/100).toFixed(2)+'</span></td>'+
							    				'<td >'+$orderGoods[i].num+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[i].total/100).toFixed(2)+'</span></td>'+
							    						    				
							    			'</tr>');
							   			 $("#"+$orderItems[j].code).append($tb1);
							}
						}		
						//复制到所有订单
						$('.main1Div').children().clone(true).appendTo($('.main0Div'));	
					}	
				}else{
					alert(json.message);
				}
			},
			error:function(){
				alert("交互异常");
			}
		});
	}
	
//取消订单
function sureCancer(){
//	alert(sessionStorage.stayPayCode);
	var sendData={
		code:sessionStorage.stayPayCode
	};
	$.ajax({
			type:"post",
			dataType: "json",
	        contentType: "application/x-www-form-urlencoded",//表单提交
	        data:sendData,
	        xhrFields: {withCredentials: true},
	        crossDomain:true,
			url:host+"/terminal/orderItem/cancel",
			success:function(json){
				alert(json.message);
				if(json.code==2000){
					window.location.reload();
				}
			},
			error:function(){
				alert("交互异常");
			}
		})
}

//待发货
function staySend(){
		$('.main2Div').children().remove();
		var sendData={
			status:2
		};
		$.ajax({
			type:"post",
			dataType: "json",
	        contentType: "application/x-www-form-urlencoded",//表单提交
	        data:sendData,
	        xhrFields: {withCredentials: true},
	        crossDomain:true,
			url:host+"/terminal/orderItem/list",
			success:function(json){
				
				if(json.code==2000){
					var $orderItems=json.data.orderItems;
					if($orderItems.length==0){
						$('.main2Div').prev().hide();
						$('.main2Div').append($('<div style="text-align:center;color:#9c9c9c">暂无待发货订单...</div>'));
					}else{
					
					for (var j=0;j<$orderItems.length;j++) {		
						var $time=getMyDate($orderItems[j].createTime);
						var $table2=$('<table class="main0-table-content main2-stayingReceive" cellspacing="0" cellpadding="0">'+
										'<thead>'+
							    			'<tr>'+
							    				'<td style="width: 60px;"><input class="main2-allOrderCheck ch" type="checkbox"></td>'+
							    				'<td style="text-align: left;">'+$time+'</td>'+
							    				'<td colspan="6">订单号：'+$orderItems[j].code+'</td>'+
							    			'</tr>'+
							  			'</thead>'+  			
							    		'<tbody id="'+$orderItems[j].code+'"></tbody>'+							    						    									'</table>');
							$('.main2Div').append($table2);
							
						}
					
						
						for (var j=0;j<$orderItems.length;j++) {
							var $orderGoods=json.data.orderItems[j].orderGoods;
							for (var i=1;i<$orderGoods.length;i++) {
								
								$("#"+$orderItems[j].code).append($('<tr>'+
							    				'<td><input type="checkbox"></td>'+
							    				'<td><img style="width:100%" src="'+$orderGoods[0].defaultImage+'"></td>'+
							    				'<td>'+$orderGoods[0].title+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[0].price/100).toFixed(2)+'</span></td>'+
							    				'<td >'+$orderGoods[0].num+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[0].total/100).toFixed(2)+'</span></td>'+
							    				'<td width="91px" rowspan="'+$orderGoods.length+'">待发货</td>'+
							    				'<td rowspan="'+$orderGoods.length+'" width="189px">'+
							    					'<button onclick="seaLogistic(this)" class="checkLogistics-btn">查看物流</button>'+							    					
							    				'</td>'+			    				
							    			'</tr>'));	
								var $tb2=$('<tr>'+
							    				'<td><input type="checkbox"></td>'+
							    				'<td><img style="width:100%" src="'+$orderGoods[i].defaultImage+'"></td>'+
							    				'<td>'+$orderGoods[i].title+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[i].price/100).toFixed(2)+'</span></td>'+
							    				'<td >'+$orderGoods[i].num+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[i].total/100).toFixed(2)+'</span></td>'+
							    						    				
							    			'</tr>');
							   			 $("#"+$orderItems[j].code).append($tb2);
							}
						}		
						//复制到所有订单
						$('.main2Div').children().clone(true).appendTo($('.main0Div'));	
					}	
				}else{
					alert(json.message);
				}
			},
			error:function(){
				alert("交互异常");
			}
		});
	}

//待收货
function stayTake(){
		$('.main3Div').children().remove();
		var sendData={
			status:4
		};
		$.ajax({
			type:"post",
			dataType: "json",
	        contentType: "application/x-www-form-urlencoded",//表单提交
	        data:sendData,
	        xhrFields: {withCredentials: true},
	        crossDomain:true,
			url:host+"/terminal/orderItem/list",
			success:function(json){
				
				if(json.code==2000){
					var $orderItems=json.data.orderItems;
					if($orderItems.length==0){
						$('.main3Div').prev().hide();
						$('.main3Div').append($('<div style="text-align:center;color:#9c9c9c">暂无待收货订单...</div>'));
					}else{
					
					for (var j=0;j<$orderItems.length;j++) {			
						var $time=getMyDate($orderItems[j].createTime);
						var $table3=$('<table class="main0-table-content main3-stayingReceive" cellspacing="0" cellpadding="0">'+
										'<thead>'+
							    			'<tr>'+
							    				'<td style="width: 60px;"><input class="main3-allOrderCheck ch" type="checkbox"></td>'+
							    				'<td style="text-align: left;">'+$time+'</td>'+
							    				'<td colspan="6">订单号：'+$orderItems[j].code+'</td>'+
							    			'</tr>'+
							  			'</thead>'+  			
							    		'<tbody id="'+$orderItems[j].code+'"></tbody>'+							    						    									'</table>');
							$('.main3Div').append($table3);
							
						}
					
						
						for (var j=0;j<$orderItems.length;j++) {
							var $orderGoods=json.data.orderItems[j].orderGoods;
							for (var i=1;i<$orderGoods.length;i++) {
								
								$("#"+$orderItems[j].code).append($('<tr>'+
							    				'<td><input type="checkbox"></td>'+
							    				'<td><img style="width:100%" src="'+$orderGoods[0].defaultImage+'"></td>'+
							    				'<td>'+$orderGoods[0].title+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[0].price/100).toFixed(2)+'</span></td>'+
							    				'<td >'+$orderGoods[0].num+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[0].total/100).toFixed(2)+'</span></td>'+
							    				'<td width="91px" rowspan="'+$orderGoods.length+'">待收货</td>'+
							    				'<td rowspan="'+$orderGoods.length+'" width="189px">'+
							    					'<button onclick="seaLogistic(this)" class="checkLogistics-btn">查看物流</button>'+							    					
							    				'</td>'+			    				
							    			'</tr>'));	
								var $tb3=$('<tr>'+
							    				'<td><input type="checkbox"></td>'+
							    				'<td><img style="width:100%" src="'+$orderGoods[i].defaultImage+'"></td>'+
							    				'<td>'+$orderGoods[i].title+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[i].price/100).toFixed(2)+'</span></td>'+
							    				'<td >'+$orderGoods[i].num+'</td>'+
							    				'<td width="91px"><span>￥</span><span>'+($orderGoods[i].total/100).toFixed(2)+'</span></td>'+
							    						    				
							    			'</tr>');
							   			 $("#"+$orderItems[j].code).append($tb3);
							}
						}		
						//复制到所有订单
						$('.main3Div').children().clone(true).appendTo($('.main0Div'));	
					}	
				}else{
					alert(json.message);
				}
			},
			error:function(){
				alert("交互异常");
			},
		});

	}

//查看物流
function seaLogistic(e){
	$('.order').hide();	
	$('.logistics-info').show();
	//$('.track-list div').show();
	$('#track-list-ul').children().remove();
	sessionStorage.code=$(e).parent().parent().parent().attr('id');
	var sendData={
		code:sessionStorage.code
	};
	$.ajax({
		type:"post",
		dataType: "json",
        contentType: "application/x-www-form-urlencoded",//表单提交
        data:sendData,
        xhrFields: {withCredentials: true},
        crossDomain:true,
		url:host+"/terminal/orderItem/shipping",
		success:function(json){
			if(json.code==2000){
				
				if(json.data.shippingInfo!=null){
					$('.track-list div').hide();
					$('#track-list-ul').append($('<li class="first"><i class="node-icon"></i><span class="date">您的包裹已发货</span></li>'));
					var $traces=json.data.shippingInfo.Traces;
					for(var i=0;i<$traces.length;i++){
						var $data=$traces[i].AcceptTime.substring(0,11);//切割日期
						var $time=$traces[i].AcceptTime.substring(11,19);//切割时间
						var $li=$('<li><i class="node-icon"></i>'+
											'<span class="date">'+$data+'</span>'+
											'<span class="day">时间</span>'+
											'<span class="time">'+$time+'</span>'+
											'<span class="txt">'+$traces[i].AcceptStation+'</span>'+
										'</li>');
						$('#track-list-ul').append($li);
					}
					
				}else{
						$('.track-list div').show();
					}
			}else{alert(json.message);}
		},
		error:function(){
			alert("交互异常");
		}
	});
	$.ajax({
		type:"post",
		dataType: "json",
        contentType: "application/x-www-form-urlencoded",//表单提交
        data:sendData,
        xhrFields: {withCredentials: true},
        crossDomain:true,
		url:host+"/terminal/orderItem/details",
		success:function(json){
			if(json.code==2000){
				var $orderItem=json.data.orderItem;
				($orderItem.shippingCode!=null)?$('#orderNumber span').text($orderItem.shippingCode):$('#orderNumber span').text("暂无数据");
				($orderItem.shipperName!=null)?$('#logisCompany span').text($orderItem.shipperName):$('#logisCompany span').text("暂无数据");
				if($orderItem.orderShipping!=null){
					$('#takeAddress span').text($orderItem.orderShipping.address);
					$('#takePostcode').html($orderItem.orderShipping.zip);
					$('#taker').html($orderItem.orderShipping.fullName);
					$('#takerPhone').html($orderItem.orderShipping.mobile);
				}
				else{
					$('#takeAddress span').text("暂无数据");
					$('#takePostcode').html('暂无数据');
					$('#taker').html('暂无数据');
					$('#takerPhone').html('暂无数据');
				}			
			}else{alert(json.message);}
		},
		error:function(){
			alert("交互异常");
		}
	});
}


$(function(){
	//设置选项卡
	        $(".btn>li").click(function () {
	           // alert($(this).index());
	            var elem=$("#main"+$(this).index());
	            elem.css("display","block");
	            $(this).css({backgroundColor:"#EF6E09",color:"#fff",borderColor:"#EF6E09"});
				$(this).siblings().css({backgroundColor:"#fff",color:"#000",borderColor:"#e5e5e5"});
	            elem.siblings().hide();
	        })
	//查看物流	
			/*$(".checkLogistics-btn").bind('click',function(){
				$(".order").hide();
				$(".logistics-info").show();
			});*/
			$("#reture").bind('click',function(){
				$(".order").show();
				$(".logistics-info").hide();
			})
	})
	

$(function(){
	//所有订单全选、全不选、取消全选
	$("#checkedAll").click(function(){
		this.checked?$("#main0 input").prop('checked',true):$("#main0 input").prop('checked',false);
	});
	var chks = $(".main0Div input");
	chks.click(function(){
		for (var i=0;i<chks.length;i++) {
			if(!$(chks[i]).is(':checked')){				
				$("#checkedAll").attr('checked',false);
			}			
		}
	});

	 $("#main1checkall").click(function(){
	 	this.checked?$("#main1 input").prop('checked',true):$("#main1 input").prop('checked',false);
	 })
	var chks1 = $(".main1Div input");
	chks1.click(function(){
		for (var i=0;i<chks1.length;i++) {
			if(!$(chks1[i]).is(':checked')){				
				$("#main1checkall").attr('checked',false);
			}			
		}
	});
	 $("#main2checkall").click(function(){
	 	this.checked?$("#main2 input").prop('checked',true):$("#main2 input").prop('checked',false);
	 })
	 var chks2 = $(".main2Div input");
	chks2.click(function(){
		for (var i=0;i<chks2.length;i++) {
			if(!$(chks2[i]).is(':checked')){				
				$("#main2checkall").attr('checked',false);
			}			
		}
	});
	 $("#main3checkall").click(function(){
	 	this.checked?$("#main3 input").prop('checked',true):$("#main3 input").prop('checked',false);
	 })
	 var chks3 = $(".main3Div input");
	 chks3.click(function(){
		for (var i=0;i<chks3.length;i++) {
			if(!$(chks3[i]).is(':checked')){				
				$("#main3checkall").attr('checked',false);
			}			
		}
	});
	//每个订单全选全不选
	$(".ch").click(function(){
		$input=$(this).parent().parent().parent().children().find("input");
		this.checked?$input.prop('checked',true):$input.prop('checked',false);	  			 	
	})
	
})

