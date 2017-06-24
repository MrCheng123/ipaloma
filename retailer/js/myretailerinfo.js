
avalon.ready(function () {
    var notification = common.getUrlParam("notification");
    if (notification != "") {
        toasterextend.showtips(notification, "info");
    }

    vm.getretailer()
})


var vm = avalon.define({
    $id: 'myretailerinfo',
    retailer: {},
    contribute: {},
    membership: {},
    distributor: [],
    showmodule: {
        hyzg: true,//会员资格
        wdch: false,//我的超惠
        dphf: true,//店铺惠粉
        dpch: false,//店铺超惠
        sjch: false,//商家超惠
        qyfxs: false//签约分销商
    },
    step: function (i) {
        switch (i) {
            case 1:
                vm.showmodule.hyzg = !vm.showmodule.hyzg
                break
            case 2:
                vm.showmodule.wdch = !vm.showmodule.wdch
                break
            case 3:
                vm.showmodule.dphf = !vm.showmodule.dphf
                break
            case 4:
                vm.showmodule.dpch = !vm.showmodule.dpch
                break
            case 5:
                vm.showmodule.sjch = !vm.showmodule.sjch
                break
            case 6:
                vm.showmodule.qyfxs = !vm.showmodule.qyfxs
                break
            default:

        }
    },
    IsShow: false,
    Isdistributor: false,
    getretailer: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/retailer/weixin/getretailer',
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
                var data = json.data[0];

                vm.retailer = data.retailer 
                vm.contribute = data.contribute
                vm.membership = data.retailer.membershipqualification
                vm.distributor = data.distributor
                if (data.distributor != undefined && data.distributor.length > 0) {
                    vm.Isdistributor = true;

                    if (data.contribute.fansinhistorycount) {
                        getPre(data.contribute.activefanscount / data.contribute.fansinhistorycount * 100);
                    } else {
                        getPre(0);
                    }
                } else {
                    vm.Isdistributor = false;
                }

                vm.IsShow = true
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
        //利用对话框返回的值 （true 或者 false）
        if (confirm("您确定要解除绑定吗？")) {
           // var canshu = id.split('&');
            $.ajax({
                type: 'GET',
                dataType: 'json',
                beforeSend: function () { common.loading.show() },
                complete: function () { common.loading.hide(); },
                url: '/webapi/retailer/weixin/cancelsigndistributor?distributor_id=' + el.guid + '&distributor_domain=' + el.domain + '&retailer_id=' + el.retailerguid,
                success: function (json) {
                    if (json.error) {
                        toasterextend.showtips("解除失败", "info");
                    }
                    else {
                        toasterextend.showtips("解除成功", "info");
                        vm.distributor.splice(index, 1)
                        //setTimeout(function () { window.location.reload(); }, 2000);
                        //$("#" + el.guid + el.retailerguid).remove();
                        //var emcount = $("#" + el.retailerguid + "cnt").text();
                        //var kuohaoqian = emcount.split("（");
                        //var kuohaohou = kuohaoqian[1].split("）");
                        //var count = parseInt(kuohaohou[0]) - 1;
                        //$("#" + el.retailerguid + "cnt").text(kuohaoqian[0] + "（" + count + "）");
                    }
                }
            });
        }
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

function getpdMyfan(myfan) {
    var pdMyfan = 0;
    if (myfan >= 0 && myfan < 10) {
        pdMyfan = 9;
    } else if (myfan >= 10 && myfan < 100) {
        pdMyfan = 4.5;
    } else if (myfan >= 100 && myfan < 100) {
        pdMyfan = 0;
    }

    return pdMyfan
}

function getWin(obj, t,e) {
    if (t == 1)
        e.stopPropagation()
  
    $(window).bind("touchmove", function (e) {
        e.preventDefault();
    });
    var html = '<div id="win"><div class="lazyout"></div>';
    if (t == 2) {
        html += '<div class="s-box" style="background:#fff;width: 90%;left: 5%;"><div class="s-title">如何免审核？</div><div class="s-cont">邀请您的分销商使用凌云科技经销宝和“凌云+”会员系统，并使用经销宝POS机邀请您，此后您的会员资格将免审核<p><input type="button"  onclick="closeWin();" value="我知道了"></p></div></div>';
    } else {
        html += '<div class="weui_cells s-box" ><div class="s-close" onclick="closeWin();"></div><div class="weui_cell">';
        if (t == 1)
            html += '<div class="weui_cell_bd weui_cell_primary"><img src="/retailer/image/we.jpg"  width="100%"/></div>';
        else
            html += '<div class="weui_cell_bd weui_cell_primary  bd-bg">' + $(obj).html() + '        </div>';
        html += '</div><div class="cont">请您核对签约门店是否是您的真实门店，如不正确，请您尽快解除。</div></div></div>';
    }
    $("body").prepend(html);

    var h = $(window).height() > $(document.body).height() ? $(window).height() : ($(document.body).height() + 60);
    $("#win .s-box").css("top", ($(window).height() - $("#win .s-box").outerHeight()) / 2 + $(document).scrollTop() - 50);
    $("#win .lazyout").height(h);
}
function closeWin() {
    $(window).unbind("touchmove");
    $("#win").remove();
}

var isArray = function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}