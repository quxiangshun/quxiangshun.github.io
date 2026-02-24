const n=`---
title: Plugins 插件
description: NetBox 插件系统
---

# Plugins / 插件

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/plugins/) | 如有侵权请[联系我们](/contact)删除*

Plugins 是可与 NetBox 一起安装的 Django 应用，用于提供核心应用之外的自定义功能。可引入自有模型和视图，但不能干扰现有组件。

## Capabilities / 能力

- 按 NetBox 版本限制安装
- 声明配置参数 (PLUGINS_CONFIG)
- 添加自定义中间件
- 添加导航菜单项
- 向现有模型模板注入内容
- 注册新 URL 和视图（限于 \`/plugins\` 路径）
- 引入新数据模型

## Limitations / 限制

- 不能禁用核心组件
- 不能修改核心配置
- 不能覆盖核心模板
- URL 必须注册在 \`/plugins\` 下
- 不能修改核心模型

## 章节 / Sections

- [Installation](installation) - 安装插件
- [Removal](removal) - 移除插件
- [Development](development/) - 插件开发
`;export{n as default};
