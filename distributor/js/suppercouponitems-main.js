$(function () {
    var s = new invitationfans("container");
    s.render(wxjsshare);

    vm.GetInfo(wxjsshare)
});


var vm = avalon.define({
    $id: "suppercouponitems",
    jsondata: {},
    isShow: false,
    GetInfo: function (sharefunction) {
        common.loading.show();

        var ajaxdata = { activitykind: "distributor_to_consumer", activitytype: "ticket" };
        if (wxjsconfig.sharekey != null)
            ajaxdata[wxjsconfig.sharekey] = "_";
        var activity_id = common.getUrlParam('activity_id');

        // 'webapi/distributor/weixin/activities/{activity_id}/ticket',
        $.getJSON2("/webapi/distributor/weixin/activities/" + activity_id + "/ticket", ajaxdata, function (data) {
            common.loading.hide();
            vm.isShow = data.data.length > 0
            vm.jsondata = data.data[0]
            if ($.isFunction(sharefunction)) {
                var share = data.share || {};
                sharefunction($.extend(share, { activity_id: activity_id }));
            }

            if (vm.jsondata.activitystate != '已生效') {
                $("#title-right").css("background", " rgba(51,51,51,.9)");
                $(".div-list .div-top .li-img p").addClass("p_css1")
            }
            else {
                $("#title-right").css("background", " rgba(220,0,0,.8)");
                $(".div-list .div-top .li-img p").addClass("p_css2")
            }
        });


    },
    topicClick: function (el) {
        var topicid = "";
        $.each(el.topiclist, function (index, item, array) {
            if (index<=20) {
                topicid += "," + item.topicid
            }
        });

        location.href = "../page/active.html?topicid=" + topicid.substring(1)
    },
    getheadcount: function (el) {
        var headcount = 0;
        $.each(el, function (i, v) {
            headcount += v.headcount
        })

        return headcount
    }
})

