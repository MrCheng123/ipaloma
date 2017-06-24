!function (factory) {

	// amd & cmd
	if (typeof define == 'function' && (define.amd != undefined || define.cmd != undefined)) {
		define(function (require) {
			var wx = require('wx');
			return factory(wx);
		});
	} else {
		var ex = factory(wx);
		// CommonJS NodeJS
		if (typeof module !== 'undefined' && typeof exports === 'object') {
			module.exports = ex;
		}
		// without module
		else {
			for (var i in ex) {
				window[i] = ex[i];
			}
		}
	}
}
(function (wx) {

	if ("undefined" == typeof (wxjsconfig) ||
    "undefined" == typeof (wxjsconfig.appid) ||
    "undefined" == typeof (wxjsconfig.timestamp) ||
    "undefined" == typeof (wxjsconfig.noncestr) ||
    "undefined" == typeof (wxjsconfig.signature)) {
        return;
	}
	
	wx.config({
            //debug: true, 
            appId: wxjsconfig.appid, // 必填，公众号的唯一标识
            timestamp: wxjsconfig.timestamp, // 必填，生成签名的时间戳
            nonceStr: wxjsconfig.noncestr, // 必填，生成签名的随机串
            signature: wxjsconfig.signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'showMenuItems', 'hideMenuItems','scanQRCode']
        });
       
		//wx.error(function(res) {			
		//	toasterextend.showtips(res.errMsg, "error");
		//});		
		
		wx.ready(function () {					
                 wx.hideOptionMenu();	
		});	
});
