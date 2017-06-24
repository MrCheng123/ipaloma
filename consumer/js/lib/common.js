!function (factory) {

    // amd & cmd
    if (typeof define == 'function' && (define.amd != undefined || define.cmd != undefined)) {
        define(function () {
            return factory();
        });
    } else {
        var ex = factory();
        // CommonJS NodeJS
        if (typeof module !== 'undefined' && typeof exports === 'object') {
            module.exports = ex;
        }
            // without module
        else {
            for (var i in ex) {
                window[i] = ex[i];
            }
        }
    }
}
(function () {

    var common = {};
    common.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)
            return decodeURI(r[2]);
        return "";
    }
    //万 亿格式
    common.str_pep_num = function (num) {
        if (num >= 100000000) {
            return parseInt(Math.round(num / 100000000)) + '亿';
        } else if (num >= 1000000) {
            //			alert(1)
            return parseInt(Math.round(num / 10000)) + '万';
        } else if (num >= 10000) {
            return (Math.round((num * Math.pow(10, 2)) / 10000) / Math.pow(10, 2).toFixed(2)) + '万';
        }
        return num;
    }
    //转换百分比
    common.str_percent = function (num) {
        return parseInt(Math.round(num * 100)) + '%';
    }


    /*
    截止2016年1月
    三大运营商最新号段 合作版 
    移动号段：134 135 136 137 138 139 147 150 151 152 157 158 159 178 182 183 184 187 188
    联通号段：130 131 132 145 155 156 171 175 176 185 186
    电信号段：133 149 153 173 177 180 181 189
    虚拟运营商:170
	*/
    common.verifyMobile = function (mobile) {

        if (mobile == undefined || mobile == null) return false;

        var vmobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
        if (mobile.length != 11 || !vmobile.test(mobile)) {
            return false;
        } else {
            return true;
        }
    }
    common.checkVerifyCode = function (vCode) {

        if (mobile == undefined || mobile == null) return false;

        if (vCode.length != 6 || isNaN(vCode)) {
            return false
        }
        else {
            return true;
        }
    }
    common.product = {
        getFlag: function (activityFlag) {
            var flag;
            if (activityFlag == 1)
                flag = "进行中";
            else if (activityFlag == 2)
                flag = "已结束";
            else
                flag = "没开始";
            return flag;
        },
        getFlagCss: function (activityFlag) {
            return activityFlag == 1 ? "pname1" : "pname2";
        },
        getActivityKind: function (itemObj) {
            //活动类型
            if (itemObj.activitykind == "有礼") {
                common.product.imgUrl = "http://dl.oss.ipaloma.com/common/membership/default/pcc2a255b65f2340cc8d7b83b67f9251ab.png";
                return '<div class="zeng"><img src="/consumer/image/icon05.png" /></div><div class="zproname">' + itemObj.giftname + '</div>';
            } else if (itemObj.activitykind == "降价") {
                common.product.imgUrl = "http://dl.oss.ipaloma.com/common/membership/default/pc64ffc4952f844a859da9ac728644f0f7.png";
                return '<div class="nowprice">￥<span>' + itemObj.discountprice + '</span></div><div class="preprice"><div class="discount">' + itemObj.discount + '折</div><div class="price">￥' + itemObj.originalprice + '</div></div>';
            } else if (itemObj.activitykind == "临期" || itemObj.activitykind == "临期特卖") {
                common.product.imgUrl = "http://ipa-oss-hz-01.oss-cn-hangzhou.aliyuncs.com/common/membership/default/pc9d95f8acf1334253a3f9509d91f03345.png";
                return '<div class="nowprice">￥<span>' + itemObj.discountprice + '</span></div><div class="preprice"><div class="discount">' + itemObj.discount + '折</div><div class="price">￥' + itemObj.originalprice + '</div></div>';
            } else if (itemObj.activitykind == "买赠" || itemObj.activitykind == "赠品") {
                common.product.imgUrl = "http://dl.oss.ipaloma.com/common/membership/default/pcd3526ac7c342418c831626ae0aae4cb9.png";
                return '<div class="nowprice">￥<span>' + itemObj.unitprice + '</span></div><div class="preprice"><div class="gift">买' + (itemObj.buycount + '赠' + itemObj.giftcount) + '</div></div>';
            } else if (itemObj.activitykind == "套餐") {
                common.product.imgUrl = "http://dl.oss.ipaloma.com/common/membership/default/pc6ae38d0ba8914fe7aa69ee3ec6c91a1f.png";
                return '<div class="nowprice">￥<span>' + itemObj.discountprice + '</span></div><div class="preprice"><div class="discount">已节省' + itemObj.sparevalue + '元</div><div class="price">￥' + itemObj.originalprice + '</div></div>';
            }
            return "";
        },
        getActivityKind2: function (obj) {
            if (obj.activitykind == "有礼")
                return ' <div class="pre"><font class="l">赠</font><div class="txt-r">' + obj.giftname + '</div></div>';
            else if (obj.activitykind == "降价")
                return ' <div class="t-sm"><span class="s2">' + obj.discount + '折</span></div><div class="jg"><strong>￥' + obj.discountprice + '</strong><del>￥' + obj.originalprice + '</del></div>';
            else if (obj.activitykind == "临期" || obj.activitykind == "临期特卖")
                return ' <div class="t-sm"><span class="s2">' + obj.discount + '折</span></div><div class="jg"><strong>￥' + obj.discountprice + '</strong><del>￥' + obj.originalprice + '</del></div>';
            else if (obj.activitykind == "买赠" || obj.activitykind == "赠品") {
                return '<div class="t-sm"><span class="s2">买' + (obj.buycount + '赠' + obj.giftcount) + '</span></div><div class="jg"><strong>￥' + obj.unitprice + '</strong></div>';
            } else if (obj.activitykind == "套餐")
                return '<div class="t-sm"><span class="s2">已节省' + obj.sparevalue + '元</span></div><div class="jg"><strong>￥' + obj.discountprice + '</strong><del>￥' + obj.originalprice + '</del></div>';
            return '';
        }
    }
    /*
    * 等待加载动画
    */
    common.loading = {
        show: function () {
            $("body").append('<div id="loading" class="pin-spinner"><div class="pin-spinner-container pin-spinner-container1"><div class="pin-spinner-circle1"></div><div class="pin-spinner-circle2"></div><div class="pin-spinner-circle3"></div><div class="pin-spinner-circle4"></div></div><div class="pin-spinner-container pin-spinner-container2"><div class="pin-spinner-circle1"></div><div class="pin-spinner-circle2"></div><div class="pin-spinner-circle3"></div><div class="pin-spinner-circle4"></div></div><div class="pin-spinner-container pin-spinner-container3"><div class="pin-spinner-circle1"></div><div class="pin-spinner-circle2"></div><div class="pin-spinner-circle3"></div><div class="pin-spinner-circle4"></div></div></div>');
        },
        hide: function () {
            $("#loading").remove();
        }
    }
    common.common = common;
    return common;

});
