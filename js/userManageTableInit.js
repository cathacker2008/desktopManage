var allotUser = function(info){
	parent.popBox.show({currentTarget:{className:'allotUser'}});
}

var formatName = function(val,row){
	return row.surname+' '+row.name;
}
var showMessage=function(val, row, index) {
                    var abValue = val;
                    return '<a title="' + val + '" class="note">' + abValue + '</a>';
                }
var formatUsernama=function(val, row, index) {
                    if(row.username.length > 0){
						return row.username+(row.domain.length > 0 ? ('@' + row.domain) : '');
					}		
                    return '';
                }
var checkData,refresh,search,searchType,isSecurity;
$(document).ready(function(){
	isSecurity = (parent.desk.userType == 'security'?true:false);
	refresh = function(){
		userTable.getData();
	}
	search = function(){
		var searchParam = {};
		if($('#userInput').val()){
			searchParam[searchType] = $('#userInput').val();
		}else{
			delete searchParam[searchType];
		}
		userTable.setParam('param',searchParam);
		userTable.getData();
	}
	$('.deskManageSelect').deskSelect({
		desk_sel_width:90,
		desk_sel_height:32,
		picTop:14,
		desk_pic_down:'../images/xiajiantou03.png',
		desk_pic_up:'../images/xiajiantou04.png',
		def_val:'-请选择-',
		def_item:0,//如果设置此值，def_val无效
		item:[{'opt':'用户名',val:'username'},{'opt':'组',val:'group'}],
		callback:function(param){
			searchType = param.val; 
		},
		desk:'123'
	});

	var userTable = $('#dgwrap').deskTable({
		url:'../'+parent.desk.server.getUrl('getuserlist'),
		type:'post',
		mark:'user_id',
		keys:[{title:'姓名',key:'name',width:'20%',formatter:formatName},{title:'用户名',key:'username',formatter:formatUsernama},{title:'组',key:'groups'},{title:'电子邮件',key:'email'}],
		sort:0,
		mark:'user_id',
		headAlign:'left',//默认均为left
		bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
		page:1,
		checkBox:!isSecurity,
		//size:5,
		width:'',
		rowHeight:40,
		height:600,
		oddColor:'#FFFFFF',
		evenColor:'#f6f7fB',
		click:function(obj){
			if(isSecurity){return;}
			if(obj && obj.parentObj && this.checkBox){
				$(obj.parentObj.checkBox).click();
			}
		},
		checked:function(obj,arr,unCheckArr){
			var color = obj.checked?'#DFF5FE':obj.orginColor;
			$(obj.dom).css('backgroundColor',color);
			obj.dom.lastColor = color;
			if(arr.length){
				var delFlag = true;
				$.each(arr,function(i,n){
					var row = this.baseInfo;
					if(row.domain == 'internal' || row.name == 'Everyone'){
						delFlag = false;
					}
				});
				if(delFlag){
					$('.userDelete').removeClass('disableBtn');
				}else{
					$('.userDelete').addClass('disableBtn');
				}
				checkData = arr;
			}else{
				$('.userDelete').addClass('disableBtn');
			}
		},
		mouseOver:function(obj){
			$(obj.dom).css('backgroundColor','#DFF5FE');
		},
		mouseOut:function(obj){
			$(obj.dom).css('backgroundColor',obj.checked?'#DFF5FE':obj.orginColor);
		},
		callback:function(table){
			var a = table.getEle(null,1);
			$.each(a,function(i,n){
				this.dom.title = this.data;
				$(this.dom).tooltip({
					track:true,
					width:300
				});
			});
		}
	});
	if(isSecurity){
		$('.userAdd').addClass('disableBtn');
		$('.userCreate').addClass('disableBtn');
		$('.userCreate').addClass('disableBtn');
	}else{
		$('.userAdd').bind('click',allotUser);
		$('.userCreate').bind('click',parent.popBox.show);
		$('.userDelete').bind('click',function(e){
			parent.popBox.show(e);
		});
	}
	
	$('.searchPic').bind('click',search);
	parent.setIframe($(document).height());
	$(".menu-item").each(function(index, element) {
		$(this).css("height","33px");
	});
});
