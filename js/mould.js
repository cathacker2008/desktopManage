$(document).ready(function(){
		$('.deskManageHeader').deskMenu({
		ulClassName:'deskManageMenu',
		menuItems:[
				{
					title:'模板管理',//li显示文字
					url:'./pages/mouldTable.html'
					//callback:function(){
						//$('.deskManageAdd').show();
						//$('.deskManageAdd').css('width',120);
						//$('.addText').html('新建桌面');
					//}
				}
			],
		colorPanel:false,
		defaultIndex:0,//默认选中index值
		destContainer:$('.deskManageContainer')[0],//点击控件指向的容器
		cursor:'pointer',//li鼠标样式
		liClassNameN:'deskManageLiN',//li正常样式
		liClassNameC:'deskManageLiC',//li选中样式
		liClassNameS:'deskManageLiS'//li悬浮样式
	});
	
	window.setIframe = function(h){
		$('.mouldContainer').height(h);
	}; 
});
