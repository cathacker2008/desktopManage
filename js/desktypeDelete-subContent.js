$(document).ready(function(){
	var ckData = deskManageTable.window.checkData;
	var name = '';
	$.each(ckData,function(i){
		name += this.baseInfo.type_name + ' ';
	});
	$('.ckType').html(name);
	var submit = function(){
		new taskList('删除','删除','正在删除',ckData,function(task,dom){
			var tmpName = '';
			$(dom.name).html(task.baseInfo.type_name);
			desk.server.request({url:'edittype',path:task.baseInfo.type_id,action:'/delete'},null,function(data){
				if(data.success == true){
					$(dom.pic).removeClass('icon-flavors');
					$(dom.pic).addClass('icon-check-fill');
					$(dom.pic).css('color','#8CC152');
					$(dom.result).html('删除成功');	
				}else{
					$(dom.pic).removeClass('icon-flavors');
					$(dom.pic).addClass('icon-cancel-fill');
					$(dom.dom).css('color','#FC8203');
					$(dom.result).html(data.msg);	
				}
				popBox.reSize();
				deskManageTable.window.refresh();
			},'get');
		});
	}
	var cancel = function(){
		window.popBox.hide();
	}
	$('#dmDeskpoolSubmit').bind('click',submit);	
	$('#dmDeskpoolCancel').bind('click',cancel);
});
