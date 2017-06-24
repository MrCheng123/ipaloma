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
