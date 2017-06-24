avalon.ready(function () {
    $('.Wallet_list ul li').on('click', function () {
        $('.Wallet_list ul li').removeClass('on');
        $(this).addClass('on');
    })

    vm.getMoney()

    vm.getAssetFlow(1, null)

    setTimeout(function () { qrcode.href(); }, 500)
})

var tmdropme = null;
var tmdropme2 = null;
var tmdropme3 = null;

var vm = avalon.define({
    $id: 'mywallet',
    Moneys: { balance: 0 },
    category: "all",
    //list: { all_array: [], income_array: [], expend_array: [] },
    alllist: { array: [], paging: {}, pageIndex: 1 },//全部
    incomelist: { array: [], paging: {}, pageIndex: 1 },//收入
    expendlist: { array: [], paging: {}, pageIndex: 1 },//支出
    getMoney: function () {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/asset/member/my/asset',
            data: { assettype: '现金', withemployer: false },
            beforeSend: function () { common.loading.show(); },
            complete: function () { common.loading.hide(); },
            success: function (json) {
                console.log(json)
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
                    var account = $.grep(json.content, function (item) {
                        return item.owner_class == "tblaccount";//个人收入信息
                    })
                    vm.Moneys = account == undefined || account == "" ? {} : account[0];
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                common.loading.hide();//隐藏转圈动画
                var errormsg = "访问异常";
                if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                    var json = JSON.parse(XMLHttpRequest.responseText);
                    if (json.error != undefined && json.error != null) {
                        errormsg = json.error
                    } else
                        errormsg = JSON.parse(json.Message).error;
                    if (errormsg == undefined || errormsg == '')
                        errormsg = "Http error: " + XMLHttpRequest.statusText;
                }
                toasterextend.showtips(errormsg, "error");
            }
        });
    },
    categorychange: function (type) {
        vm.category = type

        if ((type == "all" && vm.alllist.array.length == 0) || (type == "income" && vm.incomelist.array.length == 0) || (type == "expend" && vm.expendlist.array.length == 0)) {
            $(".dropload-down").remove()
            vm.getAssetFlow(1, null)
        }
    },
    getAssetFlow: function (index, me) {
        var paging = { pageindex: index, current: {} }
        if (index > 1) {
            if (vm.category == "all") {//全部
                paging = $.extend({}, vm.alllist.paging.$model, { pageindex: index });
            } else if (vm.category == "income") {//收入
                paging = $.extend({}, vm.incomelist.paging.$model, { pageindex: index });
            } else {
                paging = $.extend({}, vm.expendlist.paging.$model, { pageindex: index });
            }

        }
        var data = {
            paging: JSON.stringify(paging),
            myemployer: false,
            category: vm.category,
            assettype: "现金"
        }
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: '/webapi/asset/member/my/asset/flowing',
            data: data,
            success: function (json) {
                if (vm.category == "all") {
                    tmdropme = me
                } else if (vm.category == "income") {
                    tmdropme2 = me
                } else
                    tmdropme3 = me
                json = json || {};   /* 统一加这句话 */
                if (json.error) {
                    dealdropme(me);
                    // toasterextend.showtips(json.error, "error");
                    return;
                }
                if (json.user_notification != undefined) {
                    dealdropme(me);
                    //toasterextend.showtips(json.user_notification, "info");
                    return;
                }

                if (index != 1) {

                    if (vm.category == "all") {//全部
                        var filterarray = $.grep(vm.alllist.array, function (item) {
                            return item.summaryperiod != undefined;//筛选出每月统计
                        });

                        $.each(json.content, function (i, v) {
                            if (filterarray.length > 0) {
                                var bl = false;
                                $.each(filterarray, function (i, item) {
                                    bl = !compare(item.$model, v)
                                })
                                if (bl)
                                    vm.alllist.array.push(v)

                            } else {
                                vm.alllist.array.push(v)
                            }
                        });
                        vm.alllist.paging = json.paging
                    } else if (vm.category == "income") {//收入
                        var filterarray = $.grep(vm.incomelist.array, function (item) {
                            return item.summaryperiod != undefined;//筛选出每月统计
                        });
                        $.each(json.content, function (i, v) {
                            if (filterarray.length > 0) {

                                var bl = false;
                                $.each(filterarray, function (i, item) {
                                    bl = !compare(item.$model, v)
                                })
                                if (bl)
                                    vm.incomelist.array.push(v)
                            } else {
                                vm.incomelist.array.push(v)
                            }
                        });
                        vm.incomelist.paging = json.paging
                    } else {
                        var filterarray = $.grep(vm.expendlist.array, function (item) {
                            return item.summaryperiod != undefined;//筛选出每月统计
                        });
                        $.each(json.content, function (i, v) {
                            if (filterarray.length > 0) {
                                var bl = false;
                                $.each(filterarray, function (i, item) {
                                    bl = !compare(item.$model, v)
                                })
                                if (bl)
                                    vm.expendlist.array.push(v)

                            } else {
                                vm.expendlist.array.push(v)
                            }
                        });
                        vm.expendlist.paging = json.paging
                    }

                } else {
                    if (vm.category == "all") {//全部
                        vm.alllist.array = json.content
                        vm.alllist.paging = json.paging
                    } else if (vm.category == "income") {//收入
                        vm.incomelist.array = json.content
                        vm.incomelist.paging = json.paging
                    } else {
                        vm.expendlist.array = json.content
                        vm.expendlist.paging = json.paging
                    }
                }
                if (json.content.length == 0 || json.content.length < 15) {
                    dealdropme(me);
                    $(".dropload-down").remove()
                    return;
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
    jsondataReadered: function (e) {
        if (vm.alllist.pageIndex == 1) {
            $(".dropload-down").remove()
            $('#list_1').dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadDownFn: function (me) {
                    vm.alllist.pageIndex++
                    tmdropme = me;
                    vm.getAssetFlow(vm.alllist.pageIndex, me)
                }
            });
        }
        if (tmdropme != null)
            tmdropme.resetload();
    },
    jsondataReadered2: function (e) {
        if (vm.incomelist.pageIndex == 1) {
            $(".dropload-down").remove()
            $('#list_2').dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadDownFn: function (me) {
                    vm.incomelist.pageIndex++
                    tmdropme2 = me;
                    vm.getAssetFlow(vm.incomelist.pageIndex, me)
                }
            });
        }
        if (tmdropme2 != null)
            tmdropme2.resetload();
    },
    jsondataReadered3: function (e) {
        if (vm.expendlist.pageIndex == 1) {
            $(".dropload-down").remove()
            $('#list_3').dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadDownFn: function (me) {
                    vm.expendlist.pageIndex++
                    tmdropme3 = me;
                    vm.getAssetFlow(vm.expendlist.pageIndex, me)
                }
            });
        }
        if (tmdropme3 != null)
            tmdropme3.resetload();
    },
    userwithdraw: function () {//用户提现
        if (vm.Moneys.balance >= 1)
            $.ajax({
                type: 'GET',
                dataType: 'json',
                data: { count: vm.Moneys.balance },
                url: '/webapi/consumer/mine/withdraw',
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
                        if (json.state == 1) {
                            ///提现成功，重新加载余额记录
                            vm.getMoney()
                            vm.getAssetFlow(1, null)
                        }
                    }
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
})


///对比object 是否相同
function compare(Obj_1, Obj_2) {
    for (var key in Obj_1) {
        if (typeof (Obj_2[key]) === 'undefined') {
            return false;
        } else {
            if (typeof (Obj_1[key]) === 'object') {
                compare(Obj_1[key], Obj_2[key]);
            } else {
                if (Obj_1[key] !== Obj_2[key]) {
                    return false;
                }
            }
        }
    }
    return true;
}