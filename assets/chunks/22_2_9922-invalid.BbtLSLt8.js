const n=`---
title: SSH更改成其他端口无效
description: Ubuntu 24.04：SSH 端口从 22 修改至 9922 的故障排查与解决方案
---
# Ubuntu 24.04：SSH 端口从 22 修改至 9922 的故障排查与解决方案

> 编辑日期：2026-02-27

## 文档信息

|项目|内容|
|---|---|
|适用系统|Ubuntu 24.04 LTS|
|目标端口|9922（TCP）|
|核心问题|配置文件已写入\`Port 9922\`，但SSH服务仅监听22端口，本地连接9922端口提示\`Connection refused\`|
|文档用途|记录故障排查流程、核心原因分析及可落地的解决方案，用于技术沉淀与复用|
## 一、故障现状与核心排查结论

### 1. 故障表现

1. 执行\`grep -E "^Port" /etc/ssh/sshd_config\`，确认配置文件已正确写入\`Port 22\`和\`Port 9922\`；

2. 执行\`sshd -t\`，配置语法校验无报错；

3. 启动SSH服务后，\`systemctl status ssh\`日志仅显示监听22端口，无9922端口监听记录；

4. 执行\`ssh localhost -p 9922\`，提示\`Connection refused\`；

5. 排查\`/etc/ssh/sshd_config.d/\`目录，确认无覆盖主配置的子配置文件。

### 2. 核心原因

SSH服务由\`ssh.socket\`触发启动（systemd 套接字激活机制），该机制会**忽略配置文件中的端口设置**，仅加载默认22端口，导致自定义端口配置失效。

## 二、前置准备（避免操作中断）

1. 确保UFW防火墙已放行9922端口（已完成，验证命令：\`sudo ufw status\`）；

2. **保持当前SSH会话不关闭**，新开终端执行后续操作，防止配置错误导致远程连接断开。

## 三、分步解决方案

### 阶段1：彻底关闭套接字激活机制（核心步骤）

\`ssh.socket\`是导致端口配置失效的关键，需停止并禁用该套接字，强制SSH服务通过配置文件加载端口。

\`\`\`Bash

# 1. 停止SSH服务及关联的套接字
sudo systemctl stop ssh
sudo systemctl stop ssh.socket

# 2. 永久禁用ssh.socket，避免开机自动触发
sudo systemctl disable --now ssh.socket

# 3. 验证套接字状态（输出应为inactive）
sudo systemctl status ssh.socket --no-pager
\`\`\`

### 阶段2：确认主配置文件完整性

虽无子配置覆盖，但需确保主配置文件无隐性问题，且包含子配置目录的引用（规范要求）。

\`\`\`Bash

# 1. 检查配置文件中Port参数是否唯一且格式正确
sudo grep -E "^Port" /etc/ssh/sshd_config

# 2. 检查是否包含子配置目录引用（无则添加）
sudo grep -E "^Include" /etc/ssh/sshd_config
# 若无输出，执行以下命令添加
echo "Include /etc/ssh/sshd_config.d/*.conf" | sudo tee -a /etc/ssh/sshd_config

# 3. 再次校验配置文件语法（无输出即正常）
sudo sshd -t
\`\`\`

### 阶段3：重启SSH服务并验证端口监听

\`\`\`Bash

# 1. 启动SSH服务（基于配置文件加载）
sudo systemctl start ssh

# 2. 验证服务状态（确认无报错，且日志包含9922端口监听）
sudo systemctl status ssh --no-pager

# 3. 验证端口监听（需同时显示22和9922端口）
sudo ss -tuln | grep -E "22|9922"
\`\`\`

**正常输出示例**：

\`\`\`Plain Text

tcp   LISTEN 0      128        0.0.0.0:22        0.0.0.0:*
tcp   LISTEN 0      128        0.0.0.0:9922      0.0.0.0:*
tcp   LISTEN 0      128           [::]:22           [::]:*
tcp   LISTEN 0      128           [::]:9922         [::]:*
\`\`\`

### 阶段4：功能测试与最终加固

1. **本地连接测试**

\`\`\`Bash

ssh localhost -p 9922
\`\`\`

提示输入密码即代表连接成功。

1. **远程连接测试**

\`\`\`Bash

ssh 用户名@服务器IP -p 9922
\`\`\`

1. **（可选）关闭22端口（测试稳定后执行）**

\`\`\`Bash

# 编辑配置文件，删除Port 22
sudo nano /etc/ssh/sshd_config
# 仅保留：Port 9922

# 重启服务
sudo systemctl restart ssh

# 删除防火墙22端口规则
sudo ufw delete allow 22/tcp
\`\`\`

## 四、常见故障兜底方案

若上述步骤执行后仍未解决，执行以下兜底操作：

1. **重新生成SSH配置文件**

\`\`\`Bash

# 备份原配置文件
sudo cp /etc/ssh/sshd_config /etc/ssh/sshd_config.bak

# 重新生成默认配置
sudo dpkg-reconfigure openssh-server

# 重新编辑新配置文件，添加Port 9922
sudo nano /etc/ssh/sshd_config
\`\`\`

1. **重启系统验证**

\`\`\`Bash

sudo reboot
# 重启后执行：sudo ss -tuln | grep 9922
\`\`\`

## 五、关键知识点沉淀

1. **Ubuntu 24.04 SSH 启动机制**：默认采用\`socket\`激活，该机制优先使用默认端口，会忽略配置文件中的自定义端口；

2. **配置优先级**：\`/etc/ssh/sshd_config.d/*.conf\` > \`/etc/ssh/sshd_config\`，若无中子配置，需确保主配置包含\`Include\`语句；

3. **安全原则**：修改端口时，先保留原端口测试，确认新端口可用后再关闭原端口，避免断连。
> （注：文档部分内容可能由 AI 生成）`;export{n as default};
