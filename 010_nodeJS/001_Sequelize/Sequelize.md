# Sequelize

## 一.概述

1. Sequelize是一个基于Promise的NodeJS ORM模块

2. ORM(Object-Relational-Mapping)是对象关系映射，对象关系映射可以把JS中的类和对象, 和数据库中的表和数据进行关系映射，映射之后我们就可以直接通过类和对象来操作数据表和数据了, 就不用编写SQL语句了，ORM有效的解决了直接在NodeJS中编写SQL不够直观, 不够高效, 容易出错等问题

3. 在Sequelize中如何映射

   + 在Sequelize中JS中的一个类(一个模型)就对应数据库中的一张表
   + 在Sequelize中JS中的一个对象就对应表中的一条数据(一条记录)
   + 在Sequelize中JS中的一个对象的属性就对应一条数据的一个字段

4. 操作表和数据

   + 只要是通过Sequelize定义的模型(类), 那么Sequelize就会自动给这个模型添加很多操作表和数据的方法

     以后我们就可以直接通过模型操作表, 通过模型创建出来的对象操作数据

## 二.连接数据库

+ https://sequelize.org/
+ https://demopark.github.io/sequelize-docs-Zh-CN/

## 三.表管理

### 1.建表

1. 注意点
   + sequelize在根据模型创建表的时候, 默认会自动将我们指定的表的名称变成复数，需要通过配置取消
   + sequelize在根据模型创建表的时候, 默认会自动增加两个字段 createAt/updateAt，需要通过配置取消

## 四.数据操作

+ 见官方API

## 五.Sequelize-cli

+ Sequelize-CLI就是一款数据库迁移工具, 能够让我们追踪数据库的变更, 在各个不同版本之间随意切换