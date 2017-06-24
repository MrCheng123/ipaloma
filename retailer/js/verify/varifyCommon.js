

function getactivitykindimg(el) {
    var imgurl = "/retailer/image/verify/";
    var activitykind = el.activitykind
    switch (activitykind) {
        case "有礼":
            imgurl += "jb_yl.png";
            break;
        case "买赠":
            imgurl += "jb_mz.png";
            break;
        case "套餐":
            imgurl += "jb_tc.png";
            break;
        case "降价":
            imgurl += "jb_jj.png";
            break;
    }

    return imgurl;
}

function getzktitle(el) {
    var title = ""
    var activitykind = el.activitykind
    switch (activitykind) {
        case "买赠":
            title = "买" + el.buycount + "赠" + el.giftcount;
            break;
        case "套餐":
            title = "已节省" + el.sparevalue + "元";
            break;
        case "降价":
            title = el.discount + "折";
            break;
    }
    return title
}

function showTitle() {//展示/隐藏全部提示
    var prevjd = $(this).prev(".ztitle")//查找点击所在的同级节点

    if ($(this).attr("class") == "arrows_down") {
        $(prevjd).css("height", "auto")
        $(this).attr("class", "arrows_up")
    } else {
        $(this).attr("class", "arrows_down")
        $(prevjd).css("height", "20px")
    }

}