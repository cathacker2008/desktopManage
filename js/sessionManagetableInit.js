var sessionData,refresh;
$(document).ready(function(){
	var data = {};
	var searchType;
	var isSecurity = (parent.desk.userType == 'security'?true:false);
	var search = function () {
		searchParam = null;
		var searchParam = {};
		searchParam[searchType] = $('#sessionInput').val() ? $('#sessionInput').val() : null;
		table.setParam('param', searchParam);
		table.getData();
	};
	$('#sessionInput').attr('placeholder',tip.map['SEARCHWORDS']);
	$('#sessionInput').placeholder();
	refresh = function () {
		table.getData();
	}

	var closeSession = function(e){
		e.stopPropagation();
		if(parent.desk.userType=='security'){
			return;
		}
		var obj = {};
		obj.host_id = this.host_id;
		obj.vm_id = this.vm_id;
		var checkBox = this.checkBox;
		parent.desk.server.request('closesession',obj,function(data){
			if(data.success == true){
				parent.tip.showResult({status:0,info:data.msg?data.msg:''});
			}else{
				parent.tip.showResult({status:2,info:data.msg?data.msg:''});
			}
			if($(checkBox).attr('checked')){
				$(checkBox).click();
			}
			refresh();
		},'post');
	}

	var table=$('#dgwrap').deskTable({
		url:'../'+parent.desk.server.getUrl('getsessionlist'),
		type:'post',
		mark:'vm_guid',
		keys:[{title:'桌面名称',key:'vm_name',width:'22%'},
			{title:'控制台用户',key:'console_cur_user_name',width:'37.6%'},
			{title:'客户端IP',key:'client_ip',width:'31.7%'},
			{title:'操作',key:'attr1',width:'8.7%','formatter': function(val,row,col){
				var button = $dc.createDom('div:sessionIconstyle','',null,null);
				var pic = $dc.createDom('span:icon-power-down innerspan-icon','',null,button);
				var info = $dc.createDom('span:innerspan','',{html:'结束'},button);
				if(parent.desk.userType!='security'){
					$(button).hover(function () {
						$(pic).css('color', '#269ED4');
						$(info).css('color', '#269ED4');
						$(this).css('borderColor', '#269ED4');
					}, function () {
						$(pic).css('color', '#656D78');
						$(info).css('color', '#656D78');
						$(this).css('borderColor', '#CCD1D9');
					});
				}else{
					$(button).addClass('disableshutdown');
				}
				button.host_id = row.run_on_vds;
				button.vm_id = row.vm_guid;
				button.checkBox = col.parentObj.checkBox;
				$(button).bind('click', closeSession);
				return button;
			}}
		],
		sort:0,
		headAlign:'left',//默认均为left
		bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
		page:1,
		checkBox:true,
		//size:5,
		width:'',
		rowHeight:40,
		height:600,
		oddColor:'#FFFFFF',
		evenColor:'#f6f7fB',
		click:function(obj){
			if(obj && obj.parentObj && this.checkBox){
				$(obj.parentObj.checkBox).click();
			}
		},
		checked:function(obj,arr){
			if(arr.length>=2 && !isSecurity ){
				var delFlag=true;
			}
			if(delFlag){
				$('.sessionDelete').removeClass('disableBtn');
			}else{
				$('.sessionDelete').addClass('disableBtn');
			}
			sessionData=arr;
		},
		mouseOver:function(obj){
			$(obj.dom).css('backgroundColor','#DFF5FE');
		},
		mouseOut:function(obj){
			$(obj.dom).css('backgroundColor',obj.checked?'#DFF5FE':obj.orginColor);
		},
		callback:function(table){
			var a = table.getEle(null,0);
			$.each(a,function(i,n){
				this.dom.title = this.data;
				$(this.dom).tooltip({
					track:true,
					width:300
				});
			});
		}
	})

	$('.deskManageSelect').deskSelect({
		desk_sel_width:90,
		desk_sel_height:32,
		picTop:14,
		desk_pic_down:'../images/xiajiantou03.png',
		desk_pic_up:'../images/xiajiantou04.png',
		def_val:'-请选择-',
		def_item:0,//如果设置此值，def_val无效
		item:[{'opt':'名称',val:'vm_name'},{'opt':'用户',val:'console_cur_user_name'},{'opt':'客户端IP',val:'client_ip'}],
		callback:function(param){
			searchType = param.val; 
		},
		desk:'123'
	});
	$('.searchPic').bind('click',search);
	$('.sessionDelete').bind('click',function(e){
		if(!sessionData){return;}
		parent.popBox.show(e);
	});
	parent.deskRefresh.dynamic.push(refresh);
	parent.setIframe($(document).height());
	$(".menu-item").each(function(index, element) {
		$(this).css("height","33px");
	});
});
