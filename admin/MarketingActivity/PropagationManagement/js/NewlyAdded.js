


// <!-- textarea输入框统计字数 -->
$(function () {
    //先选出 textarea 和 统计字数 dom 节点
    var wordCount = $("#wordCount"),
        textArea = wordCount.find("textarea"),
        word = wordCount.find(".word");
    $('#textarea_value').on('input', function () {
        $.trim($(this).next().find('var').text($(this).val().length));
        if ($('.word').text() == 65) {
            layer.msg('字数已上限');
        }

    })
    if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0") {
        layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开", { time: 3000 }); //IE 6.0
        return;
    }
    else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0") {
        layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开", { time: 3000 }); //IE 7.0
        return;
    }
    else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0") {
        layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开", { time: 3000 }); //IE 8.0
        return;
    }
    else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE9.0") {
        layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开", { time: 3000 }); //IE 9.0
        return;
    }
    else if (navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE10.0") {
        layer.msg("该网站暂不支持Ie 浏览器，请用其它浏览器打开", { time: 3000 }); //IE 10.0
        return;
    }
    //点击关闭
    $('.close_off').click(function () {
        layer.msg("正在关闭···");
        window.location = 'Marketcopymanagement.html';
        layer.msg("已关闭");
    })
    $('.mode1_fa').find('div:eq(0) img').addClass('xiyin_son');
    //保存---本地保存


    //点击预览
    $('.preview').click(function () {
        if ($('.send_object dir').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var a = $('.send_object dir').find('a:eq(0)').text();
        } else {
            var a = '';
        }
        if ($('.send_object dir').find('div:eq(1) img').hasClass('xiyin_son') == true) {
            var b = $('.send_object dir').find('a:eq(1)').text();
        } else {
            var b = '';
        }
        if ($('.send_object dir').find('div:eq(2) img').hasClass('xiyin_son') == true) {
            var c = $('.send_object dir').find('a:eq(2)').text();
        } else {
            var c = '';
        }

        if ($('.mode1_fa').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var d = $('.mode1_fa').find('a').text();
        };

        if ($('.area_val').val() == '') {

        } else {
            // 地区负责人显示到预览上
            areastring = "";
            var provinces = JSON.parse($('.area_val').val()).area;
            var array = [];
            if (provinces.length == 1 && provinces[0].name == "fullcountry" || provinces[0].name == '全国') {
                areastring = "全国";
            } else {
                for (var j = 0; j < provinces.length; j++) {
                    //process province
                    var provincecharge = "";
                    if (provinces[j].charge) {
                        provincecharge = provinces[j].charge;
                    }
                    var temp = provinces[j].name + ':' + provincecharge + '<br />';
                    areastring += temp;
                    if (provinces[j].city) {
                        for (var k = 0; k < provinces[j].city.length; k++) {
                            //process city
                            var citycharge = "";
                            if (provinces[j].city[k].charge) {
                                citycharge = provinces[j].city[k].charge;
                            }
                            var citytemp = provinces[j].city[k].name + ':' + citycharge + '<br />';
                            areastring += citytemp;
                            if (provinces[j].city[k].country) {
                                //process country
                                areastring += '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
                                for (var l = 0; l < provinces[j].city[k].country.length; l++) {
                                    var countrytemp = provinces[j].city[k].country[l] + ' ';
                                    areastring += countrytemp;
                                };
                                areastring += '<br />';
                            }
                        };
                    }
                }
            }
        }

        // 图片
        var pic1_url = $('#preview img').attr('src');
        var form_value = {
            textarea_value: $('#textarea_value').val(),
            objective: $('.input-text').find('option:selected').text(),
            area: $('area').val(),
            send_object: a + '  <br/> ' + b + ' <br/> ' + c,
            mode1_fa: d,
            post_url: pic1_url,
            send_text: $('#send_text').val(),
            together: $('input[name="Fruit"]:checked').val(),
            pushtime: time_val,
            // 这个是假的
            push_distributor: a,
            push_consumer: c,
            push_retailer: b,
        }

        if (form_value.textarea_value == "") {
            layer.msg('请输入标题');
            layer.tips('请输入标题', '#wordCount', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if ($('.region-item').length == 0) {
            layer.msg('请选择地区');
            layer.tips('请选择地区', '.area', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }


        if (form_value.push_distributor == '' && form_value.push_consumer == '' && form_value.push_retailer == '') {
            layer.msg('请选择对象');
            layer.tips('请选择对象', '.send_object dir', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.mode1_fa == undefined) {
            // layer.msg('请选择发送方式');
            layer.tips('请选择方式', '.mode1_fa', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.post_url == "") {
            // layer.msg('请选择封面图片');
            layer.tips('请上传图片', '.cover_photo', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.send_text == "") {
            // layer.msg('请填写发送内容');
            layer.tips('请填写内容', '.mode', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        // 最后判断单选框
        var radio_val = $('input[name="Fruit"]:checked').val();
        if (radio_val == undefined) {
            // layer.msg('请选择图文发送方式');
            layer.tips('请选择方式', '.Graphic_message', {
                tips: [3, '#F22525'],
                time: 4000
            });
            return;
        };

        var time_val = $('.date').val();
        if (radio_val == 'bindwithperiodpush') {
            var e = 1;
            $('#LAY_demorange_s').val('');
            // var time_val = new Date();
            var time_val = '跟随每周推送消息一同推送';
        } else if (radio_val == 'pushtime_supplier') {
            // $('#LAY_demorange_s').attr('disabled',false);
            if (time_val == '') {
                // layer.msg('请选择时间');
                layer.tips('请选择时间', '#LAY_demorange_s', {
                    tips: [3, '#F22525'],
                    time: 4000
                });
                return;
            };
        };
        // if (form_value.together == "") {
        //     layer.msg('请选择图文消息发送时间');
        //     return;
        // }
        // if (form_value.pushtime == "") {
        //     layer.msg('请选择时间');
        //     return;
        // }

        // $('.note-btn-group .note-icon-code').click();
        var contentHtml = $('.note-editing-area .panel-body').html();
        if (contentHtml == '' || contentHtml == '<p><br></p>' || contentHtml == '&nbsp;' || contentHtml == '<p>&nbsp;&nbsp;</p>' || contentHtml == '<p>&nbsp;</p>') {
            layer.tips('请填写内容', '.mode', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        // if(contentHtml.length>4000){
        //     layer.tips('填写内容过多','.mode', {
        //           tips: [1, '#F22525'],
        //           time: 4000
        //         });
        //     return;
        // }

        var index = layer.open({
            type: 1,
            title: '预览',
            area: ['51.3%', "100%"],
            // maxmin: true,
            content: '<div class="Text_Title">' +
                        '<div class="Float_Title">文案标题</div>' +
                        '<div class="Float_text">' + form_value.textarea_value + '</div>' +
                    '</div>' +
                '<div class="Text_Title">' +
                    '<div class="Float_Title">发送地区</div>' +
                    '<div class="Float_text">' + areastring + '</div>' +
                '</div>' +

                    '<div class="Text_Title">' +
                        '<div class="Float_Title">发送对象</div>' +
                        '<div class="Float_text">' + form_value.send_object + '</div>' +
                    '</div>' +

                    '<div class="Text_Title">' +
                        '<div class="Float_Title">发送方式</div>' +
                        '<div class="Float_text">' + form_value.mode1_fa + '</div>' +
                    '</div>' +
                    '<div class="Text_Title">' +
                        '<div class="Float_Title">封面图片</div>' +
                        '<div class="Float_text srcPic"><img src="Images/QQ截图20161118203155.png" width="400" height="300" alt="" /></div>' +
                    '</div>' +
                    '<div class="Text_Title">' +
                    // 改为富版本编辑器   $('.note-editing-area .panel-body').html()  /获取整个html内容
                        '<div class="Float_Title">发送内容</div>' +
                        '<div class="Float_text" id="contentdiv">' + contentHtml + '</div>' +
                    '</div>' +
                    '<div class="Text_Title">' +
                        '<div class="Float_Title">' +
                            '<div class="Float_Title1">图文消息<br />发送时间</div>' +
                            '<div class="Float_text1">' + time_val + '</div>' +
                        '</div>' +
                    '</div>' +
                    '<div class="button">' + '</div>'
        });
        //两种方法获取图片 
        $('.srcPic').html($('#preview').html())
        // var a=$('.upload_img img ').attr('src');
        // $('.Float_text img').attr('src',a);
        var picwidth = $('.upload_img img').width();
        // alert(picwidth)
        var picheight = $('.upload_img img').height();
        $('#preview').css('width', picwidth);
        $('#preview').css('height', picheight);
    })


    // 保存Preservation 提交审核
    $('.examine').click(function () {
        // var audit = $('.examine').find('input').val();
        if ($('.send_object dir').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var a = 1;
        } else {
            var a = 0;
        };
        if ($('.send_object dir').find('div:eq(1) img').hasClass('xiyin_son') == true) {
            var b = 1;
        } else {
            var b = 0;
        };
        if ($('.send_object dir').find('div:eq(2) img').hasClass('xiyin_son') == true) {
            var c = 1;
        } else {
            var c = 0;
        };
        if ($('.mode1_fa').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var d = 1;
        } else {
            var d = 0;
        };


        // if ($('input[name="Fruit"]:checked').val()) {
        //     var e = 1;
        // } else {
        //     var e = 0;
        // };
        // var area_text = JSON.stringify(JSON.parse($('.area_val').text().area);
        if ($('.area_val').val() == '') {
            if ($('.word').text() == 0) {
                layer.msg('请输入标题');
                layer.tips('请输入标题', '#wordCount', {
                    tips: [4, '#F22525'],
                    time: 4000
                });
                return;
            }
            if ($('.region-item').length == 0) {
                layer.msg('请选择地区');
                layer.tips('请选择地区', '.area', {
                    tips: [1, '#F22525'],
                    time: 4000
                });
                return;
            }
        }
        if ($('.word').text() == 0) {
            layer.msg('请输入标题');
            layer.tips('请输入标题', '#wordCount', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }
        // 判断时间和选项框  有没有选中否则出来的数据就不对，null
        var time_time = $('.date').val();
        if (time_time == undefined) {
            time_time == '';
        }
        var radio_val1 = $('input[name="Fruit"]:checked').val();
        if (radio_val1 == 'bindwithperiodpush') {
            var e = 1;
        }

        $('#count').click();
        var contentHtml = $('.note-editing-area .panel-body').html();
        if (contentHtml == '' || contentHtml == '<p><br></p>' || contentHtml == '&nbsp;' || contentHtml == '<p>&nbsp;&nbsp;</p>' || contentHtml == '<p>&nbsp;</p>') {
            layer.tips('请填写内容', '.mode', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        var pic1_url = $('#preview img').attr('src');
        var srvice_val = JSON.stringify($.trim($('#textarea_value').val()));
        var form_value = {
            state: $('.content_information .state').val(),
            service: srvice_val,
            belong_group: $('.input-text').find('option:selected').text(),
            area: JSON.stringify(JSON.parse($('.area_val').val()).area),
            push_distributor: a,
            push_consumer: c,
            push_retailer: b,
            category: d,
            poster_url: pic_url,
            copywriting: contentHtml,
            bindwithperiodpush: e,
            pushtime: time_time,
            guid: guid_val
        };
        // console.log(typeof(form_value.area[0]));
        //form_value.area = JSON.stringify(form_value.area);
        if (form_value.service == "") {
            layer.msg('请输入标题');
            layer.tips('请输入标题', '#wordCount', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if ($('.region-item').length == 0) {
            layer.msg('请选择地区');
            layer.tips('请选择地区', '.area', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.push_distributor == 0 && form_value.push_consumer == 0 && form_value.push_retailer == 0) {
            layer.msg('请选择对象');
            layer.tips('请选择对象', '.send_object', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.category == "") {
            // layer.msg('请选择发送方式');
            layer.tips('请选择方式', '.mode1_fa', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.poster_url == undefined || form_value.poster_url == '') {
            // layer.msg('请选择封面图片');
            layer.tips('请上传图片', '.cover_photo', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }


        var contentHtml = $('.note-editing-area .panel-body').html();
        console.log(contentHtml)
        if (contentHtml == '' || contentHtml == '<p><br></p>' || contentHtml == '&nbsp;' || contentHtml == '<p>&nbsp;&nbsp;</p>' || contentHtml == '<p>&nbsp;</p>') {
            layer.tips('请填写内容', '.mode', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        // 最后判断单选框
        var radio_val = $('input[name="Fruit"]:checked').val();
        if (radio_val == undefined) {
            // layer.msg('请选择图文发送方式');
            layer.tips('请选择方式', '.Graphic_message', {
                tips: [3, '#F22525'],
                time: 4000
            });
            return;
        };
        var time_val = $('.date').val();
        if (radio_val == 'bindwithperiodpush') {
            var e = 1;

            // var time_val = new Date();
            var time_val = '跟随每周推送消息一同推送';
        } else if (radio_val == 'pushtime_supplier') {
            var e = 0;
            // $('#LAY_demorange_s').attr('disabled',false);
            if (time_val == '') {
                // layer.msg('请选择时间');
                LAY_demorange_s
                layer.tips('请选择时间', '#LAY_demorange_s', {
                    tips: [3, '#F22525'],
                    time: 4000
                });
                return;
            };
        };

        // if (form_value.bindwithperiodpush == "") {
        //     layer.msg('请选择图文消息发送时间');
        //     return;
        // }

        // if (form_value.pushtime == "") {
        //     layer.msg('请选择时间');
        //     return;
        // }+
        $('.layui-layer-close').click();
        layer.msg('正在新增...', { time: 2000 });

        if (guid_val == '') {
            _ajax("POST", "/webapi/ipaloma/propagation", form_value, '提交错误', function () {
                // window.history.back();
                window.location = 'Marketcopymanagement.html';
            });
        } else {
            _ajax("put", "/webapi/ipaloma/propagation", form_value, '提交错误', function () {
                // window.history.back();
                window.location = 'Marketcopymanagement.html';
            });
        }

    })



    //首先判断有没有保存，如果有保存的话那么就判断有没有保存后的guid
    var guid_val = '';
    // 保存并继续新增
    $(".Newly_added").click(function () {
        // var audit = $('.examine').find('input').val();
        if ($('.send_object dir').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var a = 1;
        } else {
            var a = 0;
        }
        if ($('.send_object dir').find('div:eq(1) img').hasClass('xiyin_son') == true) {
            var b = 1;
        } else {
            var b = 0;
        }
        if ($('.send_object dir').find('div:eq(2) img').hasClass('xiyin_son') == true) {
            var c = 1;
        } else {
            var c = 0;
        }
        if ($('.mode1_fa').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var d = 1;
        } else {
            var d = 0;
        }
        if ($('input[name="Fruit"]:checked').val()) {
            var e = 1;
        } else {
            var e = 0;
        }

        if ($('.area_val').val() == '') {
            if ($('.word').text() == 0) {
                layer.msg('请输入标题');
                layer.tips('请输入标题', '#wordCount', {
                    tips: [4, '#F22525'],
                    time: 4000
                });
                return;
            }
            if ($('.region-item').length == 0) {
                layer.msg('请选择地区');
                layer.tips('请选择地区', '.area', {
                    tips: [1, '#F22525'],
                    time: 4000
                });
                return;
            }
        }
        if ($('.word').text() == 0) {
            layer.msg('请输入标题');
            layer.tips('请输入标题', '#wordCount', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }
        var time_time = $('.date').val();
        if (time_time == undefined) {
            time_time == '';
        }
        var radio_val1 = $('input[name="Fruit"]:checked').val();
        if (radio_val1 == 'pushtime_supplier') {
            var e = undefined;
        } else {
            var e = 1;
        }

        $('#count').click();
        var contentHtml = $('.note-editing-area .panel-body').html();
        if (contentHtml == '' || contentHtml == '<p><br></p>' || contentHtml == '&nbsp;' || contentHtml == '<p>&nbsp;&nbsp;</p>' || contentHtml == '<p>&nbsp;</p>') {
            layer.tips('请填写内容', '.mode', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        var pic1_url = $('#preview img').attr('src');
        var srvice_val = JSON.stringify($.trim($('#textarea_value').val()));
        var form_value = {
            state: "draft",
            optype: "draft",
            service: srvice_val,
            belong_group: $('.input-text').find('option:selected').text(),
            area: JSON.stringify(JSON.parse($('.area_val').val()).area),
            // area = JSON.stringify(area); 
            push_distributor: a,
            push_consumer: c,
            push_retailer: b,
            category: d,
            poster_url: pic_url,
            copywriting: contentHtml,
            bindwithperiodpush: e,
            pushtime: time_time,
            guid: guid_val
        }
        // console.log(typeof(form_value.area[0]));
        // form_value.area = JSON.stringify(form_value.area);
        if (form_value.service == "") {
            layer.msg('请输入标题');
            layer.tips('请输入标题', '#wordCount', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if ($('.region-item').length == 0) {
            layer.msg('请选择地区');
            layer.tips('请选择地区', '.area', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        if (form_value.push_distributor == 0 && form_value.push_consumer == 0 && form_value.push_retailer == 0) {
            layer.msg('请选择对象');
            layer.tips('请选择对象', '.send_object', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.category == "") {
            // layer.msg('请选择发送方式');
            layer.tips('请选择方式', '.mode1_fa', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.poster_url == undefined || form_value.poster_url == '') {
            // layer.msg('请选择封面图片');
            layer.tips('请上传图片', '.cover_photo', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }



        var contentHtml = $('.note-editing-area .panel-body').html();
        // console.log(contentHtml)
        if (contentHtml == '' || contentHtml == '<p><br></p>' || contentHtml == '&nbsp;' || contentHtml == '<p>&nbsp;&nbsp;</p>' || contentHtml == '<p>&nbsp;</p>') {
            layer.tips('请填写内容', '.mode', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        // 最后判断单选框
        var radio_val = $('input[name="Fruit"]:checked').val();
        if (radio_val == undefined) {
            // layer.msg('请选择图文发送方式');
            layer.tips('请选择方式', '.Graphic_message', {
                tips: [3, '#F22525'],
                time: 4000
            });
            return;
        };
        // var myDate = new Date()
        var time_val = $('.date').val();
        if (radio_val == 'bindwithperiodpush') {
            var e = 1;
            // $('#LAY_demorange_s').val('');
            // var time_val = myDate.getDate();
            // var time_val='跟随每周推送消息一同推送';
        } else if (radio_val == 'pushtime_supplier') {
            if (time_val == '') {
                // layer.msg('请选择时间');
                layer.tips('请选择时间', '#LAY_demorange_s', {
                    tips: [3, '#F22525'],
                    time: 4000
                });
                return;
            };
        };
        // if (form_value.bindwithperiodpush == "") {
        //     layer.msg('请选择图文消息发送时间');
        //     return;
        // }
        // if (form_value.pushtime_supplier == "") {
        //     layer.msg('请选择发送方式');
        //     return;
        // }
        //  if (form_value.pushtime == "") {
        //     layer.msg('请选择时间');
        //     return;
        // }
        $('.layui-layer-close').click();

        layer.msg('正在保存...', { time: 2000 });
        if (guid_val == '') {
            _ajax("POST", "/webapi/ipaloma/propagation", form_value, '保存错误', function (data) {
                layer.msg('保存成功，请继续填写', { time: 1500 });
                window.location.reload();
            });
        } else {
            _ajax("put", "/webapi/ipaloma/propagation", form_value, '保存错误', function (data) {
                layer.msg('保存成功', { time: 1500 });
                layer.msg('保存成功，请继续填写', { time: 1500 });
                window.location.reload();
                // window.location='Marketcopymanagement.html';
            });
        }
    });

    // 保存
    $(".Preservation").click(function () {
        // var audit = $('.examine').find('input').val();
        if ($('.send_object dir').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var a = 1;
        } else {
            var a = 0;
        }
        if ($('.send_object dir').find('div:eq(1) img').hasClass('xiyin_son') == true) {
            var b = 1;
        } else {
            var b = 0;
        }
        if ($('.send_object dir').find('div:eq(2) img').hasClass('xiyin_son') == true) {
            var c = 1;
        } else {
            var c = 0;
        }
        if ($('.mode1_fa').find('div:eq(0) img').hasClass('xiyin_son') == true) {
            var d = 1;
        } else {
            var d = 0;
        }
        if ($('input[name="Fruit"]:checked').val()) {
            var e = 1;
        } else {
            var e = 0;
        }

        if ($('.area_val').val() == '') {
            if ($('.word').text() == 0) {
                layer.msg('请输入标题');
                layer.tips('请输入标题', '#wordCount', {
                    tips: [4, '#F22525'],
                    time: 4000
                });
                return;
            }


            if ($('.region-item').length == 0) {
                layer.msg('请选择地区');
                layer.tips('请选择地区', '.area', {
                    tips: [1, '#F22525'],
                    time: 4000
                });
                return;
            }
        }
        if ($('.word').text() == 0) {
            layer.msg('请输入标题');
            layer.tips('请输入标题', '#wordCount', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }
        var time_time = $('.date').val();
        if (time_time == undefined) {
            time_time == '';
        }
        var radio_val1 = $('input[name="Fruit"]:checked').val();
        if (radio_val1 == 'pushtime_supplier') {
            var e = undefined;
        } else {
            var e = 1;
        }

        $('#count').click();
        var contentHtml = $('.note-editing-area .panel-body').html();
        var pic1_url = $('#preview img').attr('src');
        var srvice_val = JSON.stringify($.trim($('#textarea_value').val()));
        var form_value = {
            state: "draft",
            optype: "draft",
            service: srvice_val,
            belong_group: $('.input-text').find('option:selected').text(),
            area: JSON.stringify(JSON.parse($('.area_val').val()).area),
            // area = JSON.stringify(area); 
            push_distributor: a,
            push_consumer: c,
            push_retailer: b,
            category: d,
            poster_url: pic_url,
            copywriting: contentHtml,
            bindwithperiodpush: e,
            pushtime: time_time,
            guid: guid_val
        }
        // console.log(typeof(form_value.area[0]));
        // form_value.area = JSON.stringify(form_value.area);
        if (form_value.service == "") {
            layer.msg('请输入标题');
            layer.tips('请输入标题', '#wordCount', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if ($('.region-item').length == 0) {
            layer.msg('请选择地区');
            layer.tips('请选择地区', '.area', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        if (form_value.push_distributor == 0 && form_value.push_consumer == 0 && form_value.push_retailer == 0) {
            layer.msg('请选择对象');
            layer.tips('请选择对象', '.send_object', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.category == "") {
            // layer.msg('请选择发送方式');
            layer.tips('请选择方式', '.mode1_fa', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }

        if (form_value.poster_url == undefined || form_value.poster_url == '') {
            // layer.msg('请选择封面图片');
            layer.tips('请上传图片', '.cover_photo', {
                tips: [4, '#F22525'],
                time: 4000
            });
            return;
        }



        // console.log(contentHtml)
        if (contentHtml == '' || contentHtml == '<p><br></p>' || contentHtml == '&nbsp;' || contentHtml == '<p>&nbsp;&nbsp;</p>' || contentHtml == '<p>&nbsp;</p>') {
            layer.tips('请填写内容', '.mode', {
                tips: [1, '#F22525'],
                time: 4000
            });
            return;
        }
        // 最后判断单选框
        var radio_val = $('input[name="Fruit"]:checked').val();
        if (radio_val == undefined) {
            // layer.msg('请选择图文发送方式');
            layer.tips('请选择方式', '.Graphic_message', {
                tips: [3, '#F22525'],
                time: 4000
            });
            return;
        };
        // var myDate = new Date()
        var time_val = $('.date').val();
        if (radio_val == 'bindwithperiodpush') {
            var e = 1;
            // $('#LAY_demorange_s').val('');
            // var time_val = myDate.getDate();
            // var time_val='跟随每周推送消息一同推送';
        } else if (radio_val == 'pushtime_supplier') {
            if (time_val == '') {
                // layer.msg('请选择时间');
                layer.tips('请选择时间', '#LAY_demorange_s', {
                    tips: [3, '#F22525'],
                    time: 4000
                });
                return;
            };
        };
        // if (form_value.bindwithperiodpush == "") {
        //     layer.msg('请选择图文消息发送时间');
        //     return;
        // }
        // if (form_value.pushtime_supplier == "") {
        //     layer.msg('请选择发送方式');
        //     return;
        // }
        //  if (form_value.pushtime == "") {
        //     layer.msg('请选择时间');
        //     return;
        // }
        $('.layui-layer-close').click();

        layer.msg('正在保存...', { time: 2000 });


        if (guid_val == '') {
            _ajax("POST", "/webapi/ipaloma/propagation", form_value, '保存错误', function (data) {
                layer.msg('保存成功', { time: 1500 });
                guid_val = data.guid;
                // console.log(guid_val);
                // window.location='Marketcopymanagement.html';
            });
        } else {
            _ajax("put", "/webapi/ipaloma/propagation", form_value, '保存错误', function (data) {
                layer.msg('保存成功', { time: 1500 });
                guid_val = data.guid;
                console.log(guid_val)
                // window.location='Marketcopymanagement.html';
            });
        }
    });

    var _ajax = function (type, url, data, tip, success) {
        // console.log(JSON.stringify(data, null, 4));
        $.ajax({
            type: type,
            url: url,
            dataType: "json",
            data: data,
            beforeSend: function () {
                // $('.pager-wrap').fadeOut(1000);
            },
            complete: function () { },
            timeout: function () { },

            success: function (json) {
                success(json);
            },
            error: function () {
                console.warn(tip + " error");
            }
        });
    }
});

var pic_url = "";
//图片上传预览   
function previewImage(file) {
    var form = new FormData($('form')[0]);
    $.ajax({
        type: "POST",
        url: "/webapi/ipaloma/propagation/upload/imgupload",
        data: form,
        xhr: function () {
            return $.ajaxSettings.xhr();
        },
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
            console.warn(data.picture_url);
            pic_url = data.picture_url;
            console.log(pic_url)
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log("上传失败，请检查网络后重试");
            // layer.msg('上传失败，请检查网络后重试');
        }
    });

    // 判断图片类型
    var type_val = $('#fileid').val();
    if (!/\.(gif|jpg|png)$/.test(type_val)) {
        layer.msg("图片类型必须是gif | jpg | png中的一种");
        $('#fileid').val("");
        $('#imghead').attr('src', '');
        return false;
    }

    if (type_val == "") {
        layer.msg("请上传图片"); return false;
    }





    // 上传后图片的尺寸
    var MAXWIDTH = 360;
    var MAXHEIGHT = 200;
    var div = document.getElementById('preview');
    if (file.files && file.files[0]) {
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.onload = function () {
            var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
            img.width = rect.width;
            img.height = rect.height;
            //img.style.marginLeft = rect.left+'px';
            img.style.marginTop = rect.top + 'px';
        }
        var reader = new FileReader();
        reader.onload = function (evt) { img.src = evt.target.result; }
        reader.readAsDataURL(file.files[0]);
    } else //兼容IE
    {
        var sFilter = 'filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
        file.select();
        var src = document.selection.createRange().text;
        div.innerHTML = '<img id=imghead>';
        var img = document.getElementById('imghead');
        img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
        var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
        status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
        div.innerHTML = "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
    }
}

function clacImgZoomParam(maxWidth, maxHeight, width, height) {
    var param = { top: 0, left: 0, width: width, height: height };
    if (width > maxWidth || height > maxHeight) {
        rateWidth = width / maxWidth;
        rateHeight = height / maxHeight;

        if (rateWidth > rateHeight) {
            param.width = maxWidth;
            param.height = Math.round(height / rateWidth);
        } else {
            param.width = Math.round(width / rateHeight);
            param.height = maxHeight;
        }
    }
    param.left = Math.round((maxWidth - param.width) / 2);
    param.top = Math.round((maxHeight - param.height) / 2);
    return param;
}


