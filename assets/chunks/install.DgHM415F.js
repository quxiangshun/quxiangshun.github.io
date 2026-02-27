const r=`---\r
title: 物理机安装 MySQL\r
description: Ubuntu 物理机安装 MySQL 8.0\r
---\r
\r
> 编辑日期：2026-02-27\r
\r
# 物理机安装 MySQL\r
\r
本文档说明在 Ubuntu 上安装 MySQL 8.0 的步骤。\r
\r
## 一、环境要求\r
\r
- **操作系统**：Ubuntu 20.04+\r
- **内存**：建议 2GB+\r
- **磁盘**：建议 10GB+ 可用空间\r
- **权限**：root 或 sudo\r
\r
## 二、安装 MySQL\r
\r
### 1. 安装\r
\r
\`\`\`bash\r
sudo apt update && sudo apt upgrade -y\r
sudo apt install -y mysql-server\r
\`\`\`\r
\r
### 2. 启动与开机自启\r
\r
\`\`\`bash\r
# 检查状态（应显示 active (running)）\r
sudo systemctl status mysql\r
\r
# 验证版本\r
mysql --version\r
# 输出示例：mysql  Ver 8.0.45-0ubuntu0.24.04.1 for Linux on x86_64 ((Ubuntu))\r
\r
# 查看是否开机自启\r
sudo systemctl is-enabled mysql\r
# 输出：enabled\r
\`\`\`\r
\r
### 3. 常用服务操作\r
\r
\`\`\`bash\r
sudo systemctl start mysql\r
sudo systemctl stop mysql\r
sudo systemctl restart mysql\r
sudo systemctl enable mysql\r
sudo systemctl disable mysql\r
\`\`\`\r
\r
## 三、首次登录与密码配置\r
\r
Ubuntu 下通过 apt 安装时，root 默认使用 \`auth_socket\` 插件，本地可直接 \`sudo mysql -u root\` 无密码登录，不会生成临时密码。\r
\r
### 为何能无密码登录？（知其然知其所以然）\r
\r
- **MySQL 8.0.45 在 Ubuntu 24.04 下通过 apt 安装时**，依然默认给本地 root 用户启用 \`auth_socket\` 插件，这就是直接用 \`mysql -u root\` 登录且无需密码的根本原因：\r
  - 该版本延续了 Ubuntu 系的安全设计，**优先通过系统用户身份认证**，而非密码；\r
  - 未看到临时密码，是因为 \`auth_socket\` 认证模式下，MySQL **不会生成临时密码**（临时密码仅在「密码认证模式」下才会生成）。\r
- **该版本的关键更新（实用点）**：\r
  - 密码策略更严格：切换为密码认证（\`mysql_native_password\`）时，密码须满足「至少 8 位、包含大小写字母 + 数字 + 特殊字符」，否则会提示 \`ERROR 1819 (HY000): Your password does not satisfy the current policy requirements\`；\r
  - 默认禁用远程 root 登录：即使设置了密码，默认也只能本地登录 root，远程连接需手动授权；\r
  - 性能与稳定性优化：针对 Ubuntu 24.04 内核做了适配，本地操作响应更快。\r
\r
### 1. 确认认证方式\r
\r
\`\`\`bash\r
sudo mysql -u root\r
\`\`\`\r
\r
\`\`\`sql\r
USE mysql;\r
SELECT user, host, plugin FROM user WHERE user = 'root';\r
-- 输出 plugin 为 auth_socket 时表示未设密码\r
\`\`\`\r
\r
### 2. 切换为密码认证\r
\r
\`\`\`sql\r
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Lyedu@123';\r
FLUSH PRIVILEGES;\r
EXIT;\r
\`\`\`\r
\r
\`\`\`bash\r
# 验证密码登录\r
mysql -u root -p\r
# 输入上述密码即可登录\r
\`\`\`\r
\r
::: tip 密码策略\r
MySQL 8.0 要求密码至少 8 位，含大小写、数字和特殊字符。若需弱密码（仅测试环境）：\r
\r
\`\`\`sql\r
SET GLOBAL validate_password.policy=LOW;\r
SET GLOBAL validate_password.length=6;\r
\`\`\`\r
:::\r
\r
## 四、安全加固（强烈建议）\r
\r
\`mysql_secure_installation\` 是 MySQL 官方提供的交互式安全配置工具，能帮你快速修复默认安装的安全漏洞，降低被攻击的风险。**安装完成后应尽快执行。**\r
\r
### 核心安全加固作用\r
\r
该命令会引导你完成 6 个关键操作，消除默认安装的安全隐患：\r
\r
#### 1. 设置/修改 root 密码（针对密码认证模式）\r
\r
- 若 MySQL 未设置 root 密码（或使用临时密码），会提示设置强密码；\r
- 若已设置密码，会询问是否修改；\r
- 强制遵循 MySQL 8.0+ 的密码复杂度规则（大小写+数字+特殊字符）。\r
\r
#### 2. 移除匿名用户（最重要的一步）\r
\r
MySQL 默认会创建「匿名用户」（\`''@localhost\`），任何人无需账号密码就能本地登录，仅能访问 \`test\` 库，这是极大的安全漏洞。该命令会删除所有匿名用户账户。\r
\r
#### 3. 禁止 root 用户远程登录\r
\r
root 是最高权限账户，一旦密码泄露，攻击者可远程控制整个数据库。该命令会将 root 的访问范围限制为 \`localhost\`（仅本地）。如需远程管理，建议创建低权限专用账户。\r
\r
#### 4. 删除测试数据库（test 库）\r
\r
MySQL 默认会创建 \`test\` 库，所有用户均可访问，攻击者可能利用其做测试攻击或提权。该命令会删除 \`test\` 库及相关权限。\r
\r
#### 5. 刷新权限表\r
\r
执行 \`FLUSH PRIVILEGES;\`，让权限修改立即生效。\r
\r
#### 6. 移除 root 的非本地主机访问权限\r
\r
清理 root 在 \`%\`、\`127.0.0.1\` 等非 \`localhost\` 地址的权限条目，进一步缩小 root 的访问范围。\r
\r
### 实操流程\r
\r
\`\`\`bash\r
sudo mysql_secure_installation\r
\`\`\`\r
\r
**交互步骤（关键选项均选 \`Y\`/\`Yes\`）**：\r
\r
1. **Enter password for user root:**  \r
   若已设置 root 密码，输入密码；若为 \`auth_socket\` 模式，直接按回车。\r
2. **Would you like to setup VALIDATE PASSWORD component? [Y/n]**  \r
   选 \`Y\`，启用密码强度验证组件。\r
3. **Please set the password for root here.**  \r
   如需修改 root 密码，输入新密码；无需修改则按回车跳过。\r
4. **Remove anonymous users? [Y/n]**  \r
   选 \`Y\`，删除匿名用户。\r
5. **Disallow root login remotely? [Y/n]**  \r
   选 \`Y\`，禁止 root 远程登录。\r
6. **Remove test database and access to it? [Y/n]**  \r
   选 \`Y\`，删除 test 库。\r
7. **Reload privilege tables now? [Y/n]**  \r
   选 \`Y\`，刷新权限。\r
\r
### 注意事项（Ubuntu 24.04 + auth_socket）\r
\r
1. **auth_socket 模式**：执行时「设置 root 密码」可能提示「密码已通过 socket 认证，无需设置」，属正常现象；\r
2. **仍建议执行**：即使是 \`auth_socket\` 模式，该命令依然能完成「删匿名用户、禁 root 远程、删 test 库」等核心加固操作；\r
3. **切换密码认证后**：若后续将 root 切换为密码认证，建议重新执行一次，确保密码强度和权限配置符合安全要求。\r
\r
### 总结\r
\r
- 核心作用：**一键消除默认安装的安全隐患**；\r
- 主要加固点：删匿名用户、禁 root 远程登录、删 test 库、设置/强化 root 密码、刷新权限；\r
- 无论采用哪种认证模式，安装后都应立即执行该命令，这是数据库安全的基础操作。\r
\r
## 五、常用配置\r
\r
### 1. 配置文件位置\r
\r
- **Ubuntu**：\`/etc/mysql/mysql.conf.d/mysqld.cnf\`\r
\r
### 2. 允许远程连接\r
\r
编辑配置文件，修改 \`bind-address\`：\r
\r
\`\`\`ini\r
# 更改默认端口\r
port = 9999\r
# 监听所有网卡（允许远程）\r
bind-address = 0.0.0.0\r
\`\`\`\r
\r
授权远程用户（示例：root 从任意 IP 连接）：\r
\r
\`\`\`sql\r
CREATE USER 'root'@'%' IDENTIFIED BY 'Lyedu@123';\r
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;\r
FLUSH PRIVILEGES;\r
\`\`\`\r
\r
### 3. 防火墙放行 3306\r
\r
\`\`\`bash\r
sudo ufw allow 9999/tcp\r
sudo ufw reload\r
# 查看开放列表\r
sudo ufw status\r
\`\`\`\r
\r
## 六、验证安装\r
\r
\`\`\`bash\r
mysql -u root -p -e "SELECT VERSION();"\r
# 输出示例：8.0.45\r
\`\`\`\r
\r
## 七、常见问题\r
\r
### 1. 忘记 root 密码\r
\r
\`\`\`bash\r
# 1. 停止 MySQL\r
sudo systemctl stop mysql\r
\r
# 2. 跳过权限验证启动\r
sudo mysqld_safe --skip-grant-tables --skip-networking &\r
\r
# 3. 无密码登录\r
mysql -u root\r
\r
# 4. 重置密码\r
USE mysql;\r
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'NewPass@123';\r
FLUSH PRIVILEGES;\r
EXIT;\r
\r
# 5. 重启 MySQL\r
sudo systemctl restart mysql\r
\`\`\`\r
\r
### 2. 无法远程连接\r
\r
- 检查 \`bind-address\` 是否为 \`0.0.0.0\`\r
- 确认已执行 \`GRANT\` 授权\r
- 检查防火墙、云安全组是否放行 3306\r
\r
### 3. 字符集\r
\r
MySQL 8.0 默认 utf8mb4。若需显式配置：\r
\r
\`\`\`ini\r
[mysqld]\r
character-set-server = utf8mb4\r
collation-server = utf8mb4_unicode_ci\r
\`\`\`\r
\r
## 相关链接\r
\r
- [MySQL 官方文档](https://dev.mysql.com/doc/)\r
- [MySQL 下载](https://dev.mysql.com/downloads/mysql/)\r
`;export{r as default};
