$(document).ready(function(){
	if(!deskManageTable.window.checkData){
		return;
	}
	var nametmp="";
	var ckData = deskManageTable.window.checkData;
	var obj = {};
	obj.data = {};
	obj.map = [
		'dmDeskpoolName',
		'dmDeskpoolDetials',
		'dmDeskpoolPreNum',
		'dmDeskpoolAddnum'
	];
	if (ckData.length > 1) {
		for (var i= 0;i<ckData.length;i++) {
			nametmp += ckData[i].baseInfo.vm_pool_name + ' ';
		}
		}else{
			nametmp=ckData[0].baseInfo.vm_pool_name + ' ';
		}
	$('#ckPool').html(nametmp);
	var submit = function() {
		if (ckData.length > 1) {
				new taskList('删除','删除','正在删除',ckData,function(task,dom){
				var tmpName = '';
				tmpName=task.baseInfo.vm_pool_name;
				$(dom.name).html(tmpName);
				desk.server.request({url:'editpool',path:task.baseInfo.vm_pool_id,action:'/delete'},null,function(data){
					if(data.success == true){
						$(dom.pic).removeClass('icon-flavors');
						$(dom.pic).addClass('icon-check-fill');
						$(dom.pic).css('color','#8CC152');
						$(dom.result).html('删除成功');
						//deskManageTable.window.showlistFlag=false;

					}else{
						$(dom.pic).removeClass('icon-flavors');
						$(dom.pic).addClass('icon-cancel-fill');
						$(dom.dom).css('color','#FC8203');
						$(dom.result).html(data.msg);
					}
					$(task.checkBox).click();
					deskManageTable.window.refresh();
					deskManageTable.window.vmTbRefresh();
					popBox.reSize();
				},'get');
			});
		} else {
			parent.desk.server.request({
				url: 'editpool',
				path: ckData[0].baseInfo.vm_pool_id,
				action: '/delete'
			}, null, function (data) {
				popBox.hide();
				if (data.success==true) {
					tip.showResult({status: 0, info: data.msg ? data.msg : ''});
				} else {
					tip.showResult({status: 2, info: data.msg ? data.msg : ''});
				}
				$(ckData[0].checkBox).click();
				deskManageTable.window.refresh();
				deskManageTable.window.vmTbRefresh();
			}, 'get');
		}
	}

	var cancel = function(){
		window.popBox.hide();
	}

	$('#dmDeskpoolEditSubmit').bind('click',submit);
	$('#dmDeskpoolEditCancel').bind('click',cancel);
});
