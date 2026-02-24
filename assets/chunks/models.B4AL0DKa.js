const n=`---
title: Database Models 数据库模型
description: NetBox 插件模型开发
---

# Database Models / 数据库模型

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/plugins/development/models/) | 如有侵权请[联系我们](/contact)删除*

## Creating Models / 创建模型

在 \`models.py\` 中定义 Django 模型。继承 \`NetBoxModel\` 可启用 tags、custom fields、event rules 等特性：

\`\`\`python
from netbox.models import NetBoxModel

class MyModel(NetBoxModel):
    foo = models.CharField(max_length=50)
    bar = models.CharField(max_length=50)
\`\`\`

## Base Classes / 基类

- **NetBoxModel** - 完整特性
- **PrimaryModel** - 含 description、comments、ownership
- **OrganizationalModel** - 含 name、slug，用于组织型对象
- **NestedGroupModel** - 含 parent，用于层级结构

## Feature Mixins / 特性混入

可单独继承：\`TagsMixin\`、\`CustomFieldsMixin\`、\`ChangeLoggingMixin\`、\`ExportTemplatesMixin\` 等。

## Database Migrations / 数据库迁移

设置 \`DEVELOPER=True\` 后运行：

\`\`\`bash
./manage.py makemigrations my_plugin
./manage.py migrate my_plugin
\`\`\`

## Choice Sets / 选项集

使用 \`ChoiceSet\` 定义模型字段的可选值，支持动态配置和颜色。
`;export{n as default};
