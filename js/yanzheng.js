$('.signUp_code_yanzheng').codeVerify({
    type : 1,
	 width : '100px',
	 height : '38px',
	fontSize : '12px',
	codeLength : 4,
	ready : function() {
	},
	success : function() {
		alert('验证匹配！');
	},
	error : function() {
		alert('验证码不匹配！');
	}
});
$('.varify-input-code').attr("placeholder","请输入验证码");