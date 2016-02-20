// JavaScript Document
$(document).ready(function(){
	var obj = {};
	obj.data = {};
	obj.map = [
		'dmDeskpoolName',
		'dmDeskpoolDetials',
		'dmDeskpoolTemplate',
		'dmDeskpoolNum',
		'dmDeskpoolPreNum',
		'dmDeskpoolCluster'
		
	];
	
	var defaultobjModel= {
		desk_sel_width:120,
		desk_sel_height:36,
		picTop:14,
		desk_pic_down:'../images/xiajiantou03.png',
		desk_pic_up:'../images/xiajiantou04.png',
		callback:function(param){
			obj.data[this.key] = param.val;
		},
		desk:'123'
	}
	
	var dmDeskpoolTemplateItem=$.extend({},defaultobjModel,{key:'dmDeskpoolTemplate',item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'IP',val:'ip'}]});
	$('#SelectPanel').deskSelect(dmDeskpoolTemplateItem);
	
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
	$('#dmDeskpoolSubmit').bind('click',submit);	
	$('#dmDeskpoolCancel').bind('click',cancel);
});
