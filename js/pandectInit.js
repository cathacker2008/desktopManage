var pieId;//集群id用来显示饼图
var areaType;//会话统计下拉框参数
$(document).ready(function(){
	var refresh = function(){
		server.request('pandect',null,function(data){
			var param = data;
			$('#pandectDataCenter').html(param.dcCount);
			$('#pandectCluster').html(param.vdsCount);
			$('#pandectServer').html(param.hostCount);
			$('#pandectDesk').html(param.vmCount);
		},'get');
	}
	desk.server.getSelectItem({url:'clusterlist'},function(arr){
		$('.deskSelectPanel').deskSelect({
			desk_sel_width:120,
			desk_sel_height:26,
			desk_pic_down:'./images/xiajiantou03.png',
			desk_pic_up:'./images/xiajiantou04.png',
			def_val:'-请选择-',
			def_item:0,//如果设置此值，def_val无效
			item:arr,
			callback:function(param){
				 pieId = param.val;
				if(deskPie.window.refresh){
					deskPie.window.refresh(param.val);
				}else{
					window.setTimeout(function(){
						if(('undefined' != typeof deskPie)&&deskPie.window.refresh){
							deskPie.window.refresh(param.val);
						}
					},500);
				}
			}
		});
	});
	deskRefresh.dynamic.push(refresh);
	refresh();
	$('.deskSelectPanel1').deskSelect({
		desk_sel_width:78,
		desk_sel_height:26,
		desk_pic_down:'./images/xiajiantou03.png',
		desk_pic_up:'./images/xiajiantou04.png',
		def_item:1,//如果设置此值，def_val无效
		def_val:'请选择',
		item:[{'opt':'分',val:'minute'},{'opt':'小时',val:'hour'},{'opt':'天',val:'day'}],
		callback:function(param){
			areaType = param.val;
			if(area.window.refresh){
				area.window.refresh(param.val);
			}else{
				window.setTimeout(function(){
					if(('undefined' != typeof area) &&area.window.refresh){
						area.window.refresh(param.val);
					}
				},500);
			}
		},
		desk:'123'
	});
	var linkToTop = function(index){
		window.deskMenu.arr[index].click();
	}
	$('.MenuLayer1').bind('click',function(){
		linkToTop(1);
	});
	$('.MenuLayer2').bind('click',function(){
		linkToTop(1);
	});
	$('.MenuLayer3').bind('click',function(){
		linkToTop(1);
	});
	$('.MenuLayer4').bind('click',function(){
		linkToTop(2);
	});
});
