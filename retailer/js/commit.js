


function oJz(){
	    var pg = 0;//门店        后续需要加js！！！！！！！！！！！！！
    var _list = "";
    var _cost = 0;
    var _send = "";
    var _flag = 0;
    var _yucun=0;
    var _mzg=0;
	    var _year = new Date().getFullYear()
	    var _month = new Date().getMonth() + 1 
	    var _jud=new Date(new Date().getFullYear(),new Date().getMonth()+1,1).getTime();
	    var _day = new Date(new Date().getFullYear(),new Date().getMonth(),28).getTime()+1000*60*60*24;
	    if(_jud-_day<=0){
	    	if(_month<12){
	    		_month=Number(_month)+1;
	    	}else{
	    		_year=Number(_year)+1
	    		_month=1;
	    	}
	    	_day=new Date(new Date().getFullYear(),new Date().getMonth()+1,1).getDate()
	    }else{
	    	_day=new Date().getDate()+1
	    }
	    _day=_day >= 10 ? _day  : "0" + _day;
	    _month=_month > 10 ? _month : ("0" + _month)
	    console.log(_month)
	    $("#beginTime").val(_year + "-" + _month + "-" + _day)
    var _distrgive = "";
    var _reduce = 0;
    var _discount = 0;
    var _mz = "";
    var _dx = {};
    var _indd = localStorage.index;
    var _index = [];
    
    var _sub = "";
    var _url = location.href;
	var _Id = "";
	if (localStorage.Id) {
		_Id = localStorage.Id

	
       
   } else if (location.search == "") {
   		$(".loads").show();
        window.history.go(-1)
    }

    if (_Id !== "") {
        _sub = "&submitids=" + _Id
    }
    console.log(_Id)
	//获取提交订单数据
    $.ajax({
        url: "/webapi/distributor/" + getRetailerid() + "/orderform/items?distributor_id=" + localStorage.disId + _sub,
        async: true,
        cache: false,
        dataType: "json",
        type: "get",
        error: function () { $(".loads").css({ display: "none" }) },
        success: function (data) {
        	//遍历data，渲染页面
        	console.log(data)
        	$(".loads").css({ display: "none" })
        	if(data){
	        	if(data.info && data.info=="shoppingcartchanged"){
	        		$(".tsh").css({display:"block"});
	        		$(".ms").text("购物车中的商品已发送变动，请重新提交！")
	        		$(".cfm").click(function(){
	        			window.history.go(-1)
	        		})
	        	}
	        	else if(data.error){
	        		$(".tsh").css({displat:"block"});
	        		$(".ms").text("出错了！")
	        		$(".cfm").click(function(){
	        			window.history.go(-1)
	        		})
	        	}        		
        	}
            var _list = "";
            var _name = "";
            var _price = 0;
            var _zengprice = 0;
            var _intr = "";
            var _ltr = "";
            var _data = data
            var _remark = "";
            var _image = "";
            var _zz = 0;
            if (_data != "") {
                for (var i = 0; i < _data.length; i++) {
                	if(data[i]["info"]=="shoppingcartchanged"){
                		$(".tsh").css({display:"block"});
                		$(".ms").text("购物车中的商品已发送变动，请重新提交！")
                		$(".cfm").click(function(){
                			window.history.go(-1)
                		})
                	}
                    if (_data[i]["isyucun"] == 1) {
                        _image += "<img class=" + "\"img2\" " + "src=" + "../../image/shop/yu.jpg" + " />"
                    }
                    if (_data[i]["itemquality"] != "" && _data[i]["itemquality"] != "1") {
                        _image += "<img class=" + "\"img2\" " + "src=" + "../../image/shop/temp.jpg" + " />"
                    }
                    if (_data[i]["specification"] == null && _data[i]["packagetypename"] == null) {
                        _intr = ""
                    } else if (_data[i]["specification"] == null && _data[i]["packagetypename"] != null) {
                        _intr = _data[i]["packagetypename"]
                    } else if (_data[i]["specification"] != null && _data[i]["packagetypename"] == null) {
                        _intr = _data[i]["specification"]
                    } else {
                        _intr = _data[i]["specification"] + " | " + _data[i]["packagetypename"]
                    }
                    if (_data[i]["itemslist"]) {
                        _name = _data[i]["itemslist"][_data[i]["selectedindex"]]["itemname"]
                    } else {
                        _name = _data[i]["itemname"]
                    }
                    if (_data[i]["itemslist"]) {
                        if ([_data[i]["selectedindex"]]["specification"] == null || _data[i]["itemslist"][_data[i]["selectedindex"]]["packagetypename"] == null) {
                            _ltr = ""
                        } else {
                            _ltr = _data[i]["itemslist"][_data[i]["selectedindex"]]["specification"] + " | " + _data[i]["itemslist"][_data[i]["selectedindex"]]["packagetypename"]
                        }
                    }
                    _remark = "";
                    if (_data[i]["remark"] != "") {
                        _remark = "<div class=" + "\"give\"" + "><div class=\"give-tit\">留言：</div><p class=" + "\"give-con\"" + ">" + _data[i]["remark"] + "</p></div>"
                    }
                    if (_data[i]["isyucun"] === 0) {
                        if (!_data[i]["itemslist"]) {
                            if (_data[i]["activityitem_id"] == "") {
                                _zz += Number(_data[i]["itemcount"])
                                _price += _data[i]["price"] * _data[i]["itemcount"];
                                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                                ">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + _data[i]["price"].toFixed(2) + "</div><div class=" + "\"number\"" +
                                "><div>" + _ltr + "</div><div>×" + _data[i]["itemcount"] + "</div></div></div></div>"+_remark+"</li>"
                            } else if (_data[i]["itemkind"] == "降价") {
                                _zz += Number(_data[i]["itemcount"])
                                _price += _data[i]["price"] * _data[i]["itemcount"];
                                _discount+=((_data[i]["originalprice"]-_data[i]["price"])*_data[i]["itemcount"]) || (_data[i]["price"]-_data[i]["price"]*_data[i]["discount"]*0.1)*_data[i]["itemcount"]
                                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                            ">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + _data[i]["price"].toFixed(2) + "</div><div class=" + "\"number\"" +
                            "><div>" + _intr + "</div><div>×" + _data[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">降价</div><span class=" + "\"discount-con\"" +
                            ">" + _data[i]["discount"] + " 折</span></div>" + _remark + "</li>"
                            } else if (_data[i]["itemkind"] == "买赠") {
                                _zz += Number(_data[i]["itemcount"])
                                _zengprice += (Number(_data[i]["unitprice"]) * (Math.floor(Number(_data[i]["itemcount"]) / Number(_data[i]["salecount"])) * Number(_data[i]["giftcount"])))
                                _price += _data[i]["price"] * _data[i]["itemcount"];
                                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                            ">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + _data[i]["price"].toFixed(2) + "</div><div class=" + "\"number\"" +
                            "><div>" + _intr + "</div><div>×" + _data[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">买赠</div><span class=" + "\"discount-con\"" +
                            ">买" + _data[i]["salecount"] + (_data[i]["packagetypename"] == null ? "" : _data[i]["packagetypename"]) + _data[i]["itemname"] + "赠" + _data[i]["giftcount"] + (_data[i]["giftitemobj"]["packagetypename"] == null ? "" : _data[i]["giftitemobj"]["packagetypename"]) + _data[i]["giftitemobj"]["itemname"] + "</span></div><div class=" + "\"give\"" + "><div class=" + "\"give-tit\"" + ">赠品：</div><div class=" + "\"give-con\"" + ">" + _data[i]["giftitemobj"]["itemname"] + Math.floor(Number(_data[i]["itemcount"]) / Number(_data[i]["salecount"])) * Number(_data[i]["giftcount"]) + (_data[i]["giftitemobj"]["packagetypename"] == null ? "" : _data[i]["giftitemobj"]["packagetypename"])+(_data[i]["itemquality"]==="0"?"(临期)":"") + "</div></div>" + _remark + "</li>"
                            } else if (_data[i]["itemkind"] == "有礼") {
                                _zz += Number(_data[i]["itemcount"])
                                _zengprice += (Number(_data[i]["giftprice"]) * (Math.floor(Number(_data[i]["itemcount"]) / Number(_data[i]["salecount"])) * Number(_data[i]["giftcount"])))
                                _price += _data[i]["price"] * _data[i]["itemcount"];
                                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
			       		">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + _data[i]["price"].toFixed(2) + "</div><div class=" + "\"number\"" +
			       		"><div>" + _intr + "</div><div>×" + _data[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">有礼</div><span class=" + "\"discount-con\"" +
			       		">购买" + _data[i]["salecount"] + (_data[i]["packagetypename"] == null ? "" : _data[i]["packagetypename"]) + _data[i]["itemname"] + "赠送" +
								_data[i]["giftcount"] + (_data[i]["giftitemobj"]["packagetypename"] == null ? "" : _data[i]["giftitemobj"]["packagetypename"]) + _data[i]["giftitemobj"]["itemname"] + "</span></div><div class=" + "\"give\"" + "><div class=" + "\"give-tit\"" + ">赠品：</div><div class=" + "\"give-con\"" + ">" + _data[i]["giftitemobj"]["itemname"] + Math.floor(Number(_data[i]["itemcount"]) / Number(_data[i]["salecount"])) * Number(_data[i]["giftcount"]) + (_data[i]["giftitemobj"]["packagetypename"] == null ? "" : _data[i]["giftitemobj"]["packagetypename"]) +(_data[i]["giftitemquality"]==="0"?"(临期)":"")+ "</div></div>" + _remark + "</li>"
                            } else if (_data[i]["itemkind"] == "折扣") {
                                _zz += Number(_data[i]["itemcount"])
                                _price += _data[i]["price"]*data[i]["discount"]*0.1 * _data[i]["itemcount"];
                                _discount+= (_data[i]["price"]-_data[i]["price"]*_data[i]["discount"]*0.1)*_data[i]["itemcount"]
                                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                            ">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + (data[i]["price"]*data[i]["discount"]*0.1).toFixed(2) + "</div><div class=" + "\"number\"" +
                            "><div>" + _intr + "</div><div>×" + _data[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">折扣</div><span class=" + "\"discount-con\"" +
                            ">" + _data[i]["discount"] + " 折</span></div>"+_remark+"</li>"
                            }
                        } else {
                            if (_data[i]["activityitem_id"] == "") {
                                _zz += Number(_data[i]["itemcount"])
                                _price += _data[i]["price"] * _data[i]["itemcount"];
                                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemslist"][_data[i]["selectedindex"]]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                                ">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + _data[i]["price"].toFixed(2) + "</div><div class=" + "\"number\"" +
                                "><div>" + _ltr + "</div><div>×" + _data[i]["itemcount"] + "</div></div><p>可提" + _data[i]["remaincount"] + _data[i]["packagetypename"] + "</p></div></div>"+_remark+"</li>"
                            } else if (_data[i]["itemkind"] == "降价") {
                                _zz += Number(_data[i]["itemcount"])
                                _price += _data[i]["price"] * _data[i]["itemcount"];
                                _discount+=((_data[i]["originalprice"]-_data[i]["price"])*_data[i]["itemcount"]) || (_data[i]["price"]-_data[i]["price"]*_data[i]["discount"]*0.1)*_data[i]["itemcount"]
                                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                            ">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + _data[i]["price"].toFixed(2) + "</div><div class=" + "\"number\"" +
                            "><div>" + _intr + "</div><div>×" + _data[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">降价</div><span class=" + "\"discount-con\"" +
                            ">" + _data[i]["discount"] + "</span></div>" + _remark + "</li>"
                            } else if (_data[i]["itemkind"] == "买赠") {
                                _zz += Number(_data[i]["itemcount"])
                                _zengprice += (Number(_data[i]["unitprice"]) * (Math.floor(Number(_data[i]["itemcount"]) / Number(_data[i]["salecount"])) * Number(_data[i]["giftcount"])))
                                _price += _data[i]["price"] * _data[i]["itemcount"];
                                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                            ">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + _data[i]["price"].toFixed(2) + "</div><div class=" + "\"number\"" +
                            "><div>" + _intr + "</div><div>×" + _data[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">买赠</div><span class=" + "\"discount-con\"" +
                            ">买" + _data[i]["salecount"] + _data[i]["giftitemobj"]["packagetypename"] + _data[i]["itemname"] + "赠" + _data[i]["giftcount"] + _data[i]["giftitemobj"]["packagetypename"] + _data[i]["giftitemobj"]["itemname"] + "</span></div><div class=" + "\"give\"" + "><div class=" + "\"give-tit\"" + ">赠品：</div><div class=" + "\"give-con\"" + ">" + _data[i]["giftitemobj"]["itemname"] + Math.floor(Number(_data[i]["itemcount"]) / Number(_data[i]["salecount"])) * Number(_data[i]["giftcount"]) + (_data[i]["giftitemobj"]["packagetypename"] == null ? "" : _data[i]["giftitemobj"]["packagetypename"])+(_data[i]["itemquality"]==="0"?"(临期)":"") + "</div></div>" + _remark + "</li>"
                            } else if (_data[i]["itemkind"] == "有礼") {
                                _zz += Number(_data[i]["itemcount"])
                                _zengprice += (Number(_data[i]["giftprice"]) * (Math.floor(Number(_data[i]["itemcount"]) / Number(_data[i]["salecount"])) * Number(_data[i]["giftcount"])))
                                _price += _data[i]["price"] * _data[i]["itemcount"];
                                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
			       		">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + _data[i]["price"].toFixed(2) + "</div><div class=" + "\"number\"" +
			       		"><div>" + _intr + "</div><div>×" + _data[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">有礼</div><span class=" + "\"discount-con\"" +
			       		">购买" + _data[i]["salecount"] + _data[i]["packagetypename"] + _data[i]["itemname"] + "赠送" +
								_data[i]["giftcount"] + _data[i]["giftitemobj"]["packagetypename"] + _data[i]["giftitemobj"]["itemname"] + "</span></div><div class=" + "\"give\"" + "><div class=" + "\"give-tit\"" + ">赠品：</div><div class=" + "\"give-con\"" + ">" + _data[i]["giftitemobj"]["itemname"] + Math.floor(Number(_data[i]["itemcount"]) / Number(_data[i]["salecount"])) * Number(_data[i]["giftcount"]) + (_data[i]["giftitemobj"]["packagetypename"] == null ? "" : _data[i]["giftitemobj"]["packagetypename"]) +(_data[i]["giftitemquality"]==="0"?"(临期)":"")+ "</div></div>" + _remark + "</li>"
                            } else if (_data[i]["itemkind"] == "折扣") {
                                _zz += Number(_data[i]["itemcount"])
                                _price += _data[i]["price"]*data[i]["discount"]*0.1 * _data[i]["itemcount"];
                                _discount += (_data[i]["price"]-_data[i]["price"]*_data[i]["discount"]*0.1)*_data[i]["itemcount"]
                                _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                            ">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + (data[i]["price"]*data[i]["discount"]*0.1).toFixed(2) + "</div><div class=" + "\"number\"" +
                            "><div>" + _intr + "</div><div>×" + _data[i]["itemcount"] + "</div></div></div></div><div class=" + "\"discount\"" + "><div class=" + "\"discount-tit\"" + ">折扣</div><span class=" + "\"discount-con\"" +
                            ">" + _data[i]["discount"] + " 折</span></div>" + _remark + "</li>"
                            }
                        }
                    } else {
                        if (_data[i]["activityitem_id"] == "") {
                            _zz += Number(_data[i]["itemcount"])
                            _price += _data[i]["itemunitcost"] * _data[i]["itemcount"];
                            _yucun+=_data[i]["itemunitcost"] * _data[i]["itemcount"]
                            _list += "<li><div class=" + "\"shop-con\"" + "><img src=" + _data[i]["itemimage"] + " /><div class=" + "\"shop-con-bd\"" + "><div class=" + "\"shop-tit\"" +
                            ">" + _name + _image + "</div><div class=" + "\"shop-body\"" + ">￥" + _data[i]["itemunitcost"].toFixed(2) + "</div><div class=" + "\"number\"" +
                            "><div>" + _intr + "</div><div>×" + _data[i]["itemcount"] + "</div></div><p>可提" + _data[i]["remaincount"] + _data[i]["packagetypename"] + "</p></div></div>"+_remark+"</li>"
                        }
                    }
                    _image = ""
                }
            }
            sdd()//计算分销商活动满足条件
            function sdd() {
                data = JSON.parse(localStorage.retalerdata).data;
                console.log(data)
                console.log(_Id)
                $("#distributorName>span").text(data[_indd]["distributorname"])
                $("#phoneto").attr("href", "tel:" + data[_indd]["mobilephone"])
                if (data[_indd]["activityitem_id"] != "") {

                    if (data[_indd]["promotionactivity"]) {
                        for (var t = 0; t < data[_indd]["promotionactivity"]["details"].length; t++) {
                            var curvalue = Number(data[_indd]["promotionactivity"]["details"][t]["moneysum"]);
                            if (_price >= curvalue) {
                                _mz = data[_indd]["promotionactivity"]["details"][t]["giftitems"]
                                _dx["activityitem_id"] = data[_indd]["activityitem_id"]
                            }
                        }
                    }
                    if (_mz != "") {
                        _dx["giftitems"] = _mz
                    }
                    if (JSON.stringify(_dx) == "{}") {
                        _dx = ""
                    }
                    console.log(_dx)
                    if (data[_indd]["specialprice"]) {
                        $("#vv").css({ display: "-webkit-box" })
                        $("#vv span").text(data[_indd]["specialprice"].toFixed(2))
                        if(_price-_yucun-data[_indd]["specialprice"]>0){
                				$(".amountBig span").text((_price - data[_indd]["specialprice"]-_yucun).toFixed(2))
                				$(".ab span").text((Number(_discount) + Number(data[_indd]["specialprice"])).toFixed(2))
               			}
                    } else {
                        $("#vv").css({ display: "none" })
                        if(_price-_yucun>0){
                        	$(".amountBig span").text((_price -_yucun).toFixed(2))
                        	$(".ab span").text(Number(_discount).toFixed(2))
                        }
                    }
                    var _yu = 0;
                    if (data[_indd]["promotionactivity"] && data[_indd]["promotionactivity"]["details"].length > 0) {
                        for (var p = 0; p < data[_indd]["promotionactivity"]["details"].length; p++) {
                            if (_price >= data[_indd]["promotionactivity"]["details"][p]["moneysum"]) {
                                _yu = p;

                            } 
                        }
                    }
                    console.log(_zengprice)
                    if (_mz != "") {
                        for (var c = 0; c < _mz.length; c++) {
                            _zengprice += (Number(_mz[c]["price"]) * Number(_mz[c]["count"]))

                            _distrgive += "<div style=" + "\"padding-left:11%\"" + ">" + _mz[c]["itemname"] + 
                            "<span style=" + "\"margin-left:15px\"" + "></span><span class=" + "\"gifty\"" + ">x" + _mz[c]["count"]+ _mz[c]["unit"] + "</span></div>"
							_mzg+=Number(_mz[c]["count"])
                        }
                    }
                    if (_distrgive != "") {
                        $(".giveto").css({ display: "block" })
                        $(".gt").html(_distrgive)
                    }
                }
                $("#ss div:nth-child(2)").text("￥" + _zengprice.toFixed(2))

                
                
            }

            console.log(_discount)
            $("#cc div:nth-child(2)").text("￥" + _discount.toFixed(2))
            $("#kk div:nth-child(2)").text("￥" + _price.toFixed(2))
			$("#ee div:nth-child(2) span").text( _yucun.toFixed(2))
			if(_yucun==0){
				$("#ee").hide()
			}
            if (JSON.parse(localStorage.retalerdata).data["itemkind"] == "满减") {
                if (_price >= 100 && _price < 500) {
                    $("#same-ss div:nth-child(3)").text("￥10.0")
                } else if (_price >= 500) {
                    $("#same-ss div:nth-child(3)").text("￥50.0")
                } else {
                    $("#same-ss div:nth-child(3)").text("￥0.0")
                    $("#same-ss").css({ display: "none" })
                }
                _discount += Number($("#same-ss div:nth-child(3)").text().replace("￥", ""))
            }




            
            $(".shoplist").html((localStorage.mz?localStorage.mz:"")+_list)
            if (_distrgive != "") {
                $("#sp3").text(_zz + _mzg)
            } else {
                $("#sp3").text(_zz)
            }
            $(".submit span").text("(" + data.length + ")")
            console.log($("section").height())
            if ((Number($("section").height()) + Number($("section").css("padding-bottom").replace("px", ""))) >= $("html").height()) {
                $(".loads2").height(Number($("section").height()) + Number($("section").css("padding-bottom").replace("px", "")))
                $(".tsh").height(Number($("section").height()) + Number($("section").css("padding-bottom").replace("px", "")))
            } else {
                $(".loads2").height($("html").height())
                $(".tsh").height($("html").height())
            }

        }//ajax的success方法结束

    });

    //ajax结束
    if (localStorage.Id != "") {//判断存储id是否存在
        $(".submit").click(function () {//提交订单函数触发
        	localStorage.removeItem("tx");
        	localStorage.removeItem("add");
            $("body").css({ overflow: "hidden" })
            console.log(_Id)
            console.log(localStorage.disId)
            localStorage.removeItem("Id");
            $(".submit").text("提交中...")
            $(".loads2").css({ display: "block" })
            var _rr={
                    distributor_id: localStorage.disId,
                    remark: $("#inp2").val(),
                    deliverdate: $("#beginTime").val(),
                    submitids: _Id,
                    manzeng:_dx == "" ? "" :_dx
               };
            $.ajax({
                url: "/webapi/distributor/" + getRetailerid() + "/orderform",
                type: "post",
                contentType:"application/json; charset=utf-8",
                data: JSON.stringify(_rr),
                error: function () {
                    	$(".ms").text("网络异常");
//                      $(".loads2 div").text(data.error + "...")
                        $(".loads2").css({ display: "none" })
                        $(".tsh").css({display:"block"})
                        $(".cfm").click(function(){
                            $(".tsh").css({display:"none"})
                            $(".submit").text("提交订单")
                            $("body").css({ overflow: "auto" })                        	
                        })                	
                },
                success: function (data) {
                    console.log(_Id)
                    console.log(data)
                    $(".loads2").css({ display: "none" }) 
                    if (data.result == true) {
                    	localStorage.removeItem("date")
                        $(".loads2 div").text("提交中...")
                        window.location = "myorder.html"
                    } else if(data.result == error){
                    	$(".ms").text(data.error);
//                      $(".loads2 div").text(data.error + "...")
                        $(".tsh").css({display:"block"})
                        $(".cfm").click(function(){
                            $(".tsh").css({display:"none"})
                            $(".submit").text("提交订单")
                            $("body").css({ overflow: "auto" })                        	
                        })
                    }else if(data.info && data.info=="shoppingcartchanged"){
                    	$(".tsh").css({display:"block"})
                    	$(".ms").text("购物车中的商品已发送变动，请重新提交！");
                    	$(".cfm").click(function(){
                    		window.history.go(-1)
                    	})
                    }
                }
            })
        })
    }


    $("#sp1").click(function () {//日历的显示和隐藏
        $(".canlendar").css({ display: "block" })
        $("html").css({ overflow: "hidden" })
    })

    $(function () {//日历方法的调用

        $('#beginTime').date();

        $('#endTime').date({ theme: "datetime" });

    });

}

$(document).ready(function () {

			
				
		
	


	


	oJz()


}); //document结束