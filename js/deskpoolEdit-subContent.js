$(document).ready(function(){
	var obj = {};
	var isSecurity = desk.userType =='security'?true:false;
	obj.data = {};
	var defaultobjModel= {
		desk_sel_width:367,
		desk_sel_height:36,
		picTop:14,
		//def_item:0,//如果设置此值，def_val无效
		desk_pic_down:'./images/xiajiantou03.png',
		desk_pic_up:'./images/xiajiantou04.png',
		callback:function(param){
			obj.data[this.key] = param.val;
		}
	}
	obj.map = ['vm_pool_name','description','pool_prestart','num_desktop'];
	var ckData = deskManageTable.window.checkData[0].baseInfo;
	if(deskManageTable.window.dataFlag){
		ckData=deskManageTable.window.popData;
	}
	$('#vm_pool_name').val(ckData.vm_pool_name);
	$('#description').val(ckData.vm_pool_description);
	$('#pool_prestart').val(ckData.prestarted_vms);
	if(isSecurity){
		$('#vm_pool_name').css('background-color','#CACCD1');
		$('#vm_pool_name').attr('disabled','disabled');	
		$('#description').css('background-color','#CACCD1');
		$('#description').attr('disabled','disabled');	
		$('#pool_prestart').css('background-color','#CACCD1');
		$('#pool_prestart').attr('disabled','disabled');	
		$('#num_desktop').css('background-color','#CACCD1');
		$('#num_desktop').attr('disabled','disabled');	
	}
	$('#vm_pool_sec').deskSelect($.extend({},defaultobjModel,{disable:!isSecurity,def_item:{val:ckData.security_classification},key:'security_classification',item:[{'opt':'内部',val:'0'},{'opt':'秘密',val:'1'},{'opt':'机密',val:'2'}]}));
	$('#vm_pool_name').attr('maxLength',64).attr('placeholder',tip.map['VM_NAME']);
	$('#pool_prestart').attr('maxLength',4).attr('placeholder',tip.map['PREPARE_START_NUM']);
	$('#num_desktop').attr('maxLength',4).attr('placeholder',tip.map['ADD_VM_NUM']);
	var check = function(){
		var a = $dc.confirmaction($('#vm_pool_name')[0],'VM_NAME',tip.map);
		var b = $dc.confirmaction($('#pool_prestart')[0],'PREPARE_START_NUM',tip.map);
		var c = $dc.confirmaction($('#num_desktop')[0],'ADD_VM_NUM',tip.map);
		return a&&b&&c; 
	}
	$('input').placeholder();
	var submit = function(){
		dataFlag=false;
		if(!check()){return ;}
		if(isSecurity && !obj.data.security_classification){
			$('#vm_pool_sec').css('borderColor','red');
			return;
		}else{
			$('#vm_pool_sec').css('borderColor','#DEE5F5');
		}
		obj.data.vm_pool_name = $('#vm_pool_name').val();
		obj.data.description = $('#description').val();
		obj.data.pool_prestart = $('#pool_prestart').val();
		obj.data.num_desktop = $('#num_desktop').val();
		obj.data['pool_id'] = ckData.pool_id;
		obj.data['templateId'] = ckData.vmt_guid;
		obj.data['desktop_type_id'] = ckData.desktop_type_id;
		desk.server.request({url:'editpool',path:ckData.pool_id,action:'/update'},obj.data,function(data){
			popBox.hide();
			if(data.success == true){
				tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			deskManageTable.window.refresh();
		},'post');
	}
	var cancel = function(){
		dataFlag=false;
		window.popBox.hide();
	}
	$('#dmDeskpoolEditSubmit').bind('click',submit);	
	$('#dmDeskpoolEditCancel').bind('click',cancel);
});
