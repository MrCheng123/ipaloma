$(function () {
    $(".bottom-nav").load("common-bottom-nav.html", function () {
        $('.fd-nav li').unbind();
        $('.fd-nav v1').unbind();
        $('.fd-nav li').click(function (event) {
            $(this).next(".sub-nav").toggle();
            $(this).siblings("li").removeClass('on');
            $(this).siblings("li").find(".sub-nav").hide();
            $(this).addClass('on');
        });
        $('.fd-nav .v1').click(function (event) {
            $(this).next(".sub-nav").toggle();
        });
    });
});
