const n=`# NetBox 安装指南

> 编辑日期：2026-02-13



## 系统要求

在安装 NetBox 之前，确保您的系统满足以下要求：

### 硬件要求

- **CPU**：至少 2 核
- **内存**：至少 4GB RAM
- **存储**：至少 20GB 可用空间

### 软件要求

- **操作系统**：Linux（推荐 Ubuntu 20.04+ 或 CentOS 8+）
- **Python**：3.8 或更高版本
- **PostgreSQL**：10 或更高版本
- **Redis**：6.0 或更高版本
- **Web 服务器**：NGINX 或 Apache
- **WSGI 服务器**：Gunicorn 或 uWSGI

## 安装步骤

### 1. 安装依赖项

#### Ubuntu/Debian

\`\`\`bash
# 更新软件包列表
sudo apt update

# 安装系统依赖
sudo apt install -y python3 python3-pip python3-venv python3-dev build-essential libxml2-dev libxslt1-dev libffi-dev libpq-dev libssl-dev zlib1g-dev

# 安装 PostgreSQL 和 Redis
sudo apt install -y postgresql redis-server
\`\`\`

#### CentOS/RHEL

\`\`\`bash
# 安装 EPEL 仓库
sudo yum install -y epel-release

# 安装系统依赖
sudo yum install -y python3 python3-pip python3-devel gcc gcc-c++ libxml2-devel libxslt-devel libffi-devel postgresql-devel openssl-devel

# 安装 PostgreSQL 和 Redis
sudo yum install -y postgresql-server redis

# 初始化 PostgreSQL
sudo postgresql-setup --initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
\`\`\`

### 2. 配置数据库

\`\`\`bash
# 创建 PostgreSQL 用户和数据库
sudo -u postgres psql

# 在 PostgreSQL 提示符下执行以下命令
CREATE USER netbox WITH PASSWORD 'your_secure_password';
CREATE DATABASE netbox OWNER netbox;
\\q

# 验证数据库连接
sudo -u postgres psql -U netbox -d netbox
\\q
\`\`\`

### 3. 安装 NetBox

\`\`\`bash
# 创建 NetBox 目录
sudo mkdir -p /opt/netbox
sudo chown your_user:your_user /opt/netbox

# 克隆 NetBox 仓库
cd /opt/netbox
git clone -b master https://github.com/netbox-community/netbox.git .

# 创建 Python 虚拟环境
python3 -m venv venv

# 激活虚拟环境
source venv/bin/activate

# 升级 pip
pip install --upgrade pip

# 安装依赖
pip install -r requirements.txt

# 安装 NetBox
pip install -e .
\`\`\`

### 4. 配置 NetBox

\`\`\`bash
# 生成密钥
python netbox/generate_secret_key.py

# 创建配置文件
cp netbox/netbox/configuration.example.py netbox/netbox/configuration.py

# 编辑配置文件
nano netbox/netbox/configuration.py
\`\`\`

在配置文件中，您需要设置以下参数：

\`\`\`python
# 数据库配置
DATABASE = {
    'NAME': 'netbox',
    'USER': 'netbox',
    'PASSWORD': 'your_secure_password',
    'HOST': 'localhost',
    'PORT': '',
    'CONN_MAX_AGE': 300,
}

# Redis 配置
REDIS = {
    'default': {
        'HOST': 'localhost',
        'PORT': 6379,
        'PASSWORD': '',
        'DATABASE': 0,
        'SSL': False,
    }
}

# 密钥配置
SECRET_KEY = 'your_generated_secret_key'

# 允许的主机
ALLOWED_HOSTS = ['*']
\`\`\`

### 5. 初始化数据库

\`\`\`bash
# 激活虚拟环境
source venv/bin/activate

# 运行数据库迁移
python netbox/manage.py migrate

# 创建超级用户
python netbox/manage.py createsuperuser

# 收集静态文件
python netbox/manage.py collectstatic --no-input

# 加载初始数据
python netbox/manage.py loaddata initial_data
\`\`\`

### 6. 配置 Web 服务器

#### NGINX 配置

创建 \`/etc/nginx/sites-available/netbox\` 文件：

\`\`\`nginx
server {
    listen 80;
    server_name netbox.example.com;

    location /static/ {
        alias /opt/netbox/netbox/static/;
        expires 86400;
    }

    location / {
        proxy_pass http://127.0.0.1:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
\`\`\`

启用站点：

\`\`\`bash
sudo ln -s /etc/nginx/sites-available/netbox /etc/nginx/sites-enabled/
sudo systemctl restart nginx
\`\`\`

### 7. 配置 WSGI 服务器

#### Gunicorn 配置

创建 \`/opt/netbox/gunicorn.py\` 文件：

\`\`\`python
bind = '127.0.0.1:8001'
workers = 3
timeout = 120
\`\`\`

创建系统服务文件 \`/etc/systemd/system/netbox.service\`：

\`\`\`ini
[Unit]
Description=NetBox WSGI Service
After=network.target

[Service]
User=netbox
Group=netbox
WorkingDirectory=/opt/netbox
ExecStart=/opt/netbox/venv/bin/gunicorn --pid /tmp/gunicorn.pid --config /opt/netbox/gunicorn.py netbox.wsgi

[Install]
WantedBy=multi-user.target
\`\`\`

创建后台任务服务文件 \`/etc/systemd/system/netbox-rq.service\`：

\`\`\`ini
[Unit]
Description=NetBox Background Tasks
After=network.target

[Service]
User=netbox
Group=netbox
WorkingDirectory=/opt/netbox
ExecStart=/opt/netbox/venv/bin/python netbox/manage.py rqworker

[Install]
WantedBy=multi-user.target
\`\`\`

启动服务：

\`\`\`bash
sudo systemctl daemon-reload
sudo systemctl start netbox netbox-rq
sudo systemctl enable netbox netbox-rq
\`\`\`

### 8. 验证安装

打开浏览器访问您的 NetBox 实例（例如 \`http://netbox.example.com\`），使用您创建的超级用户账号登录。

## 升级 NetBox

当有新版本发布时，您可以按照以下步骤升级：

\`\`\`bash
# 停止服务
sudo systemctl stop netbox netbox-rq

# 激活虚拟环境
source /opt/netbox/venv/bin/activate

# 拉取最新代码
cd /opt/netbox
git pull origin master

# 升级依赖
pip install --upgrade pip
pip install -r requirements.txt

# 运行数据库迁移
python netbox/manage.py migrate

# 收集静态文件
python netbox/manage.py collectstatic --no-input

# 启动服务
sudo systemctl start netbox netbox-rq
\`\`\`

## 相关链接

- [官方安装文档](https://docs.netbox.dev/en/stable/installation/)
- [故障排查](troubleshooting.md)（数据库、Redis、权限等常见问题）
- [核心功能](features.md)
`;export{n as default};
