var wxlocation = {};

function saveLocation(latitude, longitude) {
    setCookie("wx-lat", latitude);
    setCookie("wx-lng", longitude);
	wxlocation.latitude = latitude;
	wxlocation.longitude = longitude;
}
function setCookie(name, value) {
    //var days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + 5 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}


function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}


function resetaddress(event) {
    setCookie("wx-lat", "");
    setCookie("wx-lng", "");
    waitloadaddress(event);
}

function waitloadaddress(event) {
	wxlocation.latitude = getCookie("wx-lat");
	wxlocation.longitude = getCookie("wx-lng");
	if (wxlocation.latitude != undefined && wxlocation.latitude != null && wxlocation.latitude.length > 0 && wxlocation.longitude.length > 0) {
    if ($.isFunction(event))
         event();
	return;
}
if (typeof (wxjsconfig.apimode) != 'undefined'
        && (wxjsconfig.apimode == "test" || wxjsconfig.apimode == "demo")
         && typeof (wxjsconfig.testdata) != 'undefined' && typeof (wxjsconfig.testdata.location) != 'undefined'
         && typeof (wxjsconfig.testdata.location.latitude) != 'undefined'
         && typeof (wxjsconfig.testdata.location.longitude) != 'undefined') {    
    saveLocation(wxjsconfig.testdata.location.latitude, wxjsconfig.testdata.location.longitude);
	if ($.isFunction(event))
         event();
}
else
{
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (!isWeixin)
    {
        if ($.isFunction(event))
            event();
    }
    wx.ready(function () {
        toasterextend.showtips("正在获取位置", "info");
        wx.getLocation({
            type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
                toasterextend.hidetips();
                saveLocation(res.latitude, res.longitude);
                if ($.isFunction(event))
                    event();
            },
            fail: function () {
                toasterextend.hidetips();
                if ($.isFunction(event))
                    event();
            }
        });
    });
}
}

