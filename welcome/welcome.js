var msg = {
	  success:'success',
	  loginFail:'\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\u8bef\uff01',
	  pwdCantNull:'\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a\uff01',
	  pwdTooShort:'\u5bc6\u7801\u957f\u5ea6\u4e0d\u80fd\u5c11\u4e8e\u0036\u4f4d\uff01',
	  pinCantNull:'\u8bf7\u8f93\u5165\u0050\u0049\u004e\u7801\uff01',
	  ExplorerError:'\u672c\u529f\u80fd\u8981\u6c42\u0049\u0045\u3001\u0046\u0069\u0072\u0065\u0066\u006f\u0078\u6d4f\u89c8\u5668\u8fd0\u884c\u73af\u5883\uff01',
	  IEExplorerError:'\u672c\u529f\u80fd\u8981\u6c42\u0049\u0045\u0038\u6d4f\u89c8\u5668\u8fd0\u884c\u73af\u5883\uff01',
	  InsertKey:'\u8bf7\u63d2\u5165\u0055\u0053\u0042\u0020\u004b\u0045\u0059\uff01',
	  keyNotbelongEngine:'\u63d2\u5165\u7684\u0055\u0053\u0042\u004b\u0045\u0059\u4e0d\u5c5e\u4e8e\u672c\u7cfb\u7edf\uff01',
	  keyNotMatchUser:'\u63d2\u5165\u7684\u0055\u0053\u0042\u004b\u0045\u0059\u4e0e\u7528\u6237\u4e0d\u5339\u914d\uff01',
	  loginErrorTimes:'\u7528\u6237\u540d\u6216\u5bc6\u7801\u9519\u8bef\uff0c\u60a8\u8fd8\u53ef\u4ee5\u5c1d\u8bd5{i}\u6b21',
	  loginneedwait:'\u5bc6\u7801\u9519\u8bef\u6b21\u6570\u8fc7\u591a\uff0c\u8bf7\u0031\u0030\u5206\u949f\u540e\u518d\u8bd5\u3002',
	  userunauthorized:'\u8d26\u6237\u672a\u6388\u6743',
	  worngnameorpassword :'\u7528\u6237\u540D\u6216\u5BC6\u7801\u9519\u8BEF',
	  typeerror : '\u7528\u6237\u767B\u5F55\u7EC8\u7AEF\u9519\u8BEF\uFF0C\u53EA\u80FD\u5728\u6307\u5B9A\u7EC8\u7AEF\u4E0A\u767B\u5F55',
	  iperror : '\u7528\u6237\u767B\u5F55IP\u9519\u8BEF\uFF0C\u53EA\u80FD\u5728\u5236\u5B9AIP\u5730\u5740\u767B\u5F55',
	  timeerror : '\u7528\u6237\u767B\u5F55\u65F6\u95F4\u9519\u8BEF\uFF0C\u53EA\u80FD\u5728\u5236\u5B9A\u7684\u65F6\u95F4\u8303\u56F4\u5185\u767B\u5F55',
	  canotfind : '\u627E\u4E0D\u5230\u8BE5\u767B\u5F55\u7528\u6237\u4FE1\u606F',
	  pinWrong:'\u0050\u0049\u004e\u4e0d\u6b63\u786e\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01'
  };
  var welcome = {
	  currLink: 0,
	  speed: 800,
	  engineID: "00000000-0000-0000-0000-000000000000",
	  loginWithUsbKey:false,
	  param:{
		
	  },
	  defaultDomain: ["internal", "internal", "internal"],
	  expand:function(i){
		  if(this.currLink == -1){
			  var speed = this.speed;
			  $("#header").animate({'margin-top':'-127px'},speed);
			  var linkNav = $("#links"),links = linkNav.find("a"),content = $("#content");
			  linkNav.height(188);
			  linkNav.animate({'margin-top':0},speed);
			  links.eq(0).animate({top:'60px',left:'0px'},speed);
			  links.eq(1).animate({top:'60px',left:'168px'},speed);
			  links.eq(2).animate({top:'60px',left:'336px'},speed);
			  links.eq(3).animate({top:'60px',left:'504px'},speed);
			  links.eq(4).animate({top:'60px',left:'672px'},speed);
			  if(i < 3){
				  $(".loginform").css("top","24px").show();
			  }
			  else if(i == 4){$(".document").css("top","24px");}
			  content.show();
			  content.find(".shadow_top").height(24);
			  content.animate({height:'520px'},speed);
		  }
		  this.change(i);
	  },
	  change:function(i){
		  if(this.currLink != i){
			  var fingerLabel = $(".finger label");
			  fingerLabel.show(this.speed * 1.5);
			  var a = [8,178,346,515,682];
			  fingerLabel.animate({left:a[i] + 'px'},this.speed / 2);
			  this.resetForm();
			  if(i < 3){
				  this.setDomain(this.defaultDomain[i]);
				  $(".loginform").show();
				  if(i == 1){$("#adminDomains").addClass("hide");$("#userDomains").removeClass("hide");}
				  else if(i == 0 || i == 2){$("#adminDomains").removeClass("hide");$("#userDomains").addClass("hide");}
				  $(".document").animate({top:'520px'},this.speed / 2,function(){$(".loginform").show().animate({top:'24px'},this.speed);$(this).hide();});
			  }
			  else if(i == 4){
				  $("#domainList").hide();
				  $(".loginform").animate({top:'520px'},this.speed / 2,function(){$(".document").show().animate({top:'24px'},this.speed);$(this).hide();});
			  }
			  this.currLink = i;
		  }
	  },
	  checkLogin:function(){
		  $('.login-msg span').html('').hide();
		  var form = $(".login form");
		  if(this.currLink >= 2){ return; }
		  //$("button[name='submit']").addClass("click");
		  //$(".info").html("");
		  switch(this.currLink){
			  case 0:
			    if(!this.loginWithUsbKey || this.verifyKey()){
					this.doLogin("webadmin");
				}
			  break;
			  case 1:
			    if(!this.loginWithUsbKey || this.verifyKey()){
					this.doLogin("userportal");
				}
			  break;
			  case 2:
				if(this.verifyKey()){
				  $.ajax({
					  type:"get",
					  url:"/terminal/load/LoadAction!login.action",
					  data:"username="+form.find("input[name='username']").val()+"&userpwd="+form.find("input[name='password']").val() ,
					  dataType:"json",
					  success:function(data,textStatus){
						  if(data.success){
							  window.location.href = data.msg;
						  }else{
							  welcome.showError(msg.loginFail);
							  return;
						  }
					  }
				  });
				}
			  break;
		  }
		  return false;
	  },
	  verifyKey:function(){
			if(this.loginWithUsbKey){
			var getInfo = this.currLink?uk.getUserKeyInfo:uk.getUserInfo;
			  if(getInfo()){
				if(uk.verifyUUID(this.engineID)){
				  if(uk.verifyRole($("input[name='username']").val())){
					return true;
				  }else{
					this.showNotice(msg.keyNotMatchUser);
				  }
				}else{
				  this.showNotice(msg.keyNotbelongEngine);
				}
			  }
			  return false;
			}
			return true;
	  },
	  doLogin:function(p){
			var form = $(".login form"), url = "/svmms/"+ p;
			var param = {};
			$('#username').val($('#username').val().replace(/(^\s*)|(\s*$)/g,''));
			param.userName = $('#username').val();
			param.passWord = $('#password').val();
			param.domain = $('#domain').val();
			//$('.loginPanel').hide();
			//$('.wait').show();
			$.post('/svmms/desktopManager/rest/system/login',form.serialize(),function(data){
				if(data.success && data.success == true){
					welcome.setCookie();
					window.location.href = '/svmms/desktopManager/ui/index.html';
				}else{
					errMsg = msg.worngnameorpassword;
					welcome.showError(errMsg);
				}
			});
	  },
	  getEngineInfo: function(){
		  if(welcome.loginWithUsbKey){ $(".pinnav").show(); }
		  $.getJSON("/svmms/init.html", function(data){ 
		  welcome.engineID = data.UUID;
		  welcome.loginWithUsbKey = Boolean(data.CheckUsbKey);
		  if(welcome.loginWithUsbKey){ $(".pinnav").show(); }
		  });
	  },
	  initDomains:function(){
		  var path = welcome.currLink==0?'webadmin':'userportal';
		  //$.get("/svmms/webadmin/domainList",null,function(data){
			  //welcome.setDomainFunc(data, "#adminDomains");
		  //});
		  $.get("/svmms/"+path+"/domainList",null,function(data){
			  welcome.setDomainFunc(data, ".domain p");
		  });
	  },
	  setDomainFunc:function(data, dom){
		  if(data.length == 0){ data = this.defaultDomain; }
		  var domains = data.split(";"),lis = [];
		  for(var i = 0;i < domains.length; i++){
			lis.push("<span>"+domains[i]+"</span>");
		  }
		  this.defaultDomain[1] = domains[0];
		  $(dom).html(lis.join(""));
		  $(".login p span").click(function(e){
			  $("#domain").val($(this).text());
			  $(this).parent().hide();
			  e.stopPropagation(); 
		  });
		  if(welcome.currLink ==1){
			if(cookies.getCookie('deskChecked1')=='true' && ($.cookie('deskDomain1'))){
				$('#domain').val($.cookie('deskDomain1'));
			}else{
				$('#domain').val($('.domain p span:first').html());
			}
		  }else{
			if(cookies.getCookie('deskTopChecked')=='true' && ($.cookie('deskDomain'))){
				$('#domain').val($.cookie('deskDomain'));
			}else{
				$('#domain').val($('.domain p span:last').html());
			}
		  }
		  //$(dom+" li").bind("click",function(){var t = $(this);welcome.setDomain(t.text());$("#domainList").hide();});
	  },
	  setDomain:function(d){
		  $("input[name='domain']").val(d);
		  $(".domainval").text(d);
	  },
	  resetForm: function(){
		  $("form input[type='text'],form input[type='password']").val("");
	  },
	  showError: function(m){
		  $(".login-msg span").html(m).show();
	  },
	  showNotice: function(m){
		  $(".login-msg span").html(m).show();
	  },
	  showInfo: function(m){
		  $(".login-msg span").html(m).show();
	  },
	  setCookie : function(){
		  if($('#remember').is( ":checked")){
			  $.cookie('desktopUser',$('#username').val(),{expires:30});
			  $.cookie('desktopPwd',$('#password').val(),{expires:30});
		  }else{
			  $.cookie('desktopUser','',{expires:-1});
			  $.cookie('desktopPwd','',{expires:-1});
		  }
	  },
	  init: function(){
		  $('.loginPanel').show();
		  $('.wait').hide();
		  this.initDomains();
		  var _this = this;
		  this.getEngineInfo();
		  var $nav = $(".menu");		
		  var $navcur = $(".curLine");
		  var current = ".current";
		  var itemW = $nav.find(current).innerWidth();
		  var defLeftNum = $nav.find(current).position().left;

		  $navcur.css({"width":itemW,"left":defLeftNum});
		  $nav.find("li").click(function(){
			  var leftNum = $(this).position().left;
			  $navcur.stop(true).animate({
				  left: leftNum
			  },200);
			  $(this).siblings().removeClass("current");
			  $(this).addClass("current");
		  })
		  $("#domain").focus(function(){
			  $(this).next("p").show();	
		  })

		  $(".menu ul li:lt(2)").click(function(){
			  welcome.currLink = $(this).index();
			  _this.initDomains();
			  if(welcome.currLink ==1){
				  $('#remember').prop('checked',cookies.getCookie('deskChecked1')?true:false);
				  $('#username').val(cookies.getCookie('deskUser1')?cookies.getCookie('deskUser1'):'');
				  $('#password').val(cookies.getCookie('deskPwd1')?cookies.getCookie('deskPwd1'):'');
				  //if($('.domain p span').length >1){
					  //$('#domain').val($('.domain p span:first').html());
				  //}
			  }else{
				  $('#remember').prop('checked',cookies.getCookie('deskTopChecked')?true:false);
				  $('#username').val(cookies.getCookie('desktopUser')?cookies.getCookie('desktopUser'):'');
				  $('#password').val(cookies.getCookie('desktopPwd')?cookies.getCookie('desktopPwd'):'');
				  //$('#domain').val($('.domain p span:last').html());
			  }
			  $(".login h2").text($(this).text());
			  if($(".tab1").is(":hidden")){
				  $(".tab2").hide();
				  $(".tab1").fadeIn();
			  }
			  $('.focusAuto')[0].focus();
		  });

		  $('.focusAuto')[0].focus();
		  $(".menu ul li:eq(4)").click(function(){
			  $(".tab1").hide();
			  $(".tab2").fadeIn();
		  });
		  $('#remember').prop('checked',cookies.getCookie('deskTopChecked')?true:false);
		  $('#username').val(cookies.getCookie('desktopUser')?cookies.getCookie('desktopUser'):'');
		  $('#password').val(cookies.getCookie('desktopPwd')?cookies.getCookie('desktopPwd'):'');
		  $('#remember').bind('click',function(){
			  var index = welcome.currLink;
			  var isChecked = $(this).is(':checked');
			  $.cookie(((index == 1)?'deskChecked1':'deskTopChecked'),(isChecked?'true':null),{expires:30}); 
			  if(!isChecked){
				//$('#username').val('');
				//$('#password').val('');
				$.cookie(((index == 1)?'deskUser1':'desktopUser'),null);
				$.cookie(((index == 1)?'deskPwd1':'desktopPwd'),null);
			  }
		  });
		  var deskType = cookies.getCookie('deskType');
		  if(deskType == '1'){
			 $(".menu ul li:lt(2)")[deskType].click();
		  }

	  }
  };
var uk = {
	  ocx: null,
	  usrOcx:null,
	  keyInfo: "",
	  checkPlugIn: function(){
		  var support = true;
		  var ocxType = welcome.currLink?'UsrOcx':'sdcOCX';
		  if(ocxType =='sdcOCX'){
			  if(document.getElementById("sdcOCX") == null){
				  if($.browser.msie) {
					  $(document.body).append('<object id="sdcOCX" height="0" width="0" classid="clsid:8350AF95-89D4-4D21-AB90-B2022F709C9A" codebase="engineinit/wstUsbKey.cab#version=2,1,0,0"></object>');
				  } else if($.browser.mozilla) {
					  $(document.body).append('<object id="sdcOCX" height="0" width="0" clsid="{8350AF95-89D4-4D21-AB90-B2022F709C9A}" type="application/x-itst-activex" event_OnReadyStateChange="OnReady" CodeBaseURL="engineinit/wstUsbKey.cab#version=2,1,0,0"></object>');
				  } else {
					  welcome.showError(msg.ExplorerError);
					  support = false;
				  }
			  }
		  }else{
			  if(document.getElementById("UsrOcx") == null){
				  if($.browser.msie) {
					  $(document.body).append('<object id="UsrOcx" height="0" width="0" classid="clsid:A6D78802-59F7-4e1f-AA9A-D9A76BA2D380" codebase="Middleware.CAB#version=5,0,2"></object>');
				  }else {
					  welcome.showError(msg.IEExplorerError);
					  support = false;
				  } 			  
			  }
		  }
		  if(support){
			  this.ocx = document.getElementById("sdcOCX");
			  this.usrOcx = document.getElementById("UsrOcx");
			  if(ocxType == 'sdcOCX'){
				  if(this.ocx.Key_GetUserInfo == undefined){
					  welcome.showNotice(msg.InsertKey);
					  support = false;
				  }
			  }else{
				  if(this.usrOcx.Key_GetUserInfo == undefined){
					  welcome.showNotice(msg.InsertKey);
					  support = false;
				  }
			  }
		  }
		  return support;
	  },
	  getUserKeyInfo:function(){
		  var s = false;
		  var usrOcx, type, param, pin;
		  if(uk.checkPlugIn()){
			  usrOcx = uk.usrOcx;
			  pin = $("#pincode").val();
			  type = 'Westone.Cryptography.Devices.Cipher.CspUsbKey';
			  param = '通用1024&Westone Cryptographic Service Provider&RootContainer|ExchContainer&{pin}';
			  if(pin.length == 0){
				  welcome.showNotice(msg.pinCantNull);
			  }else{
				  try{				  
					  usrOcx.Open(type, param.replace('{pin}', pin));
					  s = true;
				  }catch(e){
					  welcome.showNotice(msg.pinWrong);
				  }
			  }
		  }
		  return s;
		  
	  },
	  verifyUsrPinAndName:function(){
		   var s, cert, str, arr, arr2;
		   s = false;
			cert = $("#certType").val();
			str = this.usrOcx.GetCertSubject(cert);
			arr = str.split('CN=');
			arr2 = arr[1].split(',');
			return $("#un"+(parseInt(welcome.currLink) + 1)).val() == arr2[0];
	  },
	  getUserInfo: function(){
		  var s = false;
		  if(uk.checkPlugIn()){
			  var ocx = uk.ocx;
			  var pin = $("#pincode").val();
			  if(pin.length == 0){
				  welcome.showNotice(msg.pinCantNull);
			  } else {
				  var v = ocx.Key_VerifyUserPin(pin);
				  if(v == 0){
					  uk.keyInfo = ocx.Key_GetUserInfo();
					  s = true;
				  } else {
					  welcome.showError(ocx.Key_GetErroInfo(v));
				  }
			  }
		  }
		  return s;
	  },
	  verifyUUID: function(id){
		  var uuid = /<UnitCode>(.+?)<\/UnitCode>/g.exec(this.keyInfo)[1];
		  return id == uuid;
	  },
	  verifyRole: function(r){
		  var role = /<UserRole>(.+?)<\/UserRole>/g.exec(this.keyInfo)[1];
		  return r == role;
	  },
	  chgPin: function(op,np){
		  this.ocx.Key_ChangeUserPsw(op,np);
	  }
  };

	var cookies = {};
	cookies.setCookie = function(name,value){
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ';path=/';
	}

	cookies.getCookie = function(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}else{
			return null;
		}
	}

	cookies.delCookie = function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 5000);
		var cval=cookies.getCookie(name);
		if(cval!=null){
			document.cookie= name + "="+''+";expires="+exp.toGMTString();
		}
	}

  $(function(){
	  welcome.init();
	  //$(".menu ul li:lt(3)").bind("click",function(){welcome.expand($(this).index());});
	  $(".iptnav input").bind("focus",function(){$(this).siblings("label").hide();}).bind("blur",function(){var t = $(this);if(t.val().length == 0){t.siblings("label").show();}});
	  $(".domainval").bind("click focus",function(){var t = $(this),tp=t.offset().top + 50,lf=t.offset().left;$("#domainList").css({top:tp,left:lf}).show();});
	  $("button[name='submit']").bind("focus",function(){$("#domainList").hide();});
	  $('.domain').bind('click',function(e){
		  e.stopPropagation(); 
		  return false;
	  });
		$(document).click(function(){
			$('.domain p').hide();
		}); 
  });
  document.onkeydown = function (evt){
	  evt = (evt) ? evt : ((window.event) ? window.event : "");
	  var k = evt.keyCode ? evt.keyCode : evt.which;
	  if (k==13){ 
		  $('.login button').attr('id','hls');
		  welcome.checkLogin();
	  }
  };
  document.onkeyup = function (evt){
	  evt = (evt) ? evt : ((window.event) ? window.event : "");
	  var k = evt.keyCode ? evt.keyCode : evt.which;
	  if (k==13){ 
		  $('.login button').removeAttr('id');
	  }
  };

