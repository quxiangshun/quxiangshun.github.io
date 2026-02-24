const e=`---
title: Webhooks
description: NetBox Webhooks 配置
---

# Webhooks / Webhooks

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/integrations/webhooks/) | 如有侵权请[联系我们](/contact)删除*

NetBox 可通过 [Event Rules](../features/event-rules) 在对象变更时向远程系统发送 webhook。

## Jinja2 Template Support / Jinja2 模板

\`URL\`、\`additional_headers\`、\`body_template\` 字段支持 Jinja2 模板，可动态生成请求内容。

### Available Context / 可用上下文

- \`snapshots\` - 变更前后对象快照 (prechange, postchange)
- \`data\` - 当前对象完整表示
- \`request_id\` - 请求 ID
- \`username\` - 操作用户
- \`timestamp\` - 事件时间 (ISO 8601)
- \`model\` - 触发变更的模型
- \`event\` - 事件类型: created, updated, deleted

## Webhook Processing / 处理流程

变更检测后，webhook 放入 Redis 队列，由 \`rqworker\` 异步发送 HTTP 请求。2XX 响应视为成功。失败请求可在 System > Background Tasks 中查看或重新排队。

## Troubleshooting / 故障排查

使用内置 webhook 接收器测试：

\`\`\`bash
python netbox/manage.py webhook_receiver
\`\`\`

将 webhook URL 临时改为 \`http://localhost:9000/\` 可查看发送内容。
`;export{e as default};
