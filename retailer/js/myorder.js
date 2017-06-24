var distributor_id = top.window.parent.distributor_id;

$(document).ready(function () {
    var _flag = 0;
    var _timer = "";
    var _price = 0;
    var _price2 = 0;
    var _hisprice = 0;
    var height = 0;
    var _add = 0;
    var _data2 = "";
    var _image = "";
    var _icn = "";
    var _fd = 1;
    var _heji = "";
    var _rt = 0;
    localStorage.list = 0;
    var _cc = 1;
    var pg=0;
    //  var _tuihuo=0;
    (function dd() {
        height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
        console.log(height)

        $("#select").css("height", height);
        $("#select>ul").css("height", height);
        $("#container").css("height", height)
    })()
    var _nameList = "";
    var _shopList = "";
    var _bookTm = "";
    var _historyList = "";
    var _d = new Date().getTime();
    var _data1 = "";
    if (localStorage.retalerdata && JSON.parse(localStorage.retalerdata).data.result != false) {
        data1 = JSON.parse(localStorage.retalerdata).data;
        _data1 = data1;
        console.log(_data1)
        for (var i = 0; i < _data1.length; i++) {
            _nameList += "<li id=" + i + "><p style=\"word-break:break-all;\">" + _data1[i]["distributorname"] + "</p></li>";
        }
        //_nameList="<li id=0><p style=\"word-break:break-all;\">asdsadsad456465465412</p></li><li id=0><p style=\"word-break:break-all;\">"+_data1[0]["distributorname"]+"</p></li><li id=0><p style=\"word-break:break-all;\">"+_data1[0]["distributorname"]+"</p></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li><li id=0><span>"+_data1[0]["distributorname"]+"</span></li>"
        $("#select ul").html(_nameList);

        $("#select li:first-child").addClass("selected")
        $("#select li").each(function () {
            console.log($(this).children().height())
            console.log($(this).height())
            if ($(this).children().height() * 2 < $(this).height()) {
                $(this).css({ "textAlign": "center", "lineHeight": "3.8rem" })
            } else {
                $(this).css({ "textAlign": "left", "lineHeight": "2.2rem" })
            }
        })


        $("#select>ul>li").click(function () {
            localStorage.list = $(this).attr("id")
            $("#select li").removeClass("selected")
            $(this).attr("class", "selected");
            that = $(this);
            var _timer = setTimeout(function () {

                if (_flag == 1) {
                    _flag = 0;
                    if (that.css("border-left")) {
                        $(".onload").css({ "display": "block" })
                        pg=that.attr("id")
                        shopList()

                    } else {
                        _flag = 1
                    }
                }

            }, 10)

        })
        //                          var width = (window.innerHeight > 0) ? window.innerHeight : screen.height;
        //alert(width)


        shopList()
    }
    function shopList() {
        //alert(pg)
        _cc = 1
        console.log(111)
        $.ajax({
            url: "/webapi/distributor/" + getRetailerid() + "/orderforms?distributor_id=" + _data1[pg]["distributor_id"] + "&paging=",
            async: true,
            cache: false,
            dataType: "json",
            type: "get",
            error: function () { _flag=1; $(".onload").css({ "display": "none" }) },
            success: function (data) {
                if (data) {
                    $(".onload").css({ "display": "none" })
                }
                var _imgs = "";
                if (data["error"] == "") {
                    curPageing = data["paging"];
                    localStorage.setItem("pg" + curPageing["pageindex"], JSON.stringify(data))
                    _ty = data["content"].length < 15 ? 0 : 1;
                    console.log(data)
                    for (var j = 0; j < data["content"].length; j++) {
                        _price = 0;
                        _tuihuo = 0;
                        _rt = "";
                        if (data["content"][j]["details"].length > 1) {
                            if (data["content"][j]["details"].length > 3) {
                                for (var w = 0; w < 3; w++) {
                                    _imgs += "<a><img src=" + data["content"][j]["details"][w]["itemobj"]["itemimage"] + "></a>";
                                }
                            } else {
                                for (var q = 0; q < data["content"][j]["details"].length; q++) {
                                    _imgs += "<a><img src=" + data["content"][j]["details"][q]["itemobj"]["itemimage"] + "></a>";
                                }
                            }

                            for (var z = 0; z < data["content"][j]["details"].length; z++) {
                                if (data["content"][j]["details"][z]["itemgifttype"] != 3 && data["content"][j]["details"][z]["billid_class"] === "tblbilldelivery") {
                                    _price += Number(data["content"][j]["details"][z]["itemunitcost"]) * Number(data["content"][j]["details"][z]["itemcount"])
                                }
                                if (data["content"][j]["details"][z]["billid_class"] == "tblbillreturncustomer") {
                                    _tuihuo += Number(data["content"][j]["details"][z]["itemunitcost"]) * Number(data["content"][j]["details"][z]["itemcount"])
                                }
                            }
                            console.log(_price)
                            console.log(_tuihuo)
                            var _ggf = 0;
                            for (var g = 0; g < data["content"][j]["details"].length; g++) {
                                _ggf += Number(data["content"][j]["details"][g]["itemcount"])
                            }
                            if (data["content"][j]["iswechatdiscount"] == true) {
                                if (data["content"][j]["openflag"] == 1) {
                                    if (_data1[pg]["specialprice"]) {
                                        _rt = _data1[pg]["specialprice"]
                                    }
                                } else {
                                    if (data["content"][j]["wechatdiscount"]) {
                                        _rt = data["content"][j]["wechatdiscount"]
                                    }
                                }
                            }
                            _price = _price.toFixed(2)
                            console.log(_rt)
                            if (data["content"][j]["openflag"] == "0") {
                                if (data["content"][j]["shishou"] && Number(data["content"][j]["shishou"]) > 0) {
                                    _heji = "实收:";
                                    _hisprice = Number(data["content"][j]["shishou"]).toFixed(2);
                                } else if (data["content"][j]["shifu"] && Number(data["content"][j]["shifu"]) > 0) {
                                    _heji = "实付:";
                                    _hisprice = Number(data["content"][j]["shifu"]).toFixed(2);
                                } else {
                                    _heji = "合计:";

                                    _hisprice = "0.00"
                                }
                                _historyList += "<dd style=" + "\"padding-top:10px;\"" + " idd=" + curPageing["pageindex"] + " index=" + j + "><div class=" + "\"image2box\"" + ">" + _imgs + "</div><i class=" + "\"ammount\"" + ">共" + _ggf + "件</i><div class=" + "\"descbox\"" + "><p>订单号：" + data["content"][j]["serialnumber"] + "</p><i class=" + "\"il\"" + ">送货时间：" + data["content"][j]["billexpecteddelivertime"].split(" ")[0].replace(/\-/g, "/") + "</i><i class=" + "\"ir\"" + ">" + _heji + "<span class=" + "\"pricstyle\"" + ">￥" + _hisprice + "</span></i></div></dd>";
                            } else {
                                var heji = _price - _tuihuo;
                                var wechat = Number(_rt);
                                if (heji < 0) {
                                    _heji = "应收：";
                                    _hisprice = Math.abs(heji).toFixed(2)
                                } else if (heji > 0) {
                                    _heji = "应付：";
                                    _hisprice = heji - wechat > 0 ? (heji - wechat).toFixed(2) : "0.00"
                                    console.log(_hisprice)
                                } else {
                                    _heji = "合计：";
                                    _hisprice = "0.00";
                                }
                                _shopList += "<dd style=" + "\"padding-top:10px;\"" + " idd=" + curPageing["pageindex"] + " index=" + j + "><div class=" + "\"image2box\"" + ">" + _imgs + "</div><i class=" + "\"ammount\"" + ">共" + _ggf + "件</i><div class=" + "\"descbox\"" + "><p>订单号：" + data["content"][j]["serialnumber"] + "</p><i class=" + "\"il\"" + ">送货时间：" + data["content"][j]["billexpecteddelivertime"].split(" ")[0].replace(/\-/g, "/") + "</i><i class=" + "\"ir\"" + ">" + _heji + "<span class=" + "\"pricstyle\"" + ">￥" + _hisprice + "</span></i></div></dd>";
                            }
                            _imgs = ""
                        } else if (data["content"][j]["details"].length > 0 && data["content"][j]["details"].length <= 1) {
                            if (data["content"][j]["details"][0]["itemkind"]) {
                                if (data["content"][j]["details"][0]["itemkind"] == "买赠") {
                                    _icn += "<span class=\"icn\">买赠</span>"
                                } else if (data["content"][j]["details"][0]["itemkind"] == "降价") {
                                    _icn += "<span class=\"icn\">降价</span>"
                                } else if (data["content"][j]["details"][0]["itemkind"] == "折扣") {
                                    _icn += "<span class=\"icn\">折扣</span>"
                                } else if (data["content"][j]["details"][0]["itemkind"] == "有礼") {
                                    _icn += "<span class=\"icn\">有礼</span>"
                                }
                            }
                            if (data["content"][j]["details"][0]["itemgifttype"]) {
                                if (data["content"][j]["details"][0]["itemgifttype"] == 3) {
                                    _icn += "<img src=" + "\"../../image/shop/yu.jpg\"" + ">"
                                }
                            }
                            if (data["content"][j]["details"][0]["itemquality"]) {
                                if (data["content"][j]["details"][0]["itemquality"] == 0) {
                                    _icn += "<img src=" + "\"../../image/shop/temp.jpg\"" + ">"
                                }
                            }
                            if (data["content"][j]["details"][0]["itemgifttype"] != 3 && data["content"][j]["details"][0]["billid_class"] == "tblbilldelivery") {
                                _price += Number(data["content"][j]["details"][0]["itemunitcost"]) * Number(data["content"][j]["details"][0]["itemcount"]);
                            }
                            if (data["content"][j]["details"][0]["billid_class"] == "tblbillreturncustomer") {
                                _tuihuo += Number(data["content"][j]["details"][0]["itemunitcost"]) * Number(data["content"][j]["details"][0]["itemcount"])
                            }
                            console.log(_price)
                            if (data["content"][j]["iswechatdiscount"] == true) {
                                if (data["content"][j]["openflag"] == 1) {
                                    if (_data1[pg]["specialprice"]) {
                                        _rt = _data1[pg]["specialprice"]
                                    }
                                } else {
                                    if (data["content"][j]["wechatdiscount"]) {
                                        _rt = data["content"][j]["wechatdiscount"]
                                    }
                                }
                            }
                            if (_price < 0) {
                                _price = 0;
                            }
                            _price = _price.toFixed(2)
                            var _ggf = 0;
                            for (var g = 0; g < data["content"][j]["details"].length; g++) {
                                _ggf += Number(data["content"][j]["details"][g]["itemcount"])
                            }
                            if (data["content"][j]["openflag"] == "0") {
                                if (data["content"][j]["shishou"] && Number(data["content"][j]["shishou"]) > 0) {
                                    _heji = "实收:";
                                    _hisprice = Number(data["content"][j]["shishou"]).toFixed(2);
                                } else if (data["content"][j]["shifu"] && Number(data["content"][j]["shifu"]) > 0) {
                                    _heji = "实付:";
                                    _hisprice = Number(data["content"][j]["shifu"]).toFixed(2);
                                } else {
                                    _heji = "合计:";
                                    _hisprice = "0.00"
                                }
                                _historyList += "<dd style=" + "\"padding-top:10px;\"" + " idd=" + curPageing["pageindex"] + " index=" + j + "><div style=\"display:flex;display:-webkit-box;width:100%\"><div class=" + "\"imagebox\"" + "><a href=" + "\"#\"" + "><img src=" + data["content"][j]["details"][0]["itemobj"]["itemimage"] + " ></a></div><div class=" + "\"dectitlebox\""
                        + " style=\"position:relative\"><div class=" + "\"iconbox\"" + ">" + _icn + "</div><a style=" + "\"float:left;\"" + " href=" + "\"#\"" + ">" + data["content"][j]["details"][0]["itemobj"]["itemname"] + "</a><i style=\"position:absolute;bottom:0;right:0\">共" + _ggf + "件</i></div></div><div class=" + "\"descbox\"" + "><p>订单号：" + data["content"][j]["serialnumber"] + "</p><i class=" + "\"il\"" + ">送货时间：" + data["content"][j]["billexpecteddelivertime"].split(" ")[0].replace(/\-/g, "/") + "</i><i class=" + "\"ir\"" + ">" + _heji + "<span class=" + "\"pricstyle\"" + ">￥" + _hisprice + "</span></i></div></dd>"
                            } else {
                                var heji = _price - _tuihuo;
                                console.log(heji)
                                var wechat = Number(_rt);
                                if (heji < 0) {
                                    _heji = "应收：";
                                    _hisprice = Math.abs(heji)
                                } else if (heji > 0) {
                                    _heji = "应付：";
                                    _hisprice = heji - wechat > 0 ? (heji - wechat).toFixed(2) : "0.00"
                                } else {
                                    _heji = "合计：";
                                    _hisprice = "0.00";
                                }
                                _shopList += "<dd style=" + "\"padding-top:10px;\"" + " idd=" + curPageing["pageindex"] + " index=" + j + "><div style=\"display:flex;display:-webkit-box;width:100%\"><div class=" + "\"imagebox\"" + "><a href=" + "\"#\"" + "><img src=" + data["content"][j]["details"][0]["itemobj"]["itemimage"] + " ></a></div><div class=" + "\"dectitlebox\""
                        + " style=\"position:relative\"><div class=" + "\"iconbox\"" + ">" + _icn + "</div><a style=" + "\"float:left;\"" + " href=" + "\"#\"" + ">" + data["content"][j]["details"][0]["itemobj"]["itemname"] + "</a><i style=\"position:absolute;bottom:0;right:0\">共" + _ggf + "件</i></div></div><div class=" + "\"descbox\"" + "><p>订单号：" + data["content"][j]["serialnumber"] + "</p><i class=" + "\"il\"" + ">送货时间：" + data["content"][j]["billexpecteddelivertime"].split(" ")[0].replace(/\-/g, "/") + "</i><i class=" + "\"ir\"" + ">" + _heji + "<span class=" + "\"pricstyle\"" + ">￥" + _hisprice + "</span></i></div></dd>"
                            }
                            _icn = "";
                        }

                    }
                    if (_historyList != "") {
                        _historyList = "<dt>历史订单</dt>" + _historyList;
                    }

                    _shopList = "<dt>进行中的</dt>" + _shopList;
                    $("#dl2").html(_historyList)
                    $("#dl1").html(_shopList);
                    if (_fd == 1) {
                        $(".orderlistbox").html($(".orderlistbox").html() + "<div class=" + "\"loadings\"" + "style=" + "\"display:none;width:100%;height:50px;background:url(../../image/shop/loading.gif) no-repeat 50% 50%;background-size:3rem 3rem\"" + "></div>")
                        _fd = 0
                    }
                    _historyList = "";
                    _shopList = "";
                    _flag = 1;
                    $("#container").scrollTop("0")
                    toShop(data)
                    onScroll(data)
                }
            }//ajax的success方法结束
        });
    }
    //ajax结束

    function toShop(data) {
        $(".orderlistbox dd").click(function () {
            location.href = "details.html?pg=" + $(this).attr("idd") + "&index=" + $(this).attr("index");
        })
    }
    var curPageing = {};
    var hander=false;
        var _ty = 1;
    function onScroll(data) {
        console.log($(".orderlistbox").css("height"))
        $("#container").scrollTop()
    
        $("#container").scroll(function () {
           
                if ($("#container").scrollTop() >= ($(".orderlistbox").css("height").replace("px", "") - height) && _ty == 1) {
                        _ty = 0
                        curPageing["pageindex"] = curPageing["pageindex"] + 1;
                        console.log("request:"+ JSON.stringify(curPageing));
                        //$("#container").css({overflow:"hidden"})
                        $(".loadings").css({ display: "block" })
                       if(!hander) 
                       		hander=GetPageing(data, pg);
                }

        })

    }
    
    function GetPageing(data){
    	  $.ajax({
                            url: "/webapi/distributor/" + getRetailerid() + "/orderforms?distributor_id=" + _data1[pg]["distributor_id"] + "&paging=" + JSON.stringify(curPageing),
                            async: true,
                            cache: false,
                            type: "get",
                            error: function () { hander=false;$(".loadings").css({ display: "none" }) },
                            success: function (data2) {
                            	hander=false;
                                var _img = "";
                                _data2 = data2
                                console.log(data2);
                                curPageing = data2["paging"];
                                $(".loadings").css({ display: "none" })
                                if (data2["error"] == "") {
                                    localStorage.setItem("pg" + curPageing["pageindex"], JSON.stringify(data2))
                                    for (var r = 0; r < data2["content"].length; r++) {
                                        _icn = ""
                                        _price2 = 0;
                                        _tuihuo = 0;
                                        _rt = "";
                                        if (data2["content"][r]["details"].length > 1) {

                                            for (var t = 0; t < data2["content"][r]["details"].length; t++) {

                                                if (data2["content"][r]["details"][t]["itemgifttype"] != 3 && data2["content"][r]["details"][t]["billid_class"] === "tblbilldelivery") {
                                                    _price2 += Number(data2["content"][r]["details"][t]["itemunitcost"]) * Number(data2["content"][r]["details"][t]["itemcount"])
                                                }
                                                if (data2["content"][r]["details"][t]["itemgifttype"] != 3 && data2["content"][r]["details"][t]["billid_class"] == "tblbillreturncustomer") {
                                                    _tuihuo += Number(data2["content"][r]["details"][0]["itemunitcost"]) * Number(data2["content"][r]["details"][0]["itemcount"])
                                                }
                                            }
                                            console.log(_price2)
                                            if (data2["content"][r]["details"].length > 3) {
                                                for (var d = 0; d < 3; d++) {
                                                    _img += "<a><img src=" + data2["content"][r]["details"][d]["itemobj"]["itemimage"] + "></a>";
                                                }
                                            } else {
                                                for (var y = 0; y < data2["content"][r]["details"].length; y++) {
                                                    _img += "<a><img src=" + data2["content"][r]["details"][y]["itemobj"]["itemimage"] + "></a>";
                                                }
                                            }
                                            console.log(_img)
                                            if (data2["content"][r]["iswechatdiscount"] == true) {
                                                if (data2["content"][r]["openflag"] == 1) {
                                                    if (_data1[pg]["specialprice"]) {
                                                        _rt = _data1[pg]["specialprice"]
                                                    }
                                                } else {
                                                    if (data2["content"][r]["wechatdiscount"]) {
                                                        _rt = data2["content"][r]["wechatdiscount"]
                                                    }
                                                }
                                            }
                                            if (_price2 < 0) {
                                                _price2 = 0;
                                            }
                                            _price2 = _price2.toFixed(2)
                                            var _gff = 0;
                                            for (var ee = 0; ee < data2["content"][r]["details"].length; ee++) {
                                                _gff += Number(data2["content"][r]["details"][ee]["itemcount"])
                                            }
                                            if (data2["content"][r]["iswechatdiscount"] == true) {
                                                if (data2["content"][r]["openflag"] == 1) {
                                                    if (_data1[pg]["specialprice"]) {
                                                        _rt = _data1[pg]["specialprice"]
                                                    }
                                                } else {
                                                    if (data2["content"][r]["wechatdiscount"]) {
                                                        _rt = data2["content"][r]["wechatdiscount"]
                                                    }
                                                }
                                            }
                                            if (data2["content"][r]["openflag"] == "0") {
                                                if (data2["content"][r]["shishou"] && Number(data2["content"][r]["shishou"]) > 0) {
                                                    _heji = "实收:";
                                                    _hisprice = Number(data2["content"][r]["shishou"]).toFixed(2);
                                                } else if (data2["content"][r]["shifu"] && Number(data2["content"][r]["shifu"]) > 0) {
                                                    _heji = "实付:";
                                                    _hisprice = Number(data2["content"][r]["shifu"]).toFixed(2);
                                                } else {
                                                    _heji = "合计:";
                                                    _hisprice = "0.00"
                                                }
                                                _historyList += "<dd style=" + "\"padding-top:20px;\"" + " idd=" + curPageing["pageindex"] + " index=" + r + "><div class=" + "\"image2box\"" + ">" + _img + "</div><i class=" + "\"ammount\"" + ">共" + _gff + "件</i><div class=" + "\"descbox\"" + "><p>订单号：" + data2["content"][r]["serialnumber"] + "</p><i class=" + "\"il\"" + ">送货时间：" + data2["content"][r]["billexpecteddelivertime"].split(" ")[0] + "</i><i class=" + "\"ir\"" + ">" + _heji + "<span class=" + "\"pricstyle\"" + ">￥" + _hisprice + "</span></i></div></dd>";
                                            } else {
                                                var heji = _price2 - _tuihuo;
                                                var wechat = Number(_rt);
                                                if (heji < 0) {
                                                    _heji = "应收：";
                                                    _hisprice = Math.abs(heji);
                                                } else if (heji > 0) {
                                                    _heji = "应付：";
                                                    _hisprice = heji - wechat > 0 ? (heji - wechat).toFixed(2) : "0.00"
                                                } else {
                                                    _heji = "合计：";
                                                    _hisprice = "0.00";
                                                }
                                                _shopList += "<dd style=" + "\"padding-top:20px;\"" + " idd=" + curPageing["pageindex"] + " index=" + r + "><div class=" + "\"image2box\"" + ">" + _img + "</div><i class=" + "\"ammount\"" + ">共" + _gff + "件</i><div class=" + "\"descbox\"" + "><p>订单号：" + data2["content"][r]["serialnumber"] + "</p><i class=" + "\"il\"" + ">送货时间：" + data2["content"][r]["billexpecteddelivertime"].split(" ")[0] + "</i><i class=" + "\"ir\"" + ">合计：<span class=" + "\"pricstyle\"" + ">￥" + _hisprice + "</span></i></div></dd>";
                                            }
                                            _img = "";
                                        } else if (data2["content"][r]["details"].length > 0 && data2["content"][r]["details"].length <= 1) {
                                            if (data2["content"][r]["details"][0]["itemkind"]) {
                                                if (data2["content"][r]["details"][0]["itemkind"] == "买赠") {
                                                    _icn += "<span class=\"icn\">买赠</span>"
                                                } else if (data2["content"][r]["details"][0]["itemkind"] == "降价") {
                                                    _icn += "<span class=\"icn\">降价</span>"
                                                } else if (data2["content"][r]["details"][0]["itemkind"] == "折扣") {
                                                    _icn += "<span class=\"icn\">折扣</span>"
                                                } else if (data2["content"][r]["details"][0]["itemkind"] == "有礼") {
                                                    _icn += "<span class=\"icn\">有礼</span>"
                                                }
                                            }
                                            if (data2["content"][r]["details"][0]["itemgifttype"]) {
                                                if (data2["content"][r]["details"][0]["itemgifttype"] == 3) {
                                                    _icn += "<img src=" + "\"../../image/shop/yu.jpg\"" + ">"
                                                }
                                            }
                                            if (data2["content"][r]["details"][0]["itemquality"]) {
                                                if (data2["content"][r]["details"][0]["itemquality"] == 0) {
                                                    _icn += "<img src=" + "\"../../image/shop/temp.jpg\"" + ">"
                                                }
                                            }
                                            if (data2["content"][r]["details"][0]["itemgifttype"] != 3 && data2["content"][r]["details"][0]["billid_class"] === "tblbilldelivery") {
                                                _price2 += Number(data2["content"][r]["details"][0]["itemunitcost"]) * Number(data2["content"][r]["details"][0]["itemcount"])
                                            }
                                            if (data2["content"][r]["details"][0]["itemgifttype"] != 3 && data2["content"][r]["details"][0]["billid_class"] == "tblbillreturncustomer") {
                                                _tuihuo += Number(data2["content"][r]["details"][0]["itemunitcost"]) * Number(data2["content"][r]["details"][0]["itemcount"])
                                            }
                                            if (data2["content"][r]["iswechatdiscount"] == true) {
                                                if (data2["content"][r]["openflag"] == 1) {
                                                    if (_data1[pg]["specialprice"]) {
                                                        _rt = _data1[pg]["specialprice"]
                                                    }
                                                } else {
                                                    if (data2["content"][r]["wechatdiscount"]) {
                                                        _rt = data2["content"][r]["wechatdiscount"]
                                                    }
                                                }
                                            }
                                            if (_price2 < 0) {
                                                _price2 = 0;
                                            }
                                            _price2 = _price2.toFixed(2)
                                            var _fgg = 0;
                                            for (var qq = 0; qq < data2["content"][r]["details"].length; qq++) {
                                                _fgg += Number(data2["content"][r]["details"][qq]["itemcount"])
                                            }
                                            if (data2["content"][r]["openflag"] == "0") {
                                                if (data2["content"][r]["shishou"] && Number(data2["content"][r]["shishou"]) > 0) {
                                                    _heji = "实收:";
                                                    _hisprice = Number(data2["content"][r]["shishou"]).toFixed(2);
                                                } else if (data2["content"][r]["shifu"] && Number(data2["content"][r]["shifu"]) > 0) {
                                                    _heji = "实付:";
                                                    _hisprice = Number(data2["content"][r]["shifu"]).toFixed(2);
                                                } else {
                                                    _heji = "合计:";
                                                    _hisprice = "0.00"
                                                }
                                                _historyList += "<dd style=" + "\"padding-top:20px;\"" + " idd=" + curPageing["pageindex"] + " index=" + r + "><div style=\"display:flex;display:-webkit-box;width:100%\"><div class=" + "\"imagebox\"" + "><a href=" + "\"#\"" + "><img src=" + data2["content"][r]["details"][0]["itemobj"]["itemimage"] + " ></a></div><div class=" + "\"dectitlebox\""
                                        + "><div class=" + "\"iconbox\"" + ">" + _icn + "</div><a style=" + "\"float:left;\"" + " href=" + "\"#\"" + ">" + data2["content"][r]["details"][0]["itemobj"]["itemname"] + "</a><i>共" + _fgg + "件</i></div></div><div class=" + "\"descbox\"" + "><p>订单号：" + data2["content"][r]["serialnumber"] + "</p><i class=" + "\"il\"" + ">送货时间：" + data2["content"][r]["billexpecteddelivertime"].split(" ")[0] + "</i><i class=" + "\"ir\"" + ">" + _heji + "<span class=" + "\"pricstyle\"" + ">￥" + _hisprice + "</span></i></div></dd>"
                                            } else {
                                                var heji = _price2 - _tuihuo;
                                                var wechat = Number(_data1[pg]["specialprice"]);
                                                if (heji < 0) {
                                                    _heji = "应收：";
                                                    _hisprice = Math.abs(heji);
                                                } else if (heji > 0) {
                                                    _heji = "应付：";
                                                    _hisprice = heji - wechat > 0 ? (heji - wechat).toFixed(2) : "0.00"
                                                } else {
                                                    _heji = "合计：";
                                                    _hisprice = "0.00";
                                                }
                                                _shopList += "<dd style=" + "\"padding-top:20px;\"" + " idd=" + curPageing["pageindex"] + " index=" + r + "><div style=\"display:flex;display:-webkit-box;width:100%\"><div class=" + "\"imagebox\"" + "><a href=" + "\"#\"" + "><img src=" + data2["content"][r]["details"][0]["itemobj"]["itemimage"] + " ></a></div><div class=" + "\"dectitlebox\""
                                        + "><div class=" + "\"iconbox\"" + ">" + _icn + "</div><a style=" + "\"float:left;\"" + " href=" + "\"#\"" + ">" + data2["content"][r]["details"][0]["itemobj"]["itemname"] + "</a><i>共" + _fgg + "件</i></div></div><div class=" + "\"descbox\"" + "><p>订单号：" + data2["content"][r]["serialnumber"] + "</p><i class=" + "\"il\"" + ">送货时间：" + data2["content"][r]["billexpecteddelivertime"].split(" ")[0] + "</i><i class=" + "\"ir\"" + ">合计：<span class=" + "\"pricstyle\"" + ">￥" + _hisprice + "</span></i></div></dd>"
                                            }

                                        }

                                    }
                                    //                      if(_fg==1){
                                    //                          _historyList+="<div class="+"\"loadings\""+"style="+"\"display:none;width:100%;height:50px;background:url(../../image/shop/loading.gif) no-repeat 50% 50%;background-size:3rem 3rem\""+"></div>"
                                    //                          _fg=0
                                    //                      }
                                    if (_historyList != "" && _cc == 1) {
                                        $("#dl2").html("<dt>历史订单</dt>")
                                        _cc = 0
                                    }
                                    $("#dl2").html($("#dl2").html() + _historyList)
                                    $("#dl1").html($("#dl1").html() + _shopList);
                                    _historyList = "";
                                    _shopList = "";
                                    toShop(data, pg)
                                    
                                    _ty = data2["content"].length < 15 ? 0 : 1;
                                }



                            }

                        });
         return true;            
    }
}); //document结束