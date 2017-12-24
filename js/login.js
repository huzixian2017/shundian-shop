submit();
function submit(){
var login_username=document.getElementById("login_username");
var login_pass=document.getElementById("login_pass");
var login_submit=document.getElementsByClassName("login_submit")[0];
var login_user_cue=document.getElementsByClassName("login_user_cue")[0];
var login_pass_cue=document.getElementsByClassName("login_password_cue")[0];
var er1 = document.getElementsByClassName("er1")[0];
var er2 = document.getElementsByClassName("er2")[0];
login_submit.onclick = function(){
	if(login_username.value!=""&&login_pass.value!=""){
		login_user_cue.innerHTML = "";
		login_pass_cue.innerHTML= "";
		er1.className="er1";
		er2.className="er2";
		$.ajax({
		type:"post",
			data:{uName:login_username.value,uPassword:login_pass.value},
			url: "http://139.199.79.192:8081/ShunDian/login.do",
			success:function(data){
				console.log(data);
				if(data!="false"){
					login_user_cue.innerHTML="";
					login_pass_cue.innerHTML="";
					window.location.href="index.html";
				}else if(data=="false"){
					login_pass_cue.innerHTML="用户名错误";
					login_user_cue.innerHTML = "用户密码错误";
				}
			}
		});
	}else{
		login_user_cue.innerHTML = "请填写用户名";
		login_pass_cue.innerHTML = "请填写密码";
		er1.className+=" error";
		er2.className+=" error";
		}
	}
}
