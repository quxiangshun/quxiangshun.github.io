const n=`# Docker 部署

> 编辑日期：2026-02-26



## Docker 部署概述

Docker 是一种容器化技术，它可以将应用程序及其依赖项打包到一个轻量级、可移植的容器中，然后在任何支持 Docker 的环境中运行。使用 Docker 部署应用程序可以提高部署效率、减少环境差异，并使应用程序更加可靠。

## Docker 基础概念

### 1. 镜像（Image）

Docker 镜像是一个只读的模板，它包含了运行应用程序所需的所有内容，包括代码、运行时、库、环境变量和配置文件。

### 2. 容器（Container）

Docker 容器是从镜像创建的运行实例。容器是隔离的，它们可以有自己的网络、存储和进程空间。

### 3. 仓库（Repository）

Docker 仓库是存储镜像的地方。Docker Hub 是公共的 Docker 仓库，而私有仓库则用于存储私有镜像。

### 4. Docker Compose

Docker Compose 是一个工具，它可以使用 YAML 文件定义和运行多容器 Docker 应用程序。

## Docker 安装

### 1. Windows 安装

1. 下载 Docker Desktop for Windows：[Docker 官网](https://www.docker.com/products/docker-desktop)
2. 运行安装程序，按照提示完成安装
3. 启动 Docker Desktop，登录 Docker Hub 账号
4. 验证安装：\`docker --version\`

### 2. macOS 安装

1. 下载 Docker Desktop for Mac：[Docker 官网](https://www.docker.com/products/docker-desktop)
2. 运行安装程序，按照提示完成安装
3. 启动 Docker Desktop，登录 Docker Hub 账号
4. 验证安装：\`docker --version\`

### 3. Linux 安装

#### Ubuntu/Debian

\`\`\`bash
# 更新软件包列表
sudo apt update

# 安装依赖项
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# 添加 Docker GPG 密钥
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 添加 Docker 软件源
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"

# 更新软件包列表
sudo apt update

# 安装 Docker CE
sudo apt install docker-ce

# 验证安装
sudo docker --version

# 添加当前用户到 docker 组
sudo usermod -aG docker $USER
\`\`\`

#### CentOS/RHEL

\`\`\`bash
# 安装依赖项
sudo yum install -y yum-utils device-mapper-persistent-data lvm2

# 添加 Docker 软件源
sudo yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# 安装 Docker CE
sudo yum install docker-ce

# 启动 Docker 服务
sudo systemctl start docker

# 设置 Docker 服务开机自启
sudo systemctl enable docker

# 验证安装
sudo docker --version

# 添加当前用户到 docker 组
sudo usermod -aG docker $USER
\`\`\`

## Docker 镜像管理

### 1. 拉取镜像

\`\`\`bash
# 从 Docker Hub 拉取镜像
docker pull nginx

# 拉取指定版本的镜像
docker pull nginx:1.21.0
\`\`\`

### 2. 查看镜像

\`\`\`bash
# 查看本地所有镜像
docker images

# 查看镜像详情
docker inspect nginx
\`\`\`

### 3. 删除镜像

\`\`\`bash
# 删除指定镜像
docker rmi nginx

# 强制删除镜像
docker rmi -f nginx

# 删除所有未使用的镜像
docker image prune -a
\`\`\`

### 4. 构建镜像

创建 \`Dockerfile\` 文件：

\`\`\`dockerfile
FROM nginx:1.21.0

COPY index.html /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
\`\`\`

构建镜像：

\`\`\`bash
docker build -t my-nginx .
\`\`\`

## Docker 容器管理

### 1. 运行容器

\`\`\`bash
# 运行容器并映射端口
docker run -d -p 8080:80 --name my-nginx nginx

# 运行容器并挂载卷
docker run -d -p 8080:80 -v /path/to/html:/usr/share/nginx/html --name my-nginx nginx

# 运行容器并设置环境变量
docker run -d -p 8080:80 -e NGINX_HOST=example.com --name my-nginx nginx
\`\`\`

### 2. 查看容器

\`\`\`bash
# 查看运行中的容器
docker ps

# 查看所有容器
docker ps -a

# 查看容器详情
docker inspect my-nginx

# 查看容器日志
docker logs my-nginx

# 实时查看容器日志
docker logs -f my-nginx
\`\`\`

### 3. 管理容器

\`\`\`bash
# 启动容器
docker start my-nginx

# 停止容器
docker stop my-nginx

# 重启容器
docker restart my-nginx

# 进入容器
docker exec -it my-nginx bash

# 删除容器
docker rm my-nginx

# 强制删除容器
docker rm -f my-nginx

# 删除所有停止的容器
docker container prune
\`\`\`

## Docker Compose 部署

### 1. Docker Compose 安装

#### Windows/macOS

Docker Desktop 已经包含了 Docker Compose，无需单独安装。

#### Linux

\`\`\`bash
# 下载 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# 赋予执行权限
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker-compose --version
\`\`\`

### 2. Docker Compose 配置

创建 \`docker-compose.yml\` 文件：

\`\`\`yaml
version: '3'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./html:/usr/share/nginx/html
    depends_on:
      - api
  api:
    image: node:16
    ports:
      - "3000:3000"
    volumes:
      - ./api:/app
    working_dir: /app
    command: npm start
    environment:
      - NODE_ENV=production
  db:
    image: postgres:13
    ports:
      - "5432:5432"
    volumes:
      - postgres-data:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=123456
      - POSTGRES_DB=myapp
volumes:
  postgres-data:
\`\`\`

### 3. Docker Compose 命令

\`\`\`bash
# 启动服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs

# 进入服务容器
docker-compose exec web bash

# 停止服务
docker-compose down

# 停止服务并删除卷
docker-compose down -v

# 构建并启动服务
docker-compose up -d --build
\`\`\`

## 实战：部署 LyEdu 项目

### 1. 项目结构

\`\`\`
ly-edu/
├── docker-compose.yml
├── lyedu-api/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
├── lyedu-pc/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
└── lyedu-unix/
    ├── Dockerfile
    ├── package.json
    └── src/
\`\`\`

### 2. Dockerfile 配置

#### lyedu-api/Dockerfile

\`\`\`dockerfile
FROM openjdk:17-jdk-alpine

WORKDIR /app

COPY target/lyedu-api.jar /app/

EXPOSE 8080

CMD ["java", "-jar", "lyedu-api.jar"]
\`\`\`

#### lyedu-pc/Dockerfile

\`\`\`dockerfile
FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
\`\`\`

### 3. docker-compose.yml 配置

\`\`\`yaml
version: '3'
services:
  api:
    build:
      context: ./lyedu-api
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=dev
      - SPRING_DATASOURCE_URL=jdbc:postgresql://db:5432/lyedu
      - SPRING_DATASOURCE_USERNAME=lyedu
      - SPRING_DATASOURCE_PASSWORD=123456
      - SPRING_REDIS_HOST=redis
      - SPRING_REDIS_PORT=6379
    depends_on:
      - db
      - redis
  pc:
    build:
      context: ./lyedu-pc
    ports:
      - "80:80"
    depends_on:
      - api
  db:
    image: postgres:13
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_PASSWORD=123456
      - POSTGRES_USER=lyedu
      - POSTGRES_DB=lyedu
    volumes:
      - postgres-data:/var/lib/postgresql/data
  redis:
    image: redis:7
    ports:
      - "6379:6379"
volumes:
  postgres-data:
\`\`\`

### 4. 部署步骤

\`\`\`bash
# 进入项目目录
cd ly-edu

# 构建并启动服务
docker-compose up -d --build

# 查看服务状态
docker-compose ps

# 查看服务日志
docker-compose logs
\`\`\`

## Docker 最佳实践

### 1. 镜像最佳实践

- **使用官方基础镜像**：官方镜像通常更加安全和稳定
- **使用特定版本标签**：避免使用 \`latest\` 标签，因为它可能会导致意外的变化
- **最小化镜像大小**：使用 Alpine 等轻量级基础镜像，删除不必要的文件和依赖
- **使用多阶段构建**：减少最终镜像的大小
- **遵循 Dockerfile 最佳实践**：按顺序排列指令，使用 \`COPY\` 而不是 \`ADD\`，使用 \`CMD\` 而不是 \`ENTRYPOINT\` 等

### 2. 容器最佳实践

- **一个容器一个服务**：每个容器只运行一个服务
- **使用非 root 用户**：提高容器的安全性
- **设置资源限制**：限制容器的 CPU 和内存使用
- **使用健康检查**：监控容器的健康状态
- **使用卷存储数据**：避免在容器中存储持久数据

### 3. Docker Compose 最佳实践

- **使用版本控制**：将 \`docker-compose.yml\` 文件纳入版本控制
- **使用环境变量**：避免在配置文件中硬编码敏感信息
- **使用命名卷**：管理数据持久化
- **设置依赖关系**：使用 \`depends_on\` 明确服务之间的依赖关系
- **使用网络**：为服务创建专用网络

## 常见问题与解决方案

### 1. 端口冲突

**原因**：容器使用的端口已被其他进程占用

**解决方案**：
- 修改容器映射的端口：\`-p 8081:80\`
- 停止占用端口的进程

### 2. 镜像拉取失败

**原因**：网络连接问题或镜像不存在

**解决方案**：
- 检查网络连接
- 确认镜像名称和版本是否正确
- 使用国内镜像源

### 3. 容器启动失败

**原因**：配置错误或依赖问题

**解决方案**：
- 查看容器日志：\`docker logs container-name\`
- 检查配置文件
- 确保依赖服务已启动

### 4. 数据丢失

**原因**：容器被删除时数据未持久化

**解决方案**：
- 使用卷存储数据：\`-v volume-name:/path/in/container\`
- 使用绑定挂载：\`-v /host/path:/container/path\`

## Docker 监控与管理

### 1. Docker 命令行工具

- **docker stats**：查看容器资源使用情况
- **docker system df**：查看 Docker 磁盘使用情况
- **docker system prune**：清理未使用的资源

### 2. Docker Desktop

Docker Desktop 提供了图形化界面，可以查看和管理容器、镜像和卷。

### 3. 第三方工具

- **Portainer**：轻量级的 Docker 管理界面
- **Docker Compose UI**：Docker Compose 的 Web 界面
- **Prometheus + Grafana**：监控 Docker 容器和服务

## 总结

Docker 是一种强大的容器化技术，它可以提高部署效率、减少环境差异，并使应用程序更加可靠。通过本文的介绍，您应该已经了解了 Docker 的基本概念、安装方法、镜像和容器管理、Docker Compose 部署以及最佳实践。

使用 Docker 部署应用程序可以带来以下好处：

- **一致性**：应用程序在任何环境中都以相同的方式运行
- **隔离性**：容器之间相互隔离，避免了依赖冲突
- **可移植性**：容器可以在任何支持 Docker 的环境中运行
- **可扩展性**：可以轻松地扩展应用程序
- **资源效率**：容器比虚拟机更加轻量级，占用更少的资源

通过掌握 Docker 部署技术，您可以更加高效地部署和管理应用程序，提高开发和运维效率。`;export{n as default};
