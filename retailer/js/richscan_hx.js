wx.ready(function () {
    //  alert("开始扫一扫")

    writeOff(function () {
        vm.scanwx()
    });
});

avalon.ready(function () {

    avalon.scan(document.body, vm)
    //H4sIAAAAAAAEADNOSkpOSjGxsEw1MzWxNDC0TE5LMzI2T0kxTkxJMzIy1DEEAMwE94AiAAAA
    // vm.cardkey = "H4sIAAAAAAAEAEWLQQrDIBBF7zLrLtTJaOxlZKKTItQEmjEQQu_ekE3_6j14_wTOWveqR6oqLb16LfAE5pEizxMHssMsmX1xlgI78QZLnOABuiq_l96uGi_N67L1Jp90_63DgXwYo_mTkXsYDRJ8f-EbdWN5AAAA"
    //vm.GetTicketInfo(vm.cardkey)
})

function isJson(obj) {
    var isjson = typeof (obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
    return isjson;
}
var Interval;
var vm = avalon.define({
    $id: 'richscan_hx',
    pageStep: 1,
    jsondata: {},
    cardkey: "",
    imgurl: "",
    title: "",
    subTitle: "",
    hxNum: 0,
    totalnum: 0,
    scanwx: function () {//微信扫一扫
        vm.seconds = 8;
        vm.cardkey = "";
        vm.pageStep = 1;
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                // var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                // alert(res.resultStr)
                vm.cardkey = res.resultStr
                if (vm.cardkey.indexOf('http') >= 0) {
                    Msg.show(2, "咦！该码来自火星吧~", "不是超惠券核销码！")

                    $(".btn").hide()
                    $("#btn_1").show()//返回
                } else {
                    waitloadaddress(function () {
                        vm.GetTicketInfo(res.resultStr, wxlocation.latitude, wxlocation.longitude)
                    });
                }
            }
        });
    },
    yhxNum: 0,//已核销
    whxNum: 0,//未核销
    youhui: 0,//优惠金额
    zengpin: 0,//赠品份数
    seconds: 8,//描述
    IsVerifycard: false,
    GetTicketInfo: function (cardkey, latitude, longitude) {//加载优惠卷
        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: { cardkey: cardkey, retailergeoloc: longitude + "," + latitude },
            url: '/webapi/retailer/weixin/verifycardview',
            beforeSend: function () { Msg.show(1, "超惠券信息加载中...") },
            // complete: function () { Msg.hide(); },
            success: function (result) {
                $(".stamp").hide()
                var jsondata = isJson(result) ? result : JSON.parse(result)
                //
                if (jsondata.user_notification != null || jsondata.user_notification != undefined) {
                    var tishi = jsondata.user_notification.toString().split('~');

                    Msg.show(2, tishi[0], tishi.length > 1 ? ("~" + tishi[1]) : "")
                    $(".btn").hide()
                    $("#btn_1").show()//返回

                } else {
                    Msg.hide()
                    vm.pageStep = 2;
                    vm.jsondata = jsondata.activityitemjson
                    vm.totalnum = jsondata.totalnum
                    vm.MsgShow(1, "消费者已选择" + result.verifynum + "张超惠券", "请确认")
                    vm.hxNum = result.verifynum

                    $(".btn").hide()
                    $("#hx_1").show();//数量不符
                    $("#hx_2").show();//确认核销
                    Interval = setInterval(function () {
                        vm.seconds--
                        $("#hx_2").html("确认核销（" + vm.seconds + "s）")
                        if (vm.seconds == 0) {
                            vm.seconds = 8
                            $("#hx_2").click()

                            $("#hx_2").html("确认核销（8s）")
                        }
                    }, 1000)

                    vm.favorable(vm.jsondata, vm.hxNum)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {

                var errormsg = "网络不给力";
                try {
                    if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                        var json = JSON.parse(XMLHttpRequest.responseText);
                        errormsg = json.Message != undefined ? JSON.parse(json.Message).error : json.error;
                        if (errormsg == undefined || errormsg == '')
                            errormsg = "Http error: " + XMLHttpRequest.statusText;
                    }
                } catch (e) {

                }

                Msg.show(4, errormsg, errormsg == "登录失败" ? "请退出重新登录" : "查不到超惠券信息，请重试！")
                if (errormsg != "登录失败") {
                    $(".btn").hide()
                    $("#btn_2").show()//返回
                    $("#btn_3").show()//返回
                }
            }
        });
    },
    verifycard: function () {//确认核销
        clearInterval(Interval);
        //  alert(vm.cardkey)
        if (vm.IsVerifycard == false) {
            vm.IsVerifycard = true;

            $.ajax({
                type: 'put',
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                url: '/webapi/retailer/weixin/verifycard?cardkey=' + vm.cardkey,
                beforeSend: function () { Msg.show(1, "正在核销中...") },
                success: function (result) {
                    // alert(result)
                    var jsondata = isJson(result) ? result : JSON.parse(result)

                    Msg.hide()
                    vm.pageStep = 3
                    if (jsondata.verifynum > 0) {//核销成功
                        vm.yhxNum = jsondata.verifynum
                        vm.whxNum = vm.totalnum - jsondata.verifynum
                        var whxMsg = vm.whxNum > 0 ? (vm.whxNum + "张超惠券未核销") : ""
                        vm.MsgShow(1, "您已经成功核销了" + jsondata.verifynum + "张超惠券", whxMsg)

                        $(".btn").hide()

                        $("#hx_3").show();//继续核销
                        vm.showUsage(1)

                    } else {//未核销成功
                        vm.yhxNum = 0
                        vm.whxNum = vm.hxNum - vm.yhxNum//失败核销数量

                        var msg = jsondata.user_notification.split('|');
                        vm.MsgShow(2, msg[0], msg.length == 1 ? '' : msg[1])

                        $(".btn").hide()

                        $("#hx_3").show();//继续核销
                        vm.showUsage(2)
                    }
                    vm.IsVerifycard = false
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var errormsg = "网络不给力";
                    try {
                        if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                            var json = JSON.parse(XMLHttpRequest.responseText);
                            errormsg = json.Message != undefined ? JSON.parse(json.Message).error : json.error;
                            if (errormsg == undefined || errormsg == '')
                                errormsg = "Http error: " + XMLHttpRequest.statusText;
                        }
                    } catch (e) {

                    }
                    if (errormsg.indexOf('网络') >= 0) {
                        Msg.show(4, errormsg, "核销失败，请重试")
                    } else {
                        Msg.show(2, errormsg, errormsg == "登录失败" ? "请退出重新登录" : "核销失败，请重试")
                    }
                    if (errormsg != "登录失败") {
                        $(".btn").hide()
                        $("#btn_2").show()//返回
                        $("#btn_4").show()//重试
                    }
                    vm.IsVerifycard = false
                }
            });
        }

    },
    MsgShow: function (type, title, subtitle) {
        if (type == 1) {//成功
            vm.imgurl = "/retailer/image/supercoupons/success.png";
        } else if (type == 2) {//错误
            vm.imgurl = "/retailer/image/supercoupons/msg_1.png";
        }
        vm.title = title
        vm.subTitle = subtitle
    },
    showUsage: function (type) {
        $("#tab_tishi li").removeClass("acitve")

        if (type == 1) {//已核销
            $("#tab_msg").css("border-top", "solid 1px #009f96")
            vm.hxNum = vm.yhxNum
            $("#msg_left").addClass("acitve")
            $("#tagMsg").hide()

            vm.favorable(vm.jsondata, vm.yhxNum)
            $("#tab_msg").removeClass("triangle_right").removeClass("tab_active")
            $("#tab_msg").addClass("triangle_left")
            if (vm.yhxNum > 0) {
                $("#tab_msg").addClass("tab_active")
            }

        } else {//未核销
            $("#tab_msg").css("border-top", "solid 1px #adabab")
            vm.hxNum = vm.whxNum;
            $("#msg_right").addClass("acitve")
            $("#tagMsg").show()

            vm.favorable(vm.jsondata, vm.whxNum)
            $("#tab_msg").removeClass("triangle_left").removeClass("tab_active")
            $("#tab_msg").addClass("triangle_right")
            if (vm.whxNum > 0) {
                $("#tab_msg").addClass("tab_active")
            }
        }
        if (vm.hxNum == 0) {//没有数据
            $(".div-list").hide();
            $("#nodata p").html("您没有" + (type == 1 ? "已" : "未") + "核销成功的超惠券~")
            $("#nodata").show();
        } else {
            $(".div-list").show();
            $("#nodata").hide();
        }
    },
    restartverifycard: function () {//数量不符合，重新核销
        clearInterval(Interval);
        $.ajax({
            type: 'get',
            dataType: 'json',
            // data: { cardkey: vm.cardkey },
            url: '/webapi/retailer/weixin/restartverifycard?cardkey=' + vm.cardkey,
            beforeSend: function () { Msg.show(1, "数量不符，重新核销...") },
            success: function (result) {
                $("#hx_2").html("确认核销（8s）")
                Msg.hide()
                vm.scanwx()
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var errormsg = "网络异常";
                try {
                    if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                        var json = JSON.parse(XMLHttpRequest.responseText);
                        errormsg = JSON.parse(json.Message).error;
                        if (errormsg == undefined || errormsg == '')
                            errormsg = "Http error: " + XMLHttpRequest.statusText;
                    }
                } catch (e) {

                }
                $(".msg").show()
                if (errormsg.indexOf('网络') >= 0) {
                    Msg.show(4, errormsg)
                } else {
                    Msg.show(2, errormsg)
                }

                $(".btn").hide()
                $("#btn_2").show()//返回
                $("#btn_5").show()//重试
            }
        });
    },
    fun_tautology: function () {//重试
        waitloadaddress(function () {
            vm.GetTicketInfo(vm.cardkey, wxlocation.latitude, wxlocation.longitude)
        });
    },
    favorable: function (el, num) {
        vm.youhui = 0;
        vm.zengpin = 0
        if (el.itemkind == "降价" || el.itemkind == "套餐") {//计算优惠价
            var _price = (el.originalprice - el.discountprice) * num
            vm.youhui = _price.toFixed(2).replace(".00", "")
        } else if (el.itemkind == "有礼" || el.itemkind == "买赠") {
            vm.zengpin = num
        }
    }
})

var Msg = avalon.define({
    $id: 'allMsg',
    imgurl: "",
    title: "",
    subTitle: "",
    show: function (type, title, subtitle) {
        $("#_loading").removeClass("fa fa-spin")
        $(".msg").hide()
        if (type == 1) {//加载中
            Msg.imgurl = "/retailer/image/supercoupons/loading.gif";
            $("#_loading").addClass("fa fa-spin")
        } else if (type == 2) {//错误
            Msg.imgurl = "/retailer/image/supercoupons/msg_1.png";

        } else if (type == 3) {//成功
            Msg.imgurl = "/retailer/image/supercoupons/success.png";
        } else if (type == 4) {//网络错误
            Msg.imgurl = "/retailer/image/supercoupons/no_network.png";
        }
        Msg.title = title
        Msg.subTitle = subtitle
        $("#Msg").show()
    },
    hide: function () {
        $("#Msg,.msg").hide()
    }
})
