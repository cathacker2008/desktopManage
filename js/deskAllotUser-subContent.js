var formatName = function(val,row){
	return (row.firstname?row.firstname:'')+' '+(row.lastname?row.lastname:'');
}

$(document).ready(function(){
	var parentIframe = parent.deskManageTable || parent.userManageTable;
	var checkData = parentIframe.checkData;
	var ckData;
	var userSearchTabel = $('#dgwrap').deskTable({
		url:'../'+parent.desk.server.getUrl('getuser'),
		type:'post',
		keys:[{title:'姓名',key:'firstname',width:'20%'},{title:'用户名',key:'name'}],
		sort:0,
		headAlign:'left',//默认均为left
		bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
		pageTurnDisable:true,
		//page:1,
		checkBox:false,
		//size:5,
		width:560,
		rowHeight:40,
		height:260,
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
			}
		},
		mouseOver:function(obj){
			$(obj.dom).css('backgroundColor','#DFF5FE');
		},
		mouseOut:function(obj){
			$(obj.dom).css('backgroundColor',obj.checked?'#DFF5FE':obj.orginColor);
		},
		callback:function(table){
			//var a = table.getEle(null,1);
			//$.each(a,function(i,n){
				//this.dom.title = this.data;
				//$(this.dom).tooltip({
					//track:true,
					//width:300
				//});
			//});
		}
	});
	var obj = {};
	parent.desk.server.getDomain(function(arr){
		var selectConfig = {
			desk_sel_width:160,
		desk_sel_height:36,
		picTop:14,
		def_item:0,
		desk_pic_down:'../images/xiajiantou03.png',
		desk_pic_up:'../images/xiajiantou04.png',
		callback:function(param){
			obj.domain = param.val;
		},
		key:'domain',
		item:arr
		};
		$('.cSelectPanel').deskSelect(selectConfig);
	});
	var search = function(){
		obj.searchString = $('#searchString').val();
		userSearchTabel.setParam('param',obj);
		userSearchTabel.getData();
	}
	$('.search').bind('click',search);
	var pushInDesk = function(){
		if(!ckData){
			parent.deskManageTable.cc(2);
			return;
		}
		parent.desk.server.request({url:'deskaction',path:checkData.vm_guid,action:'/addPermission'},{domain:obj.domain,user_id:ckData.baseInfo.id,type:ckData.baseInfo.type},function(data){
			parent.popBox.hide();
			if(data.success == true){
				parent.tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				parent.tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			parent.deskManageTable.cc(2);
		},'post');
	}
	var pushInDomain = function(){
		if(!ckData){
			parent.popBox.hide();
			parent.userManageTable.refresh();
			return;
		}
		parent.desk.server.request('adduser',{domain:obj.domain,user_id:ckData.baseInfo.id,type:ckData.baseInfo.type},function(data){
			parent.popBox.hide();
			if(data.success == true){
				parent.tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				parent.tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			parent.userManageTable.refresh();
		},'post');
	}


	var submit = function(){
			if(parent.deskManageTable){
				pushInDesk();
			}else if(parent.userManageTable){
				pushInDomain();
			}
	}
	$('.dmDeskCancel').bind('click',function(){
			if(parent.deskManageTable){
				parent.deskManageTable.cc(2);
			}else if(parent.userManageTable){
				parent.popBox.hide();
				parent.userManageTable.refresh();
			}
	});
	$('.dmDeskSubmit').bind('click',submit);
});
