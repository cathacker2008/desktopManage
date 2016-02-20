(function($){
	var defaultParam = {};
	var p;
	var	warningData,logData; 
	var current;
	var init = function(config){
		var y = 0,_y = 0,isDrag = false,h = 0,m = 0;
		var mouseDown = function(e){
			$('.dragWrapper').show();
			//e.preventDefault();
			//e.stopPropagation();
			isDrag = true;
			y = e.pageY;
		}
		var mouseMove = function(e){
			//e.preventDefault();
			//e.stopPropagation();
			if(!isDrag){return;}
			 _y = e.pageY;
			m = y-_y;
			h = $(p).height()+m;
			h = h<40?40:h;
			h = h>820?820:h;
			y = _y;
			if(h>=150){
				$(pic).removeClass(config.picClassNameup);
				$(pic).addClass(config.picClassNamedown);
			}else{
				$(pic).removeClass(config.picClassNamedown);
				$(pic).addClass(config.picClassNameup);
			}	
			$(p).css('height',h);
			$(content).css('height',h-40);
		}

		var mouseUp = function(e){
			//e.preventDefault();
			//e.stopPropagation();
			if(isDrag){
				$('.dragWrapper').hide();
				isDrag = false;
			}
		}
		var autoCtrl = function(){
			var h;
			if($(p).height()>=150){
				$(pic).removeClass(config.picClassNamedown);
				$(pic).addClass(config.picClassNameup);
				h = 40;
			}else{
				$(pic).removeClass(config.picClassNameup);
				$(pic).addClass(config.picClassNamedown);
				h = 200;
			}
			$(p).css('height',h);
			$(content).css('height',h-40);
		}
		var dragWrapper =  $dc.createDom('div:dragWrapper','',null,$('.wrapper')[0]);
		var handle = $dc.createDom('div:'+(config.handleClassName?config.handleClassName:''),'',null,p);
		var head = $dc.createDom('div:'+(config.headClassName?config.headClassName:''),'',null,p);
		var dragMenu =  $dc.createDom('div:dragMenuPanel','',null,head);
		var pic = $dc.createDom('span:'+(config.picClassName?config.picClassName:''),'',{},head);
		$(pic).addClass(config.picClassNameup);
		var content = $dc.createDom('ul:'+(config.contentClassName?config.contentClassName:''),'',null,p);
		var dote1 =  $dc.createDom('div:dragDote1','',null,head);
		var dote2 =  $dc.createDom('div:dragDote2','',null,head);
		var createLi = function(param){
			var picClass;
			if(param.severity ==0){
				picClass = 'check-fill dragcolor0';
			}else if(param.severity ==1){
				picClass = 'notice dragcolor1';
			}else {
				picClass = 'cancel-fill dragcolor2';
			}
			var li = $dc.createDom('li:'+(config.contenLiClassName?config.contenLiClassName:''),'',null,content);
			var pic = $dc.createDom('div:dragStatusPic icon-'+picClass,'',null,li);
			var time = $dc.createDom('div:dragTime','',{
				html:param.log_time
			},li);
			var info = $dc.createDom('div:dragInfo','',{
				html:param.message
			},li);
		}
		var getData = function(callback){
			desk.server.request('getloglist',{rows:50,page:1},function(data){
				//var data = data.rows;
				//var total = data.total;
				if(!logData){logData = data}
				if(logData.total != data.total){
					$('.dragDote2').fadeIn();	
				}
				if(callback && current =='事件日志'){
					callback(data);
				}
			},'post');
			desk.server.request('getwarninglist',{rows:50,page:1},function(data){
				//var data = data.rows;
				if(!warningData){warningData = data}
				if(warningData.total != data.total){
					$('.dragDote1').fadeIn();	
				}
				if(callback && current =='警告通知'){
					callback(data);
				}
			},'post');
			//var debugData = [
			//{status:0,message:'asdasdasjdasdasd',time:'2015-12-22'},
			//{status:2,info:'asdasdasjdasdasd',time:'2015-12-22'},
			//{status:1,info:'asdasdasjdasdasd',time:'2015-12-22'},
			//{status:2,info:'asdasdasjdasdasd',time:'2015-12-22'}
			//];
			//if(logData){
				//if(logData != debugData){
					//$('.dragDote2').fadeIn();	
				//}
			//}
		}
		var refresh = function(){
			getData(showInfo);
		}
		window.deskRefresh.constant.push(refresh);
		var showInfo = function(data){
			if(!data.rows){return;}
			var len = data.rows.length;
			$(content).html('');
			if(current =='警告通知'){
				warningData = data;
				$('.dragDote1').fadeOut();	
			}else{
				logData = data;
				$('.dragDote2').fadeOut();	
			}
			for(var i=0;i<len;i++){
				createLi(data.rows[i]);
			}
		}
		$(dragMenu).deskMenu({
			ulClassName:'dragMenu',
			menuItems:[{
				title:'警告通知',//li显示文字
				callback:function(){
					current=this.title;
					getData(showInfo);
				}
			},
			{
				title:'事件日志',
				callback:function(){
					current=this.title;
					getData(showInfo);
				}
			}
		],
			colorPanel:false,
			//colorPanelClassName:'deskMenuColorPanel',
			defaultIndex:0,//默认选中index值
			destContainer:content,//点击控件指向的容器
			cursor:'pointer',//li鼠标样式
			liClassNameN:'dragMenuLiN',//li正常样式
			liClassNameC:'dragMenuLiC',//li选中样式
			liClassNameS:'dragMenuLiS',//li悬浮样式
			callback:function(arr){
				$(arr[0]).css('margin-left','20px');
			}
		});
		$(pic).bind('click',autoCtrl);
		$(handle).bind('mousedown',mouseDown);
		$(document).bind('mousemove',mouseMove);
		$(document).bind('click mouseup',mouseUp);
	}
	$.fn.deskDrag = function(param){
		if(this.length ==0){return;}
		var config  = $.extend({},defaultParam,param);
		p = this[0];
		init(config);
	}
})(jQuery);
