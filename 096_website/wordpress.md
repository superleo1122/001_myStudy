# wordpress建站

## 一.概述

1. 环境
   + CentOS 7.6 x64
2. 使用技术
   + wordpress-5.5
   + php-7.4.9
   + mariaDB-10.5.5
   + nginx-1.18.0

## 二.步骤

### 1. 新建专门账号

+ useradd wordpress    // 新建账号同时会创建一个同名组  
+ passwd wordpress 

### 2. php环境安装

1. 参考：https://www.php.net/
2. 版本：7.4.9
3. step
   + 下载源码
   + ./configure --enable-fpm --enable-mysqlnd --with-config-file-path=/usr/local/php --with-zlib    // 配置fpm及mysql驱动，指定php.ini路径，生成Makefile
     + 可能需要额外安装的依赖
     + yum install libxml2-devel
     + yum install sqlite-devel
   + make clean  
   + make    // 编译源码
   + make test    // 安装前检查
   + make install  
   + php.ini配置
   + php-fpm配置
4. 基本命令
   + 启动php-fpm
     + sudo /usr/local/sbin/php-fpm 
   + 停止php-fpm
     + kill -9 pid
   + 重新加载
     + kill USR2 pid
   + 查看扩展文件夹目录
     + php -i | grep -i extension_dir
5. 存在问题
   + php已经废除了mysql_connect()连接方法，但wordpress有些地方还是用这个写的，所有需要安装mysql这个扩展
     + 下载：http://git.php.net/?p=pecl/database/mysql.git;a=summary
     + 进入下载好的文件目录，依次执行`phpize` `./configure` `make && make install`
     + 修改php.ini添加mysql.so扩展
6. 扩展
   + php-fpm原理：https://www.cnblogs.com/donghui521/p/10334776.html

### 3.nginx安装

1. 安装参考：https://nginx.org/en/linux_packages.html
2. 版本：1.18.0

### 4.MariaDB安装

1. 安装参考：https://mariadb.org/download/
2. 版本：10.5.5
3. mysqladmin --version    // 查看是否安装成功

### 6.wordpress

1. 下载解压到指定目录，配置nginx指向这个目录
2. 数据库配置
3. 其他操作
   + 开启debug模式查看日志

## 三.wordpress