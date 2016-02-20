$(document).ready(function(){
	var obj = {};
	obj.data = {};
	obj.map = [
		'desktop_type_name',
		'description',
		'num_socket',
		'mem_size'
	];

	
	$('#desktop_type_name').attr('maxLength',64).attr('placeholder',tip.map['VM_NAME']);
	$('#num_socket').attr('maxLength',3).attr('placeholder',tip.map['CPU_NUM']);
	$('#mem_size').attr('maxLength',10).attr('placeholder',tip.map['MEM_NUM']);
	var check = function(){
		var a = $dc.confirmaction($('#desktop_type_name')[0],'VM_NAME',tip.map);
		var b = $dc.confirmaction($('#num_socket')[0],'CPU_NUM',tip.map);
		var c = $dc.confirmaction($('#mem_size')[0],'MEM_NUM',tip.map);
		return a&&b&&c; 
	}
	$('input').placeholder();
	var submit = function(){
		if(!check()){return ;}
		var len = obj.map.length;
		if(len ==0) {return;}
		for(var i=0;i<len;i++){
			obj.data[obj.map[i]] =$('#'+obj.map[i]).val();
			if(i == len-1){
				desk.server.request('adddesktype',obj.data,function(data){
					popBox.hide();
					if(data.success == true){
						tip.showResult({status:0,info:data.msg?data.msg:''});
					}else{
						tip.showResult({status:2,info:data.msg?data.msg:''});
					}
						deskManageTable.window.refresh();
				},'post');
			
			}
		}
	}
	var cancel = function(){
		window.popBox.hide();
	}
	$('#dmDeskpoolSubmit').bind('click',submit);	
	$('#dmDeskpoolCancel').bind('click',cancel);
});
