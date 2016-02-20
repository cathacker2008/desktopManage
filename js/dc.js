(function(window){
	var $dc = {};
	$dc.curDrag = null;
	$dc.isDrag = false;
	$dc._x = 0;
	$dc._y = 0;
	$dc.stopDefaultEvent = function(e){
		e.preventDefault();
		e.stopPropagation();
	}

	$dc.loadCSS = function(url){
		var s = document.createElement("LINK");
		s.rel = "stylesheet";
		s.type = "text/css";
		s.href = url;
		document.getElementsByTagName("HEAD")[0].appendChild(s);
	}

	$dc.loadImages = function(arr,callback){
		var num = arr.length,loadedNum = 0;
		for(var i=0;i<num;i++){
			arr[i].onload = function(){
				if(++loadedNum>=num&&callback){
					callback();
				}
			}
			arr[i].onerror = function(){
				if(++loadedNum>=num&&callback){
					callback();
				}
			}
		};
	}

	$dc.cookies = {};
	$dc.cookies.setCookie = function(name,value){
		var Days = 30; 
		var exp = new Date(); 
		exp.setTime(exp.getTime() + Days*24*60*60*1000); 
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ';path=/'; 
	} 

	$dc.cookies.getCookie = function(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]); 
		}else{
			return null; 
		}
	} 

	$dc.cookies.delCookie = function(name){
		var exp = new Date(); 
		exp.setTime(exp.getTime() - 1); 
		var cval=$dc.cookies.getCookie(name); 
		if(cval!=null){
			document.cookie= name + "="+cval+";expires="+exp.toGMTString(); 
		}
	} 

	$dc.splitPX = function(px){
		return parseInt(px.split('px')[0],10);	
	}	

	//随机生成一个GUID
	$dc.guid = function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
	}
	
	//获取URL参数值
	$dc.getUrlParam = function(key){
        var reg = new RegExp("(^|&)"+key+"=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
		if(r){return unescape(r[2]);}
	}

	//AJAX请求
	$dc.request = function(url,data,callback,type,sync){
		var configure = {};
		if(!type || type == 'get' || type == 'GET'){
			if(data){
				configure.url = url+data;
				data = null;
			}else{
				configure.url = url;
			}
			configure.url += ((configure.url.indexOf('?')==-1)?'?':'&')+'date='+new Date().getTime();
		}else{
			configure.url = url;
		}
		configure.type = type;
		if(sync){
			configure.async = false;
		}
		if(data){
			configure.data = data;
		}
		//configure.traditional=true;
		configure.success = function(msg){
			if(callback){
				callback(msg);
			}
		}
		configure.error = function(msg){
			if(callback){
				callback(msg);
			}
		}
		$.ajax(configure);
	}
	
	$dc.regestEnterKeyEvent = function(dom,callback){
		dom.onkeyup = function(e){
			if(e.keyCode == '13'){
				if(callback){
					callback();	
				}
			}
		}
	}

	$dc.getEle = function(condition,jq){
		return jq?$(condition):$(condition)[0];
	}

	//创建DOM元素
	$dc.createDom = function(tag,id,attrs,pnode){
		var ts = tag.split(':');
		if(ts[0] == 'img'){
			var dom = new Image();	
		}else{
			var dom = document.createElement(ts[0]);	
		}
		dom.className = ts[1];
		if(id){dom.id = id;}

		for(var i in attrs){
			switch(i){
				case "html":
					dom.innerHTML = attrs[i];break;
				case "type":
					dom.type = attrs[i];break;
				case "value":
					dom.value = attrs[i];break;
				case "src":
					dom.src = attrs[i];break;
				case "width":
					dom.style['width'] = attrs[i];break;
				case "height":
					dom.style['height'] = attrs[i];break;
				case "frameborder":
					dom.frameBorder = attrs[i];break;
				case "border":
					dom.border = attrs[i];break;

				case "style":
					for(var j in attrs[i]){dom.style[j]=attrs[i][j];};break;
				case "click":
					//dom.addEventListener('click',attrs[i],false);break;
				case "dblclick":
					//dom.addEventListener('dblclick',attrs[i],false);break;
				case "blur":
					//dom.addEventListener('blur',attrs[i],false);break;
				default:break;
			}
		}
		if(pnode){
			pnode.appendChild(dom);	
		}
		return dom;
	}

	//DOM参数设置
	$dc.fset = function(dom,key,val){
		switch(key){
			case 'bg':
				if(dom.jquery){
					dom.css('background',val);	
				}else{
					dom.style['background'] = val;
				}
				break;
			case 'w':
				if(dom.jquery){
					dom.css('width',val);	
				}else{
					dom.style['width'] = val;
				}
				break;
			case 'h':
				if(dom.jquery){
					dom.css('height',val);	
				}else{
					dom.style['height'] = val;
				}
				break;
			case 't':
				if(dom.jquery){
					dom.css('top',val);	
				}else{
					dom.style['top'] = val;
				}
				break;
			case 'l':
				if(dom.jquery){
					dom.css('left',val);	
				}else{
					dom.style['left'] = val;
				}
				break;
			case 'opacity':
				if(dom.jquery){
					dom.css('opacity',val);	
				}else{
					dom.style['opacity'] = val;
				}
				break;
			case 'index':
				if(dom.jquery){
					dom.css('z-index',val);	
				}else{
					dom.style['z-index'] = val;
				}
				break;
			case 'hide':
				if(dom.jquery){
					dom.hide(val);
				}else{
					dom.style['display'] = 'none';
				}
				break;
			case 'show':
				if(dom.jquery){
					dom.show(val);
				}else{
					dom.style['display'] = 'block';
				}
				break;
			case 'html':
				if(dom.jquery){
					dom.html(val);
				}else{
					dom.innerHTML = val;
				}
				break;
			case 'val':
				if(dom.jquery){
					dom.val(val);
				}else{
					dom.value = val;
				}
				break;
			case 'src':
				if(dom.jquery){
					dom.attr('src',val);
				}else{
					dom.src = val;
				}
				break;
			default:break;
		};	
	}

	//简单拖拽控件
	$dc.initSimpleDrag = function(drag,dom){
		drag.onmousedown = function(e){
			$dc.curDrag = dom;
			$dc.curDrag.style['opacity'] = '0.8';
			var rect = $dc.curDrag.getBoundingClientRect(); 
			$dc.isDrag = true;	
			$dc._x = e.clientX - rect.left;
			$dc._y = e.clientY - rect.top;
		}
		document.body.onmousemove = function(e){
			if(!$dc.isDrag){
				return;	
			}
			var x = e.clientX;	
			var y = e.clientY;
			$dc.curDrag.style['left'] = x-$dc._x + 'px';
			$dc.curDrag.style['top'] = y-$dc._y + 'px';
		}
		drag.onmouseup = function(){
			$dc.isDrag = false;	
			$dc.curDrag.style['opacity'] = '1';
			$dc._x = 0;
			$dc._y = 0;
		}
	}
	$dc.dialog = function(config,callback){
		var panel = config['panel'];
		this.fset(panel,'w',config.width+'px');
		this.fset(panel,'h',config.height+'px');
		this.fset(panel,'index',config.zIndex);
	}

	//锁屏控件
	$dc.windowLock = function(config,callback){
		var panel = config['panel'];
		this.fset(panel,'w',config.width+'px');
		this.fset(panel,'h',config.height+'px');
		this.fset(panel,'index',config.zIndex);

		var back = this.createDom('div',null,{
			style:{
				"position":"fixed",
				"top":"0px",
				"left":"0px",
				"width":"100%",
				"height":"100%",
				"background":config.backColor,
				"opacity":config.backOpacity,
				"z-index":config.zIndex-1,
				"display":"none"
			}	
		},document.body);

		var hideLock = function(){
			$(panel).fadeOut();
			$(back).fadeOut();
		}
		var setPanelPosition = function(){
			var w = (document.body.clientWidth-config.width)/2;
			var h = (document.body.scrollHeight-config.height)/2.5;
			panel.style['left'] = w+'px';
			panel.style['top'] = h+'px';
		}

		//document.body.addEventListener('mouseup',hideLock,false);
		window.addEventListener('resize',setPanelPosition,false);
		


		var type = config['type'];
		var speed = config['speed'];
		var time = 0,deg=0;
		var lock = {};
		lock.panel = panel;
		lock.hide = function(callback){
			window.setTimeout(function(){
				hideLock();	
				window.clearInterval(time);
				if(callback){
					callback();
				}
			},100);
		}
		lock.show = function(){
			setPanelPosition();
			switch(type){
				case 'fade':
					$(panel).fadeIn(speed);break;
				case 'show':
					$(panel).show(speed);break;
				default:
					$(panel).fadeIn(speed);break;
			};
			$(back).fadeIn(speed);
			time = window.setInterval(function(){
				deg+=5;
				$('#loading').css('-webkit-transform','rotate('+deg+'deg)');
			},20);
		}
		return lock;	
	}
	
	$dc.changeClickClassForMore = function(jq,name,callback){
		var change = function(){
			jq.removeClass(name);
			$(this).addClass(name);
			if(callback){
				callback(this);	
			}
		}
		jq.unbind('click',change);
		jq.bind('click',change);
	}

	$dc.simpleSlider = function(config,callback,pEvent,nEvent){
		var _this = this;
		this.container = config.container;	
		this.container.innerHTML = '';
		this.items = {};
		this.pre = $dc.createDom('img:slide-pre',null,{src:'./images/pre.png'},this.container);
		this.pre.style['width'] = '40px';
		this.pre.style['height'] = '40px';
		this.next = $dc.createDom('img:slide-next',null,{src:'./images/next.png'},this.container);
		this.next.style['width'] = '40px';
		this.next.style['height'] = '40px';

		$(this.pre).hover(function(){
			this.src = './images/preC.png';
		},function(){
			this.src = './images/pre.png';
		});

		$(this.next).hover(function(){
			this.src = './images/nextC.png';
		},function(){
			this.src = './images/next.png';
		});

		this.moveCount = config.moveCount;
		this.speed = config.speed;
		this.count = 0;
		var getPreNextState = function(){
			_this.pre.style['opacity'] = (_this.count-_this.moveCount)<0?'0.5':'1';
			_this.next.style['opacity'] = (_this.count+_this.moveCount)>=config.items.length?'0.5':'1';
		}
		var toPre = function(){
			if((_this.count-_this.moveCount)<0){
				return;	
			}
			_this.count-=_this.moveCount;
			getPreNextState();
			var _left = -_this.count*(config.itemW+config.itemSpace);
			$(_this.ul).animate({left:_left+'px'},{duration:_this.speed,complete:function(){
				if(pEvent){pEvent(_this);}
			}});
		}

		var toNext = function(){
			if((_this.count+_this.moveCount)>=config.items.length){
				return;		
			}
			_this.count+=_this.moveCount;
			getPreNextState();
			var _left = -_this.count*(config.itemW+config.itemSpace);
			$(_this.ul).animate({left:_left+'px'},{duration:_this.speed,complete:function(){
				if(nEvent){nEvent(_this);}
			}});
		}

		this.pre.onclick = toPre;
		this.next.onclick = toNext;
		
		this.box = $dc.createDom('div',null,null,this.container);
		this.box.style['position'] = 'relative';
		this.box.style['margin'] = 'auto';
		this.box.style['width'] = config.itemW*config.slideCount+(config.slideCount-1)*config.itemSpace+'px';
		this.box.style['height'] = config.itemH + 'px';
		this.box.style['overflow'] = 'hidden';

		this.ul = $dc.createDom('ul',null,null,this.box);
		this.ul.style['position'] = 'absolute';
		this.ul.style['top'] = '0px';
		this.ul.style['left'] = '0px';
		this.ul.style['list-style-type'] = 'none';
		this.ul.style['margin'] = '0px';
		this.ul.style['padding'] = '0px';
		this.ul.style['width'] = (config.itemW+config.itemSpace)*config.items.length+'px';
		
		for(var i=0;i<config.items.length;i++){
			var cname = config.rowClass?config.rowClass:'slide-li';
			var li = $dc.createDom('li:'+cname,null,null,this.ul);	
			li.style['float'] = 'left';
			li.style['width'] = config.itemW+config.itemSpace+'px';
			li.style['height'] = config.itemH+'px';
			li.style['cursor'] = 'pointer';
			this.items[i] = li;
		}
		$.each(this.items,callback);
		getPreNextState();
	}
	
	$dc.confirm = function(panel,mess,cname,a,b,callback){
		var doneEvent = function(){
			callback(true);	
		}

		var cancelEvent = function(){
			callback(false);
		}
		panel.innerHTML = '';
		var message = $dc.createDom('div',null,{
			html:mess,
			width:'100%',
			height:'70%'
		},panel);
		var ctl = $dc.createDom('div',null,{
			width:'100%',
			height:'30%'
		},panel);
		ctl.style['line-height'] = '0px';

		var done = $dc.createDom('img',null,{
			src:a,
			width:'80px',
			click:doneEvent
		},ctl);
		done.style['margin-right'] = '20px';
		done.style['cursor'] = 'pointer';

		var cancel= $dc.createDom('img',null,{
			src:b,
			width:'80px',
			click:cancelEvent
		},ctl);
		cancel.style['cursor'] = 'pointer';
		$(panel).fadeIn();
	}

	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";  
	var base64DecodeChars = new Array(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-1,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,-1,-1,-1,-1,-1);
	/** 
	 * base64编码 
	 * @param {Object} str 
	 */  
	$dc.base64encode = function(str){  
		var out, i, len;  
		var c1, c2, c3;  
		len = str.length;  
		i = 0;  
		out = "";  
		while (i < len) {  
			c1 = str.charCodeAt(i++) & 0xff;  
			if (i == len) {  
				out += base64EncodeChars.charAt(c1 >> 2);  
				out += base64EncodeChars.charAt((c1 & 0x3) << 4);  
				out += "==";  
				break;  
			}  
			c2 = str.charCodeAt(i++);  
			if (i == len) {  
				out += base64EncodeChars.charAt(c1 >> 2);  
				out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
				out += base64EncodeChars.charAt((c2 & 0xF) << 2);  
				out += "=";  
				break;  
			}  
			c3 = str.charCodeAt(i++);  
			out += base64EncodeChars.charAt(c1 >> 2);  
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
			out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));  
			out += base64EncodeChars.charAt(c3 & 0x3F);  
		}  
		return out;  
	}  
	/** 
	 * base64解码 
	 * @param {Object} str 
	 */  
	$dc.base64decode = function(str){  
		var c1, c2, c3, c4;  
		var i, len, out;  
		len = str.length;  
		i = 0;  
		out = "";  
		while(i < len){  
			/* c1 */  
			do{  
				c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
			}while (i < len && c1 == -1);  

			if(c1 == -1){
				break;  
			}
			/* c2 */  
			do {  
				c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
			}while (i < len && c2 == -1);  

			if (c2 == -1){
				break;  
			}
			out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
			/* c3 */  
			do{  
				c3 = str.charCodeAt(i++) & 0xff;  
				if (c3 == 61){
					return out;  
				}
				c3 = base64DecodeChars[c3];  
			}while (i < len && c3 == -1);  

			if(c3 == -1){
				break;  
			}
			out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
			/* c4 */  
			do {  
				c4 = str.charCodeAt(i++) & 0xff;  
				if (c4 == 61){
					return out;  
				}
				c4 = base64DecodeChars[c4];  
			}while (i < len && c4 == -1);  
			if (c4 == -1){
				break;  
			}
			out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
		}  
		return out;  
	}  

	/*****相对屏幕绝对居中****/
	$dc.absCenter = function(dom){
		var reSize = function(){
		}
	} 
	/*****克隆对象*****/
	$dc.cloneObj = function(obj){
		return $.extend(true,{},obj,{});
		//function Clone(){}
		//Clone.prototype = obj;
		//var o = new Clone();
		//for(var a in o){
			//if(typeof o[a] == "object") {
				//o[a] = $dc.cloneObj(o[a]);
			//}
		//}
		//return o;
	}
	
	$dc.hackArrIndexOf = function(){//让IE支持indexOf来处理数组
		if (!Array.prototype.indexOf)
		{
			Array.prototype.indexOf = function(elt /*, from*/)
			{
				var len = this.length >>> 0;

				var from = Number(arguments[1]) || 0;
				from = (from < 0)
					? Math.ceil(from)
					: Math.floor(from);
				if (from < 0)
					from += len;

				for (; from < len; from++)
				{
					if (from in this &&
							this[from] === elt)
						return from;
				}
				return -1;
			};
		}
	}

	$dc.confirmaction = function(input,type,map,tipFlag){
		this.tipMap =  map;
		this.create = function(info){
			$(input).css('border','1px solid red');
			if(tipFlag){return;}
			if($(input).val()==''){return;}
			var text = $dc.createDom('div:','',{html:info},$(input).parent()[0]);
			var tPic = $dc.createDom('div:icon-tishi','',null,text);
			tPic.style['position'] = 'relative';
			tPic.style['float'] = 'right';
			tPic.style['top'] = '2px';
			tPic.style['margin-left'] = '5px';
			text.style['position'] = 'absolute';
			text.style['right'] = '5px';
			text.style['top'] ='10px';
			text.style['color'] = 'red';
			text.style['z-index'] = '100';
			text.style['background-color'] = 'white';
			text.style['padding-left'] = '5px';
			text.style['font-size'] = '12px';
			window.setTimeout(function(){
				$(text).fadeOut();
			},3000000);
		}
		this.test = function(input,type){
			var val = $(input).val();
			var nreg = /^[a-zA-Z0-9\u4e00-\u9fa5\.\-\_]+$/;//名字
			var reg =  /^\d+$/;//正整数
			var b= /[\ \　\`\｀\~\～\!\！\@\·\#\＃\$\￥\%\％\^\…\&\＆\(\)\（\）\-\－\_\—\=\＝\+\＋\[\]\［\］\|\·\:\：\;\；\\\"\“\\\\\、\'\‘\,\，\<\>\〈\〉\?\？\/\／\*\＊\.\。\{\}\｛\｝]/;
			var user= /[\\\/\:\*\?\"\<\>\|\@\[\]\;\=\,\+]/;
			var mail= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			switch (type) {
				case 'VM_NAME':
					if(val ==''){
						this.create(this.tipMap[type]);
						return false;
					}else if(!nreg.test(val)){
						this.create(this.tipMap[type]);
						return false;
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'NUMBER':
					if(val ==''){
						this.create(this.tipMap[type]);
						return false;
					}else if(isNaN(val)){
						this.create(this.tipMap[type]);
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'CREATE_VM_NUM':
					if(val ==''){
						this.create(this.tipMap[type]);
						return false;
					}else if(!reg.test(val)||val<1||val>1000){
						this.create(this.tipMap[type]);
						return false;
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'ADD_VM_NUM':
					if(val ==''){
						this.create(this.tipMap[type]);
						return false;
					}else if(!reg.test(val)||val<0||val>1000){
						this.create(this.tipMap[type]);
						return false;
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'PREPARE_START_NUM':
					if(val ==''){
						this.create(this.tipMap[type]);
						return false;
					}else if(!reg.test(val)||val<0||val>1000){
						this.create(this.tipMap[type]);
						return false;
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'CPU_NUM':
					if(val ==''){
						this.create(this.tipMap[type]);
						return false;
					}else if(!reg.test(val)||val<1||val>160){
						this.create(this.tipMap[type]);
						return false;
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'MEM_NUM':
					if(val ==''){
						this.create(this.tipMap[type]);
						return false;
					}else if(!reg.test(val)||val<512||val>2147483647){
						this.create(this.tipMap[type]);
						return false;
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'DISK_SIZE':
					if(val ==''){
						this.create(this.tipMap[type]);
						return false;
					}else if(!reg.test(val)||val<1||val>2147483647){
						this.create(this.tipMap[type]);
						return false;
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'EXPEND_DISK_SIZE':
					if(val ==''){
						this.create(this.tipMap[type]);
						return false;
					}else if(!reg.test(val)||val<0||val>2147483647){
						this.create(this.tipMap[type]);
						return false;
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'MAIL':
					if(val ==''){
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}else if(!mail.test(val)){
						this.create(this.tipMap[type]);
						return false;
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'USERNAME':
					val = val.trim();
					if(val ==''){
						this.create('用户名不能为空');
						return false;
					}else if(user.test(val)){
						this.create(this.tipMap[type]);
						return false;
					}else{
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}
				case 'PASSWORD':
					var m=0; 
					var Modes=0; 
					for(i=0; i<val.length; i++){ 
						var charType=0; 
						var t=val.charCodeAt(i); 
						if(t>=48 && t <=57){charType=1;} 
						else if(t>=65 && t <=90){charType=2;} 
						else if(t>=97 && t <=122){charType=4;} 
						else if(b.test(val)){
							charType=8;
						} 
						else{charType=4;} 
						Modes |= charType; 
					} 
					for(i=0;i<5;i++){ 
						if(Modes & 1){m++;} 
						Modes>>>=1; 
					} 
					if(val.length<10){m=0;} 
					if(m>=2){
						$('.tip').html('');
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}else if(m<1){
						$(input).css('border','1px solid red');
						$('.tip').html('密码长度最少10位！');
						return false;
					}else{
						$(input).css('border','1px solid red');
						$('.tip').html('密码必须由数字、小写字母、大写字母或其它特殊符号当中的两种及以上组合而成！');
						return false;
					}
					
					case 'STRONGPASSWORD':
					var m=0; 
					var Modes=0; 
					for(i=0; i<val.length; i++){ 
						var charType=0; 
						var t=val.charCodeAt(i); 
						if(t>=48 && t <=57){charType=1;} 
						else if(t>=65 && t <=90){charType=2;} 
						else if(t>=97 && t <=122){charType=4;} 
						else if(b.test(val)){
							charType=8;
						} 
						else{charType=4;} 
						Modes |= charType; 
					} 
					for(i=0;i<5;i++){ 
						if(Modes & 1){m++;} 
						Modes>>>=1; 
					} 
					if(val.length<10){m=0;} 
					if(m>=3){
						$('.tip').html('');
						$(input).css('border','1px solid #E5E9EF');
						return true;
					}else if(m<1){
						$(input).css('border','1px solid red');
						$('.tip').html('密码长度最少10位！');
						return false;
					}else{
						$(input).css('border','1px solid red');
						$('.tip').html('密码必须由数字、小写字母、大写字母或其它特殊符号当中的三种及以上组合而成');
						return false;
					}
				default:
					$(input).css('border','1px solid red');
					return false;
			}
		}
		return	this.test(input,type);
	}

	/****调试信息*****/
	$dc.logOpen = true;//调试开关
	$dc.log = function(msg){
		if(this.logOpen){
			
		}
	}

	window.$dc = $dc;
})(window);

