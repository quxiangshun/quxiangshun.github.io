const n=`---
title: Redis 安装
description: NetBox Redis 安装与配置
---

# Redis Installation / Redis 安装

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/installation/redis/) | 如有侵权请[联系我们](/contact)删除*

[Redis](https://redis.io/) is an in-memory key-value store which NetBox employs for caching and queuing.

Redis 是一种内存键值存储，NetBox 用于缓存和任务队列。

## Install Redis / 安装 Redis

\`\`\`bash
sudo apt install -y redis-server
\`\`\`

Verify Redis version (at least v4.0):

\`\`\`bash
redis-server -v
\`\`\`

You may modify Redis configuration at \`/etc/redis.conf\` or \`/etc/redis/redis.conf\`, however the default configuration is usually sufficient.

## Verify Service Status / 验证服务

\`\`\`bash
redis-cli ping
\`\`\`

If successful, you should receive a \`PONG\` response.
`;export{n as default};
