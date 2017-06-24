avalon.ready(function () {
    avalon.scan(document.body)
    vm.GetInfo(null)
})
var pageIndex = 1;
var isInit = true;
var vm = avalon.define({
    $id: 'distributor_hx',
    isShow: false,
    jsondata: [],
    GetInfo: function (dropme) {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: { pageindex: pageIndex },
            beforeSend: function () { pageIndex == 1 ? common.loading.show() : "" },
            complete: function () { pageIndex == 1 ? common.loading.hide() : "" },
            url: '/webapi/distributor/weixin/verify/history/',
            success: function (json) {
                common.loading.hide();//隐藏转圈动画

                json = json || {};   /* 统一加这句话 */
                if (jQuery.isEmptyObject(json)) {
                    dealdropme(dropme);
                    return;
                }
                if (json.error) {
                    toasterextend.showtips(json.error, "error");
                    if (dropme != null) {
                        dropme.resetload();
                    }
                    return;
                }
                if (json.user_notification != undefined) {
                    toasterextend.showtips(json.user_notification, "info");
                    if (dropme != null) {
                        dropme.resetload();
                    }
                    return;
                }

                if ($.isFunction(wxjsshare)) {
                    wxjsshare(json.share || {});
                }

                if (pageIndex != 1) {
                    $.each(json, function (i, v) {
                        vm.jsondata.push(v);
                    });
                } else
                    vm.jsondata = json;

                vm.isShow = true


                if (pageIndex == 1 && isInit && !json.error && !json.user_notification) {
                    isInit = false;
                    setTimeout(function () {
                        $('#dropload').dropload({
                            scrollArea: window,
                            domDown: {
                                domClass: 'dropload-down',
                                domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
                                domLoad: '<div class="dropload-load"><span class="loading"></span>加载中</div>',
                                domNoData: '<div class="dropload-noData">暂无数据</div>'
                            },
                            loadDownFn: function (me) {
                                pageIndex++;
                                vm.GetInfo(me);
                            }
                        });
                    }, 500)
                }
                if (dropme != null) {
                    dropme.resetload();
                }

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