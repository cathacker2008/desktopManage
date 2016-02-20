var formatName = function(val,row){
	if(row.user_group == 'user'){
		return (row.surname?row.surname:'')+' '+(row.name?row.name:'');
	}else{
		return '';
	}
}
var formatUser = function(val,row){
	return row.user_group == 'user'?row.username:row.name;
}
$(document).ready(function(){
	var ckData;
	var tmpData = parent.deskManageTable.window.checkData[0].baseInfo;
	var userTable = $('#dgwrap').deskTable({
		url:'../'+parent.desk.server.getUrl({url:'deskpoolallotuser',path:tmpData.vm_pool_id,action:'/users'}),
		type:'post',
		keys:[{title:'姓名',key:'name',formatter:formatName,width:'40%'},{title:'用户名',key:'username',formatter:formatUser}],
		sort:0,
		headAlign:'left',//默认均为left
		bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
		page:1,
		checkBox:false,
		//size:5,
		width:560,
		rowHeight:40,
		height:198,
		oddColor:'#FFFFFF',
		evenColor:'#f6f7fB',
		click:function(obj){
			if(obj && obj.parentObj){
				if(ckData){
					ckData.checked = false;
					$(ckData.dom).css('backgroundColor',ckData.orginColor);
				}
				$(obj.parentObj.dom).css('backgroundColor','#DFF5FE');
				obj.parentObj.checked = true;
				ckData = obj.parentObj;
				$('.unActivateDisk').removeClass('disableBtn');
			}
		},
		mouseOver:function(obj){
			$(obj.dom).css('backgroundColor','#DFF5FE');
		},
		mouseOut:function(obj){
			$(obj.dom).css('backgroundColor',obj.checked&&ckData?'#DFF5FE':obj.orginColor);
		},
		callback:function(table){
				$('.unActivateDisk').addClass('disableBtn');
		}
	});

	var del = function(e){
		var cname = e.currentTarget.className;
		if(cname.indexOf('disableBtn')!=-1){
			return;
		}
		var obj = {};
		obj.user_id = ckData.baseInfo.user_id;
		parent.desk.server.request({url:'deskpoolallotuser',path:tmpData.vm_pool_id,action:'/removePermission'},obj,function(data){
			if(data.success == true){
				ckData = null;
				parent.tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				parent.tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			userTable.getData();
		},'post');	
	}
	$('.activateDisk').bind('click',function(e){
		var cname = e.currentTarget.className;
		if(cname.indexOf('disableBtn')!=-1){
			return;
		}
		parent.popBox.show({currentTarget:{className:'dsallotUser'}});
	});
	$('.unActivateDisk').bind('click',del);
	$('.dmDeskCancel').bind('click',parent.popBox.hide);
	$('.dmDeskSubmit').bind('click',parent.popBox.hide);
});

