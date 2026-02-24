const n=`---
title: Authentication 认证
description: NetBox 认证概述
---

# Authentication / 认证

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/administration/authentication/overview/) | 如有侵权请[联系我们](/contact)删除*

## Local Authentication / 本地认证

本地用户和组在 Admin > Authentication 中创建。每个用户至少需要 username 和 password，可设置 first name、last name、email。[Permissions](../permissions) 可分配给用户或组。

## Remote Authentication / 远程认证

通过 \`REMOTE_AUTH_BACKEND\` 配置远程认证后端。

### LDAP

\`\`\`python
REMOTE_AUTH_BACKEND = 'netbox.authentication.LDAPBackend'
\`\`\`

参见 [LDAP 安装文档](../../installation/ldap)。

### HTTP Header

\`\`\`python
REMOTE_AUTH_BACKEND = 'netbox.authentication.RemoteUserBackend'
\`\`\`

前端 HTTP 服务器完成认证后，通过 \`REMOTE_USER\` 等 header 传递用户信息。

### Single Sign-On (SSO)

\`\`\`python
REMOTE_AUTH_BACKEND = 'social_core.backends.google.GoogleOAuth2'
\`\`\`

使用 [python-social-auth](https://github.com/python-social-auth)。\`SOCIAL_AUTH_\` 前缀的配置会自动导入。

## SSO 子章节 / SSO Guides

- [Google](google)
- [Microsoft Entra ID](microsoft-entra-id)
- [Okta](okta)
`;export{n as default};
