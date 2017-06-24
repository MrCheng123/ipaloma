avalon.ready(function () {
    avalon.scan(document.body)
    vm.GetInfo()
})
var isInit = true;
var vm = avalon.define({
    $id: 'retailer_hx',
    isShow: false,
    jsondata: [],
    pageIndex: 1,

    //activity_id: common.getUrlParam("activityid"),
    GetInfo: function (dropme) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: { pageindex: vm.pageIndex },
            beforeSend: function () { vm.pageIndex == 1 ? common.loading.show() : "" },
            complete: function () { vm.pageIndex == 1 ? common.loading.hide() : "" },
            url: '/webapi/retailer/weixin/verify/history/',
            success: function (json) {
                common.loading.hide();//隐藏转圈动画

                json = json || {};   /* 统一加这句话 */

                if (jQuery.isEmptyObject(json)) {
                    dealdropme(dropme);
                    return;
                }

                if (json.error) {
                    toasterextend.showtips(json.error, "error");
                    return;
                }
                if (json.user_notification != undefined) {
                    toasterextend.showtips(json.user_notification, "info");
                    return;
                }

                if ($.isFunction(wxjsshare)) {
                    wxjsshare(json.share || {});
                }
                if (vm.pageIndex != 1) {
                    $.each(json, function (i, v) {
                        vm.jsondata.push(v);
                    });
                } else
                    vm.jsondata = json;

                vm.isShow = true

                if (vm.pageIndex == 1 && isInit && !json.error && !json.user_notification) {
                    isInit = false;
                    setTimeout(function () {
                        $('#list').dropload({
                            scrollArea: window,
                            domDown: {
                                domClass: 'dropload-down',
                                domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
                                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中</div>',
                                domNoData: '<div class="dropload-noData">暂无数据</div>'
                            },
                            loadDownFn: function (me) {
                                vm.pageIndex++;
                                vm.GetInfo(me);
                            }
                        });
                    }, 500)
                }
                if (dropme != null) {
                    dropme.resetload();
                }

                $("#div_qrcode").css("display", "block")
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $(".pin-spinner").hide();//隐藏转圈动画

                var errormsg = "访问异常";

                if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                    var json = JSON.parse(XMLHttpRequest.responseText);
                    errormsg = JSON.parse(json.Message).error;
                    if (errormsg == undefined || errormsg == '')
                        errormsg = "Http error: " + XMLHttpRequest.statusText;
                }

                toasterextend.showtips(errormsg, "error");
            }
        });
    }
})