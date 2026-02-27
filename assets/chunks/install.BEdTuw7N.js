const n=`---
title: Ubuntu 24.04 安装 Redis 8
description: Ubuntu 24.04 物理机安装 Redis 8
---

> 编辑日期：2026-02-27

# Ubuntu 24.04 安装 Redis 8

本文档说明在 Ubuntu 24.04 上安装 Redis 8 的步骤，采用官方 APT 源安装。

## 一、环境要求

- **操作系统**：Ubuntu 24.04 (Noble Numbat)
- **内存**：建议 512MB+
- **权限**：root 或 sudo

## 二、安装 Redis 8

### 1. 安装依赖

\`\`\`bash
sudo apt-get update
sudo apt-get install -y lsb-release curl gpg
\`\`\`

### 2. 添加 Redis 官方 APT 源

\`\`\`bash
curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
sudo chmod 644 /usr/share/keyrings/redis-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
\`\`\`

### 3. 安装 Redis

\`\`\`bash
sudo apt-get update
sudo apt-get install -y redis
\`\`\`

该命令会安装 Redis 8（如 8.0.0）及 redis-tools（含 redis-cli）。

## 三、启动与开机自启

\`\`\`bash
# 安装后 Redis 通常已自动启动，可检查状态
sudo systemctl status redis-server

# 若未启动，可手动启动并设置开机自启
sudo systemctl start redis-server
sudo systemctl enable redis-server
\`\`\`

## 四、常用服务操作

\`\`\`bash
sudo systemctl start redis-server
sudo systemctl stop redis-server
sudo systemctl restart redis-server
sudo systemctl enable redis-server
sudo systemctl disable redis-server
\`\`\`

## 五、验证安装

\`\`\`bash
redis-server --version
# 输出示例：Redis server v=8.0.0 ...

redis-cli ping
# 输出：PONG
\`\`\`

## 六、配置文件

- **路径**：\`/etc/redis/redis.conf\`
- **默认端口**：6379
- **默认绑定**：bind 127.0.0.1 -::1（仅本机）

## 七、允许远程连接（可选）

编辑 \`/etc/redis/redis.conf\`：

\`\`\`ini

# bind 192.168.1.100 10.0.0.1     # listens on two specific IPv4 addresses
# bind 127.0.0.1 ::1              # listens on loopback IPv4 and IPv6
# bind * -::*                     # like the default, all available interfaces

# 监听所有网卡（允许远程）
bind * -::*

port 9998

# 若需密码认证，取消注释并设置
requirepass Lyedu@123
\`\`\`

重启 Redis 使配置生效：

\`\`\`bash
sudo systemctl restart redis-server
\`\`\`

::: warning 安全提醒
开放远程连接时，务必设置 \`requirepass\`，并放行防火墙 6379 端口。生产环境建议结合防火墙限制访问 IP。
:::

## 八、防火墙放行 6379（若远程访问）

\`\`\`bash
sudo ufw allow 9998/tcp
sudo ufw reload
\`\`\`

## 相关链接

- [Redis 官方安装文档](https://redis.io/docs/latest/operate/oss_and_stack/install/install-stack/apt)
- [Redis 官网](https://redis.io/)
`;export{n as default};
