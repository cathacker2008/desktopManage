(function($){
	var DeskSelectDefault = {
		desk_sel_width:80,
		desk_sel_height:28,
		def_val:'-请选择-',
		picTop:10,
		item:[{'no.1':1},{'no.2':2},{'no.3':3}]
	};
	window.currentSelectPanel= null;
	var browserType = $.browser;
	var init = function(config){
		pp.style['width'] = config.desk_sel_width+'px';
		if(config.disable){
			$(pp).css('backgroundColor','#CACCD1');	
		}
		var getDef = function(config){
			var index;
			if(!isNaN(config.def_item)){
				return config.def_item;
			}
			if((config.def_item===0||config.def_item)&&config.def_item.val){
				var _len = config.item.length;
				for(var i=0;i<_len;i++){
					if(config.item[i].val == config.def_item.val){
						index = i;
						return index;
					}
				}
				return -1;
			}else if((config.def_item===0||config.def_item)&&config.def_item.opt){
				var _len = config.item.length;
				for(var i=0;i<_len;i++){
					if(config.item[i].opt == config.def_item.opt){
						index = i;
						return index;
					}
				}
				return -1;
			}else{
				return -1 ;
			}
		}
		var index = getDef(config);
		var de = $dc.createDom('div:deskSelectDefaultItem','',{
			height:config.desk_sel_height+'px',
			//width:config.desk_sel_width+'px',
			html:((index !=-1)&&config.item.length)?config.item[index].opt:config.def_val
		},pp);
		var ck = function(e){
			var e = e || window.event;
			var obj = e.target;
			if(e.stopPropagation) { //W3C阻止冒泡方法
				e.stopPropagation();
			} else {
				e.cancelBubble = true; //IE阻止冒泡方法
			};
			if(config.disable){return;}
			$(de).html(obj.param.opt);
			$(itemPanel).slideToggle(100,function(){
				this.img.src = $(this).is(':hidden')?this.config.desk_pic_down:this.config.desk_pic_up; 
			});
			if(config.callback){
				config.callback(obj.param);
			}
		}
		var itemPanel =  $dc.createDom('div:deskItemPanel','',null,pp);
		$(itemPanel).bind('click',ck);
		itemPanel.config = config;
		$(de).css('overflow','hidden');
		$(de).css('white-space','nowrap');
		$(de).css('line-height',config.desk_sel_height+'px');
		var jiantou = $dc.createDom('div:deskjiantou','',{
			height:config.desk_sel_height+'px'
		},pp);
		var img = new Image();
		img.src = config.desk_pic_down;
		img.style['margin-top'] = config.picTop+'px';
		jiantou.appendChild(img);
		itemPanel.img = img;
		tog = function(e){
			var e = e || window.event;
			if(e.stopPropagation) { //W3C阻止冒泡方法
				e.stopPropagation();
			} else {
				e.cancelBubble = true; //IE阻止冒泡方法
			};
			if(config.disable){return;}
			if(window.currentSelectPanel && itemPanel != window.currentSelectPanel){
				$(window.currentSelectPanel).toggle(false);
				window.currentSelectPanel.img.src = window.currentSelectPanel.config.desk_pic_down;
			}
			window.currentSelectPanel = itemPanel;
			parent.currentSelectPanel = itemPanel;
			$(itemPanel).slideToggle(150,function(){
				this.img.src = $(this).is(':hidden')?this.config.desk_pic_down:this.config.desk_pic_up;
			});
		}
		var hideSelect = function(){//点击空白处，隐藏select下拉框
			if(window.currentSelectPanel){
				$(window.currentSelectPanel).toggle(false);
				window.currentSelectPanel.img.src = window.currentSelectPanel.config.desk_pic_down;
			}
		}
	$(document).bind('click',hideSelect);
		$(jiantou).bind('click',tog);
		$(de).bind('click',tog);
		var len = config.item.length;
		var createEle = function(item){
			var ele = $dc.createDom('div:deskSelectItem','',{
				height:config.desk_sel_height+'px',
				//width:config.desk_sel_width+'px',
				html:item.opt
			
			},itemPanel);
			ele.param = item;
			$(ele).css('overflow','hidden');
			$(ele).css('white-space','nowrap');
			$(ele).css('line-height',config.desk_sel_height+'px');
		
			
		}
		for (var i = 0;i<len;i++){
			createEle(config.item[i]);
		}
		if((config.def_item===0||config.def_item)&&config.callback){
			if(index !=-1 && config.item.length){
				config.callback(config.item[index]);
			}
		}
	}
	$.fn.deskSelect = function(param){
		if(this.length==0){return;}
		this.config = $.extend({},DeskSelectDefault,param);
		pp = this[0];
		init(this.config);
	};

})(jQuery);


//导入样式文件
function LoadCSS(url){
	var s = document.createElement("LINK");
	s.rel = "stylesheet";
	s.type = "text/css";
	s.href = url;
	document.getElementsByTagName("HEAD")[0].appendChild(s);
}
