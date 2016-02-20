$(document).ready(function(){
	var data = {};
	$('.deskManageHeader').deskMenu({
		ulClassName:'deskManageMenu',
		menuItems:[
				{
					title:'告警通知',//li显示文字
					url:'./pages/warningTable.html',
					callback:function(){	
					}
				},
				{
					title:'操作日志',
					url:'./pages/logTable.html'
					//callback:function(){
						//$('.deskManageAdd').show();
						//$('.deskManageAdd').css('width',130);
						//$('.addText').html('新建桌面池');   logTable
					//}
				}
			],
		colorPanel:false,
		defaultIndex:0,//默认选中index值
		destContainer:$('.logManageContainer')[0],//点击控件指向的容器
		cursor:'pointer',//li鼠标样式
		liClassNameN:'deskManageLiN',//li正常样式
		liClassNameC:'deskManageLiC',//li选中样式
		liClassNameS:'deskManageLiS'//li悬浮样式
	});
	window.setIframe = function(h){
		$('.logManageContainer').height(h);
	}; 
});
