const o=`---
title: Google OAuth2
description: NetBox Google SSO 配置
---

# Google OAuth2 / Google SSO

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/administration/authentication/google/) | 如有侵权请[联系我们](/contact)删除*

## Google OAuth2 配置

在 Google Cloud Console 创建 OAuth 2.0 客户端 ID（Web 应用类型）：

- **Authorized redirect URIs**: \`https://{host}[:{port}]/oauth/complete/google-oauth2/\`
- **Authorized JavaScript origins**: \`https://{host}[:{port}]\`

::: note
Google 要求使用公共顶级域名，不支持 IP 地址（127.0.0.1 除外）。
:::

## NetBox 配置

\`\`\`python
REMOTE_AUTH_BACKEND = 'social_core.backends.google.GoogleOAuth2'
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '{CLIENT_ID}'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = '{CLIENT_SECRET}'
\`\`\`

重启 NetBox：\`sudo systemctl restart netbox\`
`;export{o as default};
