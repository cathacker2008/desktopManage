// JavaScript Document
$(document).ready(function(){
	var ckData = userManageTable.window.checkData;
	var name = '';
	var len = ckData.length;
	$.each(ckData,function(i,n){
		name += this.baseInfo.surname +' '+ this.baseInfo.name +((i >=len-1)?'':'，');
	});
	$('.ckMoudle').html(name);
	var submit = function(){
		new taskList('删除','删除','正在删除',ckData,function(task,dom){
			var tmpName = task.baseInfo.surname + ' ' + task.baseInfo.name;
			$(dom.name).html(tmpName);
			desk.server.request({url:'deluser',path:task.baseInfo.user_id,action:'/delete'},null,function(data){
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
				userManageTable.window.refresh();
			},'get');
		});
		return;
		desk.server.request({url:'deluser',path:ckData.user_id,action:'/delete'},null,function(data){
			popBox.hide();
			if(data.success == true){
				userManageTable.window.checkData = null;
				tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			userManageTable.window.refresh();
		},'get');
	}
	var cancel = function(){
		window.popBox.hide();
	}
	$('#mouldDeleteSubmit').bind('click',submit);	
	$('#mouldDeleteCancel').bind('click',cancel);
});

