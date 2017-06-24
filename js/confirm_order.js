$(document).ready(function(){
	/------点击打开遮罩层---------/ 
	$(".alter").click(function(){
		$("#mask_layer").css("display","block");
	});
	$("#address span").eq(1).click(function(){
		$("#mask_layer").css("display","block");
	});
	$("#add_address").click(function(){
		$("#mask_layer").css("display","block");
	});

/--------------------------添加新地址---------------------------------/ 
	$("#add_address").click(function(){
		$("#add_new_address").css("display","block");
	});
	$("#add_new_address").find("span").eq(0).click(function(){
		$("#mask_layer").css("display","none");
		$("#add_new_address").css("display","none");
	});

	/**点击检测，添加联系人**/
	$("#new_address_submit").on("click",function(){
        var aAddressLength = $("#add_new_address input");

        /************************检测填写内容是否规范************************/
        var flaa = flab = flac = flad = fale = flaf = 0;
        /****封装一个验证内容的函数****/
        function contentVerify(index,information,regexp){
        	if (!regexp) {
                if (aAddressLength[index].value != "" && aAddressLength[index].value != information) {
	            	if(index == 0){
                        flaa = 1;
	            	}
	            	if(index == 1){
                        flab =1;
	            	}
		        	aAddressLength[index].style.color = "rgb(167,167,167)";
		        	aAddressLength[index].style.border = "1px solid rgb(231,231,231)";
	            }else{
	            	aAddressLength[index].value = information;
		        	aAddressLength[index].style.color = "red";
		        	aAddressLength[index].style.border = "1px solid red";
	            }
        	}else{
        		if (regexp.test(aAddressLength[index].value)) {
		        	if (index == 2) {
		        		flac = 1;
		        	}
		        	if(index == 3){
		        		flad = 1;
		        	}
		        	if(index ==4){
		        		flaf = 1;
		        	}
		        	aAddressLength[index].style.color = "rgb(167,167,167)";
		        	aAddressLength[index].style.border = "1px solid rgb(231,231,231)";
		        }else{
		        	aAddressLength[index].value = information;
		        	aAddressLength[index].style.color = "red";
		        	aAddressLength[index].style.border = "1px solid red";
		        }
		    }
        }
        /***用户名验证***/
        contentVerify(0,"用户名不正确!");
        /***地址验证***/
        contentVerify(1,"地址不能为空!");
        /***手机号码验证***/
        contentVerify(2,"手机格式不正确!",/^1[34578]\d{9}$/);
        /***固定号码验证***/
        contentVerify(3,"固定号码格式不正确!",/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/);
        /***邮政编码验证***/
        contentVerify(4,"邮政编码格式不正确!",/[1-9]\d{5}$/);
        /***地区验证***/
        var cd = $(".chioce_district");
        for(var i = 0;i < cd.length; i++){
        	cd[i].index = 0;
            if(cd[i].value=="请选择"){
            	cd[i].style.border = "1px solid red";
            }else{
            	cd[i].style.border = "1px solid rgb(231,231,231)";
            	cd[i].index = 1;
            }
            cd[i].onfocus = function(){
            	this.style.border = "1px solid rgb(231,231,231)";
            }
        }
        /***鼠标onfocus事件***/
        for(var i = 0;i < aAddressLength.length;i++){
            aAddressLength[i].onfocus = function(){
            	this.style.border = "1px solid rgb(231,231,231)";
            	this.style.color = "rgb(167,167,167)";
            }
        }
   
        /*********确认以上格式是否正确，正确执行以下代码**********/
        if(flaa==flab==flac==flad==flaf==1&&cd[0].index==cd[1].index==cd[2].index==1){
            var _html = "";
	        _html = '<p>&nbsp;<input type="radio" name="chioce_address" value=""/>&nbsp;&nbsp;&nbsp;';
	        _html += aAddressLength[0].value;
	        _html += '&nbsp;' + $("#s_province").val() + '&nbsp;' + $("#s_city").val() + '&nbsp;' +$("#s_county").val();
	        _html += '&nbsp;' + aAddressLength[1].value + '&nbsp;';
	        _html += aAddressLength[4].value + '&nbsp;';
	        _html += aAddressLength[2].value;
	        _html += '<span><a href="javascript:void(0)">删除</a></span><span>修改&nbsp;&nbsp;</span></p>';
	        
	        $("#address_box").append(_html);
	        $("#mask_layer").css("display","none");
			$("#add_new_address").css("display","none");
        };
        //return false;
	});


	/-------------选择配送快递，时间，支付方式------------/ 
	$(".alter").each(function(i){
		var that = 0;
        $(".alter").eq(i).on("click",function(){
        	that = i;
			$(this).parent().next().show();
		}).parent().next().find("span").eq(0).on("click",function(){
			$(this).parent().parent().css("display","none");
			$("#mask_layer").hide();	
		}).stop().parent().parent().find("input").eq(-1).on("click",function(){
			var inputLength = $(this).parent().find("input");
			for(var i = 0;i < inputLength.length;i++){
	            if(inputLength[i].checked == true){
	            	if(that == 0){
	            		var express = inputLength[i].value;
	                    express = express.substr(0,4);
	            	}else{
	            		var express = inputLength[i].value;
	            	};
	            };
			};
			$(".bigbox3").find("p").eq(that).text(express);
			$(this).parent().css("display","none");
			$("#mask_layer").hide();	
		});
	})
	$.ajax({
	    type : "post",
	    url  : "http://dr.promontory7.cn/DrAgriculture-0.1/admin/homePage/index",
	    success : function(data){
            console.log(data);
	    }
	})


});