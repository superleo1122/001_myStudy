(function (window, undefined) {
    var leoQuery = function (selector) {
        return new leoQuery.prototype.init(selector);
    };

    leoQuery.prototype = {
        constructor: leoQuery,
        init: function (selector) {
            /*
                1. 传入'' null undefined NaN 0 false ，会返回空的jQuery对象
                2. 字符串
                    若是代码片段，则会将创建好的DOM元素存储到jQuery对象中返回
                    若是选择器，会将找到的所有元素存储到jQuery对象中返回
                3. 数组，会将数组中的存储的元素一次存储到jQuery对象中立即返回
                4. 除上诉基本类型外，会将传入的数据存储到jQuery对象中返回
            */

            // 0.去除字符串两端的空格
            selector = leoQuery.trim(selector);

            // 1. 传入'' null undefined NaN 0 false ，会返回空的jQuery对象
            if (!selector) {
                return this;
            }
            // 2. 字符串
            else if (leoQuery.isString(selector)) {
                // 2.1判断是否是代码片段 最短代码片段 <a>
                if (leoQuery.isHTML(selector)){
                    // 1.根据代码片段创建所有元素
                    var temp = document.createElement("div");
                    temp.innerHTML = selector;

                    /*************************************优化**********************************
                    // 2.将创建好的一级元素添加到jQuery中
                    for (var i = 0; i<temp.children.length; i++) {
                        this[i] = temp.children[i];
                    }
                    // 3.给jQuery对象增加length属性
                    this.length = temp.children.length;
                    ***************************************************************************/
                    [].push.apply(this, temp.children); // 将temp.children真数组转成this伪数组

                    // 4.返回加工好的this(jQuery)
                    // return this;
                }
                // 2.2判断是否是选择器
                else {
                    // 1.根据传入的选择器找到对应的元素
                    var res = document.querySelectorAll(selector);
                    // 2.将找到的元素添加到leoQuery上
                    [].push.apply(this,res);
                    // 3.返回加工上的this
                    // return this;
                }
            }
            // 3.数组 (in运算符:若指定属性在制定对象或其原型链中，则返回true; window对象有length属性)
            else if (leoQuery.isArray(selector)) {
                /***************************************优化********************************************
                // 3.1 真数组 (这个判断方法牛鼻，虽然我没看懂)
                if (({}).toString.apply(selector) === "[object Array]") {
                    [].push.apply(this,selector); // 真数组转伪数组
                    return this;
                }
                // 3.2 伪数组
                else {
                    // 在企业开发中，不管是将伪数组转真数组还是将伪数组转伪数组，都统统先转换成真数组，然后再处理(兼容问题)
                    var arr = [].slice.call(selector);
                    [].push.apply(this,arr);
                    return this;
                }
                 **************************************************************************************/
                var arr = [].slice.call(selector);
                [].push.apply(this, arr);
                // return this;
            }
            // 方法处理
            else if (leoQuery.isFunction(selector)) {
                leoQuery.ready(selector);
            }
            // 4. 除上诉基本类型外，会将传入的数据存储到jQuery对象中返回
            else {
                this[0] = selector;
                this.length = 1;
                // return this;
            }
            return this;
        },
        jquery: "1.1.0",
        selector: "",
        length: 0,
        /*
            1. [].push 找到数组里的push方法
            2. 由leoQuery对象调用push
                这里相当于 [].push.apply(this)
         */
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        toArray: function (obj) {
            return [].slice.call(this); // 把实例对象本身转成数组
        },
        get: function (number) {
            // 没有传递参数
            if (arguments.length === 0) {
                return this.toArray();
            }
            // 传递的不是负数
            else if (number >= 0) {
                return this[i];
            }
            // 传递负数
            else {
                return this[this.length + number];
            }
        },
        eq: function (number) {
            // 没有传递参数
            if (arguments.length === 0) {
                return new leoQuery();
            } else {
                return leoQuery(this.get(number));
            }
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        each: function (fn) {
            return leoQuery.each(this,fn);
        }
    };

    /*
     *  这里为leoQuery及其原型都添加了extend方法，此方法的作用在于，extend方法在哪个环境中执行，就将传入的参数作为属性添加到哪个环境中
     *      在这里则意味着，若是leoQuery直接调用extend方法，则将参数添加到leoQuery类中；若是实例对象调用了extend方法，则将参数添加到实例对象中
     */
    leoQuery.extend = leoQuery.prototype.extend = function(obj){
        for (var key in obj) {
            this[key] = obj[key];
        }
    };

    leoQuery.extend({
        isString: function (str) {
            return typeof str === "string";
        },
        isHTML: function (str) {
            return str.charAt(0) == "<" && str.charAt(str.length - 1) == ">" && str.length >= 3;
        },
        trim: function (str) {
            if (!leoQuery.isString(str)) return str;
            // 判断是否支持trim方法，低版本ie不支持trim方法
            if (str.trim) {
                return str.trim();
            } else {
                // 匹配开头的一个或多个空格 或 结尾一个或多个空格 (全局匹配)
                return str.replace(/^\s+|\s+$/g, "");
            }
        },
        isObject: function (obj) {
            return typeof obj === "object";
        },
        isWindow: function (obj) {
            return obj === window;
        },
        isArray: function (obj) {
            if (leoQuery.isObject(obj) && !leoQuery.isWindow() && "length" in obj) {
                return true;
            } else {
                return false;
            }
        },
        isFunction: function (obj) {
            return typeof obj === "function";
        },
        ready: function (fn) {
            // 判断DOM是否加载完毕
            if (document.readyState == "complete") {
                /*
                    document.readyState属性有如下状态
                        uninitialized - 还未开始载入
                        loading  载入中
                        interactive  已加载，文档与用户可以开始交互
                        complete  载入完成

                    onreadystatechange事件 就是专门用于监听document.readyState属性的改变的
                */
                fn();
            } else if (document.addEventListener) {
                document.addEventListener("DOMContentLoaded",function () {
                    fn();
                })
            } else {
                // 但对于IE8及其以下版本浏览器，不能使用addEventListener方法，同时也没有DOMContentLoaded事件，为此，要使用attachevent()方法及onreadystatechanage事件
                document.attachEvent("onreadystatechange",function () {
                    if (document.readyState == "complete") {
                        fn();
                    }
                });
            }
        },
        each: function (obj, fn) {
            // 1.判断是否是数组
            if (leoQuery.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    // var res = fn(i, obj[i]); 修改this
                    var res = fn.call(obj[i], i, obj[i]);
                    if (res === true) {
                        continue;
                    } else if (res === false) {
                        break;
                    }
                }
            }
            // 2.判断是否是对象
            else if (leoQuery.isObject(obj)) {
                for (var key in obj) {
                    // var res = fn(key, obj[key]);
                    var res = fn.call(obj[key], key, obj[key]);
                    if (res === true) {
                        continue;
                    } else if (res === false) {
                        break;
                    }
                }
            }
            return obj;
        },
        map: function (obj, fn) {
            var res = [];
            // 1.判断是否是数组
            if (leoQuery.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var temp = fn(obj[i],i);
                    if (temp) {
                        res.push(temp);
                    }
                }
            }
            // 2.判断是否是对象
            else if (leoQuery.isObject(obj)) {
                for (var key in obj) {
                    var temp = fn(obj[key],key);
                    if (temp) {
                        res.push(temp);
                    }
                }
            }
            return res;
        },
        // 来源: http://www.w3school.com.cn/xmldom/prop_node_nextsibling.asp
        get_nextsibling: function (n) {
            var x = n.nextSibling;
            while (x != null && x.nodeType!=1)
            {
                x=x.nextSibling;
            }
            return x;
        },
        get_previoussibling: function (n) {
            var x=n.previousSibling;
            while (x != null && x.nodeType!=1)
            {
                x=x.previousSibling;
            }
            return x;
        },
        getStyle: function (dom, styleName) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(dom)[styleName];
            } else {
                return dom.currentStyle[styleName];
            }
        },
        addEvent: function (dom, name, callBack) {
            if (dom.addEventListener) {
                dom.addEventListener(name, callBack);
            } else {
                dom.attachEvent("on"+name, callBack);
            }
        }
    });

    // DOM操作相关方法
    leoQuery.prototype.extend({
        empty: function () {
            // 1.遍历所有找到的元素
            this.each(function (index, value) {
                value.innerHTML = "";
            });
            // 2.方便链式变成，这里需要返回this
            return this;
        },
        remove: function (selector) {
            if (arguments.length === 0) {
                // 1.遍历指定元素
                this.each(function (key, value) {
                    // 根据遍历到的元素找到对应的父元素
                    var parent = value.parentNode;
                    // 通过父元素删除指定的元素
                    parent.removeChild(value);
                });    
            } else {
                var $this = this;
                // 1.根据传入的选择器找到对应的元素
                $(selector).each(function (key, value) {
                    // 2.遍历找到的元素，获取对应的类型
                    var type = value.tagName;
                    // 3.遍历指定的元素
                    $this.each(function (k, v) {
                        // 4.获取指定元素的类型
                        var t = v.tagName;
                        // 5.判断找到的元素的类型
                        if (t === type) {
                            // 找到父元素
                            var parentNode = value.parentNode;
                            // 通过父元素删除指定元素
                            parentNode.removeChild(value);
                        }
                    })
                })
            }
            return this;
        },
        html: function (content) {
            if (arguments.length === 0) {
                return this[0].innerHTML;
            } else {
                this.each(function (key, value) {
                    value.innerHTML = content;
                })
            }
        },
        text: function (content) {
            if (arguments.length === 0) {
                var res = "";
                this.each(function (key, value) {
                    res += value.innerText;
                });
                return res;
            } else {
                this.each(function (key, value) {
                    value.innerText = content;
                });
            }
        },
        appendTo: function (sele) {
            // 1.统一的将传入的数据转换为jQuery对象
            var $target = $(sele);
            var $this = this;
            var res = [];
            // 2.遍历去除所有指定的元素
            $target.each(function (key, value) {
                $this.each(function (k, v) {
                    // 3.判断当前是否是第1个指定元素
                    if (key === 0) {
                        value.appendChild(v);
                        res.push(v);
                    } else {
                        // 先拷贝再添加
                        var temp = v.cloneNode(true);
                        value.appendChild(temp);
                        res.push(temp);
                    }
                });
            });
            // 返回所有添加的元素
            return $(res);
        },
        prependTo: function (sele) {
            // 1.统一的将传入的数据转换为jQuery对象
            var $target = $(sele);
            var $this = this;
            var res = [];
            // 2.遍历去除所有指定的元素  (value是target，v是source)
            $target.each(function (key, value) {
                $this.each(function (k, v) {
                    // 3.判断当前是否是第1个指定元素
                    if (key === 0) {
                        value.insertBefore(v, value.firstChild);
                        res.push(v);
                    } else {
                        // 先拷贝再添加
                        var temp = v.cloneNode(true);
                        value.insertBefore(temp, value.firstChild);
                        res.push(temp);
                    }
                });
            });
            // 返回所有添加的元素
            return $(res);
        },
        append: function (sele) {
            // 判断传入的参数是否是字符串
            if (leoQuery.isString(sele)) {
                // todo 进行了遍历，未经测试
                this.each(function (key, value) {
                    value.innerHTML += sele;
                });
            } else {
                $(sele).appendTo(this);
            }
            return this;
        },
        prepend: function (sele) {
            // 判断传入的参数是否是字符串
            if (leoQuery.isString(sele)) {
                // todo 进行了遍历，未经测试
                this.each(function (key, value) {
                    value.innerHTML = sele + value.innerHTML;
                });
            } else {
                $(sele).prependTo(this);
            }
            return this;
        },
        insertBefore: function (sele) {
            // 1.统一的将传入的数据转换为jQuery对象
            var $target = $(sele);
            var $this = this;
            var res = [];
            // 2.遍历去除所有指定的元素  (value是target，v是source)
            $target.each(function (key, value) {
                var parent = value.parentNode;
                $this.each(function (k, v) {
                    // 3.判断当前是否是第1个指定元素
                    if (key === 0) {
                        parent.parentNode.insertBefore(v, value);
                        res.push(v);
                    } else {
                        // 先拷贝再添加
                        var temp = v.cloneNode(true);
                        parent.parentNode.insertBefore(temp, value);
                        res.push(temp);
                    }
                });
            });
            // 返回所有添加的元素
            return $(res);
        },
        insertAfter: function () {
            /*
                9. insertAfter : 将元素添加到指定元素外部的后面
                10. after : 将元素添加到指定元素外部的后面
                    实现9和10之前，先实现以下这两个方法，这两个方法内部需要用到nextSibling和previousSibling属性
                        next([expr]) 获取紧邻的后面同辈元素的元素
                        prev([expr]) 获取元素紧邻的前一个同辈元素
                    实现insertAfter需要用到原生js的nextSibling属性
             */
        },
        replaceAll: function (sele) {
            // 1.统一的将传入的数据转换为jQuery对象
            var $target = $(sele);
            var $this = this;
            var res = [];
            // 2.遍历去除所有指定的元素  (value是target，v是source)
            $target.each(function (key, value) {
                var parent = value.parentNode;
                $this.each(function (k, v) {
                    // 3.判断当前是否是第1个指定元素
                    if (key === 0) {
                        // 1.将元素插入到指定元素的前面
                        $(v).insertBefore(value);
                        // 2.将指定元素删除
                        $(value).remove();
                        res.push(v);
                    } else {
                        // 先拷贝再添加
                        var temp = v.cloneNode(true);
                        // 1.将元素插入到指定元素的前面
                        $(temp).insertBefore(value);
                        // 2.将指定元素删除
                        $(value).remove();
                        res.push(temp);
                    }
                });
            });
            // 返回所有添加的元素
            return $(res);
        },
        replaceWith: function () {

        },
        clone: function (deep) {
            var res = [];
            // 判断是否是深复制 (这里的深浅复制的区别在于是否复制事件)
            if (deep) {
                // 深复制
                this.each(function (key, ele) {
                    // cloneNode传递true表示复制内容及其子元素，原生js的cloneNode方法不能复制事件
                    var temp = ele.cloneNode(true);
                    // 遍历元素中的eventsCache对象
                    $.each(ele.eventsCache, function (name, arrMethod) {
                        $.each(arrMethod, function (index, method) {
                            // 给复制的元素添加事件
                            $(temp).on(name,method);
                        })
                    });
                    res.push(temp);
                });
                return $(res);
            } else {
                // 浅复制
                this.each(function (key, ele) {
                    // cloneNode传递true表示复制内容及其子元素，原生js的cloneNode方法不能复制事件
                    var temp = ele.cloneNode(true);
                    res.push(temp);
                });
                return $(res);
            }
        }
    });

    // 筛选相关方法
    leoQuery.prototype.extend({
        next: function () {
            /*
                9. insertAfter : 将元素添加到指定元素外部的后面
                10. after : 将元素添加到指定元素外部的后面
                    实现9和10之前，先实现以下这两个方法，这两个方法内部需要用到nextSibling和previousSibling属性
                        next([expr]) 获取紧邻的后面同辈元素的元素
                        prev([expr]) 获取元素紧邻的前一个同辈元素
                    实现insertAfter需要用到原生js的nextSibling属性
             */
        },
        prev: function () {
            /*
                9. insertAfter : 将元素添加到指定元素外部的后面
                10. after : 将元素添加到指定元素外部的后面
                    实现9和10之前，先实现以下这两个方法，这两个方法内部需要用到nextSibling和previousSibling属性
                        next([expr]) 获取紧邻的后面同辈元素的元素
                        prev([expr]) 获取元素紧邻的前一个同辈元素
                    实现insertAfter需要用到原生js的nextSibling属性
             */
        },
    });

    // 属性操作相关方法
    leoQuery.prototype.extend({
        attr: function (attr, value) {
            // 1.判断是否是字符串
            if (leoQuery.isString(attr)) {
                // 判断是一个字符串还是两个字符串
                if (arguments.length === 1) {
                    // 在原生js中通过getAttribute和setAttribute设置属性节点，通过[]这个操作符来操作属性
                    return this[0].getAttribute(attr);
                } else {
                    this.each(function (key, ele) {
                        ele.setAttribute(attr, value);
                    })
                }
            }
            // 2.判断是否是对象
            else if (leoQuery.isObject(attr)) {
                var $this = this;
                // 遍历取出所有属性节点的名称和对应的值
                $.each(attr, function (key, value) {
                    // 遍历取出所有元素
                    $this.each(function (index, ele) {
                        ele.setAttribute(key, value);
                    })
                })
            }
            return this;
        },
        prop: function (attr, value) {
            // 1.判断是否是字符串
            if (leoQuery.isString(attr)) {
                // 判断是一个字符串还是两个字符串
                if (arguments.length === 1) {
                    // []用来操作属性
                    return this[0][attr];
                } else {
                    this.each(function (key, ele) {
                        ele[attr] = value;
                    })
                }
            }
            // 2.判断是否是对象
            else if (leoQuery.isObject(attr)) {
                var $this = this;
                // 遍历取出所有属性节点的名称和对应的值
                $.each(attr, function (key, value) {
                    // 遍历取出所有元素
                    $this.each(function (index, ele) {
                        ele[key] = value;
                    })
                })
            }
            return this;
        },
        css: function (attr, value) {
            // 1.判断是否是字符串
            if (leoQuery.isString(attr)) {
                // 判断是一个字符串还是两个字符串
                if (arguments.length === 1) {
                    // []用来操作属性
                    return leoQuery.getStyle(this[0], attr);
                } else {
                    this.each(function (key, ele) {
                        ele.style[attr] = value;
                    })
                }
            }
            // 2.判断是否是对象
            else if (leoQuery.isObject(attr)) {
                var $this = this;
                // 遍历取出所有属性节点的名称和对应的值
                $.each(attr, function (key, value) {
                    // 遍历取出所有元素
                    $this.each(function (index, ele) {
                        ele.style[attr] = value;
                    })
                })
            }
            return this;
        },
        val: function (content) {
            if (arguments.length === 0) {
                return this[0].value;
            } else {
                this.each(function (key, ele) {
                    ele.value = content;
                });
                return this;
            }
        },
        hasClass: function (name) {
            var flag = false;
            if (arguments.length === 0) {
                return flag;
            } else {
                this.each(function (key, ele) {
                    // 1.获取元素中class保存的值
                    var className = " " + ele.className + " ";
                    // 2.给指定字符串的前后也加上空格
                    name = " " + name + " ";
                    // 3.通过indexOf判断是否包含指定的字符串
                    if (className.indexOf(name) != -1) {
                        flag = true;
                        return false;
                    }
                });
                return flag;
            }
        },
        addClass: function (name) {
            if (arguments.length === 0) {
                return this;
            }
            // 1.对传入的类名进行切割
            var arrNames = name.split(" ");
            // 2.遍历取出的所有元素
            this.each(function (key, ele) {
               // 3.遍历数组取出每个类名
               $.each(arrNames, function (index, value) {
                   // 4.判断是否包含指定类名
                   if (!$(ele).hasClass(value)) {
                       ele.className = ele.className + " " + value;
                   }
               })
            });
            return this;
        },
        removeClass: function (name) {
            if (arguments.length === 0) {
                this.each(function (key, ele) {
                    ele.className = "";
                })
            } else {
                // 1.对传入的类名进行切割
                var arrNames = name.split(" ");
                // 2.遍历取出的所有元素
                this.each(function (key, ele) {
                    // 3.遍历数组取出每个类名
                    $.each(arrNames, function (index, value) {
                        // 4.判断是否包含指定类名
                        if ($(ele).hasClass(value)) {
                            ele.className = (" "+ele.className+" ").replace(" "+value+" ", ""); // ele.classList.remove(value); 用这个不香吗？
                        }
                    })
                });
            }
            return this;
        },
        toggleClass: function (name) {
            if (arguments.length === 0) {
                this.removeClass();
            } else {
                // 1.对传入的类名进行切割
                var arrNames = name.split(" ");
                // 2.遍历取出的所有元素
                this.each(function (key, ele) {
                    // 3.遍历数组取出每个类名
                    $.each(arrNames, function (index, value) {
                        // 4.判断是否包含指定类名
                        if ($(ele).hasClass(value)) {
                            // 删除
                            $(ele).remove(value);
                        } else {
                            // 添加
                            $(ele).addClass(value);
                        }
                    })
                });
            }
            return this;
        }
    });

    // 事件操作相关方法
    leoQuery.prototype.extend({
        on: function (name, callBack) {
            // 1.遍历所有元素
            this.each(function (key, ele) {
                // 判断当前元素中是否有保存所有事件的对象
                if (!ele.eventsCache) {
                    ele.eventsCache = {};
                }
                // 判断对象中有没对应类型的数组
                if (!ele.eventsCache[name]) {
                    ele.eventsCache[name] = [];
                    // 将回调函数添加到数组中
                    ele.eventsCache[name].push(callBack);
                    // 添加对应类型的事件
                    $.addEvent(ele, name, function () {
                        $.each(ele.eventsCache[name], function (index, method) {
                            method();
                        });
                    });
                } else {
                    ele.eventsCache[name].push(callBack);
                }
            })
        },
        off: function (name, callBack) {
            // 没有传递参数，移除该元素所有事件
            if (arguments.length === 0) {
                this.each(function (key, ele) {
                    ele.eventsCache = {};
                })
            }
            // 传入一个参数
            else if (arguments.length === 1) {
                this.each(function (key, ele) {
                    ele.eventsCache[name] = [];
                })
            }
            // 传入两个参数
            else if (arguments.length === 2) {
                this.each(function (key, ele) {
                    $.each(ele.eventsCache[name], function (index, method) {
                        // 判断当前方法是否与传入的方法相同
                        if (method === callBack) {
                            ele.eventsCache[name].splice(index, 1);
                        }
                    })
                })
            }
        }
    });

    leoQuery.prototype.init.prototype = leoQuery.prototype;
    window.leoQuery = window.$ = leoQuery;
})(window);