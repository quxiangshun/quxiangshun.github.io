const e=`---
title: IPsec Policy IPsec 策略
description: NetBox IPsec Policy 模型中英对照
---

# IPsec Policy / IPsec 策略

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/vpn/ipsecpolicy/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** IPsec 策略定义用于建立 IPsec 隧道的一组[提议](/tech-share/netbox/4.5.1/community/data-model/vpn/ipsecproposal)，可选定义 PFS 组。由 [IPsec 配置文件](/tech-share/netbox/4.5.1/community/data-model/vpn/ipsecprofile) 引用。

**English:** An IPSec policy defines a set of proposals for IPSec tunnel formation. A PFS group may optionally be defined. Referenced by IPSec profiles.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| Name | 策略唯一名称 | The unique user-assigned name |
| Proposals | 支持的 IPsec 提议 | One or more IPSec proposals |
| PFS Group | 完美前向保密组（可选） | The PFS group (optional) |

## 官方文档

- [IPsec Policy 完整文档 →](https://netboxlabs.com/docs/netbox/models/vpn/ipsecpolicy/)
`;export{e as default};
