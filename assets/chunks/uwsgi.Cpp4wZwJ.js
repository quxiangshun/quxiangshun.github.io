const n=`---
title: uWSGI WSGI
description: NetBox uWSGI 配置
---

# uWSGI / uWSGI WSGI

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/installation/4b-uwsgi/) | 如有侵权请[联系我们](/contact)删除*

Alternative to Gunicorn. If using Gunicorn, see [Gunicorn](gunicorn) instead.

Gunicorn 的替代方案。若使用 Gunicorn，请参阅 [Gunicorn](gunicorn)。

## Installation / 安装

\`\`\`bash
source /opt/netbox/venv/bin/activate
pip3 install pyuwsgi
sudo sh -c "echo 'pyuwsgi' >> /opt/netbox/local_requirements.txt"
\`\`\`

## Configuration / 配置

\`\`\`bash
sudo cp /opt/netbox/contrib/uwsgi.ini /opt/netbox/uwsgi.ini
\`\`\`

Edit \`netbox.service\` to use uWSGI instead of Gunicorn.

## systemd Setup / systemd 配置

\`\`\`bash
sudo cp -v /opt/netbox/contrib/*.service /etc/systemd/system/
# Edit netbox.service to use uwsgi
sudo systemctl daemon-reload
sudo systemctl enable --now netbox netbox-rq
\`\`\`

## HTTP Server / HTTP 服务器

When using nginx with uWSGI, uncomment the uWSGI parameters in the location block. See [HTTP Server](http-server) guide.
`;export{n as default};
