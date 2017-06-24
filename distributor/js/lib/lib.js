$(document).ready(function() {

    $.getUrlParam = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
    $('.fd-nav li').click(function(event){
        $(this).next(".sub-nav").toggle();
        $(this).siblings("li").removeClass('on');
        $(this).siblings("li").find(".sub-nav").hide();
        $(this).addClass('on');
    });

    $('.fd-nav .v1').click(function(event){
        $(this).next(".sub-nav").toggle();
    });


  // узуж
  $('.a-share').click(function(event) {
      $('.overlay').fadeIn();
  });
  $('.overlay').click(function(event) {
      /* Act on the event */
      $(this).fadeOut();
  });
  
  	$("#huodonglist2").hide();
	$("#huodonglist3").hide();
	$("#huodonglist4").hide();
	
});

function huodong(obj){
if(obj==1){
	$("#huodonglist1").show();
	$("#huodonglist2").hide();
	$("#huodonglist3").hide();
	$("#huodonglist4").hide();
	$("#huodong1").addClass("on");
	$("#huodong2").removeClass("on");
	$("#huodong3").removeClass("on");
	$("#huodong4").removeClass("on");
} else if(obj==2){
		$("#huodonglist2").show();
	$("#huodonglist1").hide();
	$("#huodonglist3").hide();
	$("#huodonglist4").hide();
	$("#huodong2").addClass("on");
	$("#huodong1").removeClass("on");
	$("#huodong3").removeClass("on");
	$("#huodong4").removeClass("on");
}else if(obj==3){
		$("#huodonglist3").show();
	$("#huodonglist2").hide();
	$("#huodonglist1").hide();
	$("#huodonglist4").hide();
	$("#huodong3").addClass("on");
	$("#huodong1").removeClass("on");
	$("#huodong2").removeClass("on");
	$("#huodong4").removeClass("on");
}else if(obj==4){
		$("#huodonglist4").show();
	$("#huodonglist2").hide();
	$("#huodonglist3").hide();
	$("#huodonglist1").hide();
	$("#huodong4").addClass("on");
	$("#huodong2").removeClass("on");
	$("#huodong3").removeClass("on");
	$("#huodong1").removeClass("on");
}
}



// $(".flipsnap").scroll(function(event) {
//     var huodong1 = $("#huodong1").offset().left;
//     var huodong2 = $("#huodong2").offset().left;
//     var huodong3 = $("#huodong3").offset().left;
//     var huodong4 = $("#huodong4").offset().left;

//     var left = $(".flipsnap").scrollLeft();

//     if( left >= -huodong1 && left < -huodong2){
//         $("#huodong1").addClass("on");
//         $("#huodong2").removeClass("on");
//         $("#huodong3").removeClass("on");
//         $("#huodong4").removeClass("on");
//     }
//     if( left >= -huodong2 && left < -huodong3){
//         $("#huodong2").addClass("on");
//         $("#huodong1").removeClass("on");
//         $("#huodong3").removeClass("on");
//         $("#huodong4").removeClass("on");
//     }
//     if( left >= -huodong3 && left < -huodong4){
//         $("#huodong3").addClass("on");
//         $("#huodong1").removeClass("on");
//         $("#huodong2").removeClass("on");
//         $("#huodong4").removeClass("on");
//     }
//     if( left >= huodong4){
//         console.log(huodong4);
//         $("#huodong4").addClass("on");
//         $("#huodong2").removeClass("on");
//         $("#huodong3").removeClass("on");
//         $("#huodong1").removeClass("on");
//     }

// });

// $('.flipsnap').scroll(function(event) {
//     var x = $(this).scrollLeft();
//     $('.flipsnap li').each(function(index, el) {
//         var left = $(this).position().left;
//         if(x > left){
//             $(this).addClass('on')
//         }else{
//             $(this).removeClass('on')
//         }
//     });
// });

$('.flipsnap').on('scroll', function() {
    $('.flipsnap li').each(function(i) {
        if( $(this).position().left <= 50 ){
            $(this).addClass('on').siblings('li').removeClass('on');
            
        }
        setTimeout("ssd()",500);
    });
}).scroll();

function ssd(){
	
        for(var i=1;i<=4;i++){
        	
       	var ss = $('#huodong'+i).attr('class');
       //	alert("22=="+i+"==="+ss);
	    if(ss=="on"){
	    //	alert(i);
	    	huodong(i);
	    	break;
	    }
   		}
}