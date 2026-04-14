const n=`# 容器化 Redis 7 无法远程连接问题排查全记录

> 编辑日期：2026-03-13  
> 环境：Ubuntu + Podman 部署 Redis 7 容器。下文以示例 IP 说明，与实际环境无关。

## 一、现象描述

- **环境**：Ubuntu + Podman 部署 Redis 7 容器
- **表现**：
  - 容器启动正常，状态为 Up
  - 容器内部可正常连接、认证：\`AUTH default 123456\` → \`OK\`
  - 宿主机本地 \`127.0.0.1:6379\` 可通
  - **内网其他机器无法连接**：客户端填 \`192.168.1.100:6379\`、用户 \`default\`、密码 \`123456\` 连接失败
  - \`telnet 192.168.1.100 6379\` 一直卡在 \`Trying...\`
  - 同机器 MySQL 3306、SSH 22 端口正常远程访问

---

## 二、环境与配置信息

### 1. 基础信息

| 项 | 值 |
| --- | --- |
| 系统 | Ubuntu |
| 容器 | Podman（兼容 Docker） |
| Redis 版本 | 7.4.7 |
| 宿主机内网 IP | 192.168.1.100（示例） |
| 防火墙 | \`ufw status: inactive\`（已关闭） |

### 2. 最终正确配置

**（1）redis.conf**

\`\`\`ini
bind 0.0.0.0
protected-mode no
port 6379

requirepass 123456
aclfile /etc/redis/users.acl

dir /data
logfile /var/log/redis/redis-server.log
appendonly yes
daemonize no
\`\`\`

**（2）users.acl**

\`\`\`
user default on >123456 allkeys allcommands
\`\`\`

**（3）启动脚本 run.sh**

\`\`\`bash
#!/bin/bash
podman run -d \\
  --name redis7 \\
  --restart=always \\
  --memory=512M \\
  --cpus=0.5 \\
  -p 6379:6379 \\
  -e TZ=Asia/Shanghai \\
  -v /opt/redis7/conf/redis.conf:/usr/local/etc/redis/redis.conf:Z \\
  -v /opt/redis7/conf/users.acl:/etc/redis/users.acl:Z \\
  -v /opt/redis7/data:/data:Z \\
  -v /opt/redis7/logs:/var/log/redis:Z \\
  localhost/redis:7 redis-server /usr/local/etc/redis/redis.conf
\`\`\`

::: tip 注意
\`\\\` 续行符后不能有空格或注释，否则会出现 \`-v: command not found\` 等错误。
:::

---

## 三、排查过程与根因定位

### 1. 排除 Redis 应用层问题

✅ 配置全部正确：

- \`bind 0.0.0.0\` 允许所有 IP 访问
- \`protected-mode no\` 关闭保护模式
- 密码 \`requirepass 123456\`
- ACL 用户 \`default\` 已启用并赋权
- 容器端口映射 \`0.0.0.0:6379->6379/tcp\`
- 容器内连接认证完全正常

**结论**：Redis 本身无配置问题。

### 2. 排除宿主机防火墙

\`\`\`bash
ufw status
# 输出：Status: inactive
\`\`\`

**结论**：系统防火墙未开启，不是拦截原因。

### 3. 定位 iptables 关键问题（真正根因）

执行：

\`\`\`bash
sudo iptables -L -n | head -10
\`\`\`

输出关键信息：

\`\`\`
Chain INPUT (policy ACCEPT)
Chain FORWARD (policy DROP)   <=== 核心问题！
Chain OUTPUT (policy ACCEPT)
\`\`\`

- **INPUT（ACCEPT）**：宿主机自身端口放行
- **FORWARD（DROP）**：所有转发流量默认拒绝

**为什么 MySQL/SSH 可以通？**

- SSH、MySQL 直接运行在宿主机，走 **INPUT** 链，可通。
- Redis 跑在**容器**，外部访问 6379 必须经过：  
  **外部 → 宿主机 → FORWARD 转发 → 容器**  
  FORWARD 默认为 DROP，流量被彻底拦截。

### 4. 确认内核转发未开启

容器端口映射依赖：

\`\`\`
net.ipv4.ip_forward = 1
\`\`\`

默认未开启，导致即使放行 FORWARD 也无法转发。

---

## 四、根本原因总结

| 原因 | 说明 |
| --- | --- |
| iptables FORWARD 链默认 DROP | 拦截宿主机到容器的转发流量 |
| 内核 net.ipv4.ip_forward 未开启 | 系统不允许网卡间转发 |
| Redis 在容器内 | 必须经过 FORWARD 链，因此远程不通 |
| MySQL/SSH 在宿主机 | 不走 FORWARD，因此正常 |

---

## 五、最终解决方案（安全、最小化）

### 1. 开启内核 IP 转发（永久生效）

\`\`\`bash
sudo sysctl -w net.ipv4.ip_forward=1
sudo sed -i 's/^#net.ipv4.ip_forward=1/net.ipv4.ip_forward=1/' /etc/sysctl.conf
sudo sysctl -p
\`\`\`

### 2. 放行容器转发规则

\`\`\`bash
sudo iptables -P FORWARD ACCEPT

sudo iptables -A FORWARD -m conntrack --ctstate RELATED,ESTABLISHED -j ACCEPT
sudo iptables -A FORWARD -i podman0 -j ACCEPT
sudo iptables -A FORWARD -o podman0 -j ACCEPT
\`\`\`

### 3. 重启容器使网络生效

\`\`\`bash
podman stop redis7 && podman rm redis7
/opt/redis7/run.sh
\`\`\`

### 4. 验证

\`\`\`bash
telnet 192.168.1.100 6379
# 出现 Connected 即成功

# 远程连接测试
redis-cli -h 192.168.1.100 -p 6379 -u redis://default:123456@192.168.1.100:6379 PING
# 返回 PONG
\`\`\`

---

## 六、典型误区与避坑指南

| 误区 | 错误做法 | 正确做法 |
| --- | --- | --- |
| 把 redis-cli 命令写进 redis.conf | \`acl setuser default on ...\` 写在 conf 里 | 配置文件用 \`aclfile\` + 独立 ACL 文件 |
| 配置行尾加注释 | \`aclfile /etc/redis/users.acl # 注释\` | 注释单独一行，或该行不加注释 |
| shell 续行符后加注释/空格 | \`\\ # 注释\` 或 \`\\ \` | \`\\\` 必须是行最后一个字符 |
| 只看 ufw，不看 iptables FORWARD | 认为关闭 ufw 即可 | 容器网络依赖 **FORWARD** 链与 **ip_forward** |
| Redis 7 默认 default 用户 | 以为用户名+密码即可 | Redis 7 默认禁用 default，必须通过 ACL 显式启用 |

---

## 七、经验总结

- **宿主机能通 ≠ 容器能通**
- **容器端口监听正常 ≠ 外部可访问**

**Linux 容器网络三要素：**

1. **bind 0.0.0.0**（应用内）
2. **net.ipv4.ip_forward=1**（内核）
3. **iptables FORWARD 放行**（防火墙层）
`;export{n as default};
