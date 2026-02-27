const n=`---
title: Caddy 实现日志按日期拆分
description: Caddy 日志按日期拆分配置与实践
---
> 编辑日期：2026-02-26

# Caddy 实现日志按日期拆分

本文档介绍如何配置 Caddy，实现日志按日期自动拆分，便于归档与排查。

## 一、默认行为说明

默认情况下，Caddy 日志不会自动按日期拆分，日志会持续写入同一个文件（如 \`nohup\` 命令配置的 \`caddy.log\`），不会自动按天/按小时分割。

**当前配置（\`level warn\`）**：仅输出警告及以上日志，默认写入启动时指定的文件，无日期拆分。

## 二、如何实现日志按日期拆分？

需手动配置日志的 \`roll\` 选项（**Caddy 2.6+** 支持），在 Caddyfile 全局块中修改 \`log\` 配置即可：

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
\`\`\`

配置后，日志会自动按日期命名（如 \`caddy-2026-02-26.log\`），自动拆分、自动清理，无需手动维护。

## 三、注意事项

1. **目录与权限**：需确保 \`/var/log/caddy/\` 目录存在且 Caddy 有权限写入：
   \`\`\`bash
   mkdir -p /var/log/caddy && chmod -R 755 /var/log/caddy
   \`\`\`

2. **验证与重启**：修改配置后，需执行验证并重启 Caddy 生效：
   \`\`\`bash
   ./caddy validate --config /app/caddy/Caddyfile
   ./caddy stop
   nohup ./caddy run --config /app/caddy/Caddyfile > /dev/null 2>&1 &
   \`\`\`

3. **版本要求**：若 Caddy 版本低于 2.6，不支持 \`roll\` 选项，需借助外部工具（如 \`logrotate\`）实现日志按日期拆分。
`;export{n as default};
