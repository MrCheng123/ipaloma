function invitefans() {
    var retailer_id = common.getUrlParam("retailer_id");
    var activity_id = common.getUrlParam("activity_id");
    var ajaxdata = { retailerid: retailer_id };

    if (wxjsconfig.sharekey != null)
        ajaxdata[wxjsconfig.sharekey] = "_";
    $.getJSON2("/webapi/retailer/weixin/getonlyoneretailer", ajaxdata, function (json) {
        var retailer = json.retailer;
        if (typeof (retailer.picture_url) !== 'undefined')
            $("#retailerimg").attr("src", retailer.picture_url);
        if (typeof (retailer.retailername) !== 'undefined')
            $("#retailername").html(retailer.retailername);
        if (typeof (retailer.address) !== 'undefined')
            $("#retaileradres").html(retailer.address);
        if (typeof (retailer.mobilephone) !== 'undefined')
            $("#retailertel").html(retailer.mobilephone);
    });
    //seajs.data.vars.retailer_id_consumer_register_generate_code
    var src = "/webapi/consumer/weixin/register_generate_code?qrtype=2023";
    if (retailer_id != "")
        src += "&retailer_id=" + retailer_id;
    var qrcode = qrcodeconfig["retailer"];
    qrcode["consumercard"]["url"] = src;
    draw(qrcode, "consumercard", qrcodeconfig["consumer"]["logo"]);

    //$("#retailerqrcode").attr("src", src);
}
$(function () {
    invitefans();
});




