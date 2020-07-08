# 一、jQuery

## 1. jQuery基础

### 1. jQuery概述

1. jQuery入口函数有四种写法

   + `$(function(){})`     // 推荐写法

2. jQuery入口函数与JavaScript入口函数区别

   + ```js
     // 原生JS
     window.onload = function (ev) {}
     // jQuery
     $(function(){});
     ```

   + 加载模式不同

     1. 原生JS会等DOM元素全部加载完毕，并且图片也加载完毕才会执行
     2. jQuery会等到DOM元素加载完毕，但不等到图片也加载完毕就会执行

   + 是否会覆盖

     1. 原生JS若编写了多个入口函数，后面编写的会覆盖前面编写的
     2. jQuery中编写多个入口函数，后面编写的不会覆盖前面编写的

3. $冲突

   + 当$符与其他库有冲突时，可以通过`jQuery.noConflict()`修改访问符号为我们自定义的符号

4. 核心函数

   + `$()或者jQuery()` 就是jQuery的核心函数，核心函数可以接收以下参数
     1. 一个函数
     2. 接收一个字符串选择器，返回一个jQuery对象，里面保存了找到的DOM元素
     3. 接收一个字符串代码片段，返回一个jQuery对象，里面保存了创建的DOM元素
     4. 接收一个DOM元素，返回一个包装了的jQuery对象

5. jQuery对象是一个伪数组

   + 伪数组：有0到length-1的属性，并且有length属性

### 2. 静态方法

1. 常用静态方法
   + $.each(obj, fn(index,value))
     + jQuery的each方法可以遍历数组和伪数组，而原生的forEach方法只能遍历数组，不能遍历伪数组
   + $.map(obj,fn(value,index))
     + jQuery的map可以遍历数组和伪数组，而原生的map只能遍历数组，不能遍历伪数组
   + $.trim();      // 去除字符串两端的空格
   + $.isWindow()
   + $.isArray()  // 判断传入对象是否是真数组
   + $.isFunction()
   + $.holdReady(true)
     + 传true时暂停ready方法的执行，传false允许ready方法执行，默认是false

### 3. 选择器

1. 内容选择器
   + $("div:empty")     // 找到既没有文本内容也没有子元素的指定元素
   + $("div:parent")     // 找到有文本内容或者有子元素的指定元素
   + $("div:contains('我是div')")     // 找到包含指定文本内容的指定元素
   + $("div:has('span')")     //  找到包含指定子元素的指定元素

### 4. 实例方法

1. 常用实例方法
   + attr(name|pro|key,val|fn)
     + 获取或者设置属性节点的值
     + 如果是获取:无论找到多少个元素, 都只会返回第一个元素指定的属性节点的值
     + 如果是设置:找到多少个元素就会设置多少个元素
     + 如果是设置: 如果设置的属性节点不存在, 那么系统会自动新增
   + removeAttr(name)
     + 会删除所有找到元素指定的属性节点
   + prop方法/removeProp方法
     + 特点和attr/removeAttr方法一致
     + 官方推荐在操作属性节点时,具有 true 和 false 两个属性的属性节点，如 checked, selected 或者 disabled 使用prop()，其他的使用 attr()
   + 操作类方法
     + addClass(class|fn)   // 添加一个类，如果要添加多个, 多个类名之间用空格隔开即可
     + removeClass([class|fn])    //  删除一个类，如果想删除多个, 多个类名之间用空格隔开即可
     + toggleClass(class|fn[,sw])     // 切换类，有就删除, 没有就添加
   + 操作文本相关方法
     + html([val|fn])     // 和原生JS中的innerHTML一模一样
     + text([val|fn])      //  和原生JS中的innerText一模一样
     + val([val|fn|arr])
   + 操作CSS样式
     + $("div").css("width", "100px");
     +  $("div").css("width", "100px").css("height", "100px");   // 链式
     + $("div").css({}）  // 传入一个对象批量设置
     + $("div").css("background")   // 获取样式
   + 尺寸
     + $(".father").width()
     + $(".father").width("500px")
   + 位置
     + $(".son").offset().left     // 相对窗口偏移位
     + $(".son").position().left     // 相对定位元素偏移位，position方法只能获取不能设置
   + 滚动偏移位
     + $(".scroll").scrollTop()
     + $("body").scrollTop()+$("html").scrollTop()   // 为了保证浏览器的兼容, 获取网页滚动的偏移位需要按照如下写法
     + $(".scroll").scrollTop(300)
     +  $("html,body").scrollTop(300); // 设置网页滚动偏移位，为了保证浏览器的兼容, 设置网页滚动偏移位的时候必须按照如下写法
   
### 5. 事件相关方法

1. 事件绑定(两种方式)

   + eventName(fn);  // 编码效率略高/ 部分事件jQuery没有实现,所以不能添加

   + on(eventName, fn);   // 编码效率略低/ 所有js事件都可以添加

   + jQuery的事件可以添加多个相同或者不同类型的事件,不会覆盖

1. 事件移除
   + $("button").off();  // off方法如果不传递参数, 会移除所有的事件
   + $("button").off("click");  // off方法如果传递一个参数, 会移除所有指定类型的事件
   + $("button").off("click", test1);  // off方法如果传递两个参数, 会移除所有指定类型的指定事件
3. 事件自动触发
   + $(".father").trigger("click");
     + 如果利用trigger自动触发事件,会触发事件冒泡，会触发默认行为
   + $(".father").triggerHandler("click");
     + 如果利用triggerHandler自动触发事件, 不会触发事件冒泡，不会触发默认行为
4. 自定义事件，想要自定义事件, 必须满足两个条件
   + 事件必须是通过on绑定的
   + 事件必须通过trigger来触发
5. 事件命名空间，想要事件的命名空间有效,必须满足两个条件
   + 事件是通过on来绑定的
   + 通过trigger触发事件
6 事件委托
   + 在需要动态绑定事件的场景中会用到事件委托
7. 移入移出
   + mouseover/mouseout事件, 子元素被移入移出也会触发父元素的事件
   + mouseenter/mouseleave事件, 子元素被移入移出不会触发父元素的事件     ------------推荐大家使用

### 6. 动画
1. 常用方法
   + show   // 执行动画
   + hide    //  隐藏动画
   + toggle    // 切换动画
   + slideDown   // 展开
   + slideUp    //  收起
   + slideToggle      // 切换
   + fadeIn    // 淡入
   + fadeOut     // 淡出
   + fadeToggle   
   + fadeTo    // 淡入到

3. 自定义动画

4. 动画延长&停止

   + delay 方法的作用就是用于告诉系统延迟时长
   + stop  停止动画，传递参数不同所表现的效果不同

### 7. 节点操作
1. 添加节点
    1. 内部插入
       + append(content|fn) / appendTo(content)   会将元素添加到指定元素内部的最后
       + prepend(content|fn) / prependTo(content)    会将元素添加到指定元素内部的最前面
    2. 外部插入
       + after(content|fn)    会将元素添加到指定元素外部的后面
       + before(content|fn)   会将元素添加到指定元素外部的前面
       + insertAfter(content)
       + insertBefore(content)
2. 删除节点
    + remove([expr])    // 利用remove删除之后再重新添加,原有的事件无法响应
    + empty()
    + detach([expr])     // 利用detach删除之后再重新添加,原有事件可以响应
3. 替换节点
    + replaceWith(content|fn)
    + replaceAll(selector)
4. 复制节点
    +  clone([Even[,deepEven]]) 
      + 如果传入false就是浅复制, 如果传入true就是深复制
      + 浅复制只会复制元素, 不会复制元素的事件
      + 深复制会复制元素, 而且还会复制元素的事件

## 2. jQuery原理

1. jQuery本质是一个闭包，使用闭包实现可以避免多个框架的冲突
2. jQuery通过将局部变量添加到window对象来让外界访问内部定义的局部变量
3. jQuery为什么要给自己传递一个window参数?
   + 为了方便后期压缩代码
   + 为了提升查找的效率
4. jQuery为什么要给自己接收一个undefined参数?
   + 为了方便后期压缩代码
   + IE9以下的浏览器undefined可以被修改, 为了保证内部使用的undefined不被修改, 所以需要接收一个正确的undefined