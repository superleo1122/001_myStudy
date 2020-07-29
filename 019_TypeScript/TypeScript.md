# TypeScript

## 一.初始化及配置

1. npm install typescript -g
2. tsc --init 初始化TypeScript配置文件
3. npm install typescript ts-loader

## 二.数据类型

1. 数值类型

   + `let num:number`

2. 布尔类型

   + `let flag:boolean`

3. 字符串类型

   + `let str:string`

4. 数组类型

   + 方式1
     + `let arr:Array<number>`  数值类型数组
   + 方式2
     + `let arr:string[]` 字符串类型数组

5. 联合类型

   + `let arr:(string | number)[]`：此数组既可以存储数值类型，也可以存储字符串类型数据

6. 任意类型

   + any表示任意类型，当不清楚值的具体类型时可用any，一般用于通用性强的变量或者不确定类型变量
   + 在TS中任何数据类型的值都可以赋值给any类型

   + `let arr:any[]`
   + `let i:any`

7. void类型

   + void类型与any类型相反，表示没有任何类型，一般用于函数返回值，在TS中只有null和undefined可以赋值给void类型

8. 元祖类型

   + 元祖类型其实就是数组类型的扩展，元祖用于保存定长定数据类型的数据
   + `let arr:[string,number,boolean]`

9. 枚举类型

   + 枚举类型是TS为JS扩展的一种类型

   + ```typescript
     enum Bank{
         ABC,
         XM
     }
     
     let bank:Bank;
     bank = Bank.XM;
     ```

   + TS的枚举底层实现的本质其实就是数值类型，所以赋值一个数值不会报错

10. Never类型

    + 表示那些永不存在值的类型，一般用于抛出异常或根本不可能有返回值的函数

    + ```type
      function demo():never{
      	throw new Error("error");
      }
      ```

11. Object类型

    + 表示一个对象

    + ```typescript
      let obj:object;
      obj = {name:'leo',age:10}
      ```

12. 类型断言

    + 告知编译器变量的类型

    + 类似java泛型，转化为具体类型

    + 使用方式

      + 方式1（有兼容性问题）

      + ```type
        let str:any = 'leo';
        let len = (<string>str).length;
        ```

      + 方式2（推荐使用）

      + ```typescript
        let str:any = 'super';
        let len = (str as string).length;
        ```

## 三.变量声明

## 四.接口

1. 接口本质就是规范和约束

2. 接口定义

   + ```typescript
     interface FullName{
         firstName:string
         lastName:string
     }
     ```

3. 可选属性

   + `name?:string`

4. 参数多一个或多多个时
   + 法1：使用类型断言
   + 法2：使用变量
   + 法3：使用索引签名

5. 索引签名

   + 索引签名用于描述那些通过“索引得到”的类型，例如数组和对象

6. 只读属性
   + 让对象属性只能在对象刚刚创建时修改其值
   + 在接口定义变量时使用readonly修饰
   + 只读数组

7. 接口可以用来限定对象，也可以用来限定函数

8. 函数接口

9. 混合类型接口

   + 约定的内容既有对象属性，又有函数

10. 接口继承

## 五.函数

1. TS中的函数与JS中函数比，只是形参与返回值需要声明类型
2. TS函数完整格式
   + 由定义和实现两部分组成
3. 函数的定义
4. 函数的重载
5. 函数的可选参数
6. 函数的默认参数
7. 函数的剩余参数

## 六.泛型

1. 泛型使用

   + ```typescript
     let test = <T>(name:T):T[]{
         return [name]
     }
     let res = test<string>('leo');
     let res1 = test('neo');  // 没有指定会根据传递的参数自动推导
     ```

2. 泛型约束

   + ```typescript
     interface LengthInterface{
         length:number
     }
     // T继承了这个接口，意味着我们传入的类型必须有length属性
     let getArray = <T extends LengthInterface>(value:T,items:number=5)=>{
         return new Array(items).fill(value);
     }  
     let arr = getArray<string>('leo');
     ```

3. 在泛型约束中使用类型参数

   + 一个泛型被另一个泛型约束

   + ```typescript
     let getProps = <T,K extends keyof T>(obj:T, key:K):any=>{
         return obj[key];
     }
     ```

## 七.类

1. TS中类和ES6区别，需要先定义实例属性，才能使用实例属性
2. 类属性修饰符
   + public	// 默认值
   + protected
   + private
   + readonly
3. 类方法修饰符
   + public	// 默认值
   + protected
   + private
4. 类可选属性
5. 类参数属性
6. 存取器
   + 通过getters/setters来截取对象成员的访问
7. 抽象类
   + 一般用于定义基类

## 八.枚举

1. 枚举类型

   + 数字枚举

     + ```typescript
       enum Gender{
           Male,
           Female
       }
       ```

     + 数字枚举的取值默认从0开始递增

     + 数字枚举的取值可以是自变量，也可以是常量，也可以是计算的结果

   + 字符串枚举

     + 值为字符串
     + 字符串枚举无法通过原始值来获取枚举值

   + 异构枚举

     + 枚举中既包含数字又包含字符串

2. 枚举反向映射

   + 可以根据枚举值获取到原始值
   + 也可以根据原始值获取到枚举值
   + 但字符串枚举除外

3. 

