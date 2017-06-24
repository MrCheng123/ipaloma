!function (factory) {

    // amd & cmd
    if (typeof define == 'function' && (define.amd != undefined || define.cmd != undefined)) {
        define(function (require) {
            var jquery = require('jquery');
            var guid = require('guid');
            var wx = require('wx');
            require('wxconfiginit');
            return factory(jquery, guid, wx);
        });
    } else {
        var ex = factory($, Guid, wx);
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
(function ($, Guid, wx) {

    function newGuid() {
        return new Guid().newGuid();
    }

    function wxjsshare(shareOptions) {

        wx.ready(function () {
            wxjsconfig.menuitems = wxjsconfig.menuitems || [];
            if (wxjsconfig.menuitems.length == 0) {
                return;
            }
            wx.showMenuItems({
                menuList: wxjsconfig.menuitems,
                success: function (res) {
                },
                fail: function (res) {
                }
            });
            activate(shareOptions);
        });

    }

    function activate(shareOptions) {
        var jsonShare = dealmenu(shareOptions);
        $.each(wxjsconfig.menuitems, function (i, item) {
            switch (item) {
                case "menuItem:share:appMessage":
                    wx.onMenuShareAppMessage(jsonShare);
                    break;
                case "menuItem:share:timeline":
                    wx.onMenuShareTimeline(jsonShare);
                    break;
                case "menuItem:share:qq":
                    wx.onMenuShareQQ(jsonShare);
                    break;
                case "menuItem:share:weiboApp":
                    wx.onMenuShareWeibo(jsonShare);
                    break;
                case "menuItem:share:QZone":
                    wx.onMenuShareQZone(jsonShare);
                    break;
                default:
                    break;
            }
        });

    }

    function wxjssharelink(shareOptions, queryOnly) {


        var urlquery = $.param(shareOptions);

        if (queryOnly)
            return urlquery;
        var wxjsconfigtemp = wxjsconfig;
        if (shareOptions.sharetype != undefined)
            wxjsconfigtemp = wxjsconfig["share"][shareOptions.sharetype];
        return wxjsconfigtemp.sharelinkbase + (wxjsconfigtemp.sharelinkbase.indexOf('?') > 0 ? "&" : "?") + urlquery;
    }

    function dealmenu(shareOptions) {

        var newguid = newGuid();
        var options = { guid: newguid, share_id: newguid };
        var wxjsconfigtemp = wxjsconfig;

        if (shareOptions.sharetype != undefined) {
            wxjsconfigtemp = wxjsconfig["share"][shareOptions.sharetype];
        }

        if (wxjsconfig.sharekey != null)
            options[wxjsconfig.sharekey] = "_";

        var shareimg = wxjsconfigtemp.shareimage;
        if (shareimg == '') {
            shareimg = shareOptions.share_imgurl;
            if (shareimg == '' || shareimg == null) {
                var imgfirst = $("img[src^='http']");
                if (imgfirst.length > 0)
                    shareimg = imgfirst.eq(0).attr("src");
            }
        }
        var sharedesc = wxjsconfigtemp.sharedesc;
        if (sharedesc == '') {
            sharedesc = shareOptions.share_desc;
            if (sharedesc == '' || sharedesc == undefined) {
                var metaimgfirst = $("meta[name='description']");
                if (metaimgfirst.length > 0)
                    sharedesc = metaimgfirst.eq(0).attr("content");
            }
        }

        var sharetitle = wxjsconfigtemp.sharetitle;

        if (sharetitle == '' || sharetitle == undefined) {
            sharetitle = shareOptions.share_title;
            if (sharetitle == '' || sharetitle == undefined) {
                sharetitle = document.title;
            }
        }

        var share2Opention = $.extend({}, {}, shareOptions);
        delete share2Opention["share_desc"];
        delete share2Opention["share_imgurl"];
        delete share2Opention["share"];
        delete share2Opention["share_title"];
        delete share2Opention["activity"];
        $.each(share2Opention,
            function (name, json) {
                if (jQuery.type(json) == "object")
                    delete share2Opention[name];
            });

        var sharelink = wxjsconfigtemp.sharelink;
        if (sharelink == '' || sharelink == undefined) {
            sharelink = wxjssharelink($.extend({}, share2Opention, options), false);
        }
        var menushare = {
            title: sharetitle,
            desc: sharedesc,//wxjssharedesc,
            link: sharelink,
            imgUrl: shareimg,//wxjsshareimage,
            trigger: function (res) {
                // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
            },
            success: function (res) {
                if (!$.isEmptyObject(share2Opention)) {
                    var shareSetting = { shareurl: encodeURIComponent(sharelink), sharetype: "share" };
                    var settings = $.extend({}, share2Opention, shareSetting, options);
                    var category = "consumer";
                    if (typeof (share_category) != 'undefined')
                        category = share_category;
                    $.getJSON("/webapi/" + category + "/weixin/jsshare?" + wxjssharelink(settings, true));
                    activate(shareOptions);
                }

                if (typeof (sharesuccess) != "undefined") {
                    if ($.isFunction(sharesuccess)) {
                        sharesuccess()
                    }
                }
            },
            cancel: function (res) {
            },
            fail: function (res) {
            }
        };
        return menushare;
    }
    //兼容全局JS
    wxjsshare.wxjsshare = wxjsshare;
    return wxjsshare;
});