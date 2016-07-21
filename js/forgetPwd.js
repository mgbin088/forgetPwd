(function(){
	var verify={};//与表单验证相关的对象
	verify.inputData={};//保存用户输入的数据
	verify.reg=[/1[378]\d{9}/,/\w{6,8}/];//用来验证手机号是否合法
	verify.isTrue=[false,false,false,false];//用于判断所有输入域是否合法
	verify.verTrue=[false,false];//用于发送验证码

	//与验证相关的各元素
	var user_tel=$('input[name=user_tel]')[0];
	var user_veri=$('input[name=user_veri]')[0];
	var user_newPwd=$('input[name=newPwd]')[0];
	var user_rePwd=$('input[name=rePwd]')[0];
	var indexTel=0;//用于统计用户输入验证码的个数
	var indexCode=0;//用于统计用户输入手机号的个数
	//验证手机号是否合法
	verify.verTel=function(){
		if(user_tel.value){
			//当用户输入信息
			if(!verify.reg[0].test(user_tel.value)){
				//当输入不合法时
				$('.error_hint').html('手机号格式不正确');
				$('.error_hint').css('visibility','visible');
			}else{
				$('.error_hint').css('visibility','hidden');
				verify.inputData.tel=user_tel.value;
				verify.isTrue[0]=true;
				verify.verTrue=[true,true];
			}
		}else{
			//当用户没有输入信息
			$('.error_hint').html('请输入手机号');
			$('.error_hint').css('visibility','visible');
		}
	}
	//验证手机验证码是否正确
	verify.verCode=function(){
		if(user_veri.value){
			//当用户输入验证码
			if(user_veri.value==verify.sendMes){
				//当验证码输入正确时
				$('.error_hint').css('visibility','hidden');
				verify.isTrue[1]=true;
				verify.verTrue=[true,true];
				verify.nextStep();
			}else{
				//当验证码输入不正确时
				$('.error_hint').html('验证码错误');
				$('.error_hint').css('visibility','visible');
			}
		}else{
			//当用户没有输入验证码
			$('.error_hint').html('请输入验证码');
		}
	}

	//发送短信验证码
	verify.getMessage=function(){
		verify.sendMes='1234';//模拟验证码
	}

	//发送短信验证码
	verify.message=function(){
		var i=1;//辅助倒计时的实现
		user_veri.focus();//让验证码输入框自动获得焦点
		if(verify.verTrue[0]){
			verify.getMessage();//获得模拟发送的验证码
			verify.verTrue[0]=false;
		}else{
			$('.error_hint').html('手机号不合法');
		}
		if(verify.verTrue[1]){
			var timer=setInterval(function(){
				$('#getVeri').html((60-i)+'秒后重新获取');
				i++;
				if(i>60){
					clearInterval(timer);
					verify.verTrue=[true,true];
					$('#getVeri').html('获取手机验证码');
				}
			},1000);
			verify.verTrue[1]=false;
		}else{
			$('.error_hint').html('手机号不合法');
		}
	}

	//当信息都合法时，下一步可点击
	verify.nextStep=function(){
		if(verify.isTrue[0]&&verify.isTrue[1]){
			$('.next_step_txt').css('background','#00d3db');
		}
	}

	//验证密码是否合法
	verify.newPwd=function(){
		if(user_newPwd.value){
			//当用户输入密码后
			if(verify.reg[1].test(user_newPwd.value)){
				$('.pwd_err_hint').css('visibility','hidden');
				verify.isTrue[2]=true;
				verify.inputData.newPwd=user_newPwd.value;
			}else{
				$('.pwd_err_hint').html('密码格式不正确');
				$('.pwd_err_hint').css('visibility','visible');
			}
		}else{
			$('.pwd_err_hint').html('密码不能为空');
			$('.pwd_err_hint').css('visibility','visible');
		}
	}
	//验证再次输入密码是否和原密码相同
	verify.rePwd=function(){
		if(user_rePwd.value==verify.inputData.newPwd){
			//当两次密码一致时
			verify.inputData.rePwd=user_rePwd.value;
			$('.pwd_err_hint').css('visibility','hidden');
		}else{
			//当两次密码不一致时
			$('.pwd_err_hint').html('密码不一致');
			$('.pwd_err_hint').css('visibility','visible');
		}
	}

	//为相关元素绑定事件
	user_tel.onblur=verify.verTel;
	$('#getVeri')[0].onclick=verify.message;
	user_newPwd.onblur=verify.newPwd;
	user_rePwd.onblur=verify.rePwd;
	$('.next_step_txt')[0].onclick=function(){
		if(verify.isTrue[0]&&verify.isTrue[1]){
			$('.ver_pwd_mode').fadeIn('slow');
		}
	}
	user_veri.onkeyup=function(){
		indexCode++;
		if(indexCode%4==0){//此处假设验证码为4位
			verify.verCode();
		}
	}
})();