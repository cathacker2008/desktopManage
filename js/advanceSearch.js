$(document).ready(function(){
	var obj = {};
	obj.data = [];
	obj.count = 0;//当前条件条目
	var config = {
		desk_sel_width:90,
		desk_sel_height:32,
		picTop:14,
		def_item:1,
		desk_pic_down:'./images/xiajiantou03.png',
		desk_pic_up:'./images/xiajiantou04.png',
		callback:function(param){
			this.li.input = this.input;
			this.li.key = param.val;
		},
		item:[{'opt':'类型',val:'desktop_type_name'},{'opt':'名称',val:'vm_name'}]
	}
	var createLi = function(param){
		//var _param = $dc.cloneObj(param);
		var li = $dc.createDom('li:','',{},$('.advanceSearchContainer')[0]);
		$(li).css('z-index',80-obj.count);
		var select = $dc.createDom('div:deskManageSelect','',{},li);
		var input = $dc.createDom('input:searchInput','',{},li);
		param.input = input;
		param.li = li;
		var pic = $dc.createDom('div:icon-'+(obj.count==0?'add-b':'del-b')+' netPic','',{},li);
		var remove = function(){
			$(li).remove();	
		}		
		var add = function(){
			createLi(param);
		}
		$(pic).bind('click',(obj.count==0?add:remove));
		$(select).deskSelect(param);
		obj.count++;
	}
	var submit = function(){
		obj.data = {};
		deskManageTable.window.searchParam = null;
		//var param ={};
		var len = $('.advanceSearchContainer li').length;
		$.each($('.advanceSearchContainer li'),function(i){
			//var param = {};
			//param[this.key] = $(this.input).val();
			//obj.data.push(param);
			obj.data[this.key] =obj.data[this.key]?obj.data[this.key]+$(this.input).val():$(this.input).val();
			if(i == len -1){
				deskManageTable.window.searchParam = obj.data;
				deskManageTable.window.refresh();	
				popBox.hide();
				//desk.server.request('deskTopList',obj.data,function(data){
					//popBox.hide();
					//console.log(data);
					//deskManageTable.window.refresh(data);	
				//},'post');
			}
		});
	}
	createLi(config);
	$('#dmDeskSubmit').bind('click',submit);
	$('#dmDeskCancel').bind('click',parent.popBox.hide);

});
