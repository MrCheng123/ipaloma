//ToShow($("p").text());
function ToShow(text){//参数为文本
	var tips_frameBol=true;
	var b=JSON.parse(text);
	var str='<div style="background:-gray;padding:10px;">{'
	var countI=0;//储存共有多少个键值对，即循环多少次
	var numI=0;
	for(i in b){
		countI++;
	}
	for(i in b){
		numI++;
		str+='<p>'
		if(typeof(b[i])=='string'){//字符串，键入p值入span
			str+='<span style="color:red">"'
			+i
			+'"</span> : <span>"'
			+b[i]
			+'"</span>'
//			+',</p>'			
		}else if(jQuery.isArray(b[i])){//数组，键入p值入span
			for(j in b[i]){
				if(jQuery.isArray(b[i][j])||jQuery.isPlainObject(b[i][j])){
					console.log("ddddd")
				}				
			}
			str+='<span style="color:red">"'
			+i
			+'"</span> : <span>["'
			+b[i]
			+'"]</span>'
//			+',</p>'
		}else if(jQuery.isPlainObject(b[i])){//对象，键入p值入span
			var ccc='';
			var countJ=0;//储存共有多少个键值对，即循环多少次
			var numJ=0;
			for(j in b[i]){
				countJ++;
			}
			for(j in b[i]){		
				numJ++;
				if(jQuery.isArray(b[i][j])||jQuery.isPlainObject(b[i][j])){					
					ccc='"提示":"数据结构过于复杂，建议从修改界面查看此处"';
//					tips_frameBol=false;
					break;
					
				}else{
					
					ccc+='<p style="text-indent:70px;"><span style="color:blue">"'
					+j
					+'"</span> : <span style="color:green">'
					+JSON.stringify(b[i][j])
					+'</span>';
					if(numJ!=countJ){
						ccc+=','	
					}
					ccc+='</p>'	
				}
			}			
			str+='<span style="color:red">"'
			+i
			+'"</span> : <span>{'
//			+JSON.stringify(b[i])
			+ccc
			+'}</span>';	
		}
		if(countI!=numI){
			str+=','		
		}
		str+='</p>'	
	}
	str+='}</div>'

	if(tips_frameBol){
		layer.open({
		  type: 1,
		  title: "   ",
		  closeBtn: 1,
		  shadeClose: true,
		  skin: 'yourclass',
		  content: str,
		  area: '80%',
		  maxmin:true,
		});	
	}else{
		layer.alert('数据结构过于复杂，建议从修改界面查看', {icon: 5});
	}
}