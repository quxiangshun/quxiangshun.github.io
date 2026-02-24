const n=`---
title: NetBox 应用安装
description: NetBox 应用安装与配置
---

# NetBox Installation / NetBox 应用安装

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/installation/netbox/) | 如有侵权请[联系我们](/contact)删除*

NetBox requires Python 3.12 or later. 需要 Python 3.12 或更高版本。

## Install System Packages / 安装系统包

\`\`\`bash
sudo apt install -y python3 python3-pip python3-venv python3-dev \\
  build-essential libxml2-dev libxslt1-dev libffi-dev libpq-dev \\
  libssl-dev zlib1g-dev
\`\`\`

\`\`\`bash
python3 -V
\`\`\`

## Download NetBox / 下载 NetBox

### Option A: Release Archive / 发行包

\`\`\`bash
sudo wget https://github.com/netbox-community/netbox/archive/refs/tags/vX.Y.Z.tar.gz
sudo tar -xzf vX.Y.Z.tar.gz -C /opt
sudo ln -s /opt/netbox-X.Y.Z/ /opt/netbox
\`\`\`

### Option B: Git Clone / Git 克隆

\`\`\`bash
sudo mkdir -p /opt/netbox
cd /opt/netbox
sudo git clone https://github.com/netbox-community/netbox.git .
sudo git checkout vX.Y.Z
\`\`\`

## Create System User / 创建系统用户

\`\`\`bash
sudo adduser --system --group netbox
sudo chown --recursive netbox /opt/netbox/netbox/media/
sudo chown --recursive netbox /opt/netbox/netbox/reports/
sudo chown --recursive netbox /opt/netbox/netbox/scripts/
\`\`\`

## Configuration / 配置

Required parameters in \`configuration.py\`:

- \`SECRET_KEY\`
- \`REDIS\`
- \`DATABASES\`
- \`API_TOKEN_PEPPERS\`
- \`ALLOWED_HOSTS\`

## Run Upgrade Script / 运行升级脚本

\`\`\`bash
sudo /opt/netbox/upgrade.sh
\`\`\`

## Create Super User / 创建超级用户

\`\`\`bash
source /opt/netbox/venv/bin/activate
cd /opt/netbox/netbox
python3 manage.py createsuperuser
\`\`\`

## Test / 测试

\`\`\`bash
python3 manage.py runserver 0.0.0.0:8000 --insecure
\`\`\`

**Not for production use** - 开发服务器仅用于测试。
`;export{n as default};
