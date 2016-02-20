	
$(document).ready(function(){
	var data;
	var aa = function(){
		parent.PCC.subMenu = $dc.createDom('div:popMenuPanel','',{},$(parent.document.body).find('.popContent')[0]);	
		parent.PCC.subContent = $dc.createDom('div:subPopContent','',{},$(parent.document.body).find('.popContent')[0]);	
				$(parent.PCC.subMenu).deskMenu({
					ulClassName:'popMenu',
					menuItems:[
				{
					title:'基本信息',//li显示文字
					//url:'./pages/table.html',
					callback:function(){
						//parent.PCC.subContent = $dc.createDom('div:'+this.subContainerClassName,'',{},$(parent.document.body).find('.'+this.containerClassName)[0]);	
						parent.PCC.init({
						title:'编辑桌面',
						subTitle:'保存',
						cancelTitle:'取消',
						containerClassName:'subPopContent',
						contentItem:[{type:1,title:'基本信息'},{type:2,title:'桌面名称',key:'deskName',data:data.vm_name},{type:2,title:'描述',key:'deskDetails',data:'测试测试test123'},{type:3,title:'桌面类型',key:'deskType',item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'IP',val:'ip'}]},{type:3,title:'持久化',key:'persistence',item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'IP',val:'ip'}]},{type:1,title:'选择网络'},{type:4,title:'网络',key:'network',def_item:2,item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'IP',val:'ip'}]}],
							
						});	
					}
				},
					{
					title:'磁盘',
					url:'../pages/diskTable.html'
					//callback:function(){
					//$('.deskManageAdd').show();
					//$('.deskManageAdd').css('width',130);
					//$('.addText').html('新建桌面池');
					//}
					},
					{
						title:'快照',
						url:'./pages/flashPhoto.html'
							//callback:function(){
							//$('.deskManageAdd').hide();
							//}
					}
				],
					callback:function(){
					},
					colorPanel:false,
					defaultIndex:0,//默认选中index值
					destContainer:$(parent.document.body).find('.subPopContent')[0],//点击控件指向的容器
					cursor:'pointer',//li鼠标样式
					liClassNameN:'deskManageLiN',//li正常样式
					liClassNameC:'deskManageLiC',//li选中样式
					liClassNameS:'deskManageLiS'//li悬浮样式

				});
			
	}
	 $(window).resize(function () {
            $("#dg").datagrid("resize",{
				width:100+"%",
				height:100+"%"
				});
		
        });
		$('#dg').datagrid({
			onDblClickRow:function(rowIndex,rowData){
				data = rowData;
				parent.popBox.show({
					title:'编辑桌面',
					//subTitle:'保存',
					//cancelTitle:'取消',
					containerClassName:'popContent',
					subContainerClassName:'subPopContent',
					//contentItem:[{type:1,title:'基本信息'},{type:2,title:'桌面名称',key:'deskName',data:rowData.itemid},{type:2,title:'描述',key:'deskDetails',data:'测试测试test123'},{type:3,title:'桌面类型',key:'deskType',item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'IP',val:'ip'}]},{type:3,title:'持久化',key:'persistence',item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'IP',val:'ip'}]},{type:1,title:'选择网络'},{type:4,title:'网络',key:'network',def_item:2,item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'IP',val:'ip'}]},{type:4,title:'网络',key:'network',def_item:1,item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'IP',val:'ip'}]}],
					beforeLoadContent:aa

				});
			},
	    fitColumns: true,	
			onRowContextMenu:function(e, rowIndex, rowData)		  
		{
			
		e.preventDefault();
		$("#dgr").menu('show', {
                        left:e.pageX,
                        top:e.pageY
            });			
		   },
		   
		   
		   
		    onClickRow:function(index,row){
				
            if(index != selectIndexs.firstSelectRowIndex && !inputFlags.isShiftDown ){    
                selectIndexs.firstSelectRowIndex = index; //alert('firstSelectRowIndex, sfhit = ' + index);  
            }             
            if(inputFlags.isShiftDown ) {  
                $('#dg').datagrid('clearSelections');  
                selectIndexs.lastSelectRowIndex = index;  
                var tempIndex = 0;  
                if(selectIndexs.firstSelectRowIndex > selectIndexs.lastSelectRowIndex ){  
                    tempIndex = selectIndexs.firstSelectRowIndex;  
                    selectIndexs.firstSelectRowIndex = selectIndexs.lastSelectRowIndex;  
                    selectIndexs.lastSelectRowIndex = tempIndex;  
                }  
                for(var i = selectIndexs.firstSelectRowIndex ; i <= selectIndexs.lastSelectRowIndex ; i++){  
                    $('#dg').datagrid('selectRow', i);     
                }     
            }             
           
        },  
		   
		   
		   
	    });	
		
		
		
			var pager = $('#dg').datagrid('getPager');	// get the pager of datagrid
			//pager.selectAll;
			pager.pagination({
				buttons:[{
					iconCls:'icon-search',
					handler:function(){
						alert('search');
					}
				},{
					iconCls:'icon-add',
					handler:function(){
						alert('add');
					}
				},{
					iconCls:'icon-edit',
					handler:function(){
						alert('edit');
					}
				}]
			});			
	})
