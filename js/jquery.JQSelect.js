/*
 * JQSelect 插件
 * Powered By Mr Zhou
 * QQ 627266138
 * E-mail 627266138qq.com
 * Date 2013-10-17
 * Dependence jquery-1.7.2.min.js
 **/


LoadCSS("css/select.css"); //加载css文件

(function ($) {
  //调用方法 $('.xxx').JQSelect({sel_width:"260",sel_height:"28"});
  $.fn.selectDefaults = { //默认参数
      sel_width:260,//设置select宽度
      sel_height:28,//设置select高度
      def_val:"-==请选择==-", //设置默认值
      sel_val:'{"1":"1111","2":"2222","3":"3333","4":"1111","2":"2222","5":"3333","6":"1111","7":"2222","8":"3333","9":"1111","10":"2222","11":"3333","12":"1111","13":"2222","14":"3333"}',// 数据  格式：{"id":"val"}
      item_size:10 //下拉选项显示个数
  };
  $.extendSelect = function (obj,opt) { //obj 元素对象，opt 参数对象
    var g = {  //公共方法， 外部可调用
      //初始化
      init: function () {
        var valSize = 0; //获取值个数
        var html=""; //初始化select结构
        html += "<a href='javascript:void(0);' class='txt_box' id='txt_box'>";
        html += "    <input type='text' class='sel_inp' selectable = 'false' id='sel_inp' readonly='readonly' value="+ opt.def_val +" t_valID='0' /><span class='sel_span' id='sel_span'></span>";
        html += "</a>";
        html += "<div class='sel_list' id='sel_list' style='display:none;'>";
        html += "<a href='javascript:void(0);' class='def_val' value='0'>"+ opt.def_val +"</a>";
		var josn_val = $.parseJSON(opt.sel_val); //字符串转json
        for(val_item in josn_val) //获取值
        {
            html += "<a href='javascript:void(0);' a_valID="+ val_item +" >"+ josn_val[val_item] +"</a>";
            valSize ++;
        }
        html += "</div>";
        $(g.sel_box).append(html); //将结构导入到列表中对象中
        //加入样式
        //alert(valSize);
        $(g.sel_box).css({width:opt.sel_width});
        $("#txt_box",g.sel_box).width(opt.sel_width);
        $("#sel_inp",g.sel_box).css({width:(opt.sel_width - $("#sel_span",g.sel_box).width() - 2) + "px", height: opt.sel_height + "px", lineHeight:opt.sel_height + "px"});
        $("#sel_span",g.sel_box).css({height:opt.sel_height + "px",lineHeight:opt.sel_height + "px"});
        $("#sel_list",g.sel_box).css({height: valSize > opt.item_size ? $("#sel_list a", g.sel_box).height() * opt.item_size +"px " : "auto",width:opt.sel_width});
        $("#sel_list a:last",g.sel_box).addClass("last_item");

        //下拉点击事件
        $("#txt_box",g.sel_box).on('click',function(){
            $("#sel_list",g.sel_box).show();
        });
        //离开隐藏
        $(g.sel_box).hover(function(){},function(){$("#sel_list",g.sel_box).hide();});
        //值获取
        $("#sel_list a",g.sel_box).on('click',function(e){
            $("#txt_box #sel_inp",g.sel_box).val($(this).text());
            $("#txt_box #sel_inp",g.sel_box).attr("t_valID",$(this).attr('a_valID'));
            $("#sel_list",g.sel_box).hide();
        });
      }
    };
    g.sel_box = obj; //保存对象
    g.init();
    return g;
  }
  $.fn.JQSelect = function (options) {
    if (this.length == 0) return; //判断对象是否存在
    this.each(function () {
      if (this.usedSelect) return;
      var opt = $.extend({}, $.fn.selectDefaults, options); //合并已赋值参数
      this.usedSelect = $.extendSelect(this, opt);
    });
  }
})(jQuery);

//导入样式文件
function LoadCSS(url){
	var s = document.createElement("LINK");
	s.rel = "stylesheet";
	s.type = "text/css";
	s.href = url;
	document.getElementsByTagName("HEAD")[0].appendChild(s);
}
