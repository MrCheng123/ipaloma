
avalon.ready(function () {
    vm.verifycode()
})


var vm = avalon.define({
    $id: 'verifycodebind',
    state: 0,//1.二维码校验成功，2.二维码校验失败
    errorMsg: "这不是核销码，请核实后再试！",
    qrlimitken: common.getUrlParam("qrlimitken"),
    retailername: common.getUrlParam("retailername"),
    bindcode: function () {
        $.ajax({
            type: 'put',
            dataType: 'json',
            beforeSend: function () {
                shelter.init({ icos: "/js/shelter/image/loading.gif" })
            },
            data: { qrlimitken: vm.qrlimitken },
            url: '/webapi/retailer/weixin/qrlimitverify/binding',
            success: function (json) {
                shelter.close();
                if (typeof (obj) != "object")
                    json = JSON.parse(json)
                if (json.error != undefined || json.error != null) {
                    shelter.init({
                        name: json.error,
                        icos: "/js/shelter/image/ico_error.png",
                        autoClear: 5,
                        shadeClose: true
                    })
                    return
                }

                var msg = "";
                if (json.user_notification != undefined || json.user_notification != null) {
                    msg = json.user_notification
                }
                shelter.init({
                    title: msg == "" ? "已绑定" : msg,
                    icos: "/js/shelter/image/ico_success.png",
                    autoClear: 5,
                    shadeClose: true
                })
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                //shelter.init({
                //    title: "当前网络不给力，请稍候重试",
                //    icos: "/js/shelter/image/ico_warn.png",
                //    autoClear: 5,
                //    shadeClose: true
                //})

                var errormsg = "当前网络不给力，请稍候重试";
                if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                    var json = JSON.parse(XMLHttpRequest.responseText);
                    errormsg = JSON.parse(json.Message);
                    if (errormsg == undefined || errormsg == '')
                        errormsg = "Http error: " + XMLHttpRequest.statusText;
                }
                shelter.init({
                    title: errormsg,
                    icos: "/js/shelter/image/ico_warn.png",
                    autoClear: 5,
                    shadeClose: true
                })
            }
        });
    },
    verifycode: function () {//校验二维码是否正确
        $.ajax({
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                shelter.init({ icos: "/js/shelter/image/loading.gif" })
            },
            url: '/webapi/retailer/weixin/qrlimitverify/' + vm.qrlimitken,
            success: function (json) {
                if (json.user_notification != undefined && json.user_notification != null) {
                    vm.errorMsg = json.user_notification
                    vm.state = 2
                } else {
                    shelter.close()
                    vm.state = 1
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                vm.state = 2
                vm.getQRcode()
            }
        });
    },
    getQRcode: function () {

        $.ajax({
            type: 'get',
            dataType: 'json',
            beforeSend: function () {
                shelter.init({ icos: "/js/shelter/image/loading.gif" })
            },
            url: '/webapi/retailer/weixin/limit_verify_code?qrtype=10001&sendimage=false',
            success: function (json) {
                if (json.user_notification != undefined && json.user_notification != null) {
                    vm.errorMsg = json.user_notification
                    vm.state = 2
                } else {
                    shelter.close()
                    draw(json.qrstring)
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                shelter.init({
                    title: "专属核销码加载失败", icos: "/js/shelter/image/ico_error.png",
                    autoClear: 5,
                    shadeClose: true
                })
            }
        });
        //$("#QRCode_img").attr("src", '/webapi/retailer/weixin/limit_verify_code?qrtype=10001&combinetext=false')
        //$("#QRCode_img").load(function () {//二维码加载成功
        //    shelter.close()
        //    draw()
        //});
        //$('#QRCode_img').error(function () {
        //    shelter.init({
        //        title: "专属核销码加载失败", icos: "/js/shelter/image/ico_error.png",
        //        autoClear: 5,
        //        shadeClose: true
        //    })
        //});
    }
})