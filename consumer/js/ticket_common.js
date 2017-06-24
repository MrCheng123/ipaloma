$(document).ready(function () {
    $("#activityrule").load("activityrule.html")
})

function actionsheetclick() {
    var mask = $('#mask');
    var weuiActionsheet = $('#weui_actionsheet');
    weuiActionsheet.addClass('weui_actionsheet_toggle');
    mask.show()
        .focus()//加focus是为了触发一次页面的重排(reflow or layout thrashing),使mask的transition动画得以正常触发
        .addClass('weui_fade_toggle').one('click', function () {
            hideActionSheet(weuiActionsheet, mask);
        });
    $("html,body,#list").css({ "overflow": "hidden" })

    $("#actionSheet_wrap,#actionsheet_cancel").show()
    $('#actionsheet_cancel').one('click', function () {
        hideActionSheet(weuiActionsheet, mask);
    });
    mask.unbind('transitionend').unbind('webkitTransitionEnd');

    $('#actionSheet_wrap').bind("touchmove", function (e) {
        e.preventDefault();
    });
    //overscroll(document.querySelector('#weui_actionsheet'));
    // document.getElementById('mask')[0].addEventListener('touchstart', function (e) { e.preventDefault(); }, false)
    function hideActionSheet(weuiActionsheet, mask) {
        $("html,body,#list").css("overflow", "auto")
        weuiActionsheet.removeClass('weui_actionsheet_toggle');
        mask.removeClass('weui_fade_toggle');
        mask.on('transitionend', function () {
            $("#actionSheet_wrap,#actionsheet_cancel").hide()
            mask.hide();
        }).on('webkitTransitionEnd', function () {
            $("#actionSheet_wrap,#actionsheet_cancel").hide()
            mask.hide();
        })
    }
}


var overscroll = function (el) {
    el.addEventListener('touchstart', function () {
        var top = el.scrollTop
          , totalScroll = el.scrollHeight
          , currentScroll = top + el.offsetHeight
        //If we're at the top or the bottom of the containers
        //scroll, push up or down one pixel.
        //
        //this prevents the scroll from "passing through" to
        //the body.
        if (top === 0) {
            el.scrollTop = 1
        } else if (currentScroll === totalScroll) {
            el.scrollTop = top - 1
        }
    })
    el.addEventListener('touchmove', function (evt) {
        //if the content is actually scrollable, i.e. the content is long enough
        //that scrolling can occur
        if (el.offsetHeight < el.scrollHeight)
            evt._isScroller = true
    })
}