function suppermarketactivitylist(container) {
    this.container = $(container);
    this.activitylisttemplate = [
        '{@if error != null && error  !="" }',
        '<div class="nohd">',
            '<img src="../image/超惠活动.png" /><br />',
        '</div>',
        '{@/if}',
        '{@if data != null}',
        '{@each data as item}',
        '<div class="hd-chbox-w">',
            '<a href="suppermarketactivityitems.html?activity_id=${item.guid}">',
                '<div class="hdbox">',
                    '<div class="img">',
                        '{@if item.posterpic.length>0&&item.posterpic!=null }',
                            '<img class="lazy" data-original="${item.posterpic}" />',
                        '{@else}',
                            '<img class="lazy" data-original="http://dl.oss.ipaloma.com/common/membership/default/membershipa698672ecafd48f5bd2f2e202659399d.png" />',
                        '{@/if}',
                        '{@if item.currentstate=="进行中"}',
                        '<div class="state1"> ${item.currentstate} </div>',
                        '{@else}',
                        '<div class="state2"> ${item.currentstate} </div>',
                        '{@/if}',
                    '</div>',
                    '<div class="text">',
                        '<div class="hdname"><h3>${item.activitytitle}</h3></div>',
                        '<div class="hdnum">${item.serialnumber}<span><img class="lazy" data-original="../image/icon03.png" />${item.fanscount}</span></div>',
                        '<div class="hdtime2">${item.begintime}&nbsp;至&nbsp;${item.endtime}</div>',
                    '</div>',
                '</div>',
            '</a>',
            '<a href="participateretailer.html?activity_id=${item.guid}">',
                '<div class="joinmd">',
                    '参加门店：<font>${item.retailercount}</font>家<span><img src="../image/icon04.png" /></span>',
                '</div>',
            '</a>',
        '</div>',
        '{@/each}',
        '{@/if}'
    ].join('\n');
}

var pageIndex = 1;
var isInit = true;
suppermarketactivitylist.prototype.render = function (sharefunction, dropme) {
    var activitylisttemplate = this.activitylisttemplate;
    var container = this.container;
    var ajaxdata = { activitykind: "distributor_to_consumer", activitytype: "activity", pageindex: pageIndex };
    if (wxjsconfig.sharekey != null)
        ajaxdata[wxjsconfig.sharekey] = "_";
    $.getJSON2('/webapi/distributor/weixin/activities', ajaxdata, function (data) {
        data = data || {};
        if (jQuery.isEmptyObject(data)) {
            dealdropme(dropme);
            return;
        }
        if (data.error && pageIndex != 1) {
            dealdropme(dropme);
            return;
        }

        var html = juicer(activitylisttemplate, data);
        if (pageIndex == 1)
            container.html(html);
        else
            container.append(html);
        
        $("img.lazy").lazyload();
    
        if (pageIndex == 1 && isInit && !data.error && !data.user_notification) {

            if ($.isFunction(sharefunction)) {
                sharefunction(data.share || {});
            }
            isInit = false;

            $('#dropload').dropload({
                scrollArea: window,
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑加载更多</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据</div>'
                },
                loadDownFn: function (me) {
                    pageIndex++;
                    new suppermarketactivitylist(".container-w").render(wxjsshare, me);
                }
            });
        }
        if (dropme != null)
            dropme.resetload();
    });
}
$(function () {
    var fans = new invitationfans("container");
    fans.render();
    var s = new suppermarketactivitylist(".container-w");
    s.render(wxjsshare, null);
});
