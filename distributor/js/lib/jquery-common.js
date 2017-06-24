!function (factory) {

	// amd & cmd
	if (typeof define == 'function' && (define.amd != undefined || define.cmd != undefined)) {
		define(function (require) {
			var jquery = require("jquery");
			var toasterextend = require('jquery-toaster-extend');
			return factory(jquery,toasterextend);
		});
	} else {
		var ex = factory(jQuery,toasterextend);
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
(function ($,toasterextend) {

	$.isEmpty = function (strVal) {
                if (strVal == null || $.trim(strVal).length < 1) return true;
                else return false;
            }
            $.ajax2 = function (options) {
                var success = options.success;
                options.success = function (data, textStatus) {

                    if (common.loading)
                       common.loading.hide();

                    data = data || {};
                    if (data.error) {
                        if (data.error.length > 40)
                            data.error = "网络不稳定，请退出重新进入！";
                        toasterextend.showtips(data.error, "error", false);
						if (data.errorcontinue == undefined || data.errorcontinue == false)
							return;
                    }
                    if (data.user_notification != undefined) {
                        toasterextend.showtips(data.user_notification, "info");
                        if (data.user_notification_continue == undefined || data.user_notification_continue == false)						
							return;
                    }
                    if (success) {
                        success(data, textStatus);
                    }
                };
                var beforeSend = options.beforeSend;

                options.beforeSend = function (XMLHttpRequest) {					
                    if ("undefined" == typeof (pageIndex) || ("undefined" != typeof (pageIndex)  && pageIndex == 1))
                        common.loading.show();
                    if (beforeSend) {
                        beforeSend(httpRequest, status);
                    }
                };

                options.error = function (XMLHttpRequest, textStatus, errorThrown) {
                    if (common.loading)
                       common.loading.hide();//隐藏转圈动画

                    var errormsg = "访问异常";

                    if (XMLHttpRequest.status != null && XMLHttpRequest.status != 200) {
                        var json = JSON.parse(XMLHttpRequest.responseText);
                        errormsg = JSON.parse(json.Message).error;
                        if (errormsg == undefined || errormsg == '')
                            errormsg = "Http error: " + XMLHttpRequest.statusText;
                    }

                    toasterextend.showtips(errormsg, "error");
                };

                options.async = true;
                $.ajax(options);
            };

            $.getJSON2 = function (url, data, callback) {
                if ($.isFunction(data)) {
                    callback = data;
                    data = undefined;
                }
                $.ajax2({
                    type: 'GET',
                    dataType: 'json',
                    url: url,
                    data: data,
                    success: function (jsondata, textStatus, jqXHR) {
                        if ($.isFunction(callback))
                            callback(jsondata, textStatus, jqXHR);
                    }
                });
            }; 
			
			
     $.fn.countDown = function (settings, to) {
    settings = $.extend({
        startFontSize: '36px',
        endFontSize: '12px',
        duration: 1000,
        startNumber: 10,
        endNumber: 0,
        callBack: function () { }
    }, settings);
    return this.each(function () {

        //where do we start?
        if (!to && to != settings.endNumber) { to = settings.startNumber; }

        //set the countdown to the starting number
        $(this).text(to).css('fontSize', settings.startFontSize);

        //loopage
        $(this).animate({
            'fontSize': settings.endFontSize
        }, settings.duration, '', function () {
            if (to > settings.endNumber + 1) {
                $(this).css('fontSize', settings.startFontSize).text(to - 1).countDown(settings, to - 1);
            }
            else {
                settings.callBack(this);
            }
        });

    });
};
});

