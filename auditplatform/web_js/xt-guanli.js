/**
 * 分页跳转
 * @param page
 */
function goPage(page, tab) {
    $("#currentPage_" + tab).val(page);
    getshortcutinfo();
}

 // 齐枭飞添加 弹浮提示框 逻辑 ——文字已达上限30个
function maxLen(){
     if(document.getElementById("shortcutinfo").value.length>"30"){
      //document.getElementById("shortcutinfo").maxLength="30";
       $(".delete-lan-w3").fadeIn(600).delay(1000).fadeOut(500);
    }
      
  }   
/**
 * 组装分页
 */
function assemblePage(msg, tab) {
    var datacount = msg.datacount;
    var pagecount = msg.pagecount;
    var totalPage = Math.ceil(datacount / pagecount);
    $("#totalPage_" + tab).text(totalPage);//设置总页数

    var pageTool = "";
    pageTool += "<li class='front_" + tab + "'>...</li>";
    for (var i = 1; i <= totalPage; i++) {
        if (i == 1) {
            pageTool += "<li class='pitchOn'><a href='javascript:goPage(1," + tab + ");'>1</a></li>";
        } else {
            pageTool += "<li><a href='javascript:goPage(" + i + "," + tab + ");'>" + i + "</a></li>"
            //<li><a href="../html/xt-guanli.html?page=2&type=1">12</a></li>
        }
    }
    pageTool += "<li class='back_" + tab + "'>...</li>";
    $(".pagenum").html('');//清空分页
    $(".pagenum,.type_" + tab).html(pageTool);

    //
    $('div[type="1"]').show();
    //var type = getUrlParam('type');
    var type = tab;
    if (type == null) {
        type = 1;
    }
    $('ul.lan-class li').css('background', '#fff').css('color', '#333')
    $('.tabbox-show').hide()
    $('li[li="' + type + '"] a').css('background', '#249cfa').css('color', '#fff')
    $('div[type="' + type + '"]').show();
    for (i = 1; i < 8; i++) {//7个标签页
        page(i)
    }
    function page(num) {
        $('.front_' + num).hide();
        $('.back_' + num).hide();
        var lis = $('.type_' + num + ' li'),
            //当面页数
            //    page = getUrlParam('page'),
            page = $("#currentPage_" + tab).val(),
            //总页数
            total_page = lis.size() - 2;
        if (page == null) {
            page = 1;
        }
        if (total_page > 5) {
            lis.hide();
            $('.type_' + num).children().eq(page).show();
            //前面省略号
            if (page > 3) {
                $('.front_' + num).show();
            }
            if (page > 2) {
                $('.type_' + num).children().eq(parseInt(page) - 2).show();
            }
            if (page > 1) {
                $('.type_' + num).children().eq(parseInt(page) - 1).show();
            }
            $('.s-page-' + num).show();
            $('.x-page-' + num).show();
            if (page == 1) {
                $('.s-page-' + num).hide();
            }
            //后面省略号
            if (parseInt(page) + 2 < total_page) {
                $('.back_' + num).show()
            }
            if (parseInt(page) + 1 <= total_page && parseInt(page) != total_page) {
                $('.type_' + num).children().eq(parseInt(page) + 1).show();
            }
            if (parseInt(page) < total_page && parseInt(page) + 1 != total_page) {
                $('.type_' + num).children().eq(parseInt(page) + 2).show();
            }
            if (page == total_page) {
                $('.x-page-' + num).hide();
            }

        }
        lis.attr('class', '');
        $('.type_' + num).children().eq(page).attr('class', 'pitchOn');
    }

}

/**
 * 绑定删除快捷审核选项卡点击事件
 */
function bindDelete() {
    $(".delete").click(function () {
        var guid = $(this).attr("gid");
        deleteshortcutinfo(guid);
    });
}

/**
 * 绑定修改快捷审核选项卡事件
 */

function bindModify() {
    $(".change").click(function () {
        var guid = $(this).attr("gid");
        var shortcutinfo = $(this).parent().parent().children(".perc2").text();
        var shortcuttype = $(this).parent().parent().attr("shortcuttype");
        $('.create-lan-w').fadeIn(500);
        $("#shortcutinfoId").val(guid);
        $("#shortcutinfo").text(shortcutinfo);


        $('ul.create-lan-class li').each(function () {
            if ($(this).attr("type") == shortcuttype) {
                $('ul.create-lan-class li').css('background', '#fff').css('color', '#333');
                $(this).css('background', '#249cfa').css('color', '#fff');
                $('ul.create-lan-class li').removeClass("active");
                $(this).addClass("active");
                return false;
            }
        });



    });
}
function updateTab(shortcuttype) {
    $('ul.lan-class li').each(function () {
        if ($(this).attr("li") == shortcuttype) {
            $('ul.lan-class li').css('background', '#fff').css('color', '#333');
            $(this).css('background', '#249cfa').css('color', '#fff');
            $('ul.lan-class li').removeClass("active");
            $(this).addClass("active");
        }
    });
}
// 齐枭飞添加的js 控制两个选项卡的高亮显示，以及对应的数据
function updateTab(shortcuttype) {
    $('ul.common_class li').each(function () {
        if ($(this).attr("type") == shortcuttype-1) {
            $('ul.common_class li').css('background', '#fff').css('color', '#333');
            $(this).css('background', '#249cfa').css('color', '#fff');
            $('ul.common_class li').removeClass("active");
            $(this).addClass("active");
        }
    });
}
/**
 * 获取快捷用语信息
 */
function getshortcutinfo() {

    var paramObj = GetRequest();
    var tab = paramObj.type;

    if (tab == undefined) {
        tab = 1;
    }
    var type = "";
    if (tab != 1) {
        type = tab - 1;
    }
    var currentPage = parseInt($("#currentPage_" + tab).val());
    var defaultPageCount = 10;//默认一页显示的条数

    $.ajax({
        type: 'GET',
        url: '/webapi/auditplatform/audit/notice',
        data: {
            type: type,  //value：1.基本信息  2.海报信息 3.更正说明 4.门店要求 5.优惠详情 6.补充信息(可选，无则为全部类型)
            paging: JSON.stringify({ "curpage": currentPage, "pagecount": defaultPageCount }) //分页：intvalue
        },
        success: function (msg) {
            if (msg.error == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }

            updateTab(type + 1);
            if (msg != null && msg.data.length > 0) {
                var objs = msg.data;
                var datas = "";
                for (var i = 0; i < objs.length; i++) {
                    var shortcuttype_text = "";
                    var shortcuttype = objs[i].shortcuttype;
                    if (shortcuttype == 1) {
                        shortcuttype_text = "基本信息";
                    } else if (shortcuttype == 2) {
                        shortcuttype_text = "海报信息";
                    } else if (shortcuttype == 3) {
                        shortcuttype_text = "更正说明";
                    } else if (shortcuttype == 4) {
                        shortcuttype_text = "门店要求";
                    } else if (shortcuttype == 5) {
                        shortcuttype_text = "优惠详情";
                    } else if (shortcuttype == 6) {
                        shortcuttype_text = "补充信息";
                    }
                    var guid = objs[i].guid;
                    datas += "<div class='tabcont-cont' gid='" + guid + "' shortcuttype='" + shortcuttype + "'>";
                    datas += "<div class='tabcont-cont-one  perc1 lineheight40'>";
                    datas += "<input type='checkbox' class='chk'/>";
                    datas += "</div>";
                    datas += "<div class='tabcont-cont-one perc2 lineheight40'>";
                    datas += objs[i].shortcutinfo;
                    datas += "</div>";
                    datas += "<div class='tabcont-cont-one perc3 lineheight40'>" + shortcuttype_text + "</div>";
                    datas += "<div class='tabcont-cont-one perc4 lineheight40'>";
                    datas += "<em gid='" + guid + "' class='change'>修改</em> |<em gid='" + guid + "' class='delete'> 删除</em>";
                    datas += "</div>";
                    datas += "</div>";
                }
                $("#shortcutinfo_datas_" + tab).html(datas);
                //var paramObj = GetRequest();
                //var tab = paramObj.type;
                //if(tab == undefined){
                //    tab = 1;
                //}
                //var type = tab - 1;
                assemblePage(msg, tab);
                bindDelete();
                bindModify();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var obj = JSON.parse(XMLHttpRequest.responseText);
            if (obj["error"] == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            if (XMLHttpRequest.readyState == 4)
                alert("网络异常");
        }
    });
}

/**
 * 新增快捷用语信息
 */
var type =type+1;
function addshortcutinfo() {
    var type = $('ul.create-lan-class li[class="active"]').attr("type");
    $.ajax({
        type: 'POST',
        url: '/webapi/auditplatform/audit/notice',
        data: {
            type: type,
            shortcutinfo: $("#shortcutinfo").val() //快捷信息内容
        },

        success: function (msg) {

            if (msg.error == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            var isSuccess = msg.succeed;
           
            if (isSuccess != undefined && isSuccess != null && isSuccess == "succeed") {
                alert("保存成功！");
                //$('.quxiao').click();
                
                window.location.href = "xt-guanli.html" + "?type=" + String(parseInt(type)+1);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (XMLHttpRequest.readyState == 4)
                $(".delete-lan-w4").fadeIn(600).delay(1000).fadeOut(500);
        }
    });
}

/**
 * 更新快捷用语信息
 */
function updateshortcutinfo(shortcutinfoId) {
    var type = $('ul.create-lan-class li[class="active"]').attr("type");
    $.ajax({
        type: 'PUT',
        url: '/webapi/auditplatform/audit/notice',
        data: {
            guid: shortcutinfoId,  //快捷信息id
            type: type,
            shortcutinfo: $("#shortcutinfo").val() //快捷信息内容
        },
        success: function (msg) {
            if (msg.error == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            var isSuccess = msg.succeed;
            if (isSuccess != undefined && isSuccess != null && isSuccess == "succeed") {
                alert("保存成功！");
                //$('.quxiao').click();
                window.location.href = "xt-guanli.html"  + "?type=" + String(parseInt(type)+1);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var obj = JSON.parse(XMLHttpRequest.responseText);
            if (obj["error"] == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            if (XMLHttpRequest.readyState == 4)
                alert("网络异常");
        }
    });
}

/**
 * 删除快捷用语信息
 */
function deleteshortcutinfo(guid) {
    if (!confirm("确定删除吗?")) return;
    $.ajax({
        type: 'DELETE',
        url: '/webapi/auditplatform/audit/notice',
        data: {
            guid: guid  //快捷信息id
        },
        success: function (msg) {
            if (msg.error == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            if (msg != null && msg.succeed == "succeed") {
                window.location.href = "xt-guanli.html";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            var obj = JSON.parse(XMLHttpRequest.responseText);
            if (obj["error"] == "登录失败") {
                alert("用户未登录，跳转至登录页面");
                window.location.href = "../html/login.html";
                return;
            }
            if (XMLHttpRequest.readyState == 4)
                alert("网络异常");
        }
    });
}

$(function () {
    getshortcutinfo();//初始化加载
    /**
     * 上一页点击事件
     */
    $(".s-page").click(function () {
        var tab = $(this).attr("tab");
        var currentPage = $("#currentPage_" + tab).val();
        var page = parseInt(currentPage) - 1;
        goPage(page, tab);
    });

    /**
     * 下一页点击事件
     */
    $(".x-page").click(function () {
        var tab = $(this).attr("tab");
        var currentPage = $("#currentPage_" + tab).val();
        var page = parseInt(currentPage) + 1;
        goPage(page, tab);
    });

    /**
     * 指定某页按钮
     */
    $(".goDesignatedPageBtn").click(function () {
        var tab = $(this).attr("tab");
        var page = parseInt($("#designatedPage_" + tab).val());
        var totalPage = parseInt($("#totalPage_" + tab).text());
        if (page < 1) {
            alert("不能小于1");
            return;
        }
        if (page > totalPage) {
            alert("不能大于总页数");
            return;
        }
        goPage(page, tab);
    });

    /**
     * 保存快捷审核选项卡
     */
    $("#save_shortcutinfo_btn").click(function () {
        var shortcutinfoId = $("#shortcutinfoId").val();
        if (shortcutinfoId != "") {
            updateshortcutinfo(shortcutinfoId);
        } else {
            addshortcutinfo();
        }
    });

    /**
     * 批量删除
     */
    $('#delete-lan').click(function () {
        var type = $(this).attr('type');
        var flag = false;
        var ids = new Array();
        $('.tabbox-show[type=' + type + '] input').each(function () {
            if ($(this).prop('checked')) {
                flag = true;
                ids.push($(this).parent().parent().attr("gid"));
            }
        })
        if (!flag) {
            $('.delete-lan-wab').fadeIn(500)
            return false;
        }
        $("#delete_ids").val(ids.join(","));
        $('.queding').attr('type', type);
        $('.delete-lan-w').fadeIn(500);
    });

    /**
     * 确定批量删除
     */
    $('.queding').click(function () {
        var ids = $("#delete_ids").val();
        $.ajax({
            type: 'delete',
            url: '/webapi/auditplatform/audit/notice',
            data: {
                guid: ids  //快捷信息id
            },
            success: function (msg) {
                if (msg.error == "登录失败") {
                    alert("用户未登录，跳转至登录页面");
                    window.location.href = "../html/login.html";
                    return;
                }
                if (msg != null && msg.succeed == "succeed") {
                    $('.delete-lan-w').fadeOut(500);
                    window.location.href = "xt-guanli.html";
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                var obj = JSON.parse(XMLHttpRequest.responseText);
                if (obj["error"] == "登录失败") {
                    alert("用户未登录，跳转至登录页面");
                    window.location.href = "../html/login.html";
                    return;
                }
                if (XMLHttpRequest.readyState == 4)
                    alert("网络异常");
            }
        });
    })
});