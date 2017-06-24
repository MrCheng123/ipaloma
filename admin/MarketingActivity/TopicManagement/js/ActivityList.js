var linshi = '';
var linshiCharge = "";
var linshiStatus = "";
var pageindex = 1;
var pagesize = 100;
var statusData = ""; //储存statusAjax()返回的数据。
var autoLoad = true;
var flag = 1;
/*模拟下拉*/
//$('body').on("click",".selectLWrapL",function(e){
$('.selectLWrapL').click(function(e) {
	e.stopPropagation();
	$(this).find('.selectL').toggle(); //用于切换ul的显示隐藏
	$(".selectLWrapL").not(this).find('.selectL').hide(); //点此关别		
	$(".qC_activityArea").not(this).find('ul').hide(); //点此关城市列表	

});
$('.selectL').on("click", ".optionL", function(e) {
	//$('.selectL .optionL').click(function(e){
	e.stopPropagation();
	$(this).parent().prev().text($(this).text()); //把li的内容放入em
	$(this).parent().prev().attr("guid-data", $(this).attr("guid"))
	$(this).parent().hide(); //点击li的时候隐藏ul
});
$(document).click(function() {
	$('.selectL').hide();
});

/*起始时间laydate控件*/
var dataStart = {
	elem: '#dataStart',
	format: 'YYYY-MM-DD',
	//min: laydate.now(), //设定最小日期为当前日期
	max: '2099-06-16', //最大日期
	istime: true,
	start: laydate.now(), //开始日期
	choose: function(datas) {
		dataEnd.min = datas; //开始日选好后，重置结束日的最小日期
		dataEnd.start = datas //将结束日的初始值设定为开始日
	}

};

var dataEnd = {
	elem: '#dataEnd',
	format: 'YYYY-MM-DD',
	//min: laydate.now(),
	max: '2099-06-16',
	istime: true,
	istoday: false,
	start: laydate.now(), //开始日期********************不方便就注释掉//不注释掉发现也么有用
	choose: function(datas) {
		dataStart.max = datas; //结束日选好后，重置开始日的最大日期
	}
};
laydate(dataStart);
laydate(dataEnd);

/*创建日期函数*/
myDate();

function myDate() {
	var d = new Date();
	var year = d.getFullYear();
	var year1 = d.getFullYear() + 1;
	var month = d.getMonth() + 1; // 当前月是要+1
	month = month < 10 ? ("0" + month) : month;
	var dt = d.getDate();
	dt = dt < 10 ? ("0" + dt) : dt;
	//                var today = year + "-" + month + "-" + dt;
	//                alert(today);
	today = year + "-" + month + "-" + dt;
	today1 = year1 + "-" + month + "-" + dt;

}

$("#dataStart").val(today);
$("#dataEnd").val(today1)

var pagingJson = {
	"pagesize": pagesize,
	"pageindex": pageindex,
	"sort": [{ "oid": "asc" }]
};

/*
 * 分页  下拉刷新
 */
$(".activityList tbody").scroll(function() {
	if($(this).scrollTop() >= ($(this).prop("scrollHeight") - 500) && $(this).prop("scrollHeight") > 500) {
		basicQuery();
		//		console.log(condition)
	}
});

/*
 * 如果文档高度不大于窗口高度，(数据少的话)，就让他自动加载下方数据(其实这块是通用的别管数据多不多)
 */
function qixiaofeiload() {
	//  if(autoLoad){
	if($(".activityList tbody").prop("scrollHeight") <= 500) {
		basicQuery();
	}
	//  }
}
// 重新获取文档（就是你要加载的那个框 比如 window）高度
//function fnRecoverContentHeight(){
//  if(me.opts.gundong == win){
//      me._scrollContentHeight = $doc.height();
//  }else{
//      me._scrollContentHeight = me.$element[0].scrollHeight;
//  }
//}

function basicQuery(resetQueryCondition) {
	/*判断是否输入了查询条件*/
	//	if( $(".qC_aitivityTopic input").val()==""&&
	//		$(".qC_number input").val()==""&&
	//		$(".qC_principal .selectLedL").text()=="请选择"&&
	//		$(".qC_activityTime input:eq(0)").val()==""&&
	//		$(".qC_activityTime input:eq(1)").val()==""&&
	//		$(".qC_subsidyReleased input:eq(0)").val()==""&&
	//		$(".qC_subsidyReleased input:eq(1)").val()==""&&
	//		$(".qC_joinVipNumber input:eq(0)").val()==""&&
	//		$(".qC_joinVipNumber input:eq(1)").val()==""&&
	////		$("#province em").text()=="省"&&
	////		$("#city em").text()=="市"&&
	////		$("#area em").text()=="区"&&
	//		$('.gf-select span em:eq(0)').text() == '省份'&&
	//		$('.gf-select span em:eq(1)').text() == '城市'&&
	//		$('.gf-select span em:eq(2)').text() == '区县'&&
	//		
	//		$(".qC_activityBudget input:eq(0)").val()==""&&
	//		$(".qC_activityBudget input:eq(1)").val()==""&&
	//		$(".qC_status .selectLedL").text()=="请选择"){
	//
	//		layer.alert('请输入查询条件', {icon: 5});
	//		return;
	//	}

	/*判断查询条件是否成对*/
	//活动时间
	if(($(".qC_activityTime input:eq(0)").val() == "" && $(".qC_activityTime input:eq(1)").val() != "") || ($(".qC_activityTime input:eq(0)").val() != "" && $(".qC_activityTime input:eq(1)").val() == "")) {
		layer.alert('查询时间，需要成对出现', { icon: 5 });
		return;
	}
	//已发放补贴金额
	if(($(".qC_subsidyReleased input:eq(0)").val() == "" && $(".qC_subsidyReleased input:eq(1)").val() != "") || ($(".qC_subsidyReleased input:eq(0)").val() != "" && $(".qC_subsidyReleased input:eq(1)").val() == "")) {
		layer.alert('已发放补贴金额，需要成对出现', { icon: 5 });
		return;
	}
	//参与会员数量
	if(($(".qC_joinVipNumber input:eq(0)").val() == "" && $(".qC_joinVipNumber input:eq(1)").val() != "") || ($(".qC_joinVipNumber input:eq(0)").val() != "" && $(".qC_joinVipNumber input:eq(1)").val() == "")) {
		layer.alert('参与会员数量，需要成对出现', { icon: 5 });
		return;
	}
	//活动预算
	//暂时不需要

	//负责人
	var charge = "";
	if($(".qC_principal .selectLedL").text() == "请选择") {
		charge = "";
	} else {
		//		charge=$(".qC_principal .selectLedL").text();
		charge = $(".qC_principal .selectLedL").attr("guid-data");
	}
	//活动时间
	var times = "";
	if($(".qC_activityTime input:eq(0)").val() == "" && $(".qC_activityTime input:eq(1)").val() == "") {
		times = "";
	} else {
		//		times='"'+$(".qC_activityTime input:eq(0)").val()+'","'+$(".qC_activityTime input:eq(1)").val()+'"';
		times = $(".qC_activityTime input:eq(0)").val() + ',' + $(".qC_activityTime input:eq(1)").val();
	}
	//已发放补贴金额
	var subsidy = "";
	if($(".qC_subsidyReleased input:eq(0)").val() == "" && $(".qC_subsidyReleased input:eq(1)").val() == "") {
		subsidy = "";
	} else {
		subsidy = $(".qC_subsidyReleased input:eq(0)").val() + ',' + $(".qC_subsidyReleased input:eq(1)").val();
	}
	//参与会员数量
	var membercount = "";
	if($(".qC_joinVipNumber input:eq(0)").val() == "" && $(".qC_joinVipNumber input:eq(1)").val() == "") {
		membercount = "";
	} else {
		membercount = $(".qC_joinVipNumber input:eq(0)").val() + ',' + $(".qC_joinVipNumber input:eq(1)").val();
	}
	//活动区域

	var areaProvince = $("#province em").text();
	var areaCity = $("#city em").text();
	var areaCountry = $("#area em").text();
	var districthash = areaProvince == "省份" ? "" : areaProvince;
	if(areaCity != "城市") {
		districthash += "," + areaCity;
		if(areaCountry != "区县") {
			districthash += "," + areaCountry;
		}
	}

	//状态
	var state = "";
	if($(".qC_status .selectLedL").text() == "请选择") {
		state = "";
	} else {
		state = $(".qC_status .selectLedL").text();
	}
	pagingJson.pageindex++;
	condition = {
		activitytitle: $(".qC_aitivityTopic input").val(),
		activitycode: $(".qC_number input").val(),
		charge: charge,
		times: times,
		subsidy: subsidy,
		membercount: membercount,
		districthash: districthash,
		state: state,
		paging: JSON.stringify(pagingJson)
	}
	if(resetQueryCondition) {
		condition.paging =
			JSON.stringify({
				"pagesize": pagesize,
				"pageindex": pageindex,
				"sort": [{ "oid": "asc" }]
			});
	}
	//	console.log(condition)
	$.each(condition, function(key, value) {
		if(value === "" || value === null) {
			delete condition[key];
		}
	});
	condition.fullQuery = "fullQuery";

	if(statusData == "") {
		layer.alert('数据加载中，请稍后重试', { icon: 1 });
		return;
	}
	/*活动列表*/
	$.ajax({
		type: "get",
		url: "/webapi/ipaloma/topic/list/query",
		async: true,
		data: condition,
		success: function(data) {
			//console.log(JSON.stringify(data, null, 4));
			// console.log(data.content.length);
			// console.log(data)
//			$(".loaded").fadeOut();
			$(".jzz").hide();
			if(data.error) {
				layer.alert("出错了^_^");
//				$(".layerAlert").html("出错了^_^").fadeIn(10).delay(1500).fadeOut(50);
				flag = 1;
			}
			console.log('load : ' + data.content.length);
			if(data.content.length < 1) {
				// layer.alert('数据已加载完', {icon: 1});
//				$(".finished").fadeIn(500).delay(1000).fadeOut(500);
				$(".jzw").fadeIn(10).delay(1500).fadeOut(50);
				flag = 1;
				return;
			} else {
				flag = 0;
			}
			linshi = data;

			var activityListThead = ''; //表格Thead
			var activityListTbody = ''; //表格Tbody
			//表格Thead
			activityListThead += '<tr>'
				// +'<th><p class="checkBox"></p></th>'
				+
				'<th>活动编号</th>' +
				'<th>活动主题</th>' +
				'<th>活动时间</th>' +
				'<th>活动区域及负责人</th>' +
				'<th>预计可参与活动的会员数量</th>' +
				'<th>已参加会员数量</th>'
				//				+='<th>申报预算</th>'//哲哥说先不要这个
				//				+='<th>审批预算/状态</th>'//哲哥说先不要这个
				//				+='<th>已发放补贴</th>'//哲哥说先不要这个
				+
				'<th>状态</th>' +
				'<th class="last">操作</th>' +
				'<th style="display:none;">guid</th>' +
				'</tr>';
			$(".activityList thead").empty();
			$(".activityList thead").append(activityListThead);
			//表格Tbody
			var contentBody = data.content;
			activityListTbody = ConstructRecord(contentBody, statusData);
			$(".activityList tbody").append(activityListTbody + '</tr>');
			/*拼接完毕，开始事件*/
			//隐藏所有按钮详情
			$(".edit .menu").hide();
			//点击按钮，显示

			$('.activityList td:not(".last")').on("mouseover", function() {
				$(this).attr("title", $(this).html())
			})

			//			$('.activityList .activityAreaAndCharge').on("click",function(){
			//				$(this).toggleClass('ac_tip');
			//			})
			pagingJson = data["paging"];
			if(autoLoad) {
				if($(".activityList tbody").prop("scrollHeight") > 500) {
					flag = 1;
					autoLoad = false;
				} else {
					//			console.log(1)
					flag = 0;
					qixiaofeiload();
				}
			};
			//			flag = 1;
		},
		beforeSend: function() {
			flag = 0;
//			$(".loaded").fadeIn();
			$(".jzw").hide();
			$(".jzz").show();
		},
		error: function(data) {
			//			console.log(data)
			linshi = data;
			if(data.status == '403') {
				sessionStorage.account = '';
				sessionStorage.status = false;
				sessionStorage.url = "/admin/login/signin.html";
				location.reload();
			} else {
				layer.alert('获取活动列表失败:错误' + data.status, { icon: 5 });
//				$(".loaded").fadeOut();
				$(".jzz").hide();
			}
			flag = 1;
		}
	});
	//	if(autoLoad){
	//		if($(".activityList tbody").prop("scrollHeight") > 500){
	//			autoLoad = false;
	//		}else{
	////			console.log(1)
	//			qixiaofeiload();
	//		}		
	//	}
}

/*查询按钮*/
var condition = {}
$(document).keydown(function(event) {
	console.log(flag)
	if(event.keyCode == 13 && flag == 1) {
		autoLoad = true;
		$(".activityList tbody").empty();
		basicQuery(true);
	}
});
$(".queryConditionButton .query").click(function() {
	console.log(flag);
	if(flag == 1) {
		autoLoad = true;
		$(".activityList tbody").empty();
		basicQuery(true);
	}

});

/*
 * 重置按钮
 */
$("#reset").click(function() {
	myDate();
	//	alert(1)
	$(".qC_aitivityTopic input").val("");
	$(".qC_number input").val('');
	$(".qC_principal .selectLedL").text("请选择");
	$(".qC_activityTime input:eq(0)").val(today);
	$(".qC_activityTime input:eq(1)").val(today1);
	$(".qC_subsidyReleased input:eq(0)").val("");
	$(".qC_subsidyReleased input:eq(1)").val("");
	$(".qC_joinVipNumber input:eq(0)").val("");
	$(".qC_joinVipNumber input:eq(1)").val("");
	//	$("#province em").val("省");
	//	$("#city em").text("市");
	//	$("#area em").text("区");
	/*
	 * 修复--重置省、市、区
	 */
	$('.gf-select span em:eq(0)').text('省份');
	$('.gf-select span em:eq(1)').text('城市');
	$('.gf-select span em:eq(2)').text('区县');

	$(".qC_activityBudget input:eq(0)").val("");
	$(".qC_activityBudget input:eq(1)").val("");
	$(".qC_status .selectLedL").text("请选择");
});

/*
 * 内容显隐
 */
$('.activityList').on("click", ".activityAreaAndCharge", function() {
	$(this).toggleClass('ac_tip');
})

function ConstructRecord(contentBody, statusData) {
	var stateHtmlArray = $.Enumerable.From(contentBody).Select(function(x) {
		var stateHtml = ConstructOpStatus(statusData, x.state);
		return '<tr guid=' + x.guid + '>'
			// +'<td><p class="checkBox"></p></td>'
			+
			'<td class="activityCode">' + x.activitycode + '</td>' +
			'<td class="activitytitle">' + x.activitytitle + '</td>' +
			'<td class="activityTime">' + x.begintime + ' -- ' + x.endtime + '</td>' +
			'<td class="activityAreaAndCharge ac_tip">' + JointDistrict(x.district) + '</td>' +
			'<td class="estimateJoinVipQuantity">' + x.membercount + '</td>' +
			'<td class="JoinedVipQuantity">' + x.alreadyinmembercount + '</td>'
			//				+='<td class="declareBudget">'+data[i].xxxxxx+'</td>'//哲哥说先不要这个
			//				+='<td><p class="approvalBudget">1</p><p class="_status">2</p>'+data[i].xxxxxx+'</td>'//哲哥说先不要这个
			//				+='<td class="provideSubsidy">'+data[i].xxxxxx+'</td>'//哲哥说先不要这个
			+
			'<td class="state">' + x.state + '</td>'
			//具体的操作内容见
			+
			'<td class="edit last"><img src="img/iconss1.png" alt="" />' + stateHtml + '</td>' +
			'<td style="display:none;">' + x.guid + '</td>' +
			'</tr>';
	}).ToArray();
	return stateHtmlArray.join("\r\n");
	flag = 1;
}

function ConstructOpStatus(statusData, state) {
	var findedState = $.Enumerable.From(statusData).Where(function(x) { return x["state"] == state }).Select(function(y) { return y["ops"] });
	var opArray = findedState.Count() > 0 ? findedState.First() : [];
	if(opArray.length == 0)
		return "";
	var statehtmlArray = $.Enumerable.From(opArray.slice(0, opArray.length - 1)).Select(function(x) {
		return '<p class="menuElement">' + "<span class='handle " + x + "'>" + x + "</span>" + "</p>";
	}).ToArray();

	var statehtml = statehtmlArray.join("") + '<p class="menuElement" style="border:0px;">' + "<span class='handle " + opArray[opArray.length - 1] + "'>" + opArray[opArray.length - 1] + "</span>" + "</p>";
	return '<div class="menu"><div class="menuArrow"></div><div class="menuContent">' + statehtml + '</div></div>';
}

// $(".activityAreaAndCharge").hover(function(){

// })

/*负责人*/
chargeAjax()

function chargeAjax() {
	$.ajax({
		type: "get",
		url: "/webapi/ipaloma/topic/charge",
		async: true,
		success: function(data) {
			//			console.log(data)
			linshiCharge = data;
			//			var chargeHtml='<li guid="" class="optionL">请选择</li>';//用于拼接
			var chargeHtml = ''; //用于拼接
			for(i = 0; i < data.content.length; i++) {
				chargeHtml += '<li guid="' + data.content[i].guid + '" class="optionL">' + data.content[i].nickname + '</li>'
			}
			$(".qC_principal .selectL").empty().append(chargeHtml);

		},
		error: function(data) {
			console.log(data)
			linshiCharge = data;
			layer.alert('获取负责人失败:错误' + data.status, { icon: 5 });
		}
	});
}
/*状态*/
statusAjax()

function statusAjax() {
	$.ajax({
		type: "get",
		url: "/webapi/ipaloma/topic/stateconfig",
		async: true,
		success: function(data) {
			//			console.log(data)
			linshiStatus = data;
			statusData = data;
			var chargeHtml = ""; //用于拼接
			for(i = 0; i < data.length; i++) {
				chargeHtml += '<li class="optionL">' + data[i].state + '</li>'
			}
			$(".qC_status .selectL").empty().append(chargeHtml);

		},
		error: function(data) {
			console.log(data)
			linshiCharge = data;
			if(data.status == '403') {
				sessionStorage.account = '';
				sessionStorage.status = false;
				sessionStorage.url = "/admin/login/signin.html"
				location.reload()
			} else {
				console.log(data.status)
				layer.alert('获取负责人失败:错误' + data.status, { icon: 5 });
			}
		}
	});
}

/*区域信息拼接*/
// districts -----> x.district
function JointDistrict(districts) {
	var queryResult = $.Enumerable.From(districts)
		.Select(function(x) {
			if(x["charge"]) {
				var chrage_y = x["charge"];
				/*
				 * 负责人显示问题
				 */
				if(chrage_y["name"]) {
					return x["name"] + "(" + chrage_y["name"] + ")";
				} else {
					return x["name"];
				}
			} else {
				return x["name"];
			}

		})
		.ToArray();
	return queryResult.join(" - ");

}

/*新增按钮*/
$(".addButton").click(function() {
	window.location.href = "CreateActivity.html";
})
/*打印按钮*/
$(".printButton").click(function() {
	layer.alert("暂不支持此功能，相关页面为完善")
})

/*表格th复选框*/
$(document).on("click", ".activityList thead .checkBox", function() {
	//$(".activityList thead .checkBox").click(function(){
	$(this).toggleClass("on");
	if($(this).hasClass("on")) {
		$(".activityList tbody .checkBox").addClass("on");
	} else {
		$(".activityList tbody .checkBox").removeClass("on");
	}

})

$(document).on("click", ".activityList tbody .checkBox", function() {
	//$(".activityList tbody .checkBox").click(function(){
	$(this).toggleClass("on");
})

$(document).on("click", ".edit", function() {
	//$(".edit").click(function(){
	$(this).find(".menu").toggle();
	$(".edit").not(this).find(".menu").hide();
	return false;
})
$(document).click(function() {
	$(".edit .menu").hide();
})

var DictFunction = {
	"详情": function(op, currenttype) {
		layer.open({
			type: 2,
			title: '详情',
			shadeClose: true,
			// shade: false,
			maxmin: true,
			area: ['90%', '90%'],
			content: 'detail.html',
			calcel: function(index) {
				layer.close(index);
				return false;
			}
		});
	},
	"修改": function(op, currenttype) { window.location.href = "activityModify.html?guid=" + $('#guid').val() },
	"'提交审核', '审核通过', '立即发布','下架', '上架','驳回'": function(op, currentstate) {
		$.ajax({
			type: "put",
			url: "/webapi/ipaloma/topic/operation/" + $('#guid').val(),
			async: true,
			data: {
				"currentstate": currentstate,
				"optype": op
			},
			success: function(data) {
				if(data.error)
					layer.alert("出错了^_^");
				layer.alert(op + " 成功");
				autoLoad = true;
				$(".activityList tbody").empty();
				basicQuery(true);
			},
			error: function(xhr, textStatus) {
				layer.alert("出错了^_^");
				console.log(textStatus);
			}

		});

	},
	"删除": function(op, currenttype) {

		layer.confirm('确定要删除？', {
			title: '删除',
			btn: ['确定', '取消']
		}, function() {
			layer.msg('正在删除，请稍等', {
				time: 2000
			});
			// 此处只是演示，并没有真正的删除数据，如果有api的话 直接传个guid，后台就给删除数据了，然后再传给getlist，走ajax刷新页面
			// parentTr.remove();
			// window.localStorage.clear();
			// layer.msg('删除成功');
			// return;
			$.ajax({
				type: "delete",
				url: "/webapi/ipaloma/topic/" + $('#guid').val(),
				async: true,
				data: null,
				success: function(data) {
					if(data.error)
						layer.alert("出错了^_^");
					layer.alert("删除成功");
					autoLoad = true;
					$(".activityList tbody").empty();
					basicQuery(true);
				},
				error: function(xhr, textStatus) {
					layer.alert("出错了^_^");
					console.log(textStatus);
				}

			});
		})
	}
};

// layer.confirm('确定要删除？', {
//         title: '删除',
//         btn: ['确定', '取消']
//     }, function() {
//         layer.msg('正在删除，请稍等', {
//             time: 2000
//         });
//         // 此处只是演示，并没有真正的删除数据，如果有api的话 直接传个guid，后台就给删除数据了，然后再传给getlist，走ajax刷新页面
//         // parentTr.remove();
//         // window.localStorage.clear();
//         // layer.msg('删除成功');
//         // return;
//         _ajax("delete", '/webapi/ipaloma/propagation/' + guid + '', null, '删除失败', function() {
//             var cur = $('.laypage_curr').text();
//             if (cur) {
//                 if ($('table.notify tbody tr').length == 1) {
//                     cur -= 1;
//                     if (cur <= 0) {
//                         cur = 1;
//                     }
//                 }
//             }
//             getList(cur, 'del', getSearch());
//         })
//     })

$('table.activityList').on('click', ".handle", function() {

	/*
	 * 状态内容置换
	 */
	//	var oVal = $(this).text();
	//	console.log(oVal)
	//	$(this).parents("td.edit").siblings("td.state").text(oVal)
	//	parent.location.reload()
	//	$(".refresh").load(location.href + " .refresh")
	//	console.log(1)
	$('#guid').val($(this).closest('tr').attr('guid'));
	var currentState = $(this).closest('tr').find('td.state').text();
	var matchKey = $(this).text();
	//  console.log(2)
	if(!$(this).text()) {
		layer.alert("出错了^_^");
		return;
	}
	var executeKey = $.Enumerable.From(Object.keys(DictFunction)).First(function(x) {
		return x.match(matchKey) != null;
	})
	if(null != executeKey) {
		DictFunction[executeKey]($(this).text(), currentState);
		return;
	}

	layer.alert("出错了^_^");

});
$(function() {
	$(".qC_aitivityTopic").find("input").focus();
})