/**
 * Created by Administrator on 2017/3/7.
 */
/*ios微信浏览器上下滚动兼容性问题解决 end*/
$(function () {//DOM文档加载完执行
    wxScrollSolve(document.querySelector('.MainCon'));
});
function wxScrollSolve(scrollWrapObj) {//Scrollobj要滚动的内容外部包裹的容器对象
    if(scrollWrapObj==""||scrollWrapObj==undefined||scrollWrapObj==null){
        return
    }
    var overscroll = function (el) {
        el.addEventListener('touchstart', function () {
            var top = el.scrollTop
                , totalScroll = el.scrollHeight
                , currentScroll = top + el.offsetHeight;
            if (top === 0) {
                el.scrollTop = 1;
            } else if (currentScroll === totalScroll) {
                el.scrollTop = top - 1;
            }
        });
        el.addEventListener('touchmove', function (evt) {
            if (el.offsetHeight < el.scrollHeight)
                evt._isScroller = true;
        })
    };
    overscroll(scrollWrapObj);    /*document.querySelector('.MainCon')*/
    document.body.addEventListener('touchmove', function (evt) {
        if (!evt._isScroller) {
            evt.preventDefault();
        }
    });
}
/*ios微信浏览器上下滚动兼容性问题解决 end*/