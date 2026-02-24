const n=`---
title: Plugin Development 插件开发
description: NetBox 插件开发指南
---

# Plugins Development / 插件开发

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/plugins/development/) | 如有侵权请[联系我们](/contact)删除*

## 入门资源

- [NetBox Plugin Tutorial](https://github.com/netbox-community/netbox-plugin-tutorial) - 从零创建插件的完整教程
- [Cookiecutter NetBox Plugin](https://github.com/netbox-community/cookiecutter-netbox-plugin) - 自动生成插件脚手架

## Plugin Structure / 插件结构

\`\`\`
project-name/
  plugin_name/
    api/          - REST API
    migrations/   - 数据库迁移
    templates/    - 模板
    __init__.py   - PluginConfig
    models.py
    views.py
    navigation.py
    ...
  pyproject.toml
  README.md
\`\`\`

## PluginConfig / 插件配置

在 \`__init__.py\` 中定义 \`PluginConfig\` 子类，设置 \`name\`、\`verbose_name\`、\`version\`、\`min_version\`、\`max_version\` 等。

## 开发子章节 / Development Sections

- [Models](models) - 数据库模型
- [Views](views) - 视图
- [UI Components](ui-components) - UI 组件
- [Navigation](navigation) - 导航菜单
- [Templates](templates) - 模板
- [Tables](tables) - 表格
- [Forms](forms) - 表单
- [Filtersets](filtersets) - 过滤器
- [Search](search) - 搜索
- [Event Types](event-types) - 事件类型
- [Data Backends](data-backends) - 数据后端
- [Webhooks](webhooks) - Webhooks
- [User Interface](user-interface) - 用户界面
- [REST API](rest-api) - REST API
- [GraphQL API](graphql-api) - GraphQL API
- [Background Jobs](background-jobs) - 后台任务
- [Dashboard Widgets](dashboard-widgets) - 仪表盘组件
- [Exceptions](exceptions) - 异常处理
- [Migration v4](migration-v4) - v4 迁移
`;export{n as default};
