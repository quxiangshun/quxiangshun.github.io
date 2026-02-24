const n=`---
title: Gunicorn WSGI
description: NetBox Gunicorn 配置
---

# Gunicorn / Gunicorn WSGI

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/installation/4a-gunicorn/) | 如有侵权请[联系我们](/contact)删除*

NetBox runs as a WSGI application behind an HTTP server. [Gunicorn](http://gunicorn.org/) is automatically installed with NetBox.

NetBox 作为 HTTP 服务器后的 WSGI 应用运行。Gunicorn 随 NetBox 自动安装。

## Configuration / 配置

\`\`\`bash
sudo cp /opt/netbox/contrib/gunicorn.py /opt/netbox/gunicorn.py
\`\`\`

Edit the file to change bound IP/port or performance settings. See [Gunicorn documentation](https://docs.gunicorn.org/en/stable/configure.html).

## systemd Setup / systemd 配置

\`\`\`bash
sudo cp -v /opt/netbox/contrib/*.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now netbox netbox-rq
\`\`\`

## Verify / 验证

\`\`\`bash
systemctl status netbox.service
\`\`\`

If the service fails, check logs: \`journalctl -eu netbox\`
`;export{n as default};
