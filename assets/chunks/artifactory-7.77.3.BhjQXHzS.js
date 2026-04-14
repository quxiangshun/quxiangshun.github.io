const n=`# JFrog Artifactory 7.77.3 内网制品库搭建详解

## JFrog Artifactory 7.77.3 内网制品库搭建文档

（Java / Go / Node.js / Ruby 一站式内网源搭建教程）

---

## 一、环境说明

- **系统**：CentOS 7 x86_64
- **内存**：≥4GB（本机 15GB 满足要求）
- **部署方式**：Docker 单容器
- **Artifactory 版本**：7.77.3 OSS 免费版
- **适用场景**：内网无外网限制、离线开发、依赖缓存、私有包托管

---

## 二、一键启动命令（最终可用版）

\`\`\`bash
# 1. 创建数据目录并授权
rm -rf /data/jfrog
mkdir -p /data/jfrog/artifactory
chmod -R 777 /data/jfrog

# 2. 启动 Artifactory（无需 PostgreSQL，内置 Derby）
docker run -d \\
  --name artifactory \\
  --privileged \\
  --user root \\
  --restart always \\
  -p 8081:8081 \\
  -p 8082:8082 \\
  -v /data/jfrog/artifactory:/var/opt/jfrog/artifactory \\
  -e JAVA_OPTIONS="-Xms2g -Xmx4g" \\
  releases-docker.jfrog.io/jfrog/artifactory-oss:7.77.3

# 3. 查看启动日志（等待 3~5 分钟）
docker logs -f artifactory
\`\`\`

出现类似 \`Artifactory successfully started\` 即为启动完成。

---

## 三、访问控制台

- **访问地址**：\`http://10.9.231.161:8082/ui/\`
- **初始用户名**：\`admin\`
- **初始密码**：\`password\`

首次登录必须强制修改密码，请自行设置新密码。

---

## 四、仓库统一规划

每种语言建议创建三类仓库：

1. **Remote**：代理公网源并缓存
2. **Local**：存放内部私有包
3. **Virtual**：对外统一入口（合并 Local + Remote）

支持：

- Java / Maven
- Go Modules
- Node.js / npm / yarn
- Ruby / RubyGems

---

## 五、各语言内网源配置

### 5.1 Java / Maven 配置

**1）创建仓库**

- **Remote**：\`maven-central-remote\`  
  URL：\`https://maven.aliyun.com/repository/public\`
- **Local**：\`maven-releases\`、\`maven-snapshots\`
- **Virtual**：\`maven-virtual\`

**2）项目使用**

\`~/.m2/settings.xml\`（示例，按需合并进现有 \`<settings>\`）：

\`\`\`xml
<settings>
  <servers>
    <server>
      <id>jfrog-maven</id>
      <username>admin</username>
      <password>你的新密码</password>
    </server>
  </servers>
  <mirrors>
    <mirror>
      <id>jfrog-maven</id>
      <mirrorOf>*</mirrorOf>
      <url>http://10.9.231.161:8081/artifactory/maven-virtual</url>
    </mirror>
  </mirrors>
</settings>
\`\`\`

**3）部署私有包（\`pom.xml\`）**

\`\`\`xml
<distributionManagement>
  <repository>
    <id>jfrog-maven</id>
    <url>http://10.9.231.161:8081/artifactory/maven-releases</url>
  </repository>
</distributionManagement>
\`\`\`

---

### 5.2 Go Modules 配置

**1）创建仓库**

- **Remote**：\`go-remote\`  
  URL：\`https://goproxy.io\`
- **Virtual**：\`go-virtual\`

**2）项目使用**

\`\`\`bash
export GOPROXY=http://10.9.231.161:8081/artifactory/api/go/go-virtual
export GOPRIVATE=*.internal.com
export GONOSUMDB=*.internal.com
\`\`\`

---

### 5.3 Node.js / npm / yarn 配置

**1）创建仓库**

- **Remote**：\`npm-remote\`  
  URL：\`https://registry.npmmirror.com\`
- **Virtual**：\`npm-virtual\`

**2）项目使用**

\`\`\`bash
npm config set registry http://10.9.231.161:8081/artifactory/api/npm/npm-virtual

# 登录上传私有包
npm login --registry=http://10.9.231.161:8081/artifactory/api/npm/npm-virtual
npm publish
\`\`\`

---

### 5.4 Ruby / RubyGems 配置

**1）创建仓库**

- **Remote**：\`rubygems-remote\`  
  URL：\`https://rubygems.org\`
- **Virtual**：\`rubygems-virtual\`

**2）项目使用**

\`\`\`bash
gem sources --add http://10.9.231.161:8081/artifactory/api/gems/rubygems-virtual
gem sources --remove https://rubygems.org
\`\`\`

\`Gemfile\`：

\`\`\`ruby
source 'http://10.9.231.161:8081/artifactory/api/gems/rubygems-virtual'
gem 'rails'
\`\`\`

---

## 六、常用运维命令

\`\`\`bash
# 查看日志
docker logs -f artifactory

# 重启
docker restart artifactory

# 停止
docker stop artifactory

# 数据备份（备份整个 /data/jfrog 目录）
tar -zcvf jfrog_backup_$(date +%Y%m%d).tar.gz /data/jfrog
\`\`\`

---

## 七、端口说明

- **8081**：API 端口（项目依赖拉取使用）
- **8082**：Web 管理后台端口

---

## 八、常见问题

1. **启动时报 8046 连接拒绝**  
   → 内存不足，增加 JVM 参数 \`-Xms2g -Xmx4g\`

2. **访问 8081 出现 404**  
   → 8081 仅用于 API，管理后台用 8082

3. **数据库 Derby 报错**  
   → 使用 7.77.3 并避免外置 PostgreSQL 即可

4. **镜像拉取失败**  
   → 本机已有镜像直接启动，无需重新拉取
`;export{n as default};
