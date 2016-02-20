
parent.deskManageTable.diskData = null;
var ckData = parent.deskManageTable.singleFlag?parent.deskManageTable.singleData:parent.deskManageTable.window.checkData,refresh;
var formatName = function(val,row){
	var pic = "<img src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAACwUlEQVR42m1T204TURSdz/CdD+GRmMaEFx5MDPFJYryFxAhG1D6hqIwJSEQEAsQKFEoohdJaKG3pUKc3KPRCOx2wLS3TQm8MdBguszzUiGhcyT4ve6+199lnHYq6Ai6ZrVl0rtFTRgc/aWLkrwY3Rqfd8pjeyc/ZfPQGl62h/geTw6syLfsFTyiOTLaIQl5GvgTsZk4Q5YowL3EY17sFnYlV/UW0OFZVTk9QEvYKIFCkEyi7+0BWADI7RCAFJbUNhWWL0M2vSzqTV/VnVFdA2M8fVIkXx+kpIaSB9BYQ2wS2wiSiAB+DssKWMGbwCBtcsoayusI0ux6vEn9kcujVWTA048BeroJjERCJ5qCOxZPOaWgMayiVzhWTLQYz2Q01aQzx0rGMcYtLqbvfjp6Jb7jXMYDb6h7IZIRRsxONL7vxeXoBqkevoLe7FUk6xZTZx1PD2ohcFEU0tL7HgN6K37jR3EEKvVB/0l4K2X1hLPsj1bzO7JcpjS6IXLGEhhYaTGDzktz2cRydXwzIFsq4/rAd1+qaUP/4HeIpoZrXzLhBzTnCcr4s4uazLmgtrkty7R01RuYcsHqC2C8e4PTsDA/eDqKlS0OmOMHIhE+mFpgoLx7J6NcvKg1PaRgZH2jNLGqb1CgQ0buv+9HU3od1LoEXvVp0DOuVfKkC7WyQp1Z827TDnUIuKylvBhZR39yHxrYhOF0cUAG2E/to7R7Frecfql0Tu3sK40/CykZp6sJyxqWoEPAeYXMDSoDsI05eLssDORL5HK5CKYsV2DwhgUsmf1nVysRUC/aEtOI7RCAMJUKCixFTEJPspIDjMjHPOZRC+RBr0YTEeMP/WJThVUZ7XLB9TyMSE5HOnKFcBIqlM+wVRIT4NFyBmMCsxlT//RwcuYLTx9Pz9hA/Yw3KhqUNmJmgbGODPLvO0RdWvlr/E6tAlYjeRr79AAAAAElFTkSuQmCC' style='position:relative;top:3px;right:5px;' title='系统盘' />";
	return (row.boot=='true'?pic:'')+row.disk_alias;
}
var formatSize = function(val,row){
	var num = row.size/1073741824;
	return Math.round(num*100)/100;
}
var formatStatus = function(val,row){
	var tmp = '';
	switch (row.imagestatus){
		case '0' :
			tmp = '未知';
			break;
		case '1' :
			tmp = '正常';
			break;
		case '2' :
			tmp = '锁定';
			break;
		case '4' :
			tmp = '错误';
			break;
	}
	return tmp;
}
$(document).ready(function(){
	refresh = function(){
		diskTable.getData();
	}
	var diskTable = $('#dgwrap').deskTable({
		url:'../'+parent.desk.server.getUrl({url:'deskaction',path:ckData.vm_guid,action:'/disks'}),
		type:'get',
		keys:[{title:'别名',key:'disk_alias',width:'20%',formatter:formatName},{title:'大小(GB)',key:'size',formatter:formatSize},{title:'描述',key:'disk_description'},{title:'状态',key:'imagestatus',formatter:formatStatus}],
		sort:0,
		headAlign:'left',//默认均为left
		bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
		page:1,
		checkBox:false,
		size:10,
		width:'',
		rowHeight:40,
		height:200,
		oddColor:'#FFFFFF',
		evenColor:'#f6f7fB',
		click:function(obj){
			if(parent.desk.userType =='security'){return;}
			if(obj && obj.parentObj){
				if(this.checkObj){
					$(this.checkObj.dom).css('backgroundColor',obj.parentObj.orginColor);
				}
				this.checkObj = obj.parentObj;
				$(this.checkObj.dom).css('backgroundColor','#DFF5FE');
				parent.deskManageTable.diskData = obj.baseInfo;
				if(obj.parentObj.baseInfo.imagestatus == '2'){
					$('.editDisk').addClass('disableBtn');
					$('.delDisk').addClass('disableBtn');
				}else if(obj.baseInfo.boot=='false') {
					$('.delDisk').removeClass('disableBtn');
					$('.editDisk').removeClass('disableBtn');
				}else{
					$('.delDisk').addClass('disableBtn');
					$('.editDisk').removeClass('disableBtn');
				}

			}
		},
		checked:function(obj,arr,unCheckArr){
		},
		mouseOver:function(obj){
			//$(obj.dom).css('backgroundColor','#DFF5FE');
		},
		mouseOut:function(obj){
			//$(obj.dom).css('backgroundColor',this.checked?'#DFF5FE':obj.orginColor);
		},
		callback:function(table){
		}
	});

	if(parent.desk.userType =='security'){
		$('.addDisk').addClass('disableBtn');	
	}else{
		$('.addDisk').bind('click',parent.popBox.show);
	}
	$('.editDisk').bind('click',function(e){
		parent.popBox.show(e);	
	});
	$('.delDisk').bind('click',function(e){
		parent.popBox.show(e);	
	});
	parent.deskRefresh.dynamic.push(refresh);
	$('.dmDeskCancel').bind('click',parent.popBox.hide);
	$('.dmDeskSubmit').bind('click',parent.popBox.hide);
});

