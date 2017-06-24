/**
 * 组装分页
 * @param totalPage
 */
function assemblePage(totalPage) {
    var pageTool = "";
    pageTool += "<li class='front'>...</li>";
    for (var i = 1; i <= totalPage; i++) {
        if (i == 1) {
            pageTool += "<li class='pitchOn'><a href='javascript:goPage(1);'>1</a></li>";
        } else {
            pageTool += "<li><a href='javascript:goPage(" + i + ");'>" + i + "</a></li>";
        }
    }
    pageTool += "<li class='back'>...</li>";
    $(".pagenum").html(pageTool);
    //
    $('.front').hide();
    $('.back').hide();
    var lis = $('.pagenum li'),
        //当面页数
        //page = getUrlParam('page'),
        page = parseInt($("#currentPage").val()),
        //总页数
        total_page = lis.size() - 2;
    if (page == null) {
        page = 1;
    }
    if (total_page > 5) {
        lis.hide();
        $('.pagenum').children().eq(page).show();
        //前面省略号
        if (page > 3) {
            $('.front').show();
        }
        if (page > 2) {
            $('.pagenum').children().eq(parseInt(page) - 2).show();
        }
        if (page > 1) {
            $('.pagenum').children().eq(parseInt(page) - 1).show();
        }
        //后面省略号
        if (parseInt(page) + 2 < total_page) {
            $('.back').show()
        }
        if (parseInt(page) + 1 <= total_page && parseInt(page) != total_page) {
            $('.pagenum').children().eq(parseInt(page) + 1).show();
        }
        if (parseInt(page) < total_page && parseInt(page) + 1 != total_page) {
            $('.pagenum').children().eq(parseInt(page) + 2).show();
        }
        $('.s-page').show();
        $('.x-page').show();
        if (page == 1) {
            $('.s-page').hide();
        }
        if (page == total_page) {
            $('.x-page').hide();
        }
    }
    lis.attr('class', '');
    $('.pagenum').children().eq(page).attr('class', 'pitchOn');
}

/**
 * 查看审核不通过原因
 */
function showCheckOpinions() {
    $('.hd-sh').bind("click", function () {
        //获取当前已审核对象
        var activityid = $(this).parent().attr("guid");
        var checkedObj = null;
        var checkedActivitys = localStorage.getItem("checkedActivitys");
        if (checkedActivitys != null) {
            var checkedActivitys_jsonArray = JSON.parse(checkedActivitys);
            //checkedObj = checkedActivitys_jsonArray.data[0];//测试
            for(var i=0;i<checkedActivitys_jsonArray.data.length;i++){
               if(activityid == checkedActivitys_jsonArray.data[i].activity.guid){
                   checkedObj = checkedActivitys_jsonArray.data[i];
                   break;
               }
            }
        }
        var checkedActivity = checkedObj.activity;
        var distributor = checkedObj.distributor;
        //获取审核意见
        var o_title = "",
            o_changeexplain = "",
            o_customerrequest = "",
            o_detail = "",
            o_postpic = "",
            o_remark = "";
        if (checkedActivity.approveresult != "succeed") {
            var checkResultObj = JSON.parse(checkedActivity.approvereason);
            o_title = checkResultObj.title;
            o_changeexplain = checkResultObj.changeexplain;
            o_customerrequest = checkResultObj.customerrequest;
            o_detail = checkResultObj.detail;
            o_postpic = checkResultObj.postpic;
            o_remark = checkResultObj.remark;
        }
        //弹出审核详情窗
        $('.hd-guizebox').show();
        $('.hd-guizebox').animate({ 'right': '0' }, 300);
        $('.hd-guize-top').animate({ 'right': '0' }, 300);
        $('.zbtn-box-w1').animate({ 'right': '0' }, 300);
        //获取审核内容并显示
        $("#activitytitle").text(checkedActivity.activitytitle);
        $("#activitytitle2").text(checkedActivity.activitytitle);
        var beginTime = checkedActivity.begintime;
        beginTime = beginTime.substring(0, beginTime.length - 3);
        var endtime = checkedActivity.endtime;
        endtime = endtime.substring(0, endtime.length - 3);
        $("#begintime").text(beginTime);
        $("#endtime").text(endtime);
        $("#servicephone").text(checkedActivity.servicephone);
        // 活动更正说明的状态
        
            // $("#changedexplain").html(checkedActivity.changedexplain);
            if(checkedActivity.changedexplain){
                if (checkedActivity.ischanged == 1) {
                 $("#changedexplain").html(checkedActivity.changedexplain);
                 $(".titsupplementCorrections").css("display","block");
                 $(".btn-box-close_Corrections").css("display","block");
            }
            }else{
                 $(".titsupplementCorrections").css("display","none");
                 $(".btn-box-close_Corrections").css("display","none");
            }
        
        // 门店要求
        //  $("#customerrequest").html(checkedActivity.customerrequest);
        if(checkedActivity.customerrequest){
             $("#customerrequest").html(checkedActivity.customerrequest);
              $(".titsupplement").css("display","block");
             $(".btn-box-close").css("display","block");
        }else{
             $(".titsupplement").css("display","none");
             $(".btn-box-close").css("display","none");
        }
       
        // $("#description").html(checkedActivity.description);
        // 查看补充信息的状态
        if(checkedActivity.description){
             $("#description").html(checkedActivity.description);
             $(".titsupplement6").css("display","block");
             $(".btn-box-close6").css("display","block");
        }else{
             $(".titsupplement6").css("display","none");
             $(".btn-box-close6").css("display","none");
        }
            // 齐枭飞添加的逻辑（改动）         start------------
        if(checkedActivity.posterpic==""){
             $(".titsupplement1").css("display","none");
             $(".btn-box-close1").css("display","none");
        }else{
            $("#posterpic").find("a").attr("href", checkedActivity.posterpic);//链接
            $("#posterpic").find("img").attr("src", checkedActivity.posterpic);//图片路径
            $(".titsupplement1").css("display","block");
            $(".btn-box-close1").css("display","block");
        }
        // $("#posterpic").find("a").attr("href", checkedActivity.posterpic);
        // $("#posterpic").find("img").attr("src", checkedActivity.posterpic);
        //获取活动优惠信息并显示
        getactivityitem(checkedActivity.alias_domain, checkedActivity.approveresult, checkedActivity.guid);
        //显示通过、不通过标记
        if (o_title == "") {
            $(".tg[type=1]").show();//按钮
            $(".opinion-box2[type=1]").hide();//审核意见区域
        } else {
            $(".btg[type=1]").show();
            $(".opinion-box2[type=1]").children(":eq(1)").text(o_title);//审核意见取值
        }
        if (o_changeexplain == "") {
            $(".tg[type=3]").show();
            $(".opinion-box2[type=3]").hide();
        } else {
            $(".btg[type=3]").show();
            $(".opinion-box2[type=3]").children(":eq(1)").text(o_changeexplain);//审核意见取值
        }
        if (o_customerrequest == "") {
            $(".tg[type=4]").show();
            $(".opinion-box2[type=4]").hide();
        } else {
            $(".btg[type=4]").show();
            $(".opinion-box2[type=4]").children(":eq(1)").text(o_customerrequest);//审核意见取值
        }
        if (o_detail == "") {
            $(".tg[type=5]").show();
            $(".opinion-box2[type=5]").hide();
        } else {
            $(".btg[type=5]").show();
            $(".opinion-box2[type=5]").children(":eq(1)").text(o_detail);//审核意见取值
        }
        if (o_postpic == "") {
            $(".tg[type=2]").show();
            $(".opinion-box2[type=2]").hide();
        } else {
            $(".btg[type=2]").show();
            $(".opinion-box2[type=2]").children(":eq(1)").text(o_postpic);//审核意见取值
        }
        if (o_remark == "") {
            $(".tg[type=6]").show();
            $(".opinion-box2[type=6]").hide();
        } else {
            $(".btg[type=6]").show();
            $(".opinion-box2[type=6]").children(":eq(1)").text(o_remark);//审核意见取值
        }
    });
}
/**
 * 获取活动优惠信息
 */
function getactivityitem(sandbox, approveresult, activityid) {
    $.ajax({
        type: 'get',
        url: '/webapi/auditplatform/activities/' + sandbox + '/' + activityid,
       
        success: function (msg) {
            if (msg.error == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            localStorage.setItem("checkedActivityitem", JSON.stringify(msg));
            if (msg != "" && msg != null && msg.succeed == "succeed") {
                var items = msg.data;
                // 齐枭飞添加
                    var youli = "";
                    var maizeng = "";
                    var taocan = "";
                    var jiangjia = "";
                    var linqi = "";
                for (var i = 0; i < items.length; i++) {
                    var itemKind = items[i].itemkind;
                    var itemPic = items[i].itempic;
                    var itemjsoncontent = items[i].itemjsoncontent;
                        if (itemKind == "有礼") {
                        if (itemjsoncontent != null && itemjsoncontent != "") {
                            var itemjsoncontentObj = JSON.parse(itemjsoncontent);                            
                            itemjsoncontentObj.ruledesc=itemjsoncontentObj.ruledesc||"备注:";
                            alert(1);
                            // 齐枭飞添加
                                youli+="<div class='prolist' id='youli'>";
                                youli+="<div class='biaoqian'> 有礼 </div>";
                                youli+="<div class='prolist-l'>";
                                youli+="<div class='box-info2'>";
                                youli+=" 购<span id='activitytitle_yl'>"+itemjsoncontentObj.activitytitle+"</span>";
                                youli+=" 赠 <span id='giftname_yl'>"+itemjsoncontentObj.giftname+"</span>";
                                youli+="</div>";
                                youli+="<div class='box-info21' id='ruledesc_yl'>"+itemjsoncontentObj.ruledesc+"</div>";
                                youli+="</div>";
                                youli+="<div class='prolist-r'>";
                                youli+="<div class='proimg'>";
                                youli+="<img id='itemPic_yl' src='"+items[i].itempic+"'/>";
                                youli+="<div class='biaoqian'>有礼 </div>";
                                youli+="</div>";
                                youli+="</div>";
                                youli+="</div>";
                            // $("#activitytitle_yl").text(itemjsoncontentObj.activitytitle);
                            // $("#giftname_yl").text(itemjsoncontentObj.giftname);
                            
                            // // 齐枭飞添加
                           $("#yoouli").html(youli);
                           // $("#itemPic_yl").attr("src", itemPic);
                            // if(!itemjsoncontentObj.ruledesc){
                            //    $(".box-info21").html("备注：");
                            // }else{
                            //      $(".box-info21").html(itemjsoncontentObj.ruledesc);
                            // //$("#ruledesc_yl").html(itemjsoncontentObj.ruledesc);
                            // }
                        }
                    } else if (itemKind == "套餐") {
                        // $("#taocan").show();
                        
                        if (itemjsoncontent != null && itemjsoncontent != "") {
                            var itemjsoncontentObj = JSON.parse(itemjsoncontent);
                            itemjsoncontentObj.ruledesc=itemjsoncontentObj.ruledesc||"备注:";
                                // 齐枭飞添加
                            taocan+="<div class='prolist' id='taocan'>";
                            taocan+="<div class='biaoqian'>套餐</div>";
                            taocan+="<div class='prolist-l'>";
                            taocan+="<div class='box-info2'>";
                            taocan+="购<span id='activitytitle_tc'>"+itemjsoncontentObj.activitytitle+"</span>";
                            taocan+="</div>";
                            taocan+="<div class='box-info3-w'>";
                            taocan+="<div class='box-info3'>";
                            taocan+="原价：<span id='originalprice_tc'>"+"￥" + itemjsoncontentObj.originalprice+"</span>";
                            taocan+="</div>";
                            taocan+="<div class='box-info3'>";
                            taocan+="现价：<span id='discountprice_tc'>"+"￥" + itemjsoncontentObj.discountprice+"</span>";
                            taocan+="</div>";
                            taocan+="<div class='box-info3'>";
                            taocan+="已节省<span id='sparevalue_tc'>"+"： ￥" + itemjsoncontentObj.sparevalue+"</span>";
                            taocan+="</div>";
                            taocan+="</div>";
                            taocan+="<div class='box-info21' id='ruledesc_tc'>"+itemjsoncontentObj.ruledesc+"</div>";
                            taocan+="</div>";
                            taocan+="<div class='prolist-r'>";
                            taocan+="<div class='proimg'>";
                            taocan+="<img id='itemPic_tc' src='"+items[i].itempic+"'/>";
                            taocan+="<div class='biaoqian'>套餐</div>";
                            taocan+="</div>";
                            taocan+="</div>";
                            taocan+="</div>";
                            // $("#activitytitle_tc").text(itemjsoncontentObj.activitytitle);
                            // $("#originalprice_tc").text("￥" + itemjsoncontentObj.originalprice);
                            // $("#discountprice_tc").text("￥" + itemjsoncontentObj.discountprice);
                            // $("#sparevalue_tc").text("： ￥" + itemjsoncontentObj.sparevalue);
                            // 齐枭飞添加
                            
                            $("#taocan").html(taocan);
                            // $("#itemPic_tc").attr("src", itemPic);
                            // if(!itemjsoncontentObj.ruledesc){
                            //     $(".box-info21").html("备注：");
                            // }

                            // $("#ruledesc_tc").html(itemjsoncontentObj.ruledesc);
                        }
                    } else if (itemKind == "买赠") {
                        // $("#maizeng").show();
                        
                        if (itemjsoncontent != null && itemjsoncontent != "") {
                            var itemjsoncontentObj = JSON.parse(itemjsoncontent);
                            // 齐枭飞添加
                             itemjsoncontentObj.ruledesc=itemjsoncontentObj.ruledesc||"备注:";
                            maizeng+="<div class='prolist' id='maizeng'>";
                            maizeng+="<div class='biaoqian'>买赠</div>";
                            maizeng+="<div class='prolist-l'>";
                            maizeng+="<div class='box-info31'>";
                            maizeng+="购<span id='activitytitle_mz'>"+itemjsoncontentObj.activitytitle+"</span>";
                            maizeng+="</div>";
                            maizeng+="<div class='box-info3-w'>";
                            maizeng+="<div class='box-info3'>";
                            maizeng+="价格：<span id='unitprice_mz'>"+"￥" + itemjsoncontentObj.unitprice+"</span>";
                            maizeng+="</div>";
                            maizeng+="<div class='box-info3'>";
                            maizeng+="买：<span id='bycount_mz'>"+itemjsoncontentObj.buycount+"</span>";
                            maizeng+="</div>";
                            maizeng+="<div class='box-info3'>";
                            maizeng+="赠<span id='giftcount_mz'>"+ +itemjsoncontentObj.giftcount+"</span>";
                            maizeng+="</div>";
                            maizeng+="</div>";
                            maizeng+="<div class='box-info21' id='ruledesc_mz'>"+itemjsoncontentObj.ruledesc+"</div>";
                            maizeng+="</div>";
                            maizeng+=" <div class='prolist-r'>";
                            maizeng+="<div class='proimg'>";
                            maizeng+="<img id='itemPic_mz' src='"+items[i].itempic+"' />";
                            maizeng+="<div class='biaoqian'>买赠</div>";
                            maizeng+="</div>";
                            maizeng+="</div>";
                            maizeng+="</div>";
                            // $("#activitytitle_mz").text(itemjsoncontentObj.activitytitle);
                            // $("#unitprice_mz").text("￥" + itemjsoncontentObj.unitprice);
                            // $("#bycount_mz").text(itemjsoncontentObj.buycount);
                            // $("#giftcount_mz").text(+itemjsoncontentObj.giftcount);
                            // // 齐枭飞添加
                            
                            $("#maizeng").html(maizeng);
                            // $("#itemPic_mz").attr("src", itemPic);
                            //齐枭飞添加备注标题
                            // if(!itemjsoncontentObj.ruledesc){
                            //     $(".box-info21").html("备注：");
                            // }
                                
                            
                            // $("#ruledesc_mz").html(itemjsoncontentObj.ruledesc);
                        }
                    } else if (itemKind == "降价") {
                        // $("#jiangjia").show();
                        
                        if (itemjsoncontent != null && itemjsoncontent != "") {
                            var itemjsoncontentObj = JSON.parse(itemjsoncontent);
                            // 齐枭飞添加
                            // 
                             itemjsoncontentObj.ruledesc=itemjsoncontentObj.ruledesc||"备注:";
                            jiangjia+="<div class='prolist' id='jiangjia'>";
                            jiangjia+="<div class='biaoqian'>降价</div>";
                            jiangjia+="<div class='prolist-l'>";
                            jiangjia+="<div class='box-info31'>";
                            jiangjia+="购<span id='activitytitle_jj'>"+itemjsoncontentObj.activitytitle+"</span>";
                            jiangjia+="</div>";
                            jiangjia+="<div class='box-info3-w'>";
                            jiangjia+="<div class='box-info3'>";
                            jiangjia+="原价：<span id='originalprice_jj'>"+"￥" + itemjsoncontentObj.originalprice+"</span>";
                            jiangjia+="</div>";
                            jiangjia+="<div class='box-info3'>";
                            jiangjia+="优惠价：<span id='discountprice_jj'>"+"￥" + itemjsoncontentObj.discountprice+"</span>";
                            jiangjia+="</div>";
                            jiangjia+="<div class='box-info3'>";
                            jiangjia+="折扣价：<span id='discount_jj'>"+itemjsoncontentObj.discount + "折"+"</span>";
                            jiangjia+="</div>";
                            jiangjia+="</div>";
                            jiangjia+="<div class='box-info21' id='ruledesc_jj'>"+itemjsoncontentObj.ruledesc+"</div>";
                            jiangjia+="</div>";
                            jiangjia+="<div class='prolist-r'>";
                            jiangjia+="<div class='proimg'>";
                            jiangjia+="<img id='itemPic_jj' src='"+items[i].itempic+"'/>";
                            jiangjia+="<div class='biaoqian'>降价</div>";
                            jiangjia+="</div>";
                            jiangjia+="</div>";
                            jiangjia+="</div>";
                            $("#jiangjia").html(jiangjia);
                            // $("#itemPic_jj").attr("src", itemPic);
                            // 齐枭飞添加备注标题
                            // if(!itemjsoncontentObj.ruledesc){
                            //     $(".box-info21").html("备注：");
                            // }              
                            // $("#ruledesc_jj").html(itemjsoncontentObj.ruledesc); 
                        }
                        // 齐枭飞添加的“临期”
                    } else if (itemKind == "临期特卖") {
                        // $("#linqi").show();
                        if (itemjsoncontent != null && itemjsoncontent != "") {
                            var itemjsoncontentObj = JSON.parse(itemjsoncontent);
                            // 齐枭飞添加
                             itemjsoncontentObj.ruledesc=itemjsoncontentObj.ruledesc||"备注:";
                            linqi+="<div class='prolist' id='linqi'>";
                            linqi+="<div class='biaoqian'>临期</div>";
                            linqi+="<div class='prolist-l'>";
                            linqi+="<div class='box-info31'>";
                            linqi+="购<span id='activitytitle_lq'>"+itemjsoncontentObj.activitytitle+"</span>";
                            linqi+="</div>";
                            linqi+="<div class='box-info3-w'>";
                            linqi+="<div class='box-info3'>";
                            linqi+="原价：<span id='originalprice_lq'>"+"￥" + itemjsoncontentObj.originalprice+"</span>";
                            linqi+="</div>";
                            linqi+="<div class='box-info3'>";
                            linqi+="优惠价：<span id='discountprice_lq'>"+"￥" + itemjsoncontentObj.discountprice+"</span>";
                            linqi+="</div>";
                            linqi+="<div class='box-info3'>";
                            linqi+="折扣价：<span id='discount_lq'>"+itemjsoncontentObj.discount + "折"+"</span>";
                            linqi+="</div>";
                            linqi+="</div>";
                            linqi+="<div class='box-info21' id='ruledesc_lq'>"+itemjsoncontentObj.ruledesc+"</div>";
                            linqi+="</div>";
                            linqi+="<div class='prolist-r'>";
                            linqi+="<div class='proimg'>";
                            linqi+="<img id='itemPic_lq' src='"+items[i].itempic+"'/>";
                            linqi+="<div class='biaoqian'>临期</div>";
                            linqi+="</div>";
                            linqi+="</div>";
                            linqi+="</div>";
                            
                            $("#linqi").html(linqi);

                        }
                    }
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var obj = JSON.parse(XMLHttpRequest.responseText);
            if (obj["error"] == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            if (XMLHttpRequest.readyState == 4)
                alert("网络异常");
        }
    });
}
/**
 * 获取已经审核活动
 */
function getcheckactivityshistory() {
    //var currentPage = getUrlParam('page');//获取当前页
    //if(currentPage == null){
    //    currentPage = 1;
    //}
    var currentPage = parseInt($("#currentPage").val());
    var defaultPagecount = 10;//默认一页显示的条数
    var area = $(".alladdress").text();
    if (area == '全部地区') {
        area = "";
    } else {
        area = area.replaceAll(" ", ",");
        area = area.substring(0, area.length - 1);
    }
    var activitycode = "";
    var activitytitle = "";
    var distributorname = "";
    var textQueryType = $("#textQueryType").val();
    var queryText = $("#queryText").val();
    if (textQueryType == 1) {
        activitytitle = queryText;
    } else if (textQueryType == 2) {
        activitycode = queryText;
    } else if (textQueryType == 3) {
        distributorname = queryText;
    }
    var pageStr = '{"curpage":' + currentPage + ',"pagecount":' + defaultPagecount + '}';
    // var page = JSON.parse(pageStr);
    $.ajax({
        type: 'GET',
        url: '/webapi/auditplatform/audit/activities/history',
        data: {
            area: area, // (可选，无则为全部)
            checktype: $("#checktype").val(),//intvalue：1.新提交的活动。2.更正活动 (可选，无则为全部)
            activitytype: $("#activitytype").val(),//intvalue：1.超惠活动, 2. 门店活动 (可选，无则为全部)
            activitytitle: activitytitle,
            activitycode: activitycode,
            distributorname: distributorname,
            checkby: $("#checkby").val(),
            checkresult: $("#approveresult").val(), // stringvalue:succeed-通过，nosubmit-未提交，failed-不通过 (可选，无则为全部)
            startchecktime: $("#datetimepicker7").val(),  //审核时间区间开始日期(系统常见日期格式都可)
            endchecktime: $("#datetimepicker8").val(),  //审核时间区间截止日期(系统常见日期格式都可)
            paging:  pageStr //分页：JsonData.Object
        },
         beforeSend:function(){
            // 打开加载圈圈--齐枭飞添加
        $(".showMes").fadeIn(500);
         // 成功前按钮不可以使用并且变为灰色并且添加文字--齐枭飞添加
         $("#searchBtn").attr("disabled", true); 
         $("#searchBtn").css("background","#9F9F9F")
         $("#searchBtn").html("查询中···")
        },
        success: function (msg) {
            if (msg.error == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
             // 成功后按钮可以使用并且恢复颜色并且文字变为原来的状态--齐枭飞添加
            $("#searchBtn").attr("disabled", false);
            $("#searchBtn").css("background","#249cfa");
            $("#searchBtn").html("查询")
              // 删除加载圈圈--齐枭飞添加
            $(".showMes").css("display","none");
            $("#activity_list_data").html("");
            if (msg != null && msg.datacount >= 0) {
                localStorage.setItem("checkedActivitys", JSON.stringify(msg));
                var datacount = msg.datacount;
                var pagecount = msg.pagecount;
                var totalPage = Math.ceil(datacount / pagecount);
                $(".currenthdnum").find("span").text(datacount);//设置总数量
                $("#totalPage").text(totalPage);//设置总页数
                var data = msg.data;
                if (data.length > 0) {
                    var activity_list_data = "";
                    var obj = null;
                    var activity = null;
                    var distributor = null;
                    for (var i = 0; i < data.length; i++) {
                        obj = data[i];
                        activity = obj.activity;
                        distributor = obj.distributor;
                        if (activity != null && distributor != null) {
                        var changeFlag = "";
                        var isChanged = activity.ischanged;
                          var activityType ="";
                        if(isChanged == 1){
                            changeFlag = "【 更正 】";
                        }
                        switch(activity.activitykind)
                        {
                            case "distributor_to_consumer":
                                activityType = "经销商";
                                break;
                            case "retailer_to_consumer":
                                activityType = "门店";
                                break;                                  
                        }
                            var activityTitle_full = activity.activitytitle;
                            var activityTitle = activityTitle_full;
                            if (activityTitle.length > 17) {
                                activityTitle = activityTitle.substring(0, 16) + "...";
                            }
                            activity_list_data += "<div class='tabcont-cont'>";
                            activity_list_data += "    <div class='tabcont-cont-one per1'>";
                            activity_list_data += "    <em class='emblock' title='" + activityTitle_full + "'>" + activityTitle + "</em>";
                            activity_list_data += "    <span>" + activity.activitycode + "</span><font>"+ changeFlag + "</font>";
                            activity_list_data += "    </div>";
                            activity_list_data += "    <div class='tabcont-cont-one per2'>";
                            activity_list_data += activity.begintime.substring(0, activity.begintime.length - 3) + "<br />" + activity.endtime.substring(0, activity.endtime.length - 3);
                            activity_list_data += "    </div>";
                            activity_list_data += "   <div class='tabcont-cont-one per3 lineheight20'>" + activityType+ "</div>";
                            activity_list_data += "        <div class='tabcont-cont-one per4 lineheight20'>" + distributor.distributorname + "</div>";
                            activity_list_data += "        <div class='tabcont-cont-one per5'>" + distributor.contactperson + "<br />" + distributor.mobilephone + "<br />" + distributor.fixline + "</div>";
                            activity_list_data += "        <div class='tabcont-cont-one per6 lineheight20'>" + distributor.alias_domain + "</div>";
                            activity_list_data += "    <div class='tabcont-cont-one per7 lineheight20'>" + distributor.address + "</div>";
                            activity_list_data += "        <div class='tabcont-cont-one per8 lineheight20'>" + activity.checktime + "</div>";
                            activity_list_data += "    <div class='tabcont-cont-one per9 lineheight20 '>" + activity.checkby + "</div>";
                            //activity.endtime = "2016-12-31 00:00:00";//测试可以重新审核
                            if (activity.approveresult == "succeed") {
                                activity_list_data += "<div class='tabcont-cont-one per10 lineheight20 sh-tongguo' style='height: 150px;' guid=" + activity.guid + ">";
                                activity_list_data += "    <img src='../web_images/icon08.png'>通过 ";
                                var now = new Date();
                                if (Date.parse(activity.endtime) - Date.parse(now) > 0) {//判断活动是否结束，如果没有结束就可以重新审核
                                    activity_list_data += "    <a class='detailAndCheck' href='#'><font>重新审核</font></a>";
                                }
                                activity_list_data += "</div>";
                            } else if (activity.approveresult == "failed") {
                                activity_list_data += "<div class='tabcont-cont-one per10 lineheight20 sh-butongguo' style='height: 70px;' guid=" + activity.guid + ">";
                                activity_list_data += "<img src='../web_images/icon08-1.png'>不通过<span class='hd-sh'><img src='../web_images/icon09.png'></span>";
                                var now = new Date();
                                if (Date.parse(activity.endtime) - Date.parse(now) > 0) {//判断活动是否结束，如果没有结束就可以重新审核
                                    activity_list_data += "<a class='detailAndCheck' href='#'><font>重新审核</font></a>";
                                }
                                activity_list_data += "</div>";
                            } else if (activity.approveresult == "nosubmit") {
                                activity_list_data += "<div class='tabcont-cont-one per10 lineheight20 sh-weitijiao' style='height: 70px;' guid=" + activity.guid + ">";
                                activity_list_data += "<img src='../web_images/icon08-2.png'> 未提交 ";
                                var now = new Date();
                                if (Date.parse(activity.endtime) - Date.parse(now) > 0) {//判断活动是否结束，如果没有结束就可以重新审核
                                    activity_list_data += "<a class='detailAndCheck' href='#'><font>重新审核</font></a>";
                                }
                                activity_list_data += "</div>";
                            }
                            activity_list_data += "</div>";
                        }
                    }
                    $("#activity_list_data").html(activity_list_data);
                    assemblePage(totalPage);
                    // $('.pagenum li').eq(currentPage).addClass('pitchOn')
                    showCheckOpinions();
                    /**
                     * 进入重新审核页面
                     */
                    $(".detailAndCheck").bind("click", function () {
                        localStorage.setItem("checkedGuid", $(this).parent().attr("guid"));
                        $(this).attr("href", "hd-shenhe-reauditdetail.html");
                    });
                }
            } else {
                $("#activity_list_data").html("无有效数据");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var obj = JSON.parse(XMLHttpRequest.responseText);
            if (obj["error"] == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            if (obj["error"] == "no data") {
                alert("未查到数据");
                $(".showMes").css("display", "none");
                $("#searchBtn").attr("disabled", false);
                $("#searchBtn").css("background", "#249cfa");
                $("#searchBtn").html("查询")
                return;
            }
            if (XMLHttpRequest.readyState == 4)
                alert("请求返回异常,请与管理员联系!");
        }
    });
}

/**
 * 分页跳转
 * @param page
 */
function goPage(page) {
    $("#currentPage").val(page);
    getcheckactivityshistory();
}

$(function () {
    /**
     * 审核结果改变事件
     * 
     */
    // $("#approveresult").change(function () {
    //     getcheckactivityshistory();
    // })
    /**
     * 所属类型改变事件
     */
    // $("#checktype").change(function () {
    //     getcheckactivityshistory();
    // });
    /**
     * 审核人
     */
    // $("#checkby").change(function () {
    //     getcheckactivityshistory();
    // });
    /**
     * 活动类型改变事件
     */
    // $("#activitytype").change(function () {
    //     getcheckactivityshistory();
    // });
    /**
     * 文本框查询改变事件
     */
    // $("#textQueryType").change(function () {
    //     getcheckactivityshistory();
    // });
    /**
     * 文本框失去焦点事件
     */
    // $("#queryText").blur(function () {
    //     getcheckactivityshistory();
    // });
    /**
     * 审核开始日期失去焦点事件
     */
    // $("#datetimepicker7").blur(function () {
    //     getcheckactivityshistory();
    // });

    /**
     * 审核开始日期失去焦点事件
     */
    // $("#datetimepicker8").blur(function () {
    //     getcheckactivityshistory();
    // });

    /**
     * 查查卡按钮
     */
    $("#searchBtn").click(function () {
        $("#currentPage").val(1)
        getcheckactivityshistory();
    });

    /**
     * 上一页
     */
    $(".s-page").click(function () {
        var currentPage = $("#currentPage").val();
        var page = parseInt(currentPage) - 1;
        //$(this).children().attr("href","javascript:goPage("+goPage+")");
        goPage(page);
    });
    /**
     * 下一页
     */
    $(".x-page").click(function () {
        var currentPage = $("#currentPage").val();
        var page = parseInt(currentPage) + 1;
        //$(this).children().attr("href","javascript:goPage("+goPage+")");
         if($(".tabcont-cont").length<10){
            alert("没有数据啦");
        // var page = parseInt(currentPage)-1;
        }else{
              goPage(page);
        }
    });

    /**
     * 指定某页按钮
     */
    $("#goDesignatedPageBtn").click(function () {
        var page = parseInt($("#designatedPage").val());
        var totalPage = parseInt($("#totalPage").text());
        if (page < 1) {
            alert("不能小于1");
            return;
        }
        if (page > totalPage) {
            alert("不能大于总页数");
            return;
        }
        goPage(page);
    });
});