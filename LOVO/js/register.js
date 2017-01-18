
function main(){
	 var _reg={
	    "account":/^\w{6,12}$/g,//验证用户账号的长度够不够，并且限制只能字母数字下横线
	    "mobile":/^1[345678]\d{9}$/g,//验证手机号
	    "mail":/^\w+@([a-z0-9-]+\.)+[a-z]+$/gi,//验证邮箱
	    "secret":/^.{6,20}$/g,//验证密码
	    "huoQu":/^[0-9]{6}$/g
	}
	 var _nameFlag=0;
	 var _passwordFlag=0;
	 var _passwordFlagCopy=0;
	 var _yanZheng=0;
	 var _mobileNum=0;
	 //**************************手机格式*******************************************
	var _name=$(".zhuLeft div")[0].children[1];
	_name.onfocus=function(e){
		e=e||window.event;
		window.onkeydown=function(e){
			_name.style.color="#000";
			_name.style.fontWeight="100";
		}
	}
	_name.onblur=function(){
		_reg.mobile.lastIndex=0;
		if(_reg.mobile.test(this.value)){
			var _self=this;
			$.post("api/checkUser.php",{"condition":"name='"+this.value+"'"},function(data,textStatus){
				if(textStatus=="success" && parseInt(data) > 0){
					$(_self.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>该用户名已存在</span>");
				}else{
					$(_self.parentNode).next("span").html("<span class='right'></span><span class='normal'>该用户名可以使用</span>");
					_nameFlag=1;
				}
			});
		}else if(this.value==""){
			$(this.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>请输入您的手机号码</span>");
		}else{
			$(this.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>手机号格式错误</span>");
		}
		_reg.mobile.lastIndex=0;
	}
	//**********************密码*********************************
	var _password=$(".zhuLeft div")[1].children[1];
	_password.onfocus=function(e){
		e=e||window.event;
		window.onkeydown=function(e){
			_password.style.color="#000";
			_password.style.fontWeight="100";
		}
	}
	_password.onblur=function(){
		if(_reg.secret.test(this.value)){
			$(this.parentNode).next("span").html("<span class='right'></span><span class='normal'>密码验证通过</span>");
			_passwordFlag=1;
		}else{
			if(this.value==""){
				$(this.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>请输入您的密码</span>");
			}else{
				$(this.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>密码格式错误，请输入6-16位的数字和字母</span>");
			}
		}
		_reg.secret.lastIndex=0;
	}
	//**************************验证密码********************************
	var _passwordCopy=$(".zhuLeft div")[2].children[1];
	_passwordCopy.onfocus=function(e){
		e=e||window.event;
		window.onkeydown=function(e){
			_passwordCopy.style.color="#000";
			_passwordCopy.style.fontWeight="100";
		}
	}
	_passwordCopy.onblur=function(){
		if(this.value!=_password.value){
			$(this.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>两次密码输入不一致</span>");
		}else if(this.value==_password.value && _passwordFlag==1){
			$(this.parentNode).next("span").html("<span class='right'></span><span class='normal'>确认密码验证通过</span>");
			_passwordCopyFlag=1;
		}else{
			$(this.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>密码格式错误，请输入6-16位的数字和字母</span>");
		}
	}
	//**************************图片验证码********************************
	var _yanZheng=$(".zhuLeft div")[3].children[1];
	_yanZheng.onfocus=function(e){
		e=e||window.event;
		window.onkeydown=function(e){
			_yanZheng.style.color="#000";
			_yanZheng.style.fontWeight="100";
		}
	}
	_yanZheng.onblur=function(){//应该使用ajax来调；
		if(this.value==""){
			$(this.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>请输入图片验证码</span>");
		}else if(this.value=="6666"){
//			$(this.parentNode).next("span").html("<span class='right'></span><span class='normal'>图片验证码通过</span>");
			$(this.parentNode).next("span").html("");
		}else{
			$(this.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>图片验证码错误</span>");
		}
	}
	//**************************手机验证码********************************
	var _mobileNum=$(".zhuLeft div")[4].children[1];
	/*_mobileNum.onfocus=function(e){
		e=e||window.event;
		window.onkeydown=function(e){
			_mobileNum.style.color="#000";
			_mobileNum.style.fontWeight="100";
		}
	};*/
	var _huoQu=$("#huoQu")[0];
	var _timer=0;
	var _start=60;
	_huoQu.onclick=fn;
	function fn(){
		if(_name.value==""){//显示手机
			$(".zhuLeft div").eq(0).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>请输入您的手机号码!</span>")
		}else if(_yanZheng.value==""){
			$(".zhuLeft div").eq(3).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>请先输入图片验证码!</span>")
		}else if(_yanZheng.value!="6666"){
			$(".zhuLeft div").eq(4).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>图片验证码输入错误!</span>")
		}else{
			$(this.parentNode).next("span").html("<span class='right'></span><span class='normal'>验证码已发送成功!</span>");
			_yanZhengFlag=1;
			window.clearTimeout(_timer);
			_start--;
			_huoQu.innerHTML=_start+"s";
			if(_start>=0){
				_timer=window.setTimeout(fn,1000);
			}else{
				_huoQu.innerHTML="发送";
				_start=60;
			}
		}
	}
	
	_mobileNum.onblur=function(){
		if(_name.value==""){
			$(this.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>请输入6位手机验证码</span>");
		}else if(this.value=="666666"){
			$(this.parentNode).next("span").html("<span class='right'></span><span class='normal'>手机验证通过</span>");
			_mobileNum=1;
		}else{
			$(this.parentNode).next("span").html("<span class='error'></span><span class='normal' style='color:red;'>手机验证码失效 ，请重新获取！</span>");
		}
	}
	_btn=$(".zhuLeft .btn").eq(0).click(function(){
		var _params={
			"name":$(".zhuLeft div")[0].children[1].value,
            "password":$(".zhuLeft div")[1].children[1].value
		};
		if(_nameFlag==0){
			$(this.parentNode)[0].children[1].innerHTML="<span class='error'></span><span class='normal' style='color:red;'>请输入您的手机号码</span>";
		}else if(_passwordFlag==0){
			$(this.parentNode)[0].children[3].innerHTML="<span class='error'></span><span class='normal' style='color:red;'>请输入您的密码</span>";
		}else if(_passwordCopyFlag==0){
			$(this.parentNode)[0].children[5].innerHTML="<span class='error'></span><span class='normal' style='color:red;'>请输入您的密码</span>";
		}else if(_yanZheng==0){
			$(this.parentNode)[0].children[7].innerHTML="<span class='error'></span><span class='normal' style='color:red;'>请输入图片验证码</span>";
		}else if(_mobileNum==0){
			$(this.parentNode)[0].children[9].innerHTML="<span class='error'></span><span class='normal' style='color:red;'>请输入6位手机验证码</span>";
		}else{
			$.post("api/registerUser.php", _params, function (data,textStatus) {
                if (textStatus=="success" && parseInt(data) > 0) {
                    alert("您已顺利成为会员！！！");
                } else {
                    alert("尊敬的用户您好，您注册会员操作失败，请重试，或者联系管理员！！！");
                }
            });
		}
	});
}
window.onload=function(){
	main();//图片验证和手机验证有问题；
}
