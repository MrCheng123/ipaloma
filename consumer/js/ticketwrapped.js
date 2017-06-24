avalon.ready(function () {
    avalon.scan(document.body)
})
var vm = avalon.define({
    $id: 'ticketwrapped',
    array: [],
    type: 1,
    GetList: function () {
        $.ajax({
            type: 'GET',
            dataType: "json",
            url: '/webapi/consumer/weixin/activities/',
            data: ajaxdata,
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (jsondata) {
                common.loading.hide();//数据请求成功即隐藏转圈动画
                vm.array = jsondata
                // qrcode.show();
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
                // qrcode.href();
                toasterextend.showtips(errormsg, "error");
            }
        });
    },
    tabclick: function (i) {
        vm.type = i
    }

})