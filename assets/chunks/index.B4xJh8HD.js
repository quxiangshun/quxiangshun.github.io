const n=`---
title: Installation 安装
description: NetBox 4.5.1 安装指南
---

# Installation / 安装

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/installation/) | 如有侵权请[联系我们](/contact)删除*

The installation instructions have been tested to work on Ubuntu 24.04. The following sections detail how to set up a new instance of NetBox:

本安装说明已在 Ubuntu 24.04 上测试通过。以下章节详细说明如何设置新的 NetBox 实例：

## 安装顺序 / Installation Order

1. [LDAP authentication](ldap) (可选 / optional)
2. [HTTP server](http-server)
3. [Gunicorn](gunicorn) 或 [uWSGI](uwsgi)
4. [NetBox components](netbox)
5. [Redis](redis)
6. [PostgreSQL database](postgresql)

## Requirements / 系统要求

| Dependency | Supported Versions |
| --- | --- |
| Python | 3.12, 3.13, 3.14 |
| PostgreSQL | 14+ |
| Redis | 4.0+ |

## Upgrading / 升级

If you are upgrading from an existing installation, please consult the [upgrading guide](upgrading).

如从现有安装升级，请参阅 [升级指南](upgrading)。

## NetBox Cloud / 云托管

Check out the [NetBox Cloud Free Plan](https://netboxlabs.com/free-netbox-cloud/)! Skip the installation process and grab your own NetBox Cloud instance, preconfigured and ready to go in minutes.

可考虑 [NetBox Cloud 免费计划](https://netboxlabs.com/free-netbox-cloud/)！跳过安装过程，几分钟内即可获得预配置的 NetBox Cloud 实例。
`;export{n as default};
