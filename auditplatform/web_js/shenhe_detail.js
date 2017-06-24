function clickOptionListLi() {
    $('.opinion-list li').click(function () {
        var op = $(this).attr('op')
        var areaval = $(this).parent().parent().next().children('textarea').val()
        var abc = 1
        if (areaval == '') {
            abc = 0
        }
        console.log(op)
        if (op == 'a') {
            $(this).css('background', '#0099ff').css('color', '#fff')
            $(this).attr('op', 'b');
            $(this).parent().parent().parent().prev().children('.btg').attr('btg-color', 'b');
        } else {
            $(this).css('background', '#fff').css('color', '#333')
            $(this).attr('op', 'a');
        }
        var abd = 1
        $('.opinion-list li').each(function (index, element) {

            if ($(this).attr('op') == 'b') {
                abd = 0
            }
        });

        if (abd == 1 && abc == 0) {
            $(this).parent().parent().parent().prev().children('.btg').attr('btg-color', 'a');
        }

        switch_color();
        check();
    })
}

// “http://auditplatform.webapi.auditplaform/actives/audit”
function loadShortCutInfo() {
    $.ajax({
        type: 'GET',
        url: '/webapi/auditplatform/audit/notice',
        data: {
            paging: JSON.stringify({ "curpage": 1, "pagecount": 100 })
        },
        success: function (msg) {
            if (msg.error == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            console.log(msg);
            if (msg != null && msg != "" && msg.data.length > 0) {
                var li_1 = "";
                var li_2 = "";
                var li_3 = "";
                var li_4 = "";
                var li_5 = "";
                var li_6 = "";
                var objs = msg.data;
                for (var i = 0; i < objs.length; i++) {
                    var shortcuttype = objs[i].shortcuttype;
                    var shortcutinfo = objs[i].shortcutinfo;
                    if (shortcuttype == 1) {
                        li_1 += "<li op='a'>" + shortcutinfo + "</li>";
                    } else if (shortcuttype == 2) {
                        li_2 += "<li op='a'>" + shortcutinfo + "</li>";
                    } else if (shortcuttype == 3) {
                        li_3 += "<li op='a'>" + shortcutinfo + "</li>";
                    } else if (shortcuttype == 4) {
                        li_4 += "<li op='a'>" + shortcutinfo + "</li>";
                    } else if (shortcuttype == 5) {
                        li_5 += "<li op='a'>" + shortcutinfo + "</li>";
                    } else if (shortcuttype == 6) {
                        li_6 += "<li op='a'>" + shortcutinfo + "</li>";
                    }
                }
                $(".opinion-list[type=1]").html(li_1);
                $(".opinion-list[type=2]").html(li_2);
                $(".opinion-list[type=3]").html(li_3);
                $(".opinion-list[type=4]").html(li_4);
                $(".opinion-list[type=5]").html(li_5);
                $(".opinion-list[type=6]").html(li_6);

                clickOptionListLi();
            }
        }
    });


} 
function getUncheckObj() {
    var uncheckObj = null;
    var activityid = localStorage.getItem("uncheckActivityId");
    var uncheckActivitys = localStorage.getItem("uncheckActivitys");
    if (uncheckActivitys != null) {
        var uncheckActivitys_jsonArray = JSON.parse(uncheckActivitys);
        for (var i = 0; i < uncheckActivitys_jsonArray.data.length; i++) {
            if (activityid == uncheckActivitys_jsonArray.data[i].activity.guid) {
                uncheckObj = uncheckActivitys_jsonArray.data[i];
                localStorage.setItem("uncheckObj", JSON.stringify(uncheckObj));
                break;
            }
        }
    }
    return uncheckObj;
}

/**
 * 设置下一个活动
 * @param currentIndex
 * @returns {*}
 */
function setNextOneUncheckActivityId(currentIndex) {
    var hasOne = false;
    currentIndex++;
    var flag = false;
    var uncheckActivitys = localStorage.getItem("uncheckActivitys");
    if (uncheckActivitys != null) {
        var uncheckActivitys_jsonArray = JSON.parse(uncheckActivitys);
        for (var i = 0; i < uncheckActivitys_jsonArray.data.length; i++) {
            if (currentIndex == uncheckActivitys_jsonArray.data[i].nextOneIndex) {
                localStorage.setItem("uncheckActivityId", uncheckActivitys_jsonArray.data[i].activity.guid);
                flag = true;
                break;
            }
        }
    }
    if (flag) {
        hasOne = true;
    } else {//如果没有,从下一页获取
        if (getNextPageActivitys()) {
            hasOne = true;
        } else {//如果没有，获取新数据
            if (getNewActivitys()) {
                hasOne = true;
            }
        }
    }
    return hasOne;
}

/**
 * 获取并设置未审核活动信息
 */
function getUncheckActivity() {
    var uncheckObj = getUncheckObj();
    var sandbox = "";
    var activityid = "";
    //设置活动信息
    if (uncheckObj != null) {
        var uncheckActivity = uncheckObj.activity;//获取到服务电话
        var distributor = uncheckObj.distributor;//获取到名称
        sandbox = distributor.alias_domain;//获取到网址
        activityid = uncheckActivity.guid;//获取到xx4 标题
        $("#activitytitle").text(uncheckActivity.activitytitle);
        $("#activitytitle2").text(uncheckActivity.activitytitle);
        $("#begintime").text(uncheckActivity.begintime);
        $("#endtime").text(uncheckActivity.endtime);
        $("#servicephone").text(uncheckActivity.servicephone);
        // $("#servicephone1").text(uncheckActivity.customerlist);//活动门店
        if (uncheckActivity.ischanged == 1) {
            // 齐晓飞添加的逻辑---------活动更正说明
            $("#changedexplain").html(uncheckActivity.changedexplain);
            $(".tit").css("display","block");
            $(".borderbottom12").css("display","block")
        }else{
            $(".tit").css("display","none");
            $(".borderbottom12").remove();
        }
            // 门店要求
        if(uncheckActivity.customerrequest){
            $("#customerrequest").html(uncheckActivity.customerrequest);
            $(".titdollr").css("display","block");
            $(".borderbottomdollr").css("display","block");
        }else{
            $(".titdollr").css("display","none");
            $(".borderbottomdollr").remove();
        }
        // 补充信息
        // $("#customerrequest").html(uncheckActivity.customerrequest);
        if(uncheckActivity.description){
            $("#description").html(uncheckActivity.description);
             $(".titsupplement").css("display","block");
            $(".borderbottomsupplement").css("display","block")
        }else{
            $(".titsupplement").css("display","none");
            $(".borderbottomsupplement").remove();
        }
        // $("#description").html(uncheckActivity.description);

        // 齐枭飞添加的逻辑（改动）         start------------
        if(uncheckActivity.posterpic==""){
            $(".hd-ad").css("display","none");
            $(".bottom10").remove();
            // 标题
            $(".actives").css("display","none");

        }else{
            $("#posterpic").find("a").attr("href", uncheckActivity.posterpic);//链接
            $("#posterpic").find("img").attr("src", uncheckActivity.posterpic);//图片路径
        }               
          
        // $("#posterpic").find("a").attr("href", uncheckActivity.posterpic);//链接
        // $("#posterpic").find("img").attr("src", uncheckActivity.posterpic);//图片路径
        //                                 end---------
    }

    // 检查没有审核的事件--齐枭飞
    
    
       
    getactivityitem(sandbox, activityid);
    
}

 

/**
 * 获取活动优惠信息
 */

function getactivityitem(sandbox, activityid) {
    $.ajax({
        type: 'GET',
        url: '/webapi/auditplatform/activities/' + sandbox + '/' + activityid,
        success: function (msg) {
            if (msg.error == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            localStorage.setItem("uncheckActivityitem", JSON.stringify(msg));
              
            if (msg != "" && msg != null) {
                 
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
                    // console.log(itemPic)
                    var itemjsoncontent = items[i].itemjsoncontent;
                    //var ruledesc = itemjsoncontentObj.ruledesc;
                    //    ruledesc = ruledesc == null ? "" : ruledesc;
                        if (itemKind == "有礼") {
                        // if((itemKind == "有礼").length>1){
                        //     $(document).ready(function(){
                        //     $("body").append($("#youli").clone());
                        //  });
                        // };
                        // $("#youli").show();
                        // $("body").append($(".prolist").clone(true));
                        // $("#youli").show();
                        // $("document").append($("#youli").clone());
                        // $("#yoouli").html("");
                        
                        
                        
                        if (itemjsoncontent != null && itemjsoncontent != "") {
                            var itemjsoncontentObj = JSON.parse(itemjsoncontent);                            
                            itemjsoncontentObj.ruledesc=itemjsoncontentObj.ruledesc||"备注:";

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
                            // $("#activitytitle_jj").text(itemjsoncontentObj.activitytitle);
                            // $("#originalprice_jj").text("￥" + itemjsoncontentObj.originalprice);
                            // $("#discountprice_jj").text("￥" + itemjsoncontentObj.discountprice);
                            // $("#discount_jj").text(itemjsoncontentObj.discount + "折");
                            // // 齐枭飞添加
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
                            // $("#activitytitle_lq").text(itemjsoncontentObj.activitytitle);
                            // $("#originalprice_lq").text("￥" + itemjsoncontentObj.originalprice);
                            // $("#discountprice_lq").text("￥" + itemjsoncontentObj.discountprice);
                            // $("#discount_lq").text(itemjsoncontentObj.discount + "折");
                            // 齐枭飞添加
                            
                            $("#linqi").html(linqi);
                            // $("#itemPic_lq").attr("src", itemPic);
                            // 齐枭飞添加备注标题
                            // if(!itemjsoncontentObj.ruledesc){
                            //     $(".box-info21").html("备注：");
                            // }  
                            
                            // $("#ruledesc_lq").html(itemjsoncontentObj.ruledesc); 
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
 * 获取审核结果
 */
function getCheckresult() {
    var checkresult = new Object();
    checkresult.title ="" || $(".shurunr[type=1]").html();
    checkresult.changeexplain ="" || $(".shurunr[type=3]").html(); //
    checkresult.customerrequest = "" || $(".shurunr[type=4]").html();
    checkresult.detail ="" || $(".shurunr[type=5]").html();
    checkresult.postpic = "" || $(".shurunr[type=2]").html();
    checkresult.remark = "" || $(".shurunr[type=6]").html();
    return JSON.stringify(checkresult);
}
// function getCheckresult() {
//     var checkresult = new Object();
//     checkresult.title = $(".shurunr[type=1]").html();
//     checkresult.changeexplain = $(".shurunr[type=2]").html(); //
//     checkresult.customerrequest = $(".shurunr[type=3]").html();
//     checkresult.detail = $(".shurunr[type=4]").html();
//     checkresult.postpic = $(".shurunr[type=5]").html();
//     checkresult.remark = $(".shurunr[type=6]").html();
//     return JSON.stringify(checkresult);
// }

/**
 * 审核不提交
 */
function checknosubmit() {
    var uncheckObjText = localStorage.getItem("uncheckObj");
    if (uncheckObjText != null) {
        var obj = JSON.parse(uncheckObjText);
        $.ajax({
            type: 'POST',
            url: '/webapi/auditplatform/audit/activities/nosubmit',
            data: {
                sandbox: obj.distributor.alias_domain,
                activityid: obj.activity.guid,
                checkresult: getCheckresult()// 这里存的是审批内容组成的json文本，审核意见注释：
            },
            beforeSend:function(){
                $(".showMes").fadeIn(600);
                $(".delete-lan-w1").css("display","none");

            },
            success: function (msg) {
                if (msg.error == "登录失败") {
                    alert("用户未登录，跳转至登录页面");
                    window.location.href = "../html/login.html";
                    return;
                }
                // $("#delete-lan-w1").css("display","none");
                $(".showMes").remove();
                if (msg != null && msg.succeed == 'succeed') {
                    var flag = setNextOneUncheckActivityId(obj.nextOneIndex);
                    if (flag) {

                        window.location.href = "hd-shenhe-detail.html";
                    } else {
                        alert("已为您保存审核结果但暂未提交。没有下一个活动了");
                           
                        
                        window.location.href = "hd-shenhe.html";
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
}

/**
 * 审核通过
 */
function registeractivity() {
    var uncheckObjText = localStorage.getItem("uncheckObj");
    if (uncheckObjText != null) {
        var obj = JSON.parse(uncheckObjText);
        var uncheckActivityitem = JSON.parse(localStorage.getItem("uncheckActivityitem"));
        $.ajax({
            type: 'POST',
            url: '/webapi/auditplatform/audit/activities/submit',
        data: {
                sandbox: obj.distributor.alias_domain,
                activity: JSON.stringify(obj.activity), //使用查询返回的json对象
                activityitem: JSON.stringify(uncheckActivityitem.data), //使用查询返回的json对象
                ischanged: obj.activity["ischanged"], //无更正则不添加该节点
                auditresult: "passed",
                checkresult: getCheckresult()// 这里存的是审批内容组成的json文本，审核意见注释：
            },
             beforeSend:function(){
                 $(".showMes").fadeIn(600)
                 $(".delete-lan-w").css("display","none");
                 // 成功前按钮不可以使用并且变为灰色并且添加文字--齐枭飞添加
                 $("#checkSubmitBtn").attr("disabled", true); 
                 $("#checkSubmitBtn").css("background","#9F9F9F")
                 $("#checkSubmitBtn").html("提交中···")
            },
            success: function (msg) {
                if (msg.error == "登录失败") {
                    alert("用户未登录，跳转至登录页面");
                    window.location.href = "../html/login.html";
                    return;
                }
                    $("#checkSubmitBtn").attr("disabled", false);
                    $("#checkSubmitBtn").css("background","#249cfa");
                    $("#checkSubmitBtn").html("是");
                    $(".showMes").remove();
                if (msg != null && msg.succeed == 'succeed') {
                    //console.log("提交审核通过成功！");
                    //$(".delete-lan-w").fadeOut();
                    var flag = setNextOneUncheckActivityId(obj.nextOneIndex);
                    if (flag) {
                        window.location.href = "hd-shenhe-detail.html";
                    } else {
                        alert("已提交审核结果。没有下一个活动了");
                        $(".delete-lan-w").fadeOut();
                        window.location.href = "hd-shenhe.html";
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
                    $("#checkSubmitBtn").attr("disabled", false);
                    $("#checkSubmitBtn").css("background","#249cfa");
                    $("#checkSubmitBtn").html("是");
            }
        });
    }
}


/**
 * 审核不通过
 */
function checkactivityfailed() {
    var uncheckObjText = localStorage.getItem("uncheckObj");
    if (uncheckObjText != null) {
        var obj = JSON.parse(uncheckObjText);
        $.ajax({
            type: 'POST',
            url: '/webapi/auditplatform/audit/activities/submit',
            data: {
                sandbox: obj.distributor.alias_domain,
                activityid: obj.activity.guid,
                auditresult: "rejected",
                checkresult: getCheckresult()// 这里存的是审批内容组成的json文本，审核意见注释：
            },
             beforeSend:function(){
             // 成功前按钮不可以使用并且变为灰色并且添加文字--齐枭飞添加
             $("#checkSubmitBtn").attr("disabled", true); 
             $("#checkSubmitBtn").css("background","#9F9F9F")
             $("#checkSubmitBtn").html("提交中···")
            },
            success: function (msg) {
                if (msg.error == "登录失败") {
                    alert("用户未登录，跳转至登录页面");
                    window.location.href = "../html/login.html";
                    return;
                }
                    $("#checkSubmitBtn").attr("disabled", false);
                    $("#checkSubmitBtn").css("background","#249cfa");
                    $("#checkSubmitBtn").html("是");
                if (msg != null && msg.succeed == 'succeed') {
                    var flag = setNextOneUncheckActivityId(obj.nextOneIndex);
                    if (flag) {
                        window.location.href = "hd-shenhe-detail.html";
                    } else {
                        alert("已提交审核结果。没有下一个活动了");
                        
                        $(".delete-lan-w").fadeOut();
                       
                        window.location.href = "hd-shenhe.html";
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

}

/**
 * 获取下一页的未审核活动
 */
function getNextPageActivitys() {
    var hasOne = false;
    var currentSearchConditionsStr = localStorage.getItem("currentSearchConditions");
    var cs = JSON.parse(currentSearchConditionsStr);
    cs.page.currentPage + 1;
    $.ajax({
        type: 'POST',
        url: '/webapi/auditplatform/activities/audit',
        data: {
            area: cs.area, // (可选，无则为全部)
            checktype: cs.checktype,//intvalue：1.新提交的活动。2.更正活动 (可选，无则为全部)
            activitytype: cs.activitytype,//intvalue：1.超惠活动, 2. 门店活动 (可选，无则为全部)
            activitytitle: cs.activitytitle,
            activitycode: cs.activitycode,
            distributorname: cs.distributorname,
            sendchecktime: cs.sendchecktime,
            paging:JSON.stringify(cs.page)//分页：JsonData.Object
        },
        success: function (msg) {
            if (msg.error == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            if (msg != null && msg.datacount > 0) {
                var data = msg.data;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        msg.data[i].nextOneIndex = i + 1;//添加序号
                    }
                    localStorage.setItem("uncheckActivitys", JSON.stringify(msg));
                    setNextOneUncheckActivityId(0);
                }
                hasOne = true;
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
    return hasOne;
}

/**
 * 获取最新未审核活动
 */
function getNewActivitys() {
    var hasOne = false;
    var pageStr = '{"curpage":1,"pagecount":10}';
    var page = JSON.parse(pageStr);
    $.ajax({
        type: 'POST',
        url: '/webapi/auditplatform/activities/audit',
        data: {
            area: "", // (可选，无则为全部)
            checktype: "",//intvalue：1.新提交的活动。2.更正活动 (可选，无则为全部)
            activitytype: "",//intvalue：1.超惠活动, 2. 门店活动 (可选，无则为全部)
            activitytitle: "",
            activitycode: "",
            distributorname: "",
            sendchecktime: "",
            paging: pageStr//分页：JsonData.Object
        },
        
        success: function (msg) {
            if (msg.error == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }

            if (msg != null && msg.datacount > 0) {
                var data = msg.data;
                if (data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        msg.data[i].nextOneIndex = i + 1;//添加序号
                    }
                    localStorage.setItem("uncheckActivitys", JSON.stringify(msg));
                    setNextOneUncheckActivityId(0);
                }
                hasOne = true;
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
    return hasOne;
}

$(function () {

    getUncheckActivity();
    loadShortCutInfo();

    //bindShortCutInfoOpinion();

    /**
     * 暂时保存审核信息
     */
    $("#checknosubmitBtn").click(function () {
        checknosubmit();


    });

    /**
     *  提交审核并到下一个
     */
    $("#checkSubmitBtn").click(function () {
        var status = $("#shenheStatusBtn").attr("status");
        if (status == 1) {
            registeractivity();
        } else if (status == 0) {
            checkactivityfailed();
        }
    })

    /**
     * 提交审核接口
     * 根据页面判断是否通过
     */
    // 
    // $("#shenheStatusBtn").click(function () {
    //     var status = $("#shenheStatusBtn").attr("status");
    //     if (status == 1) {
    //         registeractivity();
    //     } else if (status == 0) {

    //         checkactivityfailed();    
    //     }
    // });
    // 
    
      // 齐枭飞加 判断审核通过按钮是不是全部被点击过，如果没有被点击过，那就弹出一个提示框框
     // $(".to-next").click(function(){
     //     var status = $("#shenheStatusBtn").attr("status");
     //     var ztg = $("#ztg1").attr("b");
     //     if (status != 1 && ztg!="b"){
     //        $(".delete-lan-w2").fadeIn(600).delay(700).fadeOut(500);
     //     }

     // });
});

