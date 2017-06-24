var audio = document.getElementById("shakemusic");
var openAudio = document.getElementById("openmusic");
var flag = 1;
$(document).ready(function () {
    //if (vm.distributor_id == null || vm.distributor_id == "" || vm.retailer_id == null || vm.retailer_id == "" || vm.activity_item_guid == null || vm.activity_item_guid == "" || vm.activity_id == null || vm.activity_id == "" || vm.shakekey == null || vm.shakekey == "") {
    //    toasterextend.showtips("参数错误", "error", false);
    //    $(".red_bg").hide()
    //    return
    //}
    //init()
    $(".red_bg").click(function () {
        shakeAfter()
    });
    loadShakeNum()
})


var vm = new Vue({
    el: '#shakegame',
    data: {
        //owner_id: "",//登陆用户account_id
        shakeNum: 0,//可刮奖次数
        IsShake: false,//是否摇奖
        IsWin: false,//是否中奖
        shakeStatus: 0,//摇一摇状态 0：未摇 1：中奖 2：未中奖 3：没有摇签机会
        winMoney: 0,
    },
    methods: {
        startShake: function () {//开始摇奖】
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '/webapi/marketingservice/topic/shake',
                beforeSend: function () { shelter.init({ icos: "/js/shelter/image/loading.gif", title: "摇奖中，请等待..." }) },
                complete: function () { shelter.close() },
                success: function (result) {
                    shelter.close()
                    vm.IsShake = false;
                    audio.pause();
                    openAudio.play();//播放音乐
                    if (result.error && result.state == undefined) {
                        toasterextend.showtips(result.error, "error");
                        loadShakeNum()
                        return;
                    }
                    if (result.user_notification != undefined && result.state == undefined) {
                        toasterextend.showtips(result.user_notification, "info");
                        loadShakeNum()
                        return;
                    }
                    if (result.state != undefined) {
                        vm.shakeStatus = result.state
                    } else {//中奖
                        vm.shakeStatus = 1
                        vm.winMoney = result.data[0].count
                    }
                    vm.shakeNum--;
                    $('.red-tc').css('display', 'block');
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    var errormsg = "访问异常";
                    vm.IsShake = false;
                    vm.shakeStatus = 0;
                    if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                        var json = JSON.parse(XMLHttpRequest.responseText);
                        errormsg = json.error;
                        if (errormsg == undefined || errormsg == '')
                            errormsg = "Http error: " + XMLHttpRequest.statusText;
                    }
                    toasterextend.showtips(errormsg, "error");
                }
            });
        },
        againClick: function (e) {//再摇一次
            $('.red-tc').css('display', 'none');
            vm.IsShake = false;
            vm.winMoney = 0;
            vm.shakeStatus = 0;
        },
        closeBJ: function (e) {
            $('.red-tc').css('display', 'none');
        }
    }
})

///加载摇奖次数
function loadShakeNum() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/webapi/asset/member/my/asset',
        data: { assettype: '摇一摇', withemployer: false },
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
                vm.shakeNum = json.content[0].balance

                ///初始化摇一摇效果代码
                init()
            }
            $(".red_bg").show()
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            common.loading.hide();//隐藏转圈动画
            var errormsg = "访问异常";

            if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                var json = JSON.parse(XMLHttpRequest.responseText);
                errormsg = json.error;
                if (errormsg == undefined || errormsg == '')
                    errormsg = "Http error: " + XMLHttpRequest.statusText;
            }
            toasterextend.showtips(errormsg, "error");
        }
    });
}

//var vm = avalon.define({
//    $id: "shakegame",
//    shakeNum: 1,//摇一摇次数
//    shakeStatus: 0,//摇一摇状态 0：未摇 1：中奖 2：未中奖 3：没有摇签机会
//    winMoney: 0,//中奖金额
//    IsShake: false,
//    IsWin: false,
//    IsPause: false,
//    distributor_id: common.getUrlParam("distributor_id"),
//    retailer_id: common.getUrlParam("retailer_id"),
//    activityitem_id: common.getUrlParam("activityitem_id"),
//    activity_id: common.getUrlParam("activity_id"),
//    shakekey: common.getUrlParam("shakekey"),
//    startShake: function () {//开始摇一摇
//        vm.shakeNum--;
//        $.ajax({
//            type: 'post',
//            dataType: 'json',
//            async: false,
//            data: {
//                distributor_id: vm.distributor_id,
//                retailer_id: vm.retailer_id,
//                activityitem_id: vm.activityitem_id,
//                activity_id: vm.activity_id,
//                shakekey: vm.shakekey
//            },
//            url: '/webapi/consumer/weixin/verifyshake',
//            success: function (result) {
//                audio.pause();
//                openAudio.play();//播放音乐
//                vm.shakeStatus = result.result == 1 ? 1 : 2;
//                if (vm.shakeStatus == 1) {
//                    vm.winMoney = result.total_amount
//                    vm.IsWin = true
//                }
//                $('.red-tc').css('display', 'block');
//            },
//            error: function (XMLHttpRequest, textStatus, errorThrown) {
//                vm.shakeStatus = 2;
//                // vm.shakeNum--;
//                $('.red-tc').css('display', 'block');
//            }
//        });
//    },
//    againClick: function () {
//        vm.IsPause = false;
//        vm.shakeStatus = 0;
//        vm.IsShake = false
//        flag = 1;
//        $('.red-tc').css('display', 'none');
//    }
//})

function Pause(obj, iMinSecond) {
    if (window.eventList == null)
        window.eventList = new Array();
    var ind = -1;
    for (var i = 0; i < window.eventList.length; i++) {
        if (window.eventList[i] == null) {
            window.eventList[i] = obj;
            ind = i;
            break;
        }
    }
    if (ind == -1) {
        ind = window.eventList.length;
        window.eventList[ind] = obj;
    }
    setTimeout("GoOn(" + ind + ")", iMinSecond);
}
/*
 * 该函数把要暂停的函数放到数组window.eventList里，同时通过setTimeout来调用继续函数。 继续函数如下：
 */
function GoOn(ind) {
    var obj = window.eventList[ind];
    window.eventList[ind] = null;
    if (obj.NextStep)
        obj.NextStep();
    else
        obj();
}
/////生成随机数
//function getRandom(n) {
//    return Math.floor(Math.random() * n + 1)
//}

function closeWindow() {
    wx.closeWindow();
}

var SHAKE_THRESHOLD = 3000;
var last_update = 0;
var x = y = z = last_x = last_y = last_z = 0;
function init() {
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        alert('not support mobile event');
    }
}
function deviceMotionHandler(eventData) {
    var acceleration = eventData.accelerationIncludingGravity;
    var curTime = new Date().getTime();
    if ((curTime - last_update) > 100) {
        var diffTime = curTime - last_update;
        last_update = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;
        var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 10000;

        if (speed > SHAKE_THRESHOLD) {
            shakeAfter()
        }
        last_x = x;
        last_y = y;
        last_z = z;
    }
}


function shakeAfter() {
    if (!vm.IsShake) {
        vm.IsShake = true
        audio.play();
        $('.red-ss').addClass('wobble')

        // $('.red-ss').removeClass('wobble')
        if (vm.shakeNum > 0) {
            vm.startShake()
            //if (!vm.IsWin) {
            //    vm.startShake()
            //} else {
            //    vm.shakeNum--
            //    vm.shakeStatus = 2;
            //    audio.pause();
            //    $('.red-tc').css('display', 'block');
            //}
        } else {//没有抽奖次数
            vm.shakeStatus = 3;
            audio.pause();
            $('.red-tc').css('display', 'block');
        }
    }
}