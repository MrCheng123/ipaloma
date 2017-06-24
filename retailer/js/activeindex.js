/**
 * Created by Administrator on 2017/1/3.
 */
//品牌商品搜索下拉事件
function fnpinpai() {
    var _tg=1;
    $(".titlestyle").on("click", function() {
        if(_tg==1){
            $(this).find("img").css({transform:"rotate(90deg)",transitionDuration:"0.2s"});
            $(this).find("ul").show();
            _tg=0
        }else{
            $(this).find("img").css({transform:"rotate(0deg)",transitionDuration:"0.2s"});
            $(this).find("ul").hide();
            _tg=1
        }
    }).on("click", "ul>li", function() {
        $(".titlestyle>span").html($(this).html());
        $(".titlestyle>ul").hide();
    });


    $(document).click(function(e) {
        if(!$(e.target).closest(".titlestyle").length) {
        	$(".titlestyle").find("img").css({transform:"rotate(0deg)",transitionDuration:"0.2s"});
            $(".titlestyle>ul").hide();
        }
    });
}

//获取地址栏参数
function fnurl() {
    var ourl = sessionStorage.getItem("fenxiao");
    if(ourl != "") {
        var url1 = JSON.parse(ourl);
        return url1;
    }
}
var _flag=1;
//通过参数渲染页面
function fnxrym() {
    var url1 = fnurl();
    if(url1 != "") {
        $("#distributornameh3").html(url1.distributorname);
        $(".dealer-header>i").html(url1.distributorname);
        $(".proTitleBoxl>img").attr("src", url1.distributorimg);
        $("#contactperson").html(url1.contactperson);
        $("#cutgift").html("￥" + url1.cutgift + "元");
        $(".num").html($(".ammount").html());
        $(".proDetailBox").html("<div>"+url1.active+"</div>");
        $(".proTitleInfor>a").attr("href", "tel:" + url1.mobilephone);
        $(".dealer-header>a").attr("href", "tel:" + url1.mobilephone);
        $(".footerl>a").attr("href", "shopcar.html?distributor_id=" + url1.distributor_id);
        $(".footerr>a").attr("href", "shopcar.html?distributor_id=" + url1.distributor_id)

    }
}
//获取购物车总金额和总数量
function fnpricenum() {
    $("#zhezao").show();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + localStorage.retaler + "/shoppingcart/" + fnurl().distributor_id + "/count",
        //url: "../../data/menu.json",
        data: "",
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {

            $(".tsh").show();
            $(".cgl-tishi").html("网络异常~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
            $(".cfm").click(function(){
                $(".tsh").hide();
                location.reload()
            });
            $("#zhezao").hide();
        },
        success: function(data) {
            console.log(data);
            $(".ammount").html(data.itemcount);
            $(".num").html(data.itemcount);
            $(".price>i").html(data["moneycount"].toFixed(2));
            fnqisong();
            $("#zhezao").hide();
        }
    })
}
//打电话滚动隐藏与显示
function xiala() {
    var heig=$(".proTitleBox").outerHeight()+$(".proDetailBox").outerHeight();
/*

    $(".zhankai").on("click","span",function () {
        if($(".toptop").height()>80){
            $(".toptop").animate({
                "height":"80px"
            },300,function () {
                $(".dealer-header").show();
                $(".zhankai>span").css({"background-image":"url('../../image/shop/xiala.png')"});
            });
        }else {
            $(".dealer-header").hide();
            $(".toptop").animate({
                "height":heig
            },300,function () {
                $(".zhankai>span").css({"background-image":"url('../../image/shop/shouqi.png')"});
            });
        }
    });
*/
    //禁用手机默认的触屏滚动行为
   /* $(".huadong")[0].addEventListener('touchmove', function(event) {
        event.preventDefault();
    }, false);*/
    //touchstart事件
    function touchSatrtFunc(evt) {
        try {
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = evt.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标
            //记录触点初始位置
            startX = x;
            startY = y;
        } catch (e) {
            console.log('touchSatrtFunc：' + e.message);
        }
    }

    //touchmove事件，这个事件无法获取坐标
    function touchMoveFunc(evt) {
        try {
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            var touch = evt.touches[0]; //获取第一个触点
            var x = Number(touch.pageX); //页面触点X坐标
            var y = Number(touch.pageY); //页面触点Y坐标
            //判断滑动方向 上下
            if (y - startY > 10) {
                //swipeDown();//你自己的方法 我是用来翻页的一样的
                $(".huadong")[0].removeEventListener('touchmove', touchMoveFunc, false);
                $(".dealer-header").hide();
                console.log(heig)
                $(".toptop").stop().animate({
                    "height":heig
                },200,function () {
                    $(".zhankai>span>img").addClass("xuanz");
                    $(".huadong")[0].addEventListener('touchmove', touchMoveFunc, false);
                });
            } else if(y - startY < -10){
                //swipeUp();//你自己的方法
                $(".huadong")[0].removeEventListener('touchmove', touchMoveFunc, false);
                $(".toptop").stop().animate({
                    "height":"80px"
                },200,function () {
                    $(".dealer-header").show();
                    $(".zhankai>span>img").removeClass("xuanz");
                    $(".huadong")[0].addEventListener('touchmove', touchMoveFunc, false);
                });
            }

        } catch (e) {
            console.log('touchMoveFunc：' + e.message);
        }
    }

    //touchend事件
    function touchEndFunc(evt) {
        try {
            //evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
        } catch (e) {
            console.log('touchEndFunc：' + e.message);
        }
    }
    //绑定事件
    function bindEvent() {
        $(".huadong")[0].addEventListener('touchstart', touchSatrtFunc, false);
        $(".huadong")[0].addEventListener('touchmove', touchMoveFunc, false);
        $(".huadong")[0].addEventListener('touchend', touchEndFunc, false);
    }
    bindEvent();

    //判断是否支持触摸事件
    function isTouchDevice() {
        //$(".toptop")[0].getElementById("version").innerHTML = navigator.appVersion;

        try {
            document.createEvent("TouchEvent");
            //console.log("支持TouchEvent事件！");

            bindEvent(); //绑定事件
        } catch (e) {
            console.log("不支持TouchEvent事件！" + e.message);
        }
    }
    isTouchDevice()

}

//菜单(手风琴样式)点击事件
function fnclick() {
    var Accordion = function(el, multiple) {
        this.el = el || {};
        this.multiple = multiple || false;
        var links = this.el.find('.link');
        links.on('click', {
            el: this.el,
            multiple: this.multiple
        }, this.dropdown);
        var submenu = this.el.find('.submenu');
        //品牌下的一级分类点击
        submenu.on("click", "li", function() {
            $("#getmore").hide();
            $("i",".submenu").css({"background-image":'url("../../image/shop/heisanjiao.png")'});
            $("i",this).css({"background-image":'url("../../image/shop/hssanjiao.png")'});
            $(".sanji").css({"height":"79px"}).find("h4").html("全部子类型<i></i>");
            submenu.find("li").removeClass("col1");
            $(this).addClass("col1");
            if($(this).find(".hide1").length > 0) {
                $(".sanji").slideDown(300).find("h4>i").css("transform", "rotateZ(90deg)");
                $(".alllist").animate({
                    "margin-top": "79px"
                }, 300);
                $(".sanji-zi").hide().find("ul").html($(this).find(">ul").html());
            } else {
                $(".sanji").slideUp(300);
            }
            menu1ajax($(this),"itemcategory");
            state["lastcount"]=10;
            flag=1;
        })
    }
    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el,
            $this = $(this),
            $next = $this.next();
        $next.find("li").removeClass("col1"); //删除橙色字的颜色
        $("i",".submenu").css({"background-image":'url("../../image/shop/heisanjiao.png")'});
        $(".sanji").hide().css({"height":"79px"});
        $(".cgl-contlist").find(">ul>li").show();
        $next.stop().slideToggle(300);
        $(".alllist").animate({
            "margin-top":"0"
        },300);
        var scrh=$(".proTitleBox").outerHeight()+$(".proDetailBox").outerHeight()-$(".dealer-header").outerHeight();
        $("#cgl-contlist")[0].scrollTop=0;
        $el.find(">li").removeClass('clion');
        $this.parent().addClass('clion');
        $el.find(".link>i").removeClass("iclick");
        $this.find("i").addClass("iclick");
        //$this.next().find(">li:eq(0)").addClass("col1").find("i").css({"background-image":'url("../../image/shop/hssanjiao.png")'});
        if(!e.data.multiple) {
            $el.find('.submenu').not($next).slideUp(300);
        };
    }
    var accordion = new Accordion($('#cgl-menu'), false);
}
//菜单点击事件
function fnmenuclick() {
    var thetext = "";
    $("#cgl-menu").off("click").on("click", ".link", function() {
        flag=0;
        state["lastcount"]=10;
        thetext = $(this).text();
        if(thetext == "我的预存货") {
            state["supplierid"]="";
            state["itemcategory"]="";
            $("#cgl-menu").find("li").show();
            fnyucun();
            $(".cgl-contlist").off("scroll");
            $("#getmore").hide();
            console.log(state)
        } else if(thetext == "促销活动") {
            state["supplierid"]="";
            state["itemcategory"]="";
            fnhqactive();
            $(".cgl-contlist").off("scroll");
            $("#getmore").hide();
            console.log(state)
        } else {
            var ckid = $(this).parents("li").attr("id");
            var odata = {
                "filter": "",
                "filtertype": 0,
                "supplierid": ckid,
                "lastcount": 0,
                "pagecount": 10
            };
            state["supplierid"]= odata["supplierid"];
            state["itemcategory"]="";
            console.log(state)
            fnlist2(odata);
            flag=1;
            getmore();
        }
    });
}

//二级菜单遮罩上部点击事件
function fnerji() {
    $(".sanji").on("click", function() {
        $(".sanji-zi", this).toggle().show;
        if($(".sanji-zi", this).is(":visible") == true) {
            $("h4>i", this).css("transform", "rotateZ(-90deg)");
            $(".sanji").css({"height":"100%"});
        } else {
            $("h4>i", this).css("transform", "rotateZ(90deg)");
            $(".sanji").css({"height":"79px"});
        }
    });
}
//ajax请求品牌下一级分类
function menu1ajax(ckid,da) {
    var odata={
        "supplierid": ckid.parents("li").attr("id"),
        "itemcategory": ckid.attr("id"),
        "lastcount": 0,
        "pagecount": 10
    };
    state["supplierid"]= odata["supplierid"];
    state["itemcategory"]=odata["itemcategory"];
    console.log(state)
    fnlist2(odata);
}
//品牌下一级分类筛选
function fnmclick1(theid,idd) {
    var n1=$(".cgl-contlist").find(">ul>li");
    for(var i=0;i<n1.length;i++){
        if(n1.eq(i).attr(idd)==theid){
            n1.eq(i).show();
        }else{
            n1.eq(i).hide();
        }
    }
    $("#cgl-contlist").scrollTop(0);
}
//品牌下二级分类筛选
function fnmclick2 () {
    $(".sanji-zi").on("click","ul>li",function () {
        var id3=$(this).attr("id");
        fnmclick1(id3,"itemsubcategory");
        $(this).parent().parent().prev().html($(this).text()+"<i></i>");
        $(this).css({background:"#e7fefd",color:"#009f96",borderColor:"#35beb6"});
        $(this).siblings().css({background:"#fff",color:"#acadad",borderColor:"#C6C6C6"});
    });
}
//动态设置cgl-cont的高度
function fnmenuhei() {
    $(".cgl-contlist").css("height", $(".cgl-menu").height());
    $(".sanji-zi").css("height", $(".cgl-menu").height()-$(".sanji").height());
}
//获取菜单列表
function fnmenu() {
    $("#zhezao").show();
    $("#nono").hide();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/itemtypegroups",
        data: "",
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus == "timeout") {
                $(".cgl-tishi").html("请求超时~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
                XMLHttpRequest.abort();
            }
            $("#zhezao").hide();
        },
        success: function(data) {
            console.log(data)
            if(data.result == false) {
                console.log(data.error)
            } else {
                xuanrmenu(data);
            }
            $("#zhezao").hide();
        }
    });
}
//菜单列表渲染
function xuanrmenu(data) {
    var oli = "";
    for(var k1 in data) {
        oli += "<li id='" + data[k1]["supplierid"] + "'>" +
            "<div class='link'>" + data[k1]["suppliername"];
        if(data[k1]["itemcategory"].length > 0) {
            oli += "<i></i>";
        }
        oli += "</div>" +
            "<ul class='submenu'> ";
        for(var k2 in data[k1]["itemcategory"]) {
            oli += "<li id='" + data[k1]["itemcategory"][k2]["itemcategory"] + "'>" + data[k1]["itemcategory"][k2]["itemcategoryname"] + "<i></i><ul class='hide1' style='display: none;'>";
            for(var k3 in data[k1]["itemcategory"][k2]["itemsubcategory"]) {
                oli += "<li id='" + data[k1]["itemcategory"][k2]["itemsubcategory"][k3]["itemsubcategory"] + "'>" + data[k1]["itemcategory"][k2]["itemsubcategory"][k3]["itemsubcategoryname"] + "</li>";
            }
            oli += "</ul></li>";
        }
        oli += "</ul>" +
            "</li>";
    }
    $("#cgl-menu").append(oli);
    fnclick();
    fnmenuclick();
    //fnmenuhei(); //动态设置菜单右侧高度
}
//预存货列表
function fnyucun() {
    $("#cgl-contlist").find(".alllist").html("");
    $("#loading").show();
    $("#zhezao").show();
    $("#nono").hide();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/prepayinventorys",
        //url: "../../data/activeindex.json",
        data: "",
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#loading").hide();
            if(textStatus == "timeout") {
                $(".cgl-tishi").html("请求超时~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
                XMLHttpRequest.abort();
            }
            $("#zhezao").hide();
        },
        success: function(data) {
            $("#loading").hide();
            if(data.length==0){
                $("#loading").hide()
                $("#nono").show().find("div").html("您暂无预存货，看看其它商品吧~");
            }else{
               fnychxr(data);
            }
            $("#zhezao").hide();
        }
    });
}
//预存货列表渲染
function fnychxr(data) {
    console.log(data)

    $("#loading").hide();
    var oli = "",
        dataid = null;
    for(var k1 in data) {
        dataid = {
            distributorid: fnurl().distributor_id,
            itemid: data[k1]["itemid"],
            itemquality: data[k1]["itemquality"],
            itemprice: data[k1]["itemunitcost"],
            prepayid:data[k1]["guid"],
            isyucun: 1
        }
        if(data[k1]["remaincount"]>0){
            oli += "<li yucun='yucun'>" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<span><span class='yucunicon'></span>" + data[k1]["itemname"] + "</span>" +
                "<p>" + (data[k1]["specification"]==null?"":(data[k1]["specification"] + " | ")) + (data[k1]["packagetypename"]==null?"":data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'>" +
                "<span>￥<i>"+Number(data[k1]["itemunitcost"]).toFixed(2)+"</i></span>";
            oli += "<div class='addjian right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli +="</div>" +
                "<div class='cgl-syu'>可提<span> " + data[k1]["remaincount"] + " </span>" + data[k1]["packagetypename"] + "</div>";
            oli += "</div>" +
                "</div> " +
                "</li>";
        }
    }
    $("#cgl-contlist").find(".alllist").html(oli);
    $("#loading").hide();
}
//获取促销活动列表
function fnhqactive() {
    $("#cgl-contlist").find(".alllist").html("");
    $("#zhezao").show();
    $("#loading").show();
    $("#nono").hide();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/activity",
        data: {
            "lastcount": 0,
            "pagecount": 5000
        },
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus == "timeout") {
                $(".cgl-tishi").html("请求超时~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
                XMLHttpRequest.abort();
            }
            $("#zhezao").hide();
            $("#loading").hide();
        },
        success: function(data) {
            console.log(data)
            fncarnum(data);
            $("#loading").hide();
            $("#zongloading").hide();
            $("#zhezao").hide();
            if(data.length<=0){
                $("#nono").show().find("div").html("暂无促销活动商品哎~");
            }else{
                fncuxiao(data);
            }
        }
    });
}

//促销活动列表渲染
function fncuxiao(data) {
    var oli = "",
        dataid = null;
    for(var k1 in data) {
        dataid = {
            distributorid: fnurl().distributor_id,
            itemid: data[k1]["itemid"],
            activityitemid: data[k1]["activityitem_id"],
            remark:"",
            itemquality: data[k1]["itemquality"],
            itemprice: Number(data[k1]["discountprice"] || data[k1]["price"]*data[k1]["discount"]*0.1).toFixed(2),
            isyucun: 0
        }
        //折扣和降价活动时
        if(data[k1]["itemkind"] == "折扣" || data[k1]["itemkind"] == "降价") {
            oli += "<li>" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<span>";
            if(data[k1]["itemquality"] == 0) {
                oli += "<span class='cgl-linqi'></span>";
            }
            oli += data[k1]["itemname"] + "</span>" +
                "<p>" + (data[k1]["specification"] == null ? "" : data[k1]["specification"] + " | ") + (data[k1]["packagetypename"] == null ? "" : data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'>" +
                "<span>￥<i>" + Number(data[k1]["discountprice"] || data[k1]["price"]*data[k1]["discount"]*0.1).toFixed(2) + "</i></span>" +
                "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div>" +
                " </div><del>￥" + Number(data[k1]["originalprice"] || data[k1]["price"]).toFixed(2) + "</del></div>" +
                "</div> " +
                "<div class='cgl-active'> <span>" + data[k1]["itemkind"] + "</span><span>" + data[k1]["discount"] + " 折</span></div> ";
            if(data[k1]["ruledesc"] != null) {
                oli += "<div class='cgl-beizhu'><span>备注：" + (data[k1]["ruledesc"] == null ? "" : data[k1]["ruledesc"]) + "</span></div>";
            }
            oli += "</li>";
        } else if(data[k1]["itemkind"] == "有礼" || data[k1]["itemkind"] == "买赠") {
            //有礼和买赠活动时
            dataid.itemprice = Number(data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(2);
            oli += "<li id=\""+k1+"\">" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<span>";
            if(data[k1]["itemquality"] == 0) {
                oli += "<span class='cgl-linqi'></span>";
            }
            oli += data[k1]["itemname"] + "</span>" +
                "<p>" + (data[k1]["specification"]==null?"":data[k1]["specification"]+" | ") + (data[k1]["packagetypename"]==undefined?"":data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'>" +
                "<span>￥<i>" + Number(data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(2) + "</i></span>" +
                "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div></div></div></div>" +
                "<div class='cgl-active'><span>" + data[k1]["itemkind"] + "</span><p class='youligift'>购买 <span>" + data[k1]["salecount"] + "</span> " + (data[k1]["packagetypename"]==undefined?"":data[k1]["packagetypename"]) + data[k1]["itemname"] + "送" + data[k1]["giftitemobj"]["itemname"] + " " + data[k1]["giftcount"] + " " + (data[k1]["giftitemobj"]["packagetypename"]==null?"":data[k1]["giftitemobj"]["packagetypename"]);
            if(data[k1]["giftitemquality"]){
                data[k1]["giftitemquality"] == 0 ? oli += "(临期)" : oli += "";
            }else{
                data[k1]["itemquality"] == 0 ? oli += "(临期)" : oli += "";
            }
            oli += "</p></div>";
            if(data[k1]["ruledesc"] != null) {
                oli += "<div class='cgl-beizhu'><span>备注：" + (data[k1]["ruledesc"] == null ? "" : data[k1]["ruledesc"]) + "</span></div>";
            }
            oli += "</li>";
        }
    }
    $("#cgl-contlist").find(".alllist").html(oli);

}

//一般列表请求
function fnlist2(odata) {
    $("#cgl-contlist").find(".alllist").html("");
    $("#loading").show();
    $("#zhezao").show();
    $("#nono").hide();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/items",
        data: odata,
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus == "timeout") {
                $("#loading img").remove();
                $(".cgl-tishi").html("请求超时~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
                XMLHttpRequest.abort();
            }
            $("#zhezao").hide();
        },
        success: function(data) {
            $("#loading").hide();
            if(data.result == false) {
                console.log(data.error);
                $("#cgl-contlist").find(".alllist").html("<P style='padding-top:10px'>暂无与“<b style='color:red'>"+$(".content").val()+"</b>”有关的商品</p>");
            } else {
                fnyibanlist2(data)
            }
            $("#zhezao").hide();

        }
    });
}
//一般列表渲染
function fnyibanlist2(data) {
    var oli = "",
        dataid = null;
    for(var k1 in data) {
        dataid = {
            distributorid: fnurl().distributor_id,
            itemid: data[k1]["itemid"],
            activityitemid: data[k1]["activityitem_id"],
            remark:"",
            itemquality: data[k1]["itemquality"],
            itemprice: Number(data[k1]["discountprice"] || data[k1]["price"]*data[k1]["discount"]*0.1).toFixed(2),
            isyucun: 0
        }
        //折扣和降价活动时
        if(data[k1]["itemkind"] == "折扣" || data[k1]["itemkind"] == "降价") {
            oli += "<li active='active' class='" + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<span>";
            if(data[k1]["itemquality"] == 0) {
                oli += "<span class='cgl-linqi'></span>";
            }
            oli += data[k1]["itemname"] + "</span>" +
                "<p>" + (data[k1]["specification"] == null ? "" : data[k1]["specification"]+" | ") + (data[k1]["packagetypename"] == undefined ? "" : data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'>" +
                "<span>￥<i>" + Number(data[k1]["discountprice"] || data[k1]["price"]*data[k1]["discount"]*0.1).toFixed(2) + "</i></span>" +
                "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div>" +
                " </div><del>￥" + Number(data[k1]["originalprice"] || data[k1]["price"]).toFixed(2) + "</del></div>" +
                "</div> " +
                "<div class='cgl-active'> <span>" + data[k1]["itemkind"] + "</span><span>" + data[k1]["discount"] + " 折</span></div> ";
            if(data[k1]["ruledesc"] != null) {
                oli += "<div class='cgl-beizhu'><span>备注：" + (data[k1]["ruledesc"] == null ? "" : data[k1]["ruledesc"]) + "</span></div>";
            }
            oli += "</li>";
        } else if(data[k1]["itemkind"] == "有礼" || data[k1]["itemkind"] == "买赠") {
            //有礼和买赠活动时
            dataid.itemprice = Number(data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(2);
            oli += "<li id="+k1+" active='active' class='" + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<span>";
            if(data[k1]["itemquality"] == 0) {
                oli += "<span class='cgl-linqi'></span>";
            }
            oli += data[k1]["itemname"] + "</span>" +
                "<p>" + (data[k1]["specification"]==null?"":data[k1]["specification"]+" | ") + (data[k1]["packagetypename"]==undefined?"":data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'>" +
                "<span>￥<i>" + Number(data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(2) + "</i></span>" +
                "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div></div></div></div>" +
                "<div class='cgl-active'><span>" + data[k1]["itemkind"] + "</span><p class='youligift'>购买 <span>" + data[k1]["salecount"] + "</span> " + (data[k1]["packagetypename"]==undefined?"":data[k1]["packagetypename"]) + data[k1]["itemname"] + "送" + data[k1]["giftitemobj"]["itemname"] + " " + data[k1]["giftcount"] + " " + (data[k1]["giftitemobj"]["packagetypename"]==null?"":data[k1]["giftitemobj"]["packagetypename"]);
            if(data[k1]["giftitemquality"]){
                data[k1]["giftitemquality"] == 0 ? oli += "(临期)" : oli += "";
            }else{
                data[k1]["itemquality"] == 0 ? oli += "(临期)" : oli += "";
            }
            oli += "</p></div>";
            if(data[k1]["ruledesc"] != null) {
                oli += "<div class='cgl-beizhu'><span>备注：" + (data[k1]["ruledesc"] == null ? "" : data[k1]["ruledesc"]) + "</span></div>";
            }
            oli += "</li>";
        }else if(data[k1]["itemslist"]) {
            if(data[k1]["itemslist"].length > 1) {
                //多种包装情况下包装大于1时
                oli += "<li class='cgl-ggmore " + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>";
                for(var k2 in data[k1]["itemslist"]) {
                    dataid = {
                        distributorid: fnurl().distributor_id,
                        itemquality: data[k1]["itemquality"],
                        itemid: data[k1]["itemslist"][k2]["guid"],
                        itemprice: Number(data[k1]["itemslist"][k2]["price"]).toFixed(2),
                        isyucun: 0
                    }
                    oli += "<div class='cgl-top hori'> " +
                        "<img src='" + data[k1]["itemslist"][k2]["itemimage"] + "' alt=''> " +
                        "<div class='the-xiangxi'> " +
                        "<span><span></span>" + data[k1]["itemslist"][k2]["itemname"] + "</span>" +
                        "<div class='ggdiv'><p class='ggborder'>" + (data[k1]["itemslist"][k2]["specification"]==null?"":data[k1]["itemslist"][k2]["specification"]+" | ") + (data[k1]["itemslist"][k2]["packagetypename"]==undefined?"":data[k1]["itemslist"][k2]["packagetypename"]) + "</p></div>" +
                        "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'><span>￥<i>" + Number(data[k1]["itemslist"][k2]["price"]).toFixed(2) + "</i></span>" +
                        "<div class='right'>";
                    if(data[k1]["itemslist"][k2]["itemcount"] <= 0) {
                        oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemslist"][k2]["itemcount"] + "</span><span class='add'></span>";
                    } else {
                        oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemslist"][k2]["itemcount"] + "</span><span class='add'></span>";
                    }
                    oli += "</div></div></div>" +
                        "</div>";
                }
            } else {
                //多种包装情况下包装等于1时
                for(var k3 in data[k1]["itemslist"]) {
                    dataid = {
                        distributorid: fnurl().distributor_id,
                        itemquality: data[k1]["itemquality"],
                        itemid: data[k1]["itemslist"][k3]["guid"],
                        itemprice: Number(data[k1]["itemslist"][k3]["price"]).toFixed(2),
                        isyucun: 0
                    }
                    oli += "<li class='" + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>" +
                        "<div class='cgl-top hori'> " +
                        "<img src='" + data[k1]["itemslist"][k3]["itemimage"] + "' alt=''> " +
                        "<div class='the-xiangxi'> " +
                        "<span><span></span>" + data[k1]["itemslist"][k3]["itemname"] + "</span>" +
                        "<p>" + (data[k1]["itemslist"][k3]["specification"]==null?"":data[k1]["itemslist"][k3]["specification"]+" | ") + (data[k1]["itemslist"][k3]["packagetypename"]==undefined?"":data[k1]["itemslist"][k3]["packagetypename"]) + "</p>" +
                        "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'><span>￥<i>" + Number(data[k1]["itemslist"][k3]["price"]).toFixed(2) + "</i></span>" +
                        "<div class='right'>";
                    if(data[k1]["itemslist"][k3]["itemcount"] <= 0) {
                        oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemslist"][k3]["itemcount"] + "</span><span class='add'></span>";
                    } else {
                        oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemslist"][k3]["itemcount"] + "</span><span class='add'></span>";
                    }
                    oli += "</div></div></div></div></li>";
                }
            }
        } else {
            //一种包装时
            dataid = {
                distributorid: fnurl().distributor_id,
                itemquality: data[k1]["itemquality"],
                itemid: data[k1]["itemid"],
                itemprice: Number(data[k1]["originalprice"] || data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(2),
                isyucun: 0
            }
            oli += "<li class='" + data[k1].supplierid + "' itemcategory='" + data[k1]["itemcategory"] + "' itemsubcategory='" + data[k1]["itemsubcategory"] + "'>" +
                "<div class='cgl-top hori'> " +
                "<img src='" + data[k1]["itemimage"] + "' alt=''> " +
                "<div class='the-xiangxi'> " +
                "<span><span></span>" + data[k1]["itemname"] + "</span>" +
                "<p>" + (data[k1]["specification"] == null ? "" : data[k1]["specification"]+ " | ") + (data[k1]["packagetypename"] == undefined ? "" : data[k1]["packagetypename"]) + "</p>" +
                "<div class='c-price' dataid='" + JSON.stringify(dataid) + "'><span>￥<i>" + Number(data[k1]["originalprice"] || data[k1]["saleprice"] || data[k1]["unitprice"]).toFixed(2) + "</i></span>";
            oli += "<div class='right'>";
            if(data[k1]["itemcount"] <= 0) {
                oli += "<span class='jian' style='display:none;'></span><span class='price-z' style='display:none;'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            } else {
                oli += "<span class='jian'></span><span class='price-z'>" + data[k1]["itemcount"] + "</span><span class='add'></span>";
            }
            oli += "</div></div></div></div></li>";
        }
    }
    $("#cgl-contlist").find(".alllist").append(oli);
}
//商品规格点击切换
function fnggmore() {
    $("#cgl-contlist").on("click", ".cgl-ggmore .ggborder", function() {
        var odiv = $(this).parents(".cgl-ggmore").find(">div");
        for(var i = 0; i < odiv.length; i++) {
            //console.log(odiv.eq(i)[0]==$(this).parents(".cgl-top")[0])
            if(odiv.eq(i)[0] == $(this).parents(".cgl-top")[0]) {
                odiv.eq(i).hide();
                if(i + 1 >= odiv.length) {
                    odiv.eq(0).show().css({
                        "display": "-webkit-box"
                    });
                } else {
                    odiv.eq(i + 1).show().css({
                        "display": "-webkit-box"
                    });
                }

            }
        }
    });
}
//商品数量加减
function fncarnum(data) {
    $("#cgl-cont").off().on("tap", ".jian", function() {
        var num = Number($(this).next().html());
        if($(this).parent().parent().parent().parent().parent().attr("id") && num>1){
            if(num==$(this).parent().parent().parent().parent().next().find(".youligift>span").text()){

                $(".ammount").html($(".ammount").html() - num);
                $(".num").html($(".ammount").html())
                num=0
                $(".price>i").html((Number($(".price>i").html())-(Number($(this).next().html())-num)*Number($(this).parent().prev().find("i").html())).toFixed(2));
                $(this).hide().next().hide().html(0);
            }else{
                $(".price>i").html((Number($(".price>i").html())-Number($(this).parent().prev().find("i").html())).toFixed(2));
                $(".ammount").html($(".ammount").html() - 1);
                $(".num").html($(".ammount").html())
                $(this).next().html(Number($(this).next().html())-1)
            }
        }else{
            if(num <= 1) {
                $(this).hide().next().hide().html(0);
                $(".ammount").html($(".ammount").html() - 1);
                $(".num").html($(".ammount").html());
            } else {
                $(this).next().html(num - 1);
                $(".ammount").html($(".ammount").html() - 1);
                $(".num").html($(".ammount").html());
            }
            $(".price>i").html(($(".price>i").html()-$(this).parent().prev().find("i").html()).toFixed(2));
        }
        fnaddcar(this, $(this).next().html() - 0);
    }).on("tap", ".add", function() {
        var num = Number($(this).prev().html());
        var xian = Number($(this).parents(".the-xiangxi").find(".cgl-syu>span").html());
        console.log($(this).prev().text())
        if(xian && Number($(this).prev().text())>=xian) {
            console.log("购买已到上限")
        } else {
            if(num==0 && $(this).parent().parent().parent().parent().parent().attr("id")){
                num+=Number($(this).parent().parent().parent().parent().next().find(".youligift>span").text())
                var _l=(Number($(".price>i").html())+(num-Number($(this).prev().html()))*Number($(this).parent().prev().find("i").html())).toFixed(2)
                $(".ammount").html(Number($(".ammount").html()) +num);
                $(this).prev().html(Number($(this).prev().html())+num).show().prev().show();
                $(".price>i").html(_l);

            }else{
                $(".ammount").html(Number($(".ammount").html()) +1);
                $(this).prev().html(num + 1).show().prev().show();
                $(".price>i").html((Number($(".price>i").html())+Number($(this).parent().prev().find("i").html())).toFixed(2));
            }
            $(".num").html($(".ammount").html());
            fnaddcar(this, $(this).prev().html() - 0);
        }
    });
}
//添加购物车
function fnaddcar(that, a) {
    fnqisong();
    var dataid = JSON.parse($(that).parents(".c-price").attr("dataid"));
    dataid.itemcount = a;
    dataid.versiontime = formaty();
    console.log(dataid)
    $("#zhezao").show();
    $("#nono").hide();
    $.ajax({
        url: "/webapi/distributor/" + localStorage.retaler + "/shoppingcart",
        contentType: "application/json; charset=utf-8",
        async: true,
        cache: false,
        data: JSON.stringify(dataid),
        dataType: "json",
        type: "post",
        timeout: "9000",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus == "timeout") {
                $(".cgl-tishi").html("请求超时~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
                XMLHttpRequest.abort();
            }
            $("#zhezao").hide();
        },
        success: function(data) {
            $("#zhezao").hide();
        }
    })
}
//生成当前时间
function formaty() {
    var d = new Date();
    _year = d.getFullYear();
    _month = d.getMonth() + 1;
    _day = d.getDate();
    _hour = d.getHours();
    _minute = d.getMinutes();
    _second = d.getSeconds();
    _msecond = d.getMilliseconds();
    if(_hour < 10) {
        _hour = "0" + _hour;
    }
    if(_month < 10) {
        _month = "0" + _month;
    }
    if(_day < 10) {
        _day = "0" + _day;
    }
    if(_minute < 10) {
        _minute = "0" + _minute;
    }
    if(_second < 10) {
        _second = "0" + _second;
    }
    if(_msecond < 100 && _msecond > 10) {
        _msecond = "0" + _msecond
    } else if(_msecond < 10) {
        _msecond = "00" + _msecond
    }
    return _year + "-" + _month + "-" + _day + " " + _hour + ":" + _minute + ":" + _second + "." + _msecond;
}
//起送价
function fnqisong() {
    $(".footerr>span>i").html(Number(fnurl().cutgift - $(".price>i").html()).toFixed(2));
    if($(".price>i").html() >= fnurl().cutgift) {
        $(".footerr>span").hide();
        $(".footerr>a").show();
    } else {
        $(".footerr>a").hide();
        $(".footerr>span").show();
    }
}
//获取每个品牌对应所有商品高度
function fngethei(idclass) {
    var heigh = 0;
    $("." + idclass).each(function(i) {
        heigh += $(this).outerHeight();
    })
    return heigh;
}
//输入框后的叉号隐显
function fnyinxian() {
    $(".content").keyup(function () {
        if($(this).val().length>0){
            $(".clear").show();
        }else {
            $(".clear").hide();
        }
    });
}
function keyLogin(){
    $("body").off().on("keydown",function (event) {
        event = event || window.event;
        if (event.keyCode==13){
            $(".searchbtn").click();
        }
    });
}
//搜索
function fnserach() {
	var _height=$("html").height()/2;
	console.log(_height)
    fnyinxian();
    keyLogin();
    $(".content").val("");
    var _ti=1;
    $("#searchInp").focus(function(){
    	$("footer").css({display:"none"})
    }).blur(function(){
    	$("footer").css({display:"-webkit-box"})
    })
    var _timer=setInterval(function(){
    	if(($("body").height()/2)<_height){
    		clearInterval(_timer)
    		$("footer").css({display:"-webkit-box"})
    	}
    },10)
    //清空按钮点击
    $(".clear").on("click", function() {
        if($(".content").val()!="" && _ti!=1){
            $(".content").val("");
            $(".searchbtn").click();
            _ti=1;
        }
        $(".content").val("");
        $(".clear").hide();
    });
    var odata = {
        "filter": "",
        "filtertype": 0,
        "lastcount": 0,
        "pagecount": 5000
    };
    //搜索按钮点击
    $(".searchbtn").on("click", function() {
        if($(".content").val()==0){
            $(".content").val("");
            $(".clear").hide();
        }
        _ti=0;
        $(".sanji").slideUp(300).find("h4>i").css("transform", "rotateZ(90deg)");
        $("#cgl-contlist").find(".alllist").animate({
            "margin-top": "0"
        }, 300);
        $(".sanji-zi").hide().find(">ul").html($(this).find(".hide1").html());
        if($(".titlestyle>span").html() == "品牌") {
            odata.filtertype = 1;
        } else {
            odata.filtertype = 0;
        }
        odata.filter = $(".content").val();

        if(odata.filter==0){
            $("#cgl-menu").find("li:gt(1)").remove();
            $("#cgl-menu").find("li:eq(1)").show();
            $(".cgl-menu").find("li").removeClass("clion");
            $(".sale ").addClass("clion");
            fnmenu(); //获取菜单列表
            fnhqactive();//获取促销活动列表
        }else if($(">li:eq(0)","#cgl-menu").attr("class")=="clion"){
            var ycdata={
                "filter": odata.filter,
                "filtertype": odata.filtertype
            }
            $("#cgl-menu").off("click").find("li:gt(1)").remove();
            $("#cgl-menu").find("li:eq(1)").hide();
            $("#cgl-menu").find(">li:eq(0)").off("click").on("click",function () {
                $(">ul>li","#cgl-contlist").show();
            });
            fnsearchyc(ycdata);//预存货搜索
        }else{
            if($(".titlestyle>span").html() == "品牌") {
                odata.filtertype = 1;
            } else {
                odata.filtertype = 0;
            }
            fnserchapi(odata);
        }
        $("input").blur();
    });
}

//预存货搜索
function fnsearchyc(odata) {
    $("#cgl-contlist").find(".alllist").html("");
    $("#loading").show();
    $("#zhezao").show();
    $("#nono").hide();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/prepayinventorys",
        data: odata,
        timeout: "2000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            $("#loading").hide();
            if(textStatus == "timeout") {
                $(".cgl-tishi").html("请求超时~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
                XMLHttpRequest.abort();
            }
            $("#zhezao").hide();
            $("#loading").hide();
        },
        success: function(data) {
            console.log(data)
            $("#loading").hide();
            if(data.length==0){
                $("#nono").show();
            }else{
                fnychxr(data);
            }
            $("#zhezao").hide();
        }
    });
}
//搜索功能ajax请求
function fnserchapi(odata) {
    $("#cgl-contlist").find(".alllist").html("");
    $("#loading").show();
    $("#zhezao").show();
    $("#nono").hide();
    $.ajax({
        type: "get",
        url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/items",
        data: odata,
        timeout: "9000",
        dataType: "json",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(textStatus == "timeout") {
                $("#loading img").remove();
                $(".cgl-tishi").html("请求超时~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
                XMLHttpRequest.abort();
            }
            $("#zhezao").hide();
            $("#loading").hide();
            $("#nono").show().find("div").html("没有查询到销售商品！");
        },
        success: function(data) {
            console.log(data);
            $("#loading").hide();
            menusx(data["groupdata"]);
            $(".cgl-menu").find("li").removeClass("clion");
            $(".sale").next().addClass("clion");
            $(".sale").next().find(".link>i").hide();
            $(".sale").next().find(".submenu").slideDown(300);
            if(data.result == false) {
                console.log(data.error);
                $("#cgl-contlist").find(".alllist").html("<P style='padding-top:10px'>暂无与“<b style='color:red'>"+$(".content").val()+"</b>”有关的商品</p>");
            } else {
                fnyibanlist2(data["datalist"]);
            }
            $("#zhezao").hide();
        }
    });
}
function menusx(data) {
    var putli=$("#cgl-menu").find("li:gt(1)");
    putli.remove();
    xuanrmenu(data);

    $("#cgl-menu").off("click").on("click", ".link", function() {
        thetext = $(this).text();
        if(thetext == "我的预存货") {
            $(".content").val("");
            $(".clear").hide();
            $("#cgl-menu").find("li:gt(1)").remove();
            fnmenu(); //获取菜单列表
            fnyucun();
        } else if(thetext == "促销活动") {
            $(".content").val("");
            $(".clear").hide();
            $("#cgl-menu").find("li:gt(1)").remove();
            $("#cgl-menu").find("li").removeClass("clion");
            $(".sale ").addClass("clion");
            fnmenu(); //获取菜单列表
            fnhqactive();
        } else {
            var theid=$(this).parent().attr("id");
            fnmclick(theid,"class");
        }
    });
    //搜索状态下品牌下一级分类点击
    $(".submenu").off("click").on("click","li",function () {
        $(".submenu").find("li").removeClass("col1").find("i").css({"background-image":'url("../../image/shop/heisanjiao.png")'});
        $("i",this).css({"background-image":'url("../../image/shop/hssanjiao.png")'});
        $(".sanji").find("h4").html("全部子类型<i></i>");
        $(this).addClass("col1");
        if($(this).find(".hide1").length > 0) {
            $(".sanji").slideDown(300).find("h4>i").css("transform", "rotateZ(90deg)");
            $(".alllist","#cgl-contlist").animate({
                "margin-top": "78px"
            }, 300);
            $(".sanji-zi").hide().find(">ul").html($(".hide1",this).html());
        } else {
            $(".sanji").slideUp(300);
            $("#cgl-contlist").find(".alllist").animate({
                "margin-top": "0"
            }, 300);
        }
        fnmclick1($(this).attr("id"),"itemcategory");
    });
}
//搜索功能下品牌筛选
function fnmclick(theid,idd) {
    var n1=$(".cgl-contlist").find(">ul>li");
    for(var i=0;i<n1.length;i++){
        if(n1.eq(i).attr(idd)==theid){
            n1.eq(i).show();
        }else{
            n1.eq(i).hide();
        }
    }
    $("#cgl-contlist").scrollTop(0);
}
//加载更多
var state={
    "lastcount":10,
    "pagecount":10,
    "supplierid":"",
    "itemcategory":""
}
var flag=0;
function getmore() {
    var hcha=null;

    $("#cgl-contlist").delay(500).off("scroll").on("scroll",function () {
        if($("li",".alllist").length>=10){
            hcha=$(this)[0].scrollHeight-$(this).outerHeight()-$(this)[0].scrollTop;
            if(hcha==0 && state["supplierid"] != "" && flag==Math.floor(state["lastcount"]/state["pagecount"]) && $("ul",this).outerHeight()>100){
                $("#getmore").show();
                $("#zhezao").show();
                flag++;
                $.ajax({
                    type: "get",
                    url: "/webapi/distributor/" + fnurl().distributor_id + "/customer/" + localStorage.retaler + "/items",
                    data: state,
                    timeout: "9000",
                    dataType: "json",
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        if (textStatus == "timeout") {
                            $("#loading img").remove();
                            $(".cgl-tishi").html("请求超时~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
                            //console.log("请求超时");
                            XMLHttpRequest.abort();
                        }
                        $("#zhezao").hide();
                        flag--;
                    },
                    success: function (data) {
                        $("#zhezao").hide();
                        if(data.length>0){
                            fnyibanlist2(data);
                            state["lastcount"]+=10;

                        }else{
                            $("#getmore").hide();
                            $(".cgl-tishi").html("没有更多了~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
                        }
                        console.log(flag,Math.floor(state["lastcount"]/state["pagecount"]+1));
                    }
                });
            }
        }

    });
}
$(function() {
    if(localStorage.reload==1){
        var _tt=setInterval(function(){
            fnpinpai(); //品牌下拉点击事件
            fnurl(); //获取地址栏参数
            fnpricenum(); //获取购物车总金额和总数量
            fnxrym(); //通过参数渲染页面
            xiala(); //打电话显示与隐藏
            fnmenu(); //获取菜单列表
            fnhqactive();//获取促销活动列表
            fnerji(); //遮罩点击
            fnggmore(); //商品规格点击切换
            fnserach(); //搜索
            fnmclick2 ();
            clearInterval(_tt);
            getmore();
        },100)
    }else{
        localStorage.reload=1;
        fnpinpai(); //品牌下拉点击事件
        fnurl(); //获取地址栏参数
        fnpricenum(); //获取购物车总金额和总数量
        fnxrym(); //通过参数渲染页面
        xiala(); //打电话显示与隐藏
        fnmenu(); //获取菜单列表
        fnhqactive();//获取促销活动列表
        fnerji(); //遮罩点击
        fnggmore(); //商品规格点击切换
        fnserach(); //搜索
        fnmclick2 ();
        getmore();
    }
});




/*ios微信浏览器上下滚动兼容性问题解决 end*/
$(function () {//DOM文档加载完执行
    wxScrollSolve(document.querySelector('#cgl-menu'));
    wxScrollSolve(document.querySelector('#cgl-contlist'));
});
function wxScrollSolve(scrollWrapObj) {//Scrollobj要滚动的内容外部包裹的容器对象
    if(scrollWrapObj==""||scrollWrapObj==undefined||scrollWrapObj==null){
        return
    }
    var overscroll = function (el) {
        el.addEventListener('touchstart', function () {
            var top = el.scrollTop
                , totalScroll = el.scrollHeight
                , currentScroll = top + el.offsetHeight;
            if (top === 0) {
                el.scrollTop = 1;
            } else if (currentScroll === totalScroll) {
                el.scrollTop = top - 1;
            }
        });
        el.addEventListener('touchmove', function (evt) {
            if (el.offsetHeight < el.scrollHeight)
                evt._isScroller = true;
        })
    };
    overscroll(scrollWrapObj);    /*document.querySelector('.MainCon')*/
    document.body.addEventListener('touchmove', function (evt) {
        if (!evt._isScroller) {
            evt.preventDefault();
        }
    });
}
/*ios微信浏览器上下滚动兼容性问题解决 end*/