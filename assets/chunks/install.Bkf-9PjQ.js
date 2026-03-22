const n=`# Go 安装与配置

> 编辑日期：2026-03-15

## 一、环境要求

- **操作系统**：Linux / macOS / Windows
- **权限**：安装目录可写，或使用用户级安装
- **网络**：首次拉取模块需访问 Go 模块代理（可配置国内镜像）

## 二、Linux（Ubuntu）安装

### 方式一：官方二进制包（推荐）

以 Go 1.22 为例，按 [官方下载页](https://go.dev/dl/) 选择对应架构：

\`\`\`bash
# 下载（以 amd64 为例，版本号按需替换）
wget https://go.dev/dl/go1.22.3.linux-amd64.tar.gz

# 解压到 /usr/local（需 sudo）
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.22.3.linux-amd64.tar.gz

# 将 Go 加入 PATH（写入 shell 配置以便永久生效）
echo 'export PATH=$PATH:/usr/local/go/bin' >> ~/.bashrc
source ~/.bashrc
\`\`\`

### 方式二：apt 安装（Ubuntu 22.04+）

\`\`\`bash
sudo apt update
sudo apt install -y golang-go
# 版本可能略旧，可用 go version 查看
\`\`\`

### 验证

\`\`\`bash
go version
# 示例：go version go1.22.3 linux/amd64
\`\`\`

## 三、Windows 安装

1. 打开 [https://go.dev/dl/](https://go.dev/dl/) 下载 Windows 安装包（如 \`go1.22.3.windows-amd64.msi\`）。
2. 运行安装程序，默认安装到 \`C:\\Program Files\\Go\`，安装程序会自动添加 \`GOROOT\` 与 \`PATH\`。
3. 打开新的 PowerShell 或 CMD，执行：

\`\`\`powershell
go version
\`\`\`

## 四、关键环境变量

| 变量 | 说明 | 典型值 |
| --- | --- | --- |
| \`GOROOT\` | Go 安装根目录 | Linux: \`/usr/local/go\`；Windows: \`C:\\Program Files\\Go\` |
| \`GOPATH\` | 工作区目录（旧版模块与 bin 放置位置） | \`$HOME/go\` 或 \`%USERPROFILE%\\go\` |
| \`PATH\` | 需包含 \`$GOROOT/bin\` 或 \`%GOROOT%\\bin\` | 安装时一般已自动配置 |

查看当前环境：

\`\`\`bash
go env GOROOT GOPATH
\`\`\`

## 五、Go Modules 与代理（推荐）

当前推荐使用 **Go Modules** 管理依赖，项目目录下执行 \`go mod init <模块名>\` 即可。

国内访问默认代理较慢，可配置国内镜像：

\`\`\`bash
# 使用 Go 官方中国代理
go env -w GOPROXY=https://proxy.golang.org,direct

# 或使用七牛 / 阿里等（按需选择）
go env -w GOPROXY=https://goproxy.cn,direct
\`\`\`

查看：

\`\`\`bash
go env GOPROXY
\`\`\`

## 六、Go 项目依赖位置精准定位

结合 \`GOPATH\` 等环境变量，系统拉取 Go 项目依赖的默认存储位置可以精准定位。

**核心结论**：依赖默认存在 **\`$GOPATH/pkg/mod\`** 目录下（即 **\`$HOME/go/pkg/mod\`**）。

### 1. 核心路径推导

当配置为：

\`\`\`bash
export GOPATH=$HOME/go
\`\`\`

在 Go 1.11+ 的 **Go Modules** 模式（默认启用）下，依赖缓存目录的规则是：

- **GOMODCACHE** 的默认值 = **\`$GOPATH/pkg/mod\`**

因此依赖的具体物理路径为：

| 系统 | 路径示例 |
| --- | --- |
| Linux / macOS | \`/home/你的用户名/go/pkg/mod\`（如 ubuntu 用户为 \`/home/ubuntu/go/pkg/mod\`，root 为 \`/root/go/pkg/mod\`） |
| Windows（\`set GOPATH=%USERPROFILE%\\go\`） | \`C:\\Users\\你的用户名\\go\\pkg\\mod\` |

### 2. 验证实际路径（最准确方式）

无论当前如何配置，执行以下命令可直接输出依赖存储路径：

\`\`\`bash
go env GOMODCACHE
\`\`\`

在配置 \`GOPATH=$HOME/go\` 时，输出应为 \`/home/你的用户名/go/pkg/mod\`，与 \`$GOPATH/pkg/mod\` 一致。

### 3. 关键补充（避免误解）

| 项 | 说明 |
| --- | --- |
| PATH 与依赖路径 | 配置 \`PATH=$PATH:$GOPATH/bin\` 仅影响**可执行程序**（如 \`go install\` 生成的二进制）的查找，**不影响**依赖下载路径。 |
| $GOPATH/src | 这是 Go Modules 出现前的传统依赖路径，仅在 \`go env -w GO111MODULE=off\` 时才会使用，日常开发几乎不用。 |
| 多项目共享 | 同一依赖的相同版本在 \`pkg/mod\` 中只存一份，多个项目共享，节省磁盘（如 A、B 项目都用 \`github.com/gin-gonic/gin@v1.9.1\`，只下载一次）。 |

### 小结

1. 依赖默认下载到 **\`$HOME/go/pkg/mod\`**（物理路径依用户名见上表）。
2. 使用 **\`go env GOMODCACHE\`** 可直接验证当前环境的依赖存储路径。
3. **PATH** 只影响命令执行；**GOPATH**（及由此推导的 GOMODCACHE）决定依赖存储位置。

## 七、可选：GOPATH 与 PATH 手动配置

若未自动配置或使用自定义安装路径，在 \`~/.bashrc\`（Linux）或系统环境变量（Windows）中设置：

\`\`\`bash
# Linux / macOS 示例（GOROOT 为默认 /usr/local/go 时可省略）
export GOROOT=/usr/local/go
export GOPATH=$HOME/go
export PATH=$PATH:$GOROOT/bin:$GOPATH/bin
\`\`\`

创建工作区目录：

\`\`\`bash
mkdir -p $GOPATH/src $GOPATH/bin $GOPATH/pkg
\`\`\`

## 八、快速自检

\`\`\`bash
go version
go env
cd /tmp && go mod init hello && echo 'package main; import "fmt"; func main() { fmt.Println("ok") }' > main.go && go run main.go
# 输出 ok 即环境正常
\`\`\`
`;export{n as default};
