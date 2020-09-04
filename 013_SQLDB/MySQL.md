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

# 二.数据库管理

## 1.自带数据库

1. information_schema
   + 保存着关于MySQL服务端所维护的其他数据库信息，例如数据库名，数据库表，表中的数据类型、访问权限等。
2. mysql
   + MySQL系统数据库，保存了登录用户名，密码，以及每个用户的权限等
3. performance_schema
   + 用来保存数据库服务器性能的参数
4. sys
   + 此库通过视图的形式把information_schema和performance_schema结合起来，查询出更加令人容易理解的数据

## 2.库的增删改查

### 1.查

+ show databases;    // 列出所有数据库
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

1. alter database 数据库名称 charset=字符集;
   + 修改数据库名称及字符集
   + ex：alter database db_name charset=utf8;

