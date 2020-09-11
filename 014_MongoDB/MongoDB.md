# MongoDB

## 一.概述

1. MongoDB是存储文档(BSON)的非关系型数据库
2. MongoDB中所有的数据都是存储在集合中

## 二.安装

1. `cd /etc/yum.repos.d`

2. `vim mongodb-org-4.4.repo`

   + ```shell
     [mongodb-org]
     name=MongoDB Repository
     baseurl=http://mirrors.aliyun.com/mongodb/yum/redhat/7Server/mongodb-org/4.4/x86_64/
     gpgcheck=0
     enabled=1
     
     ```

3. `yum install mongodb-org`

4. `vim /etc/mongod.conf`，修改为bindIp: 0.0.0.0，使得任意外网可访问mongodb

## 三.基本使用

### 1.启停

1. 启动

   + systemctl start mongod.service

2. 停止

   + systemctl stop mongod.service

3. 查看状态

   + systemctl status mongod.service

4. 设置开机启动

   + systemctl enable mongod.service

5. 重启

   + systemctl restart mongod.service

### 2.其他   

   + mongo    // 启动mongo shell
   
   + quit    // 退出shell

## 四.库管理

### 1.查

+ show dbs    // 查看数据库
+ db    // 查看当前进入的是哪个数据库

### 2.增

+ use db_name    // 当库不存在时会自动创建

### 3.删

+ db.dropDatabase()    // 在哪个数据库执行就会删除哪个数据库

## 五.集合管理

### 1.查

+ show collections    // 查看集合



### 2.增

+ db.createCollection('集合名称');

### 3.删

+ db.集合名称.drop()

## 五.文档管理

### 1.查

+ db.集合名称.find();

### 2.增

+ db.集合名称.insert(文档对象);

### 3. 删

## 六.主键

1. what：
   + MongoDB的主键和MySQL一样, 也是用于保证每一条数据唯一性的
   + 和MySQL不同的是, MongoDB中的主键无需明确指定，每一个文档被添加到集合之后, MongoDB都会自动添加主键，MongoDB中文档主键的名称叫做 _id
   + 默认情况下文档主键是一个ObjectId类型的数据
     + ObjectId类型是一个12个字节字符串(5e8c5ae9-c9d35e-759b-d6847d)
     + 字节是存储这条数据的时间戳
     + 3字节的存储这条数据的那台电脑的标识符
     + 2字节的存储这条数据的MongoDB进程id
     + 3字节是计数器
2. why:
   + 因为MongoDB是支持'横向扩展'的数据库
     + 横向扩展是指'增加数据库服务器的台数'
     + 纵向扩展是指'增加数据库库服务器的配置'
   + 因为MongoDB是一个分布式数据库, 正是因为分布式数据库可以把请求派发给不同的服务器，所以使用简单递增无法满足需求，所以使用了ObjectId类型数据作为主键
3. how:
   + 在MongoDB中支持除了'数组类型'以外的其它类型数据作为主键
   + 在MongoDB中甚至还支持将一个文档作为另一个文档的主键(复合主键)

