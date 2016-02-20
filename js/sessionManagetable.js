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
var data = {"total":30,"rows":[
	{"productid":"FI-SW-01","productname":"Koi","unitcost":10.00,"status":"P","listprice":36.50,"attr1":"Large","itemid":"EST-1"},
	{"productid":"K9-DL-01","productname":"Dalmation","unitcost":12.00,"status":"P","listprice":18.50,"attr1":"Spotted Adult Female","itemid":"EST-10"},
	{"productid":"RP-SN-01","productname":"Rattlesnake","unitcost":12.00,"status":"P","listprice":38.50,"attr1":"Venomless","itemid":"EST-11"},
	{"productid":"RP-SN-01","productname":"Rattlesnake","unitcost":12.00,"status":"P","listprice":26.50,"attr1":"Rattleless","itemid":"EST-12"},
	{"productid":"RP-LI-02","productname":"Iguana","unitcost":12.00,"status":"P","listprice":35.50,"attr1":"Green Adult","itemid":"EST-13"},
	{"productid":"FL-DSH-01","productname":"Manx","unitcost":12.00,"status":"P","listprice":158.50,"attr1":"Tailless","itemid":"EST-14"},
	{"productid":"FL-DSH-01","productname":"Manx","unitcost":12.00,"status":"P","listprice":83.50,"attr1":"With tail","itemid":"EST-15"},
	{"productid":"FL-DLH-02","productname":"Persian","unitcost":12.00,"status":"P","listprice":23.50,"attr1":"Adult Female","itemid":"EST-16"},
	{"productid":"FL-DLH-02","productname":"Persian","unitcost":12.00,"status":"P","listprice":89.50,"attr1":"Adult Male","itemid":"EST-17"},
	{"productid":"AV-CB-01","productname":"Amazon Parrot","unitcost":92.00,"status":"P","listprice":63.50,"attr1":"Adult Male","itemid":"EST-18"},
	{"productid":"FI-SW-01","productname":"Koi","unitcost":10.00,"status":"P","listprice":36.50,"attr1":"Large","itemid":"EST-1"},
	{"productid":"K9-DL-01","productname":"Dalmation","unitcost":12.00,"status":"P","listprice":18.50,"attr1":"Spotted Adult Female","itemid":"EST-10"},
	{"productid":"RP-SN-01","productname":"Rattlesnake","unitcost":12.00,"status":"P","listprice":38.50,"attr1":"Venomless","itemid":"EST-11"},
	{"productid":"RP-SN-01","productname":"Rattlesnake","unitcost":12.00,"status":"P","listprice":26.50,"attr1":"Rattleless","itemid":"EST-12"},
	{"productid":"RP-LI-02","productname":"Iguana","unitcost":12.00,"status":"P","listprice":35.50,"attr1":"Green Adult","itemid":"EST-13"},
	{"productid":"FL-DSH-01","productname":"Manx","unitcost":12.00,"status":"P","listprice":158.50,"attr1":"Tailless","itemid":"EST-14"},
	{"productid":"FL-DSH-01","productname":"Manx","unitcost":12.00,"status":"P","listprice":83.50,"attr1":"With tail","itemid":"EST-15"},
	{"productid":"FL-DLH-02","productname":"Persian","unitcost":12.00,"status":"P","listprice":23.50,"attr1":"Adult Female","itemid":"EST-16"},
	{"productid":"FL-DLH-02","productname":"Persian","unitcost":12.00,"status":"P","listprice":89.50,"attr1":"Adult Male","itemid":"EST-17"},
	{"productid":"AV-CB-01","productname":"Amazon Parrot","unitcost":92.00,"status":"P","listprice":63.50,"attr1":"Adult Male","itemid":"EST-18"}

	]};
$(document).ready(function(){
	$('#dg').datagrid("resize",{
		width:$(document).width() - 5,
		height:parent.th-160
	});



	$("#dg").datagrid({
		data:data,
		onClickRow:function(index,row){
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
	})	
	$('.desktypeAdd').bind('click',parent.popBox.show);
	
	$('.desktypeDelete').bind('click',parent.popBox.show);
	
	parent.setIframe($(document).height());
	$(".menu-item").each(function(index, element) {
		$(this).css("height","33px");
	});
});
