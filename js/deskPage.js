var totalwrapPage;
(function($){


	$.fn.tablePage = function(options){
		var pageIndex = 1;//初始化页码
		var pageSize = 10;//初始化页面条数
		var totalPage = 1;//初始化总页数
		var totalRecord = 0;//初始化总条数
		var width=650;
		var widthPer,maxWidth,baseWidth;
		var defaults = {
			totalRecord:0,
			pageSize:10,
			pageIndex:1,
			width:650,
			callback:function(){
			}
		}
		var $thisPageControll;
		if($.browser.msie){
			baseWidth = 350;
			widthPer = 38;
			maxWidth = 550;
		}else{
			baseWidth = 342;
			widthPer = 36;
			maxWidth = 545;
		}
		if($('link[href$="row-style.css"]').length ==0){
			$dc.loadCSS('./css/row-style.css');
		}
		var options = $.extend(defaults, options);

		this.each(function(){
			$thisPageControll=$(this);
			pageControll()
			//分页总方法
			function pageControll(){
				//赋值，赋给全局变量
				totalRecord = options.totalRecord;
				pageSize =options.pageSize;
				width=options.width;
				if(width>600){
					var footwrapout=document.createElement("div");
					footwrapout.setAttribute("class","desk-table-foot-wrap");
					totalPage = Math.ceil(parseInt(totalRecord)/parseInt(pageSize));
					totalwrapPage=totalPage;
					if(totalwrapPage<=5) {
						footwrapout.style.width = baseWidth + widthPer * totalwrapPage + "px";
					}else{
						footwrapout.style.width=maxWidth+"px";
					}

					var footwrap=document.createElement("div");
					footwrap.setAttribute("class","floatLeft");
					footwrapout.appendChild(footwrap);

					var bigPage=document.createElement("div");
					bigPage.setAttribute("class","bigPage");

					footwrap.appendChild(bigPage);
					var inner=document.createElement("div");
					inner.setAttribute("class","inner floatLeft");
					bigPage.appendChild(inner);
					var biglabel = document.createElement("div");
					biglabel.setAttribute("class","biglabel");
					footwrap.appendChild(biglabel);
					var label = document.createElement("label");
					biglabel.appendChild(label);
					var bigsubmit_btn = document.createElement("div");
					bigsubmit_btn.setAttribute("class","bigsubmit_btn");
					footwrap.appendChild(bigsubmit_btn);
					var submit_btn = document.createElement("span");
					submit_btn.setAttribute("class","sub_page_number")
					submit_btn.innerHTML = "确定";
					bigsubmit_btn.appendChild(submit_btn);
					$thisPageControll.append(footwrapout);

				}
				else if(width<400){
					var footwrapout=document.createElement("div");
					footwrapout.setAttribute("class","desk-table-foot-wrap");
					totalPage = Math.ceil(parseInt(totalRecord)/parseInt(pageSize));
					totalwrapPage=totalPage;
					if(totalwrapPage<=5) {
						footwrapout.style.width = baseWidth + widthPer * totalwrapPage + "px";
					}else{
						footwrapout.style.width=maxWidth+"px";
					}

					var footwrap=document.createElement("div");
					footwrap.setAttribute("class","floatLeft");
					footwrapout.appendChild(footwrap)
					var smallPage=document.createElement("div");
					smallPage.setAttribute("class","smallPage");
					footwrap.appendChild(smallPage);

					var inner=document.createElement("div");
					inner.setAttribute("class","inner");
					smallPage.appendChild(inner);
					var smalllabel = document.createElement("div");
					smalllabel.setAttribute("class","smalllabel");
					footwrap.appendChild(smalllabel);

					var label = document.createElement("label");
					smalllabel.appendChild(label);
					var smallsubmit_btn = document.createElement("div");
					smallsubmit_btn.setAttribute("class","smallsubmit_btn");
					footwrap.appendChild(smallsubmit_btn);
					var submit_btn = document.createElement("span");
					submit_btn.setAttribute("class","sub_page_number")
					submit_btn.innerHTML = "确定";
					smallsubmit_btn.appendChild(submit_btn);
					$thisPageControll.append(footwrapout);
				}
				else{
					var footwrapout=document.createElement("div");
					footwrapout.setAttribute("class","desk-table-foot-wrap");
					totalPage = Math.ceil(parseInt(totalRecord)/parseInt(pageSize));
					totalwrapPage=totalPage;
					if(totalwrapPage<=5) {
						footwrapout.style.width = baseWidth + widthPer * totalwrapPage + "px";
					}else{
						footwrapout.style.width=maxWidth+"px";
					}

					var footwrap=document.createElement("div");
					footwrap.setAttribute("class","floatLeft");
					footwrapout.appendChild(footwrap)

					var middlePage=document.createElement("div");
					middlePage.setAttribute("class","middlePage");
					footwrap.appendChild(middlePage);
					var inner=document.createElement("div");
					inner.setAttribute("class","inner");
					middlePage.appendChild(inner);
					var middlelabel = document.createElement("div");
					middlelabel.setAttribute("class","middlelabel");
					footwrap.appendChild(middlelabel);
					var label = document.createElement("label");
					middlelabel.appendChild(label);
					var middlesubmit_btn = document.createElement("div");
					middlesubmit_btn.setAttribute("class","middlesubmit_btn");
					footwrap.appendChild(middlesubmit_btn);
					var submit_btn = document.createElement("span");
					submit_btn.setAttribute("class","sub_page_number");
					submit_btn.innerHTML = "确定";
					middlesubmit_btn.appendChild(submit_btn);
					$thisPageControll.append(footwrapout);
				}
				var pre = document.createElement("div");
				pre.setAttribute("class","item pre commonPre");
				pre.innerHTML = "上一页"
				var object = inner.appendChild(pre);
				var ul=document.createElement("ul");
				ul.setAttribute("class","items floatLeft");
				inner.appendChild(ul);
				var next=document.createElement("div");
				next.setAttribute("class","item next commonNext");
				next. innerHTML = "下一页";
				inner.appendChild(next);

				var total = document.createElement("div");
				total.setAttribute("class","total");
				var total_page = document.createElement("span");
				total_page.setAttribute("class","total_page");

				var word_1 = document.createElement("span");
				word_1.innerHTML = "共";
				var word_2 = document.createElement("span");
				word_2.innerHTML = "页";

				total.appendChild(word_1);
				total.appendChild(total_page);
				total.appendChild(word_2);
				inner.appendChild(total);


				var input = document.createElement("input");
				input.setAttribute("class","goto_page");
				input.setAttribute("type","number");

				var input_word_1 = document.createElement("span");
				input_word_1.innerHTML = "到第";
				var input_word_2 = document.createElement("span");
				input_word_2.innerHTML = "页";

				label.appendChild(input_word_1);
				label.appendChild(input);
				label.appendChild(input_word_2);

				$thisPageControll.find(".page_index").html(pageIndex);

				totalPage = Math.ceil(parseInt(totalRecord)/parseInt(pageSize));
				totalwrapPage=totalPage;
				$thisPageControll.find(".total_page").html(totalPage);
				$thisPageControll.find(".total_record").html(totalRecord);



				pageIndex = options.pageIndex;
				if(pageIndex==1){
					$thisPageControll.find(".pre").addClass("disable");
					$thisPageControll.find(".next").removeClass("disable");
				}
				else if(pageIndex==totalPage){
					$thisPageControll.find(".next").addClass("disable");
					$thisPageControll.find(".pre").removeClass("disable");
				}
				else{
					$thisPageControll.find(".pre").removeClass("disable");
					$thisPageControll.find(".next").removeClass("disable");
				}
				$thisPageControll.find(".goto_page").val(parseInt(pageIndex));
				pageNumberShow(pageIndex,totalPage);

				$thisPageControll.find(".pre").on("click",function(){
					if(pageIndex>1){
						pageIndex --;
						changePage(pageIndex,pageSize);
						$thisPageControll.find(".page_index").html(pageIndex);
					}
				})
				$thisPageControll.find(".next").on("click",function(){
					if(pageIndex<totalPage){
						pageIndex ++;
						changePage(pageIndex,pageSize);
						$thisPageControll.find(".page_index").html(pageIndex);
					}
				})
				//跳页
				$thisPageControll.find(".sub_page_number").on("click",function(){
					var pageNumber = $thisPageControll.find(".goto_page").val();

					if(!pageNumber||pageNumber<=0){
						return false;
					}

					if(pageNumber > totalPage){//如果输入数字大于总页数
						pageNumber = totalPage;
						pageIndex = pageNumber;
						changePage(pageIndex,pageSize);
						$thisPageControll.find(".page_index").html(pageIndex);
						$thisPageControll.find(".goto_page").val(totalPage);
					}else if(pageNumber <= totalPage){
						pageIndex = pageNumber;
						changePage(pageIndex,pageSize);
						$thisPageControll.find(".page_index").html(pageIndex);
					}
				})
				//监听输入框页码变化keyup
				$thisPageControll.find(".goto_page").on("keyup",function(){
					var value = $(this).val();
					if(value > totalPage){
						$(this).val(totalPage)
					}else if(value<=0){
						$(this).val("")
					}
				})
				//监听输入框页码变化change
				$thisPageControll.find(".goto_page").on("change",function(){
					var value = $(this).val();
					if(value > totalPage){
						$(this).val(totalPage)
					}else if(value<=0){
						$(this).val(1)
					}
				})
				$thisPageControll.find(".page_size").on("change",function(){
					options.pageSize = $(this).val();//获取每页显示条数
					pageSize = options.pageSize
					pageIndex = 1;//回到第一页
					totalPage = Math.ceil(parseInt(totalRecord)/parseInt(pageSize));//重新计算总页数
					$thisPageControll.find(".total_page").html(totalPage);
					changePage(pageIndex,pageSize);
					$thisPageControll.find(".page_index").html(pageIndex);
				})
			}

		})

		//跳页方法
		function changePage(nowpageindex,nowpagesize){
			//alert(nowpageindex)
			//设定当前页码和每页显示条数值
			pageIndex = nowpageindex;
			pageSize = nowpagesize;
			//alert(totalPage)
			//alert(pageIndex+","+pageSize+","+totalPage)
			if(pageIndex==1){
				$thisPageControll.find(".pre").addClass("disable");
				$thisPageControll.find(".next").removeClass("disable");
			}
			else if(pageIndex==totalPage){
				$thisPageControll.find(".next").addClass("disable");
				$thisPageControll.find(".pre").removeClass("disable");
			}
			else{
				$thisPageControll.find(".pre").removeClass("disable");
				$thisPageControll.find(".next").removeClass("disable");

			}
			$thisPageControll.find(".goto_page").val(parseInt(pageIndex));
			pageNumberShow(pageIndex,totalPage);
			return options.callback(pageIndex,pageSize);
		}

		function pageNumberShow(curPage,totalPage_1){

			totalPage_1 = parseInt(totalPage_1);
			curPage = parseInt(curPage);
			var pageStartStr = ""
			var pageEndStr = ""

			if(totalPage_1 < 5){
				var pageStart = 1;
				var pageEnd = totalPage_1;
			}else if(totalPage_1 - curPage > 2 && curPage > 5){
				var pageStart = curPage - 2;
				var pageEnd = curPage + 2;
				pageStartStr = "<li class='item' data-page-number='1'>1</li>"
					+"<li class='item' data-page-number='2'>2</li>"
					+"<li class='dot'>...</li>"
				pageEndStr = "<li class='dot'>...</li>"
			}else if(totalPage_1 - curPage <= 2 && curPage >= 5){
				var pageStart = totalPage_1 - 4;
				var pageEnd = totalPage_1;
				pageStartStr = "<li class='item' data-page-number='1'>1</li>"
					+"<li class='item' data-page-number='2'>2</li>"
					+"<li class='dot'>...</li>"
			}else if(totalPage_1 - curPage > 2 && curPage == 5){
				var pageStart = 1;
				var pageEnd = curPage + 2;
				pageEndStr = "<li class='dot'>...</li>"
			}
			else if( curPage < 5 && totalPage_1 >= 5 ){
				var pageStart = 1;
				var pageEnd = 5;
				pageEndStr = "<li class='dot'>...</li>"
			}
			//alert(pageEnd)
			var pageStr = "";
			for(var i = pageStart ; i <= pageEnd ; i++){
				if(curPage==i){
					pageStr += "<li class='item active' data-page-number='"+i+"'>"+i+"</li>";
				}else{
					pageStr += "<li class='item' data-page-number='"+i+"'>"+i+"</li>";
				}

			}
			pageStr = pageStartStr + pageStr + pageEndStr
			$thisPageControll.find(".items").html(pageStr).unbind("click").on("click",".item",function(){
				changePage($(this).attr("data-page-number"),pageSize);
			});
		}
	}

})(jQuery);

