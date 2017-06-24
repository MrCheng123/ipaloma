
avalon.ready(function () {
    $('.tip-w').click(function () {
        $('.tip-w').fadeOut(200);
    })

    $('.share').click(function () {
        $('.tip-w').fadeIn(200);
    })

    avalon.scan(document.body)
    var type = common.getUrlParam("type")
    if (type == undefined || type == null || type == "") {
        type = common.getUrlParam("sharetype")
    }
    if (type == "ticket") {
        vm.showTicket = true
    }
    waitloadaddress(function () {
        vm.loaddata(wxlocation.latitude, wxlocation.longitude);
    });

})
var vm = avalon.define({
    $id: 'retaileritems',
    jsondata: {},
    consumer_id: common.getUrlParam("consumer_id"),
    retailerId: common.getUrlParam("retailer_id"),
    activity: [],
    activityNum: 0,
    ticket: [],
    _share: {},
    ticketNum: 0,
    showTicket: false,
    isShow: false,
    noDateMsg: [
        { imgurl: "/consumer/image/msg_1.png", title: "您的店里竟然没有超惠活动惠粉都要跑光了，快去催催您的分销商吧！" },
        { imgurl: "/consumer/image/msg_2.png", title: "该门店暂无超惠券哦，去看看超惠活动吧~" }
    ],
    loaddata: function (latitude, longitude) {
        var search = window.location.search;
        if (search.length > 0)
            search = search.substr(1);
        var ajaxdata = { activitykind: "distributor_to_consumer", consumer_id: vm.consumer_id };//activitytype: "activity",
        if (wxjsconfig.sharekey != null)
            ajaxdata[wxjsconfig.sharekey] = "_";
        var search = window.location.search;
        if (search.length > 0) {
            var keyvalue = [];
            var key = "", value = "";
            var paraString = search.substring(search.indexOf("?") + 1, search.length).split("&");
            for (var i in paraString) {
                keyvalue = paraString[i].split("=");
                key = keyvalue[0];
                value = keyvalue[1];
                ajaxdata[key] = value;
            }
        }
        if (longitude != undefined && longitude != '' && latitude != undefined && latitude != '') {
            ajaxdata["longitude"] = longitude;
            ajaxdata["latitude"] = latitude
        }
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/consumer/weixin/retailers/' + vm.retailerId,
            data: ajaxdata,
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (jsondata) {

                common.loading.hide();//数据请求成功即隐藏转圈动画
                vm.isShow = true
                jsondata = jsondata || {};
                if (jsondata.error) {
                    toasterextend.showtips(jsondata.error, "error", false);
                    qrcode.show();
                    return;
                }

                if (jsondata.user_notification != undefined) {
                    toasterextend.showtips(jsondata.user_notification, "info");
                    qrcode.show();
                    return;
                }

                if (jsondata.data[0].activitydata == undefined) {
                    toasterextend.showtips("活动已下架", "info");
                    qrcode.show();
                    return;
                }

                vm.jsondata = jsondata.data[0]

                ///筛选出活动列表
                vm.activity = $.grep(vm.jsondata.activitydata, function (item) {
                    return item.activitytype == "activity";//筛选出大于5的
                });
                vm.activityNum = vm.activity.length
                ///筛选出超惠券列表
                vm.ticket = $.grep(vm.jsondata.activitydata, function (item) {
                    return item.activitytype == "ticket";//筛选出大于5的
                });
                vm.ticketNum = vm.ticket.length

                //if ($.isFunction(wxjsshare)) {
                //    wxjsshare(jsondata.share || {});
                //}

                vm._share = jsondata.share

                setTimeout(function () {
                    if (vm.showTicket) {
                        $('#ad_2').fadeOut(200);
                    } else
                        $('#ad_1').fadeOut(200);
                }, 3000)
                qrcode.show();

                vm.fl_click(!vm.showTicket ? 'avtivity' : 'ticket')

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                common.loading.hide();//隐藏转圈动画

                var errormsg = "访问异常";

                if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                    var json = JSON.parse(XMLHttpRequest.responseText);
                    errormsg = JSON.parse(json.Message).error;
                    if (errormsg == undefined || errormsg == '')
                        errormsg = "Http error: " + XMLHttpRequest.statusText;
                }
                qrcode.show();
                toasterextend.showtips(errormsg, "error");
            }
        });
    },
    fl_click: function (activitytype) {
        if (activitytype == "ticket") {
            vm.showTicket = true
        }
        else {
            vm.showTicket = false
        }
        if (!vm.showTicket) {
            setTimeout(function () {
                $('#ad_1').fadeOut(200);
            }, 3000)
        } else {
            setTimeout(function () {
                $('#ad_2').fadeOut(200);
            }, 3000)
        }

        var _wxjsshare = vm._share.share;
        var _wxoldjsshare = $.extend({}, vm._share);
        delete _wxoldjsshare["share"];
        if (activitytype != "ticket" && vm.activity.length > 0) {
            wxjsshare($.extend({}, _wxoldjsshare, _wxjsshare.activity));
        } else if (activitytype == "ticket" && vm.ticket.length > 0) {
            wxjsshare($.extend({}, _wxoldjsshare, _wxjsshare.ticket, { sharetype: "ticket" }));
        }
    },
    useticket: function (el) {// 码上用
        if (el.verifylimit > 0) {//可用状态，跳转到码上用核销界面
            var originalurl = "/consumer/page/superticket_hx.html?activityitem_id=" + el.guid;

            var search = window.location.search;
            var isshare = common.getUrlParam(wxjsconfig.sharekey);
            if (isshare != null && isshare != '' && search.length > 0) {
                var qrtype = common.getUrlParam("qrtype");
                var qrtypeNumber;
                if (qrtype != null && qrtype != '')
                    qrtypeNumber = new Number(qrtype);
                var category = 'consumer';
                var qrurl = 'register_generate_code'
                if (qrtypeNumber == 4000) {
                    category = 'consumer';
                    qrurl = 'share_generate_code';
                } else if (qrtypeNumber >= 34 && qrtypeNumber <= 41) {
                    category = 'consumer';
                    qrurl = 'share_generate_code';
                } else if (qrtypeNumber >= 30) {
                    category = 'consumer';
                    qrurl = 'activity_generate_code';
                } else if (qrtypeNumber >= 20) {
                    category = 'consumer';

                } else if (qrtypeNumber >= 10) {

                    category = 'retailer';
                } else {
                    category = 'distributor';
                }
                var share_id = common.getUrlParam("share_id");

                var qrcode_url = "/webapi/" + category + "/weixin/" + qrurl + search;

                var updatecounturl = "/webapi/" + category + "/weixin/shareupdateopencount" + search;
                if (share_id != undefined) {
                    $.getJSON(updatecounturl);
                }

                var shareRegisterPage = "/" + category + "/page/shareqrcode.html?" + encodeURIComponent(qrcode_url);
                location.href = wxjsconfig.authurl.replace("__jump__", encodeURIComponent(encodeURIComponent(shareRegisterPage) + "-_-" + encodeURIComponent(originalurl)))
            }
            else {
                location.href = originalurl;
            }

        }
    },
    topicClick: function (el) {
        var topicid = "";
        $.each(el.topiclist, function (index, item, array) {
            if (index < 20) {
                topicid += "," + item.topicid
            }
        });

        location.href = "../page/participate1.html?topicid=" + topicid.substring(1)
    },
    getheadcount: function (el) {
        var headcount = 0;
        $.each(el, function (i, v) {
            headcount += v.headcount
        })

        return headcount
    }
})
