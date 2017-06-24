//20170221
//loadingStart();
//测试网址：http://membership.ipaloma.com/jxb/TopicActivitySubsidiary.html?distributor_id=5ce1d14e07534139ae7774d8983f04f3&switchfrom=ticketdetail&type=creat

var linshi='';
var linshi2="";
var linshiInfo="";
var allActivity='';//储存ajax收到的所有的活动
var topicactivity_id='';//存储的当前显示主题活动的id
var CbdDimgArr=["img/c7.png","img/c8.png"];//笑脸图标数组
var CimgArr2=["img/a4.png","img/a3.png"];//对勾数组

var isReceivedUpdateMatchedTopics=false;//0207,判断是否接收到经销宝数据
var UpdateMatchedTopicsBol=true;//0207,只接收一次指令

/*url截取*/
var UrlKeyValueData=getUrlKeyValue();
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
function UrlDistributorIDRefresh(){
	Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);	//如果UrlKeyValueData.activity_id为undefined也用此。已总结。
}

engine.on('UpdateMatchedTopics', UpdateMatchedTopics, this)
function UpdateMatchedTopics(){//经销宝页面传令刷新的过程，就是重新给allActivity赋值的过程。
    if(arguments.length<1){
		console.log('缺少参数');
		return;
	}	
	console.log("更新发起",JSON.parse(arguments[0]));
	isReceivedUpdateMatchedTopics=true;
	if(UpdateMatchedTopicsBol){
		allActivity=JSON.parse(arguments[0]);	
		console.log("UpdateMatchedTopics出现",allActivity);
		if(allActivity==undefined||allActivity==null||allActivity==''||allActivity==[]||allActivity.content==[]||allActivity.content==undefined||allActivity.content.length==0){
			console.log('活动列表为空，无法展示指定活动');
			return;
		}		
		ajaxSucFn(allActivity.content[0],"first");
		topicactivity_id=allActivity.content[0].guid;
		$(".CcButieRight").hide();
		$(".CcButieLeft").show();
		if(allActivity.content.length<=1){
			$(".CcButieLeft").hide();
		}
//		UpdateMatchedTopicsBol=false;//暂且注释掉，因为会给我发多次		
	}

}

function Cajax(m,a,b){
	console.log("ajax开始")
	$.ajax({
		type:"post",//0121更新为post
		dataType:'json',	
		url:"/webapi/ipaloma/topic/jingxiaobao/activity/"+m+"/",//
//		url:"/webapi/ipaloma/topic/jingxiaobao/activity/",
		data:{
		    "activityid": a == undefined ? "" : a, // 对应的活动id
		    "retailerids": b == undefined ? "" : b// 对应的门店id，以逗号分割
		},
		async:true,
		beforeSend:function(){
			loadingStart();
			$(".marginShade").hide();
		},		
		success:function(data){					
			if(data==""||data==[]){
//				layer.alert("数据为空，请重试", {icon: 5});
				popupsFn(function(){					
					Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);
				},null,"259px","138px")
				return;
			}
			if(data.content==undefined){
//				layer.alert('数据结构变化，请通知管理员', {icon: 5});
				popupsFn(function(){					
					Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);
				},null,"259px","138px")
				return;
			}
			if(data.content==[]){
				popupsFn(function(){					
					Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);
				},null,"259px","138px")
				return;
			}
			if(data.content.length==0){
//				layer.alert('数据为空', {icon: 5});
				popupsFn(function(){					
					Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);
				},null,"259px","138px")
				return;
			}
			console.log(data);
			linshi=data;//存储所有活动，所有活动都在data.content[i]
			allActivity=data;
			ajaxSucFn(data.content[0]);//先显示第一个活动，			
			topicactivity_id=data.content[0].guid;//先存储第一个活动id
			$(".CcButieRight").hide();
			if(data.content.length<=1){
				$(".CcButieLeft").hide();
			}
//			console.log(data.content.length)
			console.log(topicactivity_id);
			$(".initialHi").removeClass("initialHi");
		},
		error:function(data){
			console.log("error");
			linshi2=data;
//			layer.alert('通讯异常:错误'+data.status, {icon: 5});
			popupsFn(function(){					
				Cajax(UrlKeyValueData.distributor_id,UrlKeyValueData.activity_id);
			},null,"259px","138px")
		},
		complete:function(data){
			linshi2=data;
			loadintEnd();
		}
	});
}



function ajaxSucFn(info,switcher){//ajax成功回调里调用
//	debugger;
	linshiInfo=info;
	if(info.match!=undefined){//处理不规范的后台数据,
		info.matched=info.match;		
	}	
	$(".CbdD .CbdD1 img").attr("src",CbdDimgArr[info.matched]);//看看哲哥用的是matched还是match
//	console.log(info.matched);
	
/*	//如果是创建优惠券的时候//0306注释掉，因为不区分是不是创建状态了，所以无需type。同时提示语不再仅仅由match决定，而由match和areamatch共同决定。
	if(UrlKeyValueData.type!=undefined){		
		if(UrlKeyValueData.type=="creat"&&switcher==undefined){
			$(".CbdD2P1").text("您所在的地区正在如火");
			$(".CbdD2P2").text("如荼的进行此活动！");
			if(info.matched){
				$(".Cccondition").hide();
			}else{
				$(".Cccondition").show();
			}
		}else if(UrlKeyValueData.type=="creat"&&switcher!=undefined){
			if(info.matched){
				$(".CbdD2P1").text("您已达到活动条件");
				$(".CbdD2P2").text("马上可以赚补贴喽！");
				$(".Cccondition").hide();//1228加入
			}else{
				$(".CbdD2P1").text("您差一点点");
				$(".CbdD2P2").text("就可以赚补贴喽");
				$(".Cccondition").show();
			}			
		}else if(UrlKeyValueData.type=="modify"){
			if(info.matched){
				$(".CbdD2P1").text("您已达到活动条件");
				$(".CbdD2P2").text("马上可以赚补贴喽！");
				$(".Cccondition").hide();//1228加入
			}else{
				$(".CbdD2P1").text("您差一点点");
				$(".CbdD2P2").text("就可以赚补贴喽");
				$(".Cccondition").show();
			}				
		}else{
			console.log("url传值type属性不是creat也不是modify")
		}
		
	}else{//出新buddle后删除else//0221
		if(info.matched){
			$(".CbdD2P1").text("您已达到活动条件");
			$(".CbdD2P2").text("马上可以赚补贴喽！");
			$(".Cccondition").hide();//1228加入
		}else{
			$(".CbdD2P1").text("您差一点点");
			$(".CbdD2P2").text("就可以赚补贴喽");
			$(".Cccondition").show();
		}		
	}	*/
	if(info.matched==1){
		$(".CbdD2P1").text("您已达到活动条件");
		$(".CbdD2P2").text("马上可以赚补贴喽！");
		$(".Cccondition").hide();
	}else if(info.matched==0&&info.areamatch==0){
		$(".CbdD2P1").text("一大波补贴正在附近发放，");
		$(".CbdD2P2").text("下次就等你来赚！");
		$(".Cccondition").show();
	}else if(info.matched==0&&info.areamatch==1){
		$(".CbdD2P1").text("您所在的地区正在如火");
		$(".CbdD2P2").text("如荼的进行此活动！");
		$(".Cccondition").show();
	}
	$(".CcBigTitle").text(info.post);
	$(".CcSmallTitle").text(info.activitytitle);	
	//*******数据规范后考虑删除开始
	if(info.budget==undefined&&info.budget==null){
		info.budget={};
	}
	//*******数据规范后考虑删除结束
	if(info.budget.subsidytotal==null){info.budget.subsidytotal=0;}
	$(".CcButieMax").text(moneyTransform(info.budget.subsidytotal));
	if(info.budget.subsidyreleased==null){info.budget.subsidyreleased=0;}
	$(".CcButieAlready").text(moneyTransform(info.budget.subsidyreleased));			
	//参与活动条件具体内容
	$(".CcconditionContent").empty();	
	
	if(info.condition===undefined){//后台可能不给我condition,若数据规范该if可以删除		
		console.log("匹配成功，没有条件参数");
	}else if(info.condition===null||info.condition.length==0){//短路
		console.log("匹配失败，条件为空");
		$(".Cccondition").hide();
	}else{
		for(i=0;i<info.condition.length;i++){	
//			debugger;
			if(info.condition[i].localtype==undefined){
				info.condition[i].localtype="";
			}
			var conditionHtml='<p class="'
			+info.condition[i].localtype
			+'"><img src="'
			+CimgArr2[info.condition[i].matched]
			+'" alt="" /><i><span>'
			+info.condition[i].localtype
			+':</span><span class="Cccspan dib">'
			+info.condition[i].description
			+'</span></i></p>';
			
			$(".CcconditionContent").append(conditionHtml);
		}		
	}
	/*地区匹配*///0226加入
	if(info.areamatch!=undefined){
		$(".CcconditionContent").prepend('<p class="地区"><img src="'
			+CimgArr2[info.areamatch]
			+'" alt="" /><i><span>地区</span></i></p>');
	}
	if(info.areamatch!=undefined&&info.areamatch==0){
		$(".Cccondition").show();
	}
	//活动补贴说明具体内容
	$(".CccDescriptionCon").empty();
	var typeCounts=0
	//通用，无论是分销商，门店，店员，
	for (type in info.subsidydescription){
/*		console.log(type)
		console.log(info.subsidydescription[type]);*/
		typeCounts++;
		var text1="";
		for(m=0;m<info.subsidydescription[type].length;m++){
			var dd=info.subsidydescription[type][m];
			/*0310根据bug15577详情页和附属页顺序要匹配所以注释掉for in 改用拼固定的数据*/
//			for(i in dd){					
//				if(typeof(dd[i])!="object"){						
//					text1+=dd[i]+" ";
//				}else{
//					for (j in dd[i]){							
//						text1+=dd[i][j]+" ";
//					}
//				}	
//			}
			/*0310根据bug15577*/
			if(dd.subsidyevent!=undefined){
				text1+=dd.subsidyevent+" "
			}
			if(dd.subsidymethod!=undefined){
				text1+=dd.subsidymethod+" "
			}
			if(dd.rulerestrict!=undefined){
				text1+=dd.rulerestrict+" "
			}
			if(dd.ruledescription!=undefined){
				text1+=dd.ruledescription+" "
			}
//			text1+=dd.subsidyevent+" "+dd.subsidymethod+" "+dd.rulerestrict+" "+dd.ruledescription;
		}
		$(".CccDescriptionCon").append('<p><strong>'+typeCounts+'、'+btduixiang(type)+' : </strong><span>'+text1+'</span></p>');				
	}
/*	if(info.subsidydescription.distributor){//0217注释掉，因为不再仅仅有3种类型。
		typeCounts++;
		var text1="";
		for(m=0;m<info.subsidydescription.distributor.length;m++){
			var dd=info.subsidydescription.distributor[m];
			for(i in dd){					
				if(typeof(dd[i])!="object"){						
					text1+=dd[i]+" ";
				}else{
					for (j in dd[i]){							
						text1+=dd[i][j]+" ";
					}
				}	
			}
		}
		$(".CccDescriptionCon").append('<p><strong>'+typeCounts+'、分销商 : </strong><span>'+text1+'</span></p>');				
	}
	//门店
	if(info.subsidydescription.retailer){
		typeCounts++;
		var text1="";
		for(m=0;m<info.subsidydescription.retailer.length;m++){
			var dd=info.subsidydescription.retailer[m];
			for(i in dd){					
				if(typeof(dd[i])!="object"){						
					text1+=dd[i]+" ";
				}else{
					for (j in dd[i]){							
						text1+=dd[i][j]+" ";
					}
				}	
			}
		}
		$(".CccDescriptionCon").append('<p><strong>'+typeCounts+'、门店 : </strong><span>'+text1+'</span></p>');
	}
	//消费者
	if(info.subsidydescription.consumer){
//		debugger;
		typeCounts++;
		var text1="";
		for(m=0;m<info.subsidydescription.consumer.length;m++){
			var dd=info.subsidydescription.consumer[m];			
			for(i in dd){					
				if(typeof(dd[i])!="object"){						
					text1+=dd[i]+" ";
				}else{
					for (j in dd[i]){							
						text1+=dd[i][j]+" ";
					}
				}	
			}
		}
		$(".CccDescriptionCon").append('<p><strong>'+typeCounts+'、消费者 : </strong><span>'+text1+'</span></p>');
	}*/
}
$(".footerCkxq").click(function(){
	console.log('OnShowDetailClick',topicactivity_id);
	engine.call('OnShowDetailClick', topicactivity_id);//第一个参数不改，第二参数传当前显示主题活动id;
	
})
$(".footerCkgd").click(function(){
	console.log('ShowMoreTopicActivityClick');
	engine.call('ShowMoreTopicActivityClick', "");//第一个参数不改，第二参数传空;
})

/*按下效果，同列表页面*/
$(".footer div").mousedown(function(){		
	$(this).css({
		color:"white",
		border:"#2580e6",
		background:"#2580e6",
	})
})

/*hover效果，同列表页面*/
$(".footer div").hover(function(){
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
	
$(document)[0].oncontextmenu=function(event){
	var event=event||window.event;
	window.event.returnValue=false;
	event.preventDefault();
	console.log(8888);
	return false;
}


//测试函数
//dsj()
//function dsj(){
//	console.log(new Date(),topicactivity_id)
//	setTimeout(dsj,1000)
//}


/*//判断是否接收到经销商id，活动id	
isReceivedID();
var isReceivedIDNum=0;
var isReceivedIDTime='';
function isReceivedID(){
	isReceivedIDNum++;
	isReceivedIDTime=setTimeout(isReceivedID,500);
	console.log(isReceivedIDNum);
	if(isReceivedIDNum>=10){
//		if(isReceivedDistributorID==false){
//	//		layer.alert('缺少经销商id，请重试', {icon: 5});
//			console.log('缺少经销商id');			
//		}
//		if(isReceivedTopicActivityID==false){
//	//		layer.alert('缺少活动id，请重试', {icon: 5});
//			console.log('缺少活动id');			
//		}
		if(isReceivedUpdateMatchedTopics==false){
			console.log('缺少经销宝传来数据');	
		}
		clearTimeout(isReceivedIDTime);
	}
}*/
//alert(8)
/*调试用代码*/
//$("body").on("mouseenter",".footerCkxq",function(){
//	console.log('OnShowDetailClick',topicactivity_id);
//})

/*左右箭头*/
//0208添加
var allActivityNum=0;
$(".CcButieLeft").click(function(){	
	if(allActivityNum<allActivity.content.length-1){
		allActivityNum++;
		ajaxSucFn(allActivity.content[allActivityNum],"left");
		topicactivity_id=allActivity.content[allActivityNum].guid;
//	}else{
//		$(".CcButieLeft").hide();
	}	
	if(allActivityNum>=allActivity.content.length-1){
		$(".CcButieLeft").hide();
	}
	if(allActivityNum>0){
		$(".CcButieRight").show();
	}
	console.log(topicactivity_id,allActivityNum);
})

$(".CcButieRight").click(function(){	
	if(allActivityNum>0){
		allActivityNum--;
		ajaxSucFn(allActivity.content[allActivityNum],"right");
		topicactivity_id=allActivity.content[allActivityNum].guid;
//	}else{
//		$(".CcButieRight").hide();
	}	
	if(allActivityNum<=0){//注意不能写在上面的eles中
		$(".CcButieRight").hide();
	}
	if(allActivityNum<allActivity.content.length-1){
		$(".CcButieLeft").show();
	}
	console.log(topicactivity_id,allActivityNum);
})

