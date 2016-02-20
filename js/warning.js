$(document).ready(function(){
	
	$('.warningSelect').deskSelect({
		desk_sel_width:80,
		desk_sel_height:36,
		desk_pic_down:'./images/xiajiantou03.png',
		desk_pic_up:'./images/xiajiantou04.png',
		def_val:'-请选择-',
		def_item:1,//如果设置此值，def_val无效
		item:[{'opt':'类型',val:'type'},{'opt':'名称',val:'name'},{'opt':'IP',val:'ip'}],
		callback:function(obj){
		}
	});
	window.setIframe = function(h){
		$('.warningContainer').height(h);
	}; 
});

