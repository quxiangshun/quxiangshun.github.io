const n=`---
title: LDAP 认证
description: NetBox LDAP 配置
---

# LDAP Configuration / LDAP 配置

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/installation/ldap/) | 如有侵权请[联系我们](/contact)删除*

This guide explains how to implement LDAP authentication using an external server. User authentication will fall back to built-in Django users on failure.

本指南说明如何使用外部服务器实现 LDAP 认证。认证失败时将回退到内置 Django 用户。

## Install Requirements / 安装依赖

\`\`\`bash
sudo apt install -y libldap2-dev libsasl2-dev libssl-dev
source /opt/netbox/venv/bin/activate
pip3 install django-auth-ldap
sudo sh -c "echo 'django-auth-ldap' >> /opt/netbox/local_requirements.txt"
\`\`\`

## Configuration / 配置

In \`configuration.py\`:

\`\`\`python
REMOTE_AUTH_BACKEND = 'netbox.authentication.LDAPBackend'
\`\`\`

Create \`ldap_config.py\` in the same directory as \`configuration.py\` (typically \`/opt/netbox/netbox/netbox/\`). Define parameters per [django-auth-ldap documentation](https://django-auth-ldap.readthedocs.io/).

### General Server Config / 通用服务器配置

\`\`\`python
import ldap

AUTH_LDAP_SERVER_URI = "ldaps://ad.example.com"
AUTH_LDAP_CONNECTION_OPTIONS = { ldap.OPT_REFERRALS: 0 }
AUTH_LDAP_BIND_DN = "CN=NETBOXSA, OU=Service Accounts,DC=example,DC=com"
AUTH_LDAP_BIND_PASSWORD = "your_password"
\`\`\`

### User Authentication / 用户认证

\`\`\`python
from django_auth_ldap.config import LDAPSearch

AUTH_LDAP_USER_SEARCH = LDAPSearch("ou=Users,dc=example,dc=com",
    ldap.SCOPE_SUBTREE, "(sAMAccountName=%(user)s)")
AUTH_LDAP_USER_DN_TEMPLATE = "uid=%(user)s,ou=users,dc=example,dc=com"
AUTH_LDAP_USER_ATTR_MAP = {
    "first_name": "givenName",
    "last_name": "sn",
    "email": "mail"
}
\`\`\`

### Active Directory / Active Directory

When using Windows Server 2012+, set \`AUTH_LDAP_USER_DN_TEMPLATE = None\`. Use \`NestedGroupOfNamesType()\` for nested groups.

## Restart / 重启

\`\`\`bash
sudo systemctl restart netbox
\`\`\`
`;export{n as default};
