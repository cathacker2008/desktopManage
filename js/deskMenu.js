(function($){
	var arrs;
	$.fn.deskMenu = function(config){
		var _this = this;
		this.html('');
		var len = config.menuItems.length;
		var current = null;
		var param = {};
		this.arr =[];
		var ul = $dc.createDom("ul:"+(config.ulClassName?config.ulClassName:""),'',null,this[0]);
		var createMenu = function(param){
			var ck = function(){
				current?current.setNormal():'';
				current = this;
				current.setClick();
				$(config.destContainer).html('');
				
				if($(config.destContainer).is('div')){
					if(param.title =='磁盘' || param.title=='快照' || param.title =='用户'){
						var iframe = $dc.createDom('iframe:','',{"width":600,"height":420,"frameborder":"no","border":"0"},config.destContainer);
						iframe.width='600px';
						iframe.height='420px';
						iframe.marginwidth = 0;
						iframe.marginheight = 0;
						iframe.scrolling = 'no';

						$(iframe).attr('src',param.url);
					}else{
						$(config.destContainer).load(param.url);
					}
				}else{
					$(config.destContainer).attr('src',param.url);
				}
				if(param.callback){
					param.callback();
				}
			}
			var li = $dc.createDom("li:"+(config.liClassNameN?config.liClassNameN:""),'',{
				//click:ck
			},ul);
			if(param.imgN){
				//var img = new Image();
				//img.src = param.imgN;
				var img = $dc.createDom('span:'+param.imgN,'',{},li); 
			}
			li.setNormal = function(){
				$(this).find('.deskMenuColorPanel').remove();
				$(this).attr('class',config.liClassNameN);
				$(this).css('z-index',0);
				if(!img){return;}
				//img.src = param.imgN;
				$(img).removeClass(param.imgC);
				$(img).removeClass(param.imgS);
				$(img).addClass(param.imgN);
			}
			li.setClick = function(){
				if(config.colorPanel){
					var colorPanel = $dc.createDom('div:deskMenuColorPanel','',null,this);
				}
				$(this).attr('class',config.liClassNameC);
				$(this).css('z-index',1);
				if(!img){return;}
				//img.src = param.imgC;
				$(img).removeClass(param.imgN);
				$(img).removeClass(param.imgS);
				$(img).addClass(param.imgC);
			}
			li.setMove = function(){
				$(this).attr('class',config.liClassNameS);
				if(!img){return;}
				$(img).removeClass(param.imgC);
				$(img).removeClass(param.imgN);
				$(img).addClass(param.imgS);
				//img.src = param.imgC;
				//$(this).css('z-index',1);
			}
			$(li).hover(function(){
				(current==this)?'':this.setMove();
			},function(){
				(current==this)?'':this.setNormal();
			});
			$(li).bind('click',ck);
			if(img){
				li.appendChild(img);
			}
			$(li).append(param.title);
			//li.innerHTML=param.title;
			$(li).css('cursor',config.cursor);
			_this.arr.push(li);
			//(config.defaultIndex ==i)?li.click():'';
			
		}
		if(len == 0){return;}
		for(var i=0;i<len;i++){
			createMenu(config.menuItems[i]);
			if(i == len-1){
				if(config.callback){
					config.callback(_this.arr);
				}
				_this.arr[config.defaultIndex].click();
				return _this;
			}
		}

	}	

})(jQuery)
