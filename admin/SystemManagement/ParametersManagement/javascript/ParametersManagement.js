
/*起始时间laydate控件*/
	var dataStart = {
	  elem: '#dataStart',
	  format: 'YYYY-MM-DD hh:mm:ss',
	//min: laydate.now(), //设定最小日期为当前日期
	  max: '2099-06-16', //最大日期
	  istime: true,
	  start: laydate.now(),  //开始日期
	  choose: function(datas){
	     dataEnd.min = datas; //开始日选好后，重置结束日的最小日期
	     dataEnd.start = datas //将结束日的初始值设定为开始日
	  }
	};

	var dataEnd = {
	  elem: '#dataEnd',
	  format: 'YYYY-MM-DD hh:mm:ss',
	//min: laydate.now(),
	  max: '2099-06-16',
	  istime: true,
	  istoday: false,
	  start: laydate.now(),  //开始日期********************不方便就注释掉//不注释掉发现也么有用
	  choose: function(datas){
	    dataStart.max = datas; //结束日选好后，重置开始日的最大日期
	  }
	};
	laydate(dataStart);
	laydate(dataEnd);

	

/***************************以上***********************************************/

//add.html中一级二级三级联动新修改之后，直接复制到这里，所以，查看对应代码建议去add.html中。 
//用于调试的变量
var linshi='';
//查询按钮变量
var queryConditionS='';//存储查询条件
var queryParameterS='';//存储查询参数
var queryPagesNum=1;//存储查询页面,纪录当前是哪页，以便启用后，回复到此页。也用于分页器自己回调。
var queryPagesCount=10;//存储每页数量，后续添加下拉选项，更改每页显示数量。
//查询按钮bol值
var queryBtnBol=false;//用于解决bug7.
var initialQueryBol=true;//用于初始进入界面查询一次
//查询到多少条数据
var totalcountS=0;
////存储一级菜单ajax传来的data
//var Sele1='';
////存储二级菜单ajax传来的data
//var Sele2='';
////存储三级菜单ajax传来的data
//var Sele3='';
//存储于版本号ajax传来的data
var Sele4='';
//存储查询按钮ajax返回数据
var ajQuBtDa='';
//存储综合查询条件
var JsonData={};
//调用分页
//设定默认查询状态//暂时搬家到一级类型查询内*************
// ajaxQueryBtn(queryPagesNum,queryPagesCount);
//loding图的宽
var jsonControlDom="";//用于存储json控件的dom
var loadingWidth=$('.pagesTbodyLong').parent().width();
	ajaxSele1();
		//封装获取1级下拉
	function ajaxSele1(){
		// $(".sele4").hide();
		var indexLayer=layer.msg('处理中',{time: 0});
		return $.ajax({
			type:"get",
			url:"/webapi/configservice/dict/firstlevel",
			async:true,
			success:function(data){
				layer.close(indexLayer);
				var temp_html;
				$(".quSe1").empty();
				// temp_html+="<option value='"+""+"'>请选择或者直接在下栏输入</option>";
				$.each(data,function(i,s1){
					temp_html+="<option value='"+s1+"'>"+s1+"</option>";
				})
				
				$(".quSe1").html(temp_html);	
				if($(".quSe1").val()!=""){
					ajaxSele2();
					$(".sele2").removeClass("seleHid");			
					$(".sele3").addClass("seleHid");// 防止123都有的时候，直接把1变成非空值
					$(".quSe3").val("");// 防止123都有的时候，直接把1变成非空值
				}else{
					$(".sele2").addClass("seleHid");
					$(".sele3").addClass("seleHid");
					$(".quSe2").val("");
					$(".quSe3").val("");
					// $(".sele4 label").text("");
				}						
	//			ajaxSele2();//开始获取二级,因为要求没选择1级的时候，2级不显示，所以这里注释掉
				// if(data.length>0){//其实肯定大于0
				// 	$(".sele4 input").attr('placeholder','请输入或者在上面选择,或留白')	
				// 	$(".sele4 label").text("")	
				// }else{
				// 	$(".sele4 label").text("二级类型(可为空)")
				// }
				if(initialQueryBol){					
					ajaxQueryBtn(queryPagesNum,queryPagesCount);
					initialQueryBol=false;
				}
			}
		});
	}
	//封装获取2级下拉
	function ajaxSele2(){
		var indexLayer=layer.msg('处理中',{time: 0}); 
		return $.ajax({
			type:"get",
			url:"/webapi/configservice/dict/"+$(".quSe1").val()+"/secondlevel",		//1118接口
			async:true,
			success:function(data){	
				layer.close(indexLayer);
				var temp_html;
				$(".quSe2").empty();
				if(data.length!=0){
					temp_html+="<option value='"+""+"'>请选择</option>";		
					$(".sele2").removeClass("seleHid");		
					// $(".sele4 input").attr('placeholder','请输入或者在上面选择,或留白')		
					// $(".sele4 label").text("")	
				}else{
					// temp_html+="<option value='"+""+"'>请下栏输入二级类型或者留白</option>";
					$(".sele2").addClass("seleHid");
					// $(".sele4 input").attr('placeholder','请输入或者留白')		
					// $(".sele4 label").text("二级类型")
				}
				$.each(data,function(i,s2){
					temp_html+="<option value='"+s2+"'>"+s2+"</option>";
				})
				$(".quSe2").html(temp_html);
				
				//1级选择了，2级有数据才显示2级
	// 			if($(".quSe1").val()!=""&&data.length>0){//请输入不算长度，因为其不算data				
	// 				$(".sele2").removeClass("seleHid");
	// 			}else{
	// 				$(".sele2").addClass("seleHid");
	// //				$(".sele3").addClass("seleHid");//如果选择了一级，二级，三级，然后放弃选择一级，自动隐藏二级的同时，也要隐藏3级。但仅此不够
	// //				$(".quSe3").empty();//加上此，那type的值为null，而不是"";
	// 				// ajaxSele3();//如果选择了一级，二级，三级，然后放弃选择一级，自动隐藏二级的同时，也要隐藏3级。当然，这里应该还可以优化。
	// 			}
				// $(".sele4").show();
				
						
			}
		});
	}
	//封装获取3级下拉
	function ajaxSele3(){
		var indexLayer=layer.msg('处理中',{time: 0});
		return $.ajax({
			type:"get",
			url:"/webapi/configservice/dict/"+$(".quSe1").val()+"/"+$(".quSe2").val()+"/thirdlevel",//1116接口
			async:true,
			success:function(data){	
				layer.close(indexLayer);;
				var temp_html;
				$(".quSe3").empty();
				if(data.length>0){
					temp_html+="<option value='"+""+"'>请选择";
					$(".sele3").removeClass("seleHid");
					// $(".sele4 input").attr('placeholder','请输入或者在上面选择,或留白')
					// $(".sele4 label").text("")	
				}else{
					// temp_html+="<option value='"+""+"'>请下栏输入二级类型或者留白</option>";
					$(".sele3").addClass("seleHid");
					// $(".sele4 input").attr('placeholder','请输入或留白')
					// $(".sele4 label").text("三级类型")	
				}				
				$.each(data,function(i,s3){
					temp_html+="<option value='"+s3+"'>"+s3+"</option>";
				})
				$(".quSe3").html(temp_html);			
				//2级选择了，3级有数据才显示3级
				// if($(".quSe2").val()!=""&&data.length>0){//请输入不算长度，因为其不算data				
				// 	$(".sele3").removeClass("seleHid");
				// }else{
				// 	$(".sele3").addClass("seleHid");
				// }
				// $(".sele4").show();
				
			}
		});
	}
	$(".quSe1").change(function(){
		queryBtnBol=false;
		if($(".quSe1").val()!=""){
			ajaxSele2();
			$(".sele2").removeClass("seleHid");			
			$(".sele3").addClass("seleHid");// 防止123都有的时候，直接把1变成非空值
			$(".quSe3").val("");// 防止123都有的时候，直接把1变成非空值
		}else{
			$(".sele2").addClass("seleHid");
			$(".sele3").addClass("seleHid");
			$(".quSe2").val("");
			$(".quSe3").val("");
			// $(".sele4 label").text("");
		}
	})
	$(".quSe2").change(function(){
		queryBtnBol=false;
		if($(".quSe2").val()!=""){
			ajaxSele3();
			$(".sele3").removeClass("seleHid");
		}else{
			$(".sele3").addClass("seleHid");
			$(".quSe3").val("");
			$(".sele4 label").text("");
		}
	})
	$(".quSe3").change(function(){
		queryBtnBol=false;
	})
	$(".iT1").change(function(){//取消该事件，所以注释掉
		queryBtnBol=false;
		// console.log(queryBtnBol);
	})
//$(".iT1").blur(function(){//取消该事件，所以注释掉
//	ajaxGetversion();
//})
//封装获取版本的下拉
//function ajaxGetversion(){//取消该事件，所以注释掉
//	var indexLayer=layer.msg('处理中',{time: 0});
//	$.ajax({
//		type:"get",
//		url:"/webapi/configservice/getversions?title="+$(".iT1").val(),
//		async:true,
//		success:function(data){		
//			layer.close(indexLayer);;
//			console.log('Sele4')
//			var temp_html;
//			Sele4=data;
//			$(".quSe4").empty();
//			temp_html+="<option value='"+null+"'>请选择</option>";
//			$.each(Sele4,function(i,s3){
//				temp_html+="<option value='"+s3+"'>"+s3+"</option>";
//			})
//			$(".quSe4").html(temp_html);
//			//有title，版本有数据才显示3级
//			if($(".iT1").val()!=""&&data.length>0){//请输入不算长度，因为其不算data				
//				$(".sele4").removeClass("seleHid");
//			}else{
//				$(".sele4").addClass("seleHid");
//			}
//		}
//	});
//}

// 操作按钮组开始，cg
$('table').on('click','.handle-icon',function(e){
	e.stopPropagation();
	// $(this).toggleClass('on').parents('tr').siblings().find('.handle-icon').removeClass('on');
	$(this).toggleClass('on');
	$(".handle-icon").not(this).removeClass('on');
});
$(document).click(function(){
	$('.handle-icon').removeClass('on');
});
// 操作按钮组结束，cg

//修改//后期需要封装，如启用一般封装
$('table').on("click",".handle-btns .modify",function(){
	var con1;
	try{
		JSON.parse($(this).parents("tr").find("td").eq(7).text());
		con1=$(this).parents("tr").find("td").eq(7).text();
//		console.log('try')
	}catch(e){
//		console.log('catch',e)
		con1='"'+$(this).parents("tr").find("td").eq(7).text()+'"';
//		alert(e)
	}

	var data1='';
//	alert(this.tagName)
	data1+='{';
	data1+='"guid":"'+$(this).parents("tr").find("td").eq(2).text()+'",';
	data1+='"firstlevel":"'+$(this).parents("tr").find("td").eq(3).text()+'",';
	data1+='"secondlevel":"'+$(this).parents("tr").find("td").eq(4).text()+'",';
	data1+='"thirdlevel":"'+$(this).parents("tr").find("td").eq(5).text()+'",';	
	data1+='"fourthlevel":"'+$(this).parents("tr").find("td").eq(6).text()+'",';	
	data1+='"content":'+con1+',';//注意这里少了一对双引号，不要加上，除非后台改接收，否则后台会收到错误数据
	data1+='"description":"'+$(this).parents("tr").find("td").eq(8).text()+'",';
	data1+='"version":"'+$(this).parents("tr").find("td").eq(9).text()+'",';	
	data1+='"currentflag":"'+$(this).parents("tr").find("td").eq(10).text()+'",';
	data1+='"lastmodifytime":"'+$(this).parents("tr").find("td").eq(11).text()+'"';
	data1+='}';

	localStorage.dataLong=data1;	
	localStorage.ajaxType='modify';//纪录当前模式为修改。
//	window.location.href='json/index.html';//跳转模式
	var index = layer.open({//layer模式
		  type: 2,//4标签tips
		  title: '修改',
		  area: ['90%',"80%"],
		  maxmin: true,
	      content: 'json/index.html',     
	      scrollbar: false,
	})
})
//启用
$('table').on("click",".handle-btns .open",function(){
	var guid=$(this).parents("tr").find("td").eq(2).text();
	var currentflag1=$(this).parents("tr").find("td").eq(10).text();
//	console.log(currentflag1+'d389')	
	if(currentflag1=='未启用'){//这里要和显示的一致，否则总是不符合条件。而不是判断等于0与否
		ajaxEffectconfig(guid);
	}else{		
		layer.alert('该版本已经启用，无需再次开启', {icon: 2});			
	}
})
//删除
$('table').on("click",".handle-btns .del",function(){
//	console.log("del");
	var guid=$(this).parents("tr").find("td").eq(2).text();
	var currentflag=$(this).parents("tr").find("td").eq(10).text();
	if(currentflag=='未启用'){//这里要和显示的一致，否则总是不符合条件。而不是判断等于0与否
		layer.confirm('确定要删除吗？', {
			btn: ['确定','取消']	
		}, function(){ajaxDelete(guid);console.log('删除')},function(){console.log('取消删除')});	
	}else{
		layer.alert('该版本处于启用状态，不允许删除', {icon: 2});			
	}
})
//ajax之单启用封装
function ajaxEffectconfig(guidEffect){
	var indexLayer=layer.msg('处理中',{time: 0});
	$('.pagesTbodyLong').empty();//清除前页的数据
//	$('.imgcontent').append($('<img src="loading.gif" class="imglong" style="width:'+loadingWidth+';" />'));
	$.ajax({
		type:"put",
		dataType:'json',	
		// url:"/webapi/configservice/effectconfig/"+guidEffect,		
		url:"/webapi/configservice/config/"+guidEffect+"/currentflag",	
		// /webapi/configservice/config/1/currentflag
		// /webapi/configservice/config/3ae1755ba9b14919b4787e167861fcda/currentflag	
		success:function(data){
			layer.close(indexLayer);;
			// console.log(data);	
			if(data.error=="数据库中已经有备份的配置了"){			
				layer.alert(data.error, {icon: 2},function(){
					ajaxQueryBtn(queryPagesNum,queryPagesCount,queryPagesNum);
				});
				
			}else{
				ajaxQueryBtn(queryPagesNum,queryPagesCount,queryPagesNum);
			}
//			$('.imgcontent').empty();			
		},
		error:function(){
			// console.log('访问失败')
		}
	});			
}
//ajax之单删除封装
function ajaxDelete(guidDelet){
	var indexLayer=layer.msg('处理中',{time: 0});
	$('.pagesTbodyLong').empty();//清除前页的数据
//	$('.imgcontent').append($('<img src="loading.gif" class="imglong" style="width:'+loadingWidth+';" />'))
	$.ajax({
		type:"delete",
		dataType:'json',	
		url:"/webapi/configservice/config/"+guidDelet,		
		success:function(data){
			layer.close(indexLayer);;
//			console.log('访问成功');	
			$('.imgcontent').empty();
			ajaxQueryBtn(queryPagesNum,queryPagesCount,queryPagesNum)
		},
		error:function(){
//			console.log('访问失败')
		}
	});
}
//ajax之新增,其调用见行内。
function btnAdd(){
//	$('.pagesTbodyLong').empty();//清除前页的数据
//	$('.imgcontent').append($('<img src="loading.gif" class="imglong" style="width:'+loadingWidth+';" />'))
	var data1='';		
//	alert(this.tagName)
	data1+='{';
//	data1+='"guid":"'+此行不需要+'",';
	data1+='"fourthlevel":"'+'",';
//	data1+='"version":"'+此行不需要+'",';
	data1+='"content":"'+''+'",';
	data1+='"description":"'+'",';
	data1+='"thirdlevel":"'+'",';
	data1+='"secondlevel":"'+'",';
	data1+='"firstlevel":"'+'"';
//	data1+='"state":"'+此行不需要+'",';
//	data1+='"currentflag":"'+此行不需要+'"';
	data1+='}';
	localStorage.dataLong=data1;
	localStorage.ajaxType='add';//纪录当前模式为新增。
	layer.open({//layer模式
		  type: 2,//4标签tips
		  title: '新增',
		  area: ["622px","90%"],
		  maxmin: true,
		  scrollbar: false,
	      content: './html/add.html', //显示内容，绑定对象，我发现绑定元素有margin，就会影响某些参数，如下面tips	     
	})
//	window.location.href='json/index.html';			
}

/*
	* 分页  下拉刷新
	*/

	$(".table tbody").scroll(function() {
//		console.log($(this).scrollTop());
//		console.log($(this).prop("scrollHeight"));
		if($(this).scrollTop() >= ($(this).prop("scrollHeight") - 570)) {
			console.log(0);
			queryPagesNum++;
			ajaxQueryBtn(queryPagesNum,queryPagesCount)
		//		console.log(condition)
		}
	});



//新查询,点击按钮后调用
function ajaxQueryBtn(_pageindex,_pagesize,curr){
	var indexLayer=layer.msg('处理中',{time: 0});
	// $('.pagesTbodyLong').empty();//清除前页的数据
//	$('.imgcontent').append($('<img src="loading.gif" class="imglong" style="width:'+loadingWidth+';" />'));	
	var inra=0;
	if($(".inra").is(':checked')){		
		inra=1;
	}else{		
		inra=2;
	}

	JsonData={
		firstlevel:$(".quSe1").val(),
		secondlevel:$(".quSe2").val(),
		thirdlevel:$(".quSe3").val(),
		fourthlevel:$(".iT1").val(),
//		currentflag:$("input.inra:radio:checked").val(),
		currentflag:inra,
		version:$(".quSe4").val(),
		beginTime:$(".Wdate").eq(0).val(),
		endTime:$(".Wdate").eq(1).val(),
		pageindex:_pageindex,
		pagesize:_pagesize,
	};
	var urlPP="";//暂时不用
	if(JsonData.firstlevel!='null'&&JsonData.firstlevel!=''){urlPP=urlPP+"firstlevel="+JsonData.firstlevel+"&";}
	if(JsonData.secondlevel!='null'&&JsonData.secondlevel!=''){urlPP=urlPP+"secondlevel="+JsonData.secondlevel+"&";}
	if(JsonData.thirdlevel!='null'&&JsonData.thirdlevel!=''){urlPP=urlPP+"thirdlevel="+JsonData.thirdlevel+"&";}
	if(JsonData.fourthlevel!='null'&&JsonData.fourthlevel!=''){urlPP=urlPP+"fourthlevel="+JsonData.fourthlevel+"&";}
//	if(JsonData.currentflag!='null'&&JsonData.currentflag!=''&&JsonData.currentflag!=undefined){urlPP=urlPP+"currentflag="+JsonData.currentflag+"&";console.log("l啦啦啦啦啦了")}
	urlPP=urlPP+"currentflag="+JsonData.currentflag+"&";
	if(JsonData.version!='null'&&JsonData.version!=''){urlPP=urlPP+"version="+JsonData.version+"&";}
	if(JsonData.beginTime!='null'&&JsonData.beginTime!=''){urlPP=urlPP+"beginTime="+JsonData.beginTime+"&";}
	if(JsonData.endTime!='null'&&JsonData.endTime!=''){urlPP=urlPP+"endTime="+JsonData.endTime+"&";}	
	if(JsonData.pageindex!='null'&&JsonData.pageindex!=''){urlPP=urlPP+"pageindex="+JsonData.pageindex+"&";}
	if(JsonData.pagesize!='null'&&JsonData.pagesize!=''){urlPP=urlPP+"pagesize="+JsonData.pagesize+"&";}
//	console.log(urlPP)	
	/*如果没有输入查询条件 要delete*/
	if(JsonData.firstlevel == ''){delete JsonData.firstlevel}
	if(JsonData.secondlevel == ''){delete JsonData.secondlevel}
	if(JsonData.thirdlevel == ''){delete JsonData.thirdlevel}
	if(JsonData.fourthlevel == ''){delete JsonData.fourthlevel}
	if(JsonData.version == ''){delete JsonData.version}
	if(JsonData.beginTime == ''){delete JsonData.beginTime}
	if(JsonData.endTime == ''){delete JsonData.endTime}


	var url1117="";
	if($(".quSe1").val()==""){
		url1117='serverconfig';
		// console.log("if",url1117)
		// console.log(url1117)
	}else{
		url1117=$(".quSe1").val();
		// console.log("else",url1117)
	}
	$.ajax({
		type:"get",
		// url:"/webapi/configservice/muticonditionsearch?"+urlPP,
		url:"/webapi/configservice/configs/"+url1117,
		data:{
			firstlevel:JsonData.firstlevel,
			secondlevel:JsonData.secondlevel,
			thirdlevel:JsonData.thirdlevel,
			fourthlevel:JsonData.fourthlevel,
		    currentflag:inra,
		    beginTime:JsonData.beginTime,
		    endTime:JsonData.endTime,
		    pageindex:_pageindex,
		    pagesize:_pagesize
		},
		async:true,
		dataType:'json',
		success:function(data){	
			$(".loaded").fadeOut();
			layer.close(indexLayer);;
			ajQuBtDa=data;
			// laypage({	
			//     cont: 'biuuu_city',//插件原有，后期改键值
			//     pages: data.pagecount,//插件原有
			//     skip: true,//插件原有
			//     curr: curr || 1,
			//     jump: function(obj,first){//插件原有，本行为分页器要求传参，发现也可以省略
			//     	queryPagesNum=obj.curr;
			//     	if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
			//         	ajaxQueryBtn(queryPagesNum,queryPagesCount,queryPagesNum)//前一个queryPagesNum是显示第几页内容，后一个queryPagesNum是让分页器页码停留在该页。
			//      	}	
			//     }
			// })
			if(data.totalcount){//修复totalcountS被赋值为undefined的bug
				totalcountS=data.totalcount;
			}else{
				totalcountS=0;
			}
//			console.log('访问成功');
			queryConditionS="";
			if($(".quSe1").val()){
				queryConditionS+="一级:"+$(".quSe1").val()
			}
			if($(".quSe2").val()){
				queryConditionS+="~二级:"+$(".quSe2").val()
			}
			if($(".quSe3").val()){
				queryConditionS+="~三级:"+$(".quSe3").val()
			}
			if($(".iT1").val()){
				queryConditionS+="~四级:"+$(".iT1").val()
			}			
			$(".paging_content_div .s1").text(queryConditionS);
			// $(".paging_content_div .s2").text(queryParameterS);
			$(".paging_content_div .s3").text(totalcountS);
			if(!data.content){//如果查询为空，直接return。				
				return;
			}
			if(data.content.length < 1){
				// layer.alert('数据已加载完', {icon: 1});
				$(".finished").fadeIn(500).delay(1000).fadeOut(500);
				return;
			}
			tr = "";
			for(i=0;i<data.content.length;i++){ 
				//处理启用不启用
				var kkk="";
				if(data.content[i].currentflag){
					kkk="启用";
				}else{
					kkk="未启用";
				}
				//处理data.content[i].content，为了显示的不是[object Object]
				var ccc={};
				var td=data.content;
				if(typeof(td[i].content)=="object"){
					ccc=JSON.stringify(td[i].content, null, 4);
					// console.log(1)
				}else{
					ccc=JSON.parse('"'+td[i].content+'"');//注意存入localstorage的时候，也要处理。
					// console.log(2)
				}
				tr+="<tr class='text-c findTrLong'>"
				+"<td style='display:none'><input type='checkbox' value='' name=''></td>"
				+"<td>"+parseInt(i+1+(_pageindex-1)*_pagesize)+"</td>"
				+"<td style='display:none'>"+td[i].guid+"</td>"
				+"<td>"+td[i].firstlevel+"</td>"
				+"<td>"+td[i].secondlevel+"</td>"				
				+"<td>"+td[i].thirdlevel+"</td>"
				+"<td>"+td[i].fourthlevel+"</td>"
				+"<td class='tdContent' ><span class='text-overflow' style='width:100px;display:inline-block'>"+ccc+"</span></td>"
				+"<td class='tdDescription' ><span class='text-overflow' style='width:100px;display:inline-block'>"+td[i].description+"</span></td>"
				// +"<td>"+td[i].description+"</td>"//1213日修改为上侧
				+"<td>"+td[i].version+"</td>"
				// +"<td style='display:none'>"+td[i].state+"</td>"
				+"<td class='JsonTd'>"+kkk+"</td>"//考虑删除该类目
				+"<td>"+td[i].lastmodifytime+"</td>";
				if(data.readonly==1){
					tr+="<td></td>"
				}else{
					tr+="<td><div class='handle'><div class='handle-icon'><img src='images/iconss1.png'/></div><div class='handle-btns-wrap' style='";
					if(kkk=="未启用"){//目前先指定死宽度
						tr+="width:108px"
					}else{
						tr+="width:72px"
					}					
					tr+="'><div class='handle-btns'><span class='btn' style='display:none'>详细</span><span class='btn1 modify'>修改</span>"
					if(kkk=="未启用"){
						tr+="<span class='btn1 open'>启用</span>"
					}					
					tr+="<span class='btn1 del' title='删除'>删除</span><span class='arrow-right'></span></div></div></div></td>"
				}			
				tr+="</tr>";
			}
			$('.pagesTbodyLong').append(tr);
		   		
		},	
		beforeSend:function(){
			$(".loaded").fadeIn();
		},	
		error:function(){
			console.log('访问失败')			
		}
		
	});
}

//新查询按钮
function queryBtn(){
	$(".query_btn").on("click",function(){	
		$('.pagesTbodyLong').empty();//清除前页的数据
		queryBtnBol=true;
		queryPagesNum=1;//也许需要改进
		ajaxQueryBtn(queryPagesNum,queryPagesCount,queryPagesNum)	
	})
}
queryBtn()










//********************************************************************************************
////查询条件
//function queryCondition(){
//	$(".query_condition_div input").focus(function(){//如果需要保留最近输入的内容，那则修改者里。
////		$(".query_condition_div input").val('');//清空所有输入框的查询条件	
//		queryConditionS='';//清空
//		queryParameterS='';//清空		
//		totalcountS=0;
//	})
//	$(".query_condition_div input").blur(function(){		
//		queryParameterS=$(this).val();		
//		if(queryParameterS){
//			queryConditionS=$(this).prev('span').text();
//		}
////		console.log(queryConditionS,queryParameterS)
//	})
//}
//queryCondition()
//
////查询按钮
//function queryBtn(){
//	$(".query_btn_div input").on("click",function(){		
//		if(queryParameterS!=''){
//			ajaxQuery(queryConditionS,queryParameterS,1,2,true);//6个参数的最后一个参数在此不用传入。
////			ajaxLastState="ajaxQuery("+queryConditionS+","+queryParameterS+","+"1,2,true)";
////			console.log(ajaxLastState)
//			ajaxQuery(queryConditionS,queryParameterS,queryPagesNum,queryPagesCount,true,queryPagesNum)
//		}else{
//			alert('查询条件为空，请输入查询条件');
//		}		
//	})
//}
//queryBtn()
//********************************************************************************************

//var ajaxRead=ajaxQuery('type','long',1,2,true);//先查询第一页

//var ajaxLastState='';//纪录最近的ajax工作模式状态，仅仅纪录查询的所用的类型以及当前页码，不纪录删除与启用的ajax请求。

//ajaxLastState='ajaxQuery("type","long",1,2,true)';
//var pagesCount=0;//纪录页码总数//把分页器放在ajax的scuess回调后，暂且不需要此变量。
//var pagesCount=JSON.parse(ajaxRead.responseText).pagecount;
//var pagesCount=JSON.parse(ajaxPages("long",1,2,false).responseText).pagecount;
//ajaxLastState='';
//console.log(pagesCount)
//var pagesCount=ajaxQuery('long',1,2,false);
//console.log(JSON.parse(pagesCount.responseText).pagecount);
//自己添加,用以获取总页数，注意参数与下面调用要一直。


//生成页码 的ajax
//function ajaxPages(_type,_pageindex,_pagesize,_async){		
//	return $.ajax({
//		type:"get",
//		url:"/webapi/configservice/configbytype",//get
//		data:{			  
//			type: _type,
//			pageindex:_pageindex,
//			pagesize:_pagesize,
//		},	
//		async:_async,
//		success:function(data){
//			console.log('生成页码成功');			
//		}
//	});		
//}

////载入表格的ajax	
//function ajaxQuery(typeType,_typeType,_pageindex,_pagesize,_async,curr){//curr为分页器要求传参，详见http://laypage.layui.com/第一个例子，也可见我云笔记1101分页器的问题
////	console.log($('.pagesTbodyLong').parent().width(),$('.table').width(),$('body').width());	
////	console.log(typeType,_typeType,_pageindex,_pagesize,_async,curr)
//	$('.pagesTbodyLong').empty();//清除前页的数据
//	$('.imgcontent').append($('<img src="loading.gif" class="imglong" style="width:'+loadingWidth+';" />'))
//	var urlCon='';
//	if(typeType=='title'){
//		urlCon='';
//		console.log('1title')
//	}else if(typeType=='type'){
//		console.log('2type')
//		urlCon='bytype';
//	}else if(typeType=='secondlevel'){
//		console.log('3secondlevel')
//		urlCon='bysecondlevel';
//	}
//	_async=_async||true;//不传_async，那默认为true，即异步。
////	console.log("/webapi/configservice/config"+urlCon)
//	return $.ajax({//return的原因是，我需要获得回调成功的data。//当然后续不需要return了。
//		type:"get",
//		url:"/webapi/configservice/config"+urlCon,//get
//		data:{		
////			  page: curr || 1 ,//本行为分页器要求传参，发现也可以省略
//			  [typeType]: _typeType,
//			  pageindex:_pageindex,
//			  pagesize:_pagesize,
//		},		
//		success:function(data){			
////			linshi=data;
//			laypage({	
//			    cont: 'biuuu_city',//插件原有，后期改键值
//			    pages: data.pagecount,//插件原有
//			    skip: true,//插件原有
//			    curr: curr || 1,
//			    jump: function(obj,first){//插件原有，本行为分页器要求传参，发现也可以省略
//			//  	console.log(obj.curr)
//			    	queryPagesNum=obj.curr;
//			    	if(!first){ //点击跳页触发函数自身，并传递当前页：obj.curr
//			        	ajaxQuery(queryConditionS,queryParameterS,queryPagesNum,queryPagesCount,true,queryPagesNum)//前一个queryPagesNum是显示第几页内容，后一个queryPagesNum是让分页器页码停留在该页。
////			        	ajaxLastState="ajaxQuery("+queryConditionS+","+queryParameterS+","+queryPagesNum+",2,true,"+queryPagesNum+")";
//			        	
//			     	}	    	
//			//  	
//			    }
//			})
//			if(data.totalcount){//修复totalcountS被赋值为undefined的bug
//				totalcountS=data.totalcount;
//			}else{
//				totalcountS=0;
//			}
////			console.log(typeof(totalcountS)+'1dddddddddd1'+data.totalcount);
//			console.log('访问成功');			
//			$(".paging_content_div .s1").text(queryConditionS);//共有多少条
//			$(".paging_content_div .s2").text(queryParameterS);//共有多少条
//			$(".paging_content_div .s3").text(totalcountS);//共有多少条
//			$('.imgcontent').empty()//清除loading图片
//			if(!data.content){//如果查询为空，直接return。				
//				return;
//			}
////			console.log(data)
//			for(i=0;i<data.content.length;i++){   
//		        $('.pagesTbodyLong').append($('<tr class="text-c findTrLong"><td><input type="checkbox" value="" name=""></td><td>'+parseInt(i+1+(_pageindex-1)*_pagesize)+'</td><td style="display:none">'+data.content[i].guid+'</td><td>'+data.content[i].title+'</td><td>'+data.content[i].version+'</td><td><div     class="longdiv" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;width:100px;background:greenyellow;text-align: center;">'+data.content[i].content+'</div></td><td>'+data.content[i].description+'</td><td>'+data.content[i].type+'</td><td>'+data.content[i].secondlevel+'</td><td>'+data.content[i].firstlevel+'</td><td style="display:none">'+data.content[i].state+'</td><td class="JsonTd">'+data.content[i].currentflag+'</td><td><div class="handle"><div class="handle-icon"></div><div class="handle-btns-wrap" style="width:182px"><div class="handle-btns"><span class="btn" style="display:none">详细</span><span class="btn modify">修改</span><span class="btn open">启用</span><span class="btn del" title="删除">删除</span><span class="arrow-right"></span></div></div></div></td></tr>'));
//		   }			
//		},
//		async:_async,
//		error:function(){
//			console.log('访问失败')			
//		}
//		
//	});		
//}

//1213添加,处理内容或者描述过长而无法显示
$(".pagesTbodyLong").on("click",".tdContent",function(){
	var bol=true;
	try {
		// statements
		JSON.parse($(this).find("span").text());
		// console.log('try')
	} catch(e) {
		// statements
		bol=false;
		// console.log(e);
	}
	if($(this).find("span").text().length==0){
		layer.tips("内容为空",this);
	}else if($(this).find("span").text().length<500){//如果字数小于500则直接tips
		layer.tips($(this).find("span").text(),this);
		// console.log("if")
	}else if(bol){//否则判断是对象不，是的话，则调用自己写的toshow
		// ToShow($(this).find("span").text());
		// console.log($(this).find("span").text())
		localStorage.dataLong=$(this).find("span").text();
		layer.open({
			title: '  ',
			area: ['90%',"80%"],
			maxmin: true,
	   		content: 'json/index.html',     			
		  	type: 2,
		 	closeBtn: 1,
			shadeClose: true,
			scrollbar: false,
			success:function(){
				layer.getChildFrame('body').find("#treeEditor").css("display","none");
				layer.getChildFrame('body').find("#codeEditor").css("width","99%");	
				layer.getChildFrame('body').find("#toSaveLong").css("display","none");
				layer.getChildFrame('body').find("#header").css("display","none");
				layer.getChildFrame('body').find("#splitter").css("display","none");
			}
		});	
		// jsonControlDom=$(".layui-layer-content").find("iframe").context;
		// layer.getChildFrame('body').find("#treeEditor").css("display","none")
	}else{//不是的话，也就无所谓格式，那就直接弹出。
		// console.log("else")
		layer.open({
			title: '查看',
			type: 1,
			title: false,
			closeBtn: 1,
			shadeClose: true,
			// skin: 'yourclass',
		 	content: $(this).find("span").text(),
		 	area:'80%',
		 	scrollbar: false,
		});	
	}	
})
$(".pagesTbodyLong").on("click",".tdDescription",function(){
	if($(this).find("span").text().length==0){
		layer.tips("描述为空",this);
	}else if($(this).find("span").text().length<500){
		layer.tips($(this).find("span").text(),this);		
	}else{
		layer.open({
		  type: 1,
		  title: false,
		  closeBtn: 0,
		  shadeClose: true,
		  // skin: 'yourclass',
		  content: $(this).find("span").text(),
		  area: '80%',
		  scrollbar: false,
		  title:""
		});	
	}	
})
//重置按钮
$(".reset_btn").click(function(){
	ajaxSele1();
	$(".input-text").val("");
	$(".Wdate").val("");
	queryBtnBol=false;
})
//返回顶层
$(function(){$(window).on("scroll",$backToTopFun);$backToTopFun();});
