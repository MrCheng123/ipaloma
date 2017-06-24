/**
 * Created by Administrator on 2016/12/30.
 */
//底部菜单点击效果
function fnfooterclick() {
    $("footer").on("click","div",function () {
        if($(this).find("ul").attr("class")=="on"){
            $("footer").find("ul").removeClass("on");
        }else {
            $("footer").find("ul").removeClass("on");
            $(this).find("ul").addClass("on");
        }
    });
    $(document).click(function (e) {
        if (!$(e.target).closest("footer").length) {
            $("footer ul").removeClass("on");
        }
    });
}

//获取数据
function fngetlist() {
    $.ajax({
        type: "get",
      	url: "/webapi/distributor/distributors/getall",
      	//url: "../../data/fenxiaolist.json",
        data:"",
        timeout:"9000",
        dataType:"json",
        error:function(XMLHttpRequest, textStatus, errorThrown){
        	if(textStatus=="timeout"){
                $(".cgl-tishi").html("请求超时~").stop(true, true).fadeIn(500).delay(1000).fadeOut(500);
        		XMLHttpRequest.abort();
        	}
        },
        success: function(data){
        	localStorage.retaler=data.retalerid;
            console.log(data);
            localStorage.retalerdata=JSON.stringify(data);
            if(data.data.result==false){
            	return false;
            }
            //data.data.length=0
            if(data.data.length<1){
            	$(".noone").show();
            	$(".toorder").css({display:"none"});
			}else {
                $(".noone").hide();
                $(".toorder").css({display:"block"});
                data=data.data;
                var oli="";
                var ceng1=null;
                var ceng2=null;
                var ceng3=null;
                var thissp={
                    distributor_id:null,
                    shopid:localStorage.getItem("retaler"),
                    distributorname:null,
                    distributorimg:null,
                    contactperson:null,
                    mobilephone:null,
                    cutgift:null,
                    itemcount:null,
                    active:null
                };
                var geshu=0;
                for(var k1 in data){
                    if(data[k1]["openshipping"]==1){
                        geshu++;
                        $(".toorder").show();
                        ceng1=data[k1];
                        thissp.distributor_id=ceng1["distributor_id"];
                        thissp.distributorname=ceng1["distributorname"];
                        thissp.distributorimg=ceng1["distributorimg"];
                        thissp.contactperson=ceng1["contactperson"];
                        thissp.mobilephone=ceng1["mobilephone"];
                        thissp.cutgift=ceng1["cutgift"];
                        thissp.itemcount=ceng1["itemcount"];

                        oli+="<li id='"+k1+"' class='hori' data-xx='"+JSON.stringify(thissp)+"'>" +
                            "<div class='main-l'>" +
                            "<img src='"+ceng1["distributorimg"]+"'>" +
                            "</div>" +
                            "<div class='main-r'>" +
                            "<div class='main-rt'>" +
                            "<div class='namejia left'>" +
                            "<a>" +
                            "<div class='listname'>"+ceng1["distributorname"]+"</div>" +
                            "</a>" +
                            "<p>起送价 ￥<i>"+ceng1["cutgift"]+"</i>元</p>" +
                            "</div>" +
                            "<a href='shopcar.html?distributor_id="+thissp.distributor_id+"'><span class='joincar right'><em>"+ceng1["itemcount"]+"</em></span></a>" +
                            "</div>" +
                            "<div class='cgl-manj'>";
                        if(ceng1["specialprice"]>0){oli+="<p>微信下单立减<span>"+ceng1["specialprice"]+"</span>元</p>";}
                        if(ceng1["itemkind"]=="满赠"){
                            oli+="<p style='background-image:url(../../image/shop/zeng.png);'>";
                            for(var k2 in ceng1["promotionactivity"]["details"]){
                                ceng2=ceng1['promotionactivity']['details'][k2];
                                oli+="满"+ceng2["moneysum"]+"元赠";
                                for(var k3 in ceng2["giftitems"]){
                                    ceng3=ceng2['giftitems'][k3];
                                    oli+=ceng3["itemname"]+ceng3["count"]+ceng3["unit"];
                                    if(ceng3["itemquality"]==0){
                                        oli+="(临期)"
                                    }
                                    oli+="，";
                                }
                                oli=oli.substring(0,oli.length-1);
                                oli+="；";
                            }
                            oli=oli.substring(0,oli.length-1);
                        }
                        if(ceng1["itemkind"]=="满减"){
                            oli+="<p>";
                            for(var k2 in ceng1["promotionactivity"]["details"]){
                                ceng2=ceng1['promotionactivity']['details'][k2];
                                oli+="满"+ceng2["moneysum"]+"元赠";
                                for(var k3 in ceng2["giftitems"]){
                                    ceng3=ceng2['giftitems'][k3];
                                    oli+=ceng3["itemname"]+ceng3["count"]+ceng3["unit"]+"，";
                                }
                                oli=oli.substring(0,oli.length-1);
                                oli+="；";
                            }
                            oli=oli.substring(0,oli.length-1)+"</p>";
                        }
                        oli+="</div>"+
                            "</div>" +
                            "</li>";
                    }
                }
                $("#cgl-main").html(oli).on("click","li",function () {
                    localStorage.index=$(this).attr("id")
                    var thissp1=JSON.parse($(this).attr("data-xx"));
                    thissp1.active=$(this).find(".cgl-manj").html();
                    //console.log(thissp)
                    sessionStorage.setItem("fenxiao",JSON.stringify(thissp1))
                    window.location="activeindex.html";
                });
                if(geshu==0){
                    $(".noone").show();
                    $(".toorder").hide();
                }
            }
            if($("*",".cgl-manj").length<1){
                $(".main-rt").css("border","0");
            }

        }
    });
}



$(function () {

	
	if(!localStorage.reload){
		localStorage.reload=1;
		    fnfooterclick();
    		fngetlist();
	}else if(localStorage.reload==1){
		var _tt=setInterval(function(){
			
				
				
				fnfooterclick();
    			fngetlist();
    			clearInterval(_tt);
			},100)
		}else{
							fnfooterclick();
    			fngetlist();
		}
});
