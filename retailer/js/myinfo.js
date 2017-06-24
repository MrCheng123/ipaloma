
avalon.ready(function () {
    vm.getMyInfo()

    vm.myMoney()
})


var vm = avalon.define({
    $id: 'myInfo',
    employee: {},//个人信息
    retailername: "",//门店名称
    retailer_id:"",
    contribute: {},//我的贡献
    coworkers: [],//店员列表
    Money: 0,
    IsShow: false,
    showcontribute: true,//默认展示我的贡献
    showemployee: false,
    getMyInfo: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/retailer/weixin/getpersonalpage',
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (json) {
                json = json || {};   /* 统一加这句话 */
                if (json.error) {
                    toasterextend.showtips(json.error, "error");
                    return;
                }
                if (json.user_notification != undefined) {
                    toasterextend.showtips(json.user_notification, "info");
                    return;
                }
                vm.employee = json.employee;
                vm.retailername = json.retailer.retailername
                vm.contribute = json.contribute

                var actfcount = getNumeric(vm.contribute.activefanscount);
                var fansinhistorycount = getNumeric(vm.contribute.fansinhistorycount);
                if (fansinhistorycount) {
                    getPre((actfcount / fansinhistorycount * 100));
                } else {
                    getPre(0);
                }

                vm.coworkers = json.coworkers[0].employee
                vm.retailer_id = json.coworkers[0].retailer_id
                vm.IsShow = true;
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
    firm: function (el, index) {
    
        if (confirm("您确定退出本店吗？")) {
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: '/webapi/retailer/weixin/removeemployee?accountid=' + el.guid + '&retailerid=' + el.retailer_id,
                beforeSend: function () { common.loading.show() },
                complete: function () { common.loading.hide(); },
                success: function (json) {

                    common.loading.hide();//数据请求成功即隐藏转圈动画

                    if (json.error) {
                        toasterextend.showtips("退出失败", "info");
                    }
                    else {
                        toasterextend.showtips("退出成功", "info");
                        vm.coworkers.splice(index, 1)

                        setTimeout(function () { wx.closeWindow(); }, 2000);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    common.loading.hide();//隐藏转圈动画

                    var errormsg = "访问异常";

                    if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                        errormsg = "Http error: " + XMLHttpRequest.statusText;
                    }

                    toasterextend.showtips(errormsg, "error");
                }
            });
        }
    },
    step: function (i) {
        if (i == 1)
            vm.showcontribute = !vm.showcontribute
        else
            vm.showemployee = !vm.showemployee
    },
    myMoney: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/asset/member/my/asset',
            data: { assettype: '现金', withemployer: false },
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (json) {
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
                    vm.Money = json.content[0].balance
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


    }
})

function getNumeric(param) {
    if (typeof (param) !== 'undefined' && $.isNumeric(param)) {
        param = parseInt(param);
        if (param >= 100000 && param < 100000000)
            param = param / 10000 + '万';
        if (param >= 100000000)
            param = param / 100000000 + '亿';
        return param;
    }
    return '';
}

function getPre(pre) {
    if (pre <= 50) {
        $('.pie_left').css({
            transform: 'rotate(' + 180 + 'deg)',
            background: '#4bcb81',
        });
        $('.pie_right').css({
            transform: 'rotate(' + (pre * 3.6) + 'deg)',
            background: '#e8e7e6',
        });
    } else {
        $('.pie_left').css({
            transform: 'rotate(' + 180 + 'deg)',
            background: '#4bcb81',
        });
        $('.pie_right').css({
            transform: 'rotate(' + ((pre - 50) * 3.6) + 'deg)',
            background: '#4bcb81',
        });
    }
}