/* create By Lynn 2017-04-01*/


//双击进入编辑状态
  	$(function(){
  		$("table").find("input").dblclick(function(){
  			$(this).attr("readonly",false);
  		})
  		setTimeout(function(){$(".tip").css("visibility",'hidden')},2000);
  	})
  //表单验证
$(function(){ 
	$("input").blur(function(){ 
	//判断一下鼠标离开谁了 
		if($(this).is("#inputUser")){ 
			if(!/^[a-zA-Z0-9_-]{6,20}$/.test(this.value)){
        		$(this).next().text("*用户名是6~20个字母或数字");
        		
			}
			else{
				$(this).next().text("");
				$(this).next().append("<img style='width: 18px;' src='img/勾 (1).png' />");
			} 
		} 
		if($(this).is("#inputMail")){ 		
			var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/; 
			//var $email = $("#inputMail").val(); 
			if(!reg.test(this.value)){ 
				$(this).next().text("*邮箱不合法");
			}
			else{
				$(this).next().text("");
				$(this).next().append("<img style='width: 18px;' src='img/勾 (1).png' />");
			} 
		} 
		if($(this).is("#inputPhone")){ 		
			var reg = /^1[3|4|5|7|8][0-9]\d{8}$/; 
		//	var $phone = $("#inputPhone").val(); 
			if(!reg.test(this.value)){ 
				$(this).next().text("*手机号码格式错误");
			}
			else{
				$(this).next().text("");
				$(this).next().append("<img style='width: 18px;' src='img/勾 (1).png' />");
			} 
		}
		if($(this).is("#inputBirthday")){ 		
			var reg = /^(19|20)\d{2}-(1[0-2]|0?[1-9])-(0?[1-9]|[1-2][0-9]|3[0-1])$/; 
			var birthday = $("#inputBirthday").val(); 
			if(!reg.test(birthday)){ 
				$(this).next().text('*出生日期格式不符合（请用"-"隔开）');
			}
			else{
				$(this).next().text("");
				$(this).next().append("<img style='width: 18px;' src='img/勾 (1).png' />");
			} 
		} 
	}) 
})

//获取会员信息
$(function(){
	$.ajax({
		xhrFields: {
			withCredentials: true
        },
        crossDomain: true,
		url:host+"/terminal/user/detail", 
		success:function(json){
			if(json.code==2000){
				console.log(json.message);
				$("#inputUser").val(json.data.user.username);
				$("#selSex").val(json.data.user.gender);
				$("#inputPhone").val(json.data.user.mobile);
				$("#inputMail").val(json.data.user.email);
				$("#inputBirthday").val(json.data.user.birthday);
				//$("#inputName").val(json.data.user.username);
			}else{
				alert(json.message);
			}
		},
		error:function(){
			alert("交互异常");
		},
	});
})
//保存修改的信息
$(function(){
	$(".info-save").click(function(){
		save();
	})
	$(".info-save").keydown(function(e){
		if(e.keyCode==13){
			save();
		}	
	})
})	
//修改会员信息
function save(){
	var sendData={
		username:$("#inputUser").val(),
	//	password:,
		mobile:$("#inputPhone").val(),
		email:$("#inputMail").val(),
	//	phone:,
		gender:$("#selSex").val(),
	//	verificationCode:
	};
	$.ajax({
		type:"post",
		dataType: "json",
        contentType: "application/x-www-form-urlencoded",//表单提交
        data:sendData,//json对象
        xhrFields: {withCredentials: true},
        crossDomain: true,
		url:host+"/terminal/user/update",
		beforeSend:function(){
			$(".info-save").prop("disabled",true);
			$(".info-save").text("正在保存...");
		},
		success:function(json){
		
				alert(json.message);
			
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
