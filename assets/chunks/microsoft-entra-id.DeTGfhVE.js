const t=`---
title: Microsoft Entra ID
description: NetBox Microsoft Entra ID SSO 配置
---

# Microsoft Entra ID / Azure AD SSO

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/administration/authentication/microsoft-entra-id/) | 如有侵权请[联系我们](/contact)删除*

## Entra ID 配置

1. **App registration** - 创建应用注册，Redirect URI 为 \`https://{netbox}/oauth/complete/azuread-oauth2/\`
2. **Client secret** - 创建客户端密钥，记录 secret value

## NetBox 配置

\`\`\`python
REMOTE_AUTH_BACKEND = 'social_core.backends.azuread.AzureADOAuth2'
SOCIAL_AUTH_AZUREAD_OAUTH2_KEY = '{APPLICATION_ID}'
SOCIAL_AUTH_AZUREAD_OAUTH2_SECRET = '{SECRET_VALUE}'
\`\`\`

重启：\`sudo systemctl restart netbox\`

## Troubleshooting

- **Redirect URI 不匹配**：设置 \`SOCIAL_AUTH_REDIRECT_IS_HTTPS = True\`
- **认证成功但未登录**：确认使用单租户应用注册和 \`azuread.AzureADOAuth2\` 后端
`;export{t as default};
