# MongoDB

## 一.概述

1. MongoDB是存储文档(BSON)的非关系型数据库
2. MongoDB中所有的数据都是存储在集合中
3. MongoDB原生就支持JavaScript

## 二.安装

### 1.安装

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

### 2.配置

1. 创建管理账户
2. `vim /etc/mongod.conf`，最新版配置secure，(旧版为新增 auth=true)，启用权限访问
3. `vim /etc/mongod.conf`，修改为bindIp: 0.0.0.0，使得任意外网可访问mongodb

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
   
   + exit  // 退出shell

## 四.账户权限

### 1.内置角色

+ 数据库用户角色
  + read: 只读数据权限
  + readWrite:学些数据权限
+ 数据库管理角色
  + dbAdmin: 在当前db中执行管理操作的权限
  + dbOwner: 在当前db中执行任意操作
  + userADmin: 在当前db中管理user的权限
+ 备份和还原角色
  + backup
  + restore
+ 跨库角色
  + readAnyDatabase: 在所有数据库上都有读取数据的权限
  + readWriteAnyDatabase: 在所有数据库上都有读写数据的权限
  + userAdminAnyDatabase: 在所有数据库上都有管理user的权限
  + dbAdminAnyDatabase: 管理所有数据库的权限
+ 集群管理
  + clusterAdmin: 管理机器的最高权限
  + clusterManager: 管理和监控集群的权限
  + clusterMonitor: 监控集群的权限
  + hostManager: 管理Server
+ 超级权限
  + root: 超级用户
+ 注：
  + 内置角色只能控制User在DB级别上执行的操作，管理员可以创建自定义角色，控制用户在集合级别（Collection-Level）上执行的操作，即，控制User在当前DB的特定集合上执行特定的操作

### 2.账户管理

#### 2.1查

+ use admin
+ show users 或 db.system.users.find() 或 db.runCommand({usersInfo:"userName"})

#### 2.2增

1. 切换数据库：use admin

2. 创建超管

   + ```sh
     db.createUser(  
       { user: "admin",  
         customData：{description:"superuser"},
         pwd: "admin",  
         roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]  
       }  
     ) 
     ```

3. 创建不受访问限制的超级用户

   + ```sh
     db.createUser(
         {
             user:"root",
             pwd:"root",
             roles:["root"]
         }
     )
     ```

4. 创建业务数据库管理员

   + ```sh
     db.createUser({
         user:"user001",
         pwd:"123456",
         customData:{
             name:'leo',
             email:'leo@top.com',
             age:18,
         },
         roles:[
             {role:"readWrite",db:"db001"},
             {role:"readWrite",db:"db002"},
             'read'// 对其他数据库有只读权限，对db001、db002是读写权限
         ]
     })
     ```

5. 创建其他数据管理员

   + ```sh
     // 登录管理员用户
     use admin
     db.auth('admin','admin')
     // 切换至db001数据库
     use db001
     // ... 増查改删该数据库专有用户
     ```

#### 2.3删

1. 删除用户

   + ```sh
     use admin
     db.dropUser('user_name')
     ```

#### 2.4改

1. 修改密码

   + ```sh
     use admin
     db.changeUserPassword("username", "xxx")
     ```

2. 修改密码与用户信息

   + ```sh
     db.runCommand(
         {
             updateUser:"username",
             pwd:"xxx",
             customData:{title:"xxx"}
         }
     )
     ```

#### 2.5注

+ 和用户管理相关的操作基本都要在admin数据库下运行，要先use admin;
+ 如果在某个单一的数据库下，那只能对当前数据库的权限进行操作;
+ db.addUser是老版本的操作，现在版本也还能继续使用，创建出来的user是带有root role的超级管理员。
+ 参考：
  + https://segmentfault.com/a/1190000015603831
  + https://www.jianshu.com/p/62736bff7e2e
  + https://www.cnblogs.com/dbabd/p/10811523.html#autoid-1-0-0

### 3.认证

1. 登录时认证

   + `mongo -port 27017 -u "admin"  -p "123456" --authenticationDatabas`

2. 先登录再认证

   + ```sh
     mongo;
     use admin;
     db.auth("user_name", "pwd")
     ```



## 五.库管理

### 1.查

+ show dbs    // 查看数据库
+ db    // 查看当前进入的是哪个数据库

### 2.增

+ use db_name    // 当库不存在时会自动创建

### 3.删

+ db.dropDatabase()    // 在哪个数据库执行就会删除哪个数据库

## 六.集合管理

### 1.查

+ show collections    // 查看集合

### 2.增

+ db.createCollection('集合名称');

### 3.删

+ db.集合名称.drop()

## 七.文档管理

### 1.查

#### 1.1语法

1. 查询指定文档

   + ```sh
     db.<collection>.find(
         <query>,
         <projection>
     )
     # query: 查询条件, 相当于MySQL中的where
     # projection: 投影条件, 规定了结果集中显示那些字段, 相当于MySQL中的 select 字段1, 字段2, .. 
     
     ex: 
       db.person.find({name:'zs'})
       db.person.find({'book.name':'JavaScript'}) # 文档中又包含文档，通过.连接多层
     ```

2. 查询所有文档

   + `db.<collection>.find();`  // 不传入条件, 默认就是查询所有

#### 1.2比较操作符

1. 比较操作符

   + $eq: 等于 / $ne: 不等于    // 没有指定字段也算作不等于
   + $gt: 大于 / $gte: 大于等于
   + $lt: 小于 / $lte: 小于等于

2. 使用格式

   + ```sh
     db.<collection>.find(
         {<field>: {$<operator>: <value>}},
         <projection>
     )
     ex:db.person.find({age:{$gte: 18}})
     ```

3. 其他比较操作符

   + $in: 匹配和任意指定值相等的文档
   + $nin:匹配和任意指定值都不相等的文档    // 没有指定字段也算作不包含

4. 使用格式

   + ```sh
     db.<collection>.find(
         {<field>: {$<operator>: [<value1>, <value2>, ...]}},
         <projection>
     )
     ex:db.person.find({name:{$in:['zs', 'ls']}})
     ```

#### 1.3逻辑操作符

1. 逻辑操作符

   + $not: 匹配条件不成立的文档
     + `{<field>: {$not: {<expression>}}}`
     + $not运算符和$ne/$nin一样, 如果需要查询的字段不存在, 也会算作条件成立
   + $and: 匹配条件全部成立的文档
     + `{<field>: {$and: [{<expression1>}, {<expression2>}, ...}]}`
   + $or : 匹配至少一个条件成立的文档
     + `{<field>: {$or: [{<expression1>}, {<expression2>}, ...}]}`
   + $nor: 匹配多个条件全部不成立的文档
     + `{<field>: {$nor: [{<expression1>}, {<expression2>}, ...}]}`
     + $nor运算符和$ne/$nin/$not一样, 如果需要查询的字段不存在, 也会算作条件成立

2. 例子

   + ```sh
     # 查询所有名称叫做zs的未成年人
     db.person.find({$and:[{name:{$eq:'zs'}},{age:{$lt:18}}]})
     ```

#### 1.4字段操作符

1. 字段操作符

   + $exists: 查询包含某个字段的文档
     + `{<field>: {$exists: <boolean>}}`
   + $type:  查询指定字段包含指定类型的文档
     + `{<field>: {$type: <BSON> or [<BSON1>, <BSON2>]}}`

2. 例子

   + ```sh
     # 要求查询出所有拥有gender属性的文档
     db.person.find({gender:{$exists: true}})
     ```

3. 应用场景

   + 配合$ne/$nin/$nor/$not来清理数据

   + ```sh
     # 要求查询出所有age属性的取值是字符串类型的文档
     db.person.find({age:{$type:'string'}})
     ```

#### 1.5数组操作符

1. 数组操作符

   + $all   : 匹配数组中包含所有指定查询值的文档
     + `{<field>: {$all: [<value1>, <value2>, ...]}}`
   + $elemMatch: 匹配数组中至少有一个能完全匹配所有的查询条件的文档
     + `{<field>: {$elemMatch: {<query1>, <query2>, ...}}}`

2. 例子

   + ```sh
     # 查询tags中同时拥有html和js的文档
     db.person.find({tags:{$all:['html', 'js']}})
     ```

#### 1.6运算操作符

1. 查询满足正则的文档

   + `{ <field>: { $regex: /pattern/, $options: '<options>' } }`

   + `{ <field>: { $regex: /pattern/<options> } }`

   + ex

     + ```sh
       # 要求查询出所有姓z的人(文档)
       db.person.find({name:{$regex:/^z/, $options: 'i'}})
       # 要求查询出所有姓是z或者l的人(文档)
       db.person.find({name:{$in:[/^z/i, /^l/i]}})
       ```

#### 1.7文档游标

1. what
   + 执行find方法后，find方法会返回一个文档游标
2. 文档游标常用方法
   + hasNext(): 是否还有下一个文档
   + next():  取出下一个文档
   + forEach(): 依次取出所有文档
3. 注意
   + 默认情况下通过文档游标遍历完所有文档后, 系统会在10分钟后自动关闭当前游标
   + 如果不想自动关闭, 我们可以通过noCursorTimeout函数来保持游标一直有效
   + 如果想手动关闭游标, 我们也可以通过close函数来手动关闭游标

#### 1.8分页排序

1. 分页

   + `cursor.limit(<number>)`: 取多少个文档

   + `cursor.skip(<offset>)` : 跳过多少个文档

   + ex

     + ```sh
       var cursor = db.person.find()
       # 需求: 要求取出前5个文档
       cursor.limit(5)
       # 需求: 要求跳过前面的5个文档, 取出剩余的所有
       cursor.skip(5)
       # 注意点: 我们可以直接在find方法后面调用limit方法或者skip方法
       db.person.find().limit(5)
       db.person.find().skip(5)
       
       # 链式调用，无论skip写在前面还是后面, 都会在limit之前执行
       db.person.find().skip(5).limit(5)
       ```

2. 排序

   + cursor.sort({field: ordering, ...}): 按照指定规则排序
     + ordering为1表示升序排序
     + ordering为-1表示降序排序
   + ex: `db.person.find().sort({age:1})`

3. 注意点

   + 默认情况下find方法只会返回100个文档
   + sort函数永远在分页函数之前执行

#### 1.9聚合函数

1. 统计函数
   + `cursor.count(<applySkipLimit>)`: 统计集合中文档的个数
     + applySkipLimit默认为false, 表示忽略skip和limit
   + 注意点
     + 在find函数不提供筛选条件时, count函数会从集合的元数据中取得结果
     + 在单台电脑上是这个结果是准确的,但是如果数据库为分布式结构(多台电脑)时,如果不给find函数提供筛选条件, 那么count函数返回的结果并不一定准确

### 2.增

1. 插入数据
   
+ db.集合名称.insert(文档对象);
   
2. 注：

   + 在使用insertXXX写入文档时, 若集合不存在会自动创建

3. 插入到一个指定文档

   + insertOne

      + ```sh
        db.<collection>.insertOne(
            <document>,
            {
                writeConcern: <document>
            }
        );
        # document: 需要写入的文档
        # writeConcern: 写入安全级别
        ex:db.person.insertOne({name:'zs', age:18})
        ```

      + 安全级别用于判断数据是否写入成功，级别越高越安全

   + save

      + ```sh
        db.<collection>.save(
            <document>,
            {
                writeConcern: <document>
            }
        );
        # 集合不存在时会自动创建
        ex:db.person.save({name:'ls', age:19})
        ```

   + insertOne与save区别

      + 主键冲突时insertOne会报错,而save会直接用新值覆盖久值，相当于一个插入新数据，一个保存新数据

4. 写入多个文档

   + ```sh
     db.<collection>.insertMany(
         [<document>, ...],
         {
             writeConcern: <document>,
             ordered: <boolean>
         }
     );
     db.person.insertMany([{name:'zs', age:18},{name:'ls', age:19},{name:'ww',age:20}])
     # ordered: 是否按顺序写入,ordered默认取值是true, 也就是会严格按照顺序写入,如果ordered是false, 则不会按照顺序写入, 但写入效率更高(系统会自动优化)
     
     # 注意：
     # 若ordered是true, 前面的文档出错, 后面的所有文档都不会被写入
     # 若ordered是false, 前面的文档出错, 后面的所有文档也会被写入
     ```

5. 写入一个或多个文档

   + ```sh
     db.<collection>.insert(
         <document> or ,[<document>, ...]
         {
             writeConcern: <document>,
             ordered: <boolean>
         }
     );
     # insertOne和insertMany结合体
     ```

### 3. 删

1. `db.<collection>.remove(<query>, <options>)`
   + `<query>`: 删除筛选条件
   + `<options>`: 删除额外配置
2. ex
   + db.person.remove({name:'zs'})  // remove方法默认就会删除所有满足条件的数据
   + db.person.remove({name:'ls'},{justOne:true})  // 删除第一个满足条件
   + db.person.remove({})    // 删除所有文档

### 4.改

1. save()
   + save用于往集合里添加一个新文档或者覆盖文档，当没有指定文档`_id`的时候就是新增，当指定了集合中已经存在的_id的时候就是覆盖
2. update()
   + `db.collection.update(<filter>, <update>, <options>)`
     + `<filter>`: 筛选条件
     + `<update>`: 新的内容
     + `<options>`: 额外配置
   + ex: `db.person.update({name:'lnj'}, {name:'zs'})`
   + 默认情况下如果`<update>`没有使用更新操作符, 那么就会使用指定的内容覆盖符合条件的内容
   + 更新操作符
     + $set: 更新或者新增字段, 字段存在就是更新, 字段不存在就是新增
       + `{$set:<value1>, ...}`
       + ex: `db.person.update({name:'zs'}, {$set:{name:'itzb'}})`
     + $unset: 删除字段
       + `{$unset:{<field>:'', ...}}`
     + $rename: 重命名字段
     + $inc:更新字段值(增加或者减少字段保存的值)
     + $mul:更新字段值(乘以或者除以字段保存的值)
     + $min:比较保留更小字段值
     + $max:比较保留更大字段值
     + $addToSet: 向数组字段中添加元素
     + $push: 向数组字段中添加元素(不去重)
     + $pop: 从数组字段中删除元素
     + $pull: 从数组字段中删除特定元素
     + $pullAll: 从数组字段中批量删除特定元素
     + $  : 更新数组中满足条件的特定元素
     + $[]: 更新数组中所有元素
3. findAndmodify()

+ db.集合名称.update({"id":10},{$set:{"name":"tom10"}})  格式：条件在前，修改在后

## 八.聚合

1. what

   + 聚合操作就是通过一个方法完成一系列的操作
   + 在聚合操作中, 每一个操作我们称之为一个阶段，聚合操作会将上一个阶段处理结果传给下一个阶段继续处理，所有阶段都处理完毕会返回一个新的结果集给我们

2. 格式

   + ```sh
     db.<collection>.aggregate(<pipeline>, <options>)
     # <pipeline>: 定义每个阶段操作
     # <options> : 聚合操作额外配置
     ```

3. 聚合管道阶段

   + $project: 对输入文档进行再次投影
   + 作用  : 按照我们需要的格式生成结果集
   + 格式  : `{$project:{<field>:<value>}}`

4. 聚合表达式

   + 后续补充

## 九.主键

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

## 十.索引

### 1.查

1. `db.<collection>.getIndexes()`    // 获取某个集合索引
2. `db.<collection>.explain().<method()>`    // 查看某个方法是否使用了索引
   + winningPlan->stage->COLLSCAN->遍历整个集合查询
   + winningPlan->stage->IXSCAN-> 通过索引查询
   + winningPlan->stage->FETCH->  根据索引存储的地址取出对应文档

### 2.增

1. 单键索引

   ```sh
   db.<collection>.createIndex({<field>:<1 or -1>, ...}, <options>)
   # <keys>   : 指定创建索引的字段
   # <options>: 索引的额外配置
   ```

2. 复合索引

   + `db.person.createIndex({name:1, age:-1})`
   + 复合件索引只支持前缀子查询

3. 多键索引

   + 多键索引是专门针对数组字段的, 会为数组字段的每一个元素都创建一个索引

4. 唯一索引

   + `db.<collection>.createIndex({<field>:<1 or -1>, ...}, {unique:true}})`

5. 注：

   + MongoDB默认会为主键自动创建索引

### 3.删

1. `db.<collection>.dropIndex(<IndexName | IndexDefine>)`

### 4.索引稀疏性

### 5.生存时间

## 十一.数据模型

1. MongoDB中通过'内嵌式结构'、'规范式结构'、'树形结构'来表达文档之间的关系

### 1.内嵌式

1. 在一个文档中又包含了另一个文档, 我们就称之为内嵌式结构

### 2.规范式

1. 将文档存储在不同的集合中, 然后通过某一个字段来建立文档之间的关系, 我们就称之为规范式

### 3.树形

## 十二.高可用

## 十三.分布式

