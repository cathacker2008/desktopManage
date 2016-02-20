// JavaScript Document
$(document).ready(function(){
	var ckData = moudleTable.window.checkData;
	var name = '';
	$.each(ckData,function(i,n){
		if(this.baseInfo.vmt_guid =='00000000-0000-0000-0000-000000000000' || this.baseInfo.vmt_guid == ckData.base_template_id){
			name += this.baseInfo.name + ' ';
		}else{
			name += this.baseInfo.template_version_name + ' ';
		}
	});
	$('.ckMoudle').html(name);
	var submit = function(){
		new taskList('删除','删除','正在删除',ckData,function(task,dom){
			var tmpName = '';
			if(task.baseInfo.vmt_guid =='00000000-0000-0000-0000-000000000000' || task.baseInfo.vmt_guid == task.baseInfo.base_template_id){
				tmpName = task.baseInfo.name;
			}else{
				tmpName = task.baseInfo.template_version_name;
			}
			$(dom.name).html(tmpName);
			desk.server.request({url:'moudleAction',path:task.baseInfo.vmt_guid,action:'/delete'},null,function(data){
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
				$(task.checkBox).click();
				popBox.reSize();
				moudleTable.window.refresh();
			},'get');
		});
	}
	var cancel = function(){
		window.popBox.hide();
	}
	$('#mouldDeleteSubmit').bind('click',submit);	
	$('#mouldDeleteCancel').bind('click',cancel);
});
