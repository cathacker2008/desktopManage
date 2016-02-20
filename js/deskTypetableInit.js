var checkData,refresh;	
var editIndex = undefined;
var isSave = false;
function endEditing(){
	if (editIndex == undefined){return true}
	if ($('#dg').datagrid('validateRow', editIndex)){

		$('#dg').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
function closeEdit(index){
	if(index != editIndex){
		$('#dg').datagrid('endEdit', editIndex);
		editIndex = undefined;
	}
}
function edit(index,dom){
	isSave = false;
	if ((editIndex == undefined)||(editIndex != index)){

		if (endEditing()){
			$('#dg').datagrid('selectRow', index)
				.datagrid('beginEdit', index);
			$(dom).attr('class','icon-save optStyle');
     		editIndex = index;
		} else {
			$('#dg').datagrid('selectRow', editIndex);
			$(dom).attr('class','icon-bianji optStyle');
		}

	}else{
		isSave = true;
		if(endEditing()){
			$(dom).attr('class','icon-bianji optStyle');
		}
	}
}
var showIcon = function(val,row,col){
	if(parent.desk.userType =='security'){return;}
	row.button = $dc.createDom('div:deskType-editButton','',null,null);
	row.button.pic = $dc.createDom('span:icon-edit-box','',null,row.button);
	row.button.info = $dc.createDom('span:','',{html:' 编辑'},row.button);
	row.button.checkFlag = false;
	$(row.button).hover(function(){
		$(this).css('color','#269ED4');
		$(this).css('borderColor','#269ED4');
	},function(){
		$(this).css('color',this.checkFlag?'#269ED4':'#656D78');
		$(this).css('borderColor',this.checkFlag?'#269ED4':'#CCD1D9');
	});
	$(row.button).bind('click',function(e){
		e.stopPropagation();
		if(!this.checkFlag){
			$.each(col.parentObj.child,function(i){
				if(i!=4){
					this.changeToInput();
				}
			});
			$(col.parentObj.child[0].input).attr('maxLength',64).attr('title',parent.tip.map['VM_NAME']);
			$(col.parentObj.child[1].input).attr('maxLength',64);
			$(col.parentObj.child[2].input).attr('maxLength',3).attr('title',parent.tip.map['CPU_NUM']);
			$(col.parentObj.child[3].input).attr('maxLength',10).attr('title',parent.tip.map['MEM_NUM']);
			$(this.pic).attr('class','icon-save');
			$(this.info).html(' 保存');
			this.checkFlag = true;
		}else{
			var name = $dc.confirmaction(col.parentObj.child[0].input,'VM_NAME',parent.tip.map,true);
			var cpu = $dc.confirmaction(col.parentObj.child[2].input,'CPU_NUM',parent.tip.map,true);
			var mem = $dc.confirmaction(col.parentObj.child[3].input,'MEM_NUM',parent.tip.map,true);
			if(!(name&&cpu&&mem)){return;}
			var obj = {};
			obj.description = $(col.parentObj.child[1].input).val();
			obj.desktop_type_name = $(col.parentObj.child[0].input).val();
			obj.num_socket = $(col.parentObj.child[2].input).val();
			obj.mem_size = $(col.parentObj.child[3].input).val();
			parent.desk.server.request({url:'edittype',path:row.type_id,action:'/update'},obj,function(data){
				$.each(col.parentObj.child,function(i){
					if(i!=4){
						this.changeToText();
					}
				});
				refresh();
				if(data.success == true){
					parent.tip.showResult({status:0,info:data.msg?data.msg:''});
				}else{
					parent.tip.showResult({status:2,info:data.msg?data.msg:''});
				}
			},'post');
			this.checkFlag = false;
			$(this.pic).attr('class','icon-edit-box');
			$(this.info).html(' 编辑');
		}
	});
	return row.button;
}
$(document).ready(function(){
	refresh = function(){
		deskTypeTable.getData();
	}
	var deskTypeTable = $('#dgwrap').deskTable({
		url:'../'+parent.desk.server.getUrl('desktoptype'),
		type:'get',
		mark:'type_id',
		keys:[{title:'类型名称',key:'type_name',width:'20%'},{title:'描述',key:'type_description'},{title:'CPU',key:'v_cpu'},{title:'内存(MB)',key:'v_memory'},{title:'操作',key:'',formatter:showIcon}],
		sort:0,
		headAlign:'left',//默认均为left
		bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
		page:1,
		checkBox:parent.desk.userType =='security'?false:true,
		//size:5,
		width:'',
		rowHeight:40,
		height:600,
		oddColor:'#FFFFFF',
		evenColor:'#f6f7fB',
		click:function(obj){
			if(parent.desk.userType =='security'){return;}
			if(obj && obj.parentObj && this.checkBox){
				$(obj.parentObj.checkBox).click();
			}
		},
		checked:function(obj,arr,unCheckArr){
			if(parent.desk.userType =='security'){return;}
			var color = obj.checked?'#DFF5FE':obj.orginColor;
			$(obj.dom).css('backgroundColor',color);
			obj.dom.lastColor = color;
			if(arr.length){
				$('.desktypeDelete').removeClass('disableBtn');
				checkData = arr;
			}else{
				$('.desktypeDelete').addClass('disableBtn');
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
				//$(this.dom).tooltip({
					//track:true,
					//width:300
				//});
			});
		}
	}); 
	if(parent.desk.userType =='security'){
		$('.desktypeAdd').addClass('disableBtn');	
	}else{
		$('.desktypeAdd').bind('click',parent.popBox.show);
	}
	$('.desktypeDelete').bind('click',function(e){
		parent.popBox.show(e);
	});
	parent.deskRefresh.dynamic = [];
	parent.setIframe($(document).height());
	$(".menu-item").each(function(index, element) {
		$(this).css("height","33px");
	});
});
