$(function (){
	//项目子类效果 点击加遮罩
	$(".titelsub").click(function(){		
	  $(".masktabcontent").css("display","block"); 
      $(".masktabcontent").css("top","60px");       
  });   
  // 点击去掉遮罩
   $(".clear").click(function(){
	    $(".masktabcontent").removeClass(); 
		 });

  
//end	
});
