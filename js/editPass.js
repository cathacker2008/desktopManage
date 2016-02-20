$(document).ready(function(){
	var obj = {};
	obj.data = {};
	$('#nowPassword').attr('maxLength',20);
	$('#password').attr('maxLength',20);
	$('#c_password').attr('maxLength',20);
	$('input').placeholder();
	$('.tipInfo').html(tip.map['PASSWORD']);
	var check = function(){
		var b = $dc.confirmaction($('#password')[0],'PASSWORD',tip.map);
		var c = $dc.confirmaction($('#c_password')[0],'PASSWORD',tip.map);
		var a = ($('#password').val() == $('#c_password').val())?true:false;
		if(b&&c&&(!a)){
			$('.tip').html('两次密码输入不一致!');
		}
		if(b&&c&&a){
			$('.tip').html('');
		}
		return a&&b&&c;
	}
	var submit = function(){
		if(!check()){return;}
		desk.server.request('getuserinfo',null,function(data){
			if(data.username != undefined && data.domain != undefined){
				obj.data.username = data.username;
				obj.data.domain = data.domain;
				obj.data.oldPassword = $('#nowPassword').val();
				obj.data.newPassword = $('#password').val();
				desk.server.request('changepwd',obj.data,function(rData){
					popBox.hide();
					if(rData.success){
						tip.showResult({status:0,info:rData.msg?rData.msg:''});
					}else{
						tip.showResult({status:2,info:rData.msg?rData.msg:''});
					}
				},'post');
			}else{
				tip.showResult({status:2,info:'获取用户信息失败'});
			}
		},'get');
	}
	var cancel = function(){
		window.popBox.hide();
	}
	$('#dmDeskpoolSubmit').bind('click',submit);	
	$('#dmDeskpoolCancel').bind('click',cancel);
});

