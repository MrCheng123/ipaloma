/**
 * scroll
 * 2017/11/13
 */

;(function($){
    // 'use strict';
    var win = $("table.notify table");
    var doc = $("table.notify tbody");
    var $win = $(win);
    var $doc = $(doc);
    $.fn.Drop_down_loading = function(options){
        return new qixiaofei_down(this, options);
    };
    var qixiaofei_down = function(element, options){
        var me = this;
        me.$element = element;
        // 上方是否插入DOM
        me.upInsertDOM = false;
        // loading状态
        me.loading = false;
        // 是否锁定
        me.isLockUp = false;
        me.isLockDown = false;
        // 是否有数据
        me.isData = true;
        me._scrollTop = 0;
        me._threshold = 0;
        me.init(options);
    };
    // 初始化
    qixiaofei_down.prototype.init = function(options){
        var me = this;
        me.opts = $.extend(true, {}, {
            gundong : me.$element,                                            
            domDown : {                                                          // 下方
                domClass   : 'dropload-down',
                domRefresh : '<div class="dropload-refresh">下拉加载</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>正在加载</div>',
                domNoData  : '<div class="dropload-noData">数据加载完毕</div>'
            },
            autoLoad : true,                                                     // 自动
            distance : 60,                                                       // 拉动
            threshold : '',                                                      // 提前加载距离
            // loadUpFn : '',                                                     // 上
            loadDownFn : ''                                                      // 下
        }, options);
        // 如果加载下方，事先在下方插入DOM
        if(me.opts.loadDownFn != ''){
            me.$element.append('<div class="'+me.opts.domDown.domClass+'">'+me.opts.domDown.domRefresh+'</div>');
            me.$domDown = $('.'+me.opts.domDown.domClass);
        }
        // 计算提前加载距离(现在用不到)
        if(!!me.$domDown && me.opts.threshold === ''){
            // 默认滑到加载区2/11处时加载
            me._threshold = Math.floor(me.$domDown.height()*2/11);
        }else{
            me._threshold = me.opts.threshold;
        }
        // 判断滚动区域
        if(me.opts.gundong == win){
            me.$gundong = $win;
            // 获取文档高度
            me._scrollContentHeight = $doc.height();
            // 获取win显示区高度  —— 这里有坑
            me._scrollWindowHeight = doc.documentElement.clientHeight;
        }else{
            me.$gundong = me.opts.gundong;
            me._scrollContentHeight = me.$element[0].scrollHeight;
            me._scrollWindowHeight = me.$element.height();
        }
        qixiaofeiload(me);
        // 窗口调整
        $win.on('resize',function(){
            if(me.opts.gundong == win){
                // 重新获取win显示区高度
                me._scrollWindowHeight = win.innerHeight;
            }else{
                me._scrollWindowHeight = me.$element.height();
            }
        });
        me.$gundong.off('scroll').on('scroll',function(){
            me._scrollTop = me.$gundong.scrollTop();
            // 滚动页面触发加载数据
            if(me.opts.loadDownFn != '' && !me.loading && !me.isLockDown && (me._scrollContentHeight - me._threshold) <= (me._scrollWindowHeight + me._scrollTop)){
                loadDown(me);
            }
            return false;
        });
    };
    // 如果文档高度不大于窗口高度，(数据少的话)，就让他自动加载下方数据(其实这块是通用的别管数据多不多)
    function qixiaofeiload(me){
        if(me.opts.autoLoad){
            if((me._scrollContentHeight - me._threshold) <= me._scrollWindowHeight){
                loadDown(me);
            }
        }
    }
    // 重新获取文档（就是你要加载的那个框 比如 window）高度
    function fnRecoverContentHeight(me){
        if(me.opts.gundong == win){
            me._scrollContentHeight = $doc.height();
        }else{
            me._scrollContentHeight = me.$element[0].scrollHeight;
        }
    }
    // 加载下方
    function loadDown(me){
        me.direction = 'up';
        me.$domDown.html(me.opts.domDown.domLoad);
        me.loading = true;
        me.opts.loadDownFn(me);
    }
    // 锁定数据
    qixiaofei_down.prototype.lock = function(direction){
        var me = this;
        // 如果不指定方向
        if(direction === undefined){
            // 如果操作方向向上
            if(me.direction == 'down'){
                me.isLockUp = true;
            }else{
                me.isLockUp = true;
                me.isLockDown = true;
            }
        // 如果指定锁上方
        }else if(direction == 'up'){
            me.isLockUp = true;
        // 如果指定锁下方
        }else if(direction == 'down'){
            me.isLockDown = true;
            //因为滑动到下面，再滑上去点tab，direction=down，所以有bug
            me.direction = 'up';
        }
    };
    // 解锁
    qixiaofei_down.prototype.unlock = function(){
        var me = this;
        // 简单粗暴解锁
        me.isLockUp = false;
        me.isLockDown = false;
       //因为滑动到下面，再滑上去点tab，direction=down，所以有个bug
        me.direction = 'up';
    };
    // 无数据
    qixiaofei_down.prototype.noData = function(flag){
        var me = this;
        if(flag === undefined || flag == true){
            me.isData = false;
        }else if(flag == false){
            me.isData = true;
        }
    };
    // 重置 
    qixiaofei_down.prototype.resetload = function(){
        var me = this;
        if(me.direction == 'down' && me.upInsertDOM){
            me.$domUp.css({'height':'0'}).on('webkitTransitionEnd mozTransitionEnd transitionend',function(){
                me.loading = false;
                me.upInsertDOM = false;
                $(this).remove();
                fnRecoverContentHeight(me);
            });
        }else if(me.direction == 'up'){
            me.loading = false;
            // 如果有数据
            if(me.isData){
                // 加载区修改样式
                me.$domDown.html(me.opts.domDown.domRefresh);
                fnRecoverContentHeight(me);
                qixiaofeiload(me);
            }else{
                // 如果没数据
                me.$domDown.html(me.opts.domDown.domNoData);
            }
        }
    };
    // css过渡
    function fnTransition(dom,num){
        dom.css({
            '-webkit-transition':'all '+num+'ms',
            'transition':'all '+num+'ms'
        });
    }
})(window.jQuery);