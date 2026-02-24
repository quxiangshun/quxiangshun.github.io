const n=`---
title: PostgreSQL 数据库
description: NetBox PostgreSQL 安装与配置
---

# PostgreSQL Database Installation / PostgreSQL 数据库安装

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/installation/postgresql/) | 如有侵权请[联系我们](/contact)删除*

NetBox requires PostgreSQL 14 or later. MySQL and other relational databases are not supported.

NetBox 需要 PostgreSQL 14 或更高版本。不支持 MySQL 和其他关系型数据库。

## Installation / 安装

\`\`\`bash
sudo apt update
sudo apt install -y postgresql
\`\`\`

Verify PostgreSQL version:

\`\`\`bash
psql -V
\`\`\`

## Database Creation / 创建数据库

\`\`\`bash
sudo -u postgres psql
\`\`\`

Within the shell:

\`\`\`sql
CREATE DATABASE netbox;
CREATE USER netbox WITH PASSWORD 'your_secure_password';
ALTER DATABASE netbox OWNER TO netbox;
-- PostgreSQL 15+ 需要以下命令
\\connect netbox;
GRANT CREATE ON SCHEMA public TO netbox;
\`\`\`

**Use a strong password** - Do not use the example password. Choose a strong, random password.

**Use UTF8 encoding** - Ensure your database uses UTF8 encoding. Do not use SQL_ASCII. Use \`\\l\` to check encoding.

## Verify / 验证

\`\`\`bash
psql --username netbox --password --host localhost netbox
\`\`\`

Type \`\\conninfo\` to confirm connection, or \`\\q\` to exit.
`;export{n as default};
