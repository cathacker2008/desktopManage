// JavaScript Document
$(document).ready(function(){
	var obj = {};
	obj.data = {};
	obj.map = [
		'first_name',
		'last_name',
		'username',
		'password',
		'group',
		'email'
		
	];
	
	var defaultobjModel= {
		desk_sel_width:367,
		desk_sel_height:36,
		picTop:14,
		def_item:0,
		desk_pic_down:'./images/xiajiantou03.png',
		desk_pic_up:'./images/xiajiantou04.png',
		callback:function(param){
			if(param.val == 'internal'){
				$('#createUserSubmit').css('cursor','not-allowed');
				$('#createUserSubmit').css('background-color','#CBCCD1');
				$('input:not(:button)').attr('readOnly','true').css('background-color','#CACCD1').css('border','1px solid #E5E9EF');
				$('.tip').html('');
				$('.domainTip').fadeIn();
			}else{
				$('#createUserSubmit').css('cursor','pointer');
				$('#createUserSubmit').css('background-color','#0590CC');
				$('input:not(:button)').removeAttr('readOnly').css('background-color','white');
				$('.domainTip').fadeOut();
			}
			obj.data[this.key] = param.val;
		}
	}
	
	$('#username').attr('maxLength',50).attr('placeholder',tip.map['USERNAME']);
	$('#password').attr('maxLength',20).attr('placeholder',tip.map['STRONGPASSWORD']);
	var check = function(){
		var a = $dc.confirmaction($('#username')[0],'USERNAME',tip.map);
		var b = $dc.confirmaction($('#password')[0],'STRONGPASSWORD',tip.map);
		var c = $dc.confirmaction($('#email')[0],'MAIL',tip.map);
		return a&&b&&c;
	}
	parent.desk.server.getDomain(function(arr){
		var DomainItem=$.extend({},defaultobjModel,{key:'domain',item:arr});
		$('#Domain').deskSelect(DomainItem);
	});
	
	var submit = function(){
		if(obj.data.domain =='internal'){return;}
		if(!check()){return;}
		var len = obj.map.length;
		if(len ==0) {return;}
		for(var i=0;i<len;i++){
			obj.data[obj.map[i]] =$('#'+obj.map[i]).val();
			if(i == len-1){
				obj.data.username = obj.data.username.trim();
				desk.server.request('createuser',obj.data,function(data){
					popBox.hide();
					if(data.success == true){
						tip.showResult({status:0,info:data.msg?data.msg:''});
					}else{
						tip.showResult({status:2,info:data.msg?data.msg:''});
					}
					userManageTable.refresh();
				},'post');
			}
		}
	}
	var cancel = function(){
		window.popBox.hide();
	}
	$('#createUserSubmit').bind('click',submit);	
	$('#createUserCancel').bind('click',cancel);
});
