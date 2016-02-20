$(document).ready(function(){
	$('#diskName').attr('maxLength',64).attr('placeholder',tip.map['VM_NAME']);
	$('#diskSize').attr('maxLength',10).attr('placeholder',tip.map['DISK_SIZE']);
	$('input').placeholder();
	var check = function(){
		var a = $dc.confirmaction($('#diskName')[0],'VM_NAME',tip.map);
		var b = $dc.confirmaction($('#diskSize')[0],'DISK_SIZE',tip.map);
		return a&&b;
	}

	var submit = function(){
		if(!check()){return;}
		var param = {};
		var tmpData = parent.deskManageTable.window.singleFlag?parent.deskManageTable.window.singleData:parent.deskManageTable.window.checkData;
		param.alias = $('#diskName').val();
		param.disk_size = $('#diskSize').val();
		param.description = $('#diskDescription').val();
		desk.server.request({url:'deskaction',path:tmpData.vm_guid,action:'/addDisk'},param,function(data){
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
