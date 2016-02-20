// JavaScript Document
$(document).ready(function(){
	var obj = {};
	obj.data = {};
	obj.map = [
		'domain',
		'userAddsearch'
		
	];
	
	var defaultobjModel= {
		desk_sel_width:367,
		desk_sel_height:36,
		picTop:14,
		desk_pic_down:'../images/xiajiantou03.png',
		desk_pic_up:'../images/xiajiantou04.png',
		callback:function(param){
			obj.data[this.key] = param.val;
		},
		desk:'123'
	}
	
	var DomainItem=$.extend({},defaultobjModel,{key:'dmDeskpoolTemplate',item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'IP',val:'ip'}]});
	$('#domain').deskSelect(DomainItem);
	
	var submit = function(){
		var len = obj.map.length;
		if(len ==0) {return;}
		for(var i=0;i<len;i++){
			obj.data[obj.map[i]] =$('#'+obj.map[i]).val();
		}
	}
	var cancel = function(){
		window.popBox.hide();
	}
	$('#userAddSubmit').bind('click',submit);	
	$('#userAddCancel').bind('click',cancel);
});
