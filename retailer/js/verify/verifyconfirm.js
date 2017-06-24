
avalon.ready(function () {


    $('body').dropload({//上拉加载
        scrollArea: window,
        loadUpFn: function (me) {
            vm.getVerifyList(1, me)
            me.resetload();
        }
    });
    vm.getVerifyList(1, null)
})

var tmdropme = null;
var vm = avalon.define({
    $id: 'verifyconfirm',
    authrecordcount: 0,
    array: [],
    pagedata: { lastindexoid: 0, lastindexcolumn: "oid", movingdir: "-" },
    pageIndex: 1,
    getVerifyList: function (pageindex, me) {
        vm.pageIndex = pageindex

        var parameters = { pageindex: pageindex }
        if (vm.pageIndex > 1) {
            parameters = $.extend({}, parameters, vm.pagedata);
        }
        $.ajax({
            type: 'GET',
            dataType: 'json',
            data: parameters,
            beforeSend: function () {
                if (vm.pageIndex == 1)
                    shelter.init({ icos: "/js/shelter/image/loading.gif" })
            },
            url: '/webapi/retailer/weixin/verify/auth/list',
            success: function (json) {
                tmdropme = me
                json = json || {};   /* 统一加这句话 */
                if (vm.pageIndex == 1)
                    shelter.close()

                if (json.data.length == 0) {
                    dealdropme(me);
                    if (vm.pageIndex == 1) {
                        vm.array = []
                        vm.authrecordcount = 0
                    }
                    return;
                }

                if (vm.pageIndex != 1) {
                    $.each(json.data, function (i, v) {
                        vm.array.push(v);
                    });
                } else {
                    vm.array = json.data

                    vm.authrecordcount = json.authrecordcount
                }

                vm.pagedata.lastindexoid = json.lastindexoid
                vm.pagedata.lastindexcolumn = json.lastindexcolumn
                vm.pagedata.movingdir = json.movingdir

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (me != undefined)
                    me.resetload();
                shelter.init({
                    title: "当前网络不给力，请稍候重试",
                    icos: "/js/shelter/image/ico_warn.png",
                    autoClear: 5,
                    shadeClose: true
                })

            }
        });
    },
    allVerify: function () {//全部确认
        if (vm.authrecordcount > 0) {
            shelter.init({
                title: "您真的要全部确认么？",
                shadeClose: true,
                showBtn: true,
                clearBtn: {
                    name: "回去看看",//取消按钮名称
                    click: function () {
                        shelter.close()
                    } //取消按钮事件
                },
                confirmBtn: {
                    name: "确认",//确定按钮名称
                    click: function () {
                        $.ajax({
                            type: 'put',
                            dataType: 'json',
                            beforeSend: function () {
                                shelter.init({ title: "提交中...", icos: "/js/shelter/image/loading.gif" })
                            },
                            url: '/webapi/retailer/weixin/verify/auth/list/complete',
                            success: function (json) {
                                shelter.close();//隐藏转圈动画
                                json = json || {};   /* 统一加这句话 */

                                shelter.init({
                                    title: "操作成功",
                                    icos: "/js/shelter/image/ico_success.png",
                                    autoClear: 2,
                                    shadeClose: true,
                                    closeEnd: function () {
                                        //成功后，重新加载信息
                                        vm.getVerifyList(1, null)
                                    }
                                })
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                var errormsg = "当前网络不给力，请稍候重试";
                                if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                                    var json = JSON.parse(XMLHttpRequest.responseText);
                                    if (json.indexOf("Message") >= 0)
                                        errormsg = JSON.parse(json.Message).error;
                                    else
                                        errormsg = JSON.parse(json).error;
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
                    } //确定按钮事件
                },
            })
        }
    },
    singleVerify: function (state, el) {//单个确认
        shelter.init({
            title: state == "complete" ? "您真的要确认么？" : "您真的要拒绝确认么？",
            shadeClose: true,
            showBtn: true,
            clearBtn: {
                name: "回去看看",//取消按钮名称
                click: function () {
                    shelter.close()
                } //取消按钮事件
            },
            confirmBtn: {
                name: state == "complete" ? "确认" : "残忍拒绝",//确定按钮名称
                click: function () {
                    vm.affirm(state, el.verify_id)
                } //确定按钮事件
            },
            closeEnd: function () {
                vm.getVerifyList(1, null)
            }
        })
    },
    affirm: function (state, verify_id) {//单个确认、拒绝
        $.ajax({
            type: 'put',
            dataType: 'text',
            beforeSend: function () {
                shelter.init({ title: "提交中...", icos: "/js/shelter/image/loading.gif" })
            },
            // complete: function () { shelter.close() },
            url: '/webapi/retailer/weixin/verify/auth/single/' + state + '/' + verify_id,
            success: function (json) {
                shelter.close();//隐藏转圈动画
                json = json || {};   /* 统一加这句话 */

                //成功后，重新加载信息
                shelter.init({
                    title: state == "failure" ? "已拒绝确认" : "已确认",
                    icos: "/js/shelter/image/ico_success.png",
                    autoClear: 2,
                    shadeClose: true,
                    closeEnd: function () {
                        vm.getVerifyList(1, null)
                    }
                })
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                shelter.init({
                    title: "当前网络不给力，请稍候重试",
                    icos: "/js/shelter/image/ico_warn.png",
                    autoClear: 5,
                    shadeClose: true
                })

            }
        });
    },
    getTicketCssType: function (el) {//根据券的类型，返回券使用什么css样式
        var activitykind = el.activitykind
        if (activitykind == "单品")
            return 1
        else if (activitykind == "满返")
            return 2
        else if (activitykind == "套餐")
            return 3
        else if (activitykind == "有礼")
            return 4
        else
            return 5
    },
    jsondataReadered: function (e) {
        if (vm.pageIndex == 1) {
            $(".dropload-down").remove()
            $('#list').dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadDownFn: function (me) {
                    vm.pageIndex++;
                    tmdropme = me;
                    vm.getVerifyList(vm.pageIndex, me)
                }
            });
        }
        if (tmdropme != null)
            tmdropme.resetload();
    }
})

