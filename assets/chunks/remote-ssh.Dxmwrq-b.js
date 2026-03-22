const n=`# Cursor Remote-SSH 连接问题解决方案

> 编辑日期：2026-03-13  
> 适用场景：Cursor 通过 Remote-SSH 连接远程服务器时出现连接失败/超时。下文以示例 IP、示例路径说明，与实际环境无关。

## 问题背景

Cursor 通过 Remote-SSH 连接远程服务器时，出现连接失败/超时问题，核心表现为：

1. **初始阶段需要输入密码，无法免密登录**；
2. **免密登录配置成功后，Cursor 自动下载远程服务端安装包时因服务器网络限制超时失败**。

## 解决方案总览

| 步骤 | 目标 |
| --- | --- |
| 步骤 1 | 配置 SSH 免密登录（解决密码验证问题） |
| 步骤 2 | 手动安装 Cursor 远程服务端（解决下载超时问题） |
| 步骤 3 | 重新连接 Cursor |

---

## 步骤 1：配置 SSH 免密登录

### 1.1 确认公钥已上传（若未上传执行此步骤）

本地终端执行以下命令，将公钥上传到服务器 \`/root/\` 目录：

\`\`\`bash
scp C:\\Users\\devuser\\.ssh\\id_rsa.pub root@192.168.1.100:/root/
\`\`\`

### 1.2 服务器端配置公钥（关键）

1. 密码登录服务器（最后一次输入密码）：

\`\`\`bash
ssh root@192.168.1.100
\`\`\`

2. 执行以下命令配置公钥权限（**权限错误会导致 SSH 拒绝免密**）：

\`\`\`bash
# 确保 .ssh 目录存在且权限正确
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# 将公钥追加到 authorized_keys（SSH 免密核心文件）
cat /root/id_rsa.pub >> ~/.ssh/authorized_keys

# 删除临时公钥文件
rm /root/id_rsa.pub

# 关键：设置 authorized_keys 权限为 600（必须）
chmod 600 ~/.ssh/authorized_keys

# 重启 SSH 服务（Ubuntu 系统）
systemctl restart sshd
\`\`\`

### 1.3 验证免密登录

本地终端执行以下命令，若**无需输入密码**直接进入服务器，则免密配置成功：

\`\`\`bash
ssh root@192.168.1.100
\`\`\`

---

## 步骤 2：手动安装 Cursor 远程服务端

### 2.1 问题原因

服务器无法访问 \`downloads.cursor.com\`，导致 Cursor 自动下载远程服务端安装包失败。

### 2.2 本地下载服务端安装包

在本地有外网的环境下，从 Cursor 连接失败时弹出的错误提示或日志中可看到当前所需的下载地址，形如（以下为示例格式，实际以 Cursor 日志为准）：

\`\`\`
https://downloads.cursor.com/production/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/linux/x64/cursor-reh-linux-x64.tar.gz
\`\`\`

在浏览器或下载工具中打开该链接，下载得到 \`cursor-reh-linux-x64.tar.gz\`。

### 2.3 上传安装包到服务器

本地终端执行 \`scp\` 命令（免密已配置，无需密码）：

\`\`\`bash
scp C:\\Users\\devuser\\Downloads\\cursor-reh-linux-x64.tar.gz root@192.168.1.100:/tmp/
\`\`\`

### 2.4 服务器端手动解压安装

登录服务器后执行以下命令，将安装包解压到 Cursor 默认路径：

\`\`\`bash
# 创建 Cursor 服务端目录（目录名须与下载地址中的版本哈希一致，此处为示例）
mkdir -p /root/.cursor-server/bin/linux-x64/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/

# 解压安装包到该目录
tar -zxf /tmp/cursor-reh-linux-x64.tar.gz -C /root/.cursor-server/bin/linux-x64/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/

# 可选：删除临时安装包
rm /tmp/cursor-reh-linux-x64.tar.gz
\`\`\`

---

## 步骤 3：重新连接 Cursor

1. **彻底关闭 Cursor**（退出所有窗口）；
2. 重新打开 Cursor，按下 \`Ctrl+Shift+P\`；
3. 输入 **Remote-SSH: Connect to Host**，选择已配置的主机（示例为 \`192.168.1.100\`）；
4. Cursor 会检测到服务端已安装，直接建立连接，**左下角显示 SSH: 192.168.1.100** 即连接成功。

---

## 进阶配置（可选）

若服务器长期无外网，可配置 Cursor 禁用自动下载，强制使用手动上传方式：

1. 打开 Cursor 设置文件：\`Ctrl+Shift+P\` → **Preferences: Open Settings (JSON)**；
2. 添加以下配置：

\`\`\`json
{
  "remote.SSH.serverDownloadUrlTemplate": "",
  "remote.SSH.manualServerDownload": true,
  "remote.SSH.allowLocalServerDownload": true,
  "remote.SSH.useLocalServer": false
}
\`\`\`

说明：\`serverDownloadUrlTemplate\` 置空即禁用自动下载；\`manualServerDownload: true\` 表示强制手动上传。

---

## 常见问题排查

### 1. 免密登录仍提示密码

- 检查服务器 \`~/.ssh/authorized_keys\` 权限是否为 **600**；
- 检查公钥内容是否正确写入该文件。

### 2. Cursor 仍提示下载失败

- 确认安装包解压路径与 Cursor 日志中的路径**完全一致**；
- 检查服务器目录权限（确保 root 用户可读写）。

### 3. 连接后无响应

- 彻底关闭 Cursor 并重启；
- 检查服务器 SSH 服务是否正常：\`systemctl status sshd\`。

---

## 核心总结

| 问题 | 要点 |
| --- | --- |
| SSH 免密登录失败 | 服务器 \`authorized_keys\` 文件权限（600）和内容配置 |
| Cursor 服务端安装失败 | 服务器网络限制无法访问下载域名，需本地下载后手动上传解压 |
| 配置完成后 | Cursor 可跳过密码验证和自动下载步骤，直接建立 Remote-SSH 连接 |
`;export{n as default};
