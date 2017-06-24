//20170317
//loadingStart();
//$(".contentCont").empty();
//alert(8)
//console.log("非经销宝内部环境，网络出错刷新，会报错Cannot read property '0' of undefined属于正常情况，无需处理");
//如果想查看静态页面，请注释掉$(".contentCont").empty();	ajaxAlready();ajaxNo()，当前函数是28 29 30
var linshi1='';
var linshi2='';
var linshi3=linshi4="";
var ajaxBol1=false;//用于保证2个异步都执行完毕
var ajaxBol2=false;//用于保证2个异步都执行完毕
var DistributorIDRefresh="";//0206用于网络出错刷新，经销商id；

/*调试代码，经销宝内，不可使用*/
//ajaxAlready("5ce1d14e07534139ae7774d8983f04f3");console.log("调试代码没有注释掉");
//ajaxNo("5ce1d14e07534139ae7774d8983f04f3");console.log("调试代码没有注释掉");
//http://membership.ipaloma.com/jxb/TopicActivityList.html?switchfrom=ticketlist&distributor_id=5ce1d14e07534139ae7774d8983f04f3&activity_ids=a486c6fdfd0b4e339014b16bc6b685d6,5ab752b3f7c34a8ead3c0f5c8dcbe88f,442e70595d454c90bda833bfb2b3e847,cac5d7cd13bb4d2f9b584089ca4f0931,c01fd032d87c4d83805c1d37a9e16e55
//http://membership.ipaloma.com/jxb/TopicActivityList.html?switchfrom=ticketlist&distributor_id=5ce1d14e07534139ae7774d8983f04f3

/*url截取*/
var UrlKeyValueData=getUrlKeyValue();
var activity_idsArr=[];//活动id数组
if(UrlKeyValueData.activity_ids!=undefined&&UrlKeyValueData.activity_ids!=""){
	activity_idsArr=UrlKeyValueData.activity_ids.split(",");
}
main();
function main(){ 
	/*url检测*/
    if($.isEmptyObject(UrlKeyValueData)){//如果是空对象，返回	    	
    	return;
    }
    /*是否有经销商id*/
    //在此只检测distributor_id，activity_idsArr需要在后面检测
	if(UrlKeyValueData.distributor_id==undefined||UrlKeyValueData.distributor_id==""||UrlKeyValueData.distributor_id==" "||UrlKeyValueData.distributor_id==null){//如果经销商不合法，返回
		return;
	}
	UrlDistributorIDRefresh();	
}	
//1.根据经销商id查询匹配和不匹配活动，同时将经销商id存入到localstorage中，传到详情页面
function UrlDistributorIDRefresh(){//新对接方式，暂保留之前命名方式
//	localStorage.fromTopicActivityList_DistributorID=UrlKeyValueData.distributor_id;//用于传给详情页
	DistributorIDRefresh=UrlKeyValueData.distributor_id;//用于出错刷新
	//载入页面的时候请求ajax
	if(activity_idsArr.length>0){   	
   		ajaxBol2=true;	
	}else{
		ajaxNo(DistributorIDRefresh);		
	}
    ajaxAlready(DistributorIDRefresh);   	
}
//2.根据主题活动id，决定显示隐藏哪些活动[即从超慧券页面过来]
function UrlTopicActivityIDRefresh(){//新对接方式，暂保留之前命名方式
	if(UrlKeyValueData.activity_ids==undefined||UrlKeyValueData.activity_ids==""||UrlKeyValueData.activity_ids==" "||UrlKeyValueData.activity_ids==null){
		return;
	}
	if(activity_idsArr.length==0){
		return;
	}
	$(".Aguid").each(function(){//遍历所有的guid	
//		debugger
		$(this).parents(".alist").addClass("hi2");
		for(i=0;i<activity_idsArr.length;i++){//***对接经销宝后解除注释####
			if($(this).text()==activity_idsArr[i]){
				$(this).parents(".alist").removeClass("hi2");
			}				
		}		
		/*if($(this).text()=="6ce1d14e07534139ae7774d8983f04f3"||$(this).text()=="e5f584447329429f99ee924983e48c32"){//***对接经销宝后注释掉***				
			$(this).parents(".alist").removeClass("hi2");
		}*/
	})    	
	//不隐藏了，干脆全部删除
	$(".alist.hi2").remove();
	
	//去掉tab切换
	$(".yeNo").remove();
	/*$(".Aalready").css({
	    position: "relative",
    	top: "29px",		
	})*/
	//设置上面不如设置下面
	$(".Aalready .contentCont").css({	    
    	paddingTop: "43px",		
	})
	
}
	
	
//选项卡
$(".yeNo li").click(function(){
	//重置
	$(".yeNo li").css({
		"color":"#333",
		"borderBottom":"4px solid #ccc"
	});
	var index=$(".yeNo li").index(this);
	$(".content").addClass("hi");		
	//切换
	$(this).css({
		"color":"#2580e6",
		"borderBottom":"4px solid #2580e6"
	});
	$(".content").eq(index).removeClass("hi");
})

//马上参与或活动详情
$(".contentCont").on("click",".ccfoot2",function(){
//	localStorage.fromTopicActivityList_ActivityID=$(this).parents(".con").find(".Aguid").text();
//	location.href="TopicActivityDetail.html";
//	event.stopPropagation();
//  savePage();
	window.location.assign("TopicActivityDetail.html?" + "switchfrom=toplicactivitylist"+"&distributor_id="+UrlKeyValueData.distributor_id+"&activity_id="+$(this).parents(".con").find(".Aguid").text());
//	console.log($(this).parents(".con").find(".Aguid").text());
//	engine.call('OnShowDetailClick', $(this).parents(".con").find(".Aguid").text());		
})	
/*按下效果*/
$(".contentCont").on("mousedown",".ccfoot2",function(){
	$(this).css({
		"background":"#e00303",
		"border":"2px solid #e00303",
	});	
})	
/*$(".contentCont").on("mouseup",".ccfoot2",function(){
//	$(this).css("background","white");
	console.log(2)
})*/
/*按下效果*/
$(".returnToList p").mousedown(function(){		
	$(this).css({
		color:"white",
		border:"#2580e6",
		background:"#2580e6",
	})
})
/*hover效果*/
$(".contentCont").on("mouseenter mouseout",".ccfoot2",function(event){	
	if(event.type=="mouseenter"){
		console.log("调试用查看guid是"+$(this).closest(".alist").find(".Aguid").text());
		$(this).css({
			background: "red",
    		color:"white",
    		"border":"2px solid #f83232",
		})	
	}else if(event.type=="mouseout"){
		$(this).css({
			background: "white",
    		color:"#f83232",
    		"border":"2px solid #f83232",
		})	
	}
})



//保存初始的dom,用于生成。
var initialDom=$(".alist").get(0).outerHTML;
//清空
$(".contentCont").empty();	//若查看静态页面，请注释掉	
//ajax已经参与活动,因为ui图上没有地区区别，所以不需要考虑地区
function ajaxAlready(a){
	console.log("ajax开始ajaxAlready");
	$.ajax({
		type:"get",
//		url:"http://localhost:3000/a",
//		url:'http://192.168.10.61:40007/webapi/ipaloma/topic/jingxiaobao/'+'5ce1d14e07534139ae7774d8983f04f3'
		url:"/webapi/ipaloma/topic/jingxiaobao/"+a,	
		data:{
			"matchtype":"matched"//等unmatched有数据的时候，unmatched
		},
		async:true,
		beforeSend:function(){
			loadingStart();
			$(".marginShade").hide();
		},			
		success:function(data){
			linshi1=data;
			sucessFn($(".Aalready"),data);
			$(".Aalready .initialHi").removeClass("initialHi");
		},
		error:function(data){
			console.log(data,"请求失败");
//				layer.alert('通讯异常:错误'+data.status+"无法获取已参与活动，请稍后重试", {icon: 5});	
			console.log('通讯异常:错误'+data.status+"无法获取已参与活动，请稍后重试");
			popupsFn(function(){
				ajaxAlready(DistributorIDRefresh);   					
			})
		},
		complete:function(data){
			linshi3=data
			ajaxBol1=true;	
			if(ajaxBol1&&ajaxBol2){
				loadintEnd();
				$(".Awrap").removeClass("initialHi");				
			}
			$("body").css({"width":$(window).width(),overflowX:"hidden"});
		}
	});	
}		
//ajax未参与活动
function ajaxNo(a){
	console.log("ajax开始ajaxNo")
	$.ajax({
		type:"get",
//			url:"http://localhost:3000/a",
		url:"/webapi/ipaloma/topic/jingxiaobao/"+a,	
		data:{
			"matchtype":"unmatched"//等unmatched有数据的时候，unmatched
		},
		async:true,
		beforeSend:function(){
			loadingStart();
			$(".marginShade").hide();
		},
		success:function(data){
			linshi2=data;
			sucessFn($(".Ano"),data);
			$(".Ano .initialHi").removeClass("initialHi");
		},
		error:function(data){
			console.log(data,"请求失败");
//				layer.alert('通讯异常:错误'+data.status+"无法获取未参与活动，请稍后重试", {icon: 5});		
			console.log('通讯异常:错误'+data.status+"无法获取未参与活动，请稍后重试");
			popupsFn(function(){					
				ajaxNo(DistributorIDRefresh);  
			})
		},
		complete:function(data){
			linshi4=data;
			ajaxBol2=true;	
			if(ajaxBol1&&ajaxBol2){
				loadintEnd();
				$(".Awrap").removeClass("initialHi");				
			}
			$("body").css({"width":$(window).width(),overflowX:"hidden"});
		}
	});	
}	

/*	//	地区点击//暂时不需要展开收起的效果，所以注释掉
$(document).on("click",".contentDq",function(){
	$(this).next().toggle();
})*/

function sucessFn(obj,info){
	/*调试用代码*/
//	info.content=[];//用于调试让参与未参与活动都无数据
//	if(obj.hasClass("Aalready")){//用于让参与活动无数据，而未参与活动有数据
//		info.content=[];
//	}
	if(obj.hasClass("Ano")){
		console.log(info,'sucessFn-Ano');
	}else if(obj.hasClass("Aalready")){
		console.log(info,'sucessFn-Aalready');
	}
	
//		console.log(info)
	if(info==""||info.length==0){
//			layer.alert("数据为空，请重试", {icon: 5});			
		console.log("数据为空，请重试");
		if(obj.hasClass("Aalready")){
			popupsFn(function(){					
				ajaxAlready(DistributorIDRefresh);  
			})
		}else if(obj.hasClass("Ano")){
			popupsFn(function(){					
				ajaxNo(DistributorIDRefresh);  
			})
		}
		return;
	}
	if(info.error){
//			layer.alert(info.error, {icon: 5});	
		console.log(info.error);
		if(obj.hasClass("Aalready")){
			popupsFn(function(){					
				ajaxAlready(DistributorIDRefresh);  
			})
		}else if(obj.hasClass("Ano")){
			popupsFn(function(){					
				ajaxNo(DistributorIDRefresh);  
			})
		}
		return;
	}
/*	if(info.content.length&&obj.hasClass("Aalready")){//0208注释掉
//			layer.alert("已匹配列表为空", {icon: 5});
		console.log("已匹配列表为空");
		popupsFn(function(){					
			ajaxAlready(DistributorIDRefresh);  
		})
	}else if(info.content.length==0&&obj.hasClass("Ano")){
//			layer.alert("未匹配列表为空", {icon: 5});
		console.log("未匹配列表为空");
		popupsFn(function(){					
			ajaxNo(DistributorIDRefresh);  
		})
	}*/

	/*ajax传来数据为空的时候显示$(".contentNull")*/
	if(info.content.length==0&&obj.hasClass("Aalready")){
		console.log("已匹配列表为空");
		$(".Aalready .contentNull").removeClass("hi");
		$(".yeNoL1").text("已参与的活动（"+info.content.length+"）");//活动条数显示位置1
		return;
	}
	if(info.content.length==0&&obj.hasClass("Ano")){
		console.log("未匹配列表为空");
		$(".Ano .contentNull").removeClass("hi");
		$(".Ano .contentNull p").addClass("hi");
		$(".Aalready .contentNull p").addClass("hi");
		$(".yeNoL2").text("未参与的活动（"+info.content.length+"）");//活动条数显示位置1
		return;
	}
	
	var src=["img/a4.png","img/a3.png"];
	var endtimeArr=[];
	obj.find(".contentCont").empty();
	if(obj.hasClass("Ano")){//目前只有未参与的有本地区其他地区
		$(".Ano .contentCont").append(''
			+'<div class="thisDistrict">'
			+	'<div class="contentDq"><img src="img/a7.png" alt="" /><span>本地区</span></div>'
			+   '<div class="thisDistrictContent"></div>'
			+'</div>'
			+'<div class="elseDistrict">'
			+	'<div class="contentDq"><img src="img/a7.png" alt="" /><span>其他地区</span></div>'
			+   '<div class="elseDistrictContent"></div>'
			+'</div>'
		);
	}
	for(i=0;i<info.content.length;i++){	
//			console.log(info.content[i]);
/*			if(obj.hasClass("Ano")&&info.content[i].condition.area_matched=="1"){
				$(".Ano .thisDistrict").append(initialDom);
			}else if(obj.hasClass("Ano")&&info.content[i].condition.area_matched=="0"){
				$(".Ano .elseDistrict").append(initialDom);
			}else if(obj.hasClass("Aalready")){
				obj.find(".contentCont").append(initialDom);
			}*/			
		obj.find(".contentCont").append(initialDom);
		/*guid*/
		obj.find(".con:last").append('<i style="display:none" class="Aguid">'+info.content[i].guid+'</i>');//id名可能变化为topid、**id		
		/*已参与数量开始*/
		if(info.content[i].participate_count!=undefined){
			obj.find(".cCHeadSp2:last").removeClass("hi").text("已参与分销商数："+info.content[i].participate_count);				
		}
		/*budget*/
		if(info.content[i].budget==undefined){
			info.content[i].budget={};
		}
		if(info.content[i].budget.subsidytotal==undefined){
			info.content[i].budget.subsidytotal=0;
		}
		if(info.content[i].budget.obtained==undefined){
			info.content[i].budget.obtained=0;
		}		
		var budgetSubsidytotal=moneyTransform(info.content[i].budget.subsidytotal);//万，元，单位处理
		if(info.content[i].poster_url!=undefined&&info.content[i].poster_url!=" "&&info.content[i].poster_url!=""){				
			obj.find(".conImg:last").find("img").eq(0).attr("src",info.content[i].poster_url);			
		}
		obj.find(".conImg:last").find("span").eq(0).text(budgetSubsidytotal);
		var hanzi="";//已参与与未参与的补贴提示不一样
		if(obj.hasClass("Aalready")){
			hanzi="您已获得";
		}else{
			hanzi="已发放";
		}					
		var budgetSubsidyreleased=moneyTransform(info.content[i].budget.obtained);//万，元，单位处理
		obj.find(".conImg:last").find("span").eq(1).text(hanzi+budgetSubsidyreleased);
		if(info.content[i].post==" "){
			info.content[i].post="暂无标题"
		}
		obj.find(".cCHead:last").find(".cCHeadSp1").text(info.content[i].post);
		if(info.content[i].activitytitle==""||info.content[i].activitytitle==" "){
			info.content[i].activitytitle=info.content[i].post;
		}
		obj.find(".ccBt:last").text(info.content[i].activitytitle);
		obj.find(".ccCo:last").text(info.content[i].content);
//		obj.find(".ccTi:last").find(".ccTis1").text(info.content[i].earliestjointime.substr(0,16)+"-"+info.content[i].latestjointime.substr(0,16));
		obj.find(".ccTi:last").find(".ccTis1").text(timeSymbol(info.content[i].earliestjointime.substr(0,16),"-",".")+"-"+timeSymbol(info.content[i].latestjointime.substr(0,16),"-","."));//0122将begintime换成earliestjointime，endtime换成latestjointime，
		obj.find(".ccTi:last").find(".ccTis2").eq(0).prev("img").attr("src",src[info.content[i].condition.area_matched]);
		obj.find(".ccTi:last").find(".ccTis2").eq(2).prev("img").attr("src",src[info.content[i].condition.activity_matched]);//超惠activity_matched
		obj.find(".ccTi:last").find(".ccTis2").eq(3).prev("img").attr("src",src[info.content[i].condition.condition_matched]);//资格
		endtimeArr.push(info.content[i].latestjointime);
		//多行溢出隐藏//因为只需要支持谷歌浏览器，所以换成css来实现多行溢出
//			zhanShou(obj.find('.ccCo:last'));		
		//封装区别,不需要判断，建议封装
		/*无法参与图*/
		if(obj.hasClass("Aalready")){			
			$(".Aalready").find(".ccNo:last").addClass("hi");
			$(".Aalready").find(".ccfoot2:last").text("活动详情");			
		}else if(obj.hasClass("Ano")){			
			//处理是否能参与活动
			if(info.content[i].cannotaccess=="0"){
				$(".Ano").find(".ccNo:last").addClass("hi");
				$(".Ano").find(".cCHeadP:last").removeClass("hi")//仅剩多少席
				$(".Ano").find(".cCHeadP:last .cCHeadPs2").text(info.content[i].left_count)//仅剩多少席
//					$(".Ano").find(".ccfoot2:last").text("马上参与");
			}else{//超惠不符合-活动详情，地区不符合-随便看看，参与会员资格不符合-查看原因。
//					debugger;
				$(".Ano").find(".ccNo:last").removeClass("hi");
			}
			$(".Ano").find(".ccfoot2:last").text("活动详情");
			if(info.content[i].condition.area_matched==0){//优先级从高到底，随便看看，查看原因，活动详情
				$(".Ano").find(".ccfoot2:last").text("随便看看");
			}else if(info.content[i].condition.condition_matched==0){
				$(".Ano").find(".ccfoot2:last").text("查看原因");
			}else if(info.content[i].condition.activity_matched==0){
				$(".Ano").find(".ccfoot2:last").text("活动详情");
			}
//				$(".Ano").find(".ccfoot2:last").text("活动详情");//去掉马上参与显示，一律为活动详情
//				//处理本地区其他地区
			if(info.content[i].condition.area_matched=="1"){//本地区显示，不要用district了，哲哥会删掉的。
//					$(".Ano").find(".alist:last").removeClass("hi");//之前那种方案
				$(".Ano").find(".alist:last").addClass("thisDistrictList");
			}else{
				$(".Ano").find(".alist:last").addClass("elseDistrictList");
//					$(".Ano").find(".alist:last").addClass("hi");//之前那种方案
			}
		}	
		countDownCirculation(obj.find(".alist:last").find(".ccfoot1 span"),info.content[i].endtime,function(){
			return 'if(days<3){obj.css({"background":"#f9d1d1",color:"#e83734",})}'
//			if(days<3){
//				obj.css({
//					background:"#f9d1d1",
//					color:"#e83734",
//				})
//			}
		})
	}//for结束
	
	/*如果从超慧券列表进入，在根据经销商id显示列表之后，还要根据活动id进行筛选*/
	if(activity_idsArr.length>0){   	
   		UrlTopicActivityIDRefresh();
	}
	
	//处理本地区其他地区
	$(".Ano .alist").each(function(){
		if($(this).hasClass("elseDistrictList")){				
			$('.elseDistrictContent').append($(this));
			//$(this).remove();//而无需此
		}else{
			$('.thisDistrictContent').append($(this));
			//$(this).remove();//而无需此
		}			
	})
	if(obj.hasClass("Ano")){	
		//本地区或其他地区哪个没有隐藏哪个，都没有则根据ui图提示暂无活动
		if($(".elseDistrictList").length==0){
			$(".elseDistrict").hide();
		}
		if($(".thisDistrictList").length==0){
			$(".thisDistrict").hide();
		}
		if($(".elseDistrictList").length==0&&$(".thisDistrictList").length==0){
//				layer.alert('UI图稍后奉上', {icon: 5});
			console.log('UI图稍后奉上');
		}					
	}

	/*djs();
	function djs(){//倒计时递归
		countDown(obj,endtimeArr);	
		setTimeout(djs,500);
	}*/
/*	if(obj.hasClass("Ano")){//有空去除，因为溢出省略方式变化。
		//处理溢出省略
		$(".Ano").addClass("hi");		
	}*/
	/*活动条数*///0209
	if(obj.hasClass("Aalready")){//活动条数位置2，位置1见上面
		$(".yeNoL1").text("已参与的活动（"+info.content.length+"）")		
	}else if(obj.hasClass("Ano")){
		$(".yeNoL2").text("未参与的活动（"+info.content.length+"）")
	}		
	if(info.content.length>999&&info.content.length<=9999){
		$(".yeNo li").width("168px");
	}else if(info.content.length>9999&&info.content.length<=99999){
		$(".yeNo li").width("178px");
	}
}

/*活动条数*/
function listNumFn(){
	
}
returnToList();
//返回超慧券列表
function returnToList(){
	if(UrlKeyValueData.switchfrom=="ticketlist"){
		$(".returnToList").removeClass("hi")
	}else{
		$(".returnToList").addClass("hi")
	}
	$(".returnToList .p1").click(function(){
		engine.call('ClosePage',"");
		console.log("返回主题活动列表触发")
	})
	$(".returnToList .p2").click(function(){
		engine.call('ClosePage',"");
		console.log("返回超惠券列表触发")
	})
	$("header").click(function(){			
		engine.call('ClosePage',"");
	})
	/*hover效果*/
	$(".returnToList p").hover(function(){
		$(this).css({
			color:"white",
    		border:"white",
    		background:"#4e9fee",
		})
	},function(){
		$(this).css({
			color:" #4e9fee",
    		border:"1px solid #4e9fee",
    		background:"white",
		})
	})
}

//展开收起函数封装
/*function zhanShou(obj){
	var objGet0=obj.get(0);	
	$clamp(objGet0,{clamp:2,useNativeClamp:false,truncationChar:'...',truncationHTML:""});
}*/

//下面djs2()随时删除，仅仅用来测试
//djs2();
//function djs2(){
//	var nnnnn=new Date();
//	console.log(ajaxBol1,ajaxBol2,nnnnn);
//	setTimeout(djs2,500);
//}


//判断是否接收到经销商id，活动id	
/*isReceivedID();
var isReceivedIDNum=0;
var isReceivedIDTime='';
function isReceivedID(){
	isReceivedIDNum++;
	isReceivedIDTime=setTimeout(isReceivedID,500);
	console.log(isReceivedIDNum);
	if(isReceivedIDNum>=10){
		if(isReceivedDistributorID==false){
	//		layer.alert('缺少经销商id，请重试', {icon: 5});
			console.log('缺少经销商id');			
		}
		if(isReceivedTopicActivityID==false){
	//		layer.alert('缺少活动id，请重试', {icon: 5});
			console.log('缺少活动id');			
		}
		clearTimeout(isReceivedIDTime);
	}
}*/





/*popupsFn(function(){
	console.log("我是是");	
},function(){
	console.log("qfd")
});
*/
/*调试用，查看是否接受到经销商id*/
/*ldslgh();
function ldslgh(){
	setTimeout(function(){
		console.log(OnDistributorIDRefreshParameter0);
		ldslgh()
	},500)		
}
*/
/*查看其它活动*/
//0208添加
$(".contentNull div p").click(function(){
	$(".yeNo li:eq(1)").click();
})
/*刷新按钮*/
$(".refresh").click(function(){
	history.go(0);
})
/*后退记忆，详情退回列表*/
/*function savePage(){  //操作浏览器的历史记录
	history.replaceState('', document.title, location.href.replace(location.hash, "") + "#nowTop=" + $(window).scrollTop()+"nowTop=");
}

if(location.hash!=""){
	var nowTop=Number(location.hash.split("nowTop=")[1]);
}else{
	var nowTop=0;
}
scrollTo(0, nowTop);*/

