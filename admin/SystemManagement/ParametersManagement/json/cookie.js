function setCookieLong(name,value,dayNum){
	var timeCookie=new Date();
	timeCookie.setDate(timeCookie.getDate()+dayNum);
	document.cookie=name+"="+value+";expires="+timeCookie;	
}
function getCookieLong(name){
	var arr=document.cookie.split('; ');
	for(var i=0;i<arr.length;i++){
		var nameArr=arr[i].split("=");
		if(nameArr[0]==name){
			return (nameArr[1]);
		}
	}
}
