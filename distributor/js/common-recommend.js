$(function () {    
    $('.bottom-btnr').click(function () {
        $(window).bind("touchmove", function (e) {
            e.preventDefault();
        })
        //$('.showbox-w2').fadeIn(1000).delay(3000).fadeOut(1000, function () {
        //    $(window).unbind("touchmove");
        //});

        $('.showbox-w2').fadeIn(200);
    });


    $('.showbox-w2').click(function () {
        $('.showbox-w2').fadeOut(200);
        $(window).unbind("touchmove");
    });
});