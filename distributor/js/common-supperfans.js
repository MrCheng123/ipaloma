function invitationfans(containerid) {
    this.containerid = containerid;
    this.fanstemplate = [
    '<div class="show-yqhf">',
        '<div class="closebtn"><img src="../image/closebtn.png" /></div>',
        '<div class="yqhf-box">',            
            '<div class="companyewm"><img style="width:90%;" id="QRCode_img" /></div>',
            '<div class="text2">',
                '<span style="color:#c2c2c2;font-size:18px; font-family:微软雅黑;">仅限手机使用</span>',
            '</div><div id="qrcodediv" hidden></div>',
        '</div>',
        '</div>'
    ].join('\n');
}
invitationfans.prototype.render = function () {
    if ($('#' + this.containerid).length == 0) {
        $("<div class='showbox-w1' id='" + this.containerid + "'></div>").appendTo("body");
    }
    var container = $('#' + this.containerid);
    var fanstemplate = this.fanstemplate;
    $('.bottom-btnl').click(function () {
        $(window).bind("touchmove", function (e) {
            e.preventDefault();
        })
        if (container.children().length > 0) {
            container.fadeIn(1000);
            return;
        }
        container.fadeIn(500);
        var activity_id = common.getUrlParam("activity_id");
        var qrcode = qrcodeconfig["distributor"];
        var url = "/webapi/consumer/weixin/register_generate_code?qrtype=20";
        var html = juicer(fanstemplate, {});
        container.html(html);
        if (activity_id != "")
            url = url + "&activity_id=" + activity_id;
        var qrcode = qrcodeconfig["distributor"];
        draw(qrcode, "consumercard", qrcodeconfig["distributor"]["logo"]);
        
        $('.closebtn').click(function () {
            $(window).unbind("touchmove");
            container.fadeOut(1000)
        });
    });
}