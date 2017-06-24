

function suppermarketactivitylist(container) {
    this.container = $(container);
    this.activitylisttemplate = [
        '{@if error  != "" && error != null}',
        '<div class="nohd">',
            '<img src="../image/超惠活动.png" /><br />',
        '</div>',
        '{@/if}',
        '{@if data != null}',
        '{@each data as item}',
        '<div class="hd-chbox-w " style="margin-bottom:0px">',
            '<a href="suppercouponitems.html?activity_id=${item.guid}">',
                '<div class="hdbox">',
                    '<div class="img">',
                        '{@if item.posterpic.length>0&&item.posterpic!=null }',
                            '<img class="lazy" data-original="${item.posterpic}" />',
                        '{@else}',
                            '<img class="lazy" data-original="http://dl.oss.ipaloma.com/common/membership/default/membershipa698672ecafd48f5bd2f2e202659399d.png" />',
                        '{@/if}',
                        '{@if item.currentstate=="已生效"}',
                        '<div class="state1 p_css2"> ${item.currentstate} </div>',
                        '{@else}',
                        '<div class="state2 p_css1"> ${item.currentstate} </div>',
                        '{@/if}',
                    '</div>',
                    '<div class="text">',
                        '<div class="hdname" style="width: 98%;" ><h3>${item.activitytitle}</h3></div>',
                        '<div class="hdnum">${item.serialnumber}<span><img style="display: inline;" class="lazy" src="/distributor/image/icon03.png" />${item.fanscount}</span></div>',
                        '<div class="hdtime2">${item.activitycode}</div>',
                        '<div class="hdtime2">${item.begintime}&nbsp;至&nbsp;${item.endtime}</div>',
                    '</div>',
                '</div>',
            '</a>',
            '<a href="participateretailer_ticket.html?activity_id=${item.guid}">',
            '{@if item.topicdata==undefined||item.topicdata.activityid==undefined }',
                '<div class="joinmd blx">',
            '{@else}',
                '<div class="joinmd">',
            '{@/if}',
                    '投放门店：<font>${item.retailercount}</font>家<span><img src="/distributor/image/icon04.png" /></span>',
                '</div>',
            '</a>',
            /*'{@if item.topicdata!=undefined}',
                '<div class="assetinfobj">  <a href="${testclick(item.topicdata)}" class="assetcontent">',
                '<div class="assetimg"> <p>${item.topicdata.budget.subsidytotal}</p></div>',
                ' <div class="asset_left"> <nobr>${item.topicdata.topiclist[0].topic.activitytitle} + <span style="font-size:smaller;">${(item.topicdata.topiclist.length>1?"等活动":"")}</span></nobr> </div>',
                ' </a> </div>',
           '{@/if}',*/
           '{@if item.topicdata!=undefined}',
                '<div class="assetinfobj">  <a href="${testclick(item.topicdata)}" class="assetcontent">',
                    '<div class="assetimg"> <p>${item.topicdata.budget.subsidytotal}</p></div>',
                    '<div class="asset_left" style="width:calc(100% - 110px)"> ',
                        '<div class="topictitle" style="max-width:calc(100% - 65px);"><nobr style="font-size:1.1rem;">${item.topicdata.topiclist[0].activitytitle}</nobr></div>',
                        '<div class="topictitle_1"><small>${(item.topicdata.topiclist.length>1?"等活动":"")}</small></div>',
                       /* '<p style="max-width:calc(100% - 55px);float:left;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;margin-right:5px;font-size:1.1em;">${item.topicdata.topiclist[0].activitytitle}</p>',
                        '<span style="width:50px;display:inline-block;font-size:0.7em;font-weight:normal">${(item.topicdata.topiclist.length>1?"等活动":"")}</span>',*/
                    '</div>',
                ' </a> </div>',
            '{@/if}',
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
    var ajaxdata = { activitykind: "distributor_to_consumer", activitytype: "ticket", pageindex: pageIndex };
    if (wxjsconfig.sharekey != null)
        ajaxdata[wxjsconfig.sharekey] = "_";

    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '/webapi/distributor/weixin/activities',
        data: ajaxdata,
        beforeSend: function () { pageIndex == 1 ? common.loading.show() : "" },
        success: function (data) {
            common.loading.hide()
            if (data.error && pageIndex != 1) {
                dealdropme(dropme);
                return;
            }
            if (jQuery.isEmptyObject(data)) {
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
                        domLoad: '<div class="dropload-load"><span class="loading"></span>加载中</div>',
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

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            common.loading.hide();
            var errormsg = "访问异常";

            if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                var json = JSON.parse(XMLHttpRequest.responseText);
                errormsg = json.Message == undefined ? json.error : JSON.parse(json.Message).error;
                if (errormsg == undefined || errormsg == '')
                    errormsg = "Http error: " + XMLHttpRequest.statusText;
            }

            toasterextend.showtips(errormsg, "error");
        }
    });

    //$.getJSON2('/webapi/distributor/weixin/activities', ajaxdata, function (data) {

    //});
}
$(function () {

    juicer.register("testclick", function (item) {
        var topicid = ""
        $.each(item.topiclist, function (index, item, array) {
            if (index < 20) {
                topicid += "," + item.guid
            }
        });
        return "../page/active.html?topicid=" + topicid.substring(1)
    });

    var fans = new invitationfans("container");
    fans.render();
    var s = new suppermarketactivitylist(".container-w");
    s.render(wxjsshare, null);
});



