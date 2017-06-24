avalon.ready(function () {
    vm.getConsumer()

    vm.getMoney()

    setTimeout(function () {
        qrcode.href();
    }, 1000)
})

var vm = avalon.define({
    $id: 'mycenter',
    isShow: false,
    consumer: {},
    Moneys: { balance: 0 },
    getConsumer: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/consumer/weixin/getconsumer',
            success: function (json) {
                json = json || {};   /* 统一加这句话 */
                vm.consumer = json

                vm.isShow = true
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
    getMoney: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/asset/member/my/asset',
            data: { assettype: '现金', withemployer: false },
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (json) {
                common.loading.hide();
                json = json || {};   /* 统一加这句话 */
                if (json.error) {
                    toasterextend.showtips(json.error, "error");
                    return;
                }
                if (json.user_notification != undefined) {
                    toasterextend.showtips(json.user_notification, "info");
                    return;
                }
                if (json.content.length > 0) {
                    var account = json.content
                    vm.Moneys = account == undefined || account == "" ? {} : account[0];
                }
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
})