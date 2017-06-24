function participateretailer(container) {
    this.container = $(container);
    //todo:修复currentstate

    this.activitylisttemplate = [
   '<div class="hd-chbox-w">',
        '<a href="suppermarketactivityitems.html?activity_id=${guid}">',
            '<div class="hdbox" style="margin-bottom:0px;">',
                '<div class="img">',
                    '<img src="${posterpic}" />',
                    '{@if currentstate=="进行中"}',
                        '<div class="state1"> ${currentstate} </div>',
                        '{@else}',
                        '<div class="state2"> ${currentstate} </div>',
                        '{@/if}',
                '</div>',
                '<div class="text">',
                    '<div class="hdname">${activitytitle}</div>',
                    '<div class="hdnum">${activitycode}<span><img src="../image/icon03.png" />${fanscount}</span></div>',
                    '<div class="hdtime2">${begintime}&nbsp;至&nbsp;${endtime}</div>',
                '</div>',
            '</div>',
        '</a>',
    '</div>',
    '<div class="joinmdtit">',
        '参加门店<span>(${retailercount})</span>',
    '</div>',
    '{@each retailers as item}',
    '<div class="mdlis-w">',
        '<div class="store1-w">',
            '<div class="store1-left">',
                '<div class="storerimg"><img src="${item.picture_url}" /></div>',
                '<div class="textinfo">',
                    '<div class="storename">${item.retailername}</div>',
                    '<div class="active-num">${item.contactperson}</div>',
                '</div>',
            '</div>',
            '{@if item.fixline !=""}',
            '<a href="tel:${item.fixline}">',
                '<div class="store1-right">',
                    '<img src="../image/tel.png" /><br />',
                    '点击联系',
                '</div>',
            '</a>',
            '{@/if}',
        '</div>',
        '<div class="address-single">${item.address}</div>',
    '</div>',
    '{@/each}'
    ].join('\n');
}

participateretailer.prototype.render = function (sharefunction) {
    var activitylisttemplate = this.activitylisttemplate;
    var container = this.container;
    var activity_id = common.getUrlParam('activity_id');
    var ajaxdata = { activity_id: activity_id, activitytype: "activity" };
    if (wxjsconfig.sharekey != null)
        ajaxdata[wxjsconfig.sharekey] = "_";
    $.getJSON2("/webapi/distributor/weixin/retailers", ajaxdata, function (data) {
        var html = juicer(activitylisttemplate, data);
        container.html(html);
        if ($.isFunction(sharefunction)) {
            var share = data.share || {};
            sharefunction(share);

        }
    });
}
$(function () {
    var s = new invitationfans("container");
    s.render();
    var retailer = new participateretailer(".container-w");
    retailer.render(wxjsshare);
});


