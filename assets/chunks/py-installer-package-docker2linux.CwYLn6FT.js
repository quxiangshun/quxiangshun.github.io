const n=`# LyEdu Linux 可执行文件构建流程\r
\r
本文档描述在 Windows 环境下，通过 Docker 生成 Linux 平台可执行文件 \`lyedu_backend\` 的完整流程，包含每行代码的解析。\r
\r
---\r
\r
## 一、流程概览\r
\r
\`\`\`\r
[Windows 主机]\r
    │\r
    ├─ 1. 执行 build.ps1\r
    │\r
    ├─ 2. Docker 拉取 python:3.10-slim-bullseye 镜像\r
    │\r
    ├─ 3. 安装 requirements.txt + PyInstaller\r
    │\r
    ├─ 4. 复制源码，执行 PyInstaller 打包\r
    │\r
    ├─ 5. 导出单文件 lyedu_backend 到 dist/\r
    │\r
    └─ 产出: lyedu-api-python/dist/lyedu_backend（Linux ELF 可执行文件）\r
\`\`\`\r
\r
**前置条件**：已安装并启动 Docker Desktop。\r
\r
---\r
\r
## 二、build.ps1 构建脚本\r
\r
**路径**：\`lyedu-api-python/build.ps1\`  \r
**作用**：在仓库根目录执行，调用 Docker 构建并导出产物到 \`lyedu-api-python/dist/\`。\r
\r
\`\`\`powershell\r
# LyEdu build.ps1 - Docker 构建 Linux 可执行文件\r
# 产出: lyedu-api-python/dist/lyedu_backend\r
# 使用: .\\lyedu-api-python\\build.ps1\r
# 国内网络默认使用清华镜像，直连 Docker Hub 可设: $env:DOCKER_REGISTRY=""\r
\r
$ErrorActionPreference = "Stop"\r
$RepoRoot = if ($PSScriptRoot) { Split-Path $PSScriptRoot -Parent } else { Split-Path (Get-Location) -Parent }\r
$DistDir = Join-Path $RepoRoot "lyedu-api-python\\dist"\r
$DistFile = Join-Path $DistDir "lyedu_backend"\r
\r
New-Item -ItemType Directory -Force -Path $DistDir | Out-Null\r
\r
# Dockerfile 已内置国内镜像默认值，直连 Docker Hub 可传: --build-arg DOCKER_REGISTRY= --build-arg PIP_INDEX=\r
Write-Host "[LyEdu] Building in Docker (Linux target) ..." -ForegroundColor Cyan\r
$env:DOCKER_BUILDKIT = "1"\r
$dest = (Resolve-Path $DistDir).Path\r
$argList = @(\r
    "build", "-f", "lyedu-api-python/Dockerfile.build",\r
    "--target", "export", "--progress=plain",\r
    "--output", "type=local,dest=$dest", "."\r
)\r
if ($env:DOCKER_REGISTRY) { $argList += "--build-arg", "DOCKER_REGISTRY=$env:DOCKER_REGISTRY" }\r
if ($env:PIP_INDEX) { $argList += "--build-arg", "PIP_INDEX=$env:PIP_INDEX" }\r
Push-Location $RepoRoot\r
try {\r
    $ErrorActionPreference = "Continue"\r
    & docker @argList\r
    $ErrorActionPreference = "Stop"\r
} finally {\r
    Pop-Location\r
}\r
\r
if (Test-Path $DistFile) {\r
    Write-Host "[LyEdu] Build done: lyedu-api-python\\dist\\lyedu_backend" -ForegroundColor Green\r
} else {\r
    Write-Host "[LyEdu] Output not found, check build log above." -ForegroundColor Yellow\r
    exit 1\r
}\r
\`\`\`\r
\r
### 逐行解析\r
\r
| 行号 | 代码 | 解析 |\r
|------|------|------|\r
| 6 | \`$ErrorActionPreference = "Stop"\` | 遇到错误时停止执行，避免静默失败 |\r
| 7 | \`$RepoRoot = if ($PSScriptRoot) { Split-Path $PSScriptRoot -Parent } else { Split-Path (Get-Location) -Parent }\` | 获取仓库根目录：脚本在 \`lyedu-api-python/\` 下，\`$PSScriptRoot\` 为其目录，\`-Parent\` 得到 LyEdu 根目录 |\r
| 8 | \`$DistDir = Join-Path $RepoRoot "lyedu-api-python\\dist"\` | 构建产物目录：\`<仓库根>/lyedu-api-python/dist\` |\r
| 9 | \`$DistFile = Join-Path $DistDir "lyedu_backend"\` | 最终可执行文件路径：\`<仓库根>/lyedu-api-python/dist/lyedu_backend\` |\r
| 11 | \`New-Item -ItemType Directory -Force -Path $DistDir \\| Out-Null\` | 强制创建目录，不存在则创建，\`Out-Null\` 丢弃输出 |\r
| 15 | \`$env:DOCKER_BUILDKIT = "1"\` | 启用 BuildKit，支持 \`--output type=local\` 导出到本地 |\r
| 16 | \`$dest = (Resolve-Path $DistDir).Path\` | 获取 \`dist\` 的绝对路径，供 Docker 使用 |\r
| 17-21 | \`$argList = @(...)\` | 构建 \`docker build\` 参数列表：<br>• \`-f lyedu-api-python/Dockerfile.build\` 指定 Dockerfile<br>• \`--target export\` 只构建到 export 阶段<br>• \`--progress=plain\` 普通进度输出<br>• \`--output type=local,dest=$dest\` 导出到本地 |\r
| 22-23 | \`if ($env:DOCKER_REGISTRY) { ... }\` | 若设置了环境变量，则传入对应 \`--build-arg\`，用于国内镜像 |\r
| 24 | \`Push-Location $RepoRoot\` | 切换到仓库根目录，Docker 构建上下文需在根目录 |\r
| 26 | \`$ErrorActionPreference = "Continue"\` | 临时允许继续执行，避免 Docker 的 stderr 导致脚本中断 |\r
| 27 | \`& docker @argList\` | 执行 \`docker build\`，\`@argList\` 展开为参数 |\r
| 29 | \`Pop-Location\` | 恢复原工作目录 |\r
| 33-37 | \`if (Test-Path $DistFile) { ... } else { ... }\` | 检查产物是否存在，成功则提示路径，失败则退出码 1 |\r
\r
---\r
\r
## 三、Dockerfile.build\r
\r
**路径**：\`lyedu-api-python/Dockerfile.build\`  \r
**作用**：多阶段构建，在 Linux 容器内完成 PyInstaller 打包并导出单文件。\r
\r
\`\`\`dockerfile\r
# LyEdu 后端 PyInstaller 打包镜像（分层构建，基础环境缓存复用）\r
# 使用: 见 lyedu-api-python/build.ps1\r
#\r
# 分层说明:\r
#   Stage base  - Python + requirements + PyInstaller（仅在 requirements 变更时重建）\r
#   Stage builder - 复制源码并打包（源码变更时重建，复用 base 缓存）\r
#\r
# 国内网络: 默认 1ms 镜像，直连可传 --build-arg DOCKER_REGISTRY=\r
ARG DOCKER_REGISTRY=docker.1ms.run/library/\r
ARG PIP_INDEX=https://pypi.tuna.tsinghua.edu.cn/simple\r
\r
# ========== Stage 1: 基础环境（显式 -bullseye 锁定 GLIBC 2.31，兼容 CentOS 8、Ubuntu 20.04 等） ==========\r
FROM \${DOCKER_REGISTRY}python:3.10-slim-bullseye AS base\r
\r
ARG PIP_INDEX\r
\r
WORKDIR /build\r
\r
# 先只复制依赖文件，利用 Docker 层缓存\r
COPY lyedu-api-python/requirements.txt .\r
\r
# 安装运行时依赖 + PyInstaller，此层会被缓存（PIP_INDEX 为空时使用默认源）\r
RUN pip install --no-cache-dir \${PIP_INDEX:+-i "$PIP_INDEX"} -r requirements.txt \\\r
    && pip install --no-cache-dir \${PIP_INDEX:+-i "$PIP_INDEX"} pyinstaller\r
\r
# ========== Stage 2: 打包（源码变更时重建，基础环境复用） ==========\r
FROM base AS builder\r
\r
# PyInstaller 在 Linux 下需要 objdump（来自 binutils）\r
RUN apt-get update && apt-get install -y --no-install-recommends binutils && rm -rf /var/lib/apt/lists/*\r
\r
# 复制完整源码，.dockerignore 排除 build/dist/.venv 等\r
COPY lyedu-api-python /build\r
\r
WORKDIR /build\r
\r
# 执行打包\r
RUN python -m PyInstaller lyedu_backend.spec --clean --distpath /out\r
\r
# ========== Stage 3: 导出层（scratch 仅含可执行文件，避免 Alpine 符号链接在 Windows 导出失败） ==========\r
FROM scratch AS export\r
COPY --from=builder /out/lyedu_backend /lyedu_backend\r
\`\`\`\r
\r
### 逐行解析\r
\r
| 行号 | 代码 | 解析 |\r
|------|------|------|\r
| 9 | \`ARG DOCKER_REGISTRY=docker.1ms.run/library/\` | 构建参数，默认使用国内 Docker 镜像；直连时可传空 |\r
| 10 | \`ARG PIP_INDEX=https://pypi.tuna.tsinghua.edu.cn/simple\` | 默认 PyPI 镜像，国内加速 |\r
| 13 | \`FROM \${DOCKER_REGISTRY}python:3.10-slim-bullseye AS base\` | 基础镜像：Python 3.10，Debian Bullseye，GLIBC 2.31，兼容 CentOS 8、Ubuntu 20.04 等 |\r
| 15 | \`ARG PIP_INDEX\` | 在 base 阶段再次声明，以便 \`RUN\` 使用 |\r
| 17 | \`WORKDIR /build\` | 工作目录设为 \`/build\` |\r
| 20 | \`COPY lyedu-api-python/requirements.txt .\` | 仅复制依赖文件，便于依赖未变时复用缓存 |\r
| 23-24 | \`RUN pip install ...\` | 安装依赖：\`\${PIP_INDEX:+-i "$PIP_INDEX"}\` 表示 PIP_INDEX 非空时加 \`-i\` 参数；安装 requirements 和 pyinstaller |\r
| 27 | \`FROM base AS builder\` | 第二阶段，继承 base |\r
| 30 | \`RUN apt-get update && apt-get install -y --no-install-recommends binutils && rm -rf /var/lib/apt/lists/*\` | 安装 binutils（提供 objdump），PyInstaller 在 Linux 下需要；删除 apt 缓存减小镜像 |\r
| 33 | \`COPY lyedu-api-python /build\` | 复制源码到 \`/build\`，\`.dockerignore\` 会排除 build/dist/.venv 等 |\r
| 35 | \`WORKDIR /build\` | 工作目录设为 \`/build\` |\r
| 38 | \`RUN python -m PyInstaller lyedu_backend.spec --clean --distpath /out\` | 执行 PyInstaller：\`--clean\` 清理缓存，\`--distpath /out\` 输出到 \`/out\` |\r
| 41 | \`FROM scratch AS export\` | 导出阶段：空镜像，无文件系统，避免符号链接和多余依赖 |\r
| 42 | \`COPY --from=builder /out/lyedu_backend /lyedu_backend\` | 从 builder 阶段复制 \`/out/lyedu_backend\` 到 \`/lyedu_backend\`，供 BuildKit 导出 |\r
\r
---\r
\r
## 四、lyedu_backend.spec（PyInstaller 配置）\r
\r
**路径**：\`lyedu-api-python/lyedu_backend.spec\`  \r
**作用**：与 Windows exe 共用，定义 PyInstaller 打包规则。\r
\r
\`\`\`python\r
# -*- mode: python ; coding: utf-8 -*-\r
# 打包 alembic.ini 和 alembic 目录，首次运行 exe 时复制到 ~/.lyedu/（与 config.ini 同层级）\r
\r
a = Analysis(\r
    ['main.py'],              # 入口脚本\r
    pathex=[],\r
    binaries=[],\r
    datas=[\r
        ('alembic.ini', '.'), # 打包数据库迁移配置\r
        ('alembic', 'alembic'), # 打包迁移脚本目录\r
    ],\r
    ...\r
)\r
pyz = PYZ(a.pure)             # 纯 Python 模块\r
\r
exe = EXE(\r
    pyz, a.scripts, a.binaries, a.datas,\r
    [],\r
    name='lyedu_backend',      # 输出文件名（Linux 无 .exe）\r
    icon='favicon.ico',        # 仅 Windows/macOS 生效\r
    ...\r
)\r
\`\`\`\r
\r
### 关键配置\r
\r
| 配置 | 说明 |\r
|------|------|\r
| \`main.py\` | 程序入口 |\r
| \`datas\` | 将 alembic.ini 和 alembic 目录打包进可执行文件 |\r
| \`name='lyedu_backend'\` | Linux 下输出为 \`lyedu_backend\`，Windows 下为 \`lyedu_backend.exe\` |\r
\r
---\r
\r
## 五、运行方式\r
\r
### 1. 构建\r
\r
在仓库根目录或 \`lyedu-api-python\` 目录执行：\r
\r
\`\`\`powershell\r
.\\lyedu-api-python\\build.ps1\r
\`\`\`\r
\r
### 2. 产物\r
\r
- 路径：\`lyedu-api-python/dist/lyedu_backend\`\r
- 类型：Linux ELF 可执行文件，单文件，无需系统 Python\r
\r
### 3. 在 Linux 上运行\r
\r
\`\`\`bash\r
chmod +x lyedu_backend\r
./lyedu_backend\r
\`\`\`\r
\r
配置与 exe 相同：优先使用 \`~/.lyedu/conf/config.ini\`，首次运行会从 \`alembic\` 生成迁移目录。\r
\r
### 4. 直连 Docker Hub 时\r
\r
\`\`\`powershell\r
$env:DOCKER_REGISTRY = ""\r
$env:PIP_INDEX = ""\r
.\\lyedu-api-python\\build.ps1\r
\`\`\`\r
\r
---\r
\r
## 六、依赖关系说明\r
\r
| 依赖 | 说明 |\r
|------|------|\r
| 系统 Python | 不需要，PyInstaller 已打包解释器 |\r
| 系统 GLIBC | 需要，目标系统 GLIBC ≥ 2.31（Bullseye 对应版本） |\r
| 配置文件 | 使用 \`~/.lyedu/conf/config.ini\`（MySQL、Redis 等） |\r
\r
---\r
\r
## 七、常见问题\r
\r
1. **GLIBC 版本不足**：若目标系统 GLIBC < 2.31，需改用更老的基础镜像（如 \`python:3.10-slim-buster\`），或升级目标系统。\r
2. **Docker 构建失败**：国内网络可优先使用 Dockerfile 中默认的 1ms 镜像；若需更换，可设置 \`DOCKER_REGISTRY\`。\r
`;export{n as default};
