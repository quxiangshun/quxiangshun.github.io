const n=`---
title: Upgrading 升级
description: NetBox 升级指南
---

# Upgrading to a New NetBox Release / 升级 NetBox

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/installation/upgrading/) | 如有侵权请[联系我们](/contact)删除*

**Always backup your deployment before upgrading.** 升级前务必备份。

## 1. Review Release Notes / 查看发布说明

Review all [release notes](https://netboxlabs.com/docs/netbox/release-notes/) since your current version for breaking changes.

## 2. Update Dependencies / 更新依赖

| Dependency | Supported Versions |
| --- | --- |
| Python | 3.12, 3.13, 3.14 |
| PostgreSQL | 14+ |
| Redis | 4.0+ |

## 3. Install Latest Release / 安装最新版本

**Use the same method as original installation.** 使用与原始安装相同的方法。

### Option A: Release Package / 发行包

\`\`\`bash
NEWVER=4.5.0
OLDVER=4.4.10
wget https://github.com/netbox-community/netbox/archive/v$NEWVER.tar.gz
sudo tar -xzf v$NEWVER.tar.gz -C /opt
sudo ln -sfn /opt/netbox-$NEWVER/ /opt/netbox
sudo cp /opt/netbox-$OLDVER/local_requirements.txt /opt/netbox/
sudo cp /opt/netbox-$OLDVER/netbox/netbox/configuration.py /opt/netbox/netbox/netbox/
sudo cp -pr /opt/netbox-$OLDVER/netbox/media/ /opt/netbox/netbox/
\`\`\`

### Option B: Git / Git

\`\`\`bash
cd /opt/netbox
sudo git fetch --tags
sudo git checkout v4.5.0
\`\`\`

## 4. Run Upgrade Script / 运行升级脚本

\`\`\`bash
sudo ./upgrade.sh
\`\`\`

If Python < 3.12: \`sudo PYTHON=/usr/bin/python3.12 ./upgrade.sh\`

## 5. Restart Services / 重启服务

\`\`\`bash
sudo systemctl restart netbox netbox-rq
\`\`\`
`;export{n as default};
