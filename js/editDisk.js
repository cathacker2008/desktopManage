$(document).ready(function(){
	var ckData = deskManageTable.diskData;
	$('#diskName').attr('maxLength',64).attr('placeholder',tip.map['VM_NAME']);
	$('#expendDiskSize').attr('maxLength',10).attr('placeholder',tip.map['EXPEND_DISK_SIZE']);
	$('input').placeholder();
	$('#diskName').val(ckData.disk_alias);
	$('#diskSize').val(Math.round((ckData.size/1073741824)*100)/100);
	$('#expendDiskSize').val(0);
	$('#diskDescription').val(ckData.disk_description);
	var check = function(){
		var a = $dc.confirmaction($('#diskName')[0],'VM_NAME',tip.map);
		var b = $dc.confirmaction($('#expendDiskSize')[0],'EXPEND_DISK_SIZE',tip.map);
		return a&&b;
	}
	var submit = function(){
		if(!check()){return;}
		var param = {};
		var tmpData = deskManageTable.singleFlag?deskManageTable.singleData:deskManageTable.checkData;
		param.vm_id = tmpData.vm_guid;
		param.alias = $('#diskName').val();
		param.extendsize = $('#expendDiskSize').val();
		param.description = $('#diskDescription').val();
		desk.server.request({url:'diskaction',path:ckData.image_guid,action:'/update'},param,function(data){
			if(data.success == true){
				tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			parent.deskManageTable.cc(1);
		},'post');
	}
	$('.dmDeskSubmit').bind('click',submit);
	$('.dmDeskCancel').bind('click',function(){
		parent.deskManageTable.cc(1);
	});
});
