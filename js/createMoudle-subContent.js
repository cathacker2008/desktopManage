// JavaScript Document
$(document).ready(function(){
	var ckData = deskManageTable.window.singleFlag?deskManageTable.window.singleData:deskManageTable.window.checkData;
	var obj = {};
	obj.data = {};
	obj.map = [
		'dmDeskName',
		'dmDeskDetials',
		'dmDeskCluster',
	];
	$('#dmDeskCluster').val(ckData.storage_pool_name);
	$('#dmDeskName').attr('maxLength',64).attr('placeholder',tip.map['VM_NAME']);
	$('#dmDeskDetials').attr('maxLength',255);
	var check = function(){
		var a = $dc.confirmaction($('#dmDeskName')[0],'VM_NAME',tip.map);
		return a; 
	}
	$('input').placeholder();
	var submit = function(){
		if(!check()){return ;}
		obj.data.template_name = $('#dmDeskName').val();
		obj.data.description = $('#dmDeskDetials').val();
		
			obj.data.vm_Id = ckData.vm_guid;
		
		desk.server.request('createmoudle',obj.data,function(data){
			
			if(data.success == true){
				tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			popBox.hide();
		},'post');
	}
	var cancel = function(){
		window.popBox.hide();
	}
	$('#dmDeskSubmit').bind('click',submit);	
	$('#dmDeskCancel').bind('click',cancel);
});
