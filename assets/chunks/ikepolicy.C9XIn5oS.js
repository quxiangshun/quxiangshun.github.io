const e=`---
title: IKE Policy IKE 策略
description: NetBox IKE Policy 模型中英对照
---

# IKE Policy / IKE 策略

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/vpn/ikepolicy/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** IKE（Internet Key Exchange）策略定义 IKE 版本、模式及一组用于 IKE 协商的[提议](/tech-share/netbox/4.5.1/community/data-model/vpn/ikeproposal)。由 [IPSec 配置文件](/tech-share/netbox/4.5.1/community/data-model/vpn/ipsecprofile) 引用。

**English:** An IKE policy defines an IKE version, mode, and set of proposals to be used in IKE negotiation. These policies are referenced by IPSec profiles.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| Name | 策略唯一名称 | The unique user-assigned name for the policy |
| Version | IKE 版本 (v1 或 v2) | The IKE version employed (v1 or v2) |
| Mode | IKEv1 时的模式 (main/aggressive)，IKEv2 不支持 | The mode when IKEv1 is in use |
| Proposals | 支持的 IKE 提议 | One or more IKE proposals supported by this policy |
| Pre-shared Key | 预共享密钥（可选） | A pre-shared secret key (optional) |

## 官方文档

- [IKE Policy 完整文档 →](https://netboxlabs.com/docs/netbox/models/vpn/ikepolicy/)
`;export{e as default};
