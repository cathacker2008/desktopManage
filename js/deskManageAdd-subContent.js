$(document).ready(function(){
	var obj = {};
	obj.data = {};
	obj.data.network = {};
	obj.count = 1;//当前网络条目
	//obj.map = ['vm_name','description','num_socket'];
	obj.map = {
		vm_name:'dmDeskName',
		description:'dmDeskDetials',
		num_desktop:'dmDeskNum'
	} 
	obj.mapLen = 3;
	var defaultobjModel= {
		desk_sel_width:367,
		desk_sel_height:36,
		picTop:14,
		//def_item:0,//如果设置此值，def_val无效
		desk_pic_down:'./images/xiajiantou03.png',
		desk_pic_up:'./images/xiajiantou04.png',
		callback:function(param){
			obj.data[this.key] = param.val;
		}
	}
	$('#dmDeskName').attr('maxLength',64).attr('placeholder',tip.map['VM_NAME']);
	$('#dmDeskNum').attr('maxLength',4).attr('placeholder',tip.map['CREATE_VM_NUM']);
	$('#dmDeskDetials').attr('maxLength',255);
	var check = function(){
		var a = $dc.confirmaction($('#dmDeskName')[0],'VM_NAME',tip.map);
		var b = $dc.confirmaction($('#dmDeskNum')[0],'CREATE_VM_NUM',tip.map);
		
		return a&&b; 
	}
	$('input').placeholder();
	$('#dmDeskSecurity').deskSelect($.extend({},defaultobjModel,{disable:true,key:'security_classification',item:[{'opt':'内部',val:'0'},{'opt':'秘密',val:'1'},{'opt':'机密',val:'2'}]}));
	desk.server.getSelectItem({url:'desktype'},function(arr){//获取桌面类型下拉框内容
		if(arr.length <= 0 ){
			$('.desktypeTip').show();	
			$('#dmDeskSubmit').addClass('disableBtn');
		}else{
			$('.desktypeTip').hide();	
			$('#dmDeskSubmit').removeClass('disableBtn');
		}
		var dmDeskTypeItem=$.extend({},defaultobjModel,{key:'desktop_type_id',def_item:0,item:arr,
		callback:function(param){
			obj.data[this.key] = param.val;
			obj.data['mem_size'] = param.v_memory;
			obj.data['num_socket'] = param.v_cpu;
		}});
		$('#dmDeskType').deskSelect(dmDeskTypeItem);
	});
	desk.server.getSelectItem({url:'moudleList'},function(arr){//获取模板类型下拉框内容
		var dmDeskTemplateItem=$.extend({},defaultobjModel,{key:'templateId',item:arr,def_item:0,callback:function(param){
			obj.data[this.key] = param.val;	
			obj.data.storage_pool_id = param.storage_pool_id;	
			$('#dmDeskDataCenter').val(param.storage_pool_name);
			$('.selectNetWorkContainer').html('');
			desk.server.getSelectItem({url:'network',path:'?storage_pool_id='+param.storage_pool_id},function(arr){
				obj.count = 1;
				var configData ={};
				configData.title ='nic';
				configData.selectConfig = $.extend({},defaultobjModel,{key:'kindId',desk_sel_width:324,item:arr,callback:function(param){
					var nData = {};
					nData[this.key] = param.val;
					nData.kind = param.opt;
					nData.name = this.title;
					obj.data.network[this.title] = nData;	
				}});
				if(param.network && param.network.length>0){
					for(var i=0;i<param.network.length;i++){
						configData.selectConfig = $.extend({},configData.selectConfig,{def_item:{opt:param.network[i].kind}}); 
						createNetWork(configData);
					}
				}else{
				createNetWork(configData);
				}
			});
		}});
		$('#dmDeskTemplate').deskSelect(dmDeskTemplateItem);
	});
	var dmDeskPersistentItem=$.extend({},defaultobjModel,{key:'is_stateless',def_item:{val:'false'},item:[{'opt':'是',val:'false'},{'opt':'否',val:'true'}]});
	$('#dmDeskPersistent').deskSelect(dmDeskPersistentItem);

	var submit = function(){
		if($(this).attr('class').indexOf('disableBtn')!=-1){
			return;
		}
		if(!check()){return ;}
		var j = 0;
		$.each(obj.map,function(i,n){
			obj.data[i] = $('#'+n).val();
			if(j == obj.mapLen-1){
				var tmp = $dc.cloneObj(obj);
				var arr = [];
				$.each(tmp.data.network,function(i,n){
					arr.push(n);
				});
				tmp.data.network = JSON.stringify(arr);
				var url = parseInt(obj.data.num_desktop)>1?'createdesks':'createdesk';
				tmp.data.security_classification = 'Undefined';
				desk.server.request(url,tmp.data,function(data){
					popBox.hide();
					if(data.success == true){
						tip.showResult({status:0,info:data.msg?data.msg:''});
					}else{
						tip.showResult({status:2,info:data.msg?data.msg:''});
					}
					deskManageTable.window.refresh();
				},'post');
			}
			j++;
		});
	}

	var createNetWork = function(param,isAdd){
		var _param = $dc.cloneObj(param);
		_param.title = _param.title+(obj.count);
		//_param.selectConfig.key = _param.selectConfig.key+(obj.count);
		var li = $dc.createDom('li:','',{},$('.selectNetWorkContainer')[0]);
		$(li).css('z-index',80-obj.count);
		var title = $dc.createDom('div:deskAddTitleInfo','',{html:_param.title+'：'},li);
		var select = $dc.createDom('div:popSelectBox','',{},li);
		var pic = $dc.createDom('div:icon-'+(obj.count==1?'add-b':'del-b')+' netPic'+' margin6','',{},li);
		var remove = function(){
			delete obj.data.network[_param.title];
			$(li).remove();	
		}		
		var add = function(){
			createNetWork(param,true);
		}
		$(pic).bind('click',(obj.count==1?add:remove));
		_param.selectConfig.title = _param.title;
		if(isAdd){
			_param.selectConfig = $.extend(true,_param.selectConfig,{def_item:'false'});
		}
		$(select).deskSelect(_param.selectConfig);
		obj.count++;
	}
	//createNetWork(debugData);
	$('#dmDeskSubmit').bind('click',submit);	
	$('.popCancel').bind('click',window.popBox.hide);	
});
