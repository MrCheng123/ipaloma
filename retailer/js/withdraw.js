
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
                $("#dialog").hide();
            }, 2500)
        },
        Hide: function () {
            $("#dialog").hide();
        }
    },
    GetMoney: function () {//获取提现金额
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: '/webapi/retailer/mine/money',
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
                vm.Moneys = jsondata["total_amount"]
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
                toasterextend.showtips(errormsg, "error");
            }
        });
    },
    MoneyWithdraw: function () {//提现
        if (vm.Moneys >= 1) {
            if (vm.IsWithdraw == false) {
                vm.IsWithdraw = true
                $.ajax({
                    type: 'post',
                    dataType: "json",
                    url: '/webapi/retailer/mine/money/tixian',
                    beforeSend: function () { common.loading.show(); },
                    complete: function () { common.loading.hide(); },
                    success: function (jsondata) {

                        common.loading.hide();//数据请求成功即隐藏转圈动画
                        jsondata = jsondata || {};
                        if (jsondata.error) {
                            vm.dialog.subtitle = jsondata.user_notification
                            vm.state = 0;
                            vm.IsWithdraw = false;//提现失败，重置状态，可以重新点击提现
                            vm.dialog.Show()
                            return;
                        }

                        if (jsondata.state != undefined && jsondata.state == 0) {
                            vm.dialog.subtitle = jsondata.user_notification
                            vm.state = 0;
                            vm.IsWithdraw = false;//提现失败，重置状态，可以重新点击提现
                            vm.dialog.Show()
                            return;
                        }
                        var title = jsondata.user_notification.split('|')
                        vm.dialog.title = title[0]
                        vm.dialog.subtitle = title[1]
                        ///提现成功，
                        vm.Moneys = 0
                        vm.state = 1
                        vm.dialog.Show();
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
                        toasterextend.showtips(errormsg, "error");
                    }
                });
            }

        }
    }

});