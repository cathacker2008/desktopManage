
var showMessage=function(val, row, index) {
                    var abValue = val;
                    return '<a title="' + val + '" class="note">' + abValue + '</a>';
                }

$(document).ready(function(){
	var searchType='message';
	var search = function(){
		searchParam = null;
		var searchParam = {};
		searchParam[searchType] = $('#warningInput').val()?$('#warningInput').val():null;
		table.setParam('param',searchParam);
		table.getData();
	}
	var refresh = function(){
			table.getData();
	}
	$('#warningInput').attr('placeholder',tip.map['SEARCHWORDS']);
	$('#warningInput').placeholder();
	var formatPic = function(val,row,colObj){
		var tmp ;
		if(val == '0'){
			tmp = 'volume dragcolor5';
		}else if( val == '1'){
			tmp='warning dragcolor4';
		}else {
			tmp = 'volume dragcolor5';
		}
		return $dc.createDom('div:icon-'+tmp,'',null,null);
	}
var table =	$('#dgwrap').deskTable({
		url:'../'+parent.desk.server.getUrl('getwarninglist'),
		type:'post',
		keys:[{title:'',key:'severity','formatter':formatPic,width:30},{title:'描述',key:'message',width:'80%'},{title:'时间',key:'log_time','formatter':function(val,row,colObj){
				var tmp = val.split('.')[0];
				var panel = $dc.createDom('div:','',{
					html:tmp
				},null);
			return panel;
		},width:'20%'}],
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
			var a = table.getEle(null,1);
			$.each(a,function(i,n){
				this.dom.title = this.data;
				//$(this.dom).tooltip({
					//track:true,
					//width:300
				//});
			});
		}
	});
	parent.deskRefresh.dynamic = [];
	parent.deskRefresh.dynamic.push(refresh);
	$('.searchPic').bind('click',search);
	parent.setIframe($(document).height());
	$(".menu-item").each(function(index, element) {
		$(this).css("height","33px");
	});
});
