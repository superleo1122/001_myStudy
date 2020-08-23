# Docker

## 一.概述

1. 帮助命令
   + docker help
   + docker xxx --help

## 二.安装与配置

### 1.安装卸载启动

1. ----------------------------------------------centos-------------------------------------------
2. 通过yum安装 (不要用root账户安装)
   + yum install docker
3. 通过docker官网给的脚本进行安装
   + wget -qO- https://get.docker.com/ | sh
4. 查看版本
   + docker --version
   + docker system info
5. 卸载
   + yum remove docker docker-engine docker-ce docker.io -y
6. 设置开机启动 （RHEL6及以下版本用service及chkconfig命令）
   + sudo systemctl enable docker
   + sudo systemctl is-enabled docker    // 查看是否开机自启动
7. 启动docker
   + sudo systemctl start docker
8. 建立docker用户组
   + sudo groupadd docker    // 建立docker用户组
   + sudo usermod -aG docker $USER    // 将当前用户加入docker组
9. 检测是否运行成功
   + docker run hello-world
10. 镜像源配置
    + upstart系统
      1. 编辑 `/etc/default/docker` 文件中的 `DOCKER_OPTS="--registry-mirror=https://registry.docker-cn.com"`
      2. 重启服务：`sudo service docker restart`
    + systemd系统
      1. 编辑 `/etc/docker/daemon.json`，修改` "registry-mirrors":["https://registry.docker-cn.com"]`
      2. 重启服务：sudo systemctl daemon-reload ;    sudo systemctl restart docker
    + docker info     // 查看镜像配置是否生效

### 2.存储驱动

1. docker可供选择的存储去驱动有多种，推荐使用Overlay2，可以通过docker system info命令查看使用的是哪种存储驱动

## 三.镜像.容器.仓库

### 概念

1. 镜像
   + 镜像是一个只读模板

2. 容器
   + 容器是读取镜像后创建的运行实例，可以看作是一个简易版的Linux实例

3. 仓库
   + 存放镜像的场所，分为共有仓库和私有仓库

## 四.镜像

### 1.查询

+ docker images    // 列举本地顶层镜像
+ docker image ls    // 列举本地顶层镜像
+ docker image ls -a    // 列举所有镜像，包括中间层，注意：中间层镜像很多名称为none，这与虚悬镜像不同，这些不能删除
+ docker image ls imageName    // 查看指定仓库名镜像
+ docker image ls imageName:16.04    // 查看指定仓库名和标签镜像

### 2.拉取镜像

+ docker pull [选项] [仓库ip:port/]仓库名[:标签]      // 仓库名一般是两段式，即 `用户名/镜像名` ，没有用户名的，一般都是官方基础镜像
+ docker pull imagesName    // 从仓库中拉取

### 3.查找镜像

+ docker search imageName    // 查找Docker Hub上的公共镜像

### 4.运行镜像

+ docker run -it ubuntu:16.04 /bin/bash   // -i表示交互式操作，-t表示指定终端
+ exit      // 退出容器

### 5.构建镜像 (两种方式)

+ 方式一：使用docker commit命令
  + docker commit 容器id 镜像名/仓库名
+ 方式二：使用docker build命令和Dockerfile文件 （推荐）

### 6.Dockerfile

+ Dockerfile是一个文本文件，其内包含了一条条指令，每条指令构建一层，这些指令描述了如何构建镜像

+ 语法

  1. FROM    // 指定基础镜像，注意一个特殊镜像scratch，这是一个概念上的镜像，意味着可以从零开始构建一切
2. RUN    // 执行命令
  3. COPY    // 将从构建上下文目录中源路径中的文件/目录复制到新的一层镜像内的目标路径位置
     + COPY 源路径 目标路径        // 目标路径可以绝对路径或相对于工作目录的相对路径
     + COPY package.json /usr/src/app/
     + COPY hom* /mydir/      // 可以使用通配符
  4. ADD    // 类似COPY，推荐使用COPY
  5. CMD
  6. ENTRYPOINT
  7. ENV    // 定义环境变量
     + ENV key=value
  8. VOLUME    // 数据卷
  9. EXPOSE      // 声明运行时容器提供服务端口
  10. WORKDIR    // 指定工作目录
  + 注：指令的两种格式
      + shell 格式 ：cmd 可执行文件
      + exec 格式 ：cmd ["可执行文件"，"参数1"，"参数2"...]
  
+ 构建命令 : build

  + docker build [选项] 上下文路径      // Dockerfile里面的路径都是相对于上下文路径的
  + docker build -t nginx:v2 .      // 在Dockerfile所在目录下执行，构建名称为 nginx:v2 的镜像，-t可以用来指定镜像名，注意这里的上下文路径 ` . `
  + docker build https://github.com/twang2218/gitlab-ce-zh.git#:8.14      // 通过URL构建
  + docker build http://server/context.tar.gz      // 用给定tar压缩包构建

### 7.推送镜像

+ docker push userName/imageName    // 推送镜像到 `Docker Hub`

### 8.删除镜像

+ docker image rm xxx  
  + xxx可以是：镜像ID，镜像摘要，`仓库名:标签`

### 9.虚悬镜像

+ 新版本镜像名与旧版同名，旧镜像名称被取消，于是出现了仓库名、标签都为none的情况
+ docker image ls -f dangling=true      // 显示虚悬镜像
+ docker image prune     // 删除虚悬镜像

## 五.容器

### 1.启动

1. 启动容器方式有两种
   + 基于镜像新建一个容器并启动 -- docker run
     + docker run 镜像名
     + docker run -it ubuntu:16.04 /bin/bash
   + 将处于中止状态的容器重新启动
     + docker container start
   + 参数：
     + --name leo_container    // 设置容器名称
     + --restart=always    // 自动重启容器
     + --restart=on-failure    // 当容器出现问题时自动重启容器

### 2.守护态运行

1. 在启动容器时添加 `-d` 参数
2. 获取后台容器输出信息
   + docker container logs [container ID or Name]

### 3.进入容器

1. 对于使用`-d`启动的容器会自动进入后台，那么此时需要对容器进行操作可以使用 `docker attach` 命令或 `docker exec` 命令
2. 推荐使用 `docker exec` 命令，因为 `docker attach` 命令在退出时会导致容器的终止
3. docker exec
   + docker exec -it containerID /bin/bash

### 4.终止容器

1. docker container stop [container ID or Name]
2. docker container ls -a      // 查看所有容器，包括终止态的

### 5.获取容器信息

1. docker inspect containerName

## 六.仓库

1. Registry是注册服务器，它是管理仓库的具体服务器，而Repository才是仓库

### 1.Docker Htb

1. 注册：在 https://cloud.docker.com 免费注册一个 Docker 账号
2. 登陆：docker login
3. 退出：docker logout

### 2.Docker私有仓库

## 七.Docker命令

### 1.常用命令

1. docker version
2. status docker  // 查看docker进程状态
3. docker info    // 查看docker信息
4. docker system df    // 查看镜像、容器、数据卷所占用的空间
5. docker ps -a     // 查看所有正在运行的容器
6. docker exec -it containerID /bin/bash    // 进入docker容器

## 八.数据卷

1. 数据卷的生命周期独立于容器，它被用来持久化数据

2. 创建一个数据卷

   + docker volume create my-vol

3. 查看卷

   + docker volume ls
   + docker volume inspect my-vol

4. 启动一个挂载数据卷的容器

   + --mount  （还有一个`-v`）

   + docker run -d --name myWeb --mount source=my-vol,target=/webapp imageName        // 创基一个myWeb的容器，并挂载一个数据卷到容器的/webapp目录
   + docker inspect myWeb    // 查看web容器信息

5. 删除数据卷

   + docker volume rm my-vol

6. 清理无效数据卷

   + docker volume prune

## 九.Docker实战

### 1.构建Tomcat

1. 查询
   + docker search tomcat
2. 拉取
   + docker pull tomcat
3. 运行
   + docker run --name tomcat -p 8080:8080 -v $PWD/test:/usr/local/tomcat/webapps/test -d tomcat
     + -p 8080:8080    // 将容器的8080端口映射到主机的8080端口
     + -v $PWD/test:/usr/local/tomcat/webapps/test：将主机中当前目录下的test挂载到容器的/test
4. 查看容器启动情况
   + docker ps

### 2.构建MySql

1. docker pull mysql
2. docker run -p 3306:3306 --name mysql -v /usr/local/docker/mysql/conf:/etc/mysql -v /usr/local/docker/mysql/logs:/var/log/mysql -v /usr/local/docker/mysql/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql
   + -p 3306:3306：将容器的3306端口映射到主机的3306端口
   + -v /usr/local/docker/mysql/conf:/etc/mysql：将主机当前目录下的 conf 挂载到容器的 /etc/mysql
   + -v /usr/local/docker/mysql/logs:/var/log/mysql：将主机当前目录下的 logs 目录挂载到容器的 /var/log/mysql
   + -v /usr/local/docker/mysql/data:/var/lib/mysql：将主机当前目录下的 data 目录挂载到容器的 /var/lib/mysql
   + -e MYSQL\_ROOT\_PASSWORD=123456：初始化root用户的密码

## 十.Docker Compose

### 1.安装卸载

1. Linux下直接下载二进制文件
   + sudo curl -L https://github.com/docker/compose/releases/download/1.17.1/docker-compose-xxxx > /usr/local/bin/docker-compose
   + sudo chmod +x /usr/local/bin/docker-compose
2. 检查版本
   + docker-compose --version
3. 卸载
   + 直接删除二进制文件即可

+ 参考：https://funtl.com/zh/docker-compose/

## 参考

1. https://funtl.com/zh/docker/

