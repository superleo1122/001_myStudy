# 一、JavaScript

## 1. JavaScript基础

### 1. 基础知识

1. JS常见输出方式

   + 通过弹窗输出
     + alert() 
     + confirm()
     + prompt()
   + 通过网页内容区域形式输出
     + document.write()  // 若输出内容不是数字，需要用单引号或者双引号括起来
   + 通过开发者工具控制台输出
     + console.log()   // 普通输出
     + console.warn()  // 警告输出
     + console.error()  // 错误输出

2. 常量

   + 整型常量
   + 实数常量
   + 字符串常量
   + 布尔常量
   + 自定义常量，通过const定义

3. 变量

   + 在ES6之前js可以先使用变量再定义变量，这样不会报错，因为浏览器会进行一个预处理，即将当前代码中所有变量的定义和函数定义所放到所有代码最前面。

4. 数据类型

   + 基本数据类型
     + Number 数值型
     + String 字符型
     + Boolean 布尔型
     + undefined 变量没有进行初始化或者对象中没有这个变量
     + null 空类型，表明此变量还没有存储有用的值
   + 引用数据类型
     + Object 对象类型
   + 数据类型检测
     + typeof 需要检测的数据

5. 数据转换

   + Number\Boolean\undefined\null 转字符串，常用三种方法

     1. 对于Number\Boolean:	变量名.toString()
     2. String(常量or变量)
     3. 变量or常量 + ""

   + 转换为数值类型

     + 转换方法常用的有三种
       + Number(常量or变量)
       + 通过+号和-号来转换
       + parseInt(字符串)  /  parseFloat(字符串)   ----推荐用
         + parseInt和parseFloat都会从左往右提取数值，一旦遇到非数值就会立即停止，停止的时候还没有提取到任何数值，就返回NaN

     1. String ==> Number
        + 若字符串都是数据，那么正常转
        + 若是一个空串，例如""或者"   "，那么转换后为0
        + 若字符串不仅仅包含数字，那么转换后是NaN
     2. Boolean ==> Number
        + true 是 1
        + false 是 0
     3. undefined ==> Number
        + 转换后为NaN
     4. null ==> Number
        + 转换后是0

   + 转为Boolean类型 （很多使用会发生自动类型转换，特别是使用if）

     + 基本数据类型转换为布尔类型，直接调用 Boolean(常量or变量)
       1. String ==> 布尔
          + 只要字符串有内容就会转为true（只包含一个空串也是true），没有内容则为false
       2. Number ==> 布尔
          + 0 是 false，其余是true
          + NaN是false
       3. undefined ==> 布尔
          + undefined是false
       4. null ==> 布尔
          + null是false
     + 空字符串、0、NaN、undefined、null都是false，其余皆为true

6. 运算注意点

   + 加减乘除
     + 任何非数值类型的数据在参与这四个运算之前，都会被自动的转换为数值类型再进行计算
     + 任何数据和NaN进行计算，结果都是NaN
     + 任何数据和字符串相加，都会被先转换字符串之后再运算
     
   + 取模运算
     
     + 对0取模，结果是NaN
     
   + 关系运算符
     + 比较二者皆为字符串型，那么比较的是字符对应的unicode码
     + 任何数据和NaN进行比较，返回值都是false
     + 非数值型，会先转换为数值类型再比较，当然，先遵循上面的两条
     + 对于判断是否是NaN，不要用==，而要使用isNaN
     
   + 逻辑运算符
     + 若参与运算的数据类型不是布尔类型，其返回值有一个特点(其实是布尔值也一样，&&与||只是返回条件，并不是返回转换后的真假)
       1. && 逻辑与
          + 格式 ： 条件A && 条件B
          + 若条件A不成立成立，返回条件A
          + 若条件A成立，那么条件B不会进行运算，即无论条件B是否成立，都会返回条件B
       2. || 逻辑或 (这个特点特别重要，在很多表达式中会使用)
          + 格式：条件A || 条件B
          + 若条件A成立，返回条件A
          + 若条件A不成立，则条件B不会进行运算，即无论条件B是否成立，都会返回条件B
     
   + 三目运算符(条件运算符)
     
     + 条件表达式 ? 结果A : 结果B
     
   + 扩展运算符

     + 扩展运算符在等号左边，将剩余的数据打包到一个新的数组中

       + ```js
         let [a, ...b] = [1,3,5]; 则 a=1; b=[3,5];
         let arr1 = [1, 3, 5];
         let arr2 = [2, 4, 6];
         let arr = [...arr1, ...arr2]; 
         let arr = [1, 3, 5, 2, 4, 6];
         ```

7. 流程控制语句

   + if

     + 对于非布尔类型的数据，会先转换成布尔类型再判断
     + 对于==或者===判断，将常量写在前面 （why???）

   + switch

     + 格式 

     + ```js
       switch(表达式){
           case 表达式A:
               语句A;
               break;
           case 表达式B:
               语句B;
               break;
           default:
               xxx;
               break;
       }
       ```

     + case判断的是===，而不是==
     + 表达式既可以是常量和变量，也可以是表达式

8. 数组

   + 在JS中，数组空间不够会自动扩容

   + 同一数组可以存储不同数据类型

   + 在JS中数据采用哈希映射来分配空间

   + 创建数组方式

     1. 通过构造函数
        + new Array(size)
        + new Array()
        + new Array(data1,data2,...)
     2. 字面量
        + let arr = [];
        + let arr = [data1,data2,...];

   + 数组的解构赋值 ES6新增

     + 在数组的解构赋值中, 等号左边的格式必须和等号右边的格式一模一样, 才能完全解构

     + 在数组的解构赋值中, 左边的个数可以和右边的个数不一样

     + 在数组的解构赋值中, 右边的个数可以和左边的个数不一样

       + ```js
         let [a, b, c] = [1, 3, 5];
         let [a, b, c] = [1, 3, [2, 4]];
         let [a, b] = [1, 3, 5];
         let [a, b, c] = [1];
         ```

     + 在数组的解构赋值中, 还可以使用ES6中新增的扩展运算符来打包剩余的数据，在数组的解构赋值中, 如果使用了扩展运算符, 那么扩展运算符只能写在最后

       + ```js
         let [a, ...b] = [1, 3, 5];
         ```

   + 常用方法

     + arr.splice() ：替换元素 ，传前两个参数时，可以删除数据

     + arr.push() ：在数组的最后新增一条数据, 并且会将新增内容之后数组当前的长度返回给我们

     + arr.unshift() :  在数组最前面新增数组，会将新增内容之后当前数组的长度返回给我们

     + arr.pop()  :  删除数组中的最后一条数据,  并且将删除的数据返回给我们

     + arr.shift() :　删除数组中的最前面一条数据,  并且将删除的数据返回给我们

     + arr.toString() :  数组转字符串

     + arr.join() ： 将数组转为指定格式字符串，以传入参数作为连接符

     + arr.concat() : 将两个数组拼接为一个数组，数组不能够使用加号进行拼接, 如果使用加号进行拼接会先转换成字符串再拼接

     + arr.reverse() :  对数组中的内容进行反转

     + arr.slice() :  截取数组中指定范围内容，slice方法是包头不包尾(包含起始位置, 不包含结束的位置)

     + arr.indexOf() :  查找元素在数组中的位置，如果找到了指定的元素, 就会返回元素对应的位置，如果没有找到指定的元素, 就会返回-1，indexOf方法默认是从左至右的查找, 一旦找到就会立即停止查找

     + arr.lastIndexOf() :  默认是从右至左的查找, 一旦找到就会立即停止查找，返回值同indexOf

     + arr.includes() :  判断数组中是否包含某个元素，也可以通过indexOf和lastIndexOf的结果, 判断是否是-1即可

     + arr.fill() :  设置数组中所有元素的值为指定的数据

       + ```js
         let arr = ['a','b','c']; //arr.splice(1,2,'d','e'); 参数一为从上面位置开始，参数二为要替换元素的个数，参数三为新的内容
         let res = arr.push("d");
         arr.push("d", "e"); // 接收多个参数
         arr.unshift("m", "w");
         let res = arr.pop();
         let res = arr.shift();
         // 清空数组方法
         arr = [];
         arr.length = 0;
         arr.splice(0, arr.length);
         // 常用方法
         let str =  arr.join("+");
         let res = arr1.concat(arr2);
         let res = arr.reverse();
         let res = arr.slice(1, 3);
         let res = arr.indexOf("d");
         let res = arr.indexOf("d", 4); // 参数1: 需要查找的元素,参数2: 从什么位置开始查找
         let res = arr.includes("d"); 
         ```

9. 预解析

   + 浏览器在执行JS代码时会分成两部分操作：预解析和逐行执行代码
   + 预解析其实就是一个声明提前的过程，它将变量声明和函数声明提升到当前作用域的最前面
   + 注意点：通过let定义的变量不会被提升

10. 获取对象类型

    + typeof 对象   这个主要用来区分基本数据类型

11. 判断对象是否是指定构造函数的实例

    + p instanceof Person  

12. 判断一个对象是否是另一个对象的原型

    + isPrototypeof

13. 判断某一对象中是否拥有某一属性

    + 方式1，使用 in ，只要类中或原型对象中有，就会返回true
      + `"name" in person`
    + 方式2，使用hasOwnProperty()，只会去对象本身查找，不会去原型对象中找
      + `person.hasOwnProperty("name");`

14. 对象解构赋值

    + 对象的解构赋值和数组的解构赋值除了符号不一样，其余一样，对象使用{}
    + 在对象的解构赋值中，左边的变量名称和对象的属性名称必须一致，才能解构出数据

15. 解构赋值的应用场景主要在参数的传递上面

16. for in是专门用来遍历无序的东西的，而对象的属性是无序的，所以for in推荐用来遍历对象

17. 基本数据类型和基本包装类型

    + 通过字面量创建的基本数据类型的数据都是常量
      + let str = "leo"  // 这里的"leo"是常量，只不过保存在str这个变量中，此时str是基本数据类型，只有在特定时候才会转为包装类型(调用它自身方法的时候)，调用后返回的str依然是基本数据类型
      + let str = new String("leo"); 通过这种方式创建的str是对象类型，不是基本类型。
    + 常量特点
      + 常量是不能被修改的，每次修改或者拼接都是生成一个新的
    + 基本数据类型特点：没有属性和方法
    + 对象数据类型特点：有属性和方法
    + 在有些时候，系统能自动把基本数据类型转为对应对象类型，比如str.split()的时候


### 2. 作用域

1. 定义变量两种方式
   + ES6之前：var 变量名称
     + 可以重复定义同名变量，不会报错，后定义覆盖先定义
     + 可以先使用后定义(预解析)
   + ES6之后：let 变量名称
     + 不可以重复定义同名变量
     + 不可以先使用再定义
2. 作用域划分
   + 全局作用域：在JavaScript中{}外面的作用域, 我们称之为全局作用域
   + 局部作用域：在JavaScript中函数后面{}中的的作用域, 我们称之为"局部作用域"
   + 块级作用域：在ES6中只要{}没有和函数结合在一起, 那么应该"块级作用域"，比如if，while，for循环等等
3. 变量划分
   + 全局变量：
     + let : 定义在全局作用域的变量
     + var : 定义在全局作用域和块级作用域的变量
   + 局部变量
     + let : 定义在局部作用域和块级作用域的变量
     + var：定义在局部作用域的变量
   + 注意点：
     + 无论是在块级作用域还是局部作用域，省略let 或者 var关键字就会变成一个全局作用域

### 3.作用域链

1. 全局作用域称为0级作用域

2. 变量在作用域链中的查找规则，变量先在当前作用域链中查找，若没有找到，就去上一级作用域中查找，以此类推直到0级为止，若到达0级还没找到，则报错。

   + ```js
     // 全局作用域 = 0级作用域
     function demo(){
       // 1级作用域
       function(){
          // 2级作用域
       }
     }
     ```

### 4. 函数

1. 一个函数可以有返回值也可以没有返回值

2. 函数没有通过return明确返回值，默认返回undefined，例如这样写`return;`

3. 调用函数时实参个数和形参个数可以不相同

4. 函数也是引用数据类型

5. 每个函数都有一个叫arguments的对象，这个对象保存着传递给函数的实参

6. 为函数形参指定默认值 `function getSum(a="知趣",b="慕课")`

7. 匿名函数应用场景

   + 作为其他函数的参数
   + 作为其他函数的返回值
   + 作为一个立即执行的函数

8. 普通函数定义

   + ```js
     function Sum(){}  // 方式一，可以进行声明提升
     let Add = function(){}; // 方式二 表达式方式 ，不能进行声明提升
     ```

9. 箭头函数

   + ```js
     let 函数名称 = (形参列表) => {};
     ```

   + 注意点

     + 若箭头函数只有一个形参，那么括号可省，当然，不推荐这样做，还是按标准来

10. 递归函数

    + 自己调用自己，每次调用递归函数都会开辟一片新的存储空间，性能不好

### 5. ES5对象

1. 创建对象方式

   + 通过new Object()；

     + ```js
       let obj = new Object(); // 通过关键词new构造调用Object()方法来构造一个对象
       obj.name = "leo";
       obj.say = function(){}
       ```
   
     + 通过｛｝法

     + ```js
       let obj = {};
       obj.name = "leo";
       obj.say = function(){};
       let person = {
           name:'tim',
           say:function(){}
       };
       ```

   + 工厂函数法

     + ```js
       function createPerson(name,age){
           let obj = new Object();
           obj.name = name;
           obj.age = age;
           return obj;
       }
       let person = createPerson("leo",10);
       ```

   + 构造函数法

     + 构造函数本质是工厂函数的简写

     + 它与构造函数区别

       + 构造函数的函数名称首字母必须大写 (其实和普通函数没什么区别，首字母大写只是人为标识而已)
       + 构造函数只能够通过new来调用
         + 通过new关键字来调用函数会自动执行下面操作
           1. 在构造函数中创建一个新的对象
           2. 为这个新对象链接原型
           3. 将这个新对象绑定到函数的this
           4. 若函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象

     + ```js
       function Person(myName){
           this.name = myName;
           this.say = function(){};
       }
       let person = new Person("leo");
       ```

   + 构造函数+原型

     + ```js
       function Person(myName,myAge){
           this.name = myName;
           this.age = myAge;
       }
       Person.prototype = {
           // 保持原有关系
           constructor:Person,
           say:function(){}
       }
       ```

2. 函数和方法

   + 函数
     + 函数没有和其他的类显示的绑定在一起 (其实函数和是全局对象绑定在一起的)
     + 函数可以直接调用
     + 函数内部的this指向window
   + 方法
     + 方法和其他的类显示的绑定在一起
     + 方法不能直接调用，只能通过对象调用
     + 方法内部的this输出的是当前调用的那个对象
   + 函数和方法内部都有一个this属性

3. 对象三角恋

   + 每个构造函数中都有一个默认属性prototype，prototype属性保存一个原型对象
   + 每个原型对象都有一个默认的属性，叫做constructor，constructor指向当前原型对象对应的构造函数
   + 通过构造函数创建出来的实例对象都有一个默认的属性`__proto__`,它指向原型对象

4. 函数对象关系

   + 所有的构造函数都有一个prototype属性，所有prototype属性都指向自己的原型对象
   + 所有的原型对象都有一个constructor属性，所有constructor属性都指向自己的构造函数
   + 所有函数都是Function构造函数的实例对象
   + 所有函数都是对象，包括Function函数自己
   + 所有对象都有`__proto__`属性
   + 普通对象的`__proto__`属性指向创建它的构造函数对应的原型对象
   + 所有对象的`__proto__`属性最终都会指向“Object原型对象”
   + Object原型对象的`__proto__`属性指向null

5. 原型链

   + 对象中`__proto__`组成的链条我们称之为原型链

   + 对象在查找属性和方法时会先在当前对象中找，若对象中没有，则会依次去上一级原型对象中查找，没有找到则报错

   + 注意：在给一个对象不存在的属性设置值的时候，不会去原型对象中查找，若当前对象没有则给当前对象新增一个不存在的属性

     + ```js
       obj.currentType = "新设置的值"；
       ```

   + 相关图

     + <img src=".\003_md-images\one.jpg" alt="1" style="zoom:67%;" />
     + <img src=".\003_md-images\two.jpg" alt="d" style="zoom:40%;" />
     + <img src="D:\03_csstudy\003_workspace\001_webstudy\it666\003_javascript\003_md-images\原型链.jpg" alt="1" style="zoom:45%;" />

6. 封装性

   + 公有的
     + 默认的情况下，对象的属性和方法都是公有的，只要拿到这个对象就能够操作对象的属性和方法

   + 私有的

     + 在构造函数中定义的变量和函数就是私有变量和函数，因为构造函数本质是一个函数

     + 私有变量和函数：外界不能直接访问

     + 私有属性本质上就是局部变量

7. 静态/实例

   + 实例属性/实例方法
     + 在企业开发中通过实例对象访问的属性或方法
   + 静态属性/静态方法
     + 在企业开发中通过构造函数访问的属性或方法

8. 继承

   + es5js继承终极形态

     + 在子类的构造函数中通过call借助父类的构造函数
     + 将子类的原型对象修改为父类的实例对象

     ```js
     function Person(myName,myAge){  // 父类
         this.name = myName;
         this.age = myAge;
     }
     Person.prototype.say = function(){};
     function Student(myName,myAge,myId){  // 子类
         Person.call(this,myName,myAge);
         this.id = myId;
     }
     Student.prototype = new Person();
     Student.prototype.constructor = Student;
     ```

### 6. ES6对象

1. 类定义

   + ```js
     class Person{
         constructor(myName,myAge){
             /*	
              *  实例属性和方法
              *	在ES6标准中，实例属性和实例方法必须都写在constructor中
              */
             this.name = myName;
             this.age = myAge;
             this.hi = function(){};
         }
         
         /*  
          *  原型属性和方法
          *  给原型对象添加方法有两种：
          *      一是如下面的say，直接添加到类里内部
          *		二是在类外部动态添加 Person.prototype.say = function(){}  // 推荐
          *  给原型添加属性只有一种：
          *		在类外部动态添加 Person.prototype.type = "人"
          */
         say(){
             console.log("此方法会添加到原型上");
         }
         
         /*	
          *  静态属性和方法
          *	在ES6标准中，static只支持定义静态方法，不支持定义静态变量，所以还得用`类名.属性`
          */
         Person.id = 1; // 静态属性
         static run(){
             console.log("用static修饰的静态方法");
         }
     }
     ```

2. 继承

   + 通过extends指定继承父类

   + 在子类的构造函数中通过super方法借助父类的构造函数

   + ```js
     class Person{
         constructor(myName,myAge){
             this.name = myName;
             this.age = myAge;
         }
         say(){}
     }
     
     class Student extends Person{
         constructor(myName,myAge,myScore){
             super(myName,myAge);
             this.score = myScore;
         }
         student(){}
     }
     ```

3. 属性访问与删除

   + person.name
   + person["name"]
   + 删除属性 delete person.name /  delete person[name]

4. 

### 7. this相关

1. bind
   + 修改函数或方法中的this为指定对象，并返回修改后的新函数
   + 传递一个一个参数
2. call
   + 修改函数或方法中的this为指定对象，并立即调用修改之后的函数
   + 传递一个一个的参数
3. apply
   + 修改函数或方法中的this为指定对象，并立即调用修改后的函数
   + 以数组形式传递参数

### 8. 深浅拷贝

1. 深拷贝
   + 修改新变量的值不会影响原有变量的值，默认情况下基本数据类型都是深拷贝
2. 浅拷贝
   + 修改新变量的值会影响原有的变量的值，默认情况下引用类型都是浅拷贝
3. Object.assign(p1,p2) 这个方法会将p1的属性和方法复制一份到p2，注意这个方法不是深拷贝

### 9. 数组

1. 遍历数组

   + 传统for循环
   + for in  ----不推荐 for in适合遍历无序的
   + for of  (ES6新推出的)
   + arr.forEach(fn)

2. 查找

   + arr.indexOf("leo")    // 从左往右查找, 找到返回索引, 找不到返回-1
   + arr.lastIndexOf("leo")    //  从右至左查找, 找到返回索引, 找不到返回-1
   + arr.includes("leo")     //  从左往右查找, 找到返回true, 找不到返回false
   + arr.findIndex(fn)      //  定制版的indexOf, 找到返回索引, 找不到返回-1
   + arr.find(fn)      //  find方法如果找到了就返回找到的元素, 如果找不到就返回undefined

3. 筛选

   + arr.filter(fn)     // 将满足条件的元素添加到一个新的数组中返回
   + arr.map(fn)     // 将数组映射到一个另一个数组中

4. 排序

   + arr.sort(fn)  // 可以自定义比较规则

     + ```js
       arr.sort(function (a, b) {
          if(a > b){
             return -1;
          }else if(a < b){
             return 1;
          }else{
             return 0;
          }
       });
       ```

### 10. 字符串

1. 字符串可以看成一个特殊的数组，所以大部分数组的属性/方法字符串都可以通用
2. 常用方法
   + str.length
   + 获取某个字符
     + let ch = str[1]
     + let ch = str.charAt(1)
   + 查找
     + let index = str.indexOf("v")
     + let index = str.lastIndexOf("v")
     + let result = str.includes("v");
   + 拼接
     + let str = str1.concat(str2)
     + let str = str1 + str2   推荐
   + 截取
     + let subStr = str.slice(1,3);
     + let subStr = str.substring(1,3);
     + let subStr = str.substr(1,3);
   + 切割
     + let arr = str.split("-");
   + 开头结尾
     + let result = str.startWith("www");
     + let result = str.endWith("png");
   + 字符串模版
     + let str = `我的名字是${name}`

### 11. 三大对象

1. 本地对象
   + 与js运行环境无关，ECMAScript标准中定义的类，在使用过程中需要我们手动new
   + Boolean Number String Array Function Object Date RegExp
2. 内置对象
   + 与js运行环境无关，ECMAScript中已经帮我们创建好的对象，不需要我们手动new
   + Global  Math  JSON
3. 宿主对象
   + 对于嵌入到网页中的JS来说，其宿主对象就是浏览器, 所以宿主对象就是浏览器提供的对象
   + 包含: Window和Document等，所有的DOM和BOM对象都属于宿主对象。

### 12. 内置对象

1. Math
   + Math.floor()  向下取整   // 直接砍掉所有的小数位就是向下取整
   + Math.ceil()    向上取整  // 只要有小数位就会给整数位+1, 然后砍掉所有小数位
   + Math.round()   四舍五入
   + Math.abs()    绝对值
   + Math.random()   生成随机数  // 会生成一个0~1的随机数, 但是不包括1

### 13. 闭包

1. 闭包是一种特殊的函数
   + 当一个内部函数引用了外部函数的数据(变量/函数)时, 那么内部的函数就是闭包
2. 闭包特点
   + 只要闭包还在使用外部函数的数据, 那么外部的数据就一直不会被释放，也就是说可以延长外部函数数据的生命周期
3. 注意点：当后续不需要使用闭包时候, 一定要手动将闭包设置为null, 否则会出现内存泄漏

## 2. DOM

1. window是一个全局对象，代表浏览器中打开的一个窗口，每个窗口都是一个window对象
2. document是window的一个属性，document代表当前窗口的整个网页，document对象保存了网页上所有内容
3. DOM: 文档对象模型，它定义了访问和操作HTML文档的标准方法

### 1. 获取DOM元素

1. 获取元素
   + document.getElementById()
   + document.getElementByClassName()
   + document.getElementByName()
   + document.getElementByTagName()
   + document.querySelector()
   + document.querySelectorAll()
   + 获取元素的子元素
     + oDiv.children
   + 获取元素中所有的节点 (包含元素节点、属性节点、文本节点)
     + oDiv.childNodes
   + 获取指定节点中的第一个子节点
     + oDiv.firstChild
   + 获取指定元素中的第一个子元素
     + oDiv.firstElementChild
   + 获取指定节点中最后一个子节点
     + oDiv.lastChild
   + 获取指定元素中最后一个子元素
     + oDiv.lastElementChild
   + 通过子元素获取父元素/父节点
     + item.parentElement
     + item.parentNode
   + 获取相邻上一个节点
     + item.previousSibling
   + 获取相邻上一个元素
     + item.previousElementSibling
   + 获取相邻下一个节点
     + item.nextSibling
   + 获取相邻下一个元素
     + item.nextElementSibling
2. 节点 ：HTML页面每一部分都是由节点(元素节点、文本节点、属性节点)组成的

### 2. 节点|属性|内容|样式操作

1. 节点增删改
   + 创建节点
     + document.createElement("span");
   + 添加节点
     + oDiv.appendChild();   // appendChild() 方法会将指定的元素添加到最后
   + 插入节点
     + oDiv.insertBefore(oSpan, oH1);
   + 删除节点 (在js中如果想要删除某一个元素, 只能通过对应的父元素来删除)
     + oDiv.parentNode.removeChild(oDiv);
   + 克隆节点
     + let newDiv =  oDiv.cloneNode(true);  // cloneNode方法默认不会克隆子元素, 如果想克隆子元素需要传递一个true
2. 元素属性操作
   + 获取属性
     + oImg.src    // 通过 . 无法获取自定义属性
     + oImg.getAttribute("src")    // 可以获取自定义属性
   + 修改属性
     + . 运算符
     + setAttribute()  // 当属性不存在时使用这个方法就是新增，属性存在时就是修改
   + 删除元素属性
     + oImg.src = ""	// 并没有删除属性，只是将属性值置空
     + oImg.removeAttribute("src")
3. 元素内容操作
   + 获取和设置元素内容
     + oDiv.innerHTML   // 获取的内容包含标签，不去除两端空格，在设置时会将标签进行转换
     + oDiv.innerText      // 获取的内容不包含标签，会去除两端空格
     + oDiv.textContent  // 获取的内容不包含标签，不会去除两端的空格
4. 元素样式操作
   + 获取元素样式
     + oDiv.style.width    // 只能获取行内样式属性值，不能获取内联及外联样式
     + let style = getComputedStyle(oDiv)      // 读取的是样式的最终属性值  IE9及以上浏览器
     + var style = oDiv.currentStyle;    //  读取的是样式的最终属性值，IE9以下浏览器
   + 设置元素样式
     + oDiv.className = "box";
     + oDiv.style.width = "300px";     // 添加的都是行内样式

### 3. 事件

1. 移入移出

   + onmouseover/onmouseout
     + onmouseover移入到子元素,父元素的移入事件也会被触发
     + onmouseout移出到子元素,父元素的移入事件也会被触发
   + onmouseenter/onmouseleave   : 为了避免未知bug，建议使用这个
     + onmouseenter移入到子元素,父元素的移入事件不会被触发
     + onmouseleave移出到子元素,父元素的移入事件不会被触发

2. 焦点事件

   + onfocus：监听input获取焦点
   + onblur：监听input失去焦点
   + onchange：监听input内容改变，onchange事件只有表单失去焦点的时候, 才能拿到修改之后的数据
   + oninput：oninput事件可以时时获取到用户修改之后的数据, 只要用户修改了数据就会调用(执行)，oninput事件只有在IE9以及IE9以上的浏览器才能使用，在IE9以下, 如果想时时的获取到用户修改之后的数据, 可以通过onpropertychange事件来实现

3. 添加事件三种方式

   + 通过onxxx的方式来添加，由于是给属性赋值, 所以后赋值的会覆盖先赋值

   + 通过`addEventListener("click",fn)`方法添加

     + 事件名称不需要添加on
     + 后添加的不会覆盖先添加的
     + 只支持最新的浏览器IE9

   + 通过`attachEvent("onclick",fn)`方法添加

     + 事件名称必须加上on
     + 后添加的不会覆盖先添加的
     + 只支持低版本的浏览器

   + ```js
     // 兼容性写法
     function addEvent(ele, name, fn) {
         if(ele.attachEvent){
             ele.attachEvent("on"+name, fn);
         }else{
             ele.addEventListener(name, fn);
         }
     }
     ```

4. 事件对象

   + 事件对象就是一个系统自动创建的一个对象，当注册的事件被触发的时候, 系统就会自动创建事件对象
   + 注意点：
     + 在高级版本的浏览器中, 会自动将事件对象传递给回调函数
     + 在低级版本的浏览器中, 不会自动将事件对象传递给回调函数
     + 在低级版本的浏览器中, 需要通过window.event来获取事件对象
   + 获取事件对象的兼容性写法
     + `event = event || window.event;`
   + 事件对象属性
     + currentTarget和target
       + currentTarget：事件沿着DOM元素触发时事件的当前目标，它总是指向事件绑定的元素。因为事件触发时，必然要找到处理它的事件处理程序。
       + target：触发事件对象的引用，它总是指向事件触发的元素。此属性可以用来实现事件委托

5. 阻止事件的默认行为三种方法

   + return false; // 企业开发推荐
   + event.preventDefault();  // preventDefault方法只支持高级版本的浏览器
   + event.returnValue = false; // IE9以下的浏览器

6. 事件执行的三个阶段

   + 捕获阶段(从外向内的传递事件)
   + 当前目标阶段
   + 冒泡的阶段(从内向外的传递事件)
   + 注意点
     + 三个阶段只有两个会被同时执行
     + 要么捕获和当前, 要么当前和冒泡

7. 设置事件捕获还是冒泡

   + 通过addEventListener方法, 这个方法接收三个参数

     + 第一个参数: 事件的名称

     + 第二个参数: 回调函数

     + 第三个参数: false冒泡  / true 捕获

     + ```js
       oFDiv.addEventListener("click", function () {
               console.log("father");
       }, false);
       ```

   + 注意点：

     + onXxx的属性, 不接收任何参数, 所以默认就是冒泡

     + attachEvent方法, 只能接收两个参数, 所以默认就是冒泡

     + ```js
       /*
           IE 6.0:
           div -> body -> html -> document
           其他浏览器:
           div -> body -> html -> document -> window
           注意：
           不是所有的事件都能冒泡，以下事件不冒泡：blur、focus、load、unload
       */
       ```

8. 阻止事件冒泡

   + event.stopPropagation();  // 只支持高级浏览器

   + event.cancelBubble = true; // 低级浏览器

   + ```js
     // 兼容写法
     if(event.cancelBubble){
            event.cancelBubble = true;
        }else{
            event.stopPropagation();
     }
     ```

9. 位置获取（这些属性都在event对象中）

   + offsetX/offsetY: 事件触发相对于当前元素自身的位置
   + clientX/clientY: 事件触发相对于浏览器可视区域的位置
     + 注意点: 可视区域是不包括滚动出去的范围的
   + pageX/pageY:     事件触发相对于整个网页的位置
     + 注意点: 整个网页包括滚动出去的范围的
   + screenX/screenY: 事件触发相对于屏幕的位置

### 4. 定时器

1. 重复执行定时器

   + ```js
     let id = setInterval(fn,1000);
     clearInterval(id);
     ```

2. 只执行一次的定时器

   + ```js
     let id = setTimeout(fn,1000);
     clearTimeout(id);
     ```

### 5. Date

1. Date

   + 获取当前时间 (let date = new Date())

     + new Date();
     + Date.now();   // 获取当前时间距离1970年1月1日（世界标准时间）起的毫秒
     + date.valueOf()   // 获取当前时间距离1970年1月1日（世界标准时间）起的毫秒

   + 创建时间

     + let date1 = new Date("2019-11-11 09:08:07");
     + let date2 = new Date(2019, 10, 11, 9, 8, 7);   // 在创建指定时间的时候, 如果月份是单独传入的, 那么会多一个月

   + 获取指定时间年月日时分秒

     + ```js
       let date = new Date();
       console.log(date);
       console.log(date.getFullYear());
       // 注意点; 通过getMonth方法获取到的月份会少一个月
       console.log(date.getMonth() + 1);
       console.log(date.getDate());
       console.log(date.getHours());
       console.log(date.getMinutes());
       console.log(date.getSeconds());
       ```

   + 时间格式化

     + ```js
       let date = new Date();
       // 2019-4-19 18:17:06
       function formartDate(date) {
           return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
       }
       ```


## 3. BOM

### 1. BOM基础

1. DOM是一套操作HTML标签的API，而BOM是一套操作浏览器的API

2. BOM常见对象

   + window : 代表一个打开的浏览器窗口

   + Navigator: 代表当前浏览器的信息

     + ```js
       // 判断浏览器类型    
       var agent = window.navigator.userAgent;
           if(/chrome/i.test(agent)){
               alert("当前是谷歌浏览器");
           }else if(/firefox/i.test(agent)){
               alert("当前是火狐浏览器");
           }else if(/msie/i.test(agent)){
               alert("当前是低级IE浏览器");
           }else if("ActiveXObject" in window){
               alert("当前是高级IE浏览器");
           }
       ```

   + Location：代表浏览器地址栏信息

     + 设置地址栏地址：`window.location.href = "http://www.it666.com"`
     + 重新加载界面
       + window.location.reload()  //普通刷新
       + window.location.reload(true)   // 强制刷新

   + History：代表浏览器的历史信息

     + window.history.go(n);  // 去往哪个页面，正则向前，负则后退，若是0则会刷新本页面
     + window.history.forward()  // 前进一个
     + window.history.back()   // 后退一个

   + Screen：代表用户屏幕信息

### 2. 各种宽高及位置

1. js中的三大家族（offset,scroll,client）

#### 1. screen对象

+ 获取屏幕宽高
  1. window.screen.width
      + 屏幕的宽
  2. window.screen.height
      + 屏幕的高
  3. window.screen.availWidth
      + 屏幕可用宽度，屏幕的宽 - 系统部件宽度
  4. window.screen.availHeight
      + 屏幕可用高度，屏幕的高 - 系统部件高度

#### 2. window对象

1. window.screenTop
    + 浏览器窗口顶部距离屏幕顶部的距离
2. window.screenLeft
    + 浏览器窗口左侧距离屏幕左侧距离
3. window.innerWidth (IE9及以上可获取)
    + 浏览器窗口可视区域宽度
4. window.innerHeight  (IE9及以上可获取)
    + 浏览器窗口可视区域高度
5. window.outerWidth
    + 浏览器窗口本身宽度 (可视区域宽度 + 浏览器边框)
6. window.outerHeight
    + 浏览器窗口本身高度 (可视区域高度 + 浏览器边框)
7. window.screenX window.screenY
    + 浏览器窗口左上角相对于屏幕左上角的水平和垂直距离   
8. window.scrollX window.scrollY
    + 页面水平滚动距离和垂直滚动距离
    + 为了浏览器兼容性，推荐用window.pageXOffset window.pageYOffset代替

+ 注意： 涉及方法 window.scrollTo(),window.scroll(),window.scrollBy() 

#### 3. element节点属性

1. **DOM节点只读属性**

   + **clientWidth clientHeight clientLeft clientTop (DOM节点只读属性)**

     1. clientWidth : 元素可视部分内部宽度
         + 若没有滚动条，为 padding + content width
         + 若有滚动条，为 padding + content width - scollbarWidth
     2. clientHeight : 元素可视部分内部高度
         + 若没有滚动条，为 padding + content height
         + 若有滚动条，为 padding + content height - scollbarHeight
     3. clientLeft : 元素左边框宽度
        
         + 如果文字方向从右往左(默认从左往右,通过设置 direction: rtl;)进行排列,且存在垂直滚动条的情况下 border width + scollbar width
         
         + 默认情况下 : border width
         + 若当前元素是行内元素，clientLeft是0
     4. clientTop : 元素上边框宽度

     + 参考 : https://segmentfault.com/a/1190000019507352?utm_source=tag-newest

   + **offsetWidth offsetHeight offsetParent offsetLeft offsetTop (DOM节点只读属性)**

     1. offsetWidth : 元素宽度
         + border width + padding + content width , 与内部内容是否超出元素大小无关
     2. offsetHeight : 元素高度
         + border widht + padding + content height , 与内部内容是否超出元素大小无关
     3. offsetParent
         + 指离当前元素最近的定位祖先元素(absolute/relative), 若没有祖先元素是定位的，那么当前元素的offsetParent就是body
     4. offsetLeft
         + 当前元素相对于offsetParent的左边距，即当前元素左 border 到它的offsetParent的左 border 距离
     5. offsetTop
         + 当前元素相对于offsetParent的上边距，即当前元素上 border 到它的offsetParent的上 border 距离

     + 注意：offsetLeft/offsetTop以旋转前的元素位置为准

   + **scrollHeight scrollWidht (DOM节点只读属性)**

     1. scrollheight : 当元素内部的内容超出其高度时，元素内部内容的实际高度(包括带滚动条的被卷起来的地方)
     2. scrollwidth : 当元素内部的内容超出其宽度时，元素内部内容的实际宽度(包括带滚动条的被卷起来的地方)

     + 注意：当元素内容没有超出其高度或宽度时，该属性取不到

2. **DOM节点可读可写属性**

   + **scrollLeft scrollTop**
     1. scrollLeft : 元素内容超出其宽度时，元素被卷起来的宽度
     2. scrollLeft : 元素内容超出其高度时，元素被卷起来的高度
   + **obj.style.* 属性**
     1. style属性返回的是一个对象，该对象任意的属性都是可读写的，如obj.style.top, obj.style.width 

3. **涉及方法**

   + Element.getBoundingClientRect()
     + 返回一个对象，提供当前元素的大小和位置等信息

#### 4. Event对象属性

+ 在js中，对于元素运动的操作通常都会涉及到event对象的位置属性。以下这些属性皆与鼠标有关

1. **clientX clientY**

   1. clientX : 当事件发生时，鼠标位置相对于浏览器(可视区)的横(x)坐标
   2. clientY : 当事件发生时，鼠标位置相对于浏览器(可视区)的纵(y)坐标
   + 注意 : 
       + 此属性以浏览器左上角坐标为原点

2. **screenX screenY**

   1. 事件发生时鼠标相对于屏幕的坐标
   2. 以设备屏幕左上角为原点 

3. **offsetX offsetY (此事件还处于草案中，兼容性不高，暂时不推荐用)**

   1. 事件发生时，鼠标位置相对于该事件源的位置
   2. 例如点击某个div, 以该div左上角为原点计算鼠标位置
   + 在Firefox中不支持此属性，其对应属性为layerX,layerY
   + 这两个值的替代方案是: pageXY - offsetLeft/Top

4. **pageX pageY**

   1. 事件发生时，鼠标相对于整个页面的位置
       + 当窗口没有出现滚动条时，该属性与event.clientX event.clientY等价
       + 当窗口出现滚动条时，pageXY包含被卷起来的宽度和高度

5. **movementX movementY**

   1. 返回当前位置与上一个mousemove事件之间的水平距离和垂直距离

+ 各种宽高及位置参考：https://www.jb51.net/article/161986.htm
+ 获取网页宽高及网页滚动距离的兼容性写法见it666

## 4. JavaScript高级

1. 函数防抖 debounce
   + 函数防抖是优化高频率执行js代码的一种手段，可以让被调用的函数在一次连续的高频操作过程中只被调用一次
   + 作用：减少代码执行次数, 提升网页性能
   + 应用场景
     + oninput / onmousemove  / onscroll / onresize等事件
2. 函数节流  throttle
   + 函数节流也是优化高频率执行js代码的一种手段，可以减少高频调用函数的执行次数
   + 作用：减少代码执行次数, 提升网页性能
   + 应用场景
     + oninput / onmousemove  / onscroll / onresize等事件
     + 用函数节流监听可视区域尺寸的变化
   + 函数节流和函数防抖区别
     + 函数节流是减少连续的高频操作函数执行次数  (例如连续调用10次, 可能只执行3-4次)
     + 函数防抖是让连续的高频操作时函数只执行一次(例如连续调用10次, 但是只会执行1次)

### 1. 存储

1. cookie
   + 生命周期：默认是关闭浏览器后失效，但可以设置过期时间
   + 容量：有大小(4KB左右)和个数(20~50)限制
   + 网络请求：每次都会携带在HTTP头中，若使用cookie保存过多数据会带来性能问题
   + 应用场景：判断用户是否登录
2. sessionStorage
   + 生命周期：仅在当前会话(窗口)下有效，关闭窗口或浏览器后被清除，不能设置过期时间
   + 容量：有大小限制(5M左右) http://dev-test.nemikor.com/web-storage/support-test/
   + 网络请求：仅在浏览器中保存，不参与和服务器的通信
   + 应用场景：表单数据
3. localStorage
   + 生命周期：除非被清除，否则永久保留
   + 有大小限制(5M左右) http://dev-test.nemikor.com/web-storage/support-test/
   + 网络请求：仅在浏览器中保存，不参与和服务器的通信
   + 应用场景：购物车

### 2. 同源策略

1. 同源策略是一种浏览器的安全约定，即协议、域名、端口相同，否则就是跨域
2. 在同源策略下，浏览器只允许Ajax请求同源的数据
3. 跨域解决方法
   + jsonp
   + document.domain + iframe
   + location.hash + iframe
   + window.name + iframe
   + window.postMessage
   + flash等第三方插件
   + CORS
4. jsonp原理 ：能够跨域读取数据
   + 在同一个界面中可以定义多个script标签
   + 在同一个界面中多个script标签中的数据可以相互访问
   + 可以通过script的src属性导入其他资源
   + 通过src属性导入其他资源的本质就是将资源拷贝到script标签中
   + script的src属性不仅能导入本地资源，还能导入远程资源
   + 由于script的src属性没有同源限制，所以可以通过script的src属性来请求跨域数据

### 3. 线程与同步

1. js是单线程的，所以JS中的代码都是串行的
2. 同步代码与异步代码
   + 除了“事件绑定的函数"和”回调函数“以外的都是同步代码
3. JS代码执行流程
   + 程序自上向下依次执行所有的同步代码
   + 在执行的过程中，若遇到异步代码会将异步代码放到事件循环中
   + 当所有同步代码都执行完毕后，JS会不断检测事件循环中的异步代码是否满足条件
   + 一旦满足条件就会执行满足条件的异步代码

### 4. promise

1. promise是ES6中新增的异步编程解决方案，在代码中的表现是一个对象
2. promise对象可以将异步操作以同步流程来表示，避免了回调函数层层嵌套
3. promise对象通过状态的改变来实现异步的操作，只要状态发生改变就会自动触发对应的函数

### 5. fetch

1. fetch是ES6新增的基于promise的网络请求方法

### 6. Axios

1. Axios是一个基于promise的HTTP库网络请求插件

### 7. Symbol

1. Symbol是ES6中新增的一种基本数据类型，它用来表示一个独一无二的值，这个标记仅仅用来区分，没有其他任何含义。

### 8. Iterator

### 9. Generator

1. ES6新增的一种异步编程解决方案