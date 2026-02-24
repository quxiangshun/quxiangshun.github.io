const n=`---
title: Permissions 权限
description: NetBox 对象级权限
---

# Object-Based Permissions / 对象级权限

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/administration/permissions/) | 如有侵权请[联系我们](/contact)删除*

NetBox 使用对象级权限框架，可对对象子集授权而非全部对象。

## 权限组成

- **Constraints** - 过滤条件，限制授权对象子集
- **Action(s)** - 可执行的操作
- **User(s)/Group(s)** - 用户或组
- **Object type(s)** - 对象类型

## Actions / 操作

- **View** - 查看
- **Add** - 创建
- **Change** - 修改
- **Delete** - 删除
- 以及模型特定的自定义操作（如 scripts 的 \`run\`）

## Constraints / 约束

使用 JSON 表示 [Django query filter](https://docs.djangoproject.com/en/stable/ref/models/querysets/#field-lookups) 语法：

\`\`\`json
{"status": "active", "region__name": "Americas"}
\`\`\`

逻辑 OR 使用列表：\`[{"vid__gte": 100, "vid__lt": 200}, {"status": "reserved"}]\`

**$user 占位符**：\`{"created_by": "$user"}\` 引用当前用户。
`;export{n as default};
