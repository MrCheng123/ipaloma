$(document).ready(function () {



    var commodity = location.search.split("&")[1].replace("index=", "")
    var pg = location.search.split("&")[0].replace("?pg=", "")
    var _list = "";
    var _list2 = "";
    var _list3 = "";
    var _kind = "";
    var _give = "";
    var _flag = 1;
    var _price = 0;
    var _amount = 0;
    var _data1 = JSON.parse(localStorage.retalerdata).data
    var _pp = "";
    var _image = "";
    var _img = "";
    var _discount = 0
    var _zeng = 0;
    var _tuihuo = 0;
    var _get = 0;
    var _indd = localStorage.list;
    var _ly = "";
    var _zengg = "";
    var _lln = "";
    var _yucun = 0;
    console.log(pg)
    console.log(commodity)
    var data = JSON.parse(localStorage.getItem("pg" + pg))
    console.log(data)
    console.log(data)
    var billdata = data["content"][commodity]["details"];
    
    $(".emp li:nth-child(1)").text("订单号：" + data["content"][commodity]["serialnumber"])
    $(".emp li:nth-child(2)").text("下单时间：" + data["content"][commodity]["issuetime"])
    $(".emp li:nth-child(3)").text("期望配送时间：" + data["content"][commodity]["billexpecteddelivertime"].split(" ")[0])
    $(".emp li:nth-child(4)").text("订单备注：" + (data["content"][commodity]["description"] == null ? "" : data["content"][commodity]["description"]))
    $(".emp li:nth-child(5)").text("分销商名称：" + _data1[_indd]["distributorname"])
    $(".emp li:nth-child(6)").text("联系方式：" + _data1[_indd]["mobilephone"])
    //alert(data["content"][7]["details"].length)
    _image = "<img src=../../image/shop/yu.jpg />"

    for (var i = 0; i < billdata.length; i++) {
        if (billdata[i]["description"]) {
            if (billdata[i]["description"] != "" || billdata[i]["description"] != null) {
                _remark = "<div class=" + "\"give\"" + " style=\"color:#ffbda3\"><div class=" + "\"give-tit\"" + " style=\"color:#ffbda3\">留言：</div><div class=" + "\"give-con\"" + " style=\"color:#ffbda3\">" + billdata[i]["description"] + "</div></div>"
            }
        } else {
            _remark = "";
        }
        console.log(billdata[i]["toexpirecount"])
        if (billdata[i]["toexpirecount"] > 0) {
            _img = "<img src=\"../../image/shop/icon_lin.png\" style=\"float: left;width: 1.6rem;height: 1.6rem;\">"
        } else {
            _img = "";
        }
        //							if(billdata[i]["description"]!="" || billdata[i]["description"]!=null){
        //								_ly="<div class="+"\"disc2\" style="+(data1[i]["remark"]==""?"display:none":"")+"><div>留言：<input readonly=\"true\" style=\";outline:none;width:80%;font-size:1.6rem\" value="+(data1[i]["remark"]==""?"":data1[i]["remark"])+"></div></div>"
        //							}
        if (billdata[i]["billid_class"] == "tblbilldelivery") {
            if (billdata[i]["itemgifttype"] != 3 ) {
                _get += billdata[i]["itemunitcost"] * billdata[i]["itemcount"]
                if ((billdata[i]["ruleid"]=="" ||billdata[i]["ruleid"]==null)) {
                    //_price+=data[i]["price"]*data[i]["itemcount"];
                    //_get+=Number(Number(billdata[i]["itemunitcost"])*Number(billdata[i]["itemcount"]))
                    //		       			_list+="<li><div class="+"\"shop-con\""+"><img src="+billdata[i]["itemobj"]["itemimage"]+" /><div class="+"\"shop-con-bd\""+"><div class="+"\"shop-tit\""+
                    //			       		">"+billdata[i]["itemobj"]["itemname"]+_img+"</div><div class="+"\"shop-body\""+">￥"+billdata[i]["itemobj"]["itemunitcost"]+"</div><div class="+"\"number\""+
                    //			       		"><div></div><div>×"+billdata[i]["itemcount"]+"</div></div><span class="+"\"pi\""+">￥"+billdata[i]["itemunitcost"].toFixed(2)+"<span style="+"\"display:inline-block;width:1.4rem;height:1.4rem;border-radius:50%;text-align:center;border:1px solid #ccc\""+
                    //							">预</span></span><p>可提"+billdata[i]["prepaycount"]+data[i]["packagetypename"]+"</p></div></div></li>"

                    _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + billdata[i]["itemobj"]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + ">" +/*_image+*/"<div class=" + "\"shop-tit\"" + "><span>" + billdata[i]["itemobj"]["itemname"] + "</span></div><div class=" + "\"shop-body\"" + ">￥" + (billdata[i]["itemunitcost"]).toFixed(2) +
                    "</div><div class=" + "\"number\"" + "><div style=" + "\"text-align:left\">" + (billdata[i]["itemobj"]["specification"] == null ? "" : billdata[i]["itemobj"]["specification"] + " | ") +
                    (billdata[i]["itemobj"]["packagetypename"] == null ? "" : billdata[i]["itemobj"]["packagetypename"]) + "</div><div>x" + billdata[i]["itemcount"] +
                    "</div></div></div></div><div class=" +
                    "\"discount\"" + ">" + _remark + "</li>";
                } else if (billdata[i]["itemkind"] == "降价") {
                    //_price+=data[i]["price"]*data[i]["itemcount"];
                    _discount += (billdata[i]["itemoriginalcost"] - billdata[i]["itemunitcost"]) * billdata[i]["itemcount"]
                    _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + billdata[i]["itemobj"]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                ">" + billdata[i]["itemobj"]["itemname"] + _img + "</div><div class=" + "\"shop-body\"" + ">￥" + billdata[i]["itemunitcost"].toFixed(2) + "</div><div class=" + "\"number\"" +
                "><div style=" + "\"text-align:left\">" + (billdata[i]["itemobj"]["specification"] == null ? "" : billdata[i]["itemobj"]["specification"] + " | ") +
                        (billdata[i]["itemobj"]["packagetypename"] == null ? "" : billdata[i]["itemobj"]["packagetypename"]) + "</div><div>×" + billdata[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">降价</div><span class=" + "\"discount-con\"" +
                ">" + billdata[i]["discount"] + " 折</span></div>" + _remark + "</li>"
                } else if (billdata[i]["itemkind"] == "买赠") {
                    //_price+=data[i]["price"]*data[i]["itemcount"];
                    for (var r = 0; r < billdata.length; r++) {
                        if (billdata[r]["billid_class"] === "tblbillgift" && billdata[r]["itemkind"] && billdata[r]["itemkind"] === "买赠" && billdata[r]["ruleid"] && billdata[r]["ruleid"] ==billdata[i]["ruleid"] ) {
                            _zengg = billdata[r]["itemobj"]["itemname"] + (billdata[r]["itemobj"]["specification"]==null?"":billdata[r]["itemobj"]["specification"]) + "<span style=\"float:right\">" + billdata[r]["itemcount"] + (billdata[r]["itemobj"]["packagetypename"] == null ? "" : billdata[r]["itemobj"]["packagetypename"]) + "</span>"
	                        if (billdata[r]["toexpirecount"] > 0) {
	                            _lln = "(临期)"
	                        } else {
	                            _lln = ""
	                        }
                        }
                    }
                    _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + billdata[i]["itemobj"]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                ">" + billdata[i]["itemobj"]["itemname"] + _img + "</div><div class=" + "\"shop-body\"" + ">￥" + billdata[i]["itemunitcost"].toFixed(2) + "</div><div class=" + "\"number\"" +
                "><div style=" + "\"text-align:left\">" + (billdata[i]["itemobj"]["specification"] == null ? "" : billdata[i]["itemobj"]["specification"] + " | ") +
                        (billdata[i]["itemobj"]["packagetypename"] == null ? "" : billdata[i]["itemobj"]["packagetypename"]) + "</div><div>×" + billdata[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">买赠</div><span class=" + "\"discount-con\"" +
                ">买" + billdata[i]["salecount"] + billdata[i]["itemobj"]["packagetypename"] + billdata[i]["giftitemobj"]["itemname"] + "赠" + billdata[i]["giftcount"] + billdata[i]["itemobj"]["packagetypename"] + billdata[i]["giftitemobj"]["itemname"] + "</span></div><div class=" + "\"give\"" + "><div class=" + "\"give-tit\"" + ">赠品：</div><div class=" + "\"give-con\"" + ">" + _zengg + _lln + "</div></div>" + _remark + "</li>"
                } else if (billdata[i]["itemkind"] == "有礼") {
                    //_price+=data[i]["price"]*data[i]["itemcount"];
                    for (var r = 0; r < billdata.length; r++) {
                        if (billdata[r]["billid_class"] === "tblbillgift" && billdata[r]["itemkind"] && billdata[r]["itemkind"] === "有礼" && billdata[r]["ruleid"] && billdata[r]["ruleid"] ==billdata[i]["ruleid"] ) {
                            _zengg = billdata[r]["itemobj"]["itemname"] + (billdata[r]["itemobj"]["specification"]==null?"":billdata[r]["itemobj"]["specification"]) + "<span style=\"float:right\">" + billdata[r]["itemcount"] + (billdata[r]["itemobj"]["packagetypename"] == null ? "" : billdata[r]["itemobj"]["packagetypename"]) + "</span>"
	                        if (billdata[r]["toexpirecount"] > 0) {
	                            _lln = "(临期)"
	                        } else {
	                            _lln = ""
	                        }
                        }
                        
                    }
                    _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + billdata[i]["itemobj"]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
            ">" + billdata[i]["itemobj"]["itemname"] + _img + "</div><div class=" + "\"shop-body\"" + ">￥" + billdata[i]["itemunitcost"].toFixed(2) + "</div><div class=" + "\"number\"" +
            "><div style=" + "\"text-align:left\">" + (billdata[i]["itemobj"]["specification"] == null ? "" : billdata[i]["itemobj"]["specification"] + " | ") +
                    (billdata[i]["itemobj"]["packagetypename"] == null ? "" : billdata[i]["itemobj"]["packagetypename"]) + "</div><div>×" + billdata[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">有礼</div><span class=" + "\"discount-con\"" +
            ">购买" + billdata[i]["salecount"] + billdata[i]["itemobj"]["packagetypename"] + billdata[i]["itemobj"]["itemname"] + "赠送" +
                    billdata[i]["giftcount"] + billdata[i]["itemobj"]["packagetypename"] + billdata[i]["giftitemobj"]["itemname"] + "</span></div><div class=" + "\"give\"" + "><div class=" + "\"give-tit\"" + ">赠品：</div><div class=" + "\"give-con\"" + ">" + _zengg + _lln + "</div></div>" + _remark + "</li>"
                } else if (billdata[i]["itemkind"] == "折扣") {
                    //_price+=data[i]["price"]*data[i]["itemcount"];
                    _discount += (billdata[i]["itemoriginalcost"] - billdata[i]["itemunitcost"]) * billdata[i]["itemcount"]
                    _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + billdata[i]["itemobj"]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                ">" + billdata[i]["itemobj"]["itemname"] + _img + "</div><div class=" + "\"shop-body\"" + ">￥" + billdata[i]["itemunitcost"].toFixed(2) + "</div><div class=" + "\"number\"" +
                "><div style=" + "\"text-align:left\">" + (billdata[i]["itemobj"]["specification"] == null ? "" : billdata[i]["itemobj"]["specification"] + " | ") +
                        (billdata[i]["itemobj"]["packagetypename"] == null ? "" : billdata[i]["itemobj"]["packagetypename"]) + "</div><div>×" + billdata[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">折扣</div><span class=" + "\"discount-con\"" +
                ">" + billdata[i]["discount"] + " 折</span></div>" + _remark + "</li>"
                }
            }
            else {
                _yucun += billdata[i]["itemunitcost"] * billdata[i]["itemcount"]
                _get += billdata[i]["itemunitcost"] * billdata[i]["itemcount"]
                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + billdata[i]["itemobj"]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + ">" +/*_image+*/"<div class=" + "\"shop-tit\"" + ">" +_image+"<span>" + billdata[i]["itemobj"]["itemname"] + "</span></div><div class=" + "\"shop-body\"" + ">￥" + (billdata[i]["itemunitcost"]).toFixed(2) +
                "</div><div class=" + "\"number\"" + "><div style=" + "\"text-align:left\">" + (billdata[i]["itemobj"]["specification"] == null ? "" : billdata[i]["itemobj"]["specification"] + " | ") +
                (billdata[i]["itemobj"]["packagetypename"] == null ? "" : billdata[i]["itemobj"]["packagetypename"]) + "</div><div>x" + billdata[i]["itemcount"] +
                "</div></div></div></div><div class=" +
                "\"discount\"" + ">" + _remark + "</li>";
            }
        } else if (billdata[i]["promotionno"] != "mz" && billdata[i]["billid_class"] == "tblbillgift" && billdata[i]["promotionno"] != null) {
            _zeng += Number(billdata[i]["itemunitcost"] * billdata[i]["itemcount"])
            if (billdata[i]["itemgifttype"] != 3) {
                _list2 += "<li><div class=" + "\"shop-con\"" + "><img src=" + billdata[i]["itemobj"]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + ">" +/*_image+*/"<div class=" + "\"shop-tit\"" + ">" + _img + "<span>" + billdata[i]["itemobj"]["itemname"] + "</span></div><div class=" + "\"shop-body\"" + ">￥" + (billdata[i]["itemunitcost"]).toFixed(2) +
                "</div><div class=" + "\"number\"" + "><div style=" + "\"text-align:left\">" + (billdata[i]["itemobj"]["specification"] == null ? "" : billdata[i]["itemobj"]["specification"] + " | ") +
                (billdata[i]["itemobj"]["packagetypename"] == null ? "" : billdata[i]["itemobj"]["packagetypename"]) + "</div><div>x" + billdata[i]["itemcount"] +
                "</div></div></div></div><div class=" +
                "\"discount\"" + "></li>";
            }
            //_amount+=Number(billdata[i]["itemunitcost"]*billdata[i]["qualitycount"])

            //_price+=billdata[i]["itemunitcost"]*billdata[i]["qualitycount"]
            var _ll = "";
            var _kk = 0;
            console.log(_price)



            console.log(_give)


        } else if (billdata[i]["billid_class"] == "tblbillreturncustomer") {
            _tuihuo += Number(billdata[i]["itemunitcost"] * billdata[i]["itemcount"]);
            _list3 += "<li><div class=" + "\"shop-con\"" + "><img src=" + billdata[i]["itemobj"]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + ">" +/*_image+*/"<div class=" + "\"shop-tit\"" + ">" + _img + "<span>" + billdata[i]["itemobj"]["itemname"] + "</span></div><div class=" + "\"shop-body\"" + ">￥" + (billdata[i]["itemunitcost"]).toFixed(2) +
                "</div><div class=" + "\"number\"" + "><div style=" + "\"text-align:left\">" + (billdata[i]["itemobj"]["specification"] == null ? "" : billdata[i]["itemobj"]["specification"] + " | ") +
                (billdata[i]["itemobj"]["packagetypename"] == null ? "" : billdata[i]["itemobj"]["packagetypename"]) + "</div><div>x" + billdata[i]["itemcount"] +
                "</div></div></div></div><div class=" +
                "\"discount\"" + "></li>";
        } else {
        	_ll = billdata[i]["itemobj"]["itemname"] + " " + (billdata[i]["itemobj"]["specification"]==null?"":billdata[i]["itemobj"]["specification"]);
            _kk = Number(billdata[i]["itemcount"]) + billdata[i]["itemobj"]["packagetypename"];
            if (_flag == 1) {
                _give += "<li><div class=" + "\"gg\"" + ">满赠</div><span class=" + "\"gif\"" + ">" + _ll + "<span>×" + _kk + "</span></span></li>"
                _flag++
            } else {
                _give += "<li><div class=" + "\"gift\"" + ">" + _ll + "<span>×" + _kk + "</span></div></li>"
            }
            _zeng += Number(billdata[i]["itemunitcost"] * billdata[i]["itemcount"])
        }
        console.log(i)
       
    }
    $("#pp span").text(_discount.toFixed(2))
    console.log(_data1)
    if (data["content"][commodity]["iswechatdiscount"] == true) {
        $("#vv").css({ display: "flex", display: "-webkit-box" })
        if (data["content"][commodity]["openflag"] == 1) {
            if (_data1[_indd]["specialprice"]) {
                _discount += Number(_data1[_indd]["specialprice"])
                $("#vv span").text(Number(_data1[_indd]["specialprice"]).toFixed(2))
            }

        } else {
            if (data["content"][commodity]["wechatdiscount"] && data["content"][commodity]["wechatdiscount"]>0) {
                _discount += Number(data["content"][commodity]["wechatdiscount"])
                $("#vv span").text(Number(data["content"][commodity]["wechatdiscount"]).toFixed(2))
            } else {
                $("#vv").css({ display: "none" })
            }

        }

    } else {
        $("#vv").css({ display: "none" })
    }
    console.log(_get)

    $("#ss span").text(_zeng.toFixed(2));
    if(_tuihuo>0){
    	$("#th>div:nth-child(2)>span").text(_tuihuo.toFixed(2));
    	$("#th").css({ display: "flex", display: "-webkit-box" });
    }else{
    	$("#th").hide();
    }
	

    $(".shoplist").html($(".shoplist").html() + _list)
    if (_list2 != "") {
        $(".gflist").html($(".gflist").html() + _list2)
    } else {
        $(".gflist").css({ display: "none" })
    }
    if (_list3 !== "") {
        $(".yucunList").html($(".yucunList").html() + _list3)
    } else {
        $(".yucunList").css({ display: "none" })
    }

    //alert(_give)
    if (_give != "") {
        $(".kind").html(_give)
    } else {
        $(".giveto").remove()
    }
    $("#dd span").text(_get.toFixed(2))
   // _get -= Number($("#vv span").text())
     
    $("#ee span").text(_yucun.toFixed(2))
    if (_yucun == 0) {
        $("#ee").hide()
    }
    if (_discount < 0) {
        _discount = 0
    }
    $(".amountBig").next().find("span").text(_discount.toFixed(2))
    if(data["content"][commodity]["openflag"]==1){
    	var heji=(_get - _yucun)-_tuihuo;
    	var wechat=Number(_data1[_indd]["specialprice"]);
    	if(heji < 0){
    		//隐藏微信专项
    		$("#vv").css({ display: "none" })
    		$(".amountBig span:nth-child(1)").text("应收合计");
    		$(".amountBig span:nth-child(2)").text(Math.abs(heji).toFixed(2));
    	}else if(heji>0){
    		 $(".amountBig span:nth-child(1)").text("应付合计");
    		 var showheji=data["content"][commodity]["iswechatdiscount"] == true?heji-wechat:heji;
    	     $(".amountBig span:nth-child(2)").text(showheji>0? showheji.toFixed(2):"0.00");
    	}else
    	{
    		 $(".amountBig span:nth-child(1)").text("合计");
    		 $(".amountBig span:nth-child(2)").text("0.00");
    	}
	     
    }else{
    	if(data["content"][commodity]["shishou"] && data["content"][commodity]["shishou"]>0)
    	{
    		$(".amountBig span:nth-child(1)").text("实收合计")
    		 $(".amountBig span:nth-child(2)").text(Number(data["content"][commodity]["shishou"]).toFixed(2))
    	}else if(data["content"][commodity]["shifu"] && data["content"][commodity]["shifu"]>0){
    		$(".amountBig span:nth-child(1)").text("实付合计")
    		 $(".amountBig span:nth-child(2)").text(Number(data["content"][commodity]["shifu"]).toFixed(2))
    	}else{
    		$(".amountBig span:nth-child(1)").text("合计")
    		 $(".amountBig span:nth-child(2)").text("0.00")
    	}
    	if(data["content"][commodity]["moling"] && data["content"][commodity]["moling"]>0){
    		$("#ml>div:nth-child(2)>span").text(Number(data["content"][commodity]["moling"]).toFixed(2));
    		$("#ml").css({ display: "flex", display: "-webkit-box" });
    	}
    	if(data["content"][commodity]["yucunkuan"] && data["content"][commodity]["yucunkuan"]>0){
    		$("#sy>div:nth-child(2)>span").text(Number(data["content"][commodity]["yucunkuan"]).toFixed(2));
    		$("#sy").css({ display: "flex", display: "-webkit-box" });
    	}
    }
    console.log($("section").css("height"))
    console.log($("body").css("height"))
    if (Number($("section").css("height").replace("px", "")) <= Number($("body").css("height").replace("px", ""))) {
        $("html").css({ overflow: "hidden" })
    } else {
        $("html").css({ overflow: "scroll" })
    }
    $(".loads").css({ display: "none" })



})