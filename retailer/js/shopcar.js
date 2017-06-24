	$(document).ready(function(){
			$("body>div:nth-of-type(2)").remove()
			$(".addr").css({marginTop:$(".shop-title").height()})
			asd()
	})
	function asd(){//购物车页起始调用函数
		var _list="";
		var _give="";
		var _color="";
		var _distrgive="";
		var _id="";
		var _count=0;
		var _save=0;
		var _arr=[];
		var _price=0;
		var _discount=0;
		var _Id=[];
		var _tt="";
		var _active="";
		var _dll=0;
		var _disId="";
		var _sv=[];
		var _dis=0
		var _pp=0;
		var _ct=0;
		var _qu=0;
		var _ges=0;
		var _cun=0;
		var _indd=localStorage.index
		_disId=location.search.replace("distributor_id=","").replace("?","");
		localStorage.disId=_disId
		console.log(_disId)
			_tt=JSON.parse(localStorage.retalerdata).data;
			console.log(_tt)
			
			$.ajax({//获取购物车业的数据
				url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart/"+_disId+"?isvalid=0",
				async:true,
		    	cache:false,
		        dataType:"json",
		        type:"get",
		        error:function(){},
		        success:function(data1){
		        	console.log(data1)
		        	if(data1){
		        		$(".loads").css({display:"none"})
		        	}
		        	if(data1.length>0){
		        		$("#kong").hide()
		        	}else{
		        		$("#kong").show()
		        	}
		        	show(data1)
		        }
			})
		function aa(){//提交订单文字变化
			$(".commit").css({background:"#009f96",width:"24%"})
			$(".commit").html("去提交"+"<span>("+_ges+")</span>")
			console.log(_Id)
			_qu=0
			
				$(".commit").click(function(){
					if($(".intr").css("display")!="none"){
						localStorage.mz=$(".intr").prop("outerHTML")
					}else if(localStorage.mz){
						localStorage.removeItem("mz")
					}
					if(_qu==0){
						for(var tc=0;tc<_Id.length;tc++){
							if(_Id[tc]=="a"){
								_Id.splice(tc,1)
							}
						}
						localStorage.Id=_Id.join(",").replace(/\,+$/g,"").replace(/^\,+/,"")
						location.href="commit.html"
					}
				})	
			
		
		}
					function zz(){//起送价显示
						if(_price<_tt[_indd]["cutgift"]){
							_qu=1;
							$(".commit").css({background:"#54504f",width:"auto",padding:"0 3px"})
							$(".commit").text("还差 "+(_tt[_indd]["cutgift"]-_price).toFixed(2)+" 元起送")
						}else{
							aa()
						}						
					}
		function show(data1){//页面渲染
			

			console.log(_tt[_indd]["distributorname"])
			$(".addr").text(_tt[_indd]["distributorname"])
			var _name="";
			var _index=0;
			var _tell="";
			var _remark="";
			var _intr="";
			var _dd=""
			var _image=""
			for(var i=0;i<data1.length;i++){
						if(data1[i]["guid"]){
							_dd=data1[i]["guid"]
						}else{
							_dd=data1[i]["itemguid"]
						}
				if(data1[i]["itemcount"]<=data1[i]["salecount"] || data1[i]["itemcount"]<=1){
					_color="#dbdfe4"
				}else{
					_color="#009f96"
				}
				if(data1[i]["isyucun"]==1){
					console.log(11)
					_image+="<img class="+"\"img2\" "+"src="+"../../image/shop/yu.jpg"+" />"
				}
				if(data1[i]["itemquality"]!=="" && data1[i]["itemquality"]!=="1"){
					_image+="<img class="+"\"img2\" "+"src="+"../../image/shop/temp.jpg"+" />"
				}
				console.log(_image)
				var _wt=$("body").width()*0.72;
				var _line=1;
				var _gf=0;
				console.log(data1[i]["remark"].length)
					for(var jk=0;jk<data1[i]["remark"].length;jk++){
						if(data1[i]["remark"].charAt(jk).match(/[a-zA-Z0-9]*/g)!=","){
							_gf+=7;
						}else{
							_gf+=14;
						}
					}
					console.log(_gf)
					if(_gf/_wt>0){
						_line=Math.ceil(_gf/_wt)
					}
					console.log(_line)
					_remark="<div class="+"\"disc2\" style="+(data1[i]["remark"]==""?"display:none":"")+"><div style=\"position:relative\"><span style=\"position:absolute;\">留言：</span><textarea readonly=\"true\" style=\"margin-left:4rem;overflow-y:hidden;resize:none;outline:none;width:80%;font-size:14px;height:"
					+(_line*2)+"rem;line-height:1.6rem\">"+(data1[i]["remark"]==""?"":data1[i]["remark"])+"</textarea></div></div>"
				_intr="";
				if(data1[i]["salestop"]==0){
					if(!data1[i]["itemslist"]){
						if(data1[i]["specification"]==null && data1[i]["packagetypename"]!==null){
							_intr=data1[i]["packagetypename"]
						}else if(data1[i]["packagetypename"]==null && data1[i]["specification"]!==null){
							_intr=data1[i]["specification"]
						}else if(data1[i]["specification"]!==null && data1[i]["packagetypename"]!==null){
							_intr=data1[i]["specification"]+" | "+data1[i]["packagetypename"]
						}else{
							_intr=""
						}					
					}else{
						if(data1[i]["itemslist"][data1[i]["selectedindex"]]["specification"]==null && data1[i]["itemslist"][data1[i]["selectedindex"]]["packagetypename"]!==null){
							_intr=data1[i]["itemslist"][data1[i]["selectedindex"]]["packagetypename"]
						}else if(data1[i]["itemslist"][data1[i]["selectedindex"]]["packagetypename"]==null && data1[i]["itemslist"][data1[i]["selectedindex"]]["specification"]!==null){
							_intr=data1[i]["itemslist"][data1[i]["selectedindex"]]["specification"]
						}else if(data1[i]["itemslist"][data1[i]["selectedindex"]]["specification"]!==null && data1[i]["itemslist"][data1[i]["selectedindex"]]["packagetypename"]!==null){
							_intr=data1[i]["itemslist"][data1[i]["selectedindex"]]["specification"]+" | "+data1[i]["itemslist"][data1[i]["selectedindex"]]["packagetypename"]
						}else{
							_intr=""
						}					
					}
				}

				_name=data1[i]["itemslist"]?data1[i]["itemslist"][data1[i]["selectedindex"]]["itemname"]:data1[i]["itemname"]
				if(!data1[i]["itemslist"]){
					if(data1[i]["activityitem_id"]=="" && data1[i]["salestop"]==0 && data1[i]["isyucun"]==0){
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><label class=\"labs\"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i></label><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+Number(data1[i]["price"]).toFixed(2)+"</p></p></div></div></div>"+_remark+"<div class="+
						"\"set\""+"style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"
					}else if(data1[i]["itemkind"]=="降价" && data1[i]["salestop"]==0){
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_discount+=((data1[i]["originalprice"]-data1[i]["price"])*data1[i]["itemcount"]) || (data1[i]["price"]-data1[i]["price"]*data1[i]["discount"]*0.1)*data1[i]["itemcount"]
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><label class=\"labs\"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i></label><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+Number(data1[i]["discountprice"]).toFixed(2)+"</p><p class="+"\"intail\""+"><span>￥"+Number(data1[i]["originalprice"]).toFixed(2)+"</span></p></p></div></div></div><div class="+"\"disc\""+
						"><span>降价</span><span> "+data1[i]["discount"]+" 折</span></div>"+_remark+"<div class="+
						"\"set\""+"style="+
						"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"
					}else if(data1[i]["itemkind"]=="折扣" && data1[i]["salestop"]==0){
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]*data1[i]["discount"]*0.1);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_discount+=((data1[i]["originalprice"]-data1[i]["price"])*data1[i]["itemcount"]) || (data1[i]["price"]-data1[i]["price"]*data1[i]["discount"]*0.1)*data1[i]["itemcount"]
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><label class=\"labs\"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i></label><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+Number(data1[i]["price"]*data1[i]["discount"]*0.1).toFixed(2)+"</p><p class="+"\"intail\""+"><span>￥"+Number(data1[i]["price"]).toFixed(2)+"</span></p></p></div></div></div><div class="+"\"disc\""+" id="+"\"disc\""+
						"><span>折扣</span><span>"+data1[i]["discount"]+" 折</span></div>"+_remark+"<div class="+
						"\"set\""+"style="+
						"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"
					}else if(data1[i]["itemkind"]=="有礼" && data1[i]["salestop"]==0){
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><label class=\"labs\"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i></label><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+Number(data1[i]["price"]).toFixed(2)+"</p></p></div></div></div><div class="+"\"disc\""+
						"><span>有礼</span><span> 购买"+data1[i]["salecount"]+(data1[i]["packagetypename"]==null?"":data1[i]["packagetypename"])+data1[i]["itemname"]+"赠送"+
							data1[i]["giftcount"]+(data1[i]["giftitemobj"]["packagetypename"]==null?"":data1[i]["giftitemobj"]["packagetypename"])+data1[i]["giftitemobj"]["itemname"]+"</span></div>"+_remark+"<div class="+"\"giveTo\""+"><b style="+"\"margin-right:5px\""+">赠品</b><div><span>"+data1[i]["giftitemobj"]["itemname"]+"</span><span class=\"yuj\">"+Math.floor((data1[i]["itemcount"])/Number(data1[i]["salecount"]))*Number(data1[i]["giftcount"])+"</span>"+(data1[i]["giftitemobj"]["packagetypename"]==null?"":data1[i]["giftitemobj"]["packagetypename"])+(data1[i]["giftitemquality"]==="0"?"(临期)":"")+"</div></div><div class="+
						"\"set\""+"style="+
						"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"					
					}else if(data1[i]["itemkind"]=="买赠" && data1[i]["salestop"]==0){
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_price+=Number(data1[i]["price"])*Number(data1[i]["itemcount"]);
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><label class=\"labs\"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i></label><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+Number(data1[i]["price"]).toFixed(2)+"</p></p></div></div></div><div class="+"\"disc\""+
						"><span>买赠</span><span> 买"+data1[i]["salecount"]+(data1[i]["packagetypename"]==null?"":data1[i]["packagetypename"])+data1[i]["itemname"]+"赠"+data1[i]["giftcount"]+(data1[i]["giftitemobj"]["packagetypename"]==null?"":data1[i]["giftitemobj"]["packagetypename"])+data1[i]["giftitemobj"]["itemname"]+"</span></div>"+_remark+"<div class="+"\"giveTo\""+"><b style="+"\"margin-right:5px\""+">赠品</b><div><span>"+data1[i]["giftitemobj"]["itemname"]+"</span><span class=\"yuj\">"+Math.floor((data1[i]["itemcount"])/Number(data1[i]["salecount"]))*Number(data1[i]["giftcount"])+"</span>"+(data1[i]["giftitemobj"]["packagetypename"]==null?"":data1[i]["giftitemobj"]["packagetypename"])+(data1[i]["itemquality"]==="0"?"(临期)":"")+"</div></div><div class="+
						"\"set\""+"style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"						
					}else if(data1[i]["isyucun"]==1 && data1[i]["salestop"]==0){
						console.log(1)
						_price+=Number(data1[i]["itemunitcost"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><label class=\"labs\"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i></label><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+Number(data1[i]["itemunitcost"]).toFixed(2)+"</p><p class=\"hp\">可提<span>"+data1[i]["remaincount"]+"</span>"+data1[i]["packagetypename"]+"</p></p></div></div></div>"+_remark+"<div class="+
						"\"set\""+"style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"
					}else if(data1[i]["salestop"]==1){
						_list+="<li id=\""+i+"\" style="+"\"position:relative;z-index:10\""+"><div class="+"\"list\""+"><b class="+"\"gouxuan2\""+"></b><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+data1[i]["itemname"]+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+Number(data1[i]["price"]).toFixed(2)+"</p></p></div></div></div><div class="+
						"\"set\""+"style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div><div style="+
						"\"position:absolute;left:0;top:0;width:100%;height:95px;background:#ddd;opacity:0.5\""+"></div><img src="+"\"../../image/shop/shopcart_down.png\""+" style="+"\"position:absolute;width:4rem;right:0;top:0\""+"></li>"
					}					
				}else{
					_index=data1[i]["selectedindex"];
					if(data1[i]["activityitem_id"]=="" && data1[i]["salestop"]==0){
						_price+=Number(data1[i]["itemslist"][_index]["price"])*Number(data1[i]["itemcount"]);
						_count++;
						_ges+=Number(data1[i]["itemcount"])
						_arr.push(i)
						_Id.push(data1[i]["guid"])
						_list+="<li id=\""+i+"\""+" ip="+(_arr.length-1)+" guid="+_dd+"><div class="+"\"list\""+"><label class=\"labs\"><i class="+"\"gouxuan\" flag="+"\"1\""+"></i></label><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemslist"][_index]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+_name+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+Number(data1[i]["itemslist"][_index]["price"]).toFixed(2)+"</p></p></div></div></div>"+_remark+"<div class="+
						"\"set\""+"style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div></li>"
					}else if(data1[i]["salestop"]==1){
						_list+="<li id=\""+i+"\" style="+"\"position:relative;z-index:10\""+"><div class="+"\"list\""+"><b class="+"\"gouxuan2\""+"></b><div class="+"\"conh\""+"><div class="+"\"yuu\""+"><img class="+"\"img1\" "+"src="+data1[i]["itemimage"]+" /><div class="+"\"yoo\""+">"+_image+data1[i]["itemslist"][_index]["itemname"]+"</div><p class="+"\"pl\""+">"+_intr+"</p><div class="+"\"change\""+"><span class="+"\"increase\""+">+</span><span class="+"\"amount\""+">"+data1[i]["itemcount"]+"</span><span class="+"\"reduce\" style="+"\"color:"+_color+"\""+">-</span></div><p class="+"\"pp1\""+">￥"+Number(data1[i]["price"]).toFixed(2)+"</p></p></div></div></div><div class="+
						"\"set\""+" style="+"\"width:100%;height:4rem;border-top:1px solid #ededed\""+"><span class=\"ly\">留言</span><span class="+"\"delete\""+">删除</span></div><div style="+
						"\"position:absolute;left:0;top:0;width:100%;height:100%;background:#ddd;opacity:0.5\""+"></div></li>"
					}
				}
				for(var z=0;z<_Id.length;z++){
					_sv[z]=_Id[z]
				}
				_image=""
			}
					zz()
			_save=_count;
			_dis=_discount
			_pp=_price
			_ct=_count
			_cun=_ges
			//_Id=_Id.join(",").replace(/\,$/,"")


			if(_distrgive!=""){
				$(".giveto").css({display:"block"})
				$(".gift").html(_distrgive)
			}
			$("section ul").html(_list)
			$(".summ").text(_ges)
			keepFooter()
			if(_price==-0){
				_price=0
			}
			$(".amountBig span").text(_price.toFixed(2))
			$(".commit span").text("("+_ges+")")
			select()
			change(data1);
			deLete(data1)
			console.log(_discount)
			$(".ab span:nth-child(2)").text(_discount.toFixed(2))
			fg()
		}
			function deLete(data1){//删除商品
				var _dl="";
				$("#edit").tap(function(){
					if($(this).text()=="编辑"){
						$(this).text("完成")
					}else{
						$(this).text("编辑")
					}
					if($(".set").css("display")=="none"){
						$(".set").css({display:"block"})
					}else{
						$(".set").css({display:"none"})
					}
				})
				$(".delete").click(function(){
					_dll=$(this).parent().parent().find(".amount").text()
					$(".ifDelt").css({display:"block"})
					$("html").css({overflow:"hidden"})
					$(".ifDelt div:nth-child(1)").attr("id","y"+$(this).parent().parent().attr("id"))
					$(".ifDelt div:nth-child(1)").attr("ip",$(this).parent().parent().attr("ip"))
					_arr.splice($(this).parent().parent().attr("ip"),1,-2)
				})
				$(".ly").click(function(){
					$(this).parent().parent().find(".disc2").css({display:"block"})
					console.log($(this).parent().parent().find(".disc2>div>textarea"))
					$(this).parent().parent().find(".disc2>div>textarea").attr("readonly",false);
					$(this).parent().parent().find(".disc2>div>textarea").focus()
			        var result=$(this).parent().parent().find(".disc2>div>textarea").val();//对input取值
			        $(this).parent().parent().find(".disc2>div>textarea").val("")//使input的值为空
			        $(this).parent().parent().find(".disc2>div>textarea").val(result);//重新负值
			        $(this).parent().parent().find(".disc2>div>textarea")[0].scrollLeft=700;//这里我对文本框的属性做了一个猜想，应该是有混动条的属性的，所以进行一个偏移
					$(this).parent().parent().find(".disc2>div>textarea")[0].scrollTop=700;
				})		
				$(".disc2>div>textarea").blur(function(){
					$(this).attr("readonly",true)
					if($(this).val()==""){
						$(this).parent().parent().css({display:"none"})
					}
				})
				
				
				$(".disc2>div>textarea").on("input propertychange",function(){
					var _wz=0;
					var _h=0;
					var _we=$(this).width();
					var _lin=$(this).height()/24;
					console.log($(this).parent().parent().parent().find(".amount").text())
					var oThat=this;
					
					var _ind=$(this).parent().parent().parent().attr("id");
					for(var jj=0;jj<$(oThat).val().length;jj++){
						console.log($(oThat).val().charAt(jj))
						if($(oThat).val().charAt(jj).match(/[a-zA-Z0-9]*/g)!=","){
							_wz+=7;
						}else{
							_wz+=14;
						}
					}
					console.log(_wz)
					if(_wz>=_we*_lin-14){
						_lin++;
						$(".disc2>div>textarea").height(_lin*2+"rem")
					}
					if(_lin!=1){
						if(_wz<_we*(_lin-1)-14){
							_lin--;
							$(".disc2>div>textarea").height(_lin*2+"rem")
						}
					}
					$.ajax({
						type:"post",
						url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart",
						async:true,
						data:{
							distributorid:_disId,
							itemid:data1[_ind]["itemid"],
							itemcount:$(oThat).parent().parent().parent().find(".amount").text(),
							itemquality:data1[_ind]["itemquality"],
							itemprice:data1[_ind]["price"],
							isyucun:data1[_ind]["isyucun"],
							activityitemid:data1[_ind]["activityitem_id"],
							versiontime:formaty(),
							remark:$(oThat).val(),
							prepayid:data1[_ind]["isyucun"]==1?data1[_ind]["prepayguid"]:""
						},
						error:function(){},
						success:function(data){}
					})
				})
				$(".ifDelt span:nth-child(1)").click(function(){
					$(".ifDelt").css({display:"none"})
					$("html").css({overflow:"auto"})
				})
				$(".ifDelt span:nth-child(2)").click(function(){
					var _ar=[];
					_id=$(this).parent().prev().attr("id").replace("y","");
					 var _that=$(this)
					_dl=data1[_id]["guid"]
					console.log(_dl)
					$.ajax({
						url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart?distributor_id="+_disId+"&guid="+_dl,
						type:"delete",
						error:function(){},
						success:function(data){
							console.log(data)
							//$(".delete").remove($(".delete").parent().parent())
							$("html").css({overflow:"auto"})
							$(".ifDelt").css({display:"none"})
							_cun-=Number($("#"+_id).find(".amount").text());$(this).parent().prev().attr("ip")
							_Id.splice(_that.parent().prev().attr("ip"),1,"a");
							_sv.splice(_that.parent().prev().attr("ip"),1,"a");
							_pp-=Number($("#"+_id).find(".pp1").text().replace("￥",""))*Number(_dll)
							if($("#"+_id).find(".gouxuan").attr("flag")){
								if($("#"+_id).find(".gouxuan").attr("flag")==1){
									_ges-=Number($("#"+_id).find(".amount").text())
									$(".summ").text(_ges)
								}else{
									_save-=1;
								}								
							}
							console.log(_ges)
							if(_count==_save && _count!=0){
								$(".gg").attr("flag","1")
								$(".gg").css({"background":"url(../../image/shop/crect.jpg) no-repeat center center",backgroundSize:"20px 20px",borderColor:"#3a3635"});
							}else{
								$(".gg").attr("flag","0")
								$(".gg").css({"background":"none",borderColor:"#fff"});
							}
							if(data1[_id]["salestop"]==0 && $("#"+_id).find(".gouxuan").attr("flag")==1){
								console.log(_id)
								_price-=Number($("#"+_id).find(".pp1").text().replace("￥",""))*Number(_dll)
								console.log(_price)
								if(_price==-0){
									_price=0
								}
								$(".amountBig span").text(_price.toFixed(2))

							}
							if(data1[_id]["itemkind"]=="降价"){
									_dis-=((Number(data1[_id]["originalprice"])-Number(data1[_id]["price"]))*(Number(data1[_id]["itemcount"])))
									if($("#"+_id).find(".gouxuan").attr("flag")==1){
										_discount-=(data1[_id]["originalprice"]-data1[_id]["price"])*Number($("#"+_id).find(".amount").text()) || (data1[_id]["price"]-data1[_id]["price"]*data1[_id]["discount"]*0.1)*Number($("#"+_id).find(".amount").text())
										$(".ab span:nth-child(2)").text(_discount.toFixed(2))										
									}
								}
							if(data1[_id]["itemkind"]=="折扣"){
								_dis-=(Number(data1[_id]["price"])-(Number(data1[_id]["price"])*data1[_id]["discount"]*0.1))*Number(data1[_id]["itemcount"]);
									if($("#"+_id).find(".gouxuan").attr("flag")==1){
										_discount-=((Number(data1[_id]["price"])-(Number(data1[_id]["price"])*data1[_id]["discount"]*0.1)))*Number($("#"+_id).find(".amount").text()) || (data1[_id]["price"]-data1[_id]["price"]*data1[_id]["discount"]*0.1)*Number($("#"+_id).find(".amount").text())
										$(".ab span:nth-child(2)").text(_discount.toFixed(2))										
									}
							}
							$("#"+_id).remove();
							fg()
							zz()
							if(_cun==0){
								$("#kong").show()
							}
						}
					})
				})
			}
    	//}
    	function sendId(data1){
			$.ajax({
				url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart/"+data1[_indd]["distributor_id"]+"?isvalid=0",
				dataType:"json",
				type:"get",
				error:function(){},
				success:function(){
					
				}
			})		
    	}

		function select(){//购物车商品的勾选
			var _ll=0;

			console.log(_arr)
			$("section").on('click','.labs',function(){
				if($(this).children().attr("flag")==1){
					_Id.splice($(this).parent().parent().attr("ip"),1,"a")
					console.log(_Id)
					$(this).children().attr("flag","0")
					$(this).children().css({"background":"none",borderColor:"#5d5c5c"});
					_arr.splice($(this).parent().parent().attr("ip"),1,-1)
					console.log(_arr)
					_count-=1
					_ges-=Number($(this).next().children().children().find(".amount").text())
					_price-=Number($(this).parent().find(".pp1").text().replace("￥",""))*Number($(this).next().find(".amount").text())
					if($(this).parent()){
						if($(this).parent().next().find("span:nth-child(1)").text()=="降价" || $(this).parent().next().find("span:nth-child(1)").text()=="折扣"){
							_discount-=(Number($(this).next().children().find(".intail").find("span").text().replace("￥",""))-Number($(this).next().children().find(".pp1").text().replace("￥","")))*Number($(this).next().find(".change").find(".amount").text())
							$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(2))
						}
					}
					zz()
					if(_price==-0){
						_price=0
					}
					$(".amountBig span").text(_price.toFixed(2))
//					if(_count==0){
//						$(".yj").css({display:"block"})
//					}
				}else{
					if($(this).parent()){
						if($(this).parent().next().find("span:nth-child(1)").text()=="降价" || $(this).parent().next().find("span:nth-child(1)").text()=="折扣"){
							_discount+=(Number($(this).next().children().find(".intail").find("span").text().replace("￥",""))-Number($(this).next().children().find(".pp1").text().replace("￥","")))*Number($(this).next().find(".change").find(".amount").text())
							$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(2))
						}
					}
					_Id.splice($(this).parent().parent().attr("ip"),1,$(this).parent().parent().attr("guid"))
					console.log(_Id)
					_arr.splice($(this).parent().parent().attr("ip"),1,parseInt($(this).parent().parent().attr("id")))
					console.log(_arr)
					$(this).children().attr("flag","1")
					$(this).children().css({"background":"url(../../image/shop/crect1.jpg) no-repeat center center",backgroundSize:"20px 20px",borderColor:"#fff"});
					_count+=1
					_ges+=Number($(this).next().children().children().find(".amount").text())
					_price+=Number($(this).parent().find(".pp1").text().replace("￥",""))*Number($(this).next().find(".amount").text())
					if(_price==-0){
						_price=0
					}
					$(".amountBig span").text(_price.toFixed(2))
					zz()

					
				}

				if(_count==_save){
					$(".gg").attr("flag","1")
					$(".gg").css({"background":"url(../../image/shop/crect.jpg) no-repeat center center",backgroundSize:"20px 20px",borderColor:"#3a3635"});
				}else{
					$(".gg").attr("flag","0")
					$(".gg").css({"background":"none",borderColor:"#fff"});
				}
				$(".commit span").text("("+_ges+")")
				$(".summ").text(_ges)
				fg()
			});
			$(".labal").click(function(){
				if(_ct!=0){
					if($(this).children().attr("flag")==1){
						_count=0;
						_ges=0
						$(".commit span").text("("+_ges+")")
						$(".summ").text(_ges)
						$(this).children().attr("flag","0")
						$(this).children().css({"background":"none",borderColor:"#fff"});
						for(var k=0;k<$(".list i").length;k++){
							
								$(".list i")[k].setAttribute("style","background:none;border-color:#5d5c5c;")
								$(".list i")[k].setAttribute("flag","0")
	//							$(".list i")[k].style.background="none";
	//							$(".list i")[k].style.borderColor
								//$(".list i")[j].css({"background":"url(../../image/shop/crect1.jpg) no-repeat center center",backgroundSize:"1.4rem 1.4rem",borderColor:"#fff"});
											
						}
						_count=0
						if(_price==-0){
							_price=0
						}
						$(".amountBig span").text("0.00")
						_price=0
						zz()
						_discount=0
						$(".amountBig").next().find("span:nth-child(2)").text("0.00")
	//					if(_count==0){
	//						$(".yj").css({display:"block"})
	//					}
						for(var c=0;c<_Id.length;c++){
							_Id[c]="a"
						}
						console.log(_Id)
					}else{
						_price=_pp
						zz()
						_discount=_dis
						_count=_ct
						_ges=_cun
						$(".commit span").text("("+_ges+")")
						$(".summ").text(_ges)
						$(this).children().attr("flag","1")
						$(this).children().css({"background":"url(../../image/shop/crect.jpg) no-repeat center center",backgroundSize:"20px 20px",borderColor:"#3a3635"});
							for(var j=0;j<$(".list i").length;j++){
							
								$(".list i")[j].setAttribute("style","background:url(../../image/shop/crect1.jpg) no-repeat center center;background-size:20px 20px;borderColor:#fff;flag:1")
								$(".list i")[j].setAttribute("flag","1")
								//$(".list i")[j].css({"background":"url(../../image/shop/crect1.jpg) no-repeat center center",backgroundSize:"1.4rem 1.4rem",borderColor:"#fff"});
											
						}
						_count=_save
						if(_price==-0){
							_price=0
						}
						$(".amountBig span").text(_price.toFixed(2))
						$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(2))
	//					if(_count>0){
	//						$(".yj").css({display:"none"})
	//					}
						console.log(_sv)
						for(var f=0;f<_sv.length;f++){
							_Id[f]=_sv[f]
						}
						console.log(_Id)
					}
					fg()					
				}

			});
		}
		function change(data1){//购物车数量改变
			$(".change").on('tap','.reduce',function(e){
				e.originalEvent.stopPropagation();
				var tht=this					
				var _ind=$(this).parent().parent().parent().parent().parent().attr("id");
				var that=$(this).parent().find(".amount").text()
				console.log(data1[_ind]["salecount"])
				if(data1[_ind]["salecount"]){
					if(Number($(this).parent().find(".amount").text())>Number(data1[_ind]["salecount"])){
						_cun-=1;
						_ges-=1;
						$(this).parent().find(".amount").text($(this).parent().find(".amount").text()-1);
						that=$(this).parent().find(".amount").text()
						$.ajax({
							type:"post",
							url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart",
							async:true,
							data:{
								distributorid:_disId,
								itemid:data1[_ind]["itemid"],
								itemcount:that,
								itemquality:data1[_ind]["itemquality"],
								itemprice:data1[_ind]["price"],
								isyucun:data1[_ind]["isyucun"],
								activityitemid:data1[_ind]["activityitem_id"],
								versiontime:formaty(),
								remark:$(tht).parents(".list").parent().find(".disc2>div>textarea").val(),
								prepayid:data1[_ind]["isyucun"]==1?data1[_ind]["prepayguid"]:""
							},
							error:function(){},
							success:function(data){
								if(data.result==true){
									console.log(data);
									$(tht).parent().parent().parent().parent().parent().find(".yuj").text(Math.floor(Number($(tht).prev().text())/Number(data1[_ind]["salecount"]))*Number(data1[_ind]["giftcount"]));
									_pp-=Number($(tht).parent().parent().find(".pp1").text().replace("￥",""));
									if($(tht).parent().parent().parent().prev().children().attr("flag")==1){
										_price-=Number($(tht).parent().parent().find(".pp1").text().replace("￥",""))
										if(_price==-0){
											_price=0
										}
										$(".amountBig span").text(_price.toFixed(2))
									}
									if($(tht).parent().parent().parent().parent().next().find("span:nth-child(1)").text()=="降价" || $(tht).parent().parent().parent().parent().next().find("span:nth-child(1)").text()=="折扣"){
										_dis-=(Number($(tht).parent().next().next().find("span").text().replace("￥",""))-Number($(tht).parent().next().text().replace("￥","")))
										if($(tht).parent().parent().parent().prev().children().attr("flag")==1){
											_discount-=(Number($(tht).parent().next().next().find("span").text().replace("￥",""))-Number($(tht).parent().next().text().replace("￥","")))
											$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(2))
										}									
									}
									fg();
									zz()
									$(".commit span").text("("+_ges+")")
									$(".summ").text(_ges)
									if(Number($(tht).parent().find(".amount").text())==Number(data1[_ind]["salecount"])){
										$(tht).css({color:"#e3e7ea"})
									}									
								}

							}
						});
					}
				}else{
					if($(this).parent().find(".amount").text()>1){
						$(this).parent().find(".amount").text($(this).parent().find(".amount").text()-1);
						that=$(this).parent().find(".amount").text()
						_cun-=1;
						_ges-=1;
						$.ajax({
							type:"post",
							url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart",
							async:true,
							data:{
								distributorid:_disId,
								itemid:data1[_ind]["itemid"],
								itemcount:that,
								itemquality:data1[_ind]["itemquality"],
								itemprice:data1[_ind]["price"],
								isyucun:data1[_ind]["isyucun"],
								activityitemid:data1[_ind]["activityitem_id"],
								versiontime:formaty(),
								remark:$(tht).parents(".list").parent().find(".disc2>div>textarea").val(),
								prepayid:data1[_ind]["isyucun"]==1?data1[_ind]["prepayguid"]:""
							},
							error:function(){},
							success:function(data){
								console.log(data);
								_pp-=Number($(tht).parent().parent().find(".pp1").text().replace("￥",""));
								if($(tht).parent().parent().parent().prev().children().attr("flag")==1){
									_price-=Number($(tht).parent().parent().find(".pp1").text().replace("￥",""))
									if(_price==-0){
										_price=0
									}
									$(".amountBig span").text(_price.toFixed(2))
								}
								if($(tht).parent().parent().parent().parent().next().find("span:nth-child(1)").text()=="降价" || $(tht).parent().parent().parent().parent().next().find("span:nth-child(1)").text()=="折扣"){
									_dis-=(Number($(tht).parent().next().next().find("span").text().replace("￥",""))-Number($(tht).parent().next().text().replace("￥","")))
									if($(tht).parent().parent().parent().prev().children().attr("flag")==1){
										_discount-=(Number($(tht).parent().next().next().find("span").text().replace("￥",""))-Number($(tht).parent().next().text().replace("￥","")))
										$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(2))
									}									
								}
								fg()
								zz()
								$(".commit span").text("("+_ges+")")
								$(".summ").text(_ges)
								if(Number($(tht).parent().find(".amount").text())<=1){
									$(tht).css({color:"#e3e7ea"})
								}
							}
						});						
					}

				}


				
			});
			$(".change").on('tap','.increase',function(e){
				e.originalEvent.stopPropagation();
				var th=this;
				var _ind=$(this).parent().parent().parent().parent().parent().attr("id");
				var _xx=$(this).parents(".yuu").find(".hp>span").text();
				console.log(_xx)
				if(_xx && Number($(this).next().text())>=Number(_xx)){
					
				}else{
					$(this).parent().find(".amount").text(parseInt($(this).parent().find(".amount").text())+1)
					console.log(_ges)
					_cun+=1;
					_ges+=1;
					console.log(_ges)
					var that=$(this).parent().find(".amount").text();
					$.ajax({
						type:"post",
						url:"/webapi/distributor/"+getRetailerid()+"/shoppingcart",
						async:true,
						data:{
							distributorid:_disId,
							itemid:data1[_ind]["itemid"],
							itemcount:that,
							itemquality:data1[_ind]["itemquality"],
							itemprice:data1[_ind]["price"],
							isyucun:data1[_ind]["isyucun"],
							activityitemid:data1[_ind]["activityitem_id"],
							versiontime:formaty(),
							remark:$(th).parents(".list").parent().find(".disc2>div>textarea").val(),
							prepayid:data1[_ind]["isyucun"]==1?data1[_ind]["prepayguid"]:""
						},
						error:function(){},
						success:function(data){
							if(data.result==true){
								$(th).parent().parent().parent().parent().parent().find(".yuj").text(Math.floor(Number($(th).next().text())/Number(data1[_ind]["salecount"]))*Number(data1[_ind]["giftcount"]));
								console.log(data);
								console.log(_price)
								console.log($(th).parent().parent().parent().prev().attr("flag"))
								_pp+=Number($(th).parent().parent().find(".pp1").text().replace("￥",""));
								if($(th).parent().parent().parent().prev().children().attr("flag")==1){
									_price+=Number($(th).parent().parent().find(".pp1").text().replace("￥",""))
									if(_price==-0){
										_price=0
									}
									$(".amountBig span").text(_price.toFixed(2))
								}
								console.log($(th).parent().parent().parent().parent().next().find("span:nth-child(1)"))
								if($(th).parent().parent().parent().parent().next().find("span:nth-child(1)").text()=="降价" || $(th).parent().parent().parent().parent().next().find("span:nth-child(1)").text()=="折扣"){
									_dis+=(Number($(th).parent().next().next().find("span").text().replace("￥",""))-Number($(th).parent().next().text().replace("￥","")))
									if($(th).parent().parent().parent().prev().children().attr("flag")==1){
										_discount+=(Number($(th).parent().next().next().find("span").text().replace("￥",""))-Number($(th).parent().next().text().replace("￥","")))
										$(".amountBig").next().find("span:nth-child(2)").text(_discount.toFixed(2))
									}									
								}
								fg()
								zz()
								$(".summ").text(_ges)
								if(data1[_ind]["salecount"]){
									if(Number($(th).parent().find(".amount").text())>Number(data1[_ind]["salecount"])){
										$(th).parent().find(".reduce").css({color:"#009f96"})
									}						
								}else{
									if(Number($(th).parent().find(".amount").text())>1){
										$(th).parent().find(".reduce").css({color:"#009f96"})
									}
								}							
							}
	
						}
					});
				}

			})
		}
		function formaty(){//计算当前时间传入参数post
			var d=new Date();
			_year=d.getFullYear();
			_month=d.getMonth()+1;
			_day=d.getDate();
			_hour=d.getHours();
			_minute=d.getMinutes();
			_second=d.getSeconds();
			_msecond=d.getMilliseconds();
			if(_hour<10){
				_hour="0"+_hour;
			}
			if(_month<10){
				_month="0"+_month;
			}
			if(_day<10){
				_day="0"+_day;
			}
			if(_minute<10){
				_minute="0"+_minute;
			}
			if(_second<10){
				_second="0"+_second;
			}
			if(_msecond<100 && _msecond>10){
				_msecond="0"+_msecond
			}else if(_msecond<10){
				_msecond="00"+_msecond
			}
			return _year+"-"+_month+"-"+_day+" "+_hour+":"+_minute+":"+_second+"."+_msecond
		}

		function fg(){//活动显示
				console.log(_price)
					var _nm="";
		        	var _jies="";
					if(_tt[_indd]["promotionactivity"] && _tt[_indd]["promotionactivity"]["details"].length>0){
		        	  	for(var p=0;p<_tt[_indd]["promotionactivity"]["details"].length;p++){
		        	  		if(_price>=_tt[_indd]["promotionactivity"]["details"][p]["moneysum"] && _tt[_indd]["itemkind"]=="满赠"){
		        	  			_active="";
		        	  			for(var c=0;c<_tt[_indd]["promotionactivity"]["details"][p]["giftitems"].length;c++){
		        	  				_distrgive+="<div>"+_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["itemname"]+"<span class="+"\"gifty\""+">x"+_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["count"]+"</span></div>"
		        	  				_active+=_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["itemname"]+_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["count"]+_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["unit"]+
		        	  				(_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["itemquality"]==1?"":"(临期)")+"、"
		        	  				_nm="满赠"
		        	  				_jies="您已满"+_tt[_indd]["promotionactivity"]["details"][p]["moneysum"]+"元，获赠"
		        	  			}
		        			}else if(_price>=_tt[_indd]["promotionactivity"]["details"][p]["moneysum"] && data[_indd]["itemkind"]=="满减"){
		        				for(var c=0;c<_tt[_indd]["promotionactivity"]["details"][p]["giftitems"].length;c++){
		        	  				_active+="<span>"+data[_indd]["promotionactivity"]["details"][p]["moneysum"]+"</span>"
		        	  				_nm="满减"
		        	  				_jies="您已满"+_tt[_indd]["promotionactivity"]["details"][p]["giftitems"][c]["price"]+"元，已减"
		        	  			}
		        			}
						}					
						console.log(_nm)
						if(_active==""){
							$(".intr").css({display:"none"})
						}else{
							$(".intr").css({display:"flex",display:"-webkit-box"})
						}
						$(".intr div:nth-child(1)").text(_nm)
						$(".intr div:nth-child(2) span:nth-child(1)").text(_jies)
						$(".intr div:nth-child(2) span:nth-child(2)").text(_active.replace(/\、$/g,""))	
						_nm="";
						 _jies="";
						 _active=""
		        }
					$("html").css({overflow:"auto"})
					
		}
		}
	function keepFooter(){
		
		var oHeight = $(document).height(); //屏幕当前的高度
		
		$(window).resize(function(){
				console.log(11111)
		        if($(document).height() < oHeight){
		
		        $(".bottomlayout").css("display","none");
		
		    }else{
		
		        $(".bottomlayout").css("display","block");
		
		    } 
		
		    });
	}
