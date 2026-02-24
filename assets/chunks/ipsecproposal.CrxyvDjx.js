const e=`---
title: IPsec Proposal IPsec 提议
description: NetBox IPsec Proposal 模型中英对照
---

# IPsec Proposal / IPsec 提议

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/vpn/ipsecproposal/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** IPsec 提议定义 IPsec SA 的加密与认证参数，由 [IPsec 策略](/tech-share/netbox/4.5.1/community/data-model/vpn/ipsecpolicy) 引用。

**English:** An IPSec proposal defines encryption and authentication parameters for IPSec SAs. Referenced by IPSec policies.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| Name | 提议唯一名称 | The unique user-assigned name |
| Encryption Algorithm | 加密算法 | The encryption protocol |
| Authentication Algorithm | 认证算法 | The authentication mechanism |
| SA Lifetime | SA 生存期 | The maximum SA lifetime |

## 官方文档

- [IPsec Proposal 完整文档 →](https://netboxlabs.com/docs/netbox/models/vpn/ipsecproposal/)
`;export{e as default};
