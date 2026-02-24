const n=`---
title: HTTP Server 配置
description: NetBox nginx/Apache 配置
---

# HTTP Server Setup / HTTP 服务器配置

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/installation/http-server/) | 如有侵权请[联系我们](/contact)删除*

Example configurations for [nginx](https://www.nginx.com/) and [Apache](https://httpd.apache.org/).

## Obtain SSL Certificate / 获取 SSL 证书

For testing (self-signed):

\`\`\`bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \\
  -keyout /etc/ssl/private/netbox.key \\
  -out /etc/ssl/certs/netbox.crt
\`\`\`

For production, use [Let's Encrypt](https://letsencrypt.org/) or a commercial certificate.

## Option A: nginx / nginx

\`\`\`bash
sudo apt install -y nginx
sudo cp /opt/netbox/contrib/nginx.conf /etc/nginx/sites-available/netbox
# Replace netbox.example.com with your domain
sudo rm /etc/nginx/sites-enabled/default
sudo ln -s /etc/nginx/sites-available/netbox /etc/nginx/sites-enabled/netbox
sudo systemctl restart nginx
\`\`\`

**gunicorn vs. uWSGI:** The nginx config assumes gunicorn. If using uWSGI, uncomment the uWSGI section.

## Option B: Apache / Apache

\`\`\`bash
sudo apt install -y apache2
sudo cp /opt/netbox/contrib/apache.conf /etc/apache2/sites-available/netbox.conf
sudo a2enmod ssl proxy proxy_http headers rewrite
sudo a2ensite netbox
sudo systemctl restart apache2
\`\`\`

## Troubleshooting / 故障排查

- **502 Bad Gateway:** Check WSGI is running (\`systemctl status netbox\`), nginx connects to port 8001
- **SELinux:** May need \`setsebool -P httpd_can_network_connect 1\`
`;export{n as default};
