     var common = {};
    common.loading = {
        show: function () {
            $("body").append('<div id="loading" class="pin-spinner"><div class="pin-spinner-container pin-spinner-container1"><div class="pin-spinner-circle1"></div><div class="pin-spinner-circle2"></div><div class="pin-spinner-circle3"></div><div class="pin-spinner-circle4"></div></div><div class="pin-spinner-container pin-spinner-container2"><div class="pin-spinner-circle1"></div><div class="pin-spinner-circle2"></div><div class="pin-spinner-circle3"></div><div class="pin-spinner-circle4"></div></div><div class="pin-spinner-container pin-spinner-container3"><div class="pin-spinner-circle1"></div><div class="pin-spinner-circle2"></div><div class="pin-spinner-circle3"></div><div class="pin-spinner-circle4"></div></div></div>');
        },
        hide: function () {
            $("#loading").remove();
        }
    }
$(function(){

 		var Intercept=window.location.search;
 		var urlSplit = Intercept.split('?');
 		if (urlSplit.length < 2)
 			return;
 		var argument = urlSplit[1];
		$.ajax({
			url:'/webapi/ipaloma/detail/distributor/statistic?' + argument,
			type:'get',
			dataType:'json',
			beforeSend:  function (XMLHttpRequest) 
			{
				common.loading.show();
			},
			complete:function()
			{
				 if (common.loading)
                       common.loading.hide();
			},			
			success:function(data){
				if (common.loading)
                       common.loading.hide();
				var arraytime=[];
				 var Intercept_two=Intercept.split('&');
				 for(var i=0;i<Intercept_two.length;i++){
				 	var Intercept_three=Intercept_two[i].split('=')
				 	arraytime.push(Intercept_three[1])
				 	console.log(arraytime)
				 }
				
				 $('.Smalltrianglefont .begin_t').html(arraytime[0].split('%')[0]);
			//开始当前时间
			     var timeranbs=data.timerange.begintime;
				 $('.this_time').html(arraytime[1].split('%')[0]);

			//饼图开始 运用到canvas
			canvas1 = function(){
				var ctx= document.getElementById('can').getContext('2d');
			//  x y ：原点位置  r 半径  sDeg:起始角度  eDeg:最终角度  color：背景颜色   color1：所占比例的圆环背景颜色
			     CanvasRenderingContext2D.prototype.sector = function (x,y,r,sDeg,eDeg,color,color1) {
			             //在CanvasRenderingContext2D上增加一个sector的原型方法
			         this.save();
			         this.beginPath();                      //开始画背景色
			         this.arc(x,y,r,0,Math.PI*2,false);   //画圆  参数依次为 圆心位置  半径  起始角度 最终角度  画圆顺序
			         this.fillStyle=color;                // 设置背景颜色
			         this.fill();
			         this.closePath();
			         this.restore();
			         globalCompositeOperation="source-over";   //设置新旧图的组合方式
			         this.save();
			         this.translate(x, y);
			         this.beginPath();           //开始画扇形   比例扇形
			         this.arc(0,0,r,sDeg,eDeg);  // 画出圆弧
			         this.save();                // 再次保存以备旋转
			         this.rotate(eDeg);         // 旋转至起始角度
			         this.moveTo(r,0);          // 移动到终点，准备连接终点与圆心
			         this.lineTo(0,0);          // 连接到圆心
			         this.restore();            // 还原
			         this.rotate(sDeg);        // 旋转至起点角度
			         this.lineTo(r,0);         // 从圆心连接到起点
			         this.fillStyle=color1;   //设置扇形的背景颜色
			         this.fill();
			         this.closePath();        //扇形结束
			         this.restore()           //还原
			         globalCompositeOperation="source-over";   //设置新旧图的组合方式
			         this.save();
			         this.beginPath();                        //画中间白色的圆
			         this.arc(50,50,35,0,Math.PI*2,false);   //背景圆半径50  中心圆半径30  所以圆环的宽为20
			         this.fillStyle="#fff";         //设置颜色白色
			         this.fill();
			         this.closePath();
			         return this;
			     }
			     function fontAnglecanvas1(){
			     	if($('.Mark_chart1 a').text().length==1){
		    			$('.Pie_chart1 a').css('left','44%');
		    		}else if($('.Pie_chart1 a').text().length==2){
		    			$('.Pie_chart1 a').css('left','44%');
		    		}else if($('.Pie_chart1 a').text().length==3){
		    			$('.Pie_chart1 a').css('left','39%');
		    		}else if($('.Pie_chart1 a').text().length==4){
		    			$('.Pie_chart1 a').css('left','35%');
		    		}else if($('.Pie_chart1 a').text().length==5){
		    			$('.Pie_chart1 a').css('left','32%');
		    		}else if($('.Pie_chart1 a').text().length==6){
		    			$('.Pie_chart1 a').css('left','29%');
		    		}else if($('.Pie_chart1 a').text().length==7){
		    			$('.Pie_chart1 a').css('left','25%');
		    		}
			     }

			    	var allActivity = data.activitycount.unmatchedtopic + data.activitycount.matchedtopic;
			     	var matchedActivity=data.activitycount.matchedtopic;  
			     	var c = allActivity == 0 ? 0 :  matchedActivity / allActivity  * Math.PI * 2;  //  数据比值 在圆中所占的比例
		    		ctx.sector(50,50,50,0,c,"#acd171","#73ba2c").fill();   //调用原型方法sector 补充参数
		    		$('.Pie_chart1 a').html(allActivity);
		    		if (matchedActivity == 0) {
		    			$('.Activity_number_right .Activity_ri_text').html('暂未获得平台补贴');
		    			$('.Activity_ri_text').css({"color":"#787878","marginTop":"1.5rem"});
		    		}
		    		$('.Activity_ri_text span').html(matchedActivity);
		    		fontAnglecanvas1()
		    	
				
				
			}

			canvas1()


			canvas2 = function(){
				var ctx= document.getElementById('can2').getContext('2d');
			//  x y ：原点位置  r 半径  sDeg:起始角度  eDeg:最终角度  color：背景颜色   color1：所占比例的圆环背景颜色
			     CanvasRenderingContext2D.prototype.sector = function (x,y,r,sDeg,eDeg,color,color1) {
			             //在CanvasRenderingContext2D上增加一个sector的原型方法
			         this.save();
			         this.beginPath();                      //开始画背景色
			         this.arc(x,y,r,0,Math.PI*2,false);   //画圆  参数依次为 圆心位置  半径  起始角度 最终角度  画圆顺序
			         this.fillStyle=color;                // 设置背景颜色
			         this.fill();
			         this.closePath();
			         this.restore();
			         globalCompositeOperation="source-over";   //设置新旧图的组合方式
			         this.save();
			         this.translate(x, y);
			         this.beginPath();           //开始画扇形   比例扇形
			         this.arc(0,0,r,sDeg,eDeg);  // 画出圆弧
			         this.save();                // 再次保存以备旋转
			         this.rotate(eDeg);         // 旋转至起始角度
			         this.moveTo(r,0);          // 移动到终点，准备连接终点与圆心
			         this.lineTo(0,0);          // 连接到圆心
			         this.restore();            // 还原
			         this.rotate(sDeg);        // 旋转至起点角度
			         this.lineTo(r,0);         // 从圆心连接到起点
			         this.fillStyle=color1;   //设置扇形的背景颜色
			         this.fill();
			         this.closePath();        //扇形结束
			         this.restore()           //还原
			         globalCompositeOperation="source-over";   //设置新旧图的组合方式
			         this.save();
			         this.beginPath();                        //画中间白色的圆
			         this.arc(50,50,35,0,Math.PI*2,false);   //背景圆半径50  中心圆半径30  所以圆环的宽为20
			         this.fillStyle="#fff";         //设置颜色白色
			         this.fill();
			         this.closePath();
			         return this;
			     }	
			    // for(var i = 0;i<data.marketsale.length;i++){
			    	// if(data.marketsale.length==1||data.marketsale.length==0){
			    	// console.log(data)
		    		function fontAnglecanvas2(){
			    		if($('.Mark_chart1 a').text().length==1){
			    			$('.Mark_chart1 a').css('left','44%');
			    		}else if($('.Mark_chart1 a').text().length==2){
			    			$('.Mark_chart1 a').css('left','44%');
			    		}else if($('.Mark_chart1 a').text().length==3){
			    			$('.Mark_chart1 a').css('left','39%');
			    		}else if($('.Mark_chart1 a').text().length==4){
			    			$('.Mark_chart1 a').css('left','35%');
			    		}else if($('.Mark_chart1 a').text().length==5){
			    			$('.Mark_chart1 a').css('left','32%');
			    		}else if($('.Mark_chart1 a').text().length==6){
			    			$('.Mark_chart1 a').css('left','26%');
			    		}else if($('.Mark_chart1 a').text().length==7){
			    			$('.Mark_chart1 a').css('left','25%');
			    		}
			    	}
			     	if(data.marketsale.length==0){

				      	var maxnum=0;            //获取到的后台数据
				    	var minnum=0;
				     	$('.Mark_chart1 a').html(0);
				     	$('.Market_cost_right .Market_cost_ri_text').html('暂未获得平台补贴');
				     	$('.Market_cost_ri_text').css({"color":"#787878","marginTop":"1.5rem"})
				     	var c=minnum/maxnum*Math.PI*2;  //  数据比值 在圆中所占的比例
			    		ctx.sector(50,50,50,0,c,"#5b84c2","#97b7e0").fill();   //调用原型方法sector 补充参数
			    		$('.Mark_chart1 a').html(maxnum)  //canvas中心数字
			    		$('.Mark_chart1 a').css('left','44%');
				    		
				    }else if(data.marketsale.length==1){
				    	for(var y=0;y<data.marketsale.length;y++){
					    	if(data.marketsale[y].type=='tblipalomaactivity'){
					    		var maxnum=data.marketsale[y].sale;   
					     		var c=maxnum/maxnum*Math.PI*2;  //  数据比值 在圆中所占的比例
					     		ctx.sector(50,50,50,0,c,"#5b84c2","#97b7e0").fill();   //调用原型方法sector 补充参数
					     		$('.Mark_chart1 a').html(data.marketsale[y].sale)
				    			$('.fir_span').html('￥'+maxnum)  //其中
				    			fontAnglecanvas2()
					    	}
				    	}
				    }else{
				    	if(data.marketsale[1].sale>data.marketsale[0].sale){
				    		var maxnum=data.marketsale[1].sale;     
					     	var minnum=data.marketsale[0].sale;  
					     	var c=minnum/maxnum*Math.PI*2;  //  数据比值 在圆中所占的比例
				    		ctx.sector(50,50,50,0,c,"#5b84c2","#97b7e0").fill();   //调用原型方法sector 补充参数
				    		$('.Mark_chart1 a').html(data.marketsale[1].sale)
				    		fontAnglecanvas2()
				    		$('.fir_span').html('￥'+minnum)  //其中
				    		//$('.three_span').html('￥'+minnum) //第一名

				    	}else{
				    		var maxnum=data.marketsale[0].sale;     
					     	var minnum=data.marketsale[1].sale;  
					     	var c=minnum/maxnum*Math.PI*2;  //  数据比值 在圆中所占的比例
				    		ctx.sector(50,50,50,0,c,"#5b84c2","#97b7e0").fill();   //调用原型方法sector 补充参数
				    		fontAnglecanvas2()
				    		$('.fir_span').html('￥'+minnum)  //其中
				    		//$('.three_span').html('￥'+minnum) //第一名
				    	}
				     	
				     }
			    // }
			     

			}
			canvas2()

			canvas3 = function(){
				var ctx= document.getElementById('can3').getContext('2d');
			//  x y ：原点位置  r 半径  sDeg:起始角度  eDeg:最终角度  color：背景颜色   color1：所占比例的圆环背景颜色
			     CanvasRenderingContext2D.prototype.sector = function (x,y,r,sDeg,eDeg,color,color1) {
			             //在CanvasRenderingZContext2D上增加一个sector的原型方法
			         this.save();
			         this.beginPath();                      //开始画背景色
			         this.arc(x,y,r,0,Math.PI*2,false);   //画圆  参数依次为 圆心位置  半径  起始角度 最终角度  画圆顺序
			         this.fillStyle=color;                // 设置背景颜色
			         this.fill();
			         this.closePath();
			         this.restore();
			         globalCompositeOperation="source-over";   //设置新旧图的组合方式
			         this.save();
			         this.translate(x, y);
			         this.beginPath();           //开始画扇形   比例扇形
			         this.arc(0,0,r,sDeg,eDeg);  // 画出圆弧
			         this.save();                // 再次保存以备旋转
			         this.rotate(eDeg);         // 旋转至起始角度
			         this.moveTo(r,0);          // 移动到终点，准备连接终点与圆心
			         this.lineTo(0,0);          // 连接到圆心
			         this.restore();            // 还原
			         this.rotate(sDeg);        // 旋转至起点角度
			         this.lineTo(r,0);         // 从圆心连接到起点
			         this.fillStyle=color1;   //设置扇形的背景颜色
			         this.fill();
			         this.closePath();        //扇形结束
			         this.restore()           //还原
			         globalCompositeOperation="source-over";   //设置新旧图的组合方式
			         this.save();
			         this.beginPath();                        //画中间白色的圆
			         this.arc(50,50,35,0,Math.PI*2,false);   //背景圆半径50  中心圆半径30  所以圆环的宽为20
			         this.fillStyle="#fff";         //设置颜色白色
			         this.fill();
			         this.closePath();
			         return this;
			     }
			     var maxnum=data.verifycount;            //获取到的后台数据
			     var minnum=data.verifycount;
			     var c=minnum/maxnum*Math.PI*2;  //  数据比值 在圆中所占的比例
			     ctx.sector(50,50,50,0,c,"#f99ec9","#f99ec9 ").fill();   //调用原型方法sector 补充参数
			     $('.Numb_char a').html(maxnum);
			}
			canvas3()
			
			//柱形图开始
				//排序代码
					function sort(array,sortField,orderType){
							 if(orderType=='asc')return insertSort(array,sortField).reverse()
							 return  insertSort(array,sortField);
					}
						  
					function insertSort(array, field) {
						var i = 0,
						len = array.length,
						j, d, e, f;
						for (; i < len; i++) {
							for (j = i + 1; j < len; j++) {
								if (array[i][field] < array[j][field]) {
									d = array[j][field];
									array[j][field] = array[i][field];
									if (field == 'headcount') {
										e = array[j]['verifycount'];
										f = array[j]['retailercount'];
										g = array[j]['activitytitle'];
										array[j]['verifycount'] = array[i]['verifycount'];
										array[i]['verifycount'] = e;
										array[j]['retailercount'] = array[i]['retailercount'];
										array[i]['retailercount'] = f;
										array[j]['activitytitle'] = array[i]['activitytitle'];
										array[i]['activitytitle'] = g;
									}
									if (field == 'verifycount') {
										e = array[j]['headcount'];
										f = array[j]['retailercount'];
										g = array[j]['activitytitle'];
										array[j]['headcount'] = array[i]['headcount'];
										array[i]['headcount'] = e;
										array[j]['retailercount'] = array[i]['retailercount'];
										array[i]['retailercount'] = f;
										array[j]['activitytitle'] = array[i]['activitytitle'];
										array[i]['activitytitle'] = g;
									}
									if (field == 'retailercount') {
										e = array[j]['headcount'];
										f = array[j]['verifycount'];
										g = array[j]['activitytitle'];
										array[j]['headcount'] = array[i]['headcount'];
										array[i]['headcount'] = e;
										array[j]['verifycount'] = array[i]['verifycount'];
										array[i]['verifycount'] = f;
										array[j]['activitytitle'] = array[i]['activitytitle'];
										array[i]['activitytitle'] = g;
									}
									array[i][field] = d;
								}
							}
						}
						return array;
					}


					

			//核销按钮
		
			
				var flag=true;
				$('.thre_iptn_left').click(function(){
					if(flag){
						flag=false;
						$('.triangle_left1_top,.triangle_cent_top,.triangle_right_top').removeClass('border-color_red2');
						$('.triangle_cent_bottom,.triangle_right_bottom').removeClass('border-color_red');
						$('.triangle_left1_bottom').addClass('border-color_red');
						var array = data.activities;
						sort(array,'headcount','desc'); //调用排序 (降序)
						Mosaic();
					}else{
						flag=true;
						
						$('.triangle_left1_bottom').removeClass('border-color_red');
						$('.triangle_left1_top').addClass('border-color_red2');
						var array = data.activities;
						sort(array,'headcount','asc'); //调用排序 (升序)
						Mosaic();
					}
				})
			
		
				/*$('.thre_iptn_left').on('click',function(){
					$('.triangle_left1_top,.triangle_cent_top,.triangle_right_top').removeClass('border-color_red2');
					$('.triangle_cent_bottom,.triangle_right_bottom').removeClass('border-color_red');
					$('.triangle_left1_bottom').addClass('border-color_red');
					var array = data.activities;
						sort(array,'headcount','desc'); //调用排序 (降序)
						Mosaic();
				})
			
			
				$('.triangle_left1_top').on('click',function(event){
					$('.triangle_left1_bottom').removeClass('border-color_red');
					$('.triangle_left1_top').addClass('border-color_red2');
					event.stopPropagation();
					var array = data.activities;
						sort(array,'headcount','asc'); //调用排序 (升序)
						Mosaic();
				})	*/
			
			//人数按钮
			var flag1=true;
			$('.thre_iptn_cent').click(function(){
				if(flag1){
					flag1=false;
					$('.triangle_cent_top,.triangle_left1_top,.triangle_right_top').removeClass('border-color_red2');
					$('.triangle_left1_bottom,.triangle_right_bottom').removeClass('border-color_red');
					$('.triangle_cent_bottom').addClass('border-color_red');
					var array = data.activities;
					sort(array,'verifycount','desc'); //调用排序(降序)
					Mosaic();
				}else{
					flag1=true;
					
					$('.triangle_cent_bottom').removeClass('border-color_red');
					$('.triangle_cent_top').addClass('border-color_red2');
					event.stopPropagation();
					var array = data.activities;
					sort(array,'verifycount','asc'); //调用排序 (升序)
					Mosaic();
				}
			})
				/*$('.thre_iptn_cent').on('click',function(){
					$('.triangle_cent_top,.triangle_left1_top,.triangle_right_top').removeClass('border-color_red2');
					$('.triangle_left1_bottom,.triangle_right_bottom').removeClass('border-color_red');
					$('.triangle_cent_bottom').addClass('border-color_red');
					var array = data.activities;
					sort(array,'verifycount','desc'); //调用排序(降序)
					Mosaic();
				})
	 			$('.triangle_cent_top').on('click',function(event){
	 				$('.triangle_cent_bottom').removeClass('border-color_red');
					$('.triangle_cent_top').addClass('border-color_red2');
					event.stopPropagation();
					var array = data.activities;
					sort(array,'verifycount','asc'); //调用排序 (升序)
					Mosaic();
				})*/
			//门店按钮
			var flag2=true;
			$('.thre_iptn_right').click(function(){
				if(flag2){
					flag2=false;
					$('.triangle_right_top,.triangle_left1_top,.triangle_cent_top').removeClass('border-color_red2');
					$('.triangle_left1_bottom,.triangle_cent_bottom').removeClass('border-color_red');
					$('.triangle_right_bottom').addClass('border-color_red');
					var array = data.activities;
					sort(array,'retailercount','desc'); //调用排序(降序)
					Mosaic();
				}else{
					flag2=true;
					
					$('.triangle_right_bottom').removeClass('border-color_red');
					$('.triangle_right_top').addClass('border-color_red2');
					event.stopPropagation();
					var array = data.activities;
					sort(array,'retailercount','asc'); //调用排序 (升序)
					Mosaic();
				}
			})

				$(document).on('click',function(){
					$('.thre_iptn_cent').css('background','#fff');
					$('.triangle_cent_tops').css('color','#f4c33a');
					$('.triangle_cent_bottom').removeClass('border-color_red');
					$('.triangle_cent_top').removeClass('border-color_red2');
					$('.thre_iptn_right').css('background','#fff');
					$('.triangle_right_tops').css('color','#4cb8e9');
					$('.triangle_right_bottom').removeClass('border-color_red');
					$('.triangle_right_top').removeClass('border-color_red2');
					$('.thre_iptn_left').css('background','#fff');
					$('.triangle_left_top').css('color','#f18858');
					$('.triangle_left1_bottom').removeClass('border-color_red');
					$('.triangle_left1_top').removeClass('border-color_red2');
				})
				/*$('.thre_iptn_right').on('click',function(){
					$('.triangle_right_top,.triangle_left1_top,.triangle_cent_top').removeClass('border-color_red2');
					$('.triangle_left1_bottom,.triangle_cent_bottom').removeClass('border-color_red');
					$('.triangle_right_bottom').addClass('border-color_red');
					var array = data.activities;
					sort(array,'retailercount','desc'); //调用排序(降序)
					Mosaic();
				})
	 			$('.triangle_right_top ').on('click',function(event){
	 				$('.triangle_right_bottom').removeClass('border-color_red');
					$('.triangle_right_top').addClass('border-color_red2');
					event.stopPropagation();
					var array = data.activities;
					sort(array,'retailercount','asc'); //调用排序 (升序)
					Mosaic();
				})*/


				Mosaic()
				function Mosaic(){
					var verificationnumber=data.activities;
						console.log(verificationnumber.length);
						var str='';
						for(var i = 0;i < verificationnumber.length;i++){

							var str6_1= verificationnumber[i].headcount;
							var str6_2= verificationnumber[i].verifycount;
							var str6_3= verificationnumber[i].retailercount;
							var verifycountsumber_percentage = toPercent3(str6_1/300); 
							var verifycountcenber_percentage = toPercent3(str6_2/300); 
							var verifycountbotber_percentage = toPercent3(str6_3/300); 
							$('.activeson1_right1 a').html(str6_1);
							$('.activeson1_right2 a').html(str6_2);
							$('.activeson1_right3 a').html(str6_3);
							var colors = verificationnumber[i].matched == 1 ? 'colorif' : '';  //判断颜色
							str+="<li>"+
									"<div class='activeson1'>"+
										"<div class='activeson1_left'>"+
											"<a class='" + colors + "' href='javascript:;'>" + verificationnumber[i].activitytitle + "</a>" +
											'<input type="hidden" value="'+verificationnumber[i].activityid+'">'+
										"</div>"+
										"<div class='line'>"+"</div>"+
										"<div class='activeson1_right'>"+
											'<div id="activeson1_right11" class="activeson1_right1" style="width:'+verifycountsumber_percentage+';">'+
												"<a href='javascript:;'>"+
													verificationnumber[i].headcount+
												"</a>"+
											"</div>"+
											'<div id="activeson1_right22" class="activeson1_right2" style="width:'+verifycountcenber_percentage+';">'+
												"<a href='javascript:;'>"+
													verificationnumber[i].verifycount+
												"</a>"+
											"</div>"+
											'<div id="activeson1_right33" class="activeson1_right3" style="width:'+verifycountbotber_percentage+';">'+
												"<a href='javascript:;'>"+
													verificationnumber[i].retailercount+
												"</a>"+
											"</div>"+
										"</div>"+
									"</div>"+
								 "</li>"

								
						}
						


						function toPercent3(point){
							//var str=Number(point*100).toFixed(0);
							var str=parseInt(Number(point*10000))/100; //因为四舍五入会超过100%；所以直接取小数点后两位即可
							str+="%";
							return str;
						}

						$('.Bar_charts').html(str)

				}
			
			},
			error:function(jqXHR){
					//console.log('异常');
					console.warn('wechat/detail error');
					var jqXHRstr=JSON.stringify(jqXHR.status);

					//console.log(jqXHRstr.charAt(0))
					if(jqXHRstr.charAt(0)==3){
						tishi('请求重定向')
					}else if(jqXHRstr.charAt(0)==4){
		            	tishi('请求错误');
		            }else if(jqXHR.status==5){
		            	tishi('服务器错误');
		            }
		        //请求错误出现弹窗
		            function tishi(content) {
						var html ='<div id="mask" style="width:100%;height:100%;background: rgba(0,0,0,0.4);position: fixed;left: 0;top: 0;z-index: 100;">'+'</div>' +'<div class="xiaoxi none" id="msg" style="z-index:9999;left: 5%;width: 90%;position: fixed;background:none;top:50%;"> <p class="msg" style="background: none repeat scroll 0 0 #000; border-radius: 30px;color: #fff; margin: 0 auto;padding: 1.5em;text-align: center;width: 70%;opacity: 0.8;"></p></div>';
						$(document.body).append(html); 
						$("#msg,#mask").show();
						$(".msg").html(content);
						setTimeout('$("#msg,#mask").fadeOut()', 3000);
					}
				}

		});


 		//活动统计下面三个按钮
		$('.thre_iptn_left').on('click',function(event){
			event.stopPropagation();
			$(this).css('background','#f18858').find('.triangle_left_top').css('color','#fff')
			$(this).find('.triangle_right_bottom').addClass('border-color_red').siblings().removeClass('border-color_red')
			$('.thre_iptn_cent').css('background','#fff');
			$('.triangle_cent_tops').css('color','#f4c33a');
			$('.triangle_cent_bottom').removeClass('border-color_red');
			$('.thre_iptn_right').css('background','#fff');
			$('.triangle_right_tops').css('color','#4cb8e9');
			$('.triangle_right_bottom').removeClass('border-color_red');
		});
		$(document).on('click',function(){
			$('.thre_iptn_cent').css('background','#fff');
			$('.triangle_cent_tops').css('color','#f4c33a');
			$('.triangle_cent_bottom').removeClass('border-color_red');
			$('.thre_iptn_right').css('background','#fff');
			$('.triangle_right_tops').css('color','#4cb8e9');
			$('.triangle_right_bottom').removeClass('border-color_red');
			$('.thre_iptn_left').css('background','#fff');
			$('.triangle_left_top').css('color','#f18858');
			$('.triangle_right_bottom').removeClass('border-color_red');
		})
		$('.thre_iptn_cent').on('click',function(event){
			event.stopPropagation();
			$(this).css('background','#f4c33a').find('.triangle_cent_tops').css('color','#fff')
			$(this).find('.triangle_cent_bottom').addClass('border-color_red').siblings().removeClass('border-color_red')
			$('.thre_iptn_left').css('background','#fff');
			$('.triangle_left_top').css('color','#f18858');
			$('.triangle_right_bottom').removeClass('border-color_red');
			$('.thre_iptn_right').css('background','#fff');
			$('.triangle_right_tops').css('color','#4cb8e9');
			$('.triangle_right_bottom').removeClass('border-color_red');
		});
		$('.thre_iptn_right').on('click',function(event){
			event.stopPropagation();
			$(this).css('background','#4cb8e9').find('.triangle_right_tops').css('color','#fff')
			$(this).find('.triangle_right_bottom').addClass('border-color_red').siblings().removeClass('border-color_red');
			$('.thre_iptn_left').css('background','#fff');
			$('.triangle_left_top').css('color','#f18858');
			$('.triangle_right_bottom').removeClass('border-color_red');
			$('.thre_iptn_cent').css('background','#fff');
			$('.triangle_cent_tops').css('color','#f4c33a');
			$('.triangle_cent_bottom').removeClass('border-color_red');
		});
})
