var formatMoudleName = function(val,row){
	if(row.vmt_guid =='00000000-0000-0000-0000-000000000000' || row.vmt_guid == row.base_template_id){
		return row.name;
	}else{
		return row.template_version_name
	}
}
var formatParentMoudleName = function(index,row){
	if(row.vmt_guid =='00000000-0000-0000-0000-000000000000' || row.vmt_guid == row.base_template_id){
		return '';
	}else{
		return row.name;
	}
}
var showDes=function(val, row, index) {
	var abValue = val;
	return '<a title="' + val + '" class="note">' + abValue + '</a>';
}
var checkData,refresh;

var formatMouldStatus = function(val,row){
	return val==0?'正常':(val==1?'锁定':'错误');
}
$(document).ready(function(){
	refresh = function(){
		modTable.getData();
	}
	var modTable = $('#dgwrap').deskTable({
		url:'../'+parent.desk.server.getUrl('moudleList'),
		type:'get',
		mark:'vmt_guid',
		keys:[{title:'模板名称',key:'name',width:'20%',formatter:formatMoudleName},{title:'父模板',key:'template_version_name',formatter:formatParentMoudleName},{title:'描述',key:'description'},{title:'状态',key:'status',formatter:formatMouldStatus},{title:'集群',key:'vds_group_name'},{title:'数据中心',key:'storage_pool_name'}],
		sort:0,
		headAlign:'left',//默认均为left
		bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
		page:1,
		checkBox:true,
		//size:5,
		width:'',
		rowHeight:40,
		height:600,
		oddColor:'#FFFFFF',
		evenColor:'#f6f7fB',
		click:function(obj){
			if(parent.desk.userType =='security'){return;}
			if(obj && obj.parentObj && this.checkBox){
				//$(obj.parentObj.checkBox).attr('checked',true);
				$(obj.parentObj.checkBox).click();
			}
		},
		checked:function(obj,arr,unCheckArr){
			if(parent.desk.userType =='security'){return;}
			var color = obj.checked?'#DFF5FE':obj.orginColor;
			$(obj.dom).css('backgroundColor',color);
			obj.dom.lastColor = color;
			if(arr.length){
				var editFlag = true;
				var delFlag = true;
				$.each(arr,function(i,n){
					var row = this.baseInfo;
					if(row.vmt_guid == row.base_template_id){
						delFlag = false;
					}
					if(row.status != 0 || row.vmt_guid == '00000000-0000-0000-0000-000000000000'){
						delFlag = false;
						editFlag = false;
					}
				});
				if(arr.length>1){
					editFlag = false;
				}
				if(parent.desk.userType =='security'){
					delFlag = false;	
				}
				if(delFlag){
					$('.mouldDelete').removeClass('disableBtn');
				}else{
					$('.mouldDelete').addClass('disableBtn');
				}
				if(editFlag){
					$('.mouldEdit').removeClass('disableBtn');
				}else{
					$('.mouldEdit').addClass('disableBtn');
				}
				checkData = arr;
			}else{
				checkData = [];
				$('.mouldDelete').addClass('disableBtn');
				$('.mouldEdit').addClass('disableBtn');
			}
		},
		mouseOver:function(obj){
			$(obj.dom).css('backgroundColor','#DFF5FE');
		},
		mouseOut:function(obj){
			$(obj.dom).css('backgroundColor',obj.checked?'#DFF5FE':obj.orginColor);
		},
		callback:function(table){
			var a = table.getEle(null,1);
			$.each(a,function(i,n){
				this.dom.title = this.data;
				$(this.dom).tooltip({
					track:true,
					width:300
				});
			});
		}
	});

	$('.mouldEdit').bind('click',function(e){
		if(!checkData){return;}
		parent.popBox.show(e);
	});
	$('.mouldDelete').bind('click',function(e){
		//if(!checkData){return;}
		parent.popBox.show(e);
	});

	parent.deskRefresh.dynamic = [];
	parent.deskRefresh.dynamic.push(refresh);
		
	parent.setIframe($(document).height());
	$(".menu-item").each(function(index, element) {
		$(this).css("height","33px");
	});
});
