function resetRem(maxWidth, minWidth, fontSize, designWidth) {
    var config = {}; // 配置项
    config.maxWidth = maxWidth ? maxWidth : 640;
    config.minWidth = minWidth ? minWidth : 320;
    config.fontSize = fontSize ? fontSize : 100;
    config.designWidth = designWidth ? designWidth : 640;
    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    var recalcFun = function() {
        clientWidth = document.documentElement.clientWidth;
        clientWidth = clientWidth >= config.maxWidth ? config.maxWidth : clientWidth;
        clientWidth = clientWidth <= config.minWidth ? config.minWidth : clientWidth;
        document.documentElement.style.fontSize = config.fontSize * (clientWidth / config.designWidth) + 'px';
    };
    recalcFun();
}
resetRem();