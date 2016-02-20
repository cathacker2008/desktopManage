(function($){
	var defaultConfig = {//缺省参数
		headAlign:'left',
		bodyAlign:'left',
		rowHeight:40,
		size:20,
		page:1
	};
	var createTable = function(table){//表头
		table.widthArr= [];
		var param = table.config;
		if(!table.config.notFixedHead){
			this.vtable = $dc.createDom('table:desk-table','',null,table.parentContent);
			this.vthead = $dc.createDom('thead:desk-table-thead','',null,this.vtable);	
		}
		this.wrap = $dc.createDom('div:desk-wrapper','',null,table.parentContent);
		var parentContent= table.parentContent;
		this.table = $dc.createDom('table:desk-table','',null,this.wrap);	
		this.thead = $dc.createDom('thead:desk-table-thead','',null,this.table);	
		this.header = $dc.createDom('tr:desk-table-header','',null,this.thead);	
		$(this.wrap).css('width',param.width?param.width:'');
		$(this.wrap).css('height',param.height?param.height:'');
		if($.fn.slimScroll){
			$(this.wrap).slimScroll({
				height:	param.height+'px'
			});
		}else{
			$(this.wrap).css('overflow','auto');
		}
		//$(this.table).css('width',param.width?param.width:'');
		$(this.table).css('text-align',param.headAlign);
		$(this.table).css('width','100%');
		if(!table.config.notFixedHead){
			$(this.vtable).css('text-align',param.headAlign);
			$(this.vtable).css('width','100%');
		}
		var len = param.keys?param.keys.length:0;
		var ro =parentContent.getBoundingClientRect();
		var width = param.width||ro.width||ro.right-ro.left;
		if(!len){return;}
		var constWidth = 0;
		var constNum = 0;
		if(width.toString().indexOf('%') != -1){
			width = ro.width||ro.right-ro.left;
		}
		for(var i=0;i<len;i++){
			if(param.keys[i].width){
				if(param.keys[i].width.toString().indexOf('%') != -1){
					constWidth+= width*parseInt(param.keys[i].width)/100;
				}else{
					constWidth+=parseInt(param.keys[i].width);
				}
				constNum ++;
			}
		}
		//if(param.checkBox){
			var checkBox =  $dc.createDom('th:desk-table-header-colnum d-none','',null,this.header);
			this.input = $dc.createDom('input:','',null,null);
			this.input.setAttribute('type','checkbox');
			checkBox.appendChild(this.input);
			$dc.fset(checkBox,'w','30px');
			$dc.fset(this.input,'w','14px');
			$dc.fset(this.input,'h','14px');
			$(this.input).change(function(){
				table.checkData = [];
				var opt = this.checked?true:false;
				var len = table.child.length;
				$.each(table.child,function(i,n){
					$(this.checkBox).attr('checked',opt);
					$(this.checkBox).change();
				});
			});
			if(param.checkBox){
				$(checkBox).show();
			}
			width -=32;
		//}
		for(var i=0;i<len;i++){
			var tmp = this['c'+i] = $dc.createDom('th:desk-table-header-colnum','',{
				html:param.keys[i].title
			},this.header);
			$(tmp).css('text-align',param.keys[i].headAlign?param.keys[i].headAlign:param.headAlign);
			var _w = param.keys[i].width;
			var tw = tmp.style['width'] = _w?(_w.toString().indexOf('%') ==-1?_w+'px':(width*parseInt(_w)/100)+'px'):((width-constWidth)/(len-constNum))+'px';
			table.widthArr.push(tw);
			table.headerArr.push(tmp);
			//tmp.title = param.keys[i].title;
		}
		if(!table.config.notFixedHead){
			//$(this.vthead).hide();
			$(this.vthead).append($(this.header).clone(true));
			var headHieght = $(this.header).outerHeight(true);
			$(this.table).css('marginTop',-(headHieght+1));
			//$(this.vthead).show();
		}
		$(this.table).bind('click',function(e){
			var e = e || window.event;
			var target = e.target || e.srcElement;
			table.getTarget('click',target);
		});
		return this;
	}
	var createFoot = function(param,parentContent){//表尾

		this.panel = $dc.createDom('div:desk-table-foot','',null,parentContent);	
		//$(this.panel).css('width',param.width?param.width:'');
		if(param.pageTurnDisable){
			$(this.panel).css('height',0);
		}
		return this.panel;

	}
//--------------------------------------------------------表格对象------------------------------------------------------//
	var deskTable = function(){//table对象
		var self = this;
		this.originData = {};
		this.selectObj = {};
		this.widthArr = [];
		this.headerArr = [];
		this.data = [];
		this.child = [];
		this.init = function(){
			this.setcfg();
			this.showTable();	
			this.showFoot();	
			this.getData();
		}
		this.clearVhead = function(){
			$(this.tableEle.vthead).empty();
		}
		this.setVhead = function(){
			$(this.tableEle.vthead).append($(this.tableEle.header).clone(true));
		}
		this.reSize = function(){
			this.widthArr = [];
			var table = this;
			var param = this.config;
			var len = param.keys?param.keys.length:0;
			var ro = this.parentContent.getBoundingClientRect();
			var width = param.width||ro.width||ro.right-ro.left;
			var constWidth = 0;
			var constNum = 0;
			if(width.toString().indexOf('%') != -1){
				width = ro.width||ro.right-ro.left;
			}
			for(var i=0;i<len;i++){
				if(param.keys[i].width){
					if(param.keys[i].width.toString().indexOf('%') != -1){
						constWidth+= width*parseInt(param.keys[i].width)/100;
					}else{
						constWidth+=parseInt(param.keys[i].width);
					}
					constNum ++;
				}
			}
			if(param.checkBox){
				width -= 32;
			}
			this.clearVhead();
			$.each(this.headerArr,function(i){
				var _w = param.keys[i].width;
				var tw = this.style['width'] = _w?(_w.toString().indexOf('%') ==-1?_w+'px':(width*parseInt(_w)/100)+'px'):((width-constWidth)/(len-constNum))+'px';
				table.widthArr.push(tw);
			});
			this.setVhead();
		}
		this.clearCheck = function(){
			$(this.tableEle.input).attr('checked',false);
			$(this.tableEle.input).change();
		}
		this.serialize = function(data){
			var keys = this.config.keys;
			var listener = this.config.listener;
			var len = keys.length;
			var llen = listener?listener.length:0;
			if(!len){return false};
			var tempArr = new Array();
			for(var i=0;i<len;i++){
				tempArr.push(data[keys[i].key]);
			}
			if(llen){
				for(var j=0;j<llen;j++){
					tempArr.push(data[listener[j]]);
				}
			}
			return tempArr;
		}
		this.getEle = function(row,col){//根据坐标从表中中获取对应的对象
			if((row ==0 || row ) && (col ==0 || col)){
				if(this.child[row] && this.child[row].child.length){
					return this.child[row].child[col];
				}else{
					return false;
				}
			}else if(row ==0 || row ){
				return this.child[row]; 
			}else if(col ==0 || col){
				var len = this.child.length;	
				var cols = new Array();
				for (var i =0;i<len;i++){
					cols.push(this.child[i].child[col]);
				}
				return cols;
			}
			else{
				return this.child;
			}

		}
		this.showNull = function(info){
			if(!this.nullPanel){
				this.nullPanel = $dc.createDom('div:desk-nullPanel','',{html:info?info:''},null); 
				$(this.tableEle.table).after(this.nullPanel);
			}
			if(this.config.rowHeight){
				$(this.nullPanel).css('height',this.config.rowHeight);
				$(this.nullPanel).css('line-height',this.config.rowHeight+'px');
			}
			$(this.nullPanel).show();
		}
		this.hideNull = function(){
			$(this.nullPanel).hide();	
		}
		this.showTable = function(){
			this.tableEle = new createTable(this);
		}
		this.showFoot = function(){
			this.foot = new createFoot(this.config,this.parentContent);
		}
		this.getTarget = function(type,dom){
			var obj;
			if(dom.col !=undefined &&dom.col != null){
				obj = this.child[dom.row].child[dom.col];
			}else if(dom.row !=undefined &&dom.row != null){
				obj = this.child[dom.row];
			}
			switch(type){
				case 'click':
					{
						if(this.config.click){
							this.config.click(obj,self);
						}
						break;
					}
				case 'mouseOver':
					{
						if(this.config.mouseOver){
							this.config.mouseOver(obj);
						}
						break;
					}
				case 'mouseOut':
					{
						if(this.config.mouseOut){
							this.config.mouseOut(obj);
						}
						break;
					}
			}
		}
	//-------------------------------------行对象-----------------------------------------------//
		this.createRow = function(){
			this.datas = [];
			this.child = [];
			//--------------------------列对象---------------------------------//
			this.createColumn = function(row){
				this.changeToInput = function(){
					$(this.dom).empty();
					this.input = $dc.createDom('input:','','',this.dom);
					this.input.type = 'text';
					$(this.input).val(this.data);
				}
				this.changeToText = function(){
					$(this.dom).empty();
					$(this.dom).html(this.data);
				}
				this.update  = function(row,colNum){
					this.rowNum = row.rowNum;
					this.colNum = colNum;
					this.data = row.datas[colNum];
					this.baseInfo = row.baseInfo;
					this.parentObj = row;
					if(self.config.keys[colNum].formatter){
						this.formatter = self.config.keys[colNum].formatter;
					}
					var content = this.formatter?this.formatter(this.data,this.baseInfo,this):this.data;
					if(!this.dom){
						this.dom = $dc.createDom('td:desk-table-body-col','',null,row.dom);
					}
					$(this.dom).html('');
					//if(typeof(content)=='object'){
						//content.col=this.colNum;
						//content.row=this.rowNum;
						//$.each($(content).children(),function(i,n){
							//this.col = content.col;
							//this.row = content.row;
						//});
						//this.dom.appendChild(content);	
					//}else{
						//$(this.dom).html(content);	
					//}
					typeof(content)=='object'?this.dom.appendChild(content):$(this.dom).html(content);
					$(this.dom).css('text-align',self.config.keys[colNum].bodyAlign?self.config.keys[colNum].bodyAlign:self.config.bodyAlign);
					$(this.dom).css('max-width',self.widthArr[this.colNum]);
					this.dom.row = this.rowNum;
					this.dom.col = this.colNum;
					//row.child.push(this);
				}
			}
			//---------------------------列对象结束----------------------------//
			this.update = function(originData,datas,rowNum){
				if(!this.dom){
					this.dom = $dc.createDom('tr:desk-table-body-row','',null,self.tableEle.table);
					$(this.dom).css('text-align',self.config.bodyAlign);
					$(this.dom).css('height',self.config.rowHeight?self.config.rowHeight:'');
					$(this.dom).hover(function(e){
						self.getTarget('mouseOver',e.currentTarget);
					},function(e){
						self.getTarget('mouseOut',e.currentTarget);
					})
				}
				//var len = datas.length;
				var len = self.config.keys.length;
				var _row = this;
				this.rowNum = rowNum;
				this.baseInfo = originData;
				this.orginColor = rowNum?rowNum%2?self.config.evenColor:self.config.oddColor:self.config.oddColor;
				$(this.dom).css('backgroundColor',this.orginColor);

				if(!this.checkBox){
					var td = $dc.createDom('td:desk-table-body-col d-none','',null,this.dom);
					this.checkBox= $dc.createDom('input:','',null,null);
					this.checkBox.setAttribute('type','checkbox');
					td.appendChild(this.checkBox);
					$dc.fset(this.checkBox,'w','14px');
					$dc.fset(this.checkBox,'h','14px');
					if(self.config.checkBox){
						$(td).show();
					}
					$(this.checkBox).bind('click',function(e){
						e.stopPropagation();
					});
					var ckChange = function(e,n){
						e.stopPropagation();
						if(this.checked){
							self.selectObj[_row.baseInfo[self.config.mark]] = 'checked';
						}else{
							delete self.selectObj[_row.baseInfo[self.config.mark]];
						}
						self.checkManage(_row);
					}
					if($.browser.msie && $.browser.version.indexOf('8.0') !=-1 ){
						$(this.checkBox).unbind();
						$(this.checkBox).bind('propertychange',ckChange);	
					}else{
						$(this.checkBox).change(function(e,n){
							e.stopPropagation();
							if(this.checked){
								self.selectObj[_row.baseInfo[self.config.mark]] = 'checked';
							}else{
								delete self.selectObj[_row.baseInfo[self.config.mark]];
							}
							self.checkManage(_row);
						});
					}
				}
				this.setCheck = function(flag){
					$(this.checkBox).attr('checked',flag);
					$(this.checkBox).change();
				}
				for(var i=0;i<len;i++){
					if(!this.datas[i] || this.datas[i].toString() != datas[i].toString() || self.config.keys[i].formatter){
						this.datas[i] = datas[i];
						var col = this.child[i]?this.child[i]:new this.createColumn(this);
						col.update(this,i);
						this.child[i] = col;
					}	
				}
				this.dom.row = this.rowNum;
				if(!$.isEmptyObject(self.config.subTable)){
					this.subObj = self.config.subTable;
					if(!this.subDom){
						var tr =  $dc.createDom('tr:desk-table-body-row','',null,self.tableEle.table);
						this.subDom = $dc.createDom('td:desk-table-body-col','',null,tr);
						$(this.subDom).css('text-align',self.config.subTable.bodyAlign);
					}
					$(this.subDom).deskTable(self.config.subTable);
					this.subDom.setAttribute('colspan',12);
				}
			}
			this.destroy = function(){
				if(self.config.mark){
					this.setCheck(false);
					delete self.selectObj[this.baseInfo[self.config.mark]];
				}
				$(this.dom).remove();
			}
			self.child.push(this);
		}
	//---------------------------------------------行对象结束--------------------------------------//
		this.checkManage = function(dom){
			this.checkData = [];
			this.unCheckData = [];
			var mark = this.config.mark;
			var len = this.child.length;
			if(!len){return;}
			for(var i=0;i<len;i++){
				if(this.selectObj[this.child[i].baseInfo[mark]]){
					this.child[i].checked = true;
					this.checkData.push(this.child[i]);
				}else{
					this.unCheckData.push(this.child[i]);
					this.child[i].checked = false;
				}
				if(this.config.checked){
					this.config.checked(this.child[i],this.checkData,this.unCheckData);
				}
			}
		}
		this.dataManage = function(data){
			var rows = data.rows;
			var len = rows?rows.length:0;
			var dataLen = this.data.length;
			var colNum = this.config.keys.length; 
			if(!len || !colNum){
				this.showNull('暂无数据');
				$.each(this.child,function(i,n){
					this.destroy();
				});
				this.data = [];
				this.child = [];
				if(this.config.callback){
					this.config.callback(this);
				}
				return;
			}else{
				this.hideNull();
			}
			this.bodyDom = [];
			for(var i=0;i<len;i++){
				if(!this.data[i] || this.data[i].toString() != this.serialize(rows[i]).toString()){
					this.data[i] = this.serialize(rows[i]);
					var row = this.child[i]?this.child[i]:new this.createRow();
					row.update(rows[i],this.data[i],i);
					this.child[i] = row;
					if(this.selectObj[row.baseInfo[this.config.mark]]){
						row.setCheck(true);	
					}else{
						row.setCheck(false);
					}
				}
				this.bodyDom.push(this.child[i].dom);
			}	
			if(len<dataLen){
				var tmp = i;
				for(i;i<this.data.length;i++){
					this.child[i].destroy();
				}
					this.data.splice(tmp,dataLen-len);
					this.child.splice(tmp,dataLen-len);
			}
			if(this.config.callback){
				this.config.callback(this);
			}
		}
		this.getData = function(){
			if(this.config.url){
				var param;
				if(this.config.type =='post' || this.config.type == 'POST' ){
					 this.param.rows = this.size;
					 this.param.page = this.page;
					 param = this.param;
				}else{
					param = '?rows='+this.size+'&page='+this.page;	
				}
				$dc.request(this.config.url,param,function(data){
					if(!self.config.pageTurnDisable){
						self.total = data.total;
						$(self.foot).children().remove();
						$(self.foot).tablePage({
							totalRecord:data.total,
							pageSize:self.size,
							pageIndex:self.page,
							callback:function(thisPageIndex,thisPageSize){
								if((self.page != thisPageIndex) || (self.size  != thisPageSize)){
									$(self.tableEle.input).attr('checked',false);
									$(self.tableEle.input).change();
								}
								self.page = pageIndex = thisPageIndex;
								self.size = pageSize = thisPageSize;
								self.getData();
							}
						});	
					}
					//}else{
						//$(self.foot).empty();
						//$(self.foot).css('height',0);
					//}
					self.dataManage(data);
				},this.config.type?this.config.type:'get');
			}else if(this.config.data){
			
			}else{
			
			}
		}
	this.setcfg = function(){
		this.size = this.config.size;
		this.page = this.config.page;
		if(this.config.type == 'post' || this.config.type == 'POST'){
			this.param = {};
		}
		if(this.config.data){
			this.originData = this.config.data;
		}
	}
}
deskTable.prototype.setParam = function(key,val){
	this[key] = val;
	};
//---------------------------------------------------------------表格对象结束----------------------------------------------------//
	$.fn.deskTable = function(config){//程序入口
		this.html('');
		if($('link[href$="deskTable.css"]').length ==0){
			$dc.loadCSS('./css/deskTable.css');
		}
		var config = $.extend(true,{},defaultConfig,config);
		var table = new deskTable();
		table.setParam('config',config);
		table.setParam('parentContent',this[0]);
		table.init();
		return table;
	};
})(jQuery);

