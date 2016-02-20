var option = {
	tooltip:{
		trigger: 'axis'
	},
	color:['#00bb9c'],
	grid:{
		x:50,
		x2:20
	},
	//calculable : true,
	xAxis : [
	{
		type : 'category',
		boundaryGap : false
	}
	],
		yAxis : [
		{
			type : 'value'
		}
	],
		series : [
		{
			name:'总数',
			type:'line',
			smooth:true,
			symbol:'none',
			itemStyle: {normal: {areaStyle: {type: 'default'}}}
		}
	]
};
var refresh = function(type){
	var areaType = type?type:parent.areaType;
	option.animation = type?true:false;
	parent.desk.server.request('history',{time_type:areaType},function(data){
		var	arr = data.rows;
		var len = data.total;
		var times = [];
		var datas = [];
		for (var i=0;i<len;i++){
			times.push(arr[i].data_time);
			datas.push(parseInt(arr[i].sum));
			if(i == len-1){
				option.xAxis[0].data = times;
				option.series[0].data = datas;
				require(
					[
					'echarts',
					'echarts/chart/line' // 使用柱状图就加载bar模块，按需加载
					],
					function (ec) {
						var myChart = ec.init(document.getElementById('sessionframe'),'infographic');
						// 为echarts对象加载数据 
						myChart.setOption(option);
						setTimeout(function (){ 
							window.onresize = function () { 
								myChart.resize(); 
							} 
						},200) 
					}
					);

			}
		}
		if(!len || len ==0){
			$('.showNull').fadeIn();
			return;
		}else{
			$('.showNull').fadeOut();
		}
		// 使用
	},'post');
}
$(document).ready(function() {
	require.config({
		paths: {
			echarts: '../js'
		}
	});
	parent.deskRefresh.dynamic.push(refresh);	

	// 路径配置
});
