$(document).ready(function(){
	var obj = {};
	obj.data = {};
	obj.map = [
		'name',
		'description',
		'num_desktop'
	];
	
	var defaultobjModel= {
		desk_sel_width:367,
		desk_sel_height:36,
		picTop:14,
		desk_pic_down:'./images/xiajiantou03.png',
		desk_pic_up:'./images/xiajiantou04.png',
		callback:function(param){
			obj.data[this.key] = param.val;
		},
		desk:'123'
	}
	
	desk.server.getSelectItem({url:'desktype'},function(arr){
		var dmDeskTypeItem=$.extend({},defaultobjModel,{key:'desktop_type_id',def_item:0,item:arr,
			callback:function(param){
				obj.data[this.key] = param.val;
				obj.data['mem_size'] = param.v_memory;
				obj.data['num_socket'] = param.v_cpu;
			}});
		$('#dmDeskType').deskSelect(dmDeskTypeItem);

	});
	desk.server.getSelectItem({url:'moudleList'},function(arr){
		var len = arr.length;
		var _arr = [];
		for(var i=0;i<len;i++){
			if(arr[i].base_template_id !='00000000-0000-0000-0000-000000000000'){
				_arr.push(arr[i]);
			}
			if(i == len-1){
				var dmDeskTemplateItem=$.extend({},defaultobjModel,{key:'templateId',item:_arr,def_item:0,callback:function(param){
					obj.data[this.key] = param.val;	
					$('#dmDeskpoolCluster').val(param.storage_pool_name);
				}});
				$('#dmDeskpoolTemplate').deskSelect(dmDeskTemplateItem);
			}
		}
	});
	$('#name').attr('maxLength',13).attr('placeholder',tip.map['VM_NAME']);
	$('#num_desktop').attr('maxLength',4).attr('placeholder',tip.map['ADD_VM_NUM']);
	var check = function(){
		var a = $dc.confirmaction($('#name')[0],'VM_NAME',tip.map);
		var b = $dc.confirmaction($('#num_desktop')[0],'ADD_VM_NUM',tip.map);
		return a&&b; 
	}
	$('input').placeholder();
	
	var submit = function(){
		if(!check()){return ;}
		var len = obj.map.length;
		if(len ==0) {return;}
		for(var i=0;i<len;i++){
			obj.data[obj.map[i]] =$('#'+obj.map[i]).val();
			if(i == len-1){
				if(!obj.data.templateId){
					$('#dmDeskpoolTemplate').css('borderColor','red');
					return;
				}else{
					$('#dmDeskpoolTemplate').css('borderColor','DEE5F5');
				}
				desk.server.request('addpool',obj.data,function(data){
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
