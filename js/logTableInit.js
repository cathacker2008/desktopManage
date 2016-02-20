$(document).ready(function(){
			var searchType='message';
			var search = function () {
				searchParam = null;
				var searchParam = {};
				searchParam[searchType] = $('#logInput').val() ? $('#logInput').val() : null;
				table.setParam('param', searchParam);
				table.getData();

			}
			$('#logInput').attr('placeholder',tip.map['SEARCHWORDS']);
			$('#logInput').placeholder();
			var refresh = function () {
				table.getData();
			}

		var formatPic = function(val,row,colObj){
			var tmp ;
			if(val == '0'){
				tmp = 'check-fill dragcolor4';
			}else if( val == '1'){
				tmp='cancel-fill dragcolor4';
			}else {
				tmp = 'check-fill dragcolor4';
			}
			return $dc.createDom('div:icon-'+tmp,'',null,null);
		}

		var table =	$('#dgwrap').deskTable({
			url:'../'+parent.desk.server.getUrl('getloglist'),
			type:'post',
			keys:[{title:'',key:'severity','formatter':formatPic,width:30},
				{title:'信息',key:'message',width:500,'formatter':function(val, row, index) {
					var abValue = val;
					return '<a title="' + val + '" class="note">' + abValue + '</a>';
				}},
				{title:'用户',key:'user_name','formatter':function(val, row, index) {
					var abValue = val;

					return val;
				}},
				{title:'主机',key:'vds_name','formatter':function(val, row, index) {
					var abValue = val;
					return '<a title="' + val + '" class="note">' + abValue + '</a>';
				}},
				{title:'虚拟机',key:'vm_name'},
				{title:'时间',key:'log_time',width:180,'formatter':function(val,row,colObj){
				var tmp = val.split('.')[0];
				var panel = $dc.createDom('div:','',{
					html:tmp
				},null);
				return panel;
			}},
				{title:'模板',key:'vm_template_name'},
				{title:'数据中心',key:'vds_name'},
				{title:'存储',key:'storage_domain_name'},
				{title:'群集',key:'vds_group_name'},
			],
			sort:0,
			headAlign:'left',//默认均为left
			bodyAlign:'left',//在keys中设置headAlign和bodyAlign是设置某一列的对齐
			page:1,
			//checkBox:true,
			size:15,
			width:'',
			rowHeight:40,
			height:600,
			oddColor:'white',
			evenColor:'#f6f7fb',
			click:function(dom){
			},
			mouseOver:function(obj){
				$(obj.dom).css('backgroundColor','#DFF5FE');
			},
			mouseOut:function(obj){
				$(obj.dom).css('backgroundColor',obj.checked?'#DFF5FE':obj.orginColor);
			},
			callback:function(table){
				//var a = table.getEle(null,1);
				//$.each(a,function(i,n){
					//this.dom.title = this.data;
					//$(this.dom).tooltip({
						//track:true,
						//width:300
					//});
				//});
			}
		});
		$('.deskManageSelect').deskSelect({
			desk_sel_width:90,
			desk_sel_height:32,
			picTop:14,
			desk_pic_down:'../images/xiajiantou03.png',
			desk_pic_up:'../images/xiajiantou04.png',
			def_val:'-请选择-',
			def_item:0,//如果设置此值，def_val无效
			item:[{'opt':'用户',val:'user_name'},{opt:'信息',val:'message'},{'opt':'虚拟机',val:'vm_name'},{'opt':'模板',val:'vm_template_name'}],
			callback:function(param){
				searchType = param.val;
			},
			desk:'123',
		});
		parent.deskRefresh.dynamic = [];
		parent.deskRefresh.dynamic.push(refresh);
		$('.searchPic').bind('click',search);
		parent.setIframe($(document).height());
		$(".menu-item").each(function(index, element) {
			$(this).css("height","33px");
		});
	}
)
