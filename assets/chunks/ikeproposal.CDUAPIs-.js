const n=`---
title: IKE Proposal IKE 提议
description: NetBox IKE Proposal 模型中英对照
---

# IKE Proposal / IKE 提议

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/models/vpn/ikeproposal/) | 如有侵权请[联系我们](/contact)删除*

## 概述 | Overview

**中文：** IKE 提议定义在不可信介质上建立安全双向连接的一组参数，由 IKE 策略引用。部分平台称之为 ISAKMP。

**English:** An IKE proposal defines parameters for establishing a secure bidirectional connection. Referenced by IKE policies. Some platforms call these ISAKMP.

## 字段 | Fields

| 字段 | 中文 | English |
|------|------|---------|
| Name | 提议唯一名称 | The unique user-assigned name |
| Authentication Method | 预共享密钥/证书/RSA/DSA 签名 | Pre-shared key, Certificate, RSA/DSA signature |
| Encryption Algorithm | DES、3DES、各种 AES | DES, 3DES, various AES |
| Authentication Algorithm | MD5、SHA HMAC（可选） | MD5, SHA HMAC (optional) |
| Group | Diffie-Hellman 组 | The DH group supported |
| SA Lifetime | IKE SA 最大生存期（秒） | Maximum IKE SA lifetime in seconds |

## 官方文档

- [IKE Proposal 完整文档 →](https://netboxlabs.com/docs/netbox/models/vpn/ikeproposal/)
`;export{n as default};
