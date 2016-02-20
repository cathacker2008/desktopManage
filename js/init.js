var menuList = [{
	callback:function(){
		window.deskRefresh.dynamic = [];
	},
	title:'资源概览',//li显示文字
	imgN:'icon-home',//正常图标
	imgC:'icon-home',//选中图标
	imgS:'icon-home',//悬浮图标
	url:'./pages/pandect.html'
},
{
	callback:function(){
		window.deskRefresh.dynamic = [];
	},
	title:'物理拓扑',
	imgN:'icon-sitemap',
	imgC:'icon-sitemap',
	imgS:'icon-sitemap',
	url:'./pages/wulituopu.html'
},
{
	callback:function(){
		window.deskRefresh.dynamic = [];
	},
	title:'桌面管理',
	imgN:'icon-flavors',
	imgC:'icon-flavors',
	imgS:'icon-flavors',
	url:'./pages/deskManage.html'
},
{
	callback:function(){
		window.deskRefresh.dynamic = [];
	},
	title:'会话管理',
	imgN:'icon-chat1',
	imgC:'icon-chat1',
	imgS:'icon-chat1',
	url:'./pages/sessionManage.html'
},
{
	callback:function(){
		window.deskRefresh.dynamic = [];
	},
	title:'模板管理',
	imgN:'icon-stack',
	imgC:'icon-stack',
	imgS:'icon-stack',
	url:'./pages/mould.html'
},
{
	callback:function(){
		window.deskRefresh.dynamic = [];
	},
	title:'用户管理',
	imgN:'icon-manager',
	imgC:'icon-manager',
	imgS:'icon-manager',
	url:'./pages/userManage.html'
},
{
	callback:function(){
		window.deskRefresh.dynamic = [];
	},
	title:'日志警告',
	imgN:'icon-warn',
	imgC:'icon-warn',
	imgS:'icon-warn',
	url:'./pages/logWarning.html'
},
{
	callback:function(){
		window.deskRefresh.dynamic = [];
	},
	title:'关于',
	imgN:'icon-info-fill',
	imgC:'icon-info-fill',
	imgS:'icon-info-fill',
	url:'./pages/system.html'
}];
$(document).ready(function(){
	$("#userwaper").hover(function(){
		$("#editor_list").show();},
		function(){$("#editor_list").hide();
		});

	desk.server.request('getuserinfo',null,function(data){
		if(data.username != undefined){
			$('.loginUserName').html(data.username);
			if(data.type == 1){
				desk.userType = 'admin';
			}else if(data.type == 2){
				desk.userType = 'security';
			}else if(data.type ==3){
				desk.userType = 'auditor';
			}else{
				desk.userType = 'other';
			}
			if(desk.userType == 'auditor'){
				var tmp;
				tmp = menuList[6];
				menuList = [];
				menuList.push(tmp);
			}
			window.deskMenu =$('.deskMenu').deskMenu({
				ulClassName:'deskMenuUl',
				menuItems:menuList,
				colorPanel:true,
				colorPanelClassName:'deskMenuColorPanel',
				defaultIndex:0,//默认选中index值
				destContainer:$('.deskContainer')[0],//点击控件指向的容器
				cursor:'pointer',//li鼠标样式
				liClassNameN:'deskMenuLiN',//li正常样式
				liClassNameC:'deskMenuLiC',//li选中样式
				liClassNameS:'deskMenuLiS'//li悬浮样式
			});
		}else{
			$('.loginUserName').html('获取用户名失败');
		}
	},'post');
	$('.editPassword').bind('click',popBox.show);
	$('.logOut').bind('click',function(){
		desk.server.request('logout',null,function(data){
			window.location.href = '../../';	
			return;
		},'post');
	});

	if($(window).height()-110<824){
		$('.wrapper').css('height','934px');
		$('.deskContainer').css('height','824px');
		$('.deskMenu').css('height','824px');
	}
	else{
		$('.wrapper').css('height',$(window).height());
		$('.deskContainer').css('height',$(window).height()-110);
		$('.deskMenu').css('height',$(window).height()-110);
	}
	window.th = $(window).height()-110;
	$('.footer').deskDrag({
		handleClassName:'deskDragHandle',
		headClassName:'deskDragHead',
		picClassName:'deskDragPic',
		picClassNameup:'icon-arrow-up',
		picClassNamedown:'icon-arrow-down',
		contenLiClassName:'deskContentLi fontSize5',
		contentClassName:'deskDragContent'
	});
	deskRefresh.init();//启动轮询	
	//$dc.initSimpleDrag($('.popHead')[0],$('.popContainer')[0]);//拖拽弹出框
	$(window).resize(function() {
		window.th = $(window).height()-110;
		var h =document.body.clientHeight;
		if($(window).height()-110<824){
			$('.wrapper').css('height','934px');
			$('.deskContainer').css('height','824px');
			$('.deskMenu').css('height','824px');
		}
		else{
			$('.wrapper').css('height',$(window).height());
			$('.deskContainer').css('height',$(window).height()-110);
			$('.deskMenu').css('height',$(window).height()-110);
		}

	});
	$(document).bind('click',function(){
		if(window.currentSelectPanel){
			$(window.currentSelectPanel).toggle(false);
		}
	});
});
