//20170123
acZige4Tab();

function acZige4Tab() { //封装关联切换		
	$(".acZige4").find(".option").click(function() {
		var index = $(this).parents(".acZige4").find(".select-wrap").find(".option").index($(this));
		$(this).parents(".addSub3").find(".acZige4tab").addClass("hi");
		$(this).parents(".addSub3").find(".acZige4tab").eq(index).removeClass("hi");
	})
}
//控件1的添加删除
acAdA();

function acAdA() {
	$("body").on("click", ".addSub1 .acAd1", function(e) {
		// $(".addSub1 .acAd1").click(function(){			
		if ($(".addSub1").length <= 1) {
			alert("至少需要一个"); //等待修改该模块
		} else {
			$(this).parents(".addSub1").remove();
			if ($(".addSub1").length <= 1) {
				// $(".addSub1 .acAd2").removeClass("hi");
				$(".addSub1 .acAd1").css({
					"visibility": "hidden",
					"cursor": "auto"
				});
			}
		}
		$(".addSub1").last().find(".acAd2").removeClass("hi"); //让最后一个控件显示加号			
	});
	$("body").on("click", ".addSub1 .acAd2", function(e) {
		// $(".addSub1 .acAd2").click(function(){
		// debugger
		// alert(1)
		$(".addSub1 .acAd1").css({
			"visibility": "visible",
			"cursor": "pointer"
		});
		var parent = $(this).parents(".addSub1");
		$(".chenlong01").append(parent.get(0).outerHTML);
		// parent.find('p').rempve()
		$(this).addClass("hi");
//		$(".addSub1:last .acAd1").css({//0113添加
//			"visibility": "hidden",
//			"cursor": "default"
//		});
		// $(".addSub1").not(":first").find(".deleP").remove();//解决p标签bug

		//$('.addSub1').last().find('.selected,.selectWrap1,.selectWrap2').text('');
		//$('.addSub1').last().find('input').val('');
		//$('.addSub1').last().find('.selected,.selectWrap1,.selectWrap2').text().css({"visibility":"hidden"});
		//$('.addSub1').last().find('input').css({"visibility":"hidden"});

		// $('.addSub1').last().find('.selectWrap1').first().remove('hi').addClass('-hi');			
		// $('.addSub1').last().find('.selectWrap1').not(':first').addClass('hi').removeClass('-hi');
		// debugger;
		$(".addSub1").last().find(".selected").text('');
		$(".addSub1").last().find(".selectWrap1").first().removeClass('hi').addClass('-hi');
		$(".addSub1").last().find(".selectWrap1").not(':first').addClass('hi');
		$(".addSub1").last().find(".selectWrap2").first().removeClass('hi').addClass('-hi');
		$(".addSub1").last().find(".selectWrap2").not(':first').addClass('hi');
		$(".addSub1").last().find("input").val('');
		$(".addSub1").last().find(".acCoSc .selectWrap1:eq(0)").text('');//0113添加
		
	});
}


acAdB();
function acAdB() {
	$("body").on("click", ".addSub2 .acAd1", function(e) {
		// debugger
		if(!$(this).closest(".addSub2").find('.red').hasClass('vihi')){
			layer.msg('主办方');
			return;
		}

		if ($(".addSub2").length <= 1) {
			alert("至少需要一个1111"); //等待修改该模块
		} else {
			$(this).closest(".addSub2").remove();
			if ($(".addSub2").length <= 1) {
				$(".addSub2 .acAd1").css({"visibility": "hidden"});
			}
		}
		$(".addSub2").last().find(".acAd2").removeClass("hi"); //让最后一个控件显示加号			
	});

	$("body").on("click", ".addSub2 .acAd2", function(e) {
		// debugger

		$(".addSub2 .acAd1").css({"visibility": "visible"});
		$(".chenlong02").append(addsub2HTML);

		$(this).addClass("hi");
		if ($(".addSub2:last").find(".addSub3").length > 1) {
			$(".addSub2:last").find(".addSub3").not(":first").remove();
			$('.acAd4:last').removeClass('hi');
		}

		// $('.red').last().css({"visibility": "hidden"});
		// $('.red').last().addClass('vihi');
		$('.red').not(':first').addClass("vihi");
		$(".addSub2").last().find(".acAd2").removeClass("hi");
		
	});

	$(".addSub3:last .acAd3").css({"visibility": "hidden"});
}




acAdC();
var jkjk = "";
function acAdC() {
	$("body").on("click", ".acZige .acAd3", function(e) {
		if ($(this).closest(".acZige").find(".addSub3").length <= 1) {
			alert("至少需要一个"); //等待修改该模块

		} else {
			if ($(this).closest(".addSub3").next().hasClass("yyy")) {
				$(this).closest(".acZige").find(".addSub3:last").prev().find(".acAd4").removeClass("hi");
			}
			jkjk = $(this).closest(".addSub2")
			$(this).closest(".addSub3").remove();
			if (jkjk.find(".addSub3").length <= 1) {
				jkjk.find(".addSub3").find(".acAd3").css({
					"visibility": "hidden",
					"cursor": "auto"
				});
			}
		}
		linshiAddJs = $(this).parents(".acZige");
	});

	$("body").on("click", ".acZige .acAd4", function(e) {//0118修改+

		e.stopPropagation();

		$(this).closest(".acZige").append(addsub3HTML);
		$(this).closest(".addSub2").find('.member-type .option').each(function(){//根据按钮向上找到控件2，然后以此向下找到控件2中的option
			// 下面代码和createActivity1中完全一致
			// debugger;
			if($(this).closest(".addSub2").find(".acSe4 em").text()==$(this).text()){
				var arr=$(this).attr("conditiontype").split(',');
				var li =$(this).closest('.addSub2').find('.acZige1 .option');
				$(li).each(function(){
					// console.log($(this).text());	
					$(this).hide();
					for(i=0;i<arr.length;i++){
						if($(this).text()==arr[i]){
							$(this).show();
						}
					}
				});
			}
		});
		$(this).closest(".acZige").find(".acAd3").css({
			"visibility": "visible",
			"cursor": "pointer"
		});

		$(this).closest(".acZige").append('<div class="yyy singleselection"><span class="radio" name="1">以上条件满足其一</span><span class="radio on" name="0">以上条件需全部满足</span></div>');

		$(this).closest(".acZige").find(".yyy").not(':last').remove();
		$(this).addClass("hi");
		$(this).closest('.acZige').addClass('on');

	});

}



//设置参与资格显示隐藏
$("body").on("click", ".acMeD2", function(e) {

	e.stopPropagation();

	// $(this).parents(".addSub2").find(".acZige").toggleClass("hi");
	$(this).closest('.addSub2').find('.acZige').toggle();
	
});




// 控件4的添加删除
// acAdD();

// function acAdD() {
	$("body").on("click", ".addSub4 .acAd1", function(e) {
		// $(".addSub4 .acAd1").click(function(){
		if ($(".addSub4").length <= 1) {
			layer.msg("至少需要一个");

		} else {
			$(this).parents(".addSub4").remove();
			if ($(".addSub4").length <= 1) {
				$(".addSub4 .acAd2").removeClass("hi");
				$(".addSub4 .acAd1").css({
					"visibility": "hidden",
					"cursor": "auto"
				});
			}
		}
		$(".addSub4").last().find(".acAd2").css({
			"visibility": "visible",
			"cursor": "pointer"
		}); //新修改

		butiefz();
		$('.butieSec .sbys').keyup();


	})

	$("body").on("click", ".section3 .addSub4 .acAd2", function(e) {
		// $(".section3 .addSub4 .acAd2").click(function(){
		// alert(1)
		// debugger;
		if($(this).closest('.addSub4').find('.setgailv').hasClass('on')){
			if($(this).closest('.addSub4').find('.setgailv.on input').length == 0){
				layer.tips('请先设置概率',$(this).closest('.addSub4').find('.setgailv.on'));
				return
			}
		}
		
		if($(this).closest('.addSub4').find('.hdc4dB').text() == '次'){
			$("nav span").eq(2).click();
			layer.tips('请先设置摇一摇', $(this).closest('.addSub4').find('.hdc4d2'));
			finished = false;
			return
		}

		$(".addSub4 .acAd1").css({
			"visibility": "visible",
			"cursor": "pointer"
		});
		$(".chenlong04").append(addsub4HTML);
		// $(this).addClass("hi");
		$(this).css({
			"visibility": "hidden"
		});
		// $(".addSub4").not(":first").find(".deleP").remove();//解决p标签bug,

		// $(".addSub4").not(":first").find(".deleP").css({"height":0,"fontSize":0})
		$(".addSub4").not(":first").find(".deleP").css({
			"visibility": "hidden",
			"height": 0
		});
		$('.addSub4').last().find('.selected').text('');
		$('.addSub4').last().find('input').val('');
		$('.addSub4').last().find('input[type=hidden]').remove();
		//新建默认用空白的摇一摇+
		$(".addSub4").last().find('.acSe12').find("div").addClass("hi");
		$(".addSub4").last().find('.acSe12').find("div.hdc4d2").removeClass("hi");
		$(".addSub4").last().find('.acSe12').find("div.hdc4d2").find("a").text("");
		//新建默认用空白的摇一摇-
		// hdc4d1
		// $('.addSub4').last().find('.hdc4d1 input').removeAttr('style');
	})
// }

// acAdE();

// function acAdE() {
	$("body").on("click", ".addSub5 .acAd1", function(e) {
		// $(".addSub5 .acAd1").click(function(){				
		if ($(".addSub5").length <= 1) {
			alert("至少需要一个"); //等待修改该模块
		} else {
			$(this).parents(".addSub5").remove();
			if ($(".addSub5").length <= 1) {
				//					$(".addSub5 .acAd2").removeClass("hi");
				$(".addSub5 .acAd1").css({
					"visibility": "hidden",
					"cursor": "auto"
				});
			}
		}
		$(".addSub5").last().find(".acAd2").removeClass("hi"); //让最后一个控件显示加号

		yaoyiyaofengzhi();


	})
	$("body").on("click", ".addSub5 .acAd2", function(e) {
		// $(".addSub5 .acAd2").click(function(){
		$(".addSub5 .acAd1").css({
			"visibility": "visible",
			"cursor": "pointer"
		});
		$(".yaoWrap").append(addsub5HTML);
		$(this).addClass("hi");
		// $(".addSub5").not(":first").find(".deleP").remove();//解决p标签bug
		$(".addSub5").last().find('.selected').text('');
		$(".addSub5").last().find('input').val('');

	});
// }
//控件6轮盘抽奖的添加删除
// acAdF();

// function acAdF() {

	$("body").on("click", ".addSub6 .acAd1", function(e) {
		// $(".addSub6 .acAd1").click(function(){				
		if ($(".addSub6").length <= 1) {
			alert("至少需要一个"); //等待修改该模块
		} else {
			$(this).parents(".addSub6").remove();
			if ($(".addSub6").length <= 1) {
				//					$(".addSub6 .acAd2").removeClass("hi");
				$(".addSub6 .acAd1").css({
					"visibility": "hidden",
					"cursor": "auto"
				});
			}
		}
		$(".addSub6").last().find(".acAd2").removeClass("hi"); //让最后一个控件显示加号
	})
	$("body").on("click", ".addSub6 .acAd2", function(e) {
		// $(".addSub6 .acAd2").click(function(){
		$(".addSub6 .acAd1").css({
			"visibility": "visible",
			"cursor": "pointer"
		});
		$(".用于存放控件6轮盘抽奖").append($(this).parents(".addSub6").get(0).outerHTML);
		$(this).addClass("hi");
		$(".addSub6").not(":first").find(".deleP").remove(); //解决p标签bug

		$(".addSub5").last().find('.selected').text('');
		$(".addSub5").last().find('input').val('');

	})
// }

if(window.location.href.indexOf("CreateActivity")!=-1){
	addAjax();
}
function addAjax(){
	$.ajax({
		type: "get",
		url: "/webapi/ipaloma/topic/config",
		async: true,
		success: function(data) {
	
			// console.log("success");
			//控件1会员活动条件
			//控件1活动类型
			var dca_1 = data.conditionsetting.activitytype;
			$(".addSub1.created_l .acSe1 .select").empty();
			for (i = 0; i < dca_1.length; i++) {
				$(".addSub1 .acSe1 .select").append('<li class="option">' + dca_1[i].localtype + '</li>')
			}
			//控件1优惠力度条件的第一部分
			$(".addSub1.created_l .acCoSc").empty();
			$(".addSub1.created_l .acCoSc").append('<p class="bor selectWrap1"></p>');
			for (i = 0; i < dca_1.length; i++) {
				$(".addSub1 .acCoSc").append('<p class="bor hi selectWrap1">' + dca_1[i].conditionname + '</p>')
			}
			//控件1优惠力度条件的第三部分
			$(".addSub1.created_l .acCoRa").empty();
			$(".addSub1.created_l .acCoRa").append('<div class="bor selectWrap2"><span class="diSpan"></span></div>');
			var hm = "";
			for (i = 0; i < dca_1.length; i++) {
				if (dca_1[i].localtype == "买赠") {
					hm += '<div class="bor hi selectWrap2"><span class="diSpan"><label for="acLabel1" class="acCoRaMzla">买</label></span><input id="acLabel1" class="acCoRaMzip" type="text" value=""/><span class="diSpansa">:</span><span><label class="acCoRaMzla" for="acLabel2">赠</label></span><input id="acLabel2" class="acCoRaMzip" type="text" value=""/><input type="text" value=""><input type="text" value=""></div>';
				} else { //不考虑有礼					
					hm += '<div class="bor hi selectWrap2"><input class="bor diInput" type="text" value=""/><span class="diSpan por">%</span></div>'
				}
			}
			$(".addSub1 .acCoRa").append(hm);
	
	
		
			// $('body').append('<input type="hidden" name="" class="kj1ok">');
			
	
			//主办方
			var dcs_1 = data.conditionsetting.sponsor;
			$(".section2 .sponsor").empty();
			hm = "";
			var distributorBol = false; //判断是否有分销商
			for (i = 0; i < dcs_1.length; i++) {
				if (dcs_1[i].localtype == "分销商") { //默认分销商选中
					hm += '<span class="radio on" name="' + dcs_1[i].type + '" type="' + dcs_1[i].type + '">' + dcs_1[i].localtype + '</span>';
					distributorBol = true;
				} else {
					hm += '<span class="radio" name="' + dcs_1[i].type + '" type="' + dcs_1[i].type + '">' + dcs_1[i].localtype + '</span>';
				}
			}
			$(".section2 .sponsor").append(hm);
			if (distributorBol == false) { //若无分销商，则第一个选中
				$(".section2 .sponsor").find("span").eq(0).addClass("on")
			}
	
			//控件2参与会员
			var dsm_1 = data.conditionsetting.membership;
			//会员类型
			$(".addSub2.created_l .acSe4 .select").empty();
			for (i = 0; i < dsm_1.length; i++) {
				$(".addSub2 .acSe4 .select").append('<li class="option" name="'+dsm_1[i].type+'" type="'+dsm_1[i].type+'" restrictcount="'+dsm_1[i].restrictcount+'" conditiontype="'+dsm_1[i].conditiontype+'">'+dsm_1[i].localtype+'</li>');
			}
			//参加名额
			$(".addSub2.created_l .acMe").empty();
			hm = '';
			$(".addSub2.created_l .acMe").append('<p class="p68 deleP deleP1"></p><div class="selectWrap1 -hi"><span><input class="bor acMeI1" type="text" value="10" maxlength="5"/><span class="acMeS1"></span></span><span class="to"></span><span><input class="bor acMeI2" type="text"  value="30" maxlength="5"/><span class="acMeS2"></span></span></div>');
			for (i = 0; i < dsm_1.length; i++) {
				if (dsm_1[i].localtype == "消费者") {
					hm += '<div class="selectWrap1 hi"><input class="bor acMeI1" type="text" value="" maxlength="5"/><span class="acMeS1">人</span><span class="to"></span><input class="bor acMeI2" type="text"  value="" maxlength="5"/><span class="acMeS2">人</span></div>'
				} else {
					hm += '<div class="selectWrap1 hi"><input class="bor acMeI1" type="text" value="" maxlength="5"/><span class="acMeS1">家</span><span class="to"></span><input class="bor acMeI2" type="text"  value="" maxlength="5"/><span class="acMeS2">家</span></div>'
				}
			}
			$(".addSub2 .acMe").append(hm);
	
			//console.log(addsub2HTML)
			//控件3设置参与资格
			var dcc_1 = data.conditionsetting.conditiontype;
			$(".addSub3.created_l .acSe5 .select").empty();
			addSub3Arr = [""];
			//	console.log(addSub3Arr.length)
			for (i = 0; i < dcc_1.length; i++) {
				//条件类型
				$(".addSub3 .acSe5 .select").append('<li class="option">' + dcc_1[i].localtype + '</li>');
				//条件["次", "名", "名", "%", "天"]
				//		console.log(addSub3Arr.length)
				addSub3Arr.push(dcc_1[i].unit);
			}
			//统计范围的第二部分
			 // $(".addSub3 .acZige3").prepend('<div class="acZige3z  acZige2tab" style="width:135px;"></div>');
			addsub3HTML = $(".addSub3.created_l").get(0).outerHTML;
			addsub2HTML = $(".addSub2.created_l").get(0).outerHTML;
			if(location.href.indexOf("activityModify.html")>0){		//0123临时注释掉	
				if($(".addSub2Mange").length>0){//0123添加
				    $(".addSub2.created_l").remove();//去除页面初始的addSub2	    	
			    }				
			}
			//控件4参与活动条件
			var dss_2a = data.subsidysetting.subsidyobject;
			$(".addSub4.created_l .acSe9 .select").empty();
			//补贴对象
			for (i = 0; i < dss_2a.length; i++) {
				$(".addSub4 .acSe9 .select").append('<li class="option" refundtoclass="' + dss_2a[i].refundtoclass + '" name="' + dss_2a[i].type + '" type="' + dss_2a[i].type + '">' + dss_2a[i].localtype + '</li>');
				var attrArr = [];
				for (j = 0; j < dss_2a[i].subsidycondition.length; j++) {
					attrArr.push(dss_2a[i].subsidycondition[j])
				}
				// $(".addSub4 .acSe9 .select").find("li:last").get(0).attrArr=attrArr;
				$(".addSub4 .acSe9 .select").find("li:last").attr("attrArr", attrArr);
			}
			// debugger;
			//补贴条件
			var dss_2b = data.subsidysetting.subsidycondition;
			$(".addSub4.created_l .acSe10 .select").empty();
			for (i = 0; i < dss_2b.length; i++) {
			    $(".addSub4 .acSe10 .select").append('<li class="option">' + dss_2b[i] + '</li>')
			}
			//补贴形式、范围值、
			var dss_2c = data.subsidysetting.subsidymethod;
			$(".addSub4.created_l .acSe11 .select").empty();
			addSub4Arr = [""]
			for (i = 0; i < dss_2c.length; i++) {
				//补贴形式
				$(".addSub4 .acSe11 .select").append('<li class="option" category="' + dss_2c[i].category + '" showtype=' + dss_2c[i].showtype + '>' + dss_2c[i].localtype + '</li>');
				//范围值
				if (dss_2c[i].unit == "元") {
					dss_2c[i].unit = "元/次";
				} else if (dss_2c[i].unit == "分") {
					dss_2c[i].unit = "分/次";
				} else if (dss_2c[i].unit == "") {
					dss_2c[i].unit = "我是链接点击我，我是链接点击我";
				}
				addSub4Arr.push(dss_2c[i].unit);
			}
			addsub4HTML = $(".addSub4.created_l").get(0).outerHTML;
			if(location.href.indexOf("activityModify.html")>0){	//0123临时注释掉		
				if($(".addSub4Mange").length>0){//0123添加
				    $(".addSub4.created_l").remove();//去除页面初始的addSub4	    	
			    }					
			}
			// 控件5摇一摇
			// var .....还是用之前的dss_2c,之后应该会变
			$(".addSub5 .acSe15 .select").empty();
			//奖品类型
			$(".addSub5 .acSe15 .select").append('<li class="option">谢谢参与</li>');
			addSub5Arr.push("无");
			for (i = 0; i < dss_2c.length; i++) {
				//补贴形式
				if (dss_2c[i].showtype != "compose") { //摇一摇中拒绝嵌套摇一摇
					$(".addSub5 .acSe15 .select").append('<li class="option" name="' + dss_2c[i].type + '" type="' + dss_2c[i].type + '" category="' + dss_2c[i].category + '" showtype=' + dss_2c[i].showtype + '>' + dss_2c[i].localtype + '</li>');
					//范围值,防止日后接口变化，所以不用上面的addSub4Arr,
					if (dss_2c[i].unit == "元") {
						dss_2c[i].unit = "元/次";
						// }else if(dss_2c[i].unit=="分"){
						// dss_2c[i].unit="分/次";
					} else if (dss_2c[i].unit == "") {
						dss_2c[i].unit = "我是链接点击我，我是链接点击我";
					} else if (dss_2c[i].unit == undefined) { //处理谢谢参与
						dss_2c[i].unit = "";
					}
					addSub5Arr.push(dss_2c[i].unit);
				}
			}
			addsub5HTML = $(".addSub5").get(0).outerHTML;
		},
		error: function() {
			console.warn("控件 error");
		},
		complete:function(){

			if(location.href.indexOf("activityModify.html") > 0){

				// console.log("subsidyConditionArr"+subsidyConditionArr);
				$(".acSe9").each(function(num){
					var emText=$(this).find("em").text();
					var nameValue="";
					$(this).find(".option").each(function(){
						if($(this).text()==emText){
							nameValue=$(this).attr("name");
						}
					})
					$(this).click();
					$(this).find('.option').last().click();
					$(this).click();
					$(this).find('.option').first().click();

					$(this).click();
					$(this).find(".option[name='"+nameValue+"']").last().click();
					$(this).closest(".hdc1").next().find("em").text(subsidyConditionArr[num]);
					$(this).closest(".hdc1").next().find(".subsidyCondition a").text(subsidyConditionArr[num]);//0228
					$(this).closest(".hdc1").next().find(".subsidyCondition a").attr("statistic",JSON.stringify(statisticArr[num]));//0228
				})

			} else {
				$('.select-wrap.member-type li:contains(分销商)').click()
			}

		}
	});
	
}

