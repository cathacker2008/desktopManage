var key = { SHIFT:16, CTRL:17};    
var selectIndex = {firstSelectRowIndex:0, lastSelectRowIndex:0};  
var inputFlags = {isShiftDown:false, isCtrlDown:false}  

function keyPress(event){//响应键盘按下事件
	var e = event || window.event;    
	var code = e.keyCode | e.which | e.charCode;        
	switch(code) {    
		case key.SHIFT:    
			inputFlags.isShiftDown = true;  
			$('#dg').datagrid('options').singleSelect = false;  

			break;  
		case key.CTRL:  
			inputFlags.isCtrlDown = true;  
			$('#dg').datagrid('options').singleSelect = false;             
		default:          
	}  
}  

function keyRelease(event) { //响应键盘按键放开的事件

	var e = event || window.event;    
	var code = e.keyCode | e.which | e.charCode;        
	switch(code) {    
		case key.SHIFT:   
			inputFlags.isShiftDown = false;  
			selectIndex.firstSelectRowIndex = 0;  
			$('#dg').datagrid('options').singleSelect = true;              
			break;  
		case key.CTRL:  
			inputFlags.isCtrlDown = false;  
			selectIndex.firstSelectRowIndex = 0;  
			$('#dg').datagrid('options').singleSelect = true;  
			break;  
		default:          
	}  
}  
var refresh = function(){
	parent.desk.server.request({url:'deskaction',path:parent.deskManageTable.window.checkData.vm_guid,action:'/snapshots'},null,function(data){
		$("#dg").datagrid({
			data:data
		});
	});
}
$(document).ready(function(){
	var checkData = parent.deskManageTable.window.checkData;
	var ckData;
	$('#dg').datagrid("resize",{
		width:590,
		height:280
	});
	var selectConfig = {
		desk_sel_width:120,
		desk_sel_height:36,
		picTop:14,
		def_item:1,
		desk_pic_down:'../images/xiajiantou03.png',
		desk_pic_up:'../images/xiajiantou04.png',
		callback:function(param){
			//this.li.input = this.input;
			//this.li.key = param.val;
		},
		item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'所属池',val:'pool'},{'opt':'所属用户',val:'user'}]
	}
	$('.cSelectPanel').deskSelect(selectConfig);
	//$(window.frameElement).css('width',600);
	
	
	parent.desk.server.request({url:'deskaction',path:checkData.vm_guid,action:'/snapshots'},null,function(data){
		$("#dg").datagrid({
			data:data,
			onClickRow:function(index,row){
				ckData = row;
				$('.unActivateDisk').removeClass('disableBtn');
				$('.delDisk').removeClass('disableBtn');
				if(index != selectIndex.firstSelectRowIndex && !inputFlags.isShiftDown ){    
					selectIndex.firstSelectRowIndex = index;
				}             
				if(inputFlags.isShiftDown ) {  
					$('#dg').datagrid('clearSelections');  
					selectIndex.lastSelectRowIndex = index;  
					var tempIndex = 0;  
					if(selectIndex.firstSelectRowIndex > selectIndex.lastSelectRowIndex ){  
						tempIndex = selectIndex.firstSelectRowIndex;  
						selectIndex.firstSelectRowIndex = selectIndex.lastSelectRowIndex;  
						selectIndex.lastSelectRowIndex = tempIndex;  
					}  
					for(var i = selectIndex.firstSelectRowIndex ; i <= selectIndex.lastSelectRowIndex ; i++){  
						$('#dg').datagrid('selectRow', i);     
					}     
				}             
			}
		});	
	},'get');

	//var submit = function(){
	
	//}
	var clone = function(){
		if(!ckData){return;}
		//parent.desk.server.request({url:'snapshotaction',path:ckData.snapshot_id,action:'/clone'},{})
	}
	var delSnap = function(){
		if(!ckData){return;}
		parent.desk.server.request({url:'snapshotaction',path:ckData.snapshot_id,action:'/delete'},{vm_id:ckData.vm_id},function(data){
			if(data.success == true){
				parent.tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				parent.tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			refresh();	
		},'post');
	}
	$('.activateDisk').bind('click',function(){
		parent.popBox.show({currentTarget:{className:'createSnap'}});
	});
	$('.delDisk').bind('click',delSnap);
	$('.dmDeskCancel').bind('click',parent.popBox.hide);
	$('.dmDeskSubmit').bind('click',parent.popBox.hide);
});


