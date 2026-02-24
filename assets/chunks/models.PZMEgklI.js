const e=`---
title: Models 模型
description: NetBox 模型开发中英对照
---

# Models / 模型

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/development/models/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** NetBox 模型基于 Django ORM，继承自 BaseModel、OrganizationalModel 等基类。开发新模型需定义字段、迁移、注册到应用、添加 API 序列化器等。

**English:** NetBox models use Django ORM, inheriting from BaseModel, OrganizationalModel, etc. Adding models requires defining fields, migrations, app registration, API serializers.

## 官方文档

- [Models 完整文档 →](https://netboxlabs.com/docs/netbox/development/models/)
`;export{e as default};
