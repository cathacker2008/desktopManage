(function(w){
	var createTip = function(data){
		var moudle = "<p>{0}</p><p>启动{1}个，余{2}个</p>";
		var arr = data.rows;
		var len =data.rows.length;
		var str='';
		if(len ==0){return '暂无数据';}
		for(var i =0;i<len;i++){
			if(arr[i].desktop_type_id == '' && arr[i].desktop_type_name == 'other'){//过滤engine 信息
				continue;
			}
			str+=$.format(moudle,arr[i].desktop_type_name,arr[i].run_counts,arr[i].total_count-arr[i].run_counts);
			if(i == len-1){
				return str;
			}
		}
	}
	w.createTip = createTip;
})(window);
(function(w){
	var wltp = {};
	//wltp.data = {name:'服务器01',num:49,remain:21,info:'<p>CPU:0%</p><p>内存:80%</p><p>网络:70%</p>',tip:'<p>开发桌面</p><p>启动50个，余40个</p><p>&nbsp;</p><p>测试桌面</p><p>启动100个，余30个</p><p>&nbsp;</p><p>办公桌面</p><p>启动60个，余70个</p>'};
	wltp.createServerLayer = function(data){
		var bg = $dc.createDom('div:wltpLayerbg','',null,$('.wltpBox')[0]);
		var panel = $dc.createDom('div:wltpServerLayer','',null,bg);
		//panel.style['background-image'] = 'url(../images/fuwuqi-b.png)';
		var num = data.vm_count;
		$(panel).css('backgroundImage','url(images/fuwuqi-'+((num>50)?(num>500?'b':'m'):'s')+'.png)');
		var name =  $dc.createDom('div:wltpServerName','',{
			html:data.host_name
		},panel);
		//var remain =  $dc.createDom('div:wltpRemain','',{
			//html:'余'+data.remain+'个'
		//},panel);
		var numPanel = $dc.createDom('div:wltpNum','',null,panel);
		var numText = $dc.createDom('div:wltpNumText','',{
			html:data.vm_count+'个'
		},panel);
		var info =  $dc.createDom('div:wlInfo','',{
			html:'<p>CPU:'+data.usage_cpu_percent+'%</p><p>内存:'+data.usage_mem_percent+'%</p><p>网络:'+data.usage_network_percent+'%</p><p>状态:'+statusMap.hostMap[data.status]+'</p>'
		},panel);
		var img = new Image();
		//var imgArr = ['run','danger','warning'];
		var imgPath;
		img.style['position'] = 'absolute';
		img.style['top'] = '131px';
		img.style['left'] = '172px';
		if(data.status == 3){
			imgPath = 'run';
		}else if(data.status == 0 || data.status == 1 || data.status == 2 || data.status == 4 || data.status == 5 || data.status == 7 || data.status == 10){
			imgPath = 'danger';
		}else{
			imgPath = 'warning';
		}
		img.src = './images/'+imgPath+'.gif';
		//img.src = './images/'+imgArr[Math.round(Math.random()*2)]+'.gif';
		panel.appendChild(img);
		panel.showTip = function(){
			$('.wlServerTip').remove();
			//var tip = $dc.createDom('div:wlServerTip','',{
				//html:data.tip
			//},this);
			desk.server.request({url:'host',path:data.vds_id,action:'/statistics'},null,function(data){
				var tip = $dc.createDom('div:wlServerTip','',{
					//html:param.tip
					html:createTip(data)
				},panel);	
			},'get');
		}
		//if(j%3 ==1 ){
			//$(panel).css('margin','0 20px 20px 20px');
		//}else{
			//$(panel).css('marginBottom','20px');
		//}
		$(panel).hover(function(){
			this.showTip();
		},function(){
			$('.wlServerTip').remove();
		})
	}


w.wltp = wltp;

})(window);
(function($){
	var obj;
	$.format = function (source, params) { 
		if (arguments.length == 1) 
	return function () { 
		var args = $.makeArray(arguments); 
		args.unshift(source); 
		return $.format.apply(this, args); 
	}; 
if (arguments.length > 2 && params.constructor != Array) { 
	params = $.makeArray(arguments).slice(1); 
} 
if (params.constructor != Array) { 
	params = [params]; 
} 
$.each(params, function (i, n) { 
	source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n); 
}); 
return source; 
}; 
	$.fn.deskSlider = function(config){
		obj = config;
		var len = config.items.length;
		if(len<=0){return;}
		obj.step = 0;
		var t = null;
		var current = null;
		var _w = len*config.width+(len-1)*config.margin;//滚动内容总长度
		var tw = config.showNum*config.width+(config.showNum-1)*config.margin;// 展示容器长度
		var prev = $dc.createDom('div:'+(config.prevClassName?config.prevClassName:''),'',null,this[0]);	
		var sliderBox = $dc.createDom('div:'+(config.sliderBoxClassName?config.sliderBoxClassName:''),'',null,this[0]);
		var next = $dc.createDom('div:'+(config.nextClassName?config.nextClassName:''),'',null,this[0]);	
		var sliderContent = $dc.createDom('div:'+(config.sliderContentClassName?config.sliderContentClassName:''),'',null,sliderBox);
		obj._w = _w;
		obj.tw = tw;
		var goLeft = function(){
			if(obj.step ==0){return;}
			var _tw = $('.wulituopuWrapper').width()<1340?(tw-config.width-config.margin):tw;
			obj.step -=(config.width+config.margin);
			obj.step = (obj.step<=0)?0:obj.step;
			if(_w>_tw){
				if(obj.step <(_w-_tw)){
					$(next).fadeIn();
				}else{
					$(next).fadeOut();
				}
			}else{
				$(next).fadeOut();
			}
			if(obj.step ==0 ){
				$(prev).fadeOut();
			}
			$(sliderContent).animate({left:-obj.step});
		}
		var goRight = function(px){
			var _tw = $('.wulituopuWrapper').width()<1340?(tw-config.width-config.margin):tw;
			if(_w<=_tw){return;}
			$(prev).fadeIn();
			obj.step +=(config.width+config.margin);
			obj.step = (obj.step>=_w-_tw)?_w-_tw:obj.step;
			if(obj.step>=_w-_tw){
				$(next).fadeOut();
			}
			$(sliderContent).animate({left:-obj.step});
		}
		var refresh = function(){
			desk.server.request({url:'cluster',path:current.id,action:'/hosts'},null,function(data){
				$('.wltpBox').html('');
				var len = data.rows.length;
				for(var j=0;j<len;j++){
					wltp.createServerLayer(data.rows[j]);
				}
			},'get');
		}
		$(next).bind('click',goRight);
		$(next).hover(function(){
			$(this).css('backgroundImage','url(./images/right2.png)');
		},function(){
			$(this).css('backgroundImage','url(./images/right1.png)');
		});
		$(prev).bind('click',goLeft);
		$(prev).hover(function(){
			$(this).css('backgroundImage','url(./images/left2.png)');
		},function(){
			$(this).css('backgroundImage','url(./images/left1.png)');
		});
		var createEle = function(param){
			var ele = $dc.createDom('div:'+(config.itemsClassName?config.itemsClassName:''),param.id,null,sliderContent);
			var title = $dc.createDom('div:'+(config.titleClassNameN?config.titleClassNameN:''),'',{
				html:param.title
			},ele);
			ele.seq = i;
			if(i!=0){
				ele.style['margin-left'] = config.margin +'px';
			}
			//ele.style['border-bottom'] = '3px solid #DEE6F5';
			$(ele).css('border-bottom','3px solid #DEE6F5');
			//ele.style['background-image'] = 'url('+param.imgN+')';
			$(ele).css('backgroundImage','url('+param.imgN+')');
			//$(ele).css('backgroundImage','url(images/fuwuqi-'+'b'+'.png)');
			ele.style['width'] = config.width+'px';
			ele.style['height'] = config.height+'px';
			ele.setNormal = function(){
				$(this).find('.'+config.titleClassNameN).attr('class',config.titleClassNameN);
				$(this).css('backgroundImage','url('+param.imgN+')');
				//ele.style['border-bottom'] = '3px solid #DEE6F5';
				$(ele).css('border-bottom-color','#DEE6F5');
			}
			ele.setClick = function(){
				$(this).find('.'+config.titleClassNameN).addClass(config.titleClassNameC);
				$(this).css('border-bottom','3px solid #058fcd');
				$(this).css('backgroundImage','url('+param.imgC+')');
			}
			ele.setMove = function(){
				$(this).find('.'+config.titleClassNameN).addClass(config.titleClassNameS);
				$(this).css('backgroundImage','url('+param.imgS+')');
				this.showTip();
			}
			ele.showTip = function(){
				var isLast = (this.seq-obj.step/(config.width+config.margin) ==  ($('.wulituopuWrapper').width() <1340?2:3))?true:false;
				$('.'+config.tipClassName).remove();
				desk.server.request({url:'cluster',path:this.id,action:'/statistics'},null,function(data){
					var tip = $dc.createDom('div:'+(config.tipClassName?config.tipClassName:''),'',{
						//html:param.tip
						html:createTip(data)
					},ele);	
					//},$('.wulituopuWrapper')[0]);	
				//$(tip).css('top',$(ele).offset().top);
				//$(tip).css('left',$(ele).offset().left);
					if(isLast){
						tip.style['right'] = '200px';		
						return;
						if(window.ActiveXObject){
							tip.style['right'] = '200px';		
						}else{
							tip.style['left'] = 0;
							tip.style['right'] = 'initial';
						}
					}
				},'get');
			}
			var ck = function(){
				current?current.setNormal():'';
				current = this;
				current.setClick();
				$(config.titleContainer).html('');
				//$('.wulituopuServerPanel').html('');
				$(config.titleContainer).html(param.title);
				refresh();
			}
			$(ele).bind('click',ck);
			$(ele).hover(function(){
				//(current==this)?'':this.setMove();
				this.setMove();
			},function(){
				$('.'+config.tipClassName).remove();
				(current==this)?'':this.setNormal();
			});
			if(config.defaultIndex == i){
				ele.click();
			}
		}
		//sliderBox.style['width'] = tw+'px';
		sliderContent.style['width'] = _w+'px';
		var _tw = $('.wulituopuWrapper').width()<1340?(tw-config.width-config.margin):tw;
		if(_w>_tw){
			$(next).show();
			//$(next).css('backgroundImage','url(./images/right2.png)');
		}else{
			$(next).hide();
		}
		sliderContent.style['height'] = config.height+3+'px';
		for (var i=0;i<len;i++){
			createEle(config.items[i]);
		}
		deskRefresh.dynamic.push(refresh);
	}
	$.fn.deskSliderResize =function(){
		obj._tw = $('.wulituopuWrapper').width()<1340?(obj.tw-obj.width-obj.margin):obj.tw;
		var last = obj._w - obj._tw;
		if(last <= 0){
			$('.'+obj.nextClassName).fadeOut();
			$('.'+obj.prevClassName).fadeOut();
			$('.'+obj.sliderContentClassName).animate({left:0});
			$('.'+obj.nextClassName).click();
			obj.step =0;
		}else {
			var btn = obj.step>0?obj.prevClassName:obj.nextClassName;
			$('.'+btn).fadeIn();
		}
		//if(last <= obj.step){
			////if()
			////$('.'+obj.nextClassName).click();
			//$('.'+obj.nextClassName).fadeOut();
		//}else {
			//$('.'+obj.nextClassName).fadeIn();
		//}
	}
})(jQuery)
