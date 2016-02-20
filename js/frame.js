(function(w){
	var desk = {};
	desk.userType = null;//用户类型，三权分立用
	desk.server = {};
	//desk.server.path = 'https://192.168.20.54:8443/';
	desk.server.path = '../../desktopManager/';
	desk.server.map = {
		'pandect':'rest/system/modelCount',//查询系统资源数量（数据中心，集群，主机，桌面）
		'resourcelist':'rest/system/statistics',//桌面资源统计数据
		'clusterlist':'rest/system/cluster/list',//查询集群列表
		'cluster':'rest/system/cluster/',//查询集群统计信息/主机列表exp:cluster/{id}/statistics(hosts)'
		'history':'rest/session/statistics',//查询历史会话统计time_type：minute,hour,day
		'host':'rest/system/host/',//查询主机统计信息exp:host/{id}/statistics'
		'deskTopList':'rest/desktop/list',//查询桌面列表
		'moudleList':'rest/template/list',//查询模板
		'createmoudle':'rest/template/add',//创建模板
		'moudleAction':'rest/template/',//编辑/删除模板exp:template/{id}/update/delte
		'desktype':'rest/desktoptype/list',//查询桌面类型
		'network':'rest/network/list',//查询网络列表
		'getnetwork':'rest/network/',//查询虚拟机网卡exp:rest/network/{id}/vm
		'createdesk':'rest/desktop/add',//创建桌面
		'createdesks':'rest/desktop/batchAdd',//创建桌面
		'deskinfo':'rest/desktop/',//查询桌面信息后加桌面ID
		'deskaction':'rest/desktop/',//exp：desktop/{id}/delete addDisk
		'deskpoolallotuser':'rest/pool/',//桌面池分配用户
		'diskaction':'rest/disk/',//exp: disk/{id} delete update
		'desktoptype':'rest/desktoptype/list',//查询桌面类型
		'adddesktype':'rest/desktoptype/add',//增加桌面类型
		'edittype':'rest/desktoptype/',//修改/删除桌面类型 exp:desktoptype/{id}/delete(update)
		'getpoollist':'rest/pool/list',//查询桌面池列表
		'createsnapshot':'rest/snapshot/add',//创建快照
		'snapshotaction':'rest/snapshot/',//删除/恢复快照exp:snapshot/{id}/delete(clone)
		'addpool':'rest/pool/add',//添加桌面池
		'editpool':'rest/pool/',//添加桌面池 exp:pool/{id}/update  desktops(查询桌面池内虚拟机)
		'separatepool':'rest/pool/detachVm/',//exp: detachVm/{id}
		'getdomain':'../webadmin/domainList',//获取域
		'getuserlist':'rest/user/list',//获取用户列表
		'getsessionlist':'rest/session/list', //获取会话列表
		'closesession':'rest/session/close', //结束会话
		'open':'rest/session/', //控制台连接exp:session/{id}/open
		'getloglist':'rest/event/list',//获取日志列表
		'getwarninglist':'rest/alarm/list',//获取警告列表
		'getuser':'rest/user/query',//获取用户{searchString：关键字符串,domain:域}
		'adduser':'rest/user/add',//添加用户到域，post
		'createuser':'rest/user/create',//新建用户，post
		'deluser':'rest/user/',//删除用户exp:user/{id}/delete
		'getuserinfo':'rest/system/islogin',//获取用户信息
		'changepwd':'rest/system/changePassword',//修改密码
		'about':'rest/license/query',//关于信息
		'quaryAdTree':'rest/user/queryAdTree',//查询树结构
		'getuserVm':'rest/user/',//查询用户桌面列表 exp:user/{id}/desktops
		'logout':'rest/system/logout'//注销
	}
	desk.server.getUrl = function(url){
		if(url.url){
			return (this.path+this.map[url.url]+url.path+(url.action?url.action:''));
		}else{
			return (this.path+this.map[url]);
		}
	};
	desk.server.request = function(url,data,callback,type,sync){
		var url = this.getUrl(url);
		$dc.request(url,data,function(retData){
			if((retData.login != undefined && retData.login != null) && (retData.login == false || retData.login =='false')){
				window.location.href = '../../';
			}
			callback(retData);
		//},'post',sync);
		},type,sync);
	};
	desk.server.getVmNetwork = function(api,callback,sync){
		desk.server.request(api,null,function(data){
			if(callback){
				callback(data);
			}
		},'get',sync);
	}
	desk.server.getSelectItem = function(api,callback,sync){
		 desk.server.request(api.url,api.path,function(data){
			 var arr = [];
			 if(!data.rows || data.rows.length <=0){
				if(callback){
					callback(arr);
				}
				 return;
			 }
			 var len = data.rows.length;
			 var serializeData = function(obj){
				switch (api.url){
					case 'desktype' :{
						obj.opt = obj.type_name;
						obj.val = obj.type_id;
						break;
					}
					case 'moudleList' :{
						if(obj.status != 0 ){obj.isDiscard = true};
						obj.opt = obj.name+(obj.template_version_name?(' / '+obj.template_version_name):'');
						obj.val = obj.vmt_guid;
						break;
					}
					case 'network' :{
						obj.opt = obj.name;
						obj.val = obj.id;
						break;
					}
					case 'clusterlist' :{
						obj.opt = obj.name;
						obj.val = obj.vds_group_id;
					}
				}	
			 }
			 $.each(data.rows,function(i,n){
				 serializeData(this);
				 this.isDiscard?'':arr.push(this);
				if(i >= len -1){
					if(callback){
						callback(arr);
					}
				}
			 });
			},'get',sync);
	}

	desk.server.getDomain = function(callback){
		desk.server.request('getdomain',null,function(data){
			var arr = [],tmp;
			tmp = data.split(';');
			var len = tmp.length;
			for(var i=0;i<len;i++){
				var obj ={};
				obj.opt = tmp[i];
				obj.val = tmp[i];
				arr.push(obj);
				if(i == len-1){
					if(callback){
						callback(arr);
					}
				}
			}
		},'get');
	}

	w.server = desk.server;
	w.desk = desk;

})(window);


(function(w){
	var popCtrl = {};
	popCtrl.deskManageAdd = {
		title:'创建桌面',
		url:'./popMoudle/deskmanageAdd-subContent.html'
	}
	popCtrl.createMoudle = {
		title:'创建模板',
		url:'./popMoudle/createMoudle-subContent.html'
	}
	popCtrl.createSnap = {
		title:'创建快照',
		url:'./popMoudle/createSnap.html'
	}
	popCtrl.showDetails = {
		title:'查看详情',
		url:'./popMoudle/showDetails.html'
	}
	popCtrl.showSearch = {
		title:'高级搜索',
		url:'./popMoudle/advanceSearch.html'
	},
	popCtrl.deskpoolAdd = {
		title:'新建',
		url:'./popMoudle/deskpoolAdd-subContent.html'
	}
	popCtrl.deskpoolEdit = {
		title:'编辑',
		url:'./popMoudle/deskpoolEdit-subContent.html'
	}
	popCtrl.deskpoolDelete = {
		title:'删除',
		url:'./popMoudle/deskpoolDelete-subContent.html'	
	},
	popCtrl.deskpoolAllocateuser = {
		title:'分配用户',
		isTable:true,
		url:'./popMoudle/Allocate-user.html'	
	},
	
	popCtrl.desktypeAdd = {
		title:'新建桌面类型',
		url:'./popMoudle/desktypeAdd-subContent.html'
	},
	popCtrl.desktypeDelete = {
		title:'删除',
		url:'./popMoudle/desktypeDelete-subContent.html'
	},
	popCtrl.allotUser = {
		title:'增加用户',
		isTable:true,
		url:'./popMoudle/deskAllotUser-subContent.html'
	},
		popCtrl.dsallotUser = {
		title:'增加用户',
		isTable:true,
		url:'./popMoudle/dspoolAllotUser.html'
	},
	popCtrl.mouldEdit = {
		title:'编辑模板',
		url:'./popMoudle/mouldEdit-subContent.html'
	},
	popCtrl.mouldDelete = {
		title:'删除',
		url:'./popMoudle/mouldDelete-subContent.html'
	},
	popCtrl.userCreate = {
		title:'创建用户',
		url:'./popMoudle/deskCreateUser-subContent.html'
	},
	popCtrl.userAdd = {
		title:'添加用户',
		url:'./popMoudle/deskAllotUser-subContent.html'
	},
	popCtrl.userDelete = {
		title:'删除',
		url:'./popMoudle/userManageDelete-subcontent.html'
	},
	popCtrl.editPassword = {
		title:'修改密码',
		url:'./popMoudle/editPassword.html'
	},
	popCtrl.addDisk = {
		title:'添加磁盘',
		url:'./popMoudle/addDisk.html'
	},
	popCtrl.editDisk = {
		title:'编辑磁盘',
		url:'./popMoudle/editDisk.html'
	},
	popCtrl.delDisk = {
		title:'删除磁盘',
		url:'./popMoudle/delDisk.html'
	},
	popCtrl.sessionDelete = {
		title:'批量结束会话',
		url:'./popMoudle/sessionShutDown.html'
	}
	
	w.popCtrl = popCtrl;
})(window);

(function(w){
	var popBox ={}
	popBox.wrapper = $('.popWrapper')[0];
	popBox.container = $('.popContainer')[0];
	popBox.content = $('.popContent')[0];
	popBox.title = $('.popTitle')[0];
	popBox.closeBtn = $('.popHead').find('img')[0];
	popBox.reSize = function(){
		this.height = $(document).height();
		this.width = $(document).width();
		this.cHeight = $(this.container).height();
		this.cWidth = $(this.container).width();
		$(this.wrapper).css('height',this.height);
		$(this.wrapper).css('width',this.width);
		$(this.container).css('top',(this.height-this.cHeight)/2-50);
		$(this.container).css('left',(this.width-this.cWidth)/2);
	}
	popBox.init = function(param,callback){
		if(!param){
			this.container = $('.popgif')[0];
			$(this.container).show(0,function(){popBox.reSize();});
			return;
		}
		$(this.title).html(param.title);
		if(param.info){
			$(this.content).html(param.info);
			$(this.container).show(0,function(){
					popBox.reSize();
			});
		}else if(param.beforeLoadContent || param.contentItem){
			$(this.container).show(0,function(){
				PCC.init(param);
				popBox.reSize();
			});
		}else{
			if(param.isTable){
				$(this.content).html('');
				var iframe = $dc.createDom('iframe:','',{"width":600,"height":410,"frameborder":"no","border":"0"},this.content);
				iframe.width='600px';
				iframe.height='410px';
				iframe.marginwidth = 0;
				iframe.marginheight = 0;
				iframe.scrolling = 'no';
				$(iframe).attr('src',param.url);
					$(popBox.container).show(0,function(){
						popBox.reSize();
					});
					
			}else{
				$(this.content).load(param.url,function(){
					$(popBox.container).show(0,function(){
						if(callback){
							callback();
						}
						popBox.reSize();});
				});
			}
		}
		$(this.wrapper).show();
		$(this.closeBtn).bind('click',popBox.hide);
	}
	popBox.show = function(e){
		var param = e.title?e:popCtrl[e.currentTarget.className];
		if(!param){return;}
		popBox.init(param);
	}
	popBox.hide = function(){
		$(popBox.wrapper).hide();
		$(popBox.container).hide();
	}
	$(window).resize(function(){
		popBox.reSize();
	});
	w.popBox = popBox;
})(window);


(function(w){
	var tip = {};
	tip.map = {//输入框验证使用
		'VM_NAME':'不能为空,只包含数字，字母及【.-_】',
		'NUMBER':'不能为空，只能为数字，最大1024',
		'CREATE_VM_NUM':'请输入1-1000的整数',
		'ADD_VM_NUM':'请输入0-1000的整数',
		'PREPARE_START_NUM':'请输入0-1000的整数',
		'CPU_NUM':'请输入1-160的整数',
		'MEM_NUM':'请输入512-2147483647的整数',
		'DISK_SIZE':'请输入1-2147483647的整数',
		'EXPEND_DISK_SIZE':'请输入0-2147483647的整数',
		'MAIL':'邮件地址错误',
		'USERNAME':'用户名不能包含下列字符:/\\:*?"<>|=;,+<>@[]',
		'PASSWORD':'密码必须由10-20位的数字、大小写字母或特殊符号两种及以上',
		'STRONGPASSWORD':'密码必须由10-20位的数字、大小写字母或特殊符号三种及以上',
		'SEARCHWORDS':'请输入关键词查询'
	};
	tip.loadPanel = $('.loadingPanel')[0];
	//tip.resultPanel = $('.resultPanel')[0];
	//tip.infoPanel = $('.loadingInfo')[0];
	tip.showResult = function(result,time){
		var tipObj = {};
		var realTime = 0;
		tipObj.resultPanel =$dc.createDom('div:resultPanel','',{},$('.resultWrapper')[0]);
		tipObj.resultPic = new Image();	
		tipObj.resultPic.className = 'resultPic';
		tipObj.resultPanel.appendChild(tipObj.resultPic);
		tipObj.rStatus = $dc.createDom('div:rStatus','',{},tipObj.resultPanel);
		tipObj.rInfo = $dc.createDom('div:rInfo','',{},tipObj.resultPanel);
		tipObj.resultClose = $dc.createDom('i:icon-off resultClose','',{},tipObj.resultPanel);
		tipObj.showLoad = function(info){
			var h = $(document).height();
			var w = $(document).width();
			$(this.loadPanel).css('left',(w-128)/2);
			$(this.loadPanel).css('top',(h-128)/2-100);
			if(info){
				$(this.infoPanel).html(info);
			}
			$(this.loadPanel).fadeIn();	
		}
		tipObj.hideLoad = function(){
			$(this.loadPanel).fadeOut();	
		}
		tipObj.hideResult = function(){
			$(this.resultPanel).fadeOut();
			$(this.resultPanel).remove();
		}
		$(tipObj.resultClose).bind('click',function(){
			tipObj.hideResult();	
		});
		switch (result.status){
			case 0: {
				tipObj.resultPic.src = './images/tishi-zhengque.png';
				$(tipObj.rStatus).html('成功:');
				realTime = time?time:3000;
				break;
			}
			case 1: {
				tipObj.resultPic.src = './images/tishi-tishi.png';
				$(tipObj.rStatus).html('提示:');
				realTime = time?time:5000;
				break;
			}
			case 2: {
				tipObj.resultPic.src = './images/tishi-cuowu.png';
				$(tipObj.rStatus).html('错误:');
				realTime = time?time:8000;
				break;
			}
			default:{
				tipObj.resultPic.src = './images/tishi-tishi.png';
				$(tipObj.rStatus).html('提示:');
				break;
			}
		}
		$(tipObj.rInfo).html(result.info);
		$(tipObj.resultPanel).fadeIn();
		if(realTime){
			window.setTimeout(function(){
			tipObj.hideResult();	
			},realTime);
		}
	}
	w.tip = tip;
})(window);


(function(w){
	var popContentCtrl ={};
	var PCC = popContentCtrl;
	PCC.count = 0;
	PCC.aCount = 1;
	PCC.max = 0;
	PCC.data = {};
	PCC.defaultSelectParam = {
		desk_sel_width:367,
		desk_sel_height:36,
		picTop:14,
		desk_pic_down:'./images/xiajiantou03.png',
		desk_pic_up:'./images/xiajiantou04.png',
		callback:function(obj){
			this.li.val = obj.val;
			this.li.opt = obj.opt;
			this.li.storage_pool_id = obj.data_center_id;
			if(obj.v_cpu){
				this.li.num_socket = obj.v_cpu;
			}
			if(obj.v_memory){
				this.li.mem_size = obj.v_memory;
			}
		}
	};
	PCC.createLi = function(){
		var li = $dc.createDom('li:fontSize5 popContentLi','',{},PCC.ul);
		return li;
	}
	PCC.createLine = function(container){
		var line = $dc.createDom('label:seperate','',{
			html:'.............................................................................................................................'
		},container);
		return line;
	}
	PCC.createTitle = function(param){
		var li = PCC.createLi();	
		var title = $dc.createDom('div:popContentTitle','',{
			html:'【'+param.title+'】'
		},li);
		var line = PCC.createLine(li); 
	}
	PCC.createInput = function(param){
		var li = PCC.createLi();	
		var title = $dc.createDom('div:popLiTitle','',{
			html:param.title+':'
		},li);
		var input = $dc.createDom('input:input_text','',{
		},li);
		if(param.title =='桌面名称'){
			$(input).attr('placeholder',tip.map['VM_NAME']).placeholder();
			input.check = function(){
				return $dc.confirmaction(this,'VM_NAME',tip.map);
			}
		}
		$(input).attr('maxLength',64);
		$(input).val(param.data?param.data:'');
		if(param.disabled){
			$(input).css('background-color','#CACCD1');
			$(input).attr('disabled','disabled');	
		}
		li.input = input;
		li.getObj = function(){
			if(this.input.check){
				PCC.data[param.key] = $(this.input).val();
				return this.input.check();
			}else{
				var obj = {};
				obj[param.key] = $(this.input).val();
				PCC.data[param.key] = $(this.input).val();
				return obj;
			}
		}
	}
	PCC.createSelect = function(param){
		var li = PCC.createLi();	
		$(li).css('z-index',80-PCC.count);
		var title = $dc.createDom('div:popLiTitle','',{
			html:param.title+':'
		},li);
		var select = $dc.createDom('div:popSelectBox',param.id?param.id:'',{
		},li);
		var sConfig = $.extend({},PCC.defaultSelectParam,{item:param.item,def_item:param.def_item,disable:param.disabled});
		sConfig.li = li;
		$(select).deskSelect(sConfig);
		li.getObj = function(){
			var obj = {};
			obj[param.key] = this.val;
			PCC.data[param.key] = this.val;
			if(this.num_socket){
				PCC.data['num_socket'] = this.num_socket;
			}
			if(this.mem_size){
				PCC.data['mem_size'] = this.mem_size;
			}
			return obj;
		}
		PCC.count++;
	}
	PCC.createAutoSelect = function(param,isAdd){
		var _param = $dc.cloneObj(param);
		//_param.title = 'nic'+PCC.aCount;
		PCC.max = parseInt(_param.title.split('nic')[1])>PCC.max? parseInt(_param.title.split('nic')[1]):PCC.max;
		if(isAdd){
			_param.title = 'nic'+(++PCC.max);
			//_param.title = 'nic'+(PCC.aCount>PCC.max?PCC.aCount:PCC.max);
		}
		//_param.title = _param.title+(isAdd?PCC.aCount:'');
		//_param.key = _param.key+(PCC.aCount);
		var li = PCC.createLi();	
		$(li).css('z-index',80-PCC.count);
		var title = $dc.createDom('div:popLiTitle','',{
			html:_param.title+':'
		},li);
		var select = $dc.createDom('div:popSelectBox','',{
		},li);
		if(isAdd){
			var sConfig = $.extend({},PCC.defaultSelectParam,{item:param.item});
		}else{
			var sConfig = $.extend({},PCC.defaultSelectParam,{item:param.item,def_item:param.def_item});
		}
		sConfig.desk_sel_width = 324;
		sConfig.li = li;
		sConfig.disable = _param.disabled;
		var pic = $dc.createDom('div:icon-'+(PCC.aCount==1?'add-b':'del-b')+' netPic','',{},li);
		var remove = function(){
			$(li).remove();	
		}		
		var add = function(){
			PCC.createAutoSelect(param,true);
		}
		li.getObj = function(){
			var obj = {};
			obj.kindId = this.val;
			obj.kind = this.opt;
			obj.storage_pool_id = this.storage_pool_id;
			obj.name = _param.title;
			if(!isAdd){
				obj.id = _param.nameId;
			}
			if(obj.kindId){
				PCC.data.network.push(obj);
			}
			//PCC.data[param.key] = this.val;
			return obj;
		}
		$(pic).bind('click',(PCC.aCount==1?add:remove));
		$(select).deskSelect(sConfig);
		PCC.count++;
		PCC.aCount++;
	}
	PCC.create = function(obj){
			switch(obj.type){
				case 1 :
					{
						PCC.createTitle(obj);		
						break;
					}
				case 2 :
					{
						PCC.createInput(obj);			
						break;
					}
				case 3 :
					{
						PCC.createSelect(obj);		
						break;
					}
				case 4 :
					{
						PCC.createAutoSelect(obj);
						break;
					}
				//case 5 :
					//{
						//PCC.createTitle(obj);			
					//}
			}
	}
	PCC.submit = function(){
		var arr = [];
		var checkFlag = true;
		var _len = $(PCC.ul).children().length;
		PCC.data.network = [];
		$.each($(PCC.ul).children(),function(i,n){
			//this.getObj();
			if(this.getObj){
				var tmp = this.getObj();
				if(!tmp){checkFlag = false;}
				arr.push(tmp);
			}
			if(i == _len-1){
				if(!checkFlag){return;}
				PCC.data.network = JSON.stringify(PCC.data.network);
				if(desk.userType=='security' && !PCC.data.security_classification){
					$('#secSecurity').css('borderColor','red');
					return;
				}else{
					$('#secSecurity').css('borderColor','#DEE5F5');
				}
				desk.server.request(PCC.submitUrl,PCC.data,function(data){
					popBox.hide();
					if(data.success == true){
						tip.showResult({status:0,info:data.msg?data.msg:''},3000);
						desk.server.request('deskTopList',null,function(data){
							deskManageTable.window.refresh();
						});
					}else{
						tip.showResult({status:2,info:data.msg?data.msg:''},3000);
					}
					},'post');
			}
		})
	}
	PCC.init = function(config){
		var container = $('.'+config.containerClassName)[0];
		$(container).html('');
		if(config.beforeLoadContent){
			config.beforeLoadContent();
			//PCC.subContent = $dc.createDom('div:'+config.subContainerClassName,'',{},$('.'+config.containerClassName)[0]);	
			return;
		}
		PCC.aCount = 1;
		PCC.max = 0;
		PCC.submitUrl = config.submitUrl;
		PCC.data = {};
		PCC.data.network = [];
		var len = config.contentItem.length;
		PCC.content = $dc.createDom('div:popContentWrapper','',{},container);
		PCC.ul = $dc.createDom('ul:popContentUl','',{},PCC.content);
		var opt = $dc.createDom('div:popOpt','',{},container);
		var submit = $dc.createDom('div:dmDeskSubmit','',{
			html:config.subTitle
		},opt);
		var cancel = $dc.createDom('div:dmDeskCancel','',{
			html:config.cancelTitle
		},opt);
		$(cancel).bind('click',parent.popBox.hide);
		$(submit).bind('click',PCC.submit);
		for(var i =0;i<len;i++){
			PCC.create(config.contentItem[i]);
			if(i == len-1){
				popBox.reSize();
			}
		}
	}
	window.PCC = PCC;
})(window);


(function(w){
	deskRefresh = {};
	deskRefresh.init = function(){
		var t = window.setInterval(this.loop,5000);
	}
	deskRefresh.constant = [];
	deskRefresh.dynamic = [];
	deskRefresh.loop = function(){
		var loopArr = deskRefresh.constant.concat(deskRefresh.dynamic);
		var len = loopArr.length;
		if(!len){return;}
		for(var i=0;i<len;i++){
			loopArr[i]();
		}
	}
	

	window.deskRefresh = deskRefresh;
})(window);

(function(w){
	var statusMap = {};
	statusMap.hostMap = {
		1:'未定义',
		2:'维护模式',
		3:'运行中',
		4:'无响应',
		5:'错误',
		6:'正在安装',
		7:'安装失败',
		8:'重启中',
		9:'准备维护',
		10:'无法正常工作',
		11:'等待批准',
		12:'初始化',
		13:'连接中'
	}

	window.statusMap = statusMap;

})(window);


(function(w){
	var test = function(info){
		
	}
	var testInfo = 'test info';

	window.testInfo = testInfo;
	window.test = test;
})(window);

(function(w){
	var taskList = function(title,type,info,list,callback){
		var param = {};
		param.title = title;
		param.url = './popMoudle/taskListPage.html';
		this.show = function(){
			window.popBox.hide();
			window.popBox.init(param,this.init);
			//this.init();
		}		
		this.createTask = function(task,callback){
			this.work = callback;
			this.show = function(){ 
				this.dom = $dc.createDom('div:batchPanel','',null,$('.desk-taskListPanel')[0]);
				this.pic = $dc.createDom('span:icon-flavors','',null,this.dom);
				this.name = $dc.createDom('span:','',null,this.dom);
				this.result = $dc.createDom('span:','',{
					html:info
				},this.dom);
			}
			this.doWork = function(){
				this.show();
				this.work(task,this);
			}
			this.doWork();
		}
		var task = this;
		this.init = function(){
			this.batchTitle = $dc.createDom('div:batchTitle','',{
				html:'正在'+(list.length>1?'批量':'')+'执行 <a style="color:#058FCD">'+type+'</a> 操作'
			},$('.desk-taskListPanel')[0]);
			for(var i =0;i<list.length;i++){
				var a  = new task.createTask(list[i],callback);
				//a.show();	
			}
		}
		this.show();
	}

	window.taskList = taskList;
})(window);
