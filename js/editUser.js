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
	var isSecurity = (parent.desk.userType == 'security'?true:false);
	var ckData;
	var tmpData = parent.deskManageTable.window.singleFlag?parent.deskManageTable.window.singleData:parent.deskManageTable.window.checkData;
	var userTable = $('#dgwrap').deskTable({
		url:'../'+parent.desk.server.getUrl({url:'deskaction',path:tmpData.vm_guid,action:'/users'}),
		type:'post',
		keys:[{title:'姓名',key:'name',formatter:formatName},{title:'用户名',key:'username',formatter:formatUser}],
		sort:0,
		headAlign:'left',//默认均为left
		bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
		page:1,
		checkBox:false,
		//size:5,
		width:560,
		rowHeight:40,
		height:200,
		oddColor:'#FFFFFF',
		evenColor:'#f6f7fB',
		click:function(obj){
			if(!isSecurity){return;}
			if(obj && obj.parentObj){
				$(obj.parentObj.dom).css('backgroundColor','#DFF5FE');
				obj.parentObj.checked = true;
				ckData = obj.parentObj.baseInfo;
				$('.unActivateDisk').removeClass('disableBtn');
			}
		},
		mouseOver:function(obj){
			$(obj.dom).css('backgroundColor','#DFF5FE');
		},
		mouseOut:function(obj){
			$(obj.dom).css('backgroundColor',obj.checked?'#DFF5FE':obj.orginColor);
		},
		callback:function(table){
			var a = table.getEle();
			if(a.length){
				$('.activateDisk').addClass('disableBtn');
			}else{
				$('.unActivateDisk').addClass('disableBtn');
				if(!isSecurity){return;}
				$('.activateDisk').removeClass('disableBtn');	
			}
		}
	});
	var submit = function(){
	}
	var del = function(e){
		var cname = e.currentTarget.className;
		if(cname.indexOf('disableBtn')!=-1){
			return;
		}
		var obj = {};
		obj.user_id = ckData.user_id;
		parent.desk.server.request({url:'deskaction',path:tmpData.vm_guid,action:'/removePermission'},obj,function(data){
			if(data.success == true){
				parent.tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				parent.tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			userTable.getData();
		},'post');	
	}
	if(isSecurity){
		$('.activateDisk').bind('click',function(e){
			var cname = e.currentTarget.className;
			if(cname.indexOf('disableBtn')!=-1){
				return;
			}
			parent.popBox.show({currentTarget:{className:'allotUser'}});
		});
		$('.unActivateDisk').bind('click',del);
	}else{
		$('.unActivateDisk').addClass('disableBtn');
		$('.activateDisk').addClass('disableBtn');
	}

	$('.dmDeskCancel').bind('click',parent.popBox.hide);
	$('.dmDeskSubmit').bind('click',parent.popBox.hide);
});

