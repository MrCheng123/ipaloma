$(function () {
    $("#bottom-nav").load("common-bottom-nav.html", function () {
        if (typeof (common) != 'undefined') {
            var activity_id = common.getUrlParam("activityid");
            if (activity_id != "")
                $("#fansmenu").attr("href", $("#fansmenu").attr("href") + "?activity_id=" + activity_id);
        }

        $(".menu").click(function () {
            if ($(this).hasClass("cura")) {
                $(this).children(".new-sub").hide(); //当前菜单下的二级菜单隐藏
                $(".menu").removeClass("cura"); //同一级的菜单项
            } else {
                $(".menu").removeClass("cura"); //移除所有的样式
                $(this).addClass("cura"); //给当前菜单添加特定样式
                $(".menu").children(".new-sub").slideUp("fast"); //隐藏所有的二级菜单
                $(this).children(".new-sub").slideDown("fast"); //展示当前的二级菜单
            }
        });

        if (isWeiXin()) {
            $(".menu a").each(function (i, item) {
                var domain = "http://" + document.domain;
                var oldhref = $(this).attr("href")
                var wxurl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=##appid##&redirect_uri=##website####jump####herf##&response_type=code&scope=snsapi_base&state=ipaloma#wechat_redirect"
                $(this).attr("href", wxurl.replace("##appid##", wxjsconfig.appid).replace("##website##", domain).replace("##jump##", "/webapi/retailer/weixin/jump?returnUrl=").replace("##herf##", oldhref))
            })
        }
    });
});

function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}