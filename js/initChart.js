var rs;
var radius = $(document).height()/2-55;
var innnerRadius = radius +15;
var outterRadius = innnerRadius + 27;
var center = $(document).width()/2;
var param = window.parent.testParam;
var myChart;
var showChartType='pie';
var isNull;
var colorList = ['#058fcd','#0970b2','#967adc','#6774de','#00bb9c','#8cc152','#eab92c','#eda81e','#ed5565','#da4453'];
var colorList1 = ['#b2e7ff','#7ebee5','#e2d6ff','#b2b9f4','#b4f7ec','#d8f9b4','#fbe6aa','#efd299','#f7b3ba','#f9959f'];
var createLegend = function(color,name){
	var div = $dc.createDom('div:legendDiv','','',$('.legendPanel')[0]);
	$(div).css('color',color);
	var pic = $dc.createDom('div:legendPic','','',div);
	$(pic).css('backgroundColor',color);
	var name = $dc.createDom('div:legendName','',{html:name},div);
}
var optionpie = {
    animation:false,
    tooltip : {
        trigger: 'item',
        //formatter: "{a} <br/>{b} : {c} ({d}%)"
        formatter:function(params){
            return '<br/>已启动:'+params.data.run+'个<br/>未启动:'+params.data.close+'个';
        }
    },
    legend: {
        itemGap: 20,
        orient : 'horizontal',
        x : 'center',
        //y:'-30',
        y:'top',
        data:'',
        //data:['办公桌面','测试桌面','开发桌面','剩余桌面'],
        selectedMode:false
    },
    toolbox: {
        show : false
    },
    //calculable : true,
    series : [{
        name:'访问来源',
        color:['#ff7f50'],
        type:showChartType,
        center:[center,'53%'],
        selectedMode: 'single',
        radius : [0,radius],
        // for funnel
        x: '20%',
        width: '40%',
        funnelAlign: 'left',
        max: 1000,
        itemStyle : {
            emphasis : {
                label : {
                    show : true,
                    formatter : "{b}\n{d}%",
                    textStyle:{
                        color:'#FFF',
                        align:'center',
                        baseline:'middle',
                        fontSize:11
                    }
                }
            },
            normal : {
                label : {
                    position : 'inner',
                    formatter : "{b}\n{d}%",
                    show : false,
                    textStyle:{
                        color:'#FFF',
                        align:'center',
                        baseline:'middle',
                        fontSize:10
                    }
                },
                labelLine : {
                    show :false,
                }
            }
        },
        //data:[{value:335, name:'办公桌面'},{value:679, name:'测试桌面'},{value:1000, name:'开发桌面'},{value:548, name:'剩余桌面'}]
        data:''
    }
    ]
};
var startColors = ['#967bdb','#0590cc','#37bd9b','#e3d555','#ec9076','#db7be4'];
var notStartColors = ['#cabdec','#82c8e5','#9bdecd','#f0eaa9','#f7c8bb','#edbdf0'];
var getColor = function(index,type){
	var colors = type=='start'?startColors:notStartColors;
	var len = colors.length;
	var index = index%len;
	return colors[index];
}
var optionbar = {
    //title : {
    //	text: '某地区蒸发量和降水量',
    //	subtext: '纯属虚构'
    //},
    tooltip : {
        formatter:function(params,ticket,callback){
			return params.name+'<br/>已启动:'+params.data.run+'个<br/>未启动:'+(params.data.total-params.data.run)+'个<br/>共计:'+params.data.total;
        }
    },
	color:startColors,
    //legend: {
        //data:'',
		//textStyle:{
			//color:'red'
		//}
    //},
    toolbox: {
        show : false
    },
	calculable : false,
    xAxis : [
        {
            type : 'category',
            data : '',
        },
        {
            type : 'category',
            axisLine: {show:false},
            axisTick: {show:false},
            axisLabel: {show:false},
            splitArea: {show:false},
            splitLine: {show:false},
            data : ''
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : []
};

var option=optionpie;
var getpiedata=function(data){
    if(data.length==0){
        isNull=true;
    }else{
        isNull=false;
    }
    var arr = data.rows;
    var len = data.total;

    var names = [];
    var item = [];

    for(var i=0;i<len;i++){
        if(arr[i].desktop_type_id == '' && arr[i].desktop_type_name =='other'){
            continue;
        }
        names.push((arr[i].desktop_type_name =='')?' ':arr[i].desktop_type_name);
        var objc = {};
        var objo = {};
        var obj={};
        if(arr[i].total_count !=0){isNull = false;}
        if(arr[i].run_counts !=0){isNull = false;}
        obj.value = arr[i].total_count;
        objo.name = obj.name = arr[i].desktop_type_name;
        objc.run = objo.run = obj.run = arr[i].run_counts;
        objc.close = objo.close = obj.close = arr[i].total_count-arr[i].run_counts;
        obj.itemStyle = {normal:{color:colorList[i]}};
        item.push(obj);
        objo.value = arr[i].run_counts;
        objo.itemStyle = {normal:{color:colorList[i]}};
        objc.name = '关机';
        objc.value = arr[i].total_count-arr[i].run_counts;
        objc.itemStyle = {
            normal:{
                color:['#DEE6F1'],
                label:{
                    show:false
                },
                labelLine:{
                    show : false
                }
            }
        };

    }
    if(isNull){
        $('.showNull').fadeIn();
    }else{
        $('.showNull').fadeOut('fast');
    }
    option.legend.data = names;
    option.series[0].data = item;
    option.series[0].type = showChartType;

}

var getbardata=function(data){
    if(data.length==0){
        isNull=true;
    }else{
        isNull=false;
    }
    var arr = data.rows;
    var len = data.total;
    var names = [];
    var start = {
		name:'已启动',
		type:'bar',
		itemStyle:{normal: {color:'#967bdb',label:{show:false}}},
		data:[]
	};
    var notStart = {
		name:'未启动',
		type:'bar',
		xAxisIndex:1,
		itemStyle:{normal: {color:'#cabdec',label:{show:false}}},
		data:[]
	};
	$('.legendPanel').empty();
    for(var i=0;i<len;i++){
        //if(!arr[i].desktop_type_id && !arr[i].desktop_v_cpu){
            //continue;
        //}
        names.push(arr[i].desktop_type_name);//桌面类型名称
		var startData = {};
		var notStartData = {};
		startData.itemStyle = {};
		startData.itemStyle.normal = {};
		startData.value = parseInt(arr[i].run_counts);
		startData.run = parseInt(arr[i].run_counts);
		startData.total = parseInt(arr[i].total_count);
		startData.itemStyle.normal.color = (!arr[i].desktop_type_id && !arr[i].desktop_v_cpu)?'#A0CF2F':getColor(i,'start');
		start.data.push(startData);
		notStartData.itemStyle = {};
		notStartData.itemStyle.normal = {};
		notStartData.value = parseInt(arr[i].total_count-arr[i].run_counts);
		notStartData.run = parseInt(arr[i].run_counts);
		notStartData.total = parseInt(arr[i].total_count);
		notStartData.itemStyle.normal.color = (!arr[i].desktop_type_id && !arr[i].desktop_v_cpu)?'#A0CF2F':getColor(i,'notStart');
		notStart.data.push(notStartData);
		createLegend((!arr[i].desktop_type_id && !arr[i].desktop_v_cpu)?'#A0CF2F':getColor(i,'start'),arr[i].desktop_type_name);
    }
	var outwidth = $('#desktopframe')[0].getBoundingClientRect().width;
	var innerWidth = $('.legendPanel')[0].getBoundingClientRect().width;
	$('.legendPanel').css('left',(outwidth-innerWidth)/2);
    if(isNull){
        $('.showNull').fadeIn();
    }else{
        $('.showNull').fadeOut('fast');
    }
    //option.legend.data = names;
	option.series[0] = start;
	option.series[1] = notStart;
    option.xAxis[0].data=names;
    option.xAxis[1].data=names;
}


var refresh = function(id){
    var pieId = id?id:parent.pieId;

    option.animation = id?true:false;
    isNull = true;
    parent.desk.server.request({url:'cluster',path:pieId,action:'/statistics'},null,function(data){
        var arr = data.rows;
        var len = data.total;
        if(showChartType=='pie'){
            getpiedata(data);
        }else{
            getbardata(data);
        }
        require(
            ['echarts','echarts/chart/'+showChartType],// 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
            function (ec) {
                myChart = ec.init(document.getElementById('desktopframe'),'infographic');
                myChart.setOption(option);
                //$(window).resize(function(){
                //$('#desktopframe').html('');
                //var myChart = ec.init(document.getElementById('desktopframe'),'infographic');
                //myChart.setOption(option);
                //});
            }
        );
        if(len == 0){
            $('.showNull').fadeIn();
            option.legend.data = [];
            option.series[0].data = [0,0];
            //option.series[1].data = [0,0];
            require(
                ['echarts','echarts/chart/'+showChartType],// 按需加载所需图表，如需动态类型切换功能，别忘了同时加载相应图表
                function (ec) {
                    myChart = ec.init(document.getElementById('desktopframe'),'infographic');
                    myChart.setOption(option);
                }
            );
            return;
        }
    },'get');
}
$(document).ready(function() {
    require.config({
        paths: {
            echarts: '../js'
            //echarts: 'build/dist'
        }
    });
    $('#bili').click(function(){
        showChartType='pie';
        option=optionpie;
        refresh();
		$('.legendPanel').hide();
        $('#bili').addClass('switchColor');
        $('#mingxi').removeClass('switchColor');
    });
    $('#mingxi').click(function(){
        showChartType='bar';
        option=optionbar;
		$('.legendPanel').show();
        refresh();
        $('#mingxi').addClass('switchColor');
        $('#bili').removeClass('switchColor');
    });
    parent.deskRefresh.dynamic.push(refresh);
});

