    function suppermarketactivitylist(container) {
        this.container = $(container);
        ///webapi/consumer/weixin/register_generate_code?qrtype=20&combinetext=0&combineicon=0
        this.companytemplate = [
       '<div class="m-company-top">',
            '<div class="userimg"><img src="{@if distributor_pic ==""}../image/cs04.jpg {@else}${distributor_pic}{@/if}" /></div>',
            '<div class="userinfo">',
                '<div class="zi">',
                    '<span>${distributorname}</span><br />',
                    '${address}<br />',
                    '${mobilephone}',
                '</div>',
                '<div class="ewm">',
                    '<a href="m-company-ewm.html"><img id="QRCode_img"/></a>',
                '</div><div id="qrcodediv" hidden></div>',
            '</div>',
        '</div><div class="title" style="border-bottom:0">公司贡献</div>',
        '<table cellspacing="5" cellpadding="0" class="company-tbl">',
        ' <tr><td rowspan="2" class="cbox1"><span>${invitedretailercount}</span><br>邀请店铺</td>',
        '  <td class="cbox2"><span>${retaileractivitycount}</span><br />店铺活动</td></tr>',
        '<tr><td> <ul>',
        '    <li style="border-top-left-radius: 4px;" class="cbox3"><span>${activitycount}</span><br />超惠活动<label class="ico"></label></li>',
        '   <li style="border-top-right-radius: 4px;" class="cbox4"><span>${activitysharecount}</span><br />分享</li>',
        '   <li style="border-bottom-left-radius: 4px; border-top: 1px solid #d88738" class="cbox3"><span>${ticketcount}</span><br />超惠券<label class="ico"></label></li>',
        '    <li style="border-bottom-right-radius: 4px; border-top: 1px solid #d88738" class="cbox4"><span>${ticketsharecount}</span><br />分享</li>',
        '   </ul></td></tr></table>',
        '<div class="my-cbox">',
        '   <div class="f-title"><span dd="dd" num="${activefanscount}">${activefanscount}</span><br />留存惠粉</div>',
        '   <div class="rt-title"><span bb="bb" num="${fansinhistorycount}">${fansinhistorycount}</span><br />累计拉粉</div>',
        '   <div class="rn-title"><span cc="cc">${percentageretained}</span><br />留存</div>',
        '</div>',
        '</div>'
        ].join('\n');
    }

suppermarketactivitylist.prototype.render = function () {
        var container = this.container;
        var companytemplate = this.companytemplate;
    $.getJSON2("/webapi/distributor/weixin/distributorstat", function (data) {
        common.loading.hide();
            var html = juicer(companytemplate, data);
            container.after(html);
            $("#qrcode").attr("src", $("#qrcode").attr("orgsrc"))
            var $divWidth = $('.m-company-listbox1').width();
            $('.m-company-listbox1').css({ 'height': $divWidth * 2 });

            var $divWidth = $('.m-company-listbox1').height();
            $('.m-company-listbox1-right').css({ 'height': $divWidth });

            var $divWidth = $('.m-company-listbox1').height();
            $('.m-company-listbox2').css({ 'height': $divWidth / 2 });

            var $divWidth = $('.m-company-listbox1').height();
            $('.m-company-listbox3').css({ 'height': $divWidth / 2 });

            var $divWidth = $('.m-company-listbox4').width();
            $('.m-company-listbox4').css({ 'height': $divWidth });

            var aa = $('aa').attr('num');
            var ab = $('ab').attr('num');
            var ac = $('ac').attr('num');
            $('aa').text(common.str_pep_num(aa))
            $('ab').text(common.str_pep_num(ab))
            $('ac').text(common.str_pep_num(ac))

       
        });
    }
$(function () {
    common.loading.show();
   

    var s = new invitationfans("container");
    s.render();
    var s = new suppermarketactivitylist("#company");
    s.render();
    var qrcode = qrcodeconfig["distributor"];
    draw(qrcode, "minconsumercard", qrcodeconfig["distributor"]["logo"]);

});


