# Linux基础

## 一.目录结构

1. 根目录下
   + bin  二进制可执行文件
   + boot  存放系统引导时使用的各种文件
   + dev  用于存放设备文件
   + **etc**  存放系统配置文件
   + **home**  存放所有用户文件的根目录
   + lib  存放跟文件系统中的程序运行所需要的共享库及内核模块
   + mnt  系统管理员安装临时文件系统的安装点
   + opt  额外安装的可选应用程序包所放置的位置
   + proc  虚拟文件系统，存放当前内存的映射
   + root  超级用户目录
   + sbin  存放二进制可执行文件，只有root才能访问
   + tmp  用于存放各种临时文件
   + **usr**  用于存放系统应用程序，比较重要的目录/usr/local 本地管理员软件安装目录
     + /usr/local  自己安装的程序
   + **var**  用于存放运行时需要改变数据的文件

## 二.概述

1. 键
   + tab : 用于补全
   + ctrl + c :  中止程序
   + ctrl + d :  退出，相当于quit

## 三.命令

### 1.操作文件目录

1. ls
   + 显示文件和目录列表
   + ls [options...] [fileFoldName...]
     + -l 列出文件的详细信息
     + -a 列出当前目录所有文件，包含隐藏文件
2. mkdir
   + 创建目录
   + mkdir [-p] dirName
     + -p  父目录不存在情况下先生成父目录
3. cd
   + 切换目录
   + cd dirName
4. touch
   + 生成一个空文件
5. echo
   + 生成一个带内容文件
   + echo content > fileName  创建并写入内容到指定文件
   + echo content >> fileName  将内容追加到指定文件，若文件不存在会自动创建
6. cat
   + 显示文本文件内容
   + cat [options...] [--help] [--version] fileName
7. cp
   + 复制文件或目录
   + cp [options] source dest
8. rm
   + 删除文件
   + rm [options] name
     + -f  强制删除文件或目录
     + -r  删除该目录下的所有文件，递归删除
9. mv
   + 移动文件或目录
   + mv [options...] source dest
10. find
    + 在文件系统中查找指定的文件
    + find -name 'fileName'
11. grep
    + 在指定文本文件中查找指定的字符串
12. tree
    + 以树状图列出目录的内容
13. pwd
    + 显示当前目录的完整路径
14. ln
    + 建立软链接
15. more
    + 分页显示文本文件内容
16. head
    + 显示文件开头内容
17. tail
    + 显示文件结尾内容
    + tail [options] fileName
      + -f  跟踪输出

### 2.系统管理命令

1. stat
   + 显示指定文件的相关信息,比ls命令显示内容更多
2. who
   + 显示当前在线登陆用户
3. hostname
   + 显示主机名称
4. uname
   + 显示系统信息
5. top
   + 显示当前系统中耗费资源最多的进程
6. ps
   + 显示瞬间的进程状态
   + ps -ef
7. du
   + 显示指定文件/目录占磁盘空间总量
   + du -h
8. df
   + 显示文件系统磁盘空间的使用情况
9. free
   + 显示当前内存和交换空间的使用情况
10. ifconfig
    + 显示网络接口信息
11. ping
    + 测试网络是否通畅
12. netstat
    + 显示网络状态
13. clear
    + 清屏
14. kill
    + 杀死一个进程
    + kill [options...] pid
    + kill -9 pid

### 3.开关机命令

1. stutdown
   + 关机
   + stutdown -h now 现在立即关机
   + stutdown -r  now 现在立即重启
2. reboot
   + 重启

### 4.压缩命令

1. tar
   + tar [-cxzjvf] 压缩打包文档名称 欲打包目录
     + -c  建立归档文件
     + -x  解开归档文件
     + -z  是否需要使用gzip压缩
     + -j  是否需要使用bzip2压缩
     + -v  压缩过程中显示文件
     + -f  使用档名
     + -tf  查看归档文件里面的文件
   + tar -zcvf test.tar.gz test\   压缩test文件夹
   + tar -zxvf test.tar.gz  解压文件夹
2. gzip
   + 解压缩文件后缀为gz
   + gzip [选项] 文件名
     + -d  解压文件
     + -l  显示压缩的相关信息
     + -v  显示文件名和压缩比
3. bzip2
   + 压缩文件后缀为bz2
   + bzip2 [-cdz]
     + -d  解压文件
     + -z  压缩文件

## 三.用户和组

### 1.组账户

+ 私有组
  + 当创建一个用户时没有指定属于哪个组时，Linux会创建一个与用户同名的私有组，改组只包含该用户
+ 标准组
  + 当创建一个用户时选择一个标准组，所一个用户同时属于多个组，则登陆后的组为主组，其余为附加组

### 2.账户系统

1. /etc/passwd
   + 每一行代表一个账号
   + `root:x:0:0:root:/root:/bin/bash`
     + 账号名
     + 口令，现在以x代替
     + UID：root用户UID为0
     + GID：与/etc/group相对应
     + 注释
     + 账户文件夹
     + shell类型
2. /etc/shadow
   + 密码相关信息
3. /etc/group
   + 用户组配置文件
   + `root:x:0:dev`
     + 用户组名称
     + 密码
     + GID
     + 此用户组包含的账户
4. /etc/gshadow
   + 定义用户组口令

### 3.常用命令

1. useradd
   + 新增用户
   + **useradd username**
     + -u :  UID
     + **-p** :  口令
     + **-g** :  分组
     + -s :  shell
     + -d :  用户目录
2. userdel
   + 删除用户
   + userdel username
     + -r  ：删除账号时同时删除目录
3. 口令维护
   + **passwd 用户账户名**  // 设置用户口令
   + passwd -l 用户账户名  // 锁定用户账户
   + passwd -u 用户账户名  // 解锁用户账户
   + passwd -d 用户账户名  // 删除账户口令
   + **gpasswd -a 用户账户名 组账户名**   // 将指定用户添加到指定组
   + **gpasswd -d 用户账户名 组账户名**   // 将用户从指定组中删除
   + gpasswd -A 用户账户名 组账户名   // 将用户指定为组的管理员
4. 组账号维护
   + groupadd  组账户名    // 创建新组
     + -g  :  指定组GID
   + groupmod
     + 修改组
     + -g ：修改组GID
     + -n :  修改组账户名
   + groupdel
     + groupdel 组账号名  // 删除指定组账号
5. 用户和组状态
   + **su 用户名**  // 切换用户账户
   + id  用户名  // 显示用户的UID，GID
   + whoami   //  显示当前用户名称
   + **groups**   // 显示用户所属组

## 四.文件权限管理

1. 查看文件和目录权限
   + ls -l
   + 显示信息 ：`drwxr-xr-x 10 root root     4096 Jun 16 17:56 NeteaseCloudMusicApi-master`
     + 文件类型，文件权限，文件所属用户，文件所属组，文件的大小，文件的创建时间，文件的名称
       + 文件类型：d 表示目录，l 表示软链接，- 表示文件
       + 文件权限三个字符为一组，r 只读，w 可写，x 可执行，- 表示无此权限，第一组为当前用户权限，第二组为用户组权限，第三组为其他用户权限
       + 连接数，指有多少个文件指向同一个索引节点
2. chown  : 更改所有者 chang owner
   + 更改文件所属用户及所属组
     + chown -r 用户名称 文件或者目录    // 更改文件所属用户，-r 为递归更改，表示将目录下所有文件及文件夹进行变更
     + chown -r 用户名称 用户组名称 文件或目录  // 更改用户及用户组
3. chmod ：更改操作权限
   + chmod [who] [ + 或者 - 或者 =] [mode] 文件名
     + who 表示操作对象，可以是下面的一个或者组合
       + u : 用户user
       + g : 用户组group
       + o : 表示其他用户
       + a : 表示所有用户
     + 操作符号
       + `+` : 表示添加某个权限
       + `-` : 表示取消某个权限
       + `=` : 表示赋予给定权限，取消文档以前的所有权限
     + mode 表示权限
       + r
       + w
       + x
     + 文件名可以用空格分开
     + 例子 `chmod u=rwx,g+r,o+r test.txt`  给当前用户添加可读可写可执行权限，给组用户和其他用户添加可读权限
   + 数字设定法
     + 用数字表示权限，0表示没有任何权限，1表示有可执行权限，2表示有可写权限，4表示有可读权限
     + 若要 `rwx` 则需要4+2+1=7，若要`rw-`则需要6，若要`r-x`则需要5...
     + 例子：`chmod 755 fileName`  表示给当前用户可读可写可执行权限，给组用户和其他用户添加可读可执行权限

## 五.软件包管理

### 1.yum

### 2.apt

1. 修改源
   + vim /etc/apt/source.list
   + apt-get update  // 更新数据源
2. 常用命令
   + **apt-get install packageName**  // 安装
   + **apt-get remove packageName**  // 卸载
   + **apt-get remove package --purge**  // 删除包及配置文件
   + apt-get update  // 更新软件包
   + apt-get build-dep package   // 安装相关的编译环境
   + apt-get source package  // 下载源代码
   + apt-get clean && apt-get autoclean  // 清除无用的包
   + apt-get check  // 检查
   + **apt-cache search packageName**  // 搜索包
   + **apt-cache show package**  // 获取包信息
   + apt-cache depends package  // 查看包依赖
   + apt-cache rdepends package  //  查看被哪些包依赖

## 五.编辑器

### 1.vim

1. 运行模式
   + 编辑模式：等待编辑命令输入
   + 插入模式：编辑模式下，输入`i`进入插入模式
   + 命令模式：输入`:`进入命令模式
2. 命令（命令模式下）
   + q  直接退出vim（未做修改情况下）
   + q!  不存盘退出
   + wq  保存后退出
   + w fileName  将当前内容保存为指定文件
   + set number 显示行号
   + set nonumber  不显示行号