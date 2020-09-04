# Linux基础

## 一.概述

1. 键
   + tab : 用于补全
   + ctrl + c :  中止程序
   + ctrl + d :  退出，相当于quit
2. 帮助命令
   + man    //  查询命令或文件的相关用法
   + example：man date
3. 清屏
   + clear

## 二.目录结构

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


## 三.常用命令

### 1.文件与目录操作

1. ls
   + 显示文件和目录列表
   + ls [options...] [fileFoldName...]
     + **-l** 列出文件的详细信息
     + **-a** 列出当前目录所有文件，包含隐藏文件
     + -d  仅看目录本身
2. stat
   + 显示指定文件的相关信息,比ls命令显示内容更多
3. mkdir
   + 创建目录
   + mkdir [-p] dirName
     + -p  父目录不存在情况下先生成父目录，例如 `mkdir -P ./test/child`
4. rmdir
   + 删除目录
   + rmdir dirname
5. cd
   + 切换目录
   + cd dirName
   + cd -     // 切换到上一次的目录
   + cd ~    // 切换到home目录
   + cd ..      // 切换到上级目录
6. touch
   + 生成一个空文件
7. echo
   + 生成一个带内容文件
   + echo content > fileName  创建并写入内容到指定文件
   + echo content >> fileName  将内容追加到指定文件，若文件不存在会自动创建
8. cp
   + 复制文件或目录
   + cp [options] source dest
9. rm
   + 删除文件
   + rm [options] name
     + -f  强制删除文件或目录
     + -r  删除该目录下的所有文件，递归删除，可用来删除目录
10. mv
   + 移动文件或目录，也可以用来重命名
   + mv [options...] source dest
11. pwd
    + 显示当前目录的完整路径
12. ln
    + 建立软链接
13. 文件隐藏属性
    + chattr  //此命令只能在Ext2/Ext3文件系统上生效
      + chattr +i fileName   // 给文件加i属性表示此文件不能被删除和改名
      + chattr -i fileName    // 去除i属性
      + chatrr +a fileName  // a属性表示这个文件只能增加数据，不能修改和删除数据
      + chatrr -a fileName
    + lsattr  // 查看文件有哪些隐藏属性

### 2.文件查找命令

1. which  // 查找命令文件所在位置，根据环境变量$path设置的目录查找符合条件的文件

   + `which ifconfig`   // 查询ifconfig命令位置
   + `which -a ifconfig`   // -a查询所有

2. whereis  // 查找源代码，二进制文件，帮助文件位置

   + whereis ifconfig

3. locate    // 查找符合条件的文档，文件的目录也可以当作检索条件，locate查询的是文件和目录数据库，1天1更有时效性

   + locate 关键字   // 不能使用通配符

4. **find**    // 查找指定目录下文件，扫描磁盘速度慢
+ 非管理员账户通过 sudo 执行，否则会遇到权限问题
   
+ find /home -name "fileName"    // 查找home目录下指定文件 
   + find / -name "fileNa*"     // 结合通配符查找时一定要加上引号，否则查找结果不全
   + find -name "fileNa*"     // 不加路径参数时，默认查找当前目录下文件

### 3.文件内容查阅

1. cat  // 由第一行内容开始查阅
   + cat leo.txt
   + cat **-n** leo.txt   // 列出行号
2. tac  // 倒序查阅，cat的反写
3. zcat  // 不解压文件显示文件内容
4. more  // 分页显示
   + more leo.txt
     + **空格键**：向下翻页
     + **b**：往回翻页，只对文件有效，对管道无效、
     + enter：向下滚动一行
     + /关键字：在当前显示的内容中，向下查询关键字，按n可查看一个个查找值
     + :f  : 显示当前行数
     + q：退出
5. **less**  // 分页显示
   + less leo.txt
     + **空格键**：向下翻页
     + PageDown：向下翻页
     + PageUp：向上翻页
     + /关键字：查询
     + **n**：重复前一个查询
     + **N**：反向重复前一个查询
     + q：退出
6. head  // 在头部抽取数据显示
   + head leo.txt  // 默认显示前10行
   + head -n 20 leo.txt  // 显示前20行
   + head -n -100 leo.txt  // 假设leo.txt有151行，则此命令意思为显示前51行，可以认为是151-100
7. tail  // 在尾部抽取数据显示
   + tail -n 20 leo.txt  // 显示后20行
   + tail -f leo.txt   // 持续显示尾部内容
   + **tail -200f leo.txt**  // 持续显示后200行内容
   + head -n 20 leo.txt | tail -n 10    // 显示第11行到20行内容

### 4.文件系统管理

1. 磁盘与目录容量
   + df  // 列出文件系统的整体磁盘使用量，显示的是整个磁盘的信息
     + df -h  // 以GB,MB,KB等格式自行显示，最常用，不加路径表示当前目录目录所在磁盘，加路径表示目录所在磁盘
   + du  // 评估目录所占容量
     + du -sh   // 以易读方式列出当前目录容量
     + du -sh /mysoft/*    // 以易读方式列出mysoft目录下所有文件和目录的大小
     + -s  ：列出总量
     + du -h --max-depth=1    // 查看当前目录下所有目录及文件大小
2. 连接文件：ln
3. 磁盘分区、挂载与卸载

### 5.开关机命令

1. stutdown
   + 关机
   + stutdown -h now 现在立即关机
   + stutdown -r  now 现在立即重启
2. reboot
   + 重启

### 6.压缩命令

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
   + tar -zxvf test.tar.gz  解压文件
2. gzip
   + 可以解开gzip等软件的压缩文件
   + gzip [选项] 文件名
     + -d  解压文件
     + -l  显示压缩的相关信息
     + -v  显示文件名和压缩比
3. bzip2
   + 压缩文件后缀为bz2
   + bzip2 [-cdz]
     + -d  解压文件
     + -z  压缩文件
4. unzip
   + 解压zip文件
   + unzip file.zip

## 三.用户和组

### 1.组账户

+ 私有组
  + 当创建一个用户时没有指定属于哪个组时，Linux会创建一个与用户同名的私有组，改组只包含该用户
+ 标准组
  + 当创建一个用户时选择一个标准组，所一个用户同时属于多个组，则登陆后的组为主组，其余为附加组

### 2.账户系统文件

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

### 3.账户管理命令

1. ------------------------------------------------------------账户管理----------------------------------------------------------------
2. useradd
   + 新增用户
   + **useradd username**  // 默认会创建一个与账户名同名的用户组，创建账户后还需要使用passwd命令设置密码才算完成账号注册
     + -u :  UID
     + **-p** :  口令
     + **-g** :  分组
     + -s :  shell
     + -d :  用户目录
     + -D ：查看useradd默认值
   + useradd -g groupName username    // 新建用户并添加到指定组
3. userdel
   + 删除用户
   + userdel username
     + -r  ：删除账号时同时删除目录
4. usermod
   + 对账号信息进行微调
   + usermod -l newName oldName    // 修改用户名
     + 修改名称前需要先杀掉该用户的所有进程：
     + pkill -u 用户名
     + pkill -9 -u 用户名
5. 口令维护
   + **passwd 用户账户名**  // 设置用户口令
   + passwd -l 用户账户名  // 锁定用户账户
   + passwd -u 用户账户名  // 解锁用户账户
   + passwd -d 用户账户名  // 删除账户口令
6. 其他
   + useradd,userdel,usermod,passwd都是管理员账号可以使用的命令
7. ------------------------------------------------------组管理--------------------------------------------------
8. 组账号维护
   + groupadd  组账户名    // 创建新组
     + -g  :  指定组GID
   + groupmod
     + 修改组
     + -g ：修改组GID
     + -n :  修改组账户名
     + example：groupmod -n newName oldName
   + groupdel
     + groupdel 组账号名  // 删除指定组账号
   + gpasswd
     + **gpasswd -a 用户账户名 组账户名**   // 将指定用户添加到指定组
     + **gpasswd -d 用户账户名 组账户名**   // 将用户从指定组中删除
     + gpasswd -A 用户账户名 组账户名   // 将用户指定为组的管理员
9. 用户和组状态
   + id  用户名  // 显示用户的UID，GID
   + whoami   //  显示当前用户名称
   + **groups**   // 显示用户所属组

### 4.ACL权限管理

### 5.用户身份切换

+ su

  + 参数
    + -l  ：以login-shell方式切换账户
    + -c ：仅进行一次命令，类似于sudo
  + 注
    + Linux中切换账号方式有两种
      1. login-shell   //  登陆方式切换会将环境变量也进行切换
      2. nologin-shell  //  非登陆方式切换不会将环境变量进行切换，还是使用原先账户的环境变量
    + 退出su环境可以使用 `exit` 命令

  + su    // 以非登陆方式切换到root账户，需要输入root账号密码
  + su -    // 以登陆方式切换到root账户，需要输入root账号密码，推荐
  + su username   // 以非登陆方式切换账户，root->普通账户，不需要密码，普通1->普通2，需要输入普通2密码
  + su -l username  // 以登陆方式切换账户，root->普通账户，不需要密码，普通1->普通2，需要输入普通2密码，推荐

+ sudo

  + 以root身份执行命令，仅需自己密码即可，仅有/etc/sudoers用户才能执行sudo命令

  + visudo

    + 用来编辑/etc/sudoers文件的专门命令

    + visudo    // 执行后进入vim环境，可以对配置进行修改

      1. 将用户添加进sudo：找到`root ALL=(ALL) ALL` ，在下面添加一个用户配置即可，参数可根据情况选择，ALL代表可执行所有命令

      2. 配置用户组的sudo：添加`%groupName ALL=(ALL) ALL` , %表示这是一个用户组，新增完了，这个组的用户都能执行sudo命令

      3. 为用户执行sudo命令时免除密码输入：添加 `%groupName ALL=(ALL) NOPASSWD:ALL` , 这个为组设置的，有没为单个用户设置的呢？

      4. 不切换root账号转为root身份：

         + ```shell
           [root@~]visudo
           User_Alias ADMINS = user1,user2,user3
           ADMINS ALL=(root) /bin/su -
           ```

         + user1,user2,user3只要输入 `sudo su-` ，然后输入自己账号密码，则会立刻变为root身份
         
      5. 修改普通用户免密sudo的时长
      
         + 找到`Defaults env_reset`，修改为`Defaults env_reset, timestamp_timeout=x`，x表示时间，单位为分钟，设置为0表示每次使用sudo均需要输入密码

### 6.用户信息

1. 用户查询
   + who    // 当前已登陆在系统上的用户
   + last     //  所有登陆者信息
   + lastlog   // 每个账号最后登陆信息
   + history    // 查看当前用户在系统中执行过的命令
   + id   // 查看当前用户uid,gid

## 四.文件权限管理

### 1.查看文件和目录权限

+ ls -l
+ 显示信息 ：`drwxr-xr-x 10 root root     4096 Jun 16 17:56 NeteaseCloudMusicApi-master`
  + 文件类型，文件权限，文件所属用户，文件所属组，文件的大小，文件的创建时间，文件的名称
    + 文件类型：d 表示目录，l 表示软链接，- 表示文件
    + 文件权限三个字符为一组，r 只读，w 可写，x 可执行，- 表示无此权限，第一组为当前用户权限，第二组为用户组权限，第三组为其他用户权限
    + 连接数，指有多少个文件指向同一个索引节点

### 2.chown

+ chown：更改文件所有者 chang owner

+ 更改文件所属用户及所属组
  + chown -R 用户名称 文件或者目录    // 更改文件所属用户，-R 为递归更改，表示将目录下所有文件及文件夹进行变更
    + `chown -R superleo foldName`  
  + chown -R 用户名称:用户组名称 文件或目录  // 更改用户及用户组
    + `chown -R superleo:leo foldNameq`

### 3.chgrp

+ chgrp： 改变文件所属组

+ chgrp leo test.log     // 将test.log文件添加到leo组
+ chgrp -R leo test       //  递归遍历test文件夹并将其添加到leo组 n

### 4.chmod 

+ chmod ：更改文件权限

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

## 五.编辑器

### 1.vim

1. 运行模式

   + 普通模式：可以使用上下左右按键移动光标，可以删除字符和删除整行，也可以复制粘贴数据，但不能编辑
   + 编辑模式：普通模式下，按`i,I,o,O,a,A,R`进入编辑模式，按esc退出编辑模式回到普通模式
   + 命令模式：普通模式下，按`:,/,?`进入命令模式，在此模式下，可以对数据进行查找、读取、保存、替换操作，也可以离开vim，显示行号等，按esc退出命令模式回到普通模式

2. 命令（命令模式下）

   + 普通模式切换到编辑模式
     + i ：进入插入模式，从目前光标所在处插入
     + I ：进入插入模式，从目前光标所在行第一个非空格符处开始插入
     + a ：进入插入模式，从目前光标所在处的下一个字符开始插入
     + A ：进入插入模式，从光标所在行的最后一个字符处开始插入
     + o ：进入插入模式，在当前光标所在行的下一行插入新行
     + O ：进入插入模式，在当前光标所在行的上一行插入新行
     + r ：进入替换模式，r只会替换光标所在那个字符一次
     + R ：进入替换模式，R会一直替换光标所在字符，直到按esc键退出
     + esc键 ：退出编辑模式回到普通模式

   + 普通模式

     + ------------------------------------------------------- 光标移动 ---------------------------------------------------------------

     + h 或 左箭头 ：光标左移    // 20h 可以直接向左移动20个字符，箭头键也同理
     + l 或右箭头 ：光标右移
     + j 或上箭头：光标上移
     + k 或下箭头 ：光标下移
     + ctrl + f ：相当于pagedown
     + ctrl + b ：相当于pageup
     + num + space ：先按数字，在按空格键，光标会移动num个字符
     + 0 / home键 ：光标移动到行首
     + $ / end键 ：光标移动到行尾
     + H ：光标移动到屏幕首字符
     + L ：光标移动到屏幕最下方行首
     + G ：光标移动到文件最后一行
     + num + G ：光标移动到这个的第n行
     + gg ：光标移动到这个文件第一行，相当于1G
     + num + enter键 ：向下移动num行
     + ----------------------------------------------------------删除----------------------------------------------------------
     + x ：小写，向后删除一个字符
     + X ：大写，向前删除一个字符
     + num + x ：连续向后删除num个字符
     + dd ：删除光标所在行
     + num + dd ：删除光标所在的向下num行
     + d1G ：删除光标所在行到第一行的所有数据，包括光标所在行
     + dG ：删除光标所在行到最后一行的所有数据，包括光标所在行
     + d$ ：删除从光标所在位置到该行的最后一个字符
     + d0 ：删除光标所在位置到该行最前面一个字符
     + ----------------------------------------------------------复制------------------------------------------------------------
     + yy ：复制光标所在行
     + num + yy ：复制光标所在行的向下num行
     + y1G ：复制光标所在行到第一行的所有数据
     + yG ：复制光标所在行到最后一行的所有数据
     + y0 ：复制光标所在位置到该行行首所有数据
     + y$ ：复制光标所在位置到该行行尾所有数据
     + ---------------------------------------------------------粘贴---------------------------------------------------------------
     + p ：小写，将数据粘贴在光标下一行
     + P ：大写，将数据粘贴在光标上一行
     + ----------------------------------------------------------杂------------------------------------------------------------------
     + J ：将光标所在行与下一行的数据结合成一行
     + u ：撤销上一个操作
     + . ：重复前一个操作

   + 命令模式

     + ----------------------------------------------------------查找---------------------------------------------------------------
     + /word ：向下查找
     + ?word ：向上查找
     + n ：进行上一个查找操作
     + N ：反向进行上一个查找操作
     + ----------------------------------------------------------替换---------------------------------------------------------------
     + :num1,num2s/word1/word2/g ：在第num1行和num2行之间寻找word1字符串，并替换为word2
     + :1,$s/word1/word2/g ：从第一行到最后一行查找word1，然后替换为word2
     + :1,$s/word1/word2/gc ：从第一行到最后一行查找word1，然后替换为word2，并在替换前让用户确认是否替换
     + ----------------------------------------------------------保存离开--------------------------------------------------------------
     + w ：保存
     + w! ：针对只读文件强制保存，但跟用户权限有关呀

     + q ：退出vim，未修改或修改并保存后的情况下退出

     + q! ：强制离开不保存文件

     + wq ：保存后退出

     + w fileName ：将当前内容保存为指定文件，相当于另存为
     + -------------------------------------------------------------vim配置----------------------------------------------------------------

     + set number ：显示行号

     + set nonumber ：不显示行号

3. 文件恢复

   + 在使用vim编辑文件时，vim会自动生成.filenam.swap的隐藏文件，在出现意外导致文件没有保存时，可通过这个文件进行恢复
   + vim被不正常中断时打开文件有如下操作提示，根据实际情况进行处理即可
     + O [open Read-Only] ：以只读方式打开，假如有另一个人正在编辑这个文件，可以采用这个方式
     + E [edit anyway] ：正常方式打开文件进行编辑，不会载入暂存文件内容，但有可能会导致两个用户互相改变对方文件的问题，不推荐此法
     + R [recover] ：加载暂存文件内容，恢复之前未保存的内容，但最后保存离开vim后，需要手动删除那个swap暂存文件
     + D [delete it] ：确定暂存文件无用，在打开文件前将暂存文件删除
     + Q [quit] ：离开vim，不进行任何操作
     + A [abort] ：通Q类似，也是离开vim

4. 块选择

5. 多文件编辑

6. 多窗口功能

7. vim环境设置与记录

## 六.shell命令及工具

### 1.常用命令

+ cat /etc/shells     // 查看系统支持哪些shell
+ chsh    // change shell
  + chsh -l    // 列出可用shell
  + chsh -s /bin/zsh    // 设置此账户的shell
+ alias    // 为常用命令设置别名
+ type   // 判断命令类型，是外部命令还是shell内置命令
+ source 配置文件    // 使配置文件生效
+ date  // 查看系统时间
  + date
  + date "+%Y-%m-%d %H:%M:%s"    // 2020-08-22 12:12:12

### 2.数据流重定向

+ 数据流重定向即将原本输出到控制台的信息输出到其他地方，例如文件

+ 输入输出
  + stdin 标准输入：代码为0，使用 < 或 <<
  + stdout 标准输出：代码为1，使用 > 或 >>  ，也可以 1> 或 1 >>
  + stderr 标准错误输出：代码为2，使用 2> 或2>>
  
+ 重定向
  
  + 注：> 为覆盖，>>为追加
  
  + cmd > filename  / cmd 1> filename：以覆盖的方法将正确的数据输出到指定的文件和设备上
  + cmd >> filename  / cmd 1>> filename ：以累计的方法将正确的数据输出到指定的文件和设备上
  + cmd 2> filename ：以覆盖的方法将错误的数据输出到指定的文件和设备上
  + cmd 2>> filename ：以累加的方法将错误的数据输出到指定的文件和设备上
  + cmd >> filename 2>&1 ：把标准错误输出重定向到标准输出并以追加的方式输出到filename中
  + cmd > filename 2>&1 ：把标准错误输出重定向到标准输出并以覆盖的方式输出到filename中
  + cmd >> filename 1>&2 ：把标准输出重定向到标准错误并以追加的方式输出到filename中
  + cmd > filename 1>&2 ：把标准输出重定向到标准错误并以覆盖的方式输出到filename中
  + cmd &>filename ：把标准输出和标准错误都重定向到filename中，覆盖方式
  + cmd &>>filename ：把标准输出和标准错误都重定向到filename中，追加方式
  
+ 垃圾数据黑洞
  + /dev/null     // 可以将指定数据进行丢弃
  + find /home -name .bashrc 2>/dev/null    // 只有stdout会显示在屏幕上，stderr会被丢弃
  + cat /dev/null > back.log    // 可以用来清空一个文件
  
+ 例子
  + f覆盖：find /home -name .bashrc > list_right 2> list_error     // 将正确数据和错误数据分别输出到不同文件
  + 追加：find /home -name .bashrc 1>> list_right 2>> list_error     // 将正确数据和错误数据分别输出到不同文件
  + 覆盖：find /home -name .bashrc > list 2>&1   /     find /home -name .bashrc &> list      // 将正确和错误数据写入到同一个文件，这两个方式都可以
  + 追加：find /home -name .bashrc >> list 2>&1  (推荐)   /     find /home -name .bashrc &>> list

### 3.逻辑判断 && ||

+ cmd1 && cmd2     // 若cmd1执行完毕且正确执行，则执行cmd2；若cmd1执行完毕且错误，则不执行cmd2
+ cmd1 || cmd2      // 若cmd1执行完毕且正确执行，则不执行cmd2；若cmd1执行完毕且错误，则执行cmd2
+ 注：在Linux中，每条命令执行完毕都会返回一个值，若$?=0，则表示正确执行，若$?!=0，则表示执行错误

### 4.管道命令

+ 说明
  + 管道命令 `|` 仅能处理由前一个命令传递的正确信息，即standard output，对于standard error output会给予忽略
  + 管道命令必须能够接收来自前一个命令输出的数据，并将这些数据作为standard input继续处理，例如less,more,head,tail等都是管道命令，而ls,cp,mv等就不是管道命令

### 5.选取命令

+ cut   // 从文件中剪切数据输出到标准输出，它不会整行输出，可以认为是提取我们想要的信息
+ grep  // 在文件中查找指定关键字，并将关键字所在行数据拿出来进行标准输出
  + -c ：统计匹配到关键字的次数
  + -i ：忽略大小写
  + -n ：显示行号
  + --color=auto ：关键词颜色高亮
  + example
    + grep -n 'superleo' leo.log    // 引号里可以直接填关键字，也可以填正则表达式

### 6.排序命令

+ sort
+ uniq  // 将重复行删除只显示一个
+ wc  // 数据统计
  + -l ：仅列出列
  + -w ：列出多少字
  + -m ：列出多少字符

### 7.数据处理命令

+ sed
  + 可进行数据的替换、删除、新增、选取特定行操作
  + --------------------------删除行-----------------------------------
  + cat /home/test.log | sed '2,5d'     // 删除2~5行
  + --------------------------新增行-----------------------------------
  + cat /home/test.log | sed '2a hello world'    // 在第二行后面添加hello world这一行
  + --------------------------替换行-----------------------------------
  + cat /home/test.log | sed '2,5c no 2-5 line'   // 将2~5行内容替换成 no 2-5 line
  + --------------------------选取行------------------------------------
  + cat /home/test.log | sed -n '2,5p'     // 选取2~5行内容显示，一定要带-n
+ awk
  + 将一行数据分成多个字段进行处理

### 8.比较工具

+ diff 
  + diff [-bBi] from-file to-file
    + b ：忽略行中空白区别
    + B ：忽略空白行区别
    + i ：忽略大小写
  + diff text.old text.new
+ patch
  + 为区别文件只做补丁

### 9.切割合并

1.   split  // 对文件进行切割    

   + `-b numk:指定按多大kb进行切割，单位有b,k,m等；-l num :以行数进行切割 ；prefix :生成的切割文件名前缀`

   + split -b 200k /mysoft/test.log testlog-
   + split -l 100 /mysoft/test.log testlog-

2. 使用数据流重定向对文件进行合并

   + cat testlog-* >> testlog.log

### 8.其他命令

1. 参数代换 xargs
2. 双向重定向 tee
3. 字符转换：tr, col, join, paste, expand

### 9.关于减号 -

+ 在使用管道命令时，stdin和stdout可以用 `-` 代替

## 七.任务调度

### 1.at

+ 仅执行一次

### 2.crontab

+ 可以循环执行
+ 用户限制
  + /etc/cron.allow  // 将可以使用crontab命令的账户写入其中，不在这个文件里的账户则不可以使用crontab
  + /etc/cron.deny   // 将不可以使用crontab的账号写入其中，则未在这个文件中的账户就可以使用crontab
  + 二者使用一个即可，allow比deny权限高
+ 使用crontab命令新建定时任务后，定时任务信息会被记录到`/var/spool/cron/`文件夹下，文件名以账号区分，注意不要使用vim直接编辑文件，否则可能会由于语法错误导致cron不能正常执行
+ 语法
  + crontab [-u username] [-elr]
    + -u ：只有root账户可以执行，此参数可用来管理其他账户的cron
    + -l ：列出cron任务
    + -e ：编辑cron任务
    + -r ：删除当前用户的所有cron任务，若要删除某条cron任务，请使用 -e
  + cron编辑
    + cron表达式 cmd
    + 0 0 1 1 * /home/script/test.sh

## 八.程序管理

### 1.job管理

1. 后台工作状态：暂停 、运行中
2. 命令
   + & ：将&放到需要执行的命令最后可以将此job放到后台运行，若执行的命令会有stdout或stderr，那么应该重定向到文件中，否则会在屏幕上输出
     + find / -name 'nohup.*' >> test.log 2>&1 &
   + ctrl + z ：将目前工作丢到后台中暂停
   + jobs [-lrs]
     + -l ：列出所有job
     + -r ：列出正在后台运行的job
     + -s ：列出暂停的job
   + fg ：将后台工作拿到前台处理
     + fg num     // 取出工作号为num的job
     + fg %num    // %可有可无
   + bg ：将后台中暂停的工作变为run
     + bg %num
3. 脱机管理
   + 远程连接linux，并且是通过&方式放到后台的，那么在断开连接后，放到后台的工作也会中止，要想脱机也能运行，那么需要使用nohup命令
   + nohup  // 表示不挂断的运行命令
     + nohup cmd    // 在前台不挂断工作
     + nohup cmd &  // 在后台不挂断工作
     + ex：nohup /home/script/test.sh & 
     + 注：若cmd执行后有输出，且没指定输出到哪，那么nohup会默认输出到nohup.out

### 2.进程管理

1. 进程的5种状态
   + R  运行：正在运行或在运行队列中等待
   + S  中断：休眠中，等待某个条件的形成或接收信号
   + D  不可中断
   + Z  僵死：进程已中止，但进程描述还存在
   + T  停止
2. 进程查看
   + ps
     + 查看进程瞬时状态
     + 参数：-A 所有进程；-a 不与terminal有关进程；-u 有效用户相关进程；-l 将PID信息详细列出
     + ps aux    // 查看系统所有进程数据
     + ps aux | grep '进程名'
     + ps -l       // 仅列出与自己bash有关的进程
     + ps -lA    // 查看系统所有数据
   + pstree   // 以进程树方式查看
     + 参数：-A : ascii码相关；-U utf8相关；-p 列出pid；-u 列出所属账号
     + pstree
     + pstree -A
     + pstree -Aup     // 列出进程树，同时显示PID和user
   + top
     + 显示当前系统中耗费资源最多的进程
     + 参数：-d num 进程界面更新秒数，默认5s；-p pid 监测指定pid进程
     + top -d 2 -p 2242
     + 在top界面可使用按键命令
       1. ? ：显示可以在top界面按下的键
       2. P ：根据CPU进行排序
       3. M ：根据内存使用进行排序
       4. N ：根据PID进行排序
       5. q ：退出top
3. 进程管理
   + kill -signal pid     
     + -1  // 重新读取一次参数的配置文件
     + -9  // 强制中止工作，有些程序的临时文件可能不会自动删除
     + -15  // 正常退出程序
     + kill -USR2 pid  // 让job重新加载配置文件
   + killall -signal 命令名称    // 关闭所有以该命令运行的进程
     + killall -9 bash

### 3.系统信息查看

1. free    // 查看内存使用情况
   + -m：以MB为单位，-g：以GB为单位，free默认以KB为单位
2. uname    // 查看系统与内核信息
   + -a ：所有系统相关信息
3. hostname  // 显示主机名称
4. netstat    // 查看网络状态
   + 参数
     + -a ：列出所有连接
     + -t ：列出tcp连接
     + -u ：列出udp连接
     + -n ：不列出进程服务名称，以端口号显示
     + -l ：列出目前正在监听的连接
     + -p ：列出服务进程的pid

## 九.守护进程

### 1.概述

1. RHEL7系统替换了初始化进程init，采用全新的初始化进程systemd

### 2.daemon启动 ---- RHEL6及之前版本

1. 每个daemon启动的进程pid会被记录在/var/run目录下
2. 相关文件目录
   + /etc/init.d/*    启动脚本放置处
   + /etc/sysconfig/*    各服务的初始化环境配置文件
   + /etc/xinetd.conf    // super daemon主要配置文件
   + /etc/xinetd.d/*     // super daemon配置文件
   + /etc/*        // 各服务各自的配置文件
   + /var/lib/*      // 各服务产生的数据库
   + /var/run/*     // 各服务程序的PID记录处
3. 启动 ---- 通过脚本启动
   + ----------------------stand alone的daemon启动---------------------------------
   + /etc/init.d/servername options    // servername为服务脚本名，options为运行参数，其实就相当于执行脚本
     + /etc/init.d/syslog status    // 查看syslog服务状态
     + /etc/init.d/syslog restart     // 重新读取syslog服务的配置文件
   + ------------------------- super daemon 启动 -------------------------------------------
   + /etc/init.d/xinetd  restart     // 重新启动xineted这个服务，不过在重新这个服务之前需要先修改配置文件
4. 服务管理命令 service
   + 除了使用/etc/init.d目录下启动脚本管理服务外，也可以通过service命令进行服务的管理
   + service  [service name]  (start|stop|restart|....)       // 通过service命令运行服务
     + service crond start     // 启动服务  （crond为定时任务服务）
     + service crond restart      // 重启服务 ，等价于 /etc/init.d/crond restart
     + service crond stop    // 停止服务
     + service crond reload   // 重新加载服务
     + service crond status    // 查看服务状态
5. 启动配置命令 chkconfig
   + chkconfig crond on     // 开机自动启动
   + chkconfig crond off    // 开机不自动启动
   + chkconfig  crond     // 查看crond是否开机启动
   + chkconfig --list      // 查看各级别下服务的启动与禁止情况

### 3.daemon启动 ---- RHEL7

1. 服务管理命令 systemctl，相当于之前的service命令
   + systemctl start test.service    // 启动服务
   + systemctl restart test.service    // 重启服务
   + systemctl stop test.service    // 停止服务
   + systemctl reload test.service    // 重新加载配置文件
   + systemctl status test.service    // 查看服务状态
   + --------------------------------服务启停、自启--------------------------------
   + systemctl enable test.service    // 开机自启
   + systemctl disable test.service    // 开机不自启
   + systemctl is-enabled test.service    // 是否开机自启
   + systemctl list-unit-files --type=service    // 查看各个级别下服务的启动与禁用情况

## 十.软件安装与管理

### 1.安装软件方式

+ 通过源码安装
  1. 查看install与readme内容，非必须
  2. 建立makefile：`./configure`，通过configure或config环境检测脚本生成makefile文件，makefile文件里记录了如何对源代码进行编译的信息
  3. 清除编译结果：`make clean` ，防止有上次编译的结果
  4. 编译：`make` ，通过make命令执行makefile文件对源代码进行编译生成可执行文件
  5. 安装：`make install`
  6. 注意：源码推荐放在 `/usr/local/src` 下，安装的软件放在 `/usr/local` 下
  7. example
     + ./configure
       + --prefix=/leo/software          // 生成makefile文件，--prefix可以用来设置安装到哪，默认为/usr/local
       + --help   // 查看配置参数有哪些
     + make clean      // 先清除上次的编译文件
     + make    // 编译源码
     + make test   / make check         // 检查是否能正确安装
     + make install    // 安装编译后的可执行文件
  8. 卸载
     + 若有make uninstall，则执行此命令，若无则搜索安装文件删除之
+ 通过编译好的二进制文件安装
+ rpm
+ yum

### 2.rpm

+ rpm [options] xxx.rpm

+ 安装参数：

  + -i ：install
  + -v ：查看更详细的安装信息画面
  + -h ：显示安装进度
  + --test ：测试是否可以安装
  + --prefix path ：指定安装路径

  + --------------------------------------------example-------------------------

  + rpm -ivh xxx.rpm
  + rpm -ivh http://xxx/xxx.rpm
  + rpm -ivh xxx.rpm --test
  + rpm -ivh xxx.rpm --prefix /home/leo/soft

+ 更新

  + -U ：若已安装，则更新到最新版，否则安装最新版
  + -F ：若没安装，则不会安装，只更新目前已安装的到最新版

+ 查询

  + rpm -qa   // 查看已安装软件
  + rpm -q python    // 查看python是否安装
  + rpm -qi python     // 查看python详细信息
  + rpm -ql python     // 查看python涉及的文件及目录
  + rpm -qc python      // 查看python的配置文件
  + rpm -qR python     // 查看python依赖的文件
  + rpm -qf /usr/share/doc/python-2.7.5/LICENSE      // 查看LICENSE这个文件是属于哪个已安装软件的

+ 卸载

  + rpm -e packagename

+ 重建rpm数据库

  + rpm --rebuilddb

### 3.yum

1. 配置文件
   + /etc/yum.repos.d
   + 可以将软件的仓库文件添加进这个文件夹，然后通过yum安装
2. 查询
   + yum repolist all    // 列出所有仓库
   + yum search python     // 搜索某个软件名称或者描述的重要关键字
   + yum list      // 列出所有可以安装的软件
   + yum list installed      // 列出已安装的软件   ==> rpm -qa
   + yum list updates      // 列出可以升级的软件
   + yum list pyth*      //  模糊匹配，其实可以这样 yum list | grep 'pyth*'
   + yum info  python    // 列出python详细信息  ==> rpm -qi python
   + yum provides fileName      // 通过文件搜索软件  ==> rpm qa fileName
3. 安装
   + yum install python
   + yum reinstall python      // 重新安装
4. 升级
   + yum update python
5. 卸载
   + yum remove python
6. 数据清理
   + yum clean alla      // 清除所有仓库缓存
7. 软件包组
   + yum grouplist
   + yum groupinstall 软件包组
   + yum groupremove 软件包组
   + yum groupinfo 软件包组

### 4.apt

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

## 十一.网络

### 1.概述

1. 相关文件
   + /etc/hosts      // host配置文件
   + /etc/hostname    // 主机名称
   + /etc/resolve.conf      // dns配置文件

### 2.查询命令

1. ifconfig    // 查询、设定网络卡及IP等相关参数
   + ifconfig      // 查看所有网络接口
   + ifconfig | grep 'inet'      // 查看ip地址
2. route    // 查询设定路由表
   + route -n    // 查看路由状态，添加-n会显示ip，不添加-n的话则会显示hostname
   + 路由的增加删除略
3. ip    // 整合了ifconfig和route的功能
   + ip address show    // 查阅ip信息
4. ping    //  检测节点联通性
   + ping ip/域名
   + ping -c 3 ip    // 执行三次ping命令
   + ping -n ip      // 不反查主机名，直接使用ip输出，速度快
5. traceroute    // 跟踪节点
   + traceroute ip
   + traceroute -n ip  // 不反查主机名

6. netstat    // 查看网络状态

   + 参数

     + -r 列出路由表

     + -n 不反查主机名

     + -a 列出所有联机状态

     + -t 仅列出TCP

     + -u 仅列出UDP

     + -l  仅列出处于监听的服务

     + -p  列出PID与软件名

     + -c num  设定更新时间

   + netstat -rn    // 查看路由表

   + netstat -tulnp    // 查看目前已启动的网络服务

7. host    // 查看主机信息

   + host 域名    // 可以用来查询IP

8. nslookup    // 同host

   + nslookup 域名

### 3.联机命令

1. telnet
   + 安装: yum install telnet
   + telnet ip   // 检测ip地址是否能通
   + telnet ip port    // 检测端口是否可以访问
   + 退出
     + ctrl + c
     + ctrl + ] ，之后再按q
   
2. ssh

   + ssh原理
     + ssh利用公私钥技术对数据进行加密
     + 客户端和服务端首先交换各自公钥，然后用对方的公钥加密数据进行传输，收到数据后用各自私钥解密
     + ssh服务的公私钥保存在/etc/ssh目录下
     + 若想重置密钥，可以先删除密钥然后重启服务重新生成
       1. rm /etc/ssh/ssh_host*
       2. /etc/init.d/sshd restart
   + ssh配置文件：/etc/ssh/sshd_config
     
   + ssh username@ip    // 登陆
   + exit    // 退出

3. ssh免密登陆

   + 原理：生成一对专门的密钥用于身份验证，与/etc/ssh目录下的密钥有区别

   + 步骤
     1. ssh-keygen    // 客户端运行此命令生成密钥对，默认rsa，生成的密钥对默认保存在/home/username/.ssh目录下
     2. ssh-copy-id username@ip    // 在本地执行此命令，将本地ssh公钥文件安装到远程主机上
     3. 修改/etc/ssh/sshd_config文件，将 `PubkeyAuthentication`  设置为yes
     4. 若想禁止通过密码登陆，那么可在配置文件中将 `PasswordAuthentication` 设置为no
     5. 重启服务：systemctl restart sshd

### 4.传输命令

1. ftp

   + 安装：yum install ftp
   + 登陆：ftp [ip] [port]  ，ex: `ftp 192.168.2.1`
   + ftp界面常用命令
     + help
     + dir    // 显示远程服务器目录内容
     + cd    // 切换目录
     + get filename    // 下载指定文件
     + mget filename*    // 下载多个文件，可使用通配符
     + put filename      // 上传指定文件到服务器
     + delete filename    // 删除指定文件
     + mkdir dirname      // 建立指定目录
     + rmdir dirname    // 删除目录
     + lcd path      // 切换到本地主机目录，对于本地的其他命令，远程命令加 `l` 就是了
     + passive      // 启动或关闭passive模式
     + binary      // 数据传输模式设定为binary格式
     + bye    // 退出
2. sftp
   + sftp username@ip    // 登陆
   + exit    // 退出
   + 其余命令同 ftp 
   
3. scp    // 适用于已知文件名情况下
   + scp /etc/hosts* superleo@127.0.0.1:/etc/home/tmp    // 将本机的etc目录下的所有hosts文件上传到127.0.0.1的/etc/home/tmp目录下
   + scp uperleo@127.0.0.1:/etc/home/test.txt  /home/local    // 将远程的test文件下载到本地的/home/local目录下
   + 注意：
     + 若要传输目录，添加 `-r` 参数
   
4. wget      // 文件下载
   
   + 参数
     + -O dir    // 下载到指定目录
     + -b      // 后台下载模式
   
   + wget url
   
5. curl

   + curl是一个http命令行工具，支持上传和下载
   + curl [option] url
   + 参数
     + -o/--output ：把输出写到该文件中
     + -O/--remote-name ：把输出写到该文件中，并保留远程文件名
     + -T/--upload-file ：上传文件
   + example
     + curl http://www.baidu.com
     + curl -o linux.html http://www.linux.com    // 保存网页
     + curl -O http://www.linux.com/hello.sh    // 保存文件
     + curl -o /dev/null -s -w %{http_code} www.linux.com    // 测试网页返回值
     + 设置代理：curl -x 192.168.100.100:1080 http://www.linux.com
   + 参考
     + https://www.cnblogs.com/yanguhung/p/10115911.html
     + http://www.ruanyifeng.com/blog/2019/09/curl-reference.html

### 5.分析命令

1. tcpdump    // 抓包命令

## 十二.安全

### 1.iptables

1. 常用命令
   + iptables -L    // 查看已有规则
   + iptables -F    // 清空已有规则

## 参考

1. http://cn.linux.vbird.org/linux_server/

