$(function () {
    $("#loginBtn").click(function () {
        $.ajax({
            type: 'POST',
            url: '/webapi/account/login',
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            success: function (msg) {
                console.log(msg);
                if (msg.error != "") {
                    alert(msg.error);
                }
                else if (msg.result){
                    window.location.href = "/auditplatform/html/hd-shenhe.html";
                }
                else {
                    alert("用户或密码有错误,请重新输入!");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.readyState == 4)
                    alert("网络异常");
            }
        });
    });
});
