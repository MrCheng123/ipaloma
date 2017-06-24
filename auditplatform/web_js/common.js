/**
 * 替换全部
 * @param s1
 * @param s2
 * @returns {string}
 */
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};

/**
 *  获取当前请求参数
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null)
        return unescape(r[2]);
    return null; //返回参数值
}
String.format = function () {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
}

/**
 * 组装省市下拉框
 */
function assembleProvinceSelector() {
    $.ajax({
        type: 'get',
        async: false,
        url: '../web_js/province.json',
        data: {
        },
        success: function (msg) {
            if (msg != null) {
                var index = 1;
                var domFormat = '<div class="address-d area" dad="a" data-type="{0}">【{1}】</div>';
                var domchildFormat = '<div class="address-x area" xad="a" data-type="{0}">{1}</div>'
                var doms = ''
                for (var p in msg) {
                    doms += String.format(domFormat, index, p);
                    doms += '<div class="address-x-w">';
                    var hbs = msg[p];
                    for (var i = 0; i < hbs.length; i++) {
                        doms += String.format(domchildFormat, index, hbs[i]);
                    }
                }
                doms += '</div>';
                $(".address-n").html(doms);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            //alert("网络异常");
        }
    });
}

/**
 * 获取编辑器内容
 */
function getContentTxtNew() {
    //var arr = [];
    //arr.push("使用editor.getContentTxt()方法可以获得编辑器的纯文本内容");
    //arr.push("编辑器的纯文本内容为：");
    //arr.push(UE.getEditor('editor').getContentTxt());
    //alert(arr.join("\n"));
    return UE.getEditor('editor').getContentTxt();
}


/**
 * 生成guuid
 * @returns {string}
 */
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

/**
 * 判断是否有登录
 */
function isLogin() {
    var cookies = document.cookie.split(';');
    if (cookies.length == 0)
        return false;
    return true;
}

$(function () {
    /**
     * 退出登录
     */
    $(".loginout").click(function () {
        $.cookie('userid', null);
        //$.cookie("userid",null,{path:"/"});
        window.location.href = "login.html";
    });
});