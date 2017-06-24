


/* create By Lynn 2017-04-01*/
$(function(){
		$(".new-address-table input").blur(function(){
			if($(this).is("#cellphone")){ 		
				var reg = /^1[3|4|5|7|8][0-9]\d{8}$/; 
				var $cellphone = $("#cellphone").val(); 
				if(!reg.test($cellphone)){ 
					$(this).next().text("*手机号码格式错误");
				}
				else{
					$(this).next().text("");
					$(this).next().append("<img style='width: 18px;' src='img/勾 (1).png' />");
				} 
			}
		})
	})

//新增收货地址
$(function(){
	
	$(".info-save").click(function(){
		saveAdd();
	})
	$("#zip").keydown(function(e){
		if(e.keyCode==13){
			saveAdd();
		}	
	})
})
function saveAdd(){
	var sendData={
		fullName:$("#fullName").val(),
		province:$("#s_province").val(),
		city:$("#s_city").val(),
		district:$("#s_county").val(),
		address:$("#address").val(),
		mobile:$("#cellphone").val(),
	//	email:$("#inputMail").val(),
		phone:$("#telephone").val(),
		zip:$('#zip').val()
	
	};
	$.ajax({
		type:"post",
		dataType: "json",
        contentType: "application/x-www-form-urlencoded",//表单提交
        data:sendData,
        xhrFields: {withCredentials: true},
        crossDomain:true,
		url:host+"/terminal/shipping/add",
		
		beforeSend:function(){
			$(".info-save").prop("disabled",true);
			$(".info-save").text("正在保存...");
		},
		success:function(json){			
				
				if(json.code==2000){
			window.location.reload();		
				}else{
					alert(json.message);
				}
		
		},
		error:function(){
			alert("交互异常");
		},
		complete:function(){
			$(".info-save").prop("disabled",false);
			$(".info-save").text("保存");
		}
	});
}


//获得当前用户默认地址
$(function(){
	$.ajax({
		url:host+"/terminal/shipping/getDefault",
        xhrFields: {withCredentials: true},
        crossDomain: true,
		success:function(json){
				if(json.code==2000){
					var $defaultAddress=$('<div id="'+json.data.shipping.code+'" class="default-address">'+
			    				'<div class="default-address-head">'+
			    					'<span style="margin-left: 38px;">'+json.data.shipping.fullName+'</span>'+
			    					'<span >'+json.data.shipping.province+'</span>'+
			    					'<span >'+json.data.shipping.zip+'</span>'+
			    					'<span>'+
			    						'<button onclick="edit(this)">编辑</button>|'+
			    						'<button onclick="$(\'#cancerOrderModal\').toggle();$(\'.bg-grey\').show();sessionStorage.code=$(this).parent().parent().parent().attr(\'id\')">删除</button>'+
			    					'</span>'+
			    				'</div>'+
			    				'<div class="default-address-contain">'+
			    					'<table>'+
			    						'<tr>'+
			    							'<td>收货人：</td><td>'+json.data.shipping.fullName+'</td>'+
			    						'</tr>'+
			    						'<tr>'+
			    							'<td>所在地区：</td>'+
			    							'<td><span>'+json.data.shipping.province+'</span>'+
			    								'<span>'+json.data.shipping.city+'</span>'+
			    								'<span>'+json.data.shipping.district+'</span>'+
			    							'</td>'+
			    						'</tr>'+
			    						'<tr>'+
			    							'<td>地址：</td><td>'+json.data.shipping.address+'</td>'+
			    						'</tr>'+
			    						'<tr>'+
			    							'<td>手机：</td><td>'+json.data.shipping.mobile+'</td>'+
			    						'</tr>'+
			    						'<tr>'+
			    							'<td>固话：</td><td>'+json.data.shipping.phone+'</td>'+
			    						'</tr>'+
			    					'</table>'+
			    				'</div>'+
			    				
			    				'<div class="default-address-footer" style="display:block;">'+
			    					'<img style="float: right;margin-top: -17px;" src="img/默认.png">'+
			    				'</div>'+
			    			'</div>');
					$('.old-address').append($defaultAddress);
				}else{
					alert(json.message);
				}
		},
		error:function(){
			alert("交互异常");
		}
	});
})

//获得收货地址
$(function(){
	$('.old-address').children().remove();
	$.ajax({
		url:host+"/terminal/shipping/list",
        xhrFields: {withCredentials: true},
        crossDomain: true,
		success:function(json){
			if(json.code==2000){
				for (var i=0;i<json.data.shippings.length;i++) {
				//	if(json.data.shippings[i].defaultShipping=="false"){
						var $allAddress=$('<div id="'+json.data.shippings[i].code+'" class="default-address '+json.data.shippings[i].defaultShipping+'">'+
			    				'<div class="default-address-head">'+
			    					'<span style="margin-left: 38px;">'+json.data.shippings[i].fullName+'</span>'+
			    					'<span >'+json.data.shippings[i].province+'</span>'+
			    					'<span >'+json.data.shippings[i].zip+'</span>'+
			    					'<span>'+
			    						'<button onclick="edit(this)">编辑</button>|'+
			    						'<button onclick="$(\'#cancerOrderModal\').toggle();$(\'.bg-grey\').show();sessionStorage.code=$(this).parent().parent().parent().attr(\'id\')">删除</button>'+
			    					'</span>'+
			    				'</div>'+
			    				'<div class="default-address-contain" >'+
			    					'<table>'+
			    						'<tr>'+
			    							'<td>收货人：</td><td>'+json.data.shippings[i].fullName+'</td>'+
			    						'</tr>'+
			    						'<tr>'+
			    							'<td>所在地区：</td>'+
			    							'<td><span>'+json.data.shippings[i].province+'</span>'+
			    								'<span>'+json.data.shippings[i].city+'</span>'+
			    								'<span>'+json.data.shippings[i].district+'</span>'+
			    							'</td>'+
			    						'</tr>'+
			    						'<tr>'+
			    							'<td>地址：</td><td>'+json.data.shippings[i].address+'</td>'+
			    						'</tr>'+
			    						'<tr>'+
			    							'<td>手机：</td><td>'+json.data.shippings[i].mobile+'</td>'+
			    						'</tr>'+
			    						'<tr>'+
			    							'<td>固话：</td><td>'+json.data.shippings[i].phone+'</td>'+
			    						'</tr>'+
			    					'</table>'+
			    				'</div>'+
			    				'<button onclick="setDefault(this)" class="default-reset">设为默认地址</button>'+
			    				'<div class="default-address-footer" style="display: none;">'+
			    					'<img style="float: right;margin-top: -17px;" src="img/默认.png">'+
			    				'</div>'+
			    			'</div>');
					$('.old-address').append($allAddress);
					$('.true').remove();
				//	}
				}
			}else{alert(json.message);}
				
		},
		error:function(){
			alert("交互异常");
		}
	});	
})

//设置默认地址
function setDefault(e){
	var sendData={
		code:$(e).parent().attr('id')
	};
	$.ajax({
		type:"post",
		dataType: "json",
        contentType: "application/x-www-form-urlencoded",//表单提交
        data:sendData,
        xhrFields: {withCredentials: true},
        crossDomain:true,
        url:host+"/terminal/shipping/setDefault",
        success:function(json){
        	
        	if(json.code==2000){
        			$(e).next().show()&&$(e).hide();
        			window.location.reload();
        	}else{
        		alert(json.message);
        	}
        	
        },
        error:function(){
        	alert('交互异常');
        }
	});
}

//编辑获得地址信息
	function edit(e){
		$('#editAddressModal').toggle();
		$('.bg-grey').show();
		sessionStorage.code=$(e).parent().parent().parent().attr('id');
		$('.zip').val($(e).parent().prev().text());		
		$(".fullname").val($(e).parent().prev().prev().prev().text());
		var $tbody=$(e).parent().parent().next().find('tbody');
		$("#selProvince").val($tbody.find('span').eq(0).text());
		$("#selCity").val($tbody.find('span').eq(1).text());
		$("#selCounty").val($tbody.find('span').eq(2).text());
		$(".address").val($tbody.children().eq(2).children().eq(1).text());
		$(".cellphone").val($tbody.children().eq(3).children().eq(1).text());
		$(".telephone").val($tbody.children().eq(4).children().eq(1).text());
	//	alert($tbody.find('span').eq(1).text());
	}

$(function(){
	
	//保存编辑地址
	$('#save-btn').click(function(){
		var sendData={
			code:sessionStorage.code,			
			province:$("#selProvince").val(),
			city:$("#selCity").val(),
			district:$("#selCounty").val(),
			address:$(".address").val(),
			mobile:$(".cellphone").val(),
			phone:$(".telephone").val(),
			zip:$('.zip').val(),
			fullName:$(".fullname").val()
		};
	$.ajax({
		type:"post",
		dataType: "json",
        contentType: "application/x-www-form-urlencoded",//表单提交
        data:sendData,
        xhrFields: {withCredentials: true},
        crossDomain:true,
		url:host+"/terminal/shipping/update",
		beforeSend:function(){sendData.fullName},
		success:function(json){
				
			if(json.code==2000){
			window.location.reload();		
				}else{
					alert(json.message);
				}
		},
		error:function(){
			alert('交互异常');
		},
		complete:function(){
			$('#editAddressModal').toggle();
			$('.bg-grey').hide();
		}
	})
		
		
	})
	//删除地址
	$('#sure-btn').click(function(){
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
		url:host+"/terminal/shipping/delete",
		success:function(json){
			if(json.code==2000){
			window.location.reload();		
				}else{
					alert(json.message);
				}
		},
		error:function(){
			alert('交互异常');
		},
		complete:function(){
			$('#cancerOrderModal').toggle();
			$('.bg-grey').hide();
		}
	})
		
		
	})
})
