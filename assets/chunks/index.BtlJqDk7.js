const e=`---
title: Configuration 配置
description: NetBox 配置说明
---

# NetBox Configuration / NetBox 配置

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/configuration/) | 如有侵权请[联系我们](/contact)删除*

## Configuration File / 配置文件

NetBox's configuration file contains all important parameters: database settings, security controls, user preferences, and so on. A few [required parameters](required-parameters) must be defined during installation.

配置文件位于 \`$INSTALL_ROOT/netbox/netbox/configuration.py\`。可通过 \`NETBOX_CONFIGURATION\` 环境变量指定自定义配置模块。

## Dynamic Configuration Parameters / 动态配置参数

Some parameters are controlled via Admin > System > Configuration History. These may be overridden in \`configuration.py\` to prevent UI modification.

## Modifying the Configuration / 修改配置

The configuration file may be modified at any time. **Restart the WSGI service** before changes take effect:

\`\`\`bash
sudo systemctl restart netbox
\`\`\`

Dynamic parameters (UI-configurable) take effect immediately.

## 配置章节 / Configuration Sections

- [Required Parameters](required-parameters) - 必填参数
- [System](system) - 系统参数
- [Security](security) - 安全配置
- [GraphQL API](graphql-api) - GraphQL 配置
- [Remote Authentication](remote-authentication) - 远程认证
- [Data Validation](data-validation) - 数据验证
- [Default Values](default-values) - 默认值
- [Error Reporting](error-reporting) - 错误报告
- [Plugins](plugins) - 插件配置
- [Miscellaneous](miscellaneous) - 杂项
- [Development](development) - 开发配置
`;export{e as default};
