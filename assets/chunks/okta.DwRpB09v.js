const n=`---
title: Okta
description: NetBox Okta SSO 配置
---

# Okta SSO

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/administration/authentication/okta/) | 如有侵权请[联系我们](/contact)删除*

## Okta 配置

1. Applications > Create App Integration，选择 OIDC、Web application
2. 配置 URIs：
   - Sign-in: \`https://{netbox}/oauth/complete/okta-openidconnect/\`
   - Sign-out: \`https://{netbox}/oauth/disconnect/okta-openidconnect/\`
3. 记录 Okta domain、Client ID、Client secret

## NetBox 配置

\`\`\`python
REMOTE_AUTH_BACKEND = 'social_core.backends.okta_openidconnect.OktaOpenIdConnect'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_KEY = '{Client ID}'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_SECRET = '{Client secret}'
SOCIAL_AUTH_OKTA_OPENIDCONNECT_API_URL = 'https://{Okta domain}/oauth2/'
\`\`\`

重启：\`sudo systemctl restart netbox\`
`;export{n as default};
