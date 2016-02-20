// JavaScript Document
$(document).ready(function(){
	var ckData = moudleTable.window.checkData[0].baseInfo;
	var isSecurity = (desk.userType=='security'?true:false);
	var obj = {};
	obj.data = {};
	//$('#mouldSec').deskSelect({	
		//desk_sel_width:369,
		//desk_sel_height:36,
		//picTop:14,
		//desk_pic_down:'./images/xiajiantou03.png',
		//desk_pic_up:'./images/xiajiantou04.png',
		//callback:function(param){
			//obj.data[this.key] = param.val;
		//},
		//key:'security_classification',
		//item:[{'opt':'内部',val:'Internal'},{'opt':'秘密',val:'Secrets'},{'opt':'机密',val:'Confidential'}],
		//disable:!isSecurity,
		//def_item:{val:ckData.security_classification}
		//});
	$('#mouldName').attr('maxLength',64).attr('placeholder',tip.map['VM_NAME']);
	$('input').placeholder();
	$('#mouldName').val((ckData.vmt_guid==ckData.base_template_id)?ckData.name:ckData.template_version_name);
	if(ckData.vmt_guid==ckData.base_template_id){
		$('#mouldName').val(ckData.name);
		$('#mouldName').attr('disabled','disabled');
	}else{
		$('#mouldName').val(ckData.template_version_name);
		$('#mouldName').removeAttr('disabled');
	}
	$('#mouldDetials').val(ckData.description);
	if(isSecurity){
		$('#mouldName').attr('disabled','disabled');
		$('#mouldDetials').attr('disabled','disabled');
	}
	var submit = function(){
		if(!$dc.confirmaction($('#mouldName')[0],'VM_NAME',tip.map)){return;}
		obj.data['version_name'] = $('#mouldName').val();
		obj.data['description'] = $('#mouldDetials').val();
		//if(isSecurity && !obj.data.security_classification){
			//$('#mouldSec').css('borderColor','red');
			//return;
		//}else{
			//$('#mouldSec').css('borderColor','#DEE5F5');
		//}
		desk.server.request({url:'moudleAction',path:ckData.vmt_guid,action:'/update'},obj.data,function(data){
		popBox.hide();
			if(data.success == true){
				tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			moudleTable.window.refresh();
		},'post');
	}
	var cancel = function(){
		window.popBox.hide();
	}
	$('#mouldEditSubmit').bind('click',submit);	
	$('#mouldEditCancel').bind('click',cancel);
});
