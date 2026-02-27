const n=`---
title: Caddy 助力前后端分离项目快速部署
description: 基于 Caddy 快速部署前后端分离项目（纯 HTTP 外网访问）
---
> 编辑日期：2026-02-26

# Caddy 助力前后端分离项目快速部署

基于 Caddy 快速部署前后端分离项目（纯 HTTP 外网访问）技术实践文档。

## 一、文档概述

本文档为前后端分离项目（Vue/H5 前端）生产环境部署实践，使用 Caddy 2 作为静态资源 Web 服务器，实现多站点、多端口、跨域、路由刷新兼容、外网可访问的完整部署方案。

- **适用场景**：管理后台 + 移动端 H5 同时部署
- **协议**：HTTP（无 HTTPS）
- **服务器**：Linux CentOS
- **目标**：极简配置、稳定运行、快速排错

## 二、架构与需求

### 1. 项目结构

- 管理后台：lyedu-admin（Vue 打包 dist）
- 移动端 H5：lyedu-h5
- 分别使用独立端口：9900 / 9901

### 2. 核心需求

1. 外网可通过 \`http://IP:端口\` 直接访问
2. 解决 Vue Router 刷新 404
3. 支持跨域
4. 启用 Gzip 压缩
5. 不占用 80/443，避免端口冲突
6. 稳定后台运行

## 三、Caddy 核心优势（为什么选 Caddy）

1. 单二进制文件，无需依赖
2. Caddyfile 语法极简，易维护
3. 自动静态服务、自动压缩
4. 原生支持 try_files，完美适配 SPA
5. 可灵活关闭自动 HTTPS，避免端口抢占
6. 内存占用低，适合小带宽服务器

## 四、最终可用 Caddy 完整配置

**路径**：\`/app/caddy/Caddyfile\`

\`\`\`caddyfile
{
    log {
        level warn
        output file /var/log/caddy/caddy.log {
            roll_size 100MB    # 单个日志文件大小阈值
            roll_keep 7        # 保留最近 7 天日志
            roll_keep_for 30d  # 日志最长保留 30 天
        }
    }
    auto_https off
    admin off
}

# 管理后台 9900
:9900 {
    bind 0.0.0.0
    root * /app/ly-edu/lyedu-admin/dist
    encode gzip
    file_server
    try_files {path} /index.html

    header {
        Access-Control-Allow-Origin *
        Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS
        Access-Control-Allow-Headers Content-Type,Authorization
    }
}

# H5 移动端 9901
:9901 {
    bind 0.0.0.0
    root * /app/ly-edu/lyedu-h5
    encode gzip
    file_server
    try_files {path} /index.html

    header {
        Access-Control-Allow-Origin *
    }
}
\`\`\`

**路径说明**：若实际项目根目录无 \`/app/ly-edu/\` 层级（直接为 \`/app/lyedu-admin/\`），请将配置中 root 路径改为 \`/app/lyedu-admin/dist\` 和 \`/app/lyedu-h5\`。

## 五、部署流程（标准运维步骤）

### 1. 格式化配置（规范语法）

\`\`\`bash
./caddy fmt --overwrite /app/caddy/Caddyfile
\`\`\`

### 2. 创建日志目录（若使用按日期拆分日志）

\`\`\`bash
mkdir -p /var/log/caddy && chmod -R 755 /var/log/caddy
\`\`\`

### 3. 验证配置语法

\`\`\`bash
./caddy validate --config /app/caddy/Caddyfile
\`\`\`

### 4. 启动方式

**前台启动（调试用）**

\`\`\`bash
./caddy run --config /app/caddy/Caddyfile
\`\`\`

**后台守护启动（生产推荐）**

\`\`\`bash
nohup ./caddy run --config /app/caddy/Caddyfile > caddy.log 2>&1 &
\`\`\`

### 5. 停止服务

\`\`\`bash
./caddy stop
\`\`\`

### 6. 查看运行日志

使用按日期拆分配置时，日志写入 \`/var/log/caddy/\`：

\`\`\`bash
tail -f /var/log/caddy/caddy.log
\`\`\`

## 六、网络安全配置（外网访问必须）

### 1. 防火墙开放端口

\`\`\`bash
firewall-cmd --permanent --add-port=9900/tcp
firewall-cmd --permanent --add-port=9901/tcp
firewall-cmd --reload
\`\`\`

### 2. 云服务器安全组

入方向放行：

- 端口：9900、9901
- 协议：TCP
- 授权：0.0.0.0/0

## 七、访问规则

| 应用 | 地址 |
|------|------|
| 管理后台 | http://公网IP:9900 |
| H5 移动端 | http://公网IP:9901 |

**强制规则**：

- 必须使用 \`http://\`
- 必须带端口
- 禁止使用 \`https://\`

## 八、高频问题与解决方案（实战总结）

### 问题 1：启动报错 80 端口被占用

- **原因**：Caddy 默认自动开启 HTTPS
- **解决**：\`auto_https off\`

### 问题 2：浏览器提示 Client sent an HTTP request to an HTTPS server

- **原因**：用 https 访问 http 端口
- **解决**：必须使用 \`http://IP:端口\`

### 问题 3：访问返回 404

- 目录路径错误（重点检查 lyedu-admin/lyedu-h5 拼写）
- dist 目录不存在
- 缺少 index.html
- 权限不足

**排查命令**：

\`\`\`bash
# 检查管理后台目录
ls -ld /app/ly-edu/lyedu-admin/dist
ls -l /app/ly-edu/lyedu-admin/dist/index.html

# 检查H5目录
ls -ld /app/ly-edu/lyedu-h5
ls -l /app/ly-edu/lyedu-h5/index.html

# 修复权限
chmod -R 755 /app/ly-edu/
\`\`\`

### 问题 4：本地 curl 正常，外网无法访问

- 公网 IP 错误
- 安全组未放行端口
- 防火墙未开放端口

## 九、服务状态检查（运维必备）

\`\`\`bash
# 查看端口监听
netstat -tulpn | grep caddy

# 本地接口检测
curl -I http://127.0.0.1:9900
curl -I http://127.0.0.1:9901
\`\`\`

## 十、总结（技术亮点）

1. 一套配置支撑多前端应用
2. 完美适配 Vue/React 等 SPA 路由
3. 跨域、压缩、静态服务一键完成
4. 无 80/443 依赖，避免冲突
5. 日志清晰、排错成本极低
6. 适合前后端分离项目快速上线

## 补充说明

若实际部署时，lyedu-admin/lyedu-h5 存放路径无 \`/app/ly-edu/\` 父目录（例如直接在 \`/app/\` 下），需将 Caddyfile 中 root 配置修改为：

\`\`\`caddyfile
# 管理后台路径
root * /app/lyedu-admin/dist

# H5路径
root * /app/lyedu-h5
\`\`\`

修改后需重新执行「验证配置」和「重启 Caddy」步骤。
`;export{n as default};
