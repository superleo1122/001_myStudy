# MariaDB

## 一.安装与配置

### 1.安装

1. 安装参考：https://mariadb.org/download/
2. 查看是否安装成功
   + mysqladmin --version

### 2.配置

1. 设置开机自启动

   + sudo systemctl enable mariadb

2. 启动服务

   + sudo systemctl start mariadb

3. 运行初始脚本进行配置 （root账号初始密码在这进行设置）

   + sudo mysql_secure_installation

   + ```ba
     mysql_secure_installation         #直接执行初始化命令，会弹出交互配置信息
     
     Enter current password for root (enter for none):#初次进入密码为空，直接回车
     Switch to unix_socket authentication [Y/n] n    #是否切换到unix套接字身份验证
     Change the root password? [Y/n]      #是否设置修改root密码
     New password:                #输入要为root用户设置的数据库密码。
     Re-enter new password:            #重复再输入一次密码。
     Remove anonymous users? [Y/n] y      #删除匿名帐号，建议删除
     Disallow root login remotely? [Y/n] y #是否禁止root用户从远程登录
     Remove test database and access to it? [Y/n] y  #是否删除test数据库
     Reload privilege tables now? [Y/n] y        #刷新授权表，让初始化后的设定立即生效
     ```

## 二.服务管理

### 1.启动

1. sudo systemctl start mariadb

### 2.停止

1. sudo systemctl stop mariadb

## 三.使用

### 1.常用命令

1. 登陆
   + mysql -u user_name -p    // 按回车后输入密码
   + mysql -u user_name -pxxx    // xxx为密码，与`-p`中间不能有空格，按回车直接登陆
   + 远程登陆
     + mysql -u user_name -p -h ip_address
     + mysql -u user_name -pxxx -h ip_address
2. 退出命令行界面
   + quit
   + /q

### 2.账户管理

1. 新建用户
   + create user 'user_name'@localhost identified by 'password';
   + create user 'user_name'@'%' identified by 'password';  // 允许从任何ip登录
2. 授权
   + GRANT all privileges ON databasename.tablename TO 'username'@'host' 
   + GRANT all privileges ON databasename.* TO 'username'@'%'   // 为指定用户赋予指定数据库所有表的权限，从任何ip登录都有所有权限

### 3.权限管理

### 4.库管理

1. 新建
   + create database database_name

## 待 教程

1. https://www.kaifaxueyuan.com/database/mariadb/mariadb-administration.html
2. https://www.w3cschool.cn/mariadb/mariadb_administration.html
3. https://mariadb.com/kb/zh-cn/mariadb-documentation/
4. https://cloud.tencent.com/developer/article/1184801
5. https://blog.csdn.net/ghost_leader/article/details/53366942
6. https://www.cnblogs.com/dayle/p/9941929.html

