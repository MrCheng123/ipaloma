//20170207
/*滚动条返回顶端*/
//setTimeout(function(){window.scrollTo(0,0);}, 50);
/*loading*/
function loadingStart(){
	$(document.body).css({//禁用滚动条
	   "overflow-x":"hidden",
	   "overflow-y":"hidden"
	});
	$("body").prepend("<div class='loadingDiv'><img src='img/loading.gif' class='loadingImg'></div>");
//	$("body").prepend("<div class='loadingDiv'><img src='img/loading.png' class='loadingImg'></div>");
}

function loadintEnd(){
	$(document.body).css({//启用滚动条
		"overflow-x":"auto",
		"overflow-y":"auto"
	});			
	$(".loadingDiv").remove();
}

/*白板遮罩*/
/*
用的时候直接如下操作
1.复制样式，本处3个页面都在public.css中含了此样式
.marginShade{
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:white;
    z-index: 99999;
}
2.复制下面标签到body标签内，最上面。
<script type="text/javascript">
	var marginShade=document.createElement("div");			
	marginShade.className="marginShade";
	document.getElementsByTagName("body")[0].appendChild(marginShade);	
</script>
3.ajax开始前移除
beforeSend:function(){
	loadingStart();
	$(".marginShade").remove();
},
*/

/*弹窗刷新*/
var popups=''
	+	'<div class="popups">'
	+		'<p class="popups_networkError">网络异常哦，请再刷新看看<sub>~</sub></p>'
	+		'<span class="popups_refreshAgain">再次刷新</span><span class="popups_refreshOff">取消</span>'
	+	'</div>';



/*通讯异常弹窗*///0224更新，兼容附属页面小尺寸的框，并设置了宽度和height缺省的时候为原型的默认值402 170.所以，列表，详情无需改动。
function popupsFn(fn1,fn2,width,height){
	var w=width?width:'402px';
	var h=height?height:'170px';
	$(".marginShade").show();
	var popupsFnLayerIndex=layer.open({
	  type: 1,
	  title:false,
	  skin: 'layui-layer-rim', //加上边框
	  area: [w, h], //宽高
	  content: popups,
	  closeBtn: 0,
	  skin: false,
	});
	$(".popups_refreshAgain").click(function(){
		console.log("弹窗刷新");
		if(fn1){
			fn1();
			console.log("fn1动了")
		}	
		layer.close(popupsFnLayerIndex);
	})	
	$(".popups_refreshOff").click(function(){
		console.log("弹窗取消");
		if(fn2){
			fn2();
			console.log("fn2动了")
		}
		layer.close(popupsFnLayerIndex);
	})	
}
/*倒计时*/
//用于活动列表，活动详情
function countDown(obj,timeArr,fn){//第一个参数是要显示倒计时的对象，第二个参数是时间
	var presentTime=new Date();
	var endtime=new Date(timeArr);
	var cha=endtime-presentTime;
	//一天86400000毫秒，一小时3600000毫秒,一分60000毫秒
	var days=Math.floor(cha/86400000)+"";				
	if(days.length==1){
		days="00"+days;
	}else if(days.length==2){
		days="0"+days;
	}
	var hours=Math.floor(cha%86400000/3600000)+"";
	if(hours.length==1){
		hours="0"+hours;
	}
	var mins=Math.floor(cha%3600000/60000)+"";
	if(mins.length==1){
		mins="0"+mins;
	}
	var seconds=Math.floor(cha%60000/1000)+"";
	if(seconds.length==1){
		seconds="0"+seconds;
	}				
	if(seconds<0){
		days="000";
		hours=mins=seconds="00";					
	}
	obj.eq(0).text(days[0]);
	obj.eq(1).text(days[1]);
	obj.eq(2).text(days[2]);
	obj.eq(3).text(hours[0]);
	obj.eq(4).text(hours[1]);
	obj.eq(5).text(mins[0]);
	obj.eq(6).text(mins[1]);
	obj.eq(7).text(seconds[0]);
	obj.eq(8).text(seconds[1]);		
	if(fn){
		eval(fn());
	}
}

//countDownCirculation($(".BsubsidyB span"),"2017-01-22 00:00:00");//写在调用出，注意a参数是一个数据
function countDownCirculation(obj,time,fn){
	countDown(obj,time,fn);
	setTimeout(function(){
		countDownCirculation(obj,time,fn)
	},500);
}

/*地址栏传值*/
function getUrlKeyValue(){			
    var url = location.search; 
    var thisParam = {};	
    if (url.indexOf("?") != -1) {

        var str = url.substr(1);
        strs = str.split("&");

        for(var i = 0; i < strs.length; i ++) {
            thisParam[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }

    }	
    console.log("地址栏传值是"+JSON.stringify(thisParam));
    console.log("当前网址是"+window.location.href);
    return thisParam;
    
}

function btduixiang(a){
	var btduixiang = "";
	switch(a){	
		case "distributor":
		btduixiang = '分销商'
		break;		
		
		case "distributoremployee":
		btduixiang = '分销商人员'
		break;
		
		case "distributor_employee":
		btduixiang = '分销商人员'
		break;
		
		case "retailer":
		btduixiang = '门店'
		break;
		
		
		case "retaileremployee":
		btduixiang = '门店店员'
		break;
		
		case "retailer_employee":
		btduixiang = '门店店员'
		break;
		
		case "consumer":
		btduixiang = '消费者'
		break;
		
		default:
		btduixiang =a;
	}	
	return btduixiang;
}


/*满n位，变'元'为'万'*/
function moneyTransform(money,n){
	var moneyUnit="";//单位
	var newMoney="";//金额
	var arr=[];
	var point="";//是否有小数点
	var afterPoint="";
	if(money==0){
		return "0元";
	}else if(money<9999&&money>0){	
		money=money/1;
		money=money.toString();
		arr=money.split('.');
		moneyUnit="元";		
		if(arr.length>1){
			point=".";
			afterPoint=arr[1].substr(0,2);
		}
		
	}else if(money<99999999&&money>9999){
		money=money/10000;
		money=money.toString();
		arr=money.split('.');
		moneyUnit="万";		
		if(arr.length>1){
			point=".";
			afterPoint=arr[1].substr(0,2);
		}
		
	}else if(money<999999999999&&money>99999999){
		money=money/100000000;
		money=money.toString();
		arr=money.split('.');
		moneyUnit="亿";		
		if(arr.length>1){
			point=".";
			afterPoint=arr[1].substr(0,2);
		}
		
	}else{//大于9999亿的暂不做处理		
		return money;
	}
	//不带小数点，纯数字只允许有4位。	//新加
	if(arr[0].length==4){
		point="";
		afterPoint="";
	}else if(arr[0].length<4&&afterPoint.length>0){		
		point=".";
		afterPoint=afterPoint.substr(0,4-arr[0].length);
	}
	//变.00或.0为整 //新加
	if(afterPoint=="00"||afterPoint=="0"){
		point="";
		afterPoint="";
	}
	
	newMoney=arr[0]+point+afterPoint;
	return newMoney+moneyUnit;
}

/*时间格式化--符号转化*/
function timeSymbol(time,before,end){
	return time.split(before).join(end)
}

/*去除横向滚动条*/
//用于处理因为纵向滚动条占宽17px，而导致出现横向滚动条的。可能需要放在ajax的完成里。
$("body").css({"width":$(window).width(),overflowX:"hidden"});
