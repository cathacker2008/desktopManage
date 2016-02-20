var allotUser = function(info){
	cc(2);
}
var batchMap = {
	'start':'开机',
	'reboot':'重启',
	'shutdown':'关机',
	'stop':'断电',
	'deleted':'删除'
}
var createSnapShot = function(){
	parent.popBox.show({currentTarget:{className:'createSnap'}});
}
var createMoudle = function(){
	parent.popBox.show({currentTarget:{className:'createMoudle'}});
}
var data = {},checkData,vmTable,singleData,singleFlag = false,isSecurity;
var aa = function(rowData,index){
	var getNetwork =function(data,arr,item){
		var len = data.length;
		if(len){
			for(var i = 0;i<len;i++){
				var obj = {};
				obj.title = data[i].name;
				obj.type = 4;
				obj.key = 'network';
				obj.def_item = {opt:data[i].kind};
				obj.nameId = data[i].id;
				obj.item = item;
				obj.disabled = isSecurity;
				arr.push(obj);
			}
		}else{
			var obj = {};
			obj.title = 'nic1';
			obj.type = 4;
			obj.key = 'network';
			obj.item = item;
			obj.disabled = isSecurity;
			arr.push(obj);
		}
	}
	parent.PCC.subMenu = $dc.createDom('div:popMenuPanel','',{},$(parent.document.body).find('.popContent')[0]);	
	parent.PCC.subContent = $dc.createDom('div:subPopContent','',{},$(parent.document.body).find('.popContent')[0]); 
	parent.desk.server.getSelectItem({url:'desktype'},function(arr){
		parent.desk.server.request('deskinfo',rowData.vm_guid,function(data){
			//data.security_classification = 'Undefined';
			var tmpArr = [
			{type:1,title:'基本信息'},
			{type:2,title:'桌面名称',key:'vm_name',data:rowData.vm_name,disabled:isSecurity},
			{type:3,title:'密级标志',id:'secSecurity',key:'security_classification',disabled:!isSecurity,def_item:{val:data.security_classification},item:[{'opt':'内部',val:'0'},{'opt':'秘密',val:'1'},{'opt':'机密',val:'2'}]},
			{type:2,title:'描述',key:'description',disabled:isSecurity,data:rowData.vm_description},
			{type:3,title:'桌面类型',key:'desktop_type_id',disabled:isSecurity,def_item:{val:data.desktop_type_id},item:arr},
			{type:2,title:'模板',key:'vmt_name',data:rowData.vmt_name+(rowData.vmt_version_name?(' / '+rowData.vmt_version_name):''),disabled:true},
			{type:2,title:'集群',key:'vds_group_name',data:rowData.vds_group_name,disabled:true},
			{type:3,title:'持久化',key:'is_stateless',disabled:isSecurity,def_item:{val:data.is_stateless},item:[{'opt':'是',val:'false'},{'opt':'否',val:'true'}]},{type:1,title:'选择网络'}];

		parent.desk.server.getSelectItem({url:'network',path:'?storage_pool_id='+data.storage_pool_id},function(rData){
			getNetwork(data.network,tmpArr,rData);	
		},true);
		$(parent.PCC.subMenu).deskMenu({
			ulClassName:'popMenu',
			menuItems:[
		{
			title:'基本信息',//li显示文字
			callback:function(){
				parent.PCC.init({
					title:'编辑桌面',
				subTitle:'保存',
				cancelTitle:'取消',
				containerClassName:'subPopContent',
				contentItem:tmpArr,
				submitUrl:{url:'deskaction',path:rowData.vm_guid,action:'/update'}
				});	
			}
		},
			{
				title:'磁盘',
			url:'./pages/diskTable.html'
			},
			//{
			//title:'快照',
			//url:'./pages/flashPhoto.html'
			//},
			{
				title:'用户',
				url:'./pages/editUser.html'
			}
		],
			callback:function(){
			},
			colorPanel:false,
			defaultIndex:index,//默认选中index值
			destContainer:$(parent.document.body).find('.subPopContent')[0],//点击控件指向的容器
			cursor:'pointer',//li鼠标样式
			liClassNameN:'deskManageLiN',//li正常样式
			liClassNameC:'deskManageLiC',//li选中样式
			liClassNameS:'deskManageLiS'//li悬浮样式
		});
		parent.popBox.reSize();
		},'get');
	});
}


var option = function(type,vm_guid){
	parent.desk.server.request({url:'deskaction',path:vm_guid,action:'/'+type},null,function(data){	
		if(data.success == true){
			parent.tip.showResult({status:0,info:data.msg?data.msg:''});
		}else{
			parent.tip.showResult({status:2,info:data.msg?data.msg:''});
		}
		vmTable.getData();
	},'get');
}
var openCon = function(vm_guid){
	var url = parent.server.getUrl({url:'open',path:vm_guid,action:'/open'});
	parent.desk.server.request({url:'open',path:vm_guid,action:'/open'},null,function(data){
		if(data.success == false){
			parent.tip.showResult({status:2,info:data.msg?data.msg:''});	
		}else{
			window.open(url);
	     	return;
		}
	},'get');
}
var searchParam ={};
var refresh = function(){
	vmTable.getData();
}
//var t = window.setInterval(refresh,3000);
var cc = function(index){
	var tmpData = singleFlag?singleData:checkData;
	parent.popBox.show({
		title:'编辑桌面',
	subTitle:'保存',
	cancelTitle:'取消',
	containerClassName:'popContent',
	subContainerClassName:'subPopContent',
	beforeLoadContent:function(){aa(tmpData,index)}
	});
}
var formatSec = function(val,row){
	var show = '';
	if(val === '0'){
		show='内部';
	}else if(val ==='1'){
		show='秘密';
	}else if(val ==='2'){
		show='机密';
	}else{
		show='非密';
	}
	return show;
}

var formatStorage = function(val,row,col){
	return   row.vds_group_name +'/'+ row.storage_pool_name;
}
var formatProgress = function(val,row,col){
	var tr =$dc.createDom('tr:','',null,null);
	var td =$dc.createDom('td:','',null,tr);
	var tr1 =$dc.createDom('tr:','',null,td);
	var tr2 =$dc.createDom('tr:','',null,td);
	var td1 =$dc.createDom('td:','',null,tr1);
    var panel = $dc.createDom('div:desk-table-progress','',null,td1);
	var bg = $dc.createDom('div:desk-table-progress-bg','',null,panel);
	var bar = $dc.createDom('div:desk-table-progress-bar','',null,bg);
	var val = parseInt(val);
	val = val?val:0;
	td1.style['min-width'] = '100px';
	var td2 =$dc.createDom('td:','',{html:val+'%'},tr2);
	var color = val>50?(val>80?'#eda81d':'#'):'#37bc9b';
	$(bar).css('width',val+'%');
	$(bar).css('backgroundColor',color);
	tr.row = col.rowNum;
	tr.col = col.colNum;
	return tr;
}

var formatInfo = function(val,row,col){
	var picInfo = formatStatus(row).split('|');
	var statusPosition = picInfo[0];
	var statusTitle = picInfo[1];
	var osPositon = picInfo[2];
	var osTitle = picInfo[3];
	var tr1 = $dc.createDom('tr:','',null,null);
	var td1 = $dc.createDom('td:','',null,tr1);
	var td2 = $dc.createDom('td:','',null,tr1);
	var tr2 = $dc.createDom('tr:','',null,td2);
	var tr3 = $dc.createDom('tr:','',null,td2);
	var td3 = $dc.createDom('td:','',null,tr2);
	var td4 = $dc.createDom('td:desk-table-12px','',{html:'IP:'+row.vm_ip+' '},tr3);
	var td5 = $dc.createDom('td:desk-table-12px','',{html:'FQDN:'+row.vm_fqdn},tr3);
	td3.setAttribute('colspan',2);
	var img = $dc.createDom('span:desk-table-system-pic','',null,td3);
	$(img).css('backgroundPosition','0 '+osPositon);
	$(img).attr('title',osTitle);
	var info = $dc.createDom('div:desk-table-vmname','',{html:row.vm_name},td3);
	row.pic = $dc.createDom('div:desk-table-status-pic','',null,td1);
	$(row.pic).css('backgroundImage','url(../images/state.png)');
	$(row.pic).css('backgroundPosition','0 '+statusPosition);
	$(row.pic).attr('title',statusTitle);
	return tr1;
}

var formatPer = function(val,row){
	return (val?val:'0')+'%';
} 

var getOsPosition = function(val){
	if(val == 3 || val == 16 || val == 10 || val == 23 || val == 4 || val == 17 || val == 11 || val == 12 || val == 10){
		return '0|Windows';
	}
	if(val == 20 || val ==21){
		return "-30px|Win8";
	}
	if(val == 1){
		return "-240px|WinXP";
	}
	if(val == 5){
		return "-60px|LINUX";
	}
	if(val == 9 || val == 15 || val == 8 || val == 14 || val == 7 || val == 13 || val == 18 || val == 19 || val == 24){
		return "-90px|Red Hat";
	}
	if(val == 1193){
		return "-120px|SUSE LINUX";
	}
	if(val == 1252 || val == 1253 || val == 1254 || val == 1255){
		return "-150px|Ubuntu";
	}
    return '-270px|Other OS';
}

var formatStatus = function(row){
	switch (row.status){
		case '-1':
			return  '-479px|未定义|'+getOsPosition(row.vm_os);// '未定义'
			break;
		case '0':
			return '0|关机|'+getOsPosition(row.vm_os);//'关闭'
			break;
		case '1':
			return '-65px|开机|'+getOsPosition(row.vm_os);// '正在运行';
			break;
		case '2':
			return '-96px|正在启动|'+getOsPosition(row.vm_os);//'正在启动';
			break;
		case '4':
			return '-160px|暂停|'+getOsPosition(row.vm_os);//'暂停';
			break;
		case '5':
			return '-194px|迁移(源)|'+getOsPosition(row.vm_os);//'迁移';
			break;
		case '6':
			return '-223px|迁移(目标)|'+getOsPosition(row.vm_os);//'迁移至';
			break;
		case '7':
			return '-256px|未知|'+getOsPosition(row.vm_os);//''未知';
			break;
		case '8':
			return '-287px|未响应|'+getOsPosition(row.vm_os);//'无响应';
			break;
		case '9':
			return '-128px|等待启动|'+getOsPosition(row.vm_os);//'等待启动';
			break;
		case '10':
			return '-96px|正在重启|'+getOsPosition(row.vm_os);//'正在重启';
			break;
		case '11':
			return '-320px|保存状态|'+getOsPosition(row.vm_os);//'保存状态';
			break;
		case '12':
			return '-351px|恢复状态|'+getOsPosition(row.vm_os);//'恢复状态';
			break;
		case '13':
			return '-160px|暂停、终止|'+getOsPosition(row.vm_os);//'挂起';
			break;
		case '14':
			return '-416px|镜像不可用|'+getOsPosition(row.vm_os);//'镜像异常';
			break;
		case '15':
			return '-448px|镜像锁定|'+getOsPosition(row.vm_os);//'镜像锁定';
			break;
		case '16':
			return '-30px|正在关机|'+getOsPosition(row.vm_os);//'正在关机';
			break;
		case '17':
			return '-385px|准备休眠|'+getOsPosition(row.vm_os);//'准备休眠';
			break;
	}
}
var typeMap = {
	up:1,
	down:2,
	reboot:4,
	stop:8,
	deleted:16,
	mould:32,
	console:64,
	user:128
}
var checkStatus = function(state){
	var flag=0;
	var up = [0,4];
	var down = [1,2,4,9,10,16];
	var reboot = [1];
	var stop = [1,2,4,9,10,16];
	var delte = [0];
	var mould = [0];
	var console = [1,10];
	var user = [];
	$dc.hackArrIndexOf();
	if(up.indexOf(state) !=-1){
		flag+=typeMap.up;
	}
	if(down.indexOf(state) !=-1){
		flag+=typeMap.down;
	}
	if(reboot.indexOf(state) !=-1){
		flag+=typeMap.reboot;
	}
	if(stop.indexOf(state) !=-1){
		flag+=typeMap.stop;
	}
	if(delte.indexOf(state) !=-1){
		flag+=typeMap.deleted;
	}
	if(mould.indexOf(state) !=-1){
		flag+=typeMap.mould;
	}
	if(console.indexOf(state) !=-1){
		flag+=typeMap.console;
	}
	flag+=typeMap.user;
	flag = ~flag;
	return flag;
}
var createButton = function(info,url,disable){
	var button = $dc.createDom('div:floatPanel-Button','',null,null);
	var pic = $dc.createDom('div:floatPanel-Button-pic '+url,'',null,button);
	var text = $dc.createDom('div:floatPanel-Button-text','',{html:info},button);
	button.action = pic.action = text.action = info;
	button.isDisabledd = pic.isDisabledd = text.isDisabledd = disable;
	if(disable){
		$(button).css('cursor','not-allowed');
		$(button).css('color','#C7C9CC');
	}else{
		$(button).css('cursor','pointer');
		$(button).css('color','white');
	}
	$(button).hover(function(){
		if(disable){return;}
		$(this).css('backgroundColor','#EDA81E');
	},function(){
		$(this).css('backgroundColor','#434A54');
	});
	return button;
}

$(document).ready(function(){
var setting = {
			data: {
				simpleData: {
					enable: true
				}
			},
			callback : {
				onClick:function(e,id,node){
					//console.log(e);
					//console.log(id);
					//console.log(node);
					if(!node.guid){return;}
					vmParam.url = '../'+parent.desk.server.getUrl({url:'getuserVm',path:node.guid,action:'/desktops'});
					vmTable = $('#dgwrap').deskTable(vmParam);
					$('.desk-table-foot').addClass('foot-vm-table');
					vmTable.reSize();
				}
			}
		};
var zNodes;
//var zNodes =[
			//{ name:"父节点1 - 展开", open:true,
				//children: [
					//{ name:"父节点11 - 折叠",
						//children: [
							//{ name:"叶子节点111"},
							//{ name:"叶子节点112"},
							//{ name:"叶子节点113"},
							//{ name:"叶子节点114"}
						//]},
					//{ name:"父节点12 - 折叠",
						//children: [
							//{ name:"叶子节点121"},
							//{ name:"叶子节点122"},
							//{ name:"叶子节点123"},
							//{ name:"叶子节点124"}
						//]},
					//{ name:"父节点13 - 没有子节点"}
				//]},
			//{ name:"父节点2 - 折叠",
				//children: [
					//{ name:"父节点21 - 展开", 
						//children: [
							//{ name:"叶子节点211"},
							//{ name:"叶子节点212"},
							//{ name:"叶子节点213"},
							//{ name:"叶子节点214"}
						//]},
					//{ name:"父节点22 - 折叠",
						//children: [
							//{ name:"叶子节点221"},
							//{ name:"叶子节点222"},
							//{ name:"叶子节点223"},
							//{ name:"叶子节点224"}
						//]},
					//{ name:"父节点23 - 折叠",
						//children: [
							//{ name:"叶子节点231"},
							//{ name:"叶子节点232"},
							//{ name:"叶子节点233"},
							//{ name:"叶子节点234"}
						//]}
				//]},
			//{ name:"父节点3 - 没有子节点",
				//isParent:true
			//}

		//];
var zTree,Zchecked,tmpInfo;
	isSecurity = parent.desk.userType =='security'?true:false;
	var isIE = $.browser.msie;
	 var vmParam = {
		url:'../'+parent.desk.server.getUrl('deskTopList'),
		type:'post',
		mark:'vm_guid',
		keys:[{title:'基本信息',key:'vm_name',formatter:formatInfo,width:200},{title:'密级',key:'security_classification',formatter:formatSec},{title:'桌面类型',key:'desktop_type_name'},{title:'主机',key:'run_on_vds_name'},{title:'所属租户',key:'vm_ip'},{title:'集群/数据中心',key:'storage_pool_name',formatter:formatStorage,width:isIE?150:''},{title:'内存',key:'usage_mem_percent',formatter:formatProgress,width:isIE?150:''},{title:'网络',key:'usage_network_percent',formatter:formatProgress,width:isIE?150:''},{title:'CPU',key:'usage_cpu_percent',formatter:formatProgress,width:isIE?150:''}],
		sort:0,
		headAlign:'left',//默认均为left
		bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
		page:1,
		checkBox:!isSecurity,
		size:10,
		//notFixedHead:true,
		rowHeight:60,
		height:600,
		width:'100%',
		listener:['status'],
		oddColor:'#FFFFFF',
		evenColor:'#f6f7fB',
		click:function(obj){
			if(obj && obj.parentObj && this.checkBox){
				$(obj.parentObj.checkBox).click();
			}
			$('.optPanel').toggle(false);
			if(isSecurity){
				if(obj && obj.parentObj){
					if(this.checkObj){
						this.checkObj.checked = false;
						$(this.checkObj.dom).css('backgroundColor',this.checkObj.orginColor);
					}
					$('.showDetails').removeClass('disableBtn');
					this.checkObj = obj.parentObj;
					this.checkObj.checked = true;
					$(this.checkObj.dom).css('backgroundColor','#DFF5FE');
					checkData = obj.parentObj.baseInfo;
				}	
			}
		},
		checked:function(obj,arr,unCheckArr){
			$('.optPanel').toggle(false);
			var color = obj.checked?'#DFF5FE':obj.orginColor;
			$(obj.dom).css('backgroundColor',color);
			obj.dom.lastColor = color;
			if(arr.length == 1){
				var state = checkStatus(parseInt(obj.baseInfo.status));
				if(!(state&typeMap.mould)){
					$('.createMoudle').removeClass('disableBtn');
				}
				$('.showDetails').removeClass('disableBtn');
				$('.batchOpt').addClass('disableBtn');
				checkData = arr[0].baseInfo;
			}else{
				checkData = arr;
				$('.createMoudle').addClass('disableBtn');
				$('.showDetails').addClass('disableBtn');
				if(arr.length>1){
					$('.batchOpt').removeClass('disableBtn');
				}
			}
		},
		mouseOver:function(obj){
			$(obj.dom).css('backgroundColor','#DFF5FE');
			var position = obj.dom.getBoundingClientRect();
			var panel = $dc.createDom('div:floatPanel','',null,null);
			var state = checkStatus(parseInt(obj.baseInfo.status));
			var b1 =  createButton('开机','icon-play-o',(state&1)||isSecurity);
			var b2 =  createButton('关机','icon-power-down',(state&2)||isSecurity);
			var b3 =  createButton('重启','icon-rotate',(state&4)||isSecurity);
			var b4 =  createButton('断电','icon-power-cord',(state&8)||isSecurity);
			var b5 =  createButton('删除','icon-trashcan',(state&16)||isSecurity);
			var b6 =  createButton('模板','icon-stack',(state&32)||isSecurity);
			var b7 =  createButton('控制台','icon-gailan',(state&64)||isSecurity);
			var b8 =  createButton('用户','icon-manager',(state&128)&&isSecurity);
			if($.browser.msie &&( $.browser.version.indexOf('8.0') !=-1 || $.browser.version.indexOf('9.0') !=-1 )){
				tmpInfo = $(obj.child[5].dom).html();
				$(obj.child[5].dom).empty();
				obj.child[5].dom.appendChild(b1);
				obj.child[5].dom.appendChild(b2);
				$(obj.child[6].dom).children().hide();
				obj.child[6].dom.appendChild(b3);
				obj.child[6].dom.appendChild(b4);
				$(obj.child[7].dom).children().hide();
				obj.child[7].dom.appendChild(b5);
				obj.child[7].dom.appendChild(b6);
				$(obj.child[8].dom).children().hide();
				obj.child[8].dom.appendChild(b7);
				obj.child[8].dom.appendChild(b8);
				$(b1).bind('click',function(e){
					if(e.target.isDisabledd){return;}
					option('start',obj.baseInfo.vm_guid);
				});
				$(b2).bind('click',function(e){
					if(e.target.isDisabledd){return;}
					option('shutdown',obj.baseInfo.vm_guid);
				});
				$(b3).bind('click',function(e){
					if(e.target.isDisabledd){return;}
					option('reboot',obj.baseInfo.vm_guid);
				});
				$(b4).bind('click',function(e){
					if(e.target.isDisabledd){return;}
					option('stop',obj.baseInfo.vm_guid);
				});
				$(b5).bind('click',function(e){
					if(e.target.isDisabledd){return;}
					option('delete',obj.baseInfo.vm_guid);
				});
				$(b6).bind('click',function(e){
					if(e.target.isDisabledd){return;}
					singleData = obj.baseInfo;
					singleFlag = true;
					parent.popBox.show({currentTarget:{className:'createMoudle'}});
				});
				$(b7).bind('click',function(e){
					if(e.target.isDisabledd){return;}
					openCon(obj.baseInfo.vm_guid);
					
				});
				$(b8).bind('click',function(e){
					if(e.target.isDisabledd){return;}
					singleData = obj.baseInfo;
					singleFlag = true;
					cc(2);
				});
			}else{
				panel.appendChild(b1);
				panel.appendChild(b2);
				panel.appendChild(b3);
				panel.appendChild(b4);
				panel.appendChild(b5);
				panel.appendChild(b6);
				panel.appendChild(b7);
				panel.appendChild(b8);
				$(panel).bind('click',function(e){
					var type = e.target.action;
					if(e.target.isDisabledd){return;}
					if(type =='开机'){
						option('start',obj.baseInfo.vm_guid);
					}
					if(type =='关机'){
						option('shutdown',obj.baseInfo.vm_guid);
					}
					if(type =='重启'){
						option('reboot',obj.baseInfo.vm_guid);
					}
					if(type =='断电'){
						option('stop',obj.baseInfo.vm_guid);
					}
					if(type =='删除'){
						option('delete',obj.baseInfo.vm_guid);
					}
					if(type =='模板'){
						singleData = obj.baseInfo;
						singleFlag = true;
						parent.popBox.show({currentTarget:{className:'createMoudle'}});
					}
					if(type =='用户'){
						singleData = obj.baseInfo;
						singleFlag = true;
						cc(2);
					}
					if(type =='控制台'){
						openCon(obj.baseInfo.vm_guid);
					}
				});
				$(panel).css('left',position.width-495);
				obj.dom.panel = panel;
				$(obj.dom).append(panel);
				$(obj.dom.panel).show();
			}
			obj.dom.lastColor = obj.dom.style.backgroundColor;
			$(obj.dom).css('backgroundColor','#e6e9ee');
		},
		mouseOut:function(obj){
			$(obj.dom).css('backgroundColor',obj.checked?'#DFF5FE':obj.orginColor);
			if($.browser.msie &&( $.browser.version.indexOf('8.0') !=-1 || $.browser.version.indexOf('9.0') !=-1 )){
				$(obj.child[5].dom).html(tmpInfo);
				$(obj.child[5].dom).children('.floatPanel-Button').remove();
				$(obj.child[5].dom).children().show();
				$(obj.child[6].dom).children('.floatPanel-Button').remove();
				$(obj.child[6].dom).children().show();
				$(obj.child[7].dom).children('.floatPanel-Button').remove();
				$(obj.child[7].dom).children().show();
				$(obj.child[8].dom).children('.floatPanel-Button').remove();
				$(obj.child[8].dom).children().show();
			}else{
				if(obj.dom.panel){
					$(obj.dom.panel).hide();
					$(obj.dom.panel).remove();
				}
			}
		},
		callback:function(table){
			//var a = table.getEle(null,1);
			//$.each(a,function(i,n){
				//this.dom.title = this.data;
			//});
		}
	 
	 };
	 parent.desk.server.request('quaryAdTree',null,function(data){
		 zNodes = data;
		 zTree = $.fn.zTree.init($('#zTree'), setting, zNodes);
		 //checked = zTree.getNodes()[0].children[0].children[3];
		 //zTree.selectNode(checked);
	 });
	 vmTable = $('#dgwrap').deskTable(vmParam);
	 $('.desk-table-foot').addClass('foot-vm-table');
	var searchType ;
	$('.deskManageSelect').deskSelect({
		desk_sel_width:90,
		desk_sel_height:32,
		picTop:14,
		desk_pic_down:'../images/xiajiantou03.png',
		desk_pic_up:'../images/xiajiantou04.png',
		def_val:'-请选择-',
		def_item:1,//如果设置此值，def_val无效
		item:[{'opt':'类型',val:'desktop_type_name'},{'opt':'名称',val:'vm_name'},{'opt':'高级搜索',val:'advanced'}],
		callback:function(obj){
			if(obj.val == 'advanced'){
				searchType = null;
				parent.popBox.show({currentTarget:{className:'showSearch'}});
			}else{
				searchType= obj.val;	
			}
		}
	});

	if(parent.desk.userType =='security'){
		$('.deskManageAdd').addClass('disableBtn');	
	}else{
		$('.deskManageAdd').bind('click',parent.popBox.show);
	}
	$('.createMoudle').bind('click',function(e){
		singleFlag = false;
		parent.popBox.show(e);
	});
	$('.createSnap').bind('click',function(e){
		if(!checkData){return;}
		parent.popBox.show(e);
	});
	$('.batchOpt').bind('click',function(e){
		if(!checkData){return;}
		if(e.currentTarget.className.indexOf('disableBtn') != -1){
			return; 
		}
		$('.optPanel').slideToggle('100',function(){
			if($(this).is(':hidden')){
				$('.batchPic').removeClass('icon-arrow-up');	
				$('.batchPic').addClass('icon-arrow-down');	
				var type= $(e.target).attr('oType');
				if(!type){return;}
				new parent.taskList(batchMap[type],batchMap[type],'正在'+batchMap[type],checkData,function(task,dom){
					$(dom.name).html(task.baseInfo.vm_name);
					parent.desk.server.request({url:'deskaction',path:task.baseInfo.vm_guid,action:'/'+type},null,function(data){	
						if(data.success == true){
							if(type=='deleted'){
								$(task.checkBox).attr('checked',false);
								$(task.checkBox).change();
							}
							$(dom.pic).removeClass('icon-flavors');
							$(dom.pic).addClass('icon-check-fill');
							$(dom.pic).css('color','#8CC152');
							$(dom.result).html(batchMap[type]+'成功');	
							parent.popBox.reSize();
							refresh();
						}else{
							$(dom.pic).removeClass('icon-flavors');
							$(dom.pic).addClass('icon-cancel-fill');
							$(dom.dom).css('color','#FC8203');
							$(dom.result).html(data.msg);	
							parent.popBox.reSize();
							refresh();
						}
					},'get');
				});
			}else{
				$('.batchPic').removeClass('icon-arrow-down');	
				$('.batchPic').addClass('icon-arrow-up');	
			}
		});
	});
	$('.showDetails').bind('click',function(e){
		singleFlag = false;
		if(!checkData){return;}
		var e = e || window.event;
		if(e.currentTarget.className.indexOf('disableBtn') != -1){
			return; 
		}
		cc(0);
	});
	parent.setIframe($(document).height());
	//$(".menu-item").each(function(index, element) {
		//$(this).css("height","33px");
	//});
	parent.deskRefresh.dynamic = [];
	parent.deskRefresh.dynamic.push(refresh);
	var search = function(){
		searchParam = null;
		var obj = {};
		if($('#deskInput').val()){
			obj[searchType]= $('#deskInput').val();
		}
		searchParam = obj;
		vmTable.setParam('param',searchParam);
		vmTable.getData();
	}
	vmTable.reSize();
	$(window).resize(function(){
		vmTable.reSize();
	});
	$('.searchPic').bind('click',search);
});
