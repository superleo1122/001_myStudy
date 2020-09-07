# 一.概述

## 1.登录

1. mysql -u user_name -p    // 回车后输入密码
2. mysql -u user_name -pxxx    // xxx为密码，采用明文输入方式，回车后即可登录
3. mysql -h 127.0.0.1 -u user_name -p    // 连接远程服务器，默认端口3306
4. mysql -h 127.0.0.1 -P 3306 -u user_name -p    // 指定端口

## 2.退出

1. 退出的三种方式
   + `exit;`
   + `quit`
   + `\q`

## 3.SQL

1. 结构化查询语言(Structured Query Language)简称
2. SQL语句功能划分
   + DDL:数据定义语句
     + 用来定义数据库对象：创建库，表，列等。
   + DML：数据操作语句
     + 用来操作数据库表中的记录
   + DQL：数据查询语句
     + 用来查询数据
   + DCL：数据控制语句
     + 用来定义访问权限和安全级别

# 二.存储引擎

### 1.MyISAM

1. 安全性低, 但不支持事务和外键, 适合频繁插入和查询的应用

### 2.InnoDB

1. 安全性高, 支持事务和外键, 适合对安全性, 数据完整性要求较高的应用

### 3.Memory

1. 访问速度极快, 但不会永久存储数据, 适合对读写速度要求较高的应用

# 三.数据库管理

## 1.自带数据库

1. information_schema
   + 保存着关于MySQL服务端所维护的其他数据库信息，例如数据库名，数据库表，表中的数据类型、访问权限等。
2. mysql
   + MySQL系统数据库，保存了登录用户名，密码，以及每个用户的权限等
3. performance_schema
   + 用来保存数据库服务器性能的参数
4. sys
   + 此库通过视图的形式把information_schema和performance_schema结合起来，查询出更加令人容易理解的数据

## 2.增删改查

### 1.查

+ show databases;    // 列出所有数据库
  + use db_name;    // 使用指定数据库
+ show variables like 'character_set%';    // 查询数据库全局默认编码
+ show create database db_name;    // 查看某个数据库编码

### 2.增

1. create database db_name;    
   + 若MySQL中已有同名数据库，则执行时报错
2. create database if not exists db_name;   
   +  若MySQL中已有同名数据库，则会跳过这条语句
3. create database if not exists db_name charset=utf8;   
   +  创建数据库同时设置字符集
4. create database if not exists \`create\` charset=utf8;    
   + 若数据库的名称是SQL的关键字或者是一些特殊字符#~@*&.., 这个时候就需要用反引号括起来

### 3.删

1. drop database db_name;
   + 若MySQL中没有要删除的数据库, 那么就会报错
2. drop database if exists db_name;
   + 若MySQL中没有要删除的数据库, 那么就会跳过, 并不会报错

### 4.改

1. alter database db_name charset=字符集;
   + 只能修改数据库的字符集
   + ex：alter database db_name charset=utf8;

# 四.表管理

## 1.存储引擎

## 2.增删改查

### 1.查

1. show tables;
2. desc table_name;    // 查看指定表结构

### 2.增

1. 创建表

   + ```mysql
     create table person(
     	id int,
         name varchar(10),
     );
     
     create table if not exists person(
         id int,
         name varchar(10),
     )charset=utf8;
     ```

### 3.删

1. drop table table_name;
2. drop table if exists table_name;

### 4.改

1. 修改表名
   + rename table old_table_name to new_table_name;
2. 添加字段
   + alter table table_name add field_name 新增字段数据类型 [位置]
     + alter table person add age int;    // 默认将新增字段放在最后
     + alter table person add age int after name;    // 将新增字段放在name字段后面
3. 删除字段
   + alter table table_name drop field_name
     + alter table person drop age;
4. 修改字段
   + 修改字段数据类型
     + alter table table_name modify field_name 新数据类型；
     + ex：alter table person modify age float;
   + 修改字段名称和数据类型
     + alter table table_name change 原字段名 新字段名 新数据类型；
     + ex：alter table person change age addr text;

# 五.数据管理

## 1.数据类型

### 1.整型

1. 有符号

   + TINYINT     1 字节  (-128，127) (0，255) 小整数值

   + SMALLINT    2 字节  (-32768，32767)  (0，65535) 大整数值

   + MEDIUMINT    3 字节  (-8388608，8388607) (0，16777215) 大整数值

   + INT或INTEGER 4 字节  (-2147483648，2147483647) (0，4294967295)  大整数值

   + BIGINT     8 字节  (-9223372036854775808，9223372036854775807) (0，18446744073709551615) 极大整数值

2. 无符号

   + 只需在数据类型后添加 `unsigned` 即可

### 2.浮点型

1. 专门用来保存小数
   + FLOAT(m, d)   4 字节  单精度
   + DOUBLE(m, d)  8 字节  双精度
     + m总位数, d小数位数，可以不指定使用默认的

### 3.定点型

1. 定点类型将数据分为两个部分存储，每个部分都是整数。定点型耗资源。
   + decimal(M, D)
     + m总位数, d小数位数

### 4.字符型

1. 专门用来存储字符
   + CHAR(size)   0-255 字节    定长字符串
   + VARCHAR(size) 0-65535字节    变长字符串

### 5.大文本型

1. MySQL中每一行存储的数据是有大小限制的, 每一行最多只能存储65534个字节
   + TINYTEXT  0-255字节     短文本字符串
   + TEXT    0-65535字节      长文本数据
   + MEDIUMTEXT 0-16777215字节    中等长度文本数据
   + LONGTEXT  0-4294967295字节  极大文本数据
2. 大文本类型在表中并不会实际占用所能保存的字节数, 而是利用10个字节引用了实际保存数据的地址

### 6.布尔型

+ boolean

### 7.日期类型

1. 专门用来保存时间
   + DATE    3字节 YYYY-MM-DD 日期值
   + TIME    3字节 HH:MM:SS  时间值或持续时间
   + DATETIME  8字节 YYYY-MM-DD HH:MM:SS 混合日期和时间值
2. 在存储时间的时候需要使用单引号将时间括起来

### 8.枚举型

1. enum(值1, 值2, ...);    // 在工作中不使用

### 9.集合型

1. set(值1, 值2, ...)    // 在工作中不使用

## 2.查询

### 2.1概述

1. 通过查询语句查询出来的结果称之为结果集，结果集以表的形式将查询结果返回，结果集存储在内存中。
2. select [查询选项] 字段名称 [from 表名] [where 条件] [order by 排序] [group by 分组] [having 条件] [limit 分页];
3. where支持的运算符

   + `=` (等于)、`!=` (不等于)、`<>` (不等于) 
   + `<` 、`<=`、`>`、`>=`
   + IN(set)    // 固定值范围
   + BETWEEN...AND...    // 值范围
   + IS NULL、IS NOT NULL
   + AND    // 交集
   + OR    // 并集
   + NOT
   + LIKE
4. 通过as给查询的字段指定别名
5. 通过伪表(dual)的方式让字段表达式符合MySQL规范
   + select 6+6 from dual;    // dual是一张不存在的虚拟的表

### 2.2单表查询

#### 1.模糊查询

+ select 字段 from 表名 where 字段 like '条件';
+ 通配符
  + `_`：表示任意一个字符
  + `%`：表示任意0~n个字符
+ example
  + select * from person where name like 'a_';    // 可以匹配ab
  + select * from person where name like 'z%';    // 可以匹配abbbbb

#### 2.排序

+ select 字段 from 表名 order by 字段 [asc | desc];
  + asc：升序    // 默认就是升序
  + desc：降序

#### 3.分组

+ select 分组字段 || 聚合函数 from 表名 group by 分组字段;
  + 注：select 后面必须是分组字段或者聚合函数, 否则就只会返回第一条数据
+ select city, count(*) from stu group by city;    // 统计每个城市有多少人

#### 4.having

+ having与where区别
  + where是去数据库中查询符合条件的数据
  + having是去结果集中查询符合条件的数据
+ ex：select city, avg(score) as average from stu group by city having average>=60;

#### 5.分页

+ select 字段 from 表 limit 索引, 个数;

#### 6.distinct

+ distinct: 去除结果集中重复的数据之后再显示
+ ex：select distinct name from stu;

#### 7.聚合函数

+ count()    // 统计
  + select count(*) from person;
+ sum()    // 求和
  + select sum(id) from person;
+ avg()    // 求平均值
  + select avg(score) from person;
+ max()    // 获取最大值
  + select max(score) from person;
+ min()    // 获取最小值
  + select min(score) from person;

#### 8.数值处理函数

+ rand()    // 生成随机数
  + select rand() from dual;
  + select * from stu order by rand();
+ round()    // 四舍五入
  + select round(3.1) from dual;
+ ceil();  // 向上取整
  + select ceil(3.1) from dual;
+ floor();   // 向下取整
  + select floor(3.9) from dual;
+ truncate();  // 截取小数位
  + select truncate(3.1234567, 2) from dual;

#### 9.字符串处理函数

+ ucase();   // 转换为大写
  + select ucase('hello world') from dual;
+ lcase();   // 转换为小写
  + select lcase('HELLO WORLD') from dual;
+ left();   // 从左边开始截取到指定的位置
  + select left('1234567890', 3) from dual;
+ right();  // 从右边开始截取到指定的位置
  + select right('1234567890', 3) from dual;
+ substring();   // 从指定位置开始截取指定个字符
  + select substring('1234567890', 3, 5) from dual;

### 2.3多表查询

#### 0.概述

+ 多表

#### 1.多表查询

+ select * from 表名1, 表名2;
+ 多表查询的结果是笛卡尔集

#### 2.union

+ union：在纵向上将多张表的结果结合起来返回给我们
+ select * from 表名1 union select * from 表名2;
  + ex：select id, name from stu union select id, score from grade;
+ 注意点
  + 使用union进行多表查询, 返回的结果集的表头的名称是第一张表的名称
  + 使用union进行多表查询, 必须保证多张表查询的字段个数一致
  + 使用union进行多表查询, 默认情况下会自动去重
  + 使用union进行多表查询, 如果不想自动去重, 那么可以在union后面加上all
    + select id, name from stu union all select id, name from person;

#### 3.内连接

+ select * from 表名1 inner join 表名2 on 条件;
  + ex：select stu.id, stu.name, grade.score from stu inner join grade on stu.id = grade.stuId;
+ 注意点
  + 在内连接中只会返回满足条件的数据

#### 4.外连接

+ left join 左外连接
+ right join 右外连接



#### 5.子查询

+ 将一个查询语句查询的结果作为另一个查询语句的条件来使用
  + ex：select name from stu where stuId in(select stuId from grade where score >= 60);
+ 将一个查询语句查询的结果作为另一个查询语句的表来使用
  + ex：select name, city, score from (select name, city, score from person where score >= 60) as t;
  + 注意点
    + 如果要将一个查询语句查询的结果作为另一个查询的表来使用, 那么必须给子查询起一个别名

## 3.增删改

### 3.1增

1. insert into table_name (字段1,字段2) values (值1,值2);
   + ex：insert into person (id,name) values (1,'leo');    
   + ex：insert into person (id,name) values (1,'leo'),(2,'tom');    // 同时插入多条数据

### 3.2删

1. delete from table_name [where 条件]
   + delete from person where id = 2;
   + delete from person;    // 删除所有数据

### 3.3改

1. update table_name set 字段名称=值 [where 条件]
   + ex：update person set name='leo';    // 没有指定条件，则会更新全表的name字段
   + ex：update person set name='tom' where id=1;
   + ex：update person set name='jack',age=16 where id=1;    // 更新多个字段

# 六.数据完整性

## 1.概述

1. 数据完整性：保证保存到数据库中的数据都是正确的。
2. 数据完整性可分为3类
   + 实体完整性
   + 域完整性
   + 参照完整性

## 2.分类

### 1.实体完整性

1. 实体：表中的一行数据就是一个实体
2. 实体完整性就是保证每行数据的唯一性
3. 实体完整性约束类型
   + 主键约束（primary key）
   + 唯一约束(unique)
   + 自动增长列(auto_increment)

#### 1.1主键约束

1. 作用：唯一标识每条数据

2. 建表时添加主键约束

   + ```mysql
     # 方式1
     create table person2(
         id int primary key,
         name varchar(20)
     );
     # 方式2
     create table person3(
         id int,
         name varchar(20),
         primary key(id)
     );
     # 添加联合主键
     create table person(
         name varchar(20),
         age int,
         primary key(name, age)
     );
     ```

3. 修改主键约束
   + alter table 表名 add primary key(字段)
     + ex：alter table person add primary key(id);
4. 特点
   + 主键取值不可重复，且不能为null
   + 一张表仅能有一个主键
   + 可以用多个字段组成联合主键

#### 1.2唯一约束

1. 作用：用于保证某个字段值永不重复

2. 建表时添加唯一约束

   + ```mysql
     create table person2(
            id int unique,
            name varchar(20) unique
     );
     ```

3. 修改唯一约束

   + alter table 表名 add unique(字段);
     + ex：alter table person add unique(name);

4. 特点

   + 唯一约束取值可以为null
   + 一张表中可以有多个唯一约束

#### 1.3自动增长列

1. 自动增长约束的作用是让某个字段的取值从1开始递增, 从而保证实体完整性

2. 建表时添加自动增长列

   + ```mysql
     create table person(
         id int auto_increment primary key,
         name varchar(20)
     );
     ```

   + 设置自动增长的字段必须是主键

3. 修改自动增长列

   + alter table 表名 modify 字段名称 数据类型 auto_increment;
     + ex：alter table person modify id int auto_increment;

### 2.域完整性

1. 域：一行数据中的每个单元格都是一个域

2. 域完整性：确保每个单元格数据的正确性

3. 方式

   + 使用正确的数据类型，例如年龄(不会超过255，且不能为负)可以使用 TINYINT UNSIGNED。
   + 使用非空约束 (not null)
   + 使用默认值 (default)

4. example

   + ```mysql
     create table person(
         id int,
         name varchar(20) not null,
         address varchar(64) default '巴塞罗那'
     );
     ```

### 3.参照完整性

1.  参照完整性又称引用完整性, 主要用于保证多表之间引用关系的正确性。
2. 表与表之间的关系
   + 一对一关系 （不需要拆分）
   + 一对多关系（需要拆分，可以拆分为两个实体表）
   + 多对多关系（需要拆分，可以拆分为两个实体表，一个中间关系表）
3. 这里可以使用外键来确保，但实际工作中禁止使用外键。

# 七.索引



