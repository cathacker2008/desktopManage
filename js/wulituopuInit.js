$(document).ready(function(){
	var defConfig = {
		defaultIndex:0,//默认选中index值
		showNum:4,//一次显示个数
		width:346,//容器内每个元素的宽度
		height:300,//容器内每个元素的高度
		margin:0,//元素之间的间距，不含开始和结尾
		items:[],
		prevClassName:'wlPrev',
		nextClassName:'wlNext',
		sliderBoxClassName:'wlSliderBox',
		sliderContentClassName:'wlSliderContent',
		itemsClassName:'wlSliderEle',
		tipClassName:'wlTip',//悬浮状态显示
		titleClassNameN:'wlTitleN',//基本状态
		titleClassNameC:'wlTitleC',//选中状态样式，追加在基本样式
		titleClassNameS:'wlTitleS',//悬浮状态样式，追加在基本样式
		titleContainer:$('.wulituopuTitle')[0]//框架外显示title的容器
	};
	var defItemConfig = {
		imgN:'./images/jiqun02.png',
		imgC:'./images/jiqun01.png',
		imgS:'./images/jiqun01.png',
		//tip:{'develop':50,'test':70,'office':60},
		tip:"<p>开发桌面</p><p>启动{0}个，余{1}个</p><p>&nbsp;</p><p>测试桌面</p><p>启动{2}个，余{3}个</p><p>&nbsp;</p><p>办公桌面</p><p>启动{4}个，余{5}个</p>",
		title:'管理集群1'
	};
	desk.server.request('clusterlist',null,function(data){
		var arr =[];
		var len = data.rows.length;
		for(var i=0;i<len;i++){
			var obj = {};
			obj.id = data.rows[i].vds_group_id;
			obj.title = data.rows[i].name;
			arr.push($.extend({},defItemConfig,obj));
			if(i == len-1){
				$('.wulituopuSlider').deskSlider($.extend({},defConfig,{items:arr}));	
			}
		}
	});

	var setSize = function(){
		var _w = $('.wulituopuWrapper').width();
		if(!_w){return;}
		$.fn.deskSliderResize();
		if(_w >918 && _w < 1340)
		{
			$('.wlSliderBox')[0].style['width'] = '1038px';
			$('.wltpBox')[0].style['width'] = '918px';
		}else {
			$('.wlSliderBox')[0].style['width'] = '1384px';
			$('.wltpBox')[0].style['width'] = '1376px';
		}
	}
	
	//setSize();
	$(window).resize(function() {
	setSize();
	});
});


