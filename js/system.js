$(document).ready(function(){
	window.setIframe = function(h){
		$('.systemContainer').height(h);
	}; 
	desk.server.request('about',null,function(data){
		if(data.success == true){
			var limit;
			if(data.msg.cpuNum == '-1' && data.msg.vmNum == '-1'){
				limit = '无限制';
			}else{
				limit = '虚拟机：'+(data.msg.vmNum == -1?'无限制':data.msg.vmNum)+'，CPU：'+(data.msg.cpuNum == '-1'?'无限制':data.msg.cpuNum);
			}
			var time = data.msg.useTime=='-1'?'无限制':Math.ceil(data.msg.useTime/144)+'天';
			$('.systemUser').html(data.msg.organization+' '+data.msg.userName);
			$('.systemtype').html(data.msg.kind==1?'专享版':'企业版');
			$('.systemLimit').html(limit);
			$('.limitTime').html(time);
			$('.stopTime').html(data.msg.endDate);
			$('.systemFlag').html(data.msg.systemId);
		}
	},'post');
});

