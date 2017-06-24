var qrcodeconfig = {

    "distributor": {
        "logo": "/consumer/image/consumer_logo.png",
        "loadsuccess": function () { },
        "loaderror": function () { },
        "loadbeforesend": function () {
            common.loading.show();
        },
        "minconsumercard": {
            "url": "/webapi/consumer/weixin/register_generate_code?qrtype=20&combinetext=0&combineicon=0",

            "qrcode": {
                "type": "qrcode",
                "islogo": false,
                "width": 44,
                "height": 44,
                "single": true,
                "x": 0,
                "y": 0
            },
        },
        "consumercard": {
            "url": "/webapi/consumer/weixin/register_generate_code?qrtype=20&combinetitle=0",
            "title": {
                "type": "text",
                "text": "",
                "fontsize": 30,
                "font": "Microsoft YaHei",
                "fontcolor": "#000000",
                "width": 384,
                "height": 60,
                "single": true,
                "textalign": "center",
                "x": 0,
                "y": 30
            },
            "nav": {
                "type": "image",
                "url": "/distributor/image/invitecardnav.png",
                "width": 384,
                "height": 81,
                "single": true,
                "depend": "title",
                "x": 0,
                "y": 60
            },
            "navtext": {
                "type": "text",
                "text": "邀请惠粉码",
                "fontsize": 30,
                "font": "Microsoft YaHei",
                "fontcolor": "#ffffff",
                "depend": "nav",
                "width": 384,
                "height": 81,
                "single": false,
                "textalign": "center",
                "x": 0,
                "y": 95
            },
            "qrcode": {
                "type": "qrcode",
                "depend": "nav",
                "bordercolor": "#d9d9d9",
                "width": 348,
                "height": 348,
                "single": true,
                "x": 18,
                "y": 145
            },
            "date": {
                "type": "text",
                "depend": "qrcode",
                "text": "",
                "fontsize": 20,
                "font": "Microsoft YaHei",
                "fontcolor": "#666666",
                "fillrectcolor": "#e7e7e7",
                "fillrectwidth": 348,
                "fillrectheight": 30,
                "width": 348,
                "height": 40,
                "single": true,
                "textalign": "center",
                "x": 18,
                "y": 514
            },
            "bottom": {
                "type": "text",
                "depend": "qrcode",
                "text": "扫一扫上面的二维码，成为超惠买惠粉！",
                "fontsize": 24,
                "font": "Microsoft YaHei",
                "fontcolor": "#457181",
                "width": 450,
                "height": 81,
                "single": true,
                "textalign": "center",
                "x": 0,
                "y": 560
            }

        }
    },
    "retailer": {
        "logo": "/retailer/image/retailer_logo.png",
        "loadsuccess": function () { },
        "loaderror": function () { },
        "consumercard": {
            "url": "/webapi/consumer/weixin/register_generate_code?qrtype=2023",
            "title": {
                "type": "text",
                "text": "",
                "fontsize": 30,
                "font": "Microsoft YaHei",
                "fontcolor": "#000000",
                "width": 384,
                "height": 60,
                "single": true,
                "textalign": "center",
                "x": 0,
                "y": 30
            },
            "nav": {
                "type": "image",
                "url": "/consumer/image/retailer_consumer_nav.png",
                "width": 384,
                "height": 81,
                "single": true,
                "depend": "title",
                "x": 0,
                "y": 60
            },
            "navtext": {
                "type": "text",
                "text": "门店专属码",
                "fontsize": 30,
                "font": "Microsoft YaHei",
                "fontcolor": "#ffffff",
                "depend": "nav",
                "width": 384,
                "height": 81,
                "single": false,
                "textalign": "center",
                "x": 0,
                "y": 95
            },
            "qrcode": {
                "type": "qrcode",
                "depend": "nav",
                "bordercolor": "#d9d9d9",
                "width": 348,
                "height": 348,
                "single": true,
                "x": 18,
                "y": 145
            },
            "bottomone": {
                "type": "text",
                "depend": "qrcode",
                "text": "扫一扫上面的二维码，成为超惠买惠粉！",
                "fontsize": 20,
                "font": "Microsoft YaHei",
                "fontcolor": "#0e9393",
                "width": 384,
                "height": 30,
                "single": true,
                "textalign": "center",
                "x": 0,
                "y": 510
            },
            "bottomtwo": {
                "type": "text",
                "depend": "bottomone",
                "text": "现在关注送精美礼品一份!",
                "fontsize": 20,
                "font": "Microsoft YaHei",
                "fontcolor": "#0e9393",
                "width": 384,
                "height": 30,
                "single": true,
                "textalign": "center",
                "x": 0,
                "y": 535
            },
            "bottomthree": {
                "type": "text",
                "depend": "bottomtwo",
                "text": "持续关注，一大波优惠让你欢喜!",
                "fontsize": 20,
                "font": "Microsoft YaHei",
                "fontcolor": "#0e9393",
                "width": 384,
                "height": 30,
                "single": true,
                "textalign": "center",
                "x": 0,
                "y": 560
            }
        },
        "inviteretailer": {
            "nav": {
                "type": "image",
                "url": "/consumer/image/retailer_consumer_nav.png",
                "width": 384,
                "height": 81,
                "single": true,
                "x": 0,
                "y": 0
            },
            "navtext": {
                "type": "text",
                "text": "邀请店员码",
                "fontsize": 30,
                "font": "Microsoft YaHei",
                "fontcolor": "#ffffff",
                "depend": "nav",
                "width": 384,
                "height": 81,
                "single": false,
                "textalign": "center",
                "x": 0,
                "y": 40
            },
            "qrcode": {
                "type": "qrcode",
                "depend": "nav",
                "bordercolor": "#d9d9d9",
                "width": 348,
                "height": 348,
                "single": true,
                "x": 18,
                "y": 81
            },
            "date": {
                "type": "text",
                "depend": "qrcode",
                "text": "",
                "fontsize": 20,
                "font": "Microsoft YaHei",
                "fontcolor": "#666666",
                "fillrectcolor": "#e7e7e7",
                "fillrectwidth": 348,
                "fillrectheight": 30,
                "width": 348,
                "height": 40,
                "single": true,
                "textalign": "center",
                "x": 18,
                "y": 450
            },
            "bottom": {
                "type": "text",
                "depend": "qrcode",
                "text": "扫一扫上面的二维码，成为店员!",
                "fontsize": 25,
                "font": "Microsoft YaHei",
                "fontcolor": "#17a297",
                "width": 450,
                "height": 81,
                "single": true,
                "textalign": "center",
                "x": 0,
                "y": 490
            }
        },
        "inviteretailertitle": {
            "nav": {
                "type": "image",
                "url": "/consumer/image/retailer_consumer_nav.png",
                "width": 384,
                "height": 81,
                "single": true,
                "x": 0,
                "y": 0
            },
            "navtext": {
                "type": "text",
                "text": "邀请店员码",
                "fontsize": 30,
                "font": "Microsoft YaHei",
                "fontcolor": "#ffffff",
                "depend": "nav",
                "width": 384,
                "height": 81,
                "single": false,
                "textalign": "center",
                "x": 0,
                "y": 40
            },
            "qrcode": {
                "type": "qrcode",
                "depend": "nav",
                "bordercolor": "#d9d9d9",
                "width": 348,
                "height": 348,
                "single": true,
                "x": 18,
                "y": 81
            },
            "date": {
                "type": "text",
                "depend": "qrcode",
                "text": "",
                "fontsize": 20,
                "font": "Microsoft YaHei",
                "fontcolor": "#666666",
                "fillrectcolor": "#e7e7e7",
                "fillrectwidth": 348,
                "fillrectheight": 30,
                "width": 348,
                "height": 40,
                "single": true,
                "textalign": "center",
                "x": 18,
                "y": 450
            },
            "bottom": {
                "type": "text",
                "depend": "qrcode",
                "text": "长按二维码可保存，可用于制作扫码牌!",
                "fontsize": 25,
                "font": "Microsoft YaHei",
                "fontcolor": "#17a297",
                "width": 450,
                "height": 81,
                "single": true,
                "textalign": "center",
                "x": 0,
                "y": 490
            }
        }
    },
    "consumer": {
        "logo": "/consumer/image/consumer_logo.png",
        "loadsuccess": function () { },
        "loaderror": function () { },
        "sharecard": {
            "qrcode": {
                "type": "qrcode",
                "bordercolor": "#d9d9d9",
                "width": 348,
                "height": 348,
                "single": true,
                "x": 0,
                "y": 0
            }
        },
        "limitverfiy": {
            "url": "/webapi/retailer/weixin/limit_verify_code?qrtype=10001&sendimage=false",
            "background": {
                "type": "image",
                "url": "/retailer/image/verify/verifycode.png",
                "width": 420,
                "height": 595,
                "single": true,
                "depend": "title",
                "x": 0,
                "y": 0
            },
            "qrcode": {
                "type": "qrcode",
                "depend": "background",
                "width": 175,
                "height": 175,
                "single": false,
                "x": 122.5,
                "y": 130
            }
        },
        "consumercard": {
            "nav": {
                "type": "image",
                "url": "/consumer/image/consumercard_verfiy.png",
                "width": 384,
                "height": 81,
                "single": true,
                "x": 0,
                "y": 0
            },
            "navtext": {
                "type": "text",
                "text": "超惠券核销码",
                "fontsize": 30,
                "font": "Microsoft YaHei",
                "fontcolor": "#ffffff",
                "width": 384,
                "height": 81,
                "single": false,
                "textalign": "center",
                "depend": "nav",
                "x": 0,
                "y": 30
            },
            "qrcode": {
                "type": "qrcode",
                "bordercolor": "#d9d9d9",
                "width": 348,
                "height": 348,
                "single": true,
                "depend": "navtext",
                "x": 18,
                "y": 75
            }
        }
    }
};

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

function TextDraw(canvas, name, config, dependconfig) {
    var textinterval = setInterval(function () {

        if (dependconfig == undefined || dependconfig.success) {
            clearInterval(textinterval);
            if (config.fillrectcolor != undefined) {
                canvas.fillStyle = config.fillrectcolor;
                canvas.fillRect(config.x, config.y - config.fontsize, config.fillrectwidth, config.fillrectheight);
            }
            var font = config.fontsize + "px " + config.font;
            if (config.bold)
                font = "bold " + font;
            canvas.font = font;
            canvas.textAlign = config.textalign;
            canvas.textBaseline = 'middle';
            canvas.fillStyle = config.fontcolor;
            canvas.fillText(config.text, config.width / 2, config.y);
            config.success = true;
        }
    }, 100);
}

function ImageDraw(canvas, imagename, config, dependconfig) {
    var imageinterval = setInterval(function () {

        if (dependconfig == undefined || dependconfig.success) {
            clearInterval(imageinterval);
            var img = new Image(config.width, config.height);
            img.src = config.url;
            img.onload = function () {
                canvas.drawImage(img, config.x, config.y, config.width, config.height);
                config.success = true;
            }

        }
    }, 100);

}

function QrcodeDraw(canvas, imagename, config, logo, dependconfig) {
    var qrinterval = setInterval(function () {

        if ((dependconfig == undefined || dependconfig.success) && $("#qrcodediv").length > 0) {

            clearInterval(qrinterval);
            $("#canvasqrcode").remove();
            var qrparmjson = {
                text: config.text,
                render: 'canvas',
                height: config.height,
                width: config.width,
                typeNumber: -1,      //计算模式
                correctLevel: QRErrorCorrectLevel.H,//纠错等级   
                src: logo//这里配置Logo的地址即可。
            }
            if (config.islogo != undefined && config.islogo == false)
                delete qrparmjson["src"];
            $('#qrcodediv').qrcode(qrparmjson);
            var buildqrinterval = setInterval(function () {
                if ($("#qrcodediv").length > 0) {
                    clearInterval(buildqrinterval);
                    var qrcanvas = document.getElementById('canvasqrcode');
                    var qrcodeimage = new Image();
                    qrcodeimage.src = qrcanvas.toDataURL("image/png");
                    qrcodeimage.onload = function () {
                        var borderwidth = 0;
                        if (config.bordercolor) {
                            canvas.strokeStyle = "#ccc";
                            canvas.lineWidth = 1;
                            canvas.strokeRect(config.x, config.y, config.width, config.height);
                            borderwidth = 10;
                        }
                        canvas.drawImage(qrcodeimage, config.x + borderwidth, config.y + borderwidth, config.width - (2 * borderwidth), config.height - (2 * borderwidth));
                        config.success = true;
                    }
                }

            }, 200)
        }
    }, 200);

}

function draw(config, configname, logo) {
    if ($.isFunction(config.loadbeforesend))
        config.loadbeforesend();
    var c = document.createElement('canvas'),
    ctx = c.getContext('2d');

    if (!c.getContext) {
        var qrurl = config[configname]["qrcode"]["url"];
        $('#QRCode_img').attr("src", qrurl);
        if ($.isFunction(config.loadsuccess))
            config.loadsuccess();
        return;
    }

    var qrcodeurl = config[configname]["url"] + "&sendimage=false";
    $.ajaxSettings.async = false;
    $.getJSON(qrcodeurl, function (data) {
        data = data || {};
        $.each(data, function (name, jsondata) {
            $.each(config[configname], function (name1, jsondata1) {
                if (name == name1) {
                    $.extend(true, jsondata1, jsondata);
                    return false;
                }

            });
        });

    });
    $.ajaxSettings.async = true;
    var width = 0;
    var height = 0;
    $.each(config[configname], function (name, jsondata) {
        if (name == "url")
            return true;
        if (width < jsondata.width)
            width = jsondata.width;
        if (jsondata.single)
            height += jsondata.height;
    });

    $.each(config[configname], function (name, jsondata) {
        if (name == "url")
            return true;
        var type = jsondata["type"];

        var dependconfig = config[configname][jsondata.depend];
        if (width > jsondata.width)
            jsondata.x = (width - jsondata.width) / 2;
        if (width > jsondata.width && type == "text")
            jsondata.width = width;
        switch (type) {
            case "text":
                TextDraw(ctx, name, jsondata, dependconfig);
                break;
            case "image":
                ImageDraw(ctx, name, jsondata, dependconfig);
                break;
            case "qrcode":
                QrcodeDraw(ctx, name, jsondata, logo, dependconfig);
                break;
            default:

        }
    });
    c.width = width;
    c.height = height;
    var drawinterval = setInterval(function () {

        var iserror = false;
        var allsuccess = true;
        $.each(config[configname], function (name, jsondata) {
            if (name == "url" || name == "islogo")
                return true;
            if (jsondata.success != true) {
                allsuccess = false;
            }

            if (jsondata.error != undefined) {
                clearInterval(drawinterval);
                config.loaderror();
                if (common.loading)
                    common.loading.hide();//隐藏转圈动画
                iserror = true;
            }
        });
        if (allsuccess == false)
            return;
        if (iserror)
            return;
        clearInterval(drawinterval);
        var hc_image = new Image();
        $('#QRCode_img').attr("src", c.toDataURL("image/png"))
        $.each(config[configname], function (name, jsondata) {
            if (name == "url")
                return true;
            jsondata.success = false;
        });
        config.loadsuccess();
        if (common.loading)
            common.loading.hide();//隐藏转圈动画
    }, 200);

}