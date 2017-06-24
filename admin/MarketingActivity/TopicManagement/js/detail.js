// debugger
var topicId = parent.$('#guid').val();
if(topicId != ""){
	$.ajax({
	    type: "get",
	    url: '/webapi/ipaloma/topic/detail/' + topicId,
	    dataType: "json",
	    beforeSend: function (){ $('.loading').fadeIn() },
	    complete: function (){ $('.loading').fadeOut() },
	    success: function (detailData){
	    	console.log(JSON.stringify(detailData, null, 4));
	    	render(detailData);
	    },
	    error: function (xhr) {
	    	parent.layer.alert('获取详情数据失败: 错误'+ xhr.status, {icon: 5});
	    }
	});

}


function render(detailData){

	// 1.活动基础信息
	var first = $('.item.first');
	var activity = detailData.activity;
	//first.find('.guid').text(activity.activitycode);
	// first.find('.guid').text(activity.guid);
	first.find('.guid').html(activity.activitycode + "<i style='color:#fff;position:absolute;display:none;'>"+ activity.guid +"</i>");
	first.find('.description').text(activity.description);
	first.find('.begintime').text(activity.begintime);
	first.find('.endtime').text(activity.endtime);
	first.find('.earliestjointime').text(activity.earliestjointime);
	first.find('.latestjointime').text(activity.latestjointime);
	first.find('.state').text(activity.state);
	first.find('.activitytitle').text(activity.activitytitle);
	first.find('.servicephone').text(activity.servicephone);
	first.find('.choice').text(activity.singleselection == 0 ? "是" : "否");

	
	// 2.参与活动条件
	var second = $('.item.second');
	var area = detailData.area_condition;  // 活动地区
	for(var i=0; i<area.length; i++){
		$('.province-wrap').append("<div class='province-item'><label class='sheng'>"+ area[i].name +"</label><div class='region-info'><div shengfzr='"+ JSON.stringify(area[i].charge, null, 4) +"'>负责人 "+ area[i].charge.name +"</div><div class='province-item'></div></div></div>");
		for(var j=0; j<area[i].city.length; j++){
			$('.region-info .province-item:last').append("<div class='city'><i shifzr='"+ JSON.stringify(area[i].city[j].charge, null, 4) +"'>"+ area[i].city[j].name +"&nbsp;&nbsp;"+ area[i].city[j].charge.name +"</i></div><div class='district-wrap'></div>");
			for(var k=0; k<area[i].city[j].country.length; k++){
				// console.log(area[i].city[j].country[k].name);
				$('.district-wrap:last').append("<i quxian='"+ JSON.stringify(area[i].city[j].country[k], null, 4) +"'>"+ area[i].city[j].country[k].name +"</i>");
			}
		}
	}

	// 会员活动条件
	var actCond = detailData.activity_condition;
	for(var i=0; i<actCond.length; i++){

		// debugger;
		/*var type = "";
		switch (actCond[i].activitytype) {
			case "buycount":
				type = "买赠";
				break;
			case "package":
				type = "套餐";
				break;
			case "discount":
				type = "降价";
				break;
		}*/

		var operator = "";
		switch (actCond[i].discount.operator) {
			case "between":
				operator = "介于";
				break;
			case ">=":
				operator = "不低于";
				break;
			case ">":
				operator = "高于";
				break;
			/*
			 * 修复修改页面显示 == 的bug
			 */
			case "==":
				operator = "等于";
				break;
		}

		var str = "";
		if(actCond[i].discount.max){
			// alert(1);
			str = "<td width='180' class='mz'>赠品比例 <span class='operator'>"+ operator +"</span> <i>买</i> "+ actCond[i].discount.max +" <i>赠</i> "+ actCond[i].discount.min +"</td>";
		} else{
			// alert(0);
			str = "<td width='180' class='mz'>赠品比例 <span class='operator'>"+ operator +"</span> <span>"+ actCond[i].discount.min +" <i style='color:#999'>%</i></span></td>";
		}

		$('table.activity-condition tbody').append("<tr><td width='80'>"+ actCond[i].activitytype +"</td>"+ str +"<td>"+ actCond[i].retailer_count.min +"-"+ actCond[i].retailer_count.max +"</td></tr>");
	}

	// 主办方
	// debugger
	var sponsor = detailData.sponsor;
	var zbf = $('span.zbf');
	switch(sponsor){

		case "distributor":
			zbf.text('分销商');
			break;

		case "supplier":
			zbf.text('厂商');
			break;

		case "retailer":
			zbf.text('门店');
			break;

		case "consumer":
			zbf.text('消费者');
			break;

	}

	// 参与会员
	// debugger
	var distributor = detailData.distributor_condition;
	if(!$.isEmptyObject(distributor)){
		canyuHy(distributor, "分销商");
	}

	var consumer = detailData.consumer_condition;
	if(!$.isEmptyObject(consumer)){
		canyuHy(consumer, "消费者");
	}

	var retailer = detailData.retailer_condition;
	if(!$.isEmptyObject(retailer)){
		canyuHy(retailer, "门店");
	}

	function canyuHy(type, txt){

		if(type.number_range){
			$('table.canyu').append("<tr singleselection="+ type.singleselection +"><td width='80'>"+ txt +"</td><td width='80'>"+ type.number_range.min +" - "+ type.number_range.max +"</td><td></td></tr>");

		} else {
			$('table.canyu').append("<tr singleselection="+ type.singleselection +"><td width='80'>"+ txt +"</td><td width='80'>"+ '' +" - "+ '' +"</td><td></td></tr>");
		} 

		// debugger
		if(type.核销次数){
			condType(type.核销次数, "核销次数","次");
		}
		if(type.核销人数){
			condType(type.核销人数, '核销人数',"名");
		}
		if(type.惠粉数){
			condType(type.惠粉数, '惠粉数',"名");
		}
		if(type.粉丝留存率){
			condType(type.粉丝留存率, '粉丝留存率',"%");
		}
		if(type.会员时长){
			condType(type.会员时长, '会员时长',"天");
		}
		if(type.会员等级){
			condType(type.会员等级, '会员等级',"天");
		}
		if(type.分销商类型){
			condType(type.分销商类型, '分销商类型');
		}
	}

	function condType(ctype, typeTxt,unitType){
		var bgt1 = new Date(activity.begintime) * 1;
		var bgt2 = new Date(ctype.begintime) * 1;
		var prevDays = (bgt1 - bgt2) / 86400000;
		var range = ctype.max ? ctype.max : ctype.min;

		var str = "";
		if(ctype.operator == "between"){
			ctype.operator = "介于";
			str = ctype.operator +" <i>"+ ctype.min +"</i> - <i>"+ ctype.max +"</i>";
		} else if(ctype.operator == ">="){
			ctype.operator = "不低于";
			var str = "&nbsp;"+ ctype.operator +"<i>"+ range +"</i>";
		} 
		else if(ctype.operator == "=="){
			ctype.operator = "==";
			var str = "&nbsp;&nbsp;&nbsp;"+ ctype.operator + " " + ctype.value;
		}
		var timeunit = isNaN(prevDays) ? "" : ctype.timeunit;
		
		/*
		 * 修复详情页时间--数字显示错误
		 */
		if(timeunit == "月"){
//			console.log(prevDays/30)
			prevDays = isNaN(prevDays) ? "" : Math.round(prevDays/30);
			prevDays = prevDays + "个";
		}else{
			/*
			 * 修改详情页面中整数天数显示位小数的bug
			 */
			prevDays = isNaN(prevDays) ? "" : parseInt(prevDays);//  
		}	
		
//		console.log(prevDays)
		// debugger;
		if(typeTxt == "分销商类型"){
//			$('table.canyu tr:last td:last').append("<p guid="+ ctype.guid +" state="+ ctype.state +">"+ typeTxt + str +"</p>");
			$('table.canyu tr:last td:last').append("<p guid="+ ctype.guid +" state="+ ctype.state +">"+ typeTxt + "&nbsp;&nbsp;&nbsp;" + ctype.value +"</p>");
			return;
		}
		
		/*
		 * 修复活动开始时、至今 详情页显示的bug
		 * 粉丝留存率在详情页显示问题，正确显示为 %
		 * 会员时长在详情页显示问题，正确显示为 天
		 */		
		if(ctype.statisticrange == "活动开始时" || ctype.statisticrange == "至今"){
			$('table.canyu tr:last td:last').append("<p guid="+ ctype.guid +" state="+ ctype.state +"><span class='typeTxt'>"+ typeTxt +"</span> "+ ctype.statisticrange +" "+ " <i>"+ timeunit +"　</i>"+ str +""+ unitType +"</p>");			
		}else{
			$('table.canyu tr:last td:last').append("<p guid="+ ctype.guid +" state="+ ctype.state +"><span class='typeTxt'>"+ typeTxt +"</span> "+ ctype.statisticrange +" "+ prevDays +"<i>"+ timeunit +"　</i>"+ str +""+ unitType +"</p>");
		}		
		
	}


	// 3.活动补贴规则
	var fourth = $('.item.fourth');
	var butie = detailData.event_handler_list;
	var yaofz = 0;
	for(var i=0; i<butie.length; i++){

		var randfz = 0;
		var btduixiang = "";
		switch(butie[i].refund_to){
		    case "distributor": btduixiang = '分销商'; break;
		    case "distributor_employee": btduixiang = '分销商业务员'; break;
		    case "retailer": btduixiang = '门店'; break;
		    case "retaileremployee": btduixiang = '门店店员'; break;
		    case "retailer_employee": btduixiang = '门店店员'; break;
		    case "consumer": btduixiang = '消费者'; break;
		}

		/*var btCond = "";
		switch(butie[i].event){
			case "distributorinviteretailer": btCond = '门店签约分销商'; break;
			case "register": btCond = '注册'; break;
			case "invitefan": btCond = '成功邀请朋友关注'; break;
			case "verify": btCond = '首次核销?'; break;
			case "verify_first": btCond = '首次核销'; break;
			case "verify_normal": btCond = '非首次核销'; break;
			case "shareverify": btCond = '分享核销结果'; break;
			case "shareticket": btCond = '分享超惠券'; break;
			case "shareretailer": btCond = '分享门店'; break;
			case "openretailer": btCond = '自主开店'; break;
			case "openmemsys": btCond = '开通会员系统'; break;
		}*/
	
		/*var btType = "";
		switch(butie[i].refund_content){
			case "randompoints": btType = '随机积分'; break;
			case "fixedpoints": btType = '固定积分'; break;
			case "fixedmoney": btType = '固定金额'; break;
			case "randommoney": btType = '随机金额'; break;
			case "randommoney": btType = '随机金额'; break;
			case "randomredpacket": btType = '随机微信红包'; break;
			case "fixedredpacket": btType = '固定微信红包'; break;
			case "randommoneyticket": btType = '随机金额返现券'; break;
		}*/

		// debugger
		var danwei = "";
		if(butie[i].refund_content.indexOf('积分') != -1){
			danwei = "分";
		} else if(butie[i].refund_content.indexOf('金额') != -1 || 
			butie[i].refund_content.indexOf('红包') != -1 || 
			butie[i].refund_content == '摇一摇'){
			danwei = "元";
		}

		var valTxt = valTxt = "<i class='valTxt'>"+ Number(butie[i].crest).toFixed(2) + "</i>";
		
		// if(butie[i].refund_content.indexOf('随机') != -1){
		// 	butie[i].probability.value_curve.forEach( function(item, index) {
		// 		randfz += ((Number(item.min) + Number(item.max)) / 2) * (item.percentage / 100);
		// 		valTxt = "<i class='valTxt'>"+ Number(randfz).toFixed(2) + "</i>";
		// 	});
		// }

		var rangeStr = "";

		if(butie[i].refund_content == '摇一摇'){
			var yaofz1 = 0;
			var refund_content = "";
			butie[i].prize_content.forEach( function(item, index) {
				yaofz += Number(item.applycount);
				// yaofz1 += Number(item.applycount);
				refund_content += item.refund_content + '</br>';
			});
			// valTxt = "<i class='valTxt'>"+ Number(butie[i].crest).toFixed(2) + "</i>";
			rangeStr = ""+ refund_content +"</td><td>"+ butie[i].ceiling +
			"</td><td class='btfz'>"+ valTxt +"<i>"+ danwei +"</i></td>";

		} else {
			var num = !butie[i].max || butie[i].max == "" ? Number(butie[i].min).toFixed(2) : butie[i].min +"-"+ butie[i].max;
			rangeStr = "<span class='fl'>"+ num +
			"</span><span class='fr dw'><i>"+ danwei +"</i>/次</span></span></td><td>"+ butie[i].ceiling +
			"</td><td class='btfz'>"+ valTxt +"<i>"+ danwei +"</i></td>";
		}


	    // debugger;
		var pointIndex = butie[i].applycount.indexOf('.');
		var applycount = pointIndex == -1 ? butie[i].applycount : butie[i].applycount.substring(0, pointIndex + 3);

		// debugger;
		$('table.butie').append("<tr limit='"+ JSON.stringify(butie[i].limit, null, 4) +
			"' probability='"+ JSON.stringify(butie[i].probability, null, 4) +
			"'><td>"+ btduixiang +
			"</td><td><span class='fxs' title='"+ butie[i].event +"'>"+ butie[i].event +
			"</span></td><td>"+ butie[i].refund_content +"</td><td><span class='clr jifen'>"+ rangeStr +
			"</span><td class='sbys'><i class='valTxt'>"+ applycount +
			"</i><i>"+ danwei +"</i></td></tr>");

	}

	// $('table.butie tr:contains(摇一摇) td.sbys i:eq(1)').text('次');
	$('table.butie tr:contains(摇一摇)').find('td.sbys i:eq(1)').text('次');

	// debugger;
	var yuan = 0;
	$('td.btfz:contains(元) .valTxt').each(function(){
		if($(this).text() == ""){return false;}
		yuan += parseFloat($(this).text());
	});

	$('.totalYuan').text(Number(yuan).toFixed(2));

//	var fen = 0;
//	$('td.btfz:contains(分) .valTxt').each(function(){
//		if($(this).text() == ""){return false;}
//		fen += parseInt($(this).text());
//	});
//
//	$('.totalFen').text(fen);


	var sbysYuan = 0;
	$('td.sbys:contains(元) .valTxt').each(function(){
		if($(this).text() == ""){return false;}
		sbysYuan += parseFloat($(this).text());
	});

	$('.totalSbysYuan').text(Number(sbysYuan + yaofz).toFixed(2));


//	var sbysFen = 0;
//	$('td.sbys:contains(分) .valTxt').each(function(){
//		if($(this).text() == ""){return false;}
//		sbysFen += parseInt($(this).text());
//	});
//
//	$('.totalSbysFen').text(sbysFen);


	// 4.宣传图文资料
	var propagation = detailData.propagation;
	for(var i=0; i<propagation.length; i++){
		switch (propagation[i].object) {
			case "distributor":
				prop($('.area.fenxiaoshang'), i);
				break;
			case "retailer":
				prop($('.area.mendian'), i);
				break;
			case "consumer":
				prop($('.area.xiaofeizhe'), i);
				break;
		}
	}

	function prop(area, i){
		area.show();
		area.find('.activitytitle').text(propagation[i].activitytitle);
		area.find('.wechattitle').text(propagation[i].wechattitle);
		area.find('.propagation').text(propagation[i].propagation);
		area.find('.posterurl').attr("src",propagation[i].poster_url);
	}

	AddButon(detailData);

}

//var buttonDictionary = {
//	"上架,正在进行中,待活动开始": '<span class="btn btn-close close">关闭</span><span class="btn warn xiajia">下架</span>',
//	"草稿,审核中,审核失败,待发布": '<span class="btn btn-close close">关闭</span><span class="btn warn xiugai">修改</span>',
//	"已过期,已结束,已下架":'<span class="btn btn-close close">关闭</span>'
//};
var buttonDictionary = {
	"上架,正在进行中,待活动开始": '<span class="btn btn-close close">关闭</span><span class="btn warn xiajia">下架</span>',
	"审核失败,待发布": '<span class="btn btn-close close">关闭</span><span class="btn warn xiugai">修改</span>',
	"已结束":'<span class="btn btn-close close">关闭</span>',
	"已过期":'<span class="btn btn-close close">关闭</span><span class="btn warn xiugai">修改</span>',
	"已下架":'<span class="btn btn-close close">关闭</span><span class="btn warn xiugai">修改</span><span class="btn warn shangjia">上架</span>',
	"审核中":'<span class="btn btn-close close">关闭</span><span class="btn warn xiugai">修改</span><span class="btn warn btn_y">驳回</span><span class="btn warn btn_y">审核通过</span><span class="btn warn btn_y">立即发布</span>',
	"草稿":'<span class="btn btn-close close">关闭</span><span class="btn warn xiugai">修改</span><span class="btn warn btn_y">提交审核</span><span class="btn warn btn_y">审核通过</span><span class="btn warn btn_y">立即发布</span>'
};


function AddButon(detailData){

	var currentState = detailData.activity.state; $('.currentState').val(currentState);
	var appendKey = $.Enumerable.From(Object.keys(buttonDictionary)).First(function (x) {
	    return x.match(currentState) != null;
	});

	if (null != appendKey){
		$(".footer.btn-group").append(buttonDictionary[appendKey]);
	}
	
}

function closeLayer(){
	var index = parent.layer.getFrameIndex(window.name);
    parent.layer.close(index);
}

$(document).on('click','.xiugai',function(){
	parent.window.location.href = "activityModify.html?guid=" + topicId;

}).on('click','.close',function(){
    closeLayer();

})
//.on('click','.xiajia',function(){

/*
 * 上架
 */
        $(document).on('click','.shangjia',function(){
            $.ajax({
                type: "put",
                url: "/webapi/ipaloma/topic/operation/" + topicId,
                async: true,
                data: {
                    "currentstate": $('.currentState').val(),
                    "optype": '上架'
                },
                success: function (data) {
                    if (data.error)
                        parent.layer.alert("出错了^_^");
                    parent.$('.query').click();
                    parent.layer.alert("上架成功");
                    closeLayer();
//                  parent.basicQuery();
                },
                error: function (xhr, textStatus) {
                    parent.layer.alert("出错了^_^");
                    console.log(textStatus);
                }

            });
             

        });
/*
 * “驳回”、“提交审核”、“审核通过”、“立即发布”按钮
 */
	$(document).on('click','.btn_y',function(){
			var op = $(this).text()
			console.log(op)
            $.ajax({
                type: "put",
                url: "/webapi/ipaloma/topic/operation/" + topicId,
                async: true,
                data: {
                    "currentstate": $('.currentState').val(),
                    "optype": op
                },
                success: function (data) {
                    if (data.error)
                        parent.layer.alert("出错了^_^");
                    parent.$('.query').click();
                    parent.layer.alert(op + " 成功");
                    closeLayer();
                },
                error: function (xhr, textStatus) {
                    parent.layer.alert("出错了^_^");
                    console.log(textStatus);
                }

            });
             

        });


$(document).on('click','.xiajia',function(){

	$.ajax({

        type: "put",
        url: "/webapi/ipaloma/topic/operation/" + topicId,
        async: true,
        data: {
            ["currentstate"]: $('.currentState').val(),
            ["optype"]: "下架"
        },

        success: function (data) {

            if (data.error){
                parent.layer.alert("出错了^_^");
            }

            parent.$('.query').click();
            parent.layer.alert("下架成功");
            closeLayer();

        },

        error: function (xhr, textStatus) {
            parent.layer.alert("出错了^_^");
            console.log(textStatus);
        }

    });

});