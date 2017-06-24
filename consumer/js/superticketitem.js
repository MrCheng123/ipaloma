
avalon.ready(function () {
    avalon.scan(document.body)
    $('.tip-w').click(function () {
        $('.tip-w').fadeOut(200);
    })

    $('.share').click(function () {
        $('.tip-w').fadeIn(200);
    })
    waitloadaddress(function () {
        vm.loaddata(wxlocation.longitude, wxlocation.latitude);
    });

    //vm.loaddata(116.357, 39.94978)
})
var vm = avalon.define({
    $id: 'superticketitem',
    jsondata: {},
    isShow: false,
    activitiy_item_guid: common.getUrlParam("activitiy_item_guid"),
    loaddata: function (longitude, latitude) {
        var ajaxdata = {};
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
            dataType: "json",
            url: '/webapi/consumer/weixin/activities/' + vm.activitiy_item_guid + '/ticket', ///webapi/consumer/weixin/activities/1234567890123456789004ffffffff24
            data: ajaxdata,
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (jsondata) {

                common.loading.hide();//数据请求成功即隐藏转圈动画

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
                vm.isShow = true
                vm.jsondata = jsondata.data[0];

                if ($.isFunction(wxjsshare)) {
                    wxjsshare(jsondata.share || {});
                }
                qrcode.show();
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
    useticket: function (el) {// 码上用
        if (vm.jsondata.verifylimit > 0) {//可用状态，跳转到码上用核销界面

            var originalurl = "/consumer/page/superticket_hx.html?activityitem_id=" + vm.jsondata.guid;

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
            if (index < 20)
                topicid += "," + item.topicid
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
