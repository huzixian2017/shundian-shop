// 用户名的正则判断
var uPattern5 =/^[ ]+$/;
var er1 = document.getElementsByClassName("er1")[0];
var er2 = document.getElementsByClassName("er2")[0];
var er3 = document.getElementsByClassName("er3")[0];
var er4 = document.getElementsByClassName("er4")[0];
var signup_username = document.getElementById('signUp_username');
signup_username.onblur = function(){
	var checksU=checkusername();
	if(checksU==1){
		$.ajax({
			async: false,
			type:"post",
			data:{uName:signup_username.value},
			url: "http://139.199.79.192:8081/ShunDian/shijiao.do",
			success:function(data){
				console.log(data);
				if(data=="true"){
					user_cue.innerHTML="";
					return true;
				}else{
					user_cue.innerHTML = "用户名已存在!";
					er1.className+=" error";
					return false;
				}
			}
		});
	}
}
var user_cue = document.getElementsByClassName('signUp_user_cue')[0];
function checkusername(){
	// 登录账号不能全为数字,不为空，登录账号最少4个字符
	
	var uPattern1 = /^[a-zA-Z0-9]{4,}$/;
	var uPattern2 = /^\d{4,}$/;
	var uPattern3 =/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
	var uPattern4 =/0?(13|14|15|17|18|19)[0-9]{9}/;
	// 触发失焦事件
	var userVal = signup_username.value;
	user_cue.innerHTML = "";
	er1.className="er1";
	console.log(userVal);
	if((userVal&&!(uPattern5.test(userVal)))||(uPattern3.test(userVal))){
		if(!(uPattern1.test(userVal))){
			user_cue.innerHTML = "登录账号最少4个字符";
			er1.className+=" error";
			return 0;
		}else if((uPattern2.test(userVal))&&(uPattern4.test(userVal))){
			user_cue.innerHTML = "";
			return 1;
		}else if((uPattern2.test(userVal))&&(!uPattern4.test(userVal))){
			user_cue.innerHTML = "登录账号不能全为数字";
			er1.className+=" error";
			return 0;
		}else{
			user_cue.innerHTML="";
			return 1;
		}
	}else{
			user_cue.innerHTML ="用户名不能为空";
			er1.className+=" error";
			return 0;
	}		
}
// 验证验证码
var codeverify =document.getElementsByClassName("verify-code")[0];
var signUp_code_cue =document.getElementsByClassName("signUp_code_cue")[0];
var varify_input_code=document.getElementsByClassName('varify-input-code')[0];
varify_input_code.onblur = function(){
	checkCode();
}
function checkCode(){
	var codeVal = varify_input_code.value;
	signUp_code_cue.innerHTML ="";
	er2.className="er2";
	if(codeVal&&!(uPattern5.test(codeVal))){
		if(codeVal!=codeverify.innerText){
			signUp_code_cue.innerHTML="请正确填写验证码";
			er2.className+=" error";
			return 0;
		}else{
			signUp_code_cue.innerHTML="";
			return 1;
		}
	}else{
		signUp_code_cue.innerHTML="请正确填写验证码";
		er2.className+=" error";
			return 0;
	}
}
// 验证密码
function checkpassword(){
	// 6-20个字符，必须包含数字和大小写字母
	var regP=/^(?=.*?[A-Za-z]+)(?=.*?[0-9]+)(?=.*?[A-Z]).{6,20}$/;
		var passVal = signUp_pass.value;
		er3.className="er3";
		signup_password_cue.innerHTML="";
		if(passVal&&!(uPattern5.test(passVal))){
			if(!regP.test(passVal)){
				signup_password_cue.innerHTML="请填写密码，6-20个字符，必须包含数字和大小写字母";
				er3.className+=" error";
				return 0;
			}else{
				signup_password_cue.innerHTML="";
				return 1;
			}
		}else{
			signup_password_cue.innerHTML ="本项必填";
			er3.className+=" error";
			return 0;
		}
}
var signup_pass = document.getElementById('signUp_pass');
var signup_password_cue = document.getElementsByClassName('signUp_password_cue')[0];
signup_pass.onblur = function(){
	checkpassword();
}
// 验证重复密码的函数
function rcheckpwd(){
		var passagainVal=signup_passagain.value;
		signup_passagain_cue.innerHTML="";
		er4.className="er4";
		if(passagainVal&&!(uPattern5.test(passagainVal))){	
			if(passagainVal!=signUp_pass.value){
				signup_passagain_cue.innerHTML="密码与确认密码不相符，请重新填写";
				er4.className+=" error";
			}else{
				signup_passagain_cue.innerHTML="";
				return 1;
			}
		}else{
			signup_passagain_cue.innerHTML="请输入你的重复密码";
			er4.className+=" error";
			return 0;
		}
}
var signUp_pass=document.getElementById("signUp_pass");
var signup_passagain=document.getElementById("signup_passagain");
var signup_passagain_cue =document.getElementsByClassName("signUp_passwordAgain_cue")[0];
signup_passagain.onblur = function(){
	rcheckpwd();
}
function checkcheck(){
	var signup_check=document.getElementById("signup_check");
	if(signup_check.checked){
		return 1;
	}else{
		return 0;
	}
}
// 点击提交
function checksubmit(){
	checkusername();
	checkCode();
	checkpassword();
	rcheckpwd();
	checkcheck();
	if(checkusername()+checkCode()+checkpassword()+rcheckpwd()+checkcheck()==5){
		return true;
	}else{
		return false;
	}
}
var signup_sub=document.getElementsByClassName("signup_sub")[0];
signup_sub.onclick= function(){
	if(checksubmit()){
		$.ajax({
			async: false,
			type:"post",
			data:{uName:signup_username.value,uPassword:signUp_pass.value},
			url: "http://139.199.79.192:8081/ShunDian/reg.do",
			success:function(data){
				console.log(data);
				if(data!="false"){
					window.location.href='login.html';
				}
			}
		});
	}
}