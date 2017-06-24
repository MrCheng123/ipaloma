
//页面加载框架自适应高度
$(function(){	
	frameAutoHeight();
	firstMenu();		
	});

//框架自适应高度
function frameAutoHeight(){	
	//框架内容高度
	var winHeight = $(window).height();
	var frameTopHeight= $("#frameTop").height();
	var frmaeMiddleHeight = $("#frameMiddel").height();
	var frameBottomHeight = $("#frameBottom").height();
	//框架充满屏幕高度
	var  frameMiddleRealHeight = winHeight-frameTopHeight-frameBottomHeight;
	var  frameRightRealHeight = winHeight-frameTopHeight-frameBottomHeight;
   $("#frameMiddelRight").css("height",frameRightRealHeight);	
   $("#frameMiddelLeft, #frameLeftToggle").css("height",frameMiddleRealHeight);	
   $("#frameLeftToggle").css("position","relative");
   $("#frameLeftToggle img").css("left","0%");
   $("#frameLeftToggle img").css("top","50%");
   $("#frameLeftToggle img").css("position","absolute");
	}



//框架导航显示隐藏
function hideNavi(){ 	
	 $("#frameMiddelLeft").fadeOut();
	 var frameMiddelRightWidth = $("#frameMiddelRight").css("width","99%");	 
	 $("#frameLeftToggle").html("<img src='images/arrow_right.jpg'  onclick='showNavi()' title='展开导航菜单'/>");
     frameAutoHeight();	
	}
	
function showNavi(){	
		$("#frameMiddelLeft").fadeIn();
		 var frameMiddelRightWidth = $("#frameMiddelRight").css("width","89%");	 
		$("#frameLeftToggle").html("<img src='images/arrow_left.jpg'  onclick='hideNavi()' title='隐藏导航菜单'/>");
		frameAutoHeight();		
	}	
	
//框架一级导航	
function firstMenu(){	
	$("#firstMenu li").each(function(){
		$(this).mousedown(function(){		
			$("li.currentMenu").removeClass("currentMenu");
			$(this).addClass("currentMenu");			
			})	    		
		})
	}	
	
//框架二级导航
function menuClick(mainMenu){
		$(".subMenu").not( $(mainMenu).siblings("ul") ).fadeOut();
		$(mainMenu).siblings("ul").slideToggle("slow");
		//遍历二级菜单
		$(mainMenu).siblings("ul").children().each(function(){
			
			$(this).mousedown(function(){
			//清除样式	
			 $("a.currentLi").removeClass("currentLi");
			//添加当前样式					
				$(this).children().addClass("currentLi");						
				})
			})	
		
	}	
	

	
	

