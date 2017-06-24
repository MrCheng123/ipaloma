
avalon.ready(function () {
    avalon.scan(document.body)
    $("#dialog").click(function () {
        vm.dialog.Hide()
    })
    // vm.dialog.Show()
    vm.GetMoney();
})

var vm = avalon.define({
    $id: 'withdraw',
    IsShow: false,
    IsWithdraw: false,
    Moneys: 0,
    state: -1,
    dialog: {
        title: "",
        subtitle: "",
        Show: function () {
            $("#dialog").show();
            setTimeout(function () {
                vm.dialog.Hide();
            }, 3000)
        },
        Hide: function () {
            $("#dialog").hide();
            if (vm.state == 0) {
                window.location.reload();
            }
        }
    },
    GetMoney: function () {//获取提现金额
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: '/webapi/asset/member/my/asset',
            data: { assettype: '现金', withemployer: false },
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (jsondata) {

                common.loading.hide();//数据请求成功即隐藏转圈动画
                jsondata = jsondata || {};
                if (jsondata.error) {
                    toasterextend.showtips(jsondata.error, "error", false);
                    return;
                }

                if (jsondata.user_notification != undefined) {
                    toasterextend.showtips(jsondata.user_notification, "info");
                    return;
                }
                vm.IsShow = true;
                if (jsondata.content.length > 0) {
                    vm.Moneys = jsondata.content[0]["balance"]
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                common.loading.hide();//隐藏转圈动画
                vm.IsShow = true;
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
    },
    userwithdraw: function () {//用户提现
        if (vm.Moneys > 0)
            $.ajax({
                type: 'GET',
                dataType: 'json',
                data: { count: vm.Moneys },
                url: '/webapi/distributor/mine/withdraw',
                beforeSend: function () { shelter.init({ icos: "/js/shelter/image/loading.gif", title: "提现中..." }) },
                success: function (json) {
                    shelter.close()
                    json = json || {};   /* 统一加这句话 */
                    if (json.error) {
                        shelter.init({
                            title: json.error,
                            icos: "/js/shelter/image/ico_warn.png",
                            autoClear: 5,
                            shadeClose: true
                        })
                        return;
                    }
                    if (json.user_notification != undefined) {
                        shelter.init({
                            title: json.user_notification,
                            icos: "/js/shelter/image/ico_warn.png",
                            autoClear: 5,
                            shadeClose: true
                        })
                        return;
                    }

                    ///提现成功，重新加载余额记录
                    vm.GetMoney()
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    shelter.close();//隐藏转圈动画
                    var errormsg = "访问异常";
                    if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                        var json = JSON.parse(XMLHttpRequest.responseText);
                        if (json.error != undefined && json.error != null) {
                            errormsg = json.error + (json.user_notification != undefined ? json.user_notification : "")
                        } else
                            errormsg = JSON.parse(json.Message).error;
                        if (errormsg == undefined || errormsg == '')
                            errormsg = "Http error: " + XMLHttpRequest.statusText;
                    }

                    shelter.init({
                        title: errormsg,
                        icos: "/js/shelter/image/ico_error.png",
                        autoClear: 5,
                        shadeClose: true
                    })

                    // toasterextend.showtips(errormsg, "error");
                }
            });
    }
});