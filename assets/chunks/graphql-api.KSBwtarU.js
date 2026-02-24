const n=`---
title: GraphQL API
description: NetBox GraphQL API 概述
---

# GraphQL API Overview / GraphQL API 概述

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/integrations/graphql-api/) | 如有侵权请[联系我们](/contact)删除*

NetBox 提供只读 GraphQL API 作为 REST API 的补充，基于 [Strawberry Django](https://strawberry.rocks/)。

## Queries / 查询

所有查询发送到 \`/graphql\` 端点。支持两种查询字段：

- \`$OBJECT_list\` - 返回对象列表，可过滤
- \`$OBJECT\` - 返回单个对象，需指定 \`(id: 123)\`

## Filtering / 过滤

在查询名后使用 \`filters: { ... }\`。支持 \`OR\`、\`NOT\` 等逻辑运算符。v4.3 起过滤语法有较大变化。

## Pagination / 分页

- **Offset**: \`pagination: {offset: 0, limit: 20}\`
- **Cursor** (v4.5.2+): \`pagination: {start: 0, limit: 20}\`，下一页的 start 为上一页最后记录的 id + 1

## Authentication / 认证

使用与 REST API 相同的 token 认证。

## Disabling / 禁用

设置 \`GRAPHQL_ENABLED = False\` 并重启 NetBox 可禁用 GraphQL API。
`;export{n as default};
