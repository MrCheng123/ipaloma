/**
 * Created by MrCheng on 2016/12/9.
 */
//获取数据写入tbody
var djcishu = 1,
	allcont = 0;
var arr1 = new Fndate();
var state = {
	state: "未处理", //状态
	membername: "", //会员名称
	membertype: "", //会员类型
	querybegindate: arr1.strold, //查询开始日期
	queryenddate: arr1.strnew, //查询截止日期
	province: "", //省
	city: "", //市
	county: "", //区
	brcount: "", //违规次数
	compare: "等于", //违规次数比较符号
	level: "", //违规级别
	lastindex: "0", //上次返回结果的最后一条数据索引
	pagecount: "50" //要查询的数据条数
};

if(sessionStorage.state && sessionStorage.state.state != "") {
	state = JSON.parse(sessionStorage.state);
} else {
	state = {
		state: "未处理", //状态(必填)
		membername: "", //会员名称
		membertype: "", //会员类型
		querybegindate: arr1.strold, //查询开始日期
		queryenddate: arr1.strnew, //查询截止日期
		province: "", //省
		city: "", //市
		county: "", //区
		brcount: "", //违规次数
		compare: "等于", //违规次数比较符号
		level: "", //违规级别
		lastindex: "0", //上次返回结果的最后一条数据索引
		pagecount: "50" //要查询的数据条数
	};
}
//渲染页面
function fnxuanran(data) {
	var odata = data.data;
	var otr = "",
		viplx = "",
		diqu = [];

	for(var k1 in odata) {
		otr += "<tr gu-id='" + odata[k1]["guid"] + "' ";
		if(odata[k1]["description"] == "shensu") {
			otr += "shensu='true'><td class='cgl-td1' style='background: url(../img/fuxuank.png) no-repeat center;'></td>";
		} else {
			otr += "><td class='cgl-td1'><input class='thechec' type='checkbox'></td>";
		}
		otr += "<td class='cgl-td2'><span style='display: none'></span><p>" + odata[k1]["memberinfo"] + "</p></td>";
		if(odata[k1]["anticheatingobj_class"] == "tblretailer") {
			viplx = "门店"
		}
		otr += "<td class='cgl-td3'>" + viplx + "</td>";
		diqu = odata[k1]["locale"].split(",").reverse();
		var str = diqu.join("");
		otr += "<td class='cgl-td4'>" + str + "</td>" +
			"<td class='cgl-td41'>" + odata[k1]["issuetime"] + "</td>" +
			"<td class='cgl-td5'><span>" + odata[k1]["breakrulescount"] + "</span>次</td>" +
			"<td class='cgl-td6'>" + odata[k1]["breakruleslevel"] + "</td>" +
			"<td class='cgl-td7'><p title='"+odata[k1]["breakrulescause"]+"'>" + odata[k1]["breakrulescause"] + "</p><a href='javascript:;'>查看详情</a></td>" +
			"<td class='cgl-td8'>" + odata[k1]["measures"] + "</td>" +
			"<td class='cgl-td9'><span>" + odata[k1]["starttime"] + "<br></span><span>" + odata[k1]["endtime"] + "</span></td>" +
			"<td class='cgl-td10'>" + odata[k1]["ordermoney"] + "</td>" +
			"<td class='cgl-td11'>" + odata[k1]["amount"] + "</td>" +
			"<td class='cgl-td12'>" + $(".stateon>span",".xzcont>div:visible").text() + "</td>";
		if(state.state == "已结束" || odata[k1]["description"] == "shensu") {
			otr += "<td class='cgl-td13 td13bgk'><a href='javascript:'>详情</a>";
		} else {
			otr += "<td class='cgl-td13'><ul></ul>";
		}
		otr += "</td>" +
			"</tr>";
	}
	$("#cgl-tbody").html(otr);
	if(data["shuadanjine"]) {
		$("#shua").text(data["shuadanjine"].toFixed(2));
	}
	if(data["shuadanjine"]) {
		$("#kou").text(data["koukuanjine"].toFixed(2));
	}
}

function fncreattab(data) {
	fnxuanran(data);
	//滚动
	$("#cgl-tablebox").scroll(function() {
		if($(this).scrollTop() > ($("#cgl-tablebox").find("table").height() - 500) && $("#cgl-tablebox").find("table").height() > 500) {
			$("#cgl-more").show();
		} else {
			$("#cgl-more").hide();
		}
	});
	allcont = data["allcount"];
}
//加载更多
function fnmore() {
	$("#cgl-more").on("click", "span", function() {
		var cishu = Math.ceil(allcont / 50);
		state.lastindex = 50 * djcishu;
		djcishu++;
		if(djcishu > cishu) {
			$("#cgl-more").find("span").html("没有更多数据")
		} else {
			$(".cgl-jzz").html("加载中，请稍后···").show();
			$.ajax({
				type: "get",
				url: "/webapi/earlywarningmanage/anticheating/getlist",
				data: state,
				error: function() {
					$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
				},
				success: function(data) {
					$(".cgl-jzz").hide();
					//console.log(state)
					var odata = data.data;
					var otr = "",
						viplx = "";
					for(var k1 in odata) {
						otr += "<tr gu-id='" + odata[k1]["guid"] + "' ";
						if(odata[k1]["description"] == "shensu") {
							otr += "shensu='true'><td class='cgl-td1' style='background: url(../img/fuxuank.png) no-repeat center;'></td>";
						} else {
							otr += "><td class='cgl-td1'><input class='thechec' type='checkbox'></td>";
						}
						otr += "<td class='cgl-td2'><span style='display: none'></span><p>" + odata[k1]["memberinfo"] + "</p></td>";
						if(odata[k1]["anticheatingobj_class"] == "tblretailer") {
							viplx = "门店";
						}
						otr += "<td class='cgl-td3'>" + viplx + "</td>" +
							"<td class='cgl-td4'>" + odata[k1]["locale"] + "</td>" +
							"<td class='cgl-td41'>" + odata[k1]["issuetime"] + "</td>" +
							"<td class='cgl-td5'><span>" + odata[k1]["breakrulescount"] + "</span>次</td>" +
							"<td class='cgl-td6'>" + odata[k1]["breakruleslevel"] + "</td>" +
                            "<td class='cgl-td7'><p title='"+odata[k1]["breakrulescause"]+"'>" + odata[k1]["breakrulescause"] + "</p><a href='javascript:;'>查看详情</a></td>" +
							"<td class='cgl-td8'>" + odata[k1]["measures"] + "</td>" +
							"<td class='cgl-td9'><span>" + odata[k1]["starttime"] + "<br></span><span>" + odata[k1]["endtime"] + "</span></td>" +
							"<td class='cgl-td10'>" + odata[k1]["ordermoney"] + "</td>" +
							"<td class='cgl-td11'>" + odata[k1]["amount"] + "</td>" +
							"<td class='cgl-td12'>" + $(".stateon>span",".xzcont>div:visible").text() + "</td>";
						if(state.state == "已结束" || odata[k1]["description"] == "shensu") {
							otr += "<td class='cgl-td13 td13bgk'><a href='javascript:'>详情</a></td>";
						} else {
							otr += "<td class='cgl-td13'><ul></ul></td>";
						}
						otr +="</tr>";
					}
					$("#cgl-tbody").append(otr);
					if(data["shuadanjine"]) {
						$("#shua").text(data["shuadanjine"].toFixed(2));
					}
					if(data["shuadanjine"]) {
						$("#kou").text(data["koukuanjine"].toFixed(2));
					}
				}
			});
		}
	});
}
//违规记录维度
function fndengji(data) {
	var odata = data[0];
	//console.log(odata)
	if(odata){
		$(".weiqueren").find("i").text(odata["weichuli"]);
		$(".shensuz").find("i").text(odata["shensuzhong"]);
		$(".chufaz").find("i").text(odata["chufazhong"]);
		$(".yijiesu").find("i").text(odata["yijieshu"]);
		$(".jiechu").find("i").text(odata["jiechuweigui"]);
		fnjilu();
	}

}
//查询条件改变事件
function fnshijian(state) {
	$("input:checked").prop("checked", false);
	$(".cgl-jzz").html("加载中，请稍后···").show();
	$.ajax({
		type: "get",
		url: "/webapi/earlywarningmanage/anticheating/getlist",
		data: state,
		error: function(data) {
			$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		},
		success: function(data) {
			//console.log(data)
			$(".cgl-jzz").hide();
			if(data["allcount"] == 0) {
				$(".cgl-jzz").html("暂无数据").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
				$("#cgl-tbody").html("");
				$("#shua").text(data["shuadanjine"].toFixed(2));
				$("#kou").text(data["koukuanjine"].toFixed(2));
				fndengji(data["statecount"]);
			} else {
				allcont = data["allcount"];
				djcishu = 1;
				fndengji(data["statecount"]);
				fncreattab(data); //创建tbody
				$("#cgl-tablebox").animate({
					scrollTop: 0
				}, 0);
				$("#cgl-more").hide(function() {
					$("#cgl-more").css({
						"display": "none"
					}).find("span").html("点击加载更多");
				});
			}

		}
	});
}
//不同状态下四个按钮的显示
function fnanniu4() {
	$(".cgl-anniu").find("span").hide();
	if(state.state == "未处理") {
		$("#cgl-qrwg1").show();
		$("#cgl-jcwg1").show();
	} else if(state.state == "申诉中") {
		//$("#cgl-tzwg1").show();
		//$("#cgl-jcwg1").show();
	} else if(state.state == "处罚中") {
		$("#cgl-tzwg1").show();
		$("#cgl-jcwg1").show();
		$("#cgl-fstz1").show();
	} else if(state.state == "已结束") {

	} else if(state.state == "解除违规") {
		$("#cgl-qrwg12").show();
		$("#cgl-tzwg1").show();
	}
}
//时间重置
function Fndate() {
	var d = new Date();
	if(d.getMonth() == 0) {
		this.strold = d.getFullYear() - 1 + "-" + 12 + "-" + d.getDate();
	} else {
		this.strold = d.getFullYear() + "-" + (d.getMonth().length > 1 ? d.getMonth() : "0" + d.getMonth()) + "-" + (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());
	}
	this.strnew = d.getFullYear() + "-" + ((d.getMonth() + 1).length > 1 ? (d.getMonth() + 1) : "0" + (d.getMonth() + 1)) + "-" + (d.getDate() > 9 ? d.getDate() : "0" + d.getDate());
}

//记录状态
function fnjilu() {
	if(state.state == "解除违规" || state.state == "处罚中" || state.state == "已结束") {
		$(".xze1>li").removeClass("clicon").eq(1).addClass("clicon");
		$(".xzcont>div").hide().eq(1).show();
	} else if(state.state == "未处理" || state.state == "申诉中") {
		$(".xze1>li").removeClass("clicon").eq(0).addClass("clicon");
		$(".xzcont>div").hide().eq(0).show();
	}
	$(".xzcont>div>div").each(function(i) {
		if($(this).attr("state") == state.state) {
			$(this).addClass("stateon").siblings().removeClass("stateon");
		}
	});
	$("#cgl-cxdata").val(state.querybegindate);
	$("#cgl-cxdata1").val(state.queryenddate);
	state.province == "" ? $("#province>span>em").html("省") : $("#province>span>em").html(state.province);
	state.city == "" ? $("#city>span>em").html("市") : $("#city>span>em").html(state.city);
	state.county == "" ? $("#area>span>em").html("区") : $("#area>span>em").html(state.county);
	if(state.compare == "等于") {
		$("#cgl-xzf").val("等于");
	} else {
		for(var i = 0; i < $("option","#cgl-xzf").length; i++) {
			if($("option","#cgl-xzf").eq(i).html() == state.compare) {
                $("option","#cgl-xzf").eq(i).attr("selected", true)
			}
		}
	}
	$("#cgl-wgcs").val(state.brcount);
	$("#cgl-vipname").val(state.membername);
	if(state.level == "") {
		$("#cgl-wgdj").css({
			"color": "#999"
		}).val("-请选择-");

	} else {
		$("#cgl-wgdj").css({
			"color": "#333"
		});
		for(var j = 1; j < $("option","#cgl-wgdj").length; j++) {
			if($("option","#cgl-wgdj").eq(j).html() == state.level) {
                $("option","#cgl-wgdj").eq(j).attr("selected", true)
			}
		}
	}
}
//处理与待处理
function fnxze1() {
	$(".xze1>li").on("click", function() {
		$(this).addClass("clicon").siblings().removeClass("clicon");


		$(".xzcont>div>div").removeClass("stateon").each(function(i) {
			if($(this).attr("state") == $(this).parent().attr("state")) {
				$(this).addClass("stateon");
			}
		});
		$(".xzcont>div").hide().eq($(this).index()).show();
        state["state"] = $(".xzcont>div").eq($(this).index()).attr("state");
		state["lastindex"] = 0;
		fnshijian(state);
		sessionStorage.setItem("state", JSON.stringify(state));
		fnanniu4();
	});
}

//模拟下拉菜单
function fnxiala() {
	$(".xzcont").on("click", ">div>div", function() {
		$(this).addClass("stateon").siblings().removeClass("stateon");
		state["lastindex"] = 0;
		state["state"] = $(this).attr("state");
		$(this).parent().attr("state",$(this).attr("state"));
		//console.log(state)
		fnshijian(state);
		sessionStorage.setItem("state", JSON.stringify(state));
		fnanniu4();
	});
}
//选择日期
function fndate() {
	$('.time').click(function(e) {
		e.stopPropagation();
		// var id = $(this).attr('id');
		laydate({
			// elem: id,
			event: 'focus',
			format: 'YYYY-MM-DD',
			// format: 'YYYY-MM-DD',
			max: laydate.now(),
			istime: false,
			isclear: false, //是否显示清空
			istoday: false, //是否显示今天
			issure: false,
			choose: function(dates) {
				//layer.msg(dates);
				var isxy = $('#cgl-cxdata1').val().replace(/-/g, "") - $('#cgl-cxdata').val().replace(/-/g, "");
				//console.log(isxy)
				if($('#cgl-cxdata').val() == state["querybegindate"] && $('#cgl-cxdata1').val() == state["queryenddate"]) {
					return false;
				} else if(isxy < 0 && $('#cgl-cxdata').val() != "" && $('#cgl-cxdata1').val() != "") {
					$(".cgl-jzz").html("日期选择有误").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
				} else {
					state["querybegindate"] = $('#cgl-cxdata').val();
					state["queryenddate"] = $('#cgl-cxdata1').val();
					state["lastindex"] = 0;
					fnshijian(state);
					sessionStorage.setItem("state", JSON.stringify(state));
				}
			}
		});
	});

}
//发生地区
function fnfsdiqu() {
	$("#province").find("ul").on("click", "li", function() {
		var sheng = $(this).html(),
			shengold = $("#province>span>em").html(),
			shiold = $("#city>span>em").html(),
			quold = $("#area>span>em").html();
		if(sheng != shengold) {
			if(sheng == "省份") {sheng = ""}
			if(shiold == "市" || shiold == "城市") {shiold = ""}
			if(quold == "区" || quold == "区县") {quold = ""}
			state["province"] = sheng;
			state["lastindex"] = 0;
			//fnshijian(state);
			sessionStorage.setItem("state", JSON.stringify(state));
		}
	});
	$("#city").find("ul").on("click", "li", function() {
		var shi = $(this).html(),
			shengold = $("#province>span>em").html(),
			shiold = $("#city>span>em").html(),
			quold = $("#area>span>em").html();
		if(shi != shiold) {
			if(shi == "城市") {shi = ""}
			if(shengold == "省" || shengold == "省份") {shengold = ""}
			if(quold == "区" || quold == "区县") {quold = ""}
			state["city"] = shi;
			state["lastindex"] = 0;
			//fnshijian(state);
			sessionStorage.setItem("state", JSON.stringify(state));
		}
	});
	$("#area").on("click", ">ul>li", function() {
		var qu = $(this).html(),
			shengold = $("#province>span>em").html(),
			shiold = $("#city>span>em").html(),
			quold = $("#area>span>em").html();
		if(qu != quold) {
			if(qu == "区县") {qu = ""}
			if(shiold == "市" || shiold == "城市") {shiold = ""}
			if(shengold == "省" || shengold == "省份") {shengold = ""}
			state["county"] = qu;
			state["lastindex"] = 0;
			fnshijian(state);
			sessionStorage.setItem("state", JSON.stringify(state));
		}
	});

}
//违规次数
function fnweignum() {
	$("#cgl-xzf").change(function() {
		state["compare"] = $(this).find("option:selected").text();
		sessionStorage.setItem("state", JSON.stringify(state));
		if($("#cgl-wgcs").val() != "") {
			state["brcount"] = Number($("#cgl-wgcs").val());
			state["lastindex"] = 0;
			fnshijian(state);
		}
	});
	$("#cgl-wgcs").on('input', function(e) {
		if(Number($(this).val()) < 0 || isNaN(Number($(this).val()))) {
			$(this).val("");
		} else if($(this).val() == "") {
			state["brcount"] = $(this).val();
			state["lastindex"] = 0;
			fnshijian(state);
			sessionStorage.setItem("state", JSON.stringify(state));
		} else {
			if($(this).val() - 0 === state["brcount"]) {
				$(this).val($(this).val() - 0);
			} else {
				$(this).val($(this).val() - 0);
				state["brcount"] = $(this).val() - 0;
				state["lastindex"] = 0;
				fnshijian(state);
				//console.log(state)
				sessionStorage.setItem("state", JSON.stringify(state));
			}

		}

	});
}
//会员名称
function fnvipname() {
	var t = 0;
	$("#cgl-vipname").on('input', function(e) {
		clearTimeout(t);
		var that = this;
		t = setTimeout(function() {
			state["membername"] = $(that).val();
			state["membertype"] = $("#cgl-md").find("option:selected").val();
			state["lastindex"] = 0;
			fnshijian(state);
			sessionStorage.setItem("state", JSON.stringify(state));
		}, 1000);
	});
}
//违规级别
function fnwgjb() {
	$(".cgl-jzz").html("加载中，请稍后···").show();
	var opt = "";
	$.ajax({
		type: "get",
		url: "/webapi/operation/1/breakruleslevels",
		data: "",
		success: function(data) {
			$(".cgl-jzz").hide();
			opt = "<option >-请选择-</option>";
			for(var k1 in data) {
				opt += "<option>" + data[k1]["level"] + "</option>";
			}
			$("#cgl-wgdj").html(opt);
		}
	});
	$("#cgl-wgdj").change(function() {
		var level = $(this).find("option:selected").text();
		if(level == "-请选择-") {
			level = "";
			$("#cgl-wgdj").css({
				"color": "#999"
			});
		} else {
			$("#cgl-wgdj").css({
				"color": "#333"
			});
		}
		state["level"] = level;
		state["lastindex"] = 0;
		fnshijian(state);
		sessionStorage.setItem("state", JSON.stringify(state));
	});
}
//重置按钮
function fnreset() {
	$("#cgl-reset").on("click", function() {
		var arr = new Fndate();
		var state1 = {
			state: "未处理", //状态
			membername: "", //会员名称
			membertype: "", //会员类型
			querybegindate: arr.strold, //查询开始日期
			queryenddate: arr.strnew, //查询截止日期
			province: "", //省
			city: "", //市
			county: "", //区
			brcount: "", //违规次数
			compare: "等于", //违规次数比较符号
			level: "", //违规级别
			lastindex: "0", //上次返回结果的最后一条数据索引
			pagecount: "50" //要查询的数据条数
		};
		$(".yichuli").attr("state","处罚中");
		if(JSON.stringify(state1) == JSON.stringify(state) && $("#cgl-cxdata").val() == state1.querybegindate &&
			$("#cgl-cxdata1").val() == state1.queryenddate) {
			$(".cgl-jzz").html("已经是最初始状态").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else {
			state = state1;
			fnshijian(state);
			sessionStorage.setItem("state", JSON.stringify(state));
		}
		$("#province>span>em").html("省");
		$("#city>span>em").html("市");
		$("#area>span>em").html("区");
		$("#cgl-wgdj").css({
			"color": "#999"
		}).val("-请选择-");
	});
}

//操作
function fncaozuo() {
	var attr = "";
	$("tbody").on("click", ".cgl-td13", function() {
		$("#cgl-table").find("input:checkbox").prop("checked", false);
		var td12 = $(this).parents("tr").find(".cgl-td12").html();
		//$(".cgl-td13").html("");
		if(state.state == "已结束" || $(this).parents("tr").attr("shensu") == "true") {

		} else {
			attr = "";
			attr += "<div><ul>";
			if(td12 == "确认违规处罚中") {
				attr += "<li class='fasong'>发送通知</li>";
			}
			if(td12 == "确认违规处罚中" || (td12 == "解除违规" && $(this).parents("tr").attr("shensu") != "true") || td12 == "申诉中") {
				attr += "<li class='tiaoz'>调整违规等级</li>";
			}
			if(td12 == "确认违规处罚中") {
				attr += "<li class='vipshensu'>会员申诉</li>";
			}
			if(td12 == "申诉中") {
				attr += "<li class='vipbohui'>驳回申诉</li>";
			}
			if(td12 == "未确认") {
				attr += "<li class='queren'>调整并确认</li>";
			}
			if(td12 == "解除违规" && $(this).parents("tr").attr("shensu") != "true") {
				attr += "<li class='queren'>确认违规</li>";
			}
			if(td12 == "未确认" || td12 == "申诉中" || td12 == "确认违规处罚中") {
				attr += "<li class='jiechuwg'>解除违规</li>";
			}
			attr += "<li class='xiangxi'>详细</li></ul></div>";
			$(this).html(attr);
			$("div", ".cgl-td13").removeClass("czon");
			$("div", this).addClass("czon");
		}
	}).on("click", ".cgl-td13 .xiangxi", function() {
		//console.log($(this).parents("tr"))
		article_add(this);
	}).on("click", ".cgl-td13>a", function() {
		article_add(this);
	}).on("click", ".fasong", function() {
		fasong_add($(this).parents("tr"));
	}).on("click", ".vipshensu", function() {
		vipshensu_add($(this).parents("tr"));
	}).on("click", ".jiechuwg", function() {
		var putdata = {
			"dealtstate": "解除违规",
			"anticheatingids": $(this).parents("tr").attr("gu-id")
		};
		var dqzt = $("#cgl-tbody").find("tr:first>.cgl-td12").html();
		jiechuwg_add(putdata, dqzt);
	}).on("click", ".tiaoz", function() {
		tiaoz_add("当前违规等级<span>（" + $(this).parents("tr").find(".cgl-td6").html() + "）</span>", $(this).parents("tr").attr("gu-id"));
	}).on("click", ".queren", function() {
		var putdata = {
			"dealtstate": "确认违规",
			"anticheatingids": $(this).parents("tr").attr("gu-id")
		};
		if($(this).html() == "确认违规") {
			querenwg_add(putdata);
		} else {
			tiaozqr("当前违规等级<span>（" + $(this).parents("tr").find(".cgl-td6").html() + "）</span>", $(this).parents("tr").attr("gu-id"));
		}
	}).on("click", ".vipbohui", function() {
		var putdata = {
			"dealtstate": "驳回申诉",
			"description": "",
			"anticheatingid": $(this).parents("tr").attr("gu-id")
		};
		fnbohui(putdata);
	});
	$(document).click(function(e) {
		if(!$(e.target).closest(".cgl-td13").length) {
			$("div", ".cgl-td13").removeClass("czon");
		}
	});
}
//详细弹窗
function article_add(that) {
	var parents = $(that).parents("tr");
	var cont = "<ul>" +
		"<li class='cgl-li1'>" +
		"<h4>会员名称</h4>" +
		"<strong style='display: none'></strong>" +
		"<p>" + $(".cgl-td2", parents).find("p").text() + "</p>" +
		"</li>" +
		"<li class='cgl-li2'>" +
		"<h4>会员类型</h4>" +
		"<span>" + $(".cgl-td3", parents).text() + "</span>" +
		"<p>" + $(".cgl-td5", parents).text() + "</p>" +
		"</li>" +
		"<li class='cgl-li3'>" +
		"<h4>发生地区</h4>" +
		"<p>" + $(".cgl-td4", parents).text() + "</p>" +
		"</li>" +
		"<li class='cgl-li6'>" +
		"<h4>报警时间</h4>" +
		"<p>" + $(".cgl-td41", parents).text() + "</p>" +
		"</li>" +
		"<li class='cgl-li4'>" +
		"<ul id='cgl-li4ul'>" +
		"<li><h4>近半年</h4><p>" + $(".cgl-td5", parents).html() + "</p></li>" +
		"<li><h4>违规级别</h4><p>" + $(".cgl-td6", parents).text() + "</p></li>" +
		"<li><h4>违规原因</h4><p>" + $(".cgl-td7>p", parents).text() + "<br/><a class='xqckxq' style='color: #5380cb;' href='javascript:'>查看详情</a></p></li>" +
		"<li><h4>处罚措施</h4><p>" + $(".cgl-td8", parents).text() + "</p></li>" +
		"<li><h4>处罚周期</h4><p class='cgl-xxcfzq'>" + $(".cgl-td9", parents).html() + "</p></li>" +
		"<li><h4>刷单金额</h4><p>￥ " + Number($(".cgl-td10", parents).text()).toFixed(2) + "</p></li>" +
		"<li><h4>扣款金额</h4><p>￥ " + Number($(".cgl-td11", parents).text()).toFixed(2) + "</p></li>" +
		"</ul>" +
		"</li>" +
		"<li class='cgl-li5'>" +
		"<h4>操作记录</h4>" +
		"<ul class='cgl-czjl'>" +
		"</ul>" +
		"</li>" +
		"</ul>" +
		"<div class='cgl-antc'><span class='cgl-close cgl-ciyao'>关闭</span>";
	for(var i = $(that).prevAll().length-1; i >=0 ; i--) {
		cont += "<span class='cgl-import'>" + $(that).prevAll().eq(i).html() + "</span>";
	}
	cont += "</div>";
	var index = layer.open({
		type: 5,
		title: "详细",
		area: ['958px', 'auto'],
		content: cont
	});
	layer.full(index);
	$(".xqckxq").on("click",function () {
        parents.find(".cgl-td7>a").click();
    });
	//操作记录
	var guid = parents.attr("gu-id");
	$.ajax({
		type: "get",
		url: "/webapi/earlywarningmanage/anticheating/stateopdetail/" + guid,
		data: "",
		error: function(data) {
			$(".cgl-czjl").html("<li>暂无记录</li>");;
		},
		success: function(data) {
			$(".cgl-jzz").hide();
			var oli = "";
			if(data.error) {
				oli += "<li>暂无记录</li>";
			}
			for(var i = 0; i < data.length; i++) {
				oli += "<li>" +
					"<span>" + data[i]["issuetime"] + "</span> " +
					" <span style='padding-left:6px'> 操作人员：" + data[i]["issueby_name"] + "</span>" +
					"<div>" + data[i]["dealtstate"] + "；</div>";
				if(data[i]["dealtstate"] == "申诉中") {
					oli += "<div class='cgl-beizhu'><span>登记内容：</span><p>" + data[i]["description"] + "</p></div>";
				} else if(data[i]["dealtstate"] == "发送通知") {
					oli += "<div class='cgl-beizhu'><span>通知内容：</span><p>" + data[i]["description"] + "</p></div>";
				} else if(data[i]["description"] != "") {
					oli += "<div class='cgl-beizhu'><span>备注：</span><p>" + data[i]["description"] + "</p></div>";
				}
				oli += "</li>";
			}
			$(".cgl-czjl").html(oli);
		}
	});
	fnclose(index); //关闭按钮
	$(".cgl-antc").on("click", ".cgl-import", function() {
		var fstz = "",putdata=null;
		if($(this).text() == "发送通知") {
			fstz = {
				"anticheatingids": guid
			};
			fnfstz(fstz);
		}
		if($(this).text() == "调整违规等级") {
			tiaoz_add("当前违规等级<span>（" + parents.find(".cgl-td6").html() + "）</span>", guid);
		}
		if($(this).text() == "会员申诉") {
			vipshensu_add(parents);
		}
		if($(this).text() == "调整并确认") {
			putdata = {
				"dealtstate": "确认违规",
				"description": $("#cgl-tjbz").find("textarea").val(),
				"anticheatingids": guid
			};
			//querenwg_add(putdata);
			tiaozqr("当前违规等级<span>（" + parents.find(".cgl-td6").html() + "）</span>", guid)
		}
		if($(this).text() == "确认违规") {
			putdata = {
				"dealtstate": "确认违规",
				"anticheatingids": guid
			};
			querenwg_add(putdata);
		}
		if($(this).text() == "解除违规") {
			putdata = {
				"dealtstate": "解除违规",
				"anticheatingids": guid
			};
			var dqzt = $("#cgl-tbody").find("tr:first>.cgl-td12").html();
			jiechuwg_add(putdata, dqzt);
		}
		if($(this).text() == "驳回申诉") {
			putdata = {
				"dealtstate": "驳回申诉",
				"description": "",
				"anticheatingids": $(this).parents("tr").attr("gu-id")
			};
			console.log(putdata)
			fnbohui(putdata);
		}
	})
}
//发送通知
function fnfstz(fstz) {
	$(".cgl-jzz").html("加载中，请稍后···").show();
	$(".cgl-zhezao").show();
	$.ajax({
		type: "post",
		error: function() {
			$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		},
		url: "/webapi/earlywarningmanage/anticheating/sendnotification",
		data: fstz,
		success: function(data) {
			$(".cgl-jzz").hide();
			$(".cgl-zhezao").hide();
			if(data["succeed"] == "succeed") {
				//alert("发送成功");

				$(".cgl-jzz").html("发送成功").fadeIn(500).delay(1000).fadeOut(100);
			} else if(data.error) {
				alert(data.error);
			}
		}
	});
}
//关闭按钮
function fnclose(index) {
	$(".cgl-close").click(function() {
		layer.close(index)
	});
}
//操作中的发送通知
function fasong_add(parents) {
	var fstz = {
		"anticheatingids": parents.attr("gu-id")
	};
	fnfstz(fstz);
}

//确认违规
function querenwg_add(putdata) {
	var cont = "<div>";
	if(putdata["weiguidengji"]) {
		cont += "<div class='cgl-jibie'><span class='left'>违规等级</span>" + putdata["weiguidengji"] + "级</div>";
	}
	cont += "<div class='cgl-tiaoz qrentext'><span class='left'>备注</span><textarea class='left'></textarea></div>" +
		"<div class='cgl-antz'><span class='cgl-qrwgqx'>取消</span><span class='cgl-import cgl-qrwgqr'>确定</span></div>" +
		"</div>";
	var index = layer.open({
		type: 5,
		title: "确认违规",
		area: ['962px', 'auto'],
		content: cont
	});
	layer.full(index);
	$(".cgl-qrwgqx").on("click", function() {
		layer.close(index);
	});
	$(".cgl-qrwgqr").on("click", function() {
		putdata.description = $(".qrentext").find("textarea").val();
		//console.log(putdata)
		fnwgjlzt(putdata);
	});

}
//确认并调整
function tiaozqr(dangq, guid) {
	//console.log(dangq,guid);
	var cont = "<div>" +
		"<p class='cgl-dqdj'>" + dangq + "</p>" +
		"<div class='cgl-tiaoz'>调整至" +
		"<select>" + $("#cgl-wgdj").html() + "</select></div>" +
		"<div id='cgl-tjbz'>" +
		"<h4>备注</h4>" +
		"<textarea></textarea>" +
		"</div>" +
		"<div class='cgl-antz'><span class='cgl-close cgl-ciyao'>取消</span><span class='cgl-import' id='cgl-qrtz'>确定</span></div>" +
		"</div>";

	var index = layer.open({
		type: 5,
		title: "调整并确认",
		area: ['960px', 'auto'],
		content: cont
	});
	layer.full(index);
	fnclose(index);
	$(".cgl-tiaoz").find("option:first").remove();
	//等级调整确认事件
	$("#cgl-qrtz").click(function() {
		var djjson = {
			"level": $(".cgl-tiaoz").find("option:selected").html(),
			"description": $("#cgl-tjbz").find("textarea").val(),
			"anticheatingids": guid
		};
		if(djjson.description == "") {
			$(".cgl-jzz").html("请先填写备注").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else if($(".cgl-dqdj>span").html().replace(/[^0-9]/ig, "") != djjson.level.replace(/[^0-9]/ig, "")) {
			$('.layui-layer-close').click();
			$(".cgl-jzz").html("加载中，请稍后···").show();
			$(".cgl-zhezao").show();
			$.ajax({
				type: "put",
				url: "/webapi/earlywarningmanage/anticheating/levelchanged",
				data: djjson,
				error: function() {
					$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
				},
				success: function(data) {
					//console.log(data);
					$(".cgl-zhezao").hide();
					if(data.error) {
						$(".layui-layer-shade").remove();
						$(".layui-layer").remove();
					}
					if(data["succeed"]) {
						fnshijian(state);
						$(".cgl-jzz").html("操作成功").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
					}
				}
			});
		} else {
			$(".cgl-jzz").html("加载中，请稍后···").show();
			var putdata1 = {
				"dealtstate": "确认违规",
				"description": $("#cgl-tjbz").find("textarea").val(),
				"anticheatingids": guid
			};
			fnwgjlzt(putdata1);
			$('.layui-layer-close').click();
		}

	});
}
//解除违规
function jiechuwg_add(putdata, dqzt) {
	var cont = "<div>" +
		"<div id='cgl-miaoshu'>" +
		"<h4>备注</h4>" +
		"<textarea></textarea>" +
		"</div>" +
		"<div id='cgl-kuaijie'>" +
		/*"<h4>快捷申诉</h4>" +
		 "<div>" +
		 "<label><input name='shensu' type='checkbox'>描述1 </label>" +
		 "<label><input name='shensu' type='checkbox'>描述2 </label>" +
		 "<label><input name='shensu' type='checkbox'>描述3 </label>" +
		 "<label><input name='shensu' type='checkbox'>描述4</label>" +
		 "</div>" +*/
		"</div>" +
		"<div class='cgl-anfs'><span class='cgl-close cgl-ciyao'>取消</span><span id='qrjcweig' class='cgl-import'>确定</span></div>" +
		"</div>";

	var index = layer.open({
		type: 5,
		title: "解除违规",
		area: ['958px', 'auto'],
		content: cont
	});
	layer.full(index);
	//关闭
	fnclose(index);
	//确认解除
	$("#qrjcweig").on("click", function() {
		putdata.description = $("#cgl-miaoshu").find("textarea").val();
		if(putdata.description == "") {
			$(".cgl-jzz").html("请先填写备注").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else {
			fnqrjcwg(putdata);
		}
	});
}
//确认解除违规
function fnqrjcwg(putdata) {
	var cont = "<div>" +
		"<div class='jctext'>确定要解除违规吗？解除后将不能再确认或调整违规，请谨慎操作" +
		"</div>" +
		"<div class='cgl-antz'><span class='layui-layer-close cgl-ciyao'>取消</span><span class='cgl-import querenjc'>确定</span></div>" +
		"</div>";
	var index = layer.open({
		type: 5,
		title: "解除违规",
		area: ['500px', 'auto'],
		content: cont
	});
	layer.full(index);
	$(".querenjc").click(function() {
		var dqzt=state.state;
		if(dqzt == "申诉中") {
			putdata.anticheatingid = putdata.anticheatingids;
			fnbohuiapi(putdata);
		}else {
			fnwgjlzt(putdata);
		}

	});
}
//会员申诉
function vipshensu_add(parents) {
	var cont = "<div>" +
		"<div id='cgl-miaoshu'>" +
		"<h4>登记内容</h4>" +
		"<textarea></textarea>" +
		"</div>" +
		"<div id='cgl-kuaijie'>" +
		/*		    "<h4>快捷申诉</h4>" +
		 "<div>" +
		 "<label><input name='shensu' type='checkbox'>描述1 </label>" +
		 "<label><input name='shensu' type='checkbox'>描述2 </label>" +
		 "<label><input name='shensu' type='checkbox'>描述3 </label>" +
		 "<label><input name='shensu' type='checkbox'>描述4</label>" +
		 "</div>" +
		 */
		"</div>" +
		"<div class='cgl-anfs'><span class='cgl-close cgl-ciyao'>取消</span><span class='cgl-import quedss'>确定</span></div>" +
		"</div>";

	var index = layer.open({
		type: 5,
		title: "登记会员申诉",
		area: ['958px', 'auto'],
		content: cont
	});
	layer.full(index);
	//关闭
	fnclose(index);
	//申述描述
	$(".quedss").click(function() {
		//var kuis = $("#cgl-kuaijie").find("input:checked").parent().text();
		var mshu = $("#cgl-miaoshu").find("textarea").val();
		var putdata = {
			"description": mshu,
			"dealtstate": "申诉中",
			"anticheatingid": parents.attr("gu-id")
		};
		//console.log(putdata)
		if(putdata.description == "") {
			$(".cgl-jzz").html("请先填写备注").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else {
			fnbohuiapi(putdata);
		}
	});
}
//驳回申诉
function fnbohui(putdata) {
	var cont = "<div>" +
		"<p style='padding:30px 0 72px 0;text-align:center;font-size:18px;'>驳回后，将恢复确认违规，违规等级不变。</P>" +
		"<div class='cgl-antz'><span class='cgl-qrwgqx'>取消</span><span class='cgl-import cgl-qrwgqr'>确定</span></div>" +
		"</div>";
	var index = layer.open({
		type: 5,
		title: "驳回申诉",
		area: ['500px', 'auto'],
		content: cont
	});
	layer.full(index);
	$(".cgl-qrwgqx").on("click", function() {
		layer.close(index);
	});
	$(".cgl-qrwgqr").on("click", function() {
		console.log(putdata)
		fnbohuiapi(putdata);
	});
}
//关于申诉接口
function fnbohuiapi(putdata) {
	$('.layui-layer-close').click();
	$(".cgl-jzz").html("加载中，请稍后···").show();
	$(".cgl-zhezao").show();
	$.ajax({
		type: "put",
		url: "/webapi/earlywarningmanage/anticheating/dealtshensu",
		data: putdata,
		error: function() {
			$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		},
		success: function(data) {
			$(".cgl-jzz").hide();
			if(data.error) {
				$('.layui-layer-close').click();
				$(".cgl-jzz").html("操作失败").stop(true, true).delay(1000).fadeOut(100);
			}
			if(data["succeed"]) {
				/*var guidarr = [putdata.anticheatingid];
				 for(var i = 0; i < guidarr.length; i++) {
				 $("tr").each(function(n) {
				 if($(this).attr("gu-id") == guidarr[i]) {
				 $(this).find(".cgl-td12").html(putdata.dealtstate);
				 $(this).remove();
				 $(".stateon").find("i").text($(".stateon").find("i").text() - 1);
				 }
				 });
				 }*/
				$(".cgl-zhezao").hide();
				state["lastindex"] = 0;
				fnshijian(state);
				$(".cgl-jzz").html("操作成功").stop(true, true).delay(1000).fadeOut(100);
			}
		}
	});
}

//调整违规等级
function tiaoz_add(dangq, guid) {
	//console.log(dangq,guid);
	var cont = "<div>" +
		"<p class='cgl-dqdj'>" + dangq + "</p>" +
		"<div class='cgl-tiaoz'>调整至" +
		"<select>" + $("#cgl-wgdj").html() + "</select></div>" +
		"<div id='cgl-tjbz'>" +
		"<h4>备注</h4>" +
		"<textarea></textarea>" +
		"</div>" +
		"<div class='cgl-antz'><span class='cgl-close cgl-ciyao'>取消</span><span class='cgl-import' id='cgl-qrtz'>确定</span></div>" +
		"</div>";

	var index = layer.open({
		type: 5,
		title: "调整违规等级",
		area: ['960px', 'auto'],
		content: cont
	});
	layer.full(index);
	fnclose(index);
	$(".cgl-tiaoz").find("option:first").remove();
	//等级调整确认事件
	$("#cgl-qrtz").click(function() {
		var djjson = {
			"level": $(".cgl-tiaoz").find("option:selected").html(),
			"description": $("#cgl-tjbz").find("textarea").val(),
			"anticheatingids": guid
		};
		if(djjson.description == "") {
			$(".cgl-jzz").html("请先填写备注").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else if($(".cgl-dqdj>span").html().replace(/[^0-9]/ig, "") == djjson.level.replace(/[^0-9]/ig, "")) {
			$(".cgl-jzz").html("不可调整至原等级").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else {
			$('.layui-layer-close').click();
			$(".cgl-jzz").html("加载中，请稍后···").show();
			$(".cgl-zhezao").show();
			$.ajax({
				type: "put",
				url: "/webapi/earlywarningmanage/anticheating/levelchanged",
				data: djjson,
				error: function() {
					$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
				},
				success: function(data) {
					//console.log(data);
					if(data.error) {
						$(".layui-layer-shade").remove();
						$(".layui-layer").remove();
					}
					if(data["succeed"]) {
						$(".cgl-zhezao").hide();
						fnshijian(state);
						$(".cgl-jzz").html("等级调整成功").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
					}
				}
			});
		}

	});
}

//全选单选事件
function fnchec() {
	$("#cgl-table").on("click", "#checall", function() {
		if($(this).prop("checked") == true) {
			$(".thechec", "#cgl-table").prop("checked", true);
		} else {
			$(".thechec", "#cgl-table").prop("checked", false);
		}
	});
	$("#cgl-table").on("click", ".thechec", function() {
		if($(".thechec:checked", "#cgl-table").length == $(".thechec", "#cgl-table").length) {
			$("#checall").prop("checked", true);
		} else {
			$("#checall").prop("checked", false);
		}
	});
}
//获取选中的id
function fnguid() {
	var guid1 = "";
	var checlen = $(".thechec:checked");
	for(var i = 0; i < checlen.length; i++) {
		if(i == checlen.length - 1) {
			guid1 += checlen.eq(i).parents("tr").attr("gu-id")
		} else {
			guid1 += checlen.eq(i).parents("tr").attr("gu-id") + ",";
		}

	}
	return guid1;
}
//四个按钮事件
function fnanniu() {
	$("#cgl-qrwg1").click(function() {
		if($("#cgl-tbody").find(".thechec:checked").length == 0) {
			$(".cgl-jzz").html("请先选择要操作的项").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else {
			var guid = fnguid();
			//console.log(guid.split(","));
			var checlist = $(".thechec:checked");
			var isduo = "";
			for(var i = 1; i < checlist.length; i++) {
				if(checlist.eq(i).parents("tr").find(".cgl-td6").html() != checlist.eq(0).parents("tr").find(".cgl-td6").html()) {
					isduo = "多个等级";
					break;
				} else {
					isduo = "";
				}
			}
			if(guid.split(",").length == 1) {
				tiaozqr("当前违规等级<span>（" + checlist.eq(0).parents("tr").find(".cgl-td6").html() + "）</span>", guid);
			} else if(isduo == "多个等级") {
				tiaozqr("当前违规等级<span>（" + isduo + "）</span>", guid);
			} else {
				tiaozqr("当前违规等级<span>（" + checlist.eq(0).parents("tr").find(".cgl-td6").html() + "）</span>", guid);
			}
		}
	});
	$("#cgl-qrwg12").click(function() {
		if($("#cgl-tbody").find(".thechec:checked").length == 0) {
			$(".cgl-jzz").html("请先选择要操作的项").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else {
			var guid = fnguid();
			//console.log(guid.split(","));
			var putdata = {
				"dealtstate": "确认违规",
				"anticheatingids": guid
			};
			querenwg_add(putdata);

		}
	});
	$("#cgl-jcwg1").click(function() {
		if($("#cgl-tbody").find(".thechec:checked").length == 0) {
			$(".cgl-jzz").html("请先选择要操作的项").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else if($("#cgl-tbody").find(".cgl-td12").html() == "解除违规") {
			$(".cgl-jzz").html("已经是当前状态").fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else if($("#cgl-tbody").find(".cgl-td12").html() == "未处理") {
			$(".cgl-jzz").html("不可解除违规").fadeIn(500).delay(1000).fadeOut(100);
			return false;
		} else {
			var guid = fnguid();
			var putdata = {
				"dealtstate": "解除违规",
				"anticheatingids": guid
			};
			var dqzt = $("#cgl-tbody").find("tr:first>.cgl-td12").html();
			jiechuwg_add(putdata, dqzt);
		}

	});
	$("#cgl-tzwg1").click(function() {
		if($("#cgl-tbody").find(".thechec:checked").length == 0) {
			$(".cgl-jzz").html("请先选择要操作的项").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else {
			var guid = fnguid();
			//console.log(guid.split(","));
			var checlist = $(".thechec:checked");
			var isduo = "";
			for(var i = 1; i < checlist.length; i++) {
				if(checlist.eq(i).parents("tr").find(".cgl-td6").html() != checlist.eq(0).parents("tr").find(".cgl-td6").html()) {
					isduo = "多个等级";
					break;
				} else {
					isduo = "";
				}
			}
			if(guid.split(",").length == 1) {
				tiaoz_add("当前违规等级<span>（" + checlist.eq(0).parents("tr").find(".cgl-td6").html() + "）</span>", guid);
			} else if(isduo == "多个等级") {
				tiaoz_add("当前违规等级<span>（" + isduo + "）</span>", guid);
			} else {
				tiaoz_add("当前违规等级<span>（" + checlist.eq(0).parents("tr").find(".cgl-td6").html() + "）</span>", guid);
			}
		}

	});
	$("#cgl-fstz1").click(function() {
		if($("#cgl-tbody").find(".thechec:checked").length == 0) {
			$(".cgl-jzz").html("请先选择要操作的项").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		} else {
			var guid = fnguid();
			//console.log(guid);
			var fstz = {
				"anticheatingids": guid
			};
			fnfstz(fstz);
			//fnwgjlzt(putdata);
		}

	});
}
//改变违规记录状态
function fnwgjlzt(putdata) {
	$('.layui-layer-close').click();
	$(".cgl-jzz").html("加载中，请稍后···").show();
	$(".cgl-zhezao").show();
	$.ajax({
		type: "put",
		url: "/webapi/earlywarningmanage/anticheating/dealtstatechange",
		data: putdata,
		error: function() {
			$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
		},
		success: function(data) {
			$(".cgl-jzz").hide();
			if(data.error) {
				$('.layui-layer-close').click();
				$(".cgl-jzz").html("操作失败").stop(true, true).delay(1000).fadeOut(100);
			}
			if(data["succeed"]) {
				/*var guidarr = putdata.anticheatingids.split(",");
				 for(var i = 0; i < guidarr.length; i++) {
				 $("tr").each(function(n) {
				 if($(this).attr("gu-id") == guidarr[i]) {
				 $(this).find(".cgl-td12").html(putdata.dealtstate);
				 $(this).remove();
				 $(".stateon").find("i").text($(".stateon").find("i").text() - 1);
				 }
				 });
				 }*/
				$(".cgl-zhezao").hide();
				state["lastindex"] = 0;
				fnshijian(state);
				$(".cgl-jzz").html("操作成功").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			}
		}
	});
}

function fnfenxi(num) {
    var num1=null,
        arr1=[];
    if(String(num).indexOf("e")>0){
        arr1=String(num).split("e");
        num1=Number(arr1[0]).toFixed(6)+" e"+arr1[1];
    }else{
        num1=num;
    }
    return num1;
}
//违规原因核销记录
function fnweigyy() {
	$("#cgl-tbody").on("click", ".cgl-td7>a", function() {
		var cont = "",
			cha = null,
			oparent = $(this).parents("tr");
		$(".cgl-zhezao").show();
		$.ajax({
			type: "get",
			url: "/webapi/earlywarningmanage/anticheating/causedetail/" + oparent.attr("gu-id"),
			data: "",
			error: function() {
				$(".cgl-jzz").html("加载失败").stop(true, true).fadeIn(500).delay(1000).fadeOut(100);
			},
			success: function(data) {
				console.log(data)
				cont = "<div class='yycont'>" +
					"<h2>" + oparent.find(".cgl-td2>p").text() + "</h2>"+
                    "<h3>违规描述</h3>" +
                    "<div style='padding: 0 0 6px;'>";
                if(oparent.find(".cgl-td7>p").text()!=""){
                    cont+=oparent.find(".cgl-td7>p").text();
                }else{
                    cont+="暂无原因";
                }
					cont+="</div><h3 class='wgdjc'>违规等级</h3>" +
					"<div class='djms'>最终评定" + oparent.find(".cgl-td6").text() + "，原始评定" + data["original_level"] + "，";
				cha = oparent.find(".cgl-td6").text().replace(/[^0-9]/ig, "") - data["original_level"].replace(/[^0-9]/ig, "");
				if(cha >= 0) {
					cont += "提升" + cha + "级";
				} else {
					cont += "降低" + -cha + "级";
				}

				cont+="</div>" +
					"<h3>与提升相关的违规记录</h3>" +
					"<div>";
				if(data["breakrulesrecord"]){
                    if(data["breakrulesrecord"].length==0){
                        cont+="暂无记录";
                    }else{
                        cont+="<table border='1'>" +
                            "<tr>" +
                            "<th width='182'>违规时间</th>" +
                            "<th width='89'>违规等级</th>" +
                            "<th>处罚措施</th>" +
                            "</tr>" +
                            "</table>";
                    }
				}else{
                    cont+="暂无记录";
				}
				cont+="</div>" +
					"<div class='table1'><table border='1'>";
				for(var k1 in data["breakrulesrecord"]) {
					cont += "<tr><td class='djtd1'>" + data["breakrulesrecord"][k1]["issuetime"] + "</td><td class='djtd2'>" + data["breakrulesrecord"][k1]["breakruleslevel"] + "</td><td class='djtd3'>" + data["breakrulesrecord"][k1]["measures"] + "</td></tr>";
				}
				cont += "</table></div>" +
                                "<h3 class='tianpfx'>天平分析</h3>" +
                                "<ul class='fxcont'>" +
                                    "<li>" +
                                        "<h4>消费者集中</h4><span>" + fnfenxi(data["arithmetic"]["value1"]) + "</span>" +
                                        "<p>消费者过于集中在固定的人群，新粉增加少的情况</p></li>" +
                                    "<li>" +
                                        "<h4>经济学模型重尾分布</h4><span>" + fnfenxi(data["arithmetic"]["value2"]) + "</span>" +
                                        "<p>从经济学分布角度统计各券各核销次数对应人数分布中的异常程度</p></li>" +
                                    "<li>" +
                                        "<h4>单人多券</h4><span>" + fnfenxi(data["arithmetic"]["value3"]) + "</span>" +
                                        "<p>一个消费者一次进点核销该店所有或过多超惠券的情况</p></li>" +
                                    "<li>" +
                                        "<h4>T分布统计</h4><span>" + fnfenxi(data["arithmetic"]["value4"]) + "</span>" +
                                        "<p>从概率统计分布角度统计各券各人核销次数分布中的异常程度</p></li>" +
                                    "<li>" +
                                        "<h4>Grosbby异常检测</h4><span>" + fnfenxi(data["arithmetic"]["value5"]) + "</span>" +
                                        "<p>从样本统计学角度统计各券各人核销次数的离群严重程度</p></li>" +
                                    "<li>" +
                                        "<h4>粗糙集分类统计</h4><span>" + fnfenxi(data["arithmetic"]["value6"]) + "</span>" +
                                        "<p>通过对券、消费者、核销次数、核销时间等多维度进行数学分类，统计在各种分类下的异常程度</p></li>" +
                                    "<li>" +
                                        "<h4>门店密集核销</h4><span>" + fnfenxi(data["arithmetic"]["value7"]) + "</span>" +
                                        "<p>核销间隔过短，一段时间内频率过高的情况</p>" +
                    "               </li>" +
                                "</ul>" +
                                "<div class='hxjl'>" +
                                "<h3>核销记录</h3>" +
					"</div>";
					if(data["verifylist"]){
                        cont+="<div class='hxjlpx'>" +
                            "<span class='onck'>密集核销</span>" +
                            "<span>消费者集中</span>" +
                            "<span>一人多券</span>" +
                            "</div>" +
                            "<div><table border='1'><thead>" +
                            "<tr>" +
                            "<th width='60'>消费者</th>" +
                            "<th width='90'>门店</th>" +
                            "<th width='99'>活动名称</th>" +
                            "<th width='67'>超惠券类型</th>" +
                            "<th width='86'>优惠内容</th>" +
                            "<th width='77'>门店核销金额</th>" +
                            "<th width='77'>双方位置距离</th>" +
                            "<th width='77'>是否在店核销</th>" +
                            "<th width='72'>核销时间</th>" +
                            "<th>密集程度</th>" +
                            "</tr></thead></table></div>" +
                            "<div class='table2'><table border='1'><tbody>";
                        cont += "</tbody></table></div>";
					}else{
						cont+="<p>暂无记录</p>";
					}
					cont+="<div class='cgl-yyclose'>" +
					"<span class='cgl-close'>关闭</span>" +
					"</div>" +
					"</div>";
				var index = layer.open({
					type: 5,
					title: "违规原因",
					area: ['962px', 'auto'],
					content: cont
				});
				layer.full(index);
				fnclose(index);
				if(data["verifylist"]){
                    fnshaixuan(data["verifylist"]);
				}

				$(".cgl-zhezao").hide();
			}
		});

	});
}
//核销排序
function fnpaixu(data, order) {
	var cont = "",
		cn = null;
	var colorarr = ["#f00", "#ff4a4a", "#ff6e6e", "#ff8585", "#ffc1c1", "#ffd9d9", "#ffe1e1", "#fff1f1"];
	if(data){
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < data.length; j++) {
                if(data[j][order] == i) {
                    cont += "<tr>" +
                        "<td class='jltd1'>" + data[j]["consumername"] + "</td>" +
                        "<td class='jltd2'>" + data[j]["retailername"] + "</td>" +
                        "<td class='jltd3'>" + data[j]["activitytitle"] + "</td>" +
                        "<td class='jltd4'>" + data[j]["itemkind"] + "</td>" +
                        "<td class='jltd5'>" + data[j]["ruletext"] + "</td>" +
                        "<td class='jltd6'>" + data[j]["verifymoney"] + "</td>" +
                        "<td class='jltd7'>暂无</td>" +
                        "<td class='jltd8'>暂无</td>" +
                        "<td class='jltd9'>" + data[j]["issuetime"] + "</td>" +
                        "<td class='jltd10' ";
                    if(parseInt(data[j]["timespan" + order.replace(/[^0-9]/ig, "")]) < 0) {
                        cont += "style='background:#fff'";
                    } else {
                        cn = parseInt(data[j]["timespan" + order.replace(/[^0-9]/ig, "")]);
                        if(cn < 30) {
                            cont += "style='background:" + colorarr[0] + "'";
                        } else if(cn < 60) {
                            cont += "style='background:" + colorarr[1] + "'";
                        } else if(cn < 150) {
                            cont += "style='background:" + colorarr[2] + "'";
                        } else if(cn < 300) {
                            cont += "style='background:" + colorarr[3] + "'";
                        } else if(cn < 600) {
                            cont += "style='background:" + colorarr[4] + "'";
                        } else if(cn < 1800) {
                            cont += "style='background:" + colorarr[5] + "'";
                        } else if(cn < 3600) {
                            cont += "style='background:" + colorarr[6] + "'";
                        } else {
                            cont += "style='background:" + colorarr[7] + "'";
                        }
                    }
                    cont += "></td>" +
                        "</tr>";
                }
            }
        }
        $(".table2").find("tbody").html(cont);
	}


	//同名同色
    if(order!="order1"){
        var alltr = $(".table2 tr");
        var con = 0;
        for(var n = 1; n < alltr.length; n++) {
            if(alltr.eq(n).find(".jltd1").html() != alltr.eq(n - 1).find(".jltd1").html()) {con++;}
            if(con % 2 != 0) {
                alltr.eq(n).css({
                    "background": "#f8f8f8"
                });
            }
        }
    }

}
//三种排序
function fnshaixuan(data) {
	fnpaixu(data, "order1");
	$(".hxjlpx").on("click", "span", function() {
		$(this).addClass("onck").siblings().removeClass("onck");
		if($(this).index() == 0) {
			fnpaixu(data, "order1");
		} else if($(this).index() == 1) {
			fnpaixu(data, "order2");
		} else if($(this).index() == 2) {
			fnpaixu(data, "order3");
		}
	});
}
$(function() {
	fnshijian(state);
	fnanniu4();//不同状态下四个按钮的显示
	fnxze1(); //处理与待处理
	fnxiala(); //下拉菜单
	fndate(); //发送时间
	fnfsdiqu(); //发送地区
	fnweignum(); //违规次数
	fnvipname(); //会员名称
	fnwgjb(); //违规级别
	fnanniu(); //四个按钮事件
	$("#cgl-tbody").on("click", "tr", function() {
		$(this).addClass("ckon").siblings().removeClass("ckon");
	});
	fncaozuo(); //操作按钮
	fnchec(); //单选复选
	fnreset(); //重置
	fnmore(); //点击加载更多
	fnweigyy(); //违规原因核销记录
	comSelect(); // 地区下拉调用
	selectCity(); //城市调用
});
