//var shelter = function (options) {
//    var defaults = {
//        title: "加载中...",//提示
//        icos: "",//提示文字左侧显示图标
//        showBtn: false,//是否显示按钮
//        isShowClearBtn: true,//是否显示取消按钮
//        clearBtn: {
//            name: "取消",//取消按钮名称
//            click: function () {
//                options.close()
//            } //取消按钮事件
//        },
//        confirmBtn: {
//            name: "确定",//确定按钮名称
//            click: function () { } //确定按钮事件
//        },
//        autoClear: 0,//（秒数）自动关闭。默认0，不关闭
//        shadeClose: false,//是否可以点击任意处关闭
//        close: function () {//关闭事件
//            $("#mask,#shelterContent").remove()
//        }
//    }
//};
var shelter = {
    defaults: {
        header:"",//头部，传html
        title: "加载中...",//提示
        icos: "",//提示文字左侧显示图标
        showBtn: false,//是否显示按钮
        isShowClearBtn: true,//是否显示取消按钮
        clearBtn: {
            name: "取消",//取消按钮名称
            click: function () {
                options.close()
            } //取消按钮事件
        },
        confirmBtn: {
            name: "确定",//确定按钮名称
            click: function () { } //确定按钮事件
        },
        autoClear: 0,//（秒数）自动关闭。默认0，不关闭
        shadeClose: false,//是否可以点击任意处关闭
        closeEnd: null//关闭结束后事件
    },
    close: function () {//关闭事件
        $("#shelter").remove()
    },
    init: function (option) {
        shelter.close()
        var options = $.extend({}, shelter.defaults, option || {});

        ///拼html
        var strHtml = "<div id=\"shelter\"><div id=\"mask\"></div>";
        strHtml += "<div id=\"shelterInfo\">  " + options.header;
        strHtml += " <div id=\"shelterContent\">";
        if (options.title != "") {//提示
            strHtml += "<p>"
            if (options.icos != "")
                strHtml += "<img src=\"" + options.icos + "\" />"
            strHtml += options.title
            strHtml += "</p>"
        }
        if (options.showBtn) {//显示按钮
            strHtml += "  <div id=\"btnGroup\">"
            if (options.isShowClearBtn)//显示取消按钮
                strHtml += "<div id=\"clearBtn\" class=\"btnVerify\">" + options.clearBtn.name + "</div>"
            strHtml += " <div id=\"confirmBtn\" class=\"btnVerify active\" style=\"" + (options.isShowClearBtn ? "float:right" : "margin:0 auto") + "\">" + options.confirmBtn.name + "</div>"
            strHtml += "</div><div class=\"clear\"></div>"
        }
        strHtml += "</div></div></div>";

        $('body').append(strHtml);

        //绑定事件
        if (options.isShowClearBtn)
            $("#clearBtn").on("click", options.clearBtn.click)
        $("#confirmBtn").on("click", options.confirmBtn.click)

        var timeout = null

        if (options.autoClear > 0) { //自动关闭
            timeout = setTimeout(function () {
                shelter.close()
                if (typeof (options.closeEnd) == "function")
                    options.closeEnd()
            }, options.autoClear * 1000)
        }
        if (options.shadeClose) {//点击任意处关闭
            $("#mask").on("click", function () {
                shelter.close()
                if (typeof (options.closeEnd) == "function") {
                    options.closeEnd()
                    clearTimeout(timeout)
                }
            })
        }
    }
}