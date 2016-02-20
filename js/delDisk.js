$(document).ready(function(){
	var ckData = deskManageTable.window.diskData;
	var submit = function(){
		parent.desk.server.request({url:'diskaction',path:ckData.disk_id,action:'/delete'},null,function(data){
			popBox.hide();
			if(data.success == true){
				tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			deskManageTable.cc(1);
		},'get');
	}
	var cancel = function(){
		deskManageTable.cc(1);
	}
	$('#ckPool').html(ckData.disk_alias+'磁盘');
	$('#dmDeskpoolEditSubmit').bind('click',submit);	
	$('#dmDeskpoolEditCancel').bind('click',cancel);
});

