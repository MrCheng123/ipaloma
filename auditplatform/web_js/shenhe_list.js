/**
 * 分页跳转
 * @param page
 */
function goPage(page){
    $("#currentPage").val(page);
    getcheckactivitys();
}
/**
 * 组装分页
 */
function assemblePage(totalPage){
    var pageTool = "";
    pageTool+="<li class='front'>...</li>";
    for(var i=1;i<=totalPage;i++){
        if(i==1){
            pageTool+="<li class='pitchOn'><a href='javascript:goPage(1);'>1</a></li>";
        } else{
            //pageTool+="<li><a href='../html/hd-shenhe.html?page="+i+"'>"+i+"</a></li>";
            pageTool+="<li><a href='javascript:goPage("+i+");'>"+i+"</a></li>";
        }
    }
    pageTool+="<li class='back'>...</li>";
    $(".pagenum").html(pageTool);

    $('.front').hide();
    $('.back').hide();
    var lis = $('.pagenum li'),
        //page = getUrlParam('page'),//当面页数
        page = parseInt($("#currentPage").val()),//当面页数
        total_page = lis.size() - 2;//总页数
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
 * 获取活动规则内容
 */
function getcheckrule(){
    $.ajax({
        type: 'POST',
        url: '/webapi/distributor/check/getcheckrule',
        data: {
        },
        success: function (msg) {
            console.log(msg);
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
 * 更新活动规则
 */
function updatecheckrule(checkrule){
    $.ajax({
        type: 'POST',
        url: '/webapi/distributor/check/updatecheckrule',
        data: {
            checkrule : checkrule,
            userid : localStorage.getItem("userid")
        },
        success: function (msg) {
            if (msg != null && msg.succeed == 'succeed') {
                alert("更新活动规则成功");
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
 * 获取已保存搜索条件
 */
function getConditions(){
    var conText = "";
    var conditions = localStorage.getItem("conditions");
    if(conditions!=null && conditions.length > 0){
        var conditionsObj = JSON.parse(conditions);
        for(var  i=0;i<conditionsObj.length;i++){
            var ctext = "";
            var cObj = conditionsObj[i];
            for(var o in cObj){
                if(o == "id" || o == "areaValue" || o == "checktypeValue" || o == "activitytypeValue" || o == "textQueryTypeValue"){
                    continue;
                }
                if(cObj[o]!=""){
                    ctext += cObj[o] + "+";
                }
            }
            if(ctext.length > 0){
                ctext = ctext.substring(0,ctext.length-1);
            }
            conText += "<div class='show-baocunlist' baocun='a' hgfd='jj' conditionId="+cObj.id+" >"+ctext+"<img class='deleteSearchCondition' src='../web_images/icon03.png'></div>";
        }
        $(".show1").find("span").text(conditionsObj.length);
        $(".show-yibaocun").html(conText);
    }
}

/**
 * 获取未审核活动
 */
function getcheckactivitys(){
    //var currentPage = getUrlParam('page');//获取当前页
    //if(currentPage == null){
    //    currentPage = 1;
    //}
    
    //   $.ajax({

    //    type:"GET",
    //    url:"/webapi/auditplatform/version",         //"/webapi/auditplatform/version",
    //    dataType:"jsonp",
    //    success:function(data_info){
    //    $("#Edition").text("version:"+data_info.data)
    //},
    //    error:function(XMLHttpRequest, textStatus, errorThrown){
    //         if (XMLHttpRequest.readyState == 4){
    //                alert("网络错误，或者路径不正确，或者state状态错误，请查看");
    //         }
    //    }
    //});


    var currentPage = parseInt($("#currentPage").val());
    var defaultPagecount = 10;//默认一页显示的条数
    var area = $(".alladdress").text();
    if(area == '全部地区'){
        area = "";
    } else {
        area = area.replaceAll(" ",",");
        area = area.substring(0,area.length-1);
    }
    var activitycode = "";
    var activitytitle = "";
    var distributorname = "";
    var  textQueryType = $("#textQueryType").val();
    var  queryText = $("#queryText").val();
    if(textQueryType== 1){
        activitytitle = queryText;
    } else if(textQueryType== 2){
        activitycode = queryText;
    } else if(textQueryType== 3){
        distributorname = queryText;
    }
    var currentdate = new Date();
    var sendchecktime = $("#datetimepicker7").val() == undefined ? currentdate.toString("yyyy-MM-dd HH-mm-ss") : $("#datetimepicker7").val();
    // 修改---查询分页
    // if(queryText!=''){
    //     var currentPage = 1;
    // }
    var pageStr = '{"curpage":'+currentPage+',"pagecount":'+defaultPagecount+'}';
    var page = JSON.parse(pageStr);
    //设置当前查询条件
    var currentSearchConditions = new Object();
    currentSearchConditions.area = area;
    currentSearchConditions.activitycode = activitycode;
    currentSearchConditions.activitytitle = activitytitle;
    currentSearchConditions.distributorname = distributorname;
    currentSearchConditions.textQueryType = textQueryType;
    currentSearchConditions.queryText = queryText;
    currentSearchConditions.sendchecktime = sendchecktime;
    currentSearchConditions.page = page;
    localStorage.setItem("currentSearchConditions",JSON.stringify(currentSearchConditions));
    $.ajax({
        type: 'POST',
        url: '/webapi/auditplatform/activities/audit',
        data: {
            area: area, // (可选，无则为全部)
            checktype : $("#checktype").val(),//intvalue：1.新提交的活动。2.更正活动 (可选，无则为全部)
            activitytype : $("#activitytype").val(),//intvalue：1.超惠活动, 2. 门店活动 (可选，无则为全部)
            activitytitle : activitytitle,
            activitycode : activitycode,
            distributorname : distributorname,
            sendchecktime : sendchecktime,
            paging:pageStr //分页：JsonData.Object
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
            if (msg.error == "登录失败")
            {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            // 成功后按钮可以使用并且恢复颜色并且文字变为原来的状态--齐枭飞添加
            $("#searchBtn").attr("disabled", false);
            $("#searchBtn").css("background","#249cfa");
            $("#searchBtn").html("查询");
            // 删除加载圈圈--齐枭飞添加
            $(".showMes").css("display","none");
            $("#activity_list_data").html("");
            if(msg!=null && msg.datacount >= 0){
                var datacount = msg.datacount;         
                var pagecount = msg.pagecount;
                var totalPage = Math.ceil(datacount/pagecount);
                // assemblePage(totalPage)
                $(".currenthdnum").find("span").text(datacount);//设置总数量
                $("#totalPage").text(totalPage);//设置总页数
                var data = msg.data;
                // console.log(data);
                if(data.length > 0){
                    var activity_list_data = "";
                    var obj = null;
                    var activity = null;
                    var distributor = null;
                    for(var i=0;i<data.length;i++){
                        obj = data[i];
                        msg.data[i].nextOneIndex = i+1;//添加序号
                        activity = obj.activity;
                        //测试s
                        //if(i==1){
                        //    activity.guid = "asdfafaf";
                        //}
                        //测试e
                    
                        distributor = obj.distributor;
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
                       
                        if(activity!=null && distributor!=null){
                            var activityTitle_full = activity.activitytitle;
                            var activityTitle = activityTitle_full;
                            if(activityTitle.length > 17){
                                activityTitle = activityTitle.substring(0,16)+"...";
                            }
                            activity_list_data+="   <div class='tabcont-cont'>";
                            activity_list_data+="    <div class='tabcont-cont-one percent1'>";
                            activity_list_data+="    <em class='emblock' title='"+activityTitle_full+"'>"+activityTitle+"</em>";
                            activity_list_data+="    <span>"+activity.activitycode+" </span><font> "+changeFlag+"</font>";
                            activity_list_data+="    </div>";
                            activity_list_data+="    <div class='tabcont-cont-one percent2'>";
                            activity_list_data+="        "+activity.begintime+"<br />";
                            activity_list_data+="    "+activity.endtime+"";
                            activity_list_data+="    </div>";
                            // activity_list_data+="    <div class='tabcont-cont-one percent3 lineheight20'>"+activity.activitykind+"</div>";
                            activity_list_data+="    <div class='tabcont-cont-one percent3 lineheight20'>"+activityType+"</div>";
                            activity_list_data+="        <div class='tabcont-cont-one percent4 lineheight20'>"+distributor.distributorname+"</div>";
                            activity_list_data+="        <div class='tabcont-cont-one percent5'>";
                            activity_list_data+="        "+distributor.contactperson+"<br />";
                            activity_list_data+="        "+distributor.mobilephone+"/"+distributor.fixline+"</div>";
                            activity_list_data+="        <div class='tabcont-cont-one percent6 lineheight20'>"+distributor.alias_domain+"</div>";
                            activity_list_data+="    <div class='tabcont-cont-one percent7 lineheight20'>"+distributor.address+"</div>";
                            //activity_list_data+="        <div class='tabcont-cont-one percent8 lineheight20'>"+activity.sendchecktime+"</div>";
                            activity_list_data+="        <div class='tabcont-cont-one percent8 lineheight20'>"+activity.issuetime+"</div>";
                            activity_list_data+="    <div class='tabcont-cont-one percent9 lineheight20'>";
                            activity_list_data+="    <a class='detailAndCheck' activityId='"+activity.guid+"' href='#'><em>详情</em> <em>&amp;</em> <em>审核</em></a>";
                            activity_list_data+="    </div>";
                            activity_list_data+="</div>";
                        }
                    }
                    $("#activity_list_data").html(activity_list_data);
                    localStorage.setItem("uncheckActivitys",JSON.stringify(msg));
                    assemblePage(totalPage);
                    // if(queryText!=''){
                    //     $('.pagenum li').eq(1).addClass('pitchOn')
                    // }else{
                          // var page = parseInt($("#currentPage").val());
                        // $('.pagenum li').eq(currentPage).addClass('pitchOn')
                    // }
                    
                    /**
                     * 进入审核页面
                     */
                    $(".detailAndCheck").bind("click",function(){
                        localStorage.setItem("uncheckActivityId",$(this).attr("activityId"));
                        $(this).attr("href","hd-shenhe-detail.html");
                    });
                }
            } else {
                $("#activity_list_data").html("无有效数据");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {           
            var obj = JSON.parse(XMLHttpRequest.responseText);
            if (obj["error"] == "登录失败")
            {
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
 
$(function(){

    
    //初始化加载
        // var mydate = new Date();
        // var now = new Date((mydate.getTime() - 0 * 86400000));
        // $('#datetimepicker7').val(now.getFullYear() + '/' + ((now.getMonth() + 1).toString().length > 1 ? (now.getMonth() + 1).toString() : '0' + (now.getMonth() + 1).toString()) + '/' + ((now.getDate()).toString().length > 1 ? (now.getDate()).toString() : '0' + (now.getDate()).toString()));
    assembleProvinceSelector();
    getConditions();
    getcheckactivitys();
    
    /**
     * 所属类型改变事件
     */
    // $("#checktype").change(function(){
    //     getcheckactivitys();
    // });
    /**
     * 活动类型改变事件
     */
    // $("#activitytype").change(function(){
    //     getcheckactivitys();
    // });
    /**
     * 文本框查询改变事件
     */
    // $("#textQueryType").change(function(){
    //     getcheckactivitys();
    // });
    /**
     * 文本框失去焦点事件
     */
    // $("#queryText").blur(function(){
    //     getcheckactivitys();
    // });
    /**
     * 活动提交日期失去焦点事件
     */
    // $("#datetimepicker7").blur(function(){
    //     getcheckactivitys();
    // });
    /**
     * 点击查询按钮事件
     */
   $("#searchBtn").click(function(){
            $("#currentPage").val(1);
            getcheckactivitys();
        });

    /**
     * 保存搜索条件
     */
    
    $('.baocun').click(function () {
        var areaValue = "全部地区";
        var areaText = "全部地区";

        var area = $(".alladdress").text();
        if(area != '全部地区'){
            area = area.replaceAll(" ",",");
            area = area.substring(0,area.length-1);
            areaValue = area;
            areaText = area;
        }
        var checktypeValue = $("#checktype").val();
        var checktypeText = $("#checktype").find("option:selected").text();
        var activitytypeValue = $("#activitytype").val();
        var activitytypeText = $("#activitytype").find("option:selected").text();
        var textQueryTypeValue = $("#textQueryType").val();
        var textQueryTypeText = $("#textQueryType").find("option:selected").text();
        var queryText = $("#queryText").val();
        var sendchecktime = $("#datetimepicker7").val();
        var condition_arr = new  Array();
        var condition = new Object();
            condition.id = generateUUID();
            condition.areaValue = areaValue;
            condition.areaText = areaText;
            condition.checktypeValue = checktypeValue;
            condition.checktypeText = checktypeText;
            condition.activitytypeValue = activitytypeValue;
            condition.activitytypeText = activitytypeText;
            condition.textQueryTypeValue = textQueryTypeValue;
            condition.textQueryTypeText = textQueryTypeText;
            condition.queryText = queryText;
            // condition.sendchecktime = sendchecktime;
        var conditions = localStorage.getItem("conditions");
        if(conditions!=null){
            condition_arr = JSON.parse(conditions);
        }
        condition_arr.push(condition);
        localStorage.setItem("conditions",JSON.stringify(condition_arr));
        window.location.reload();
    })
    /**
     * 点击已保存的条件
     */
    $('.show-baocunlist').click(function () {
            var conditions = localStorage.getItem("conditions");
            if(conditions!=null){
                var obj = new Object();
                var conditions_arr = JSON.parse(conditions);
                for(var i=0;i<conditions_arr.length;i++){
                    if($(this).attr("conditionId") == conditions_arr[i].id){
                        obj = conditions_arr[i];
                    }
                }

                $(".alladdress").text(obj.areaValue);
                $("#checktype").val(obj.checktypeValue);
                $("#activitytype").val(obj.activitytypeValue);
                $("#textQueryType").val(obj.textQueryTypeValue);
                $("#queryText").val(obj.queryText);
                $("#datetimepicker7").val(obj.sendchecktime);
            }
        });

    /**
     * 删除已保存的搜索条件
     */
    $(".deleteSearchCondition").click(function(){
        var condition_arr_temp = new Array();
        var condition_arr = new Array();
        var conditions = localStorage.getItem("conditions");
        if(conditions!=null){
            condition_arr = JSON.parse(conditions);
            for(var i=0;i<condition_arr.length;i++){
                if(condition_arr[i].id != $(this).parent().attr("conditionId")){
                    condition_arr_temp.push(condition_arr[i]);
                }
            }
            localStorage.setItem("conditions",JSON.stringify(condition_arr_temp));
        }
    });

    /**
     * 更新活动规则
     */
    $('#hdboacun').click(function () {
        if($(this).text() == "保存"){
            updatecheckrule(getContentTxtNew());
        }
    });

    /**
     * 上一页
     */
    $(".s-page").click(function(){
        var currentPage = $("#currentPage").val();
        var page = parseInt(currentPage)-1;
        //$(this).children().attr("href","javascript:goPage("+goPage+")");
        goPage(page);
    });
    /**
     * 下一页
     */
    $(".x-page").click(function(){
        var currentPage = $("#currentPage").val();
        var page = parseInt(currentPage)+1;
        //$(this).children().attr("href","javascript:goPage("+goPage+")");
        // 齐晓飞添加
        if($(".tabcont-cont").length<10){
            alert("没有数据啦");
            // console.log($(".tabcont-cont").length);
        // var page = parseInt(currentPage)-1;
        }else{
              goPage(page);
        }
      
    });

    /**
     * 指定某页按钮
     */
    $("#goDesignatedPageBtn").click(function(){
        var page = parseInt($("#designatedPage").val());
        var totalPage = parseInt($("#totalPage").text());
        if(page < 1){
            alert("不能小于1");
            return;
        }
        if(page > totalPage){
            alert("不能大于总页数");
            return;
        }
        goPage(page);
    });
});
