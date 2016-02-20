// JavaScript Document
$(document).ready(function(){
	var ckData = deskManageTable.window.checkData;
	var obj = {};
	obj.data = {};
	var submit = function(){
		obj.data.description = $('#snapName').val();
		obj.data.vm_id = ckData.vm_guid;
		desk.server.request('createsnapshot',obj.data,function(data){
			popBox.hide();
			if(data.success == true){
				tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			deskManageTable.refresh();
		},'post');
	}
	var cancel = function(){
		window.popBox.hide();
	}
	$('#creatSnapSubmit').bind('click',submit);	
	$('#creatSnapCancel').bind('click',cancel);
});
