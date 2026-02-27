const n=`---
title: Caddy 配置 HTTPS 方式
description: Caddy 配置 HTTPS 证书与访问方式，适配 lyedu 项目
---
> 编辑日期：2026-02-26

# Caddy 配置 HTTPS（适配 lyedu 项目）

本文档聚焦 Caddy 配置 HTTPS 核心流程，适配 lyedu-admin、lyedu-h5 双项目，实现 HTTPS 外网访问、自动申请/续期免费证书，流程极简可直接落地。

## 一、HTTPS 配置前提（必满足）

- 已拥有备案域名（如 lyedu.com），添加 2 条 A 记录解析：**admin.lyedu.com**（绑定管理后台）、**h5.lyedu.com**（绑定 H5 移动端），均指向服务器公网 IP；
- 服务器放行 **80/TCP**（证书验证用）、**443/TCP**（HTTPS 默认端口），云服务器需同步配置安全组；
- Caddy 版本 ≥ 2.0（推荐 2.6+，兼容证书自动续期及日志配置）。

## 二、完整 HTTPS 配置

**配置路径**：\`/app/caddy/Caddyfile\`，直接复制替换原有配置即可：

\`\`\`caddyfile
{
    # 日志配置（可选，按日期拆分，便于排查）
    log {
        level warn
        output file /var/log/caddy/caddy.log {
            roll_size 100MB    # 单个日志文件大小阈值
            roll_keep 7        # 保留最近7天日志
            roll_keep_for 30d  # 日志最长保留30天
        }
    }
    # 核心：开启自动 HTTPS（自动申请/续期 Let's Encrypt 证书）
    auto_https on
    # 证书申请邮箱（必填，用于到期提醒）
    email 755591110@qq.com
    # 关闭 admin 接口，减少端口占用
    admin off
}

# lyedu-admin 管理后台（HTTPS 配置）
admin.lyedu.com {
    bind 0.0.0.0
    root * /app/ly-edu/lyedu-admin/dist
    encode gzip
    file_server
    try_files {path} /index.html  # 适配 Vue 路由，解决刷新404
    # 跨域配置（按需保留，不影响 HTTPS 生效）
    header {
        Access-Control-Allow-Origin *
        Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS
        Access-Control-Allow-Headers Content-Type,Authorization
    }
    # HTTP 自动跳转 HTTPS（可选，Caddy 自动处理，可省略）
    redir http://admin.lyedu.com https://admin.lyedu.com permanent
}

# lyedu-h5 移动端（HTTPS 配置）
h5.lyedu.com {
    bind 0.0.0.0
    root * /app/ly-edu/lyedu-h5
    encode gzip
    file_server
    try_files {path} /index.html  # 适配 H5 路由，解决刷新404
    # 跨域配置（按需保留）
    header {
        Access-Control-Allow-Origin *
    }
    # HTTP 自动跳转 HTTPS（可选）
    redir http://h5.lyedu.com https://h5.lyedu.com permanent
}
\`\`\`

## 三、核心配置解读（HTTPS 关键项）

1. **auto_https on**：开启自动 HTTPS，Caddy 自动向 Let's Encrypt 申请免费证书，到期前自动续期（无需手动操作）；
2. **email your-email@example.com**：必填项，用于证书申请验证、到期提醒，替换为个人/企业真实邮箱；
3. **域名绑定**：用子域名（admin.lyedu.com、h5.lyedu.com）替代原端口，Caddy 自动监听 443 端口，外网访问无需手动带端口；
4. **其余配置**（gzip、try_files、跨域）：不影响 HTTPS 核心功能，按需保留即可。

## 四、HTTPS 配置操作步骤（完整落地）

### 1. 准备操作

- 完成域名解析（确认 admin.lyedu.com、h5.lyedu.com 解析至服务器公网 IP）；
- 放行端口（防火墙 + 安全组）：
  \`\`\`bash
  firewall-cmd --permanent --add-port=80/tcp && firewall-cmd --permanent --add-port=443/tcp && firewall-cmd --reload
  \`\`\`
- 创建日志目录（若启用日志配置）：
  \`\`\`bash
  mkdir -p /var/log/caddy && chmod -R 755 /var/log/caddy
  \`\`\`

### 2. 修改配置文件

- 执行 \`vim /app/caddy/Caddyfile\`，删除原有内容，粘贴上述 HTTPS 完整配置；
- 替换 \`your-email@example.com\` 为真实邮箱，替换 \`admin.lyedu.com\`、\`h5.lyedu.com\` 为实际域名。

### 3. 验证配置 + 重启 Caddy

\`\`\`bash
# 格式化配置（规范语法，避免报错）
./caddy fmt --overwrite /app/caddy/Caddyfile

# 验证配置合法性
./caddy validate --config /app/caddy/Caddyfile

# 停止原有 Caddy 进程
./caddy stop

# 后台启动（HTTPS 生效，日志自动按日期拆分）
nohup ./caddy run --config /app/caddy/Caddyfile &
\`\`\`

## 五、HTTPS 访问方式

- **lyedu-admin 管理后台**：https://admin.lyedu.com（无需带端口，自动跳转 HTTPS）；
- **lyedu-h5 移动端**：https://h5.lyedu.com；
- 若输入 http://admin.lyedu.com，会自动跳转至 HTTPS 安全版本。

## 六、HTTPS 常见问题排查（核心）

### 1. 证书申请失败（启动报错 "acme: error: ..."）

- 域名未解析生效：\`ping admin.lyedu.com\` 验证，确认指向服务器公网 IP；
- 80 端口被占用：停止 Nginx/Apache 等进程（\`systemctl stop nginx\`）；
- 国内服务器域名未备案：需完成备案后再申请证书。

### 2. HTTPS 访问提示「不安全」

- 证书未同步生效：等待 1–5 分钟，清除浏览器缓存或用隐私模式访问；
- 配置错误：重新验证 Caddyfile 语法（\`./caddy validate\`），检查域名替换是否正确。

## 七、HTTPS 补充说明

- **证书有效期**：Let's Encrypt 证书有效期 90 天，Caddy 自动续期，无需手动干预；
- **回滚方案**：若需恢复 HTTP 访问，将 \`auto_https on\` 改为 \`auto_https off\`，重启 Caddy 即可；
- **日志查看**：\`tail -f /var/log/caddy/caddy.log\`，可查看 HTTPS 启动及证书申请日志。
`;export{n as default};
