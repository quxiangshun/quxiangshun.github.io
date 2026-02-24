const n=`# NetBox 开发环境启动指南

>编辑日期：2026-02-14

根据官方文档，以下是在 Ubuntu 25 环境下启动 NetBox 开发环境的详细步骤。

## 环境要求

- Python 3.12+
- PostgreSQL 14+
- Redis 4.0+
- 支持的操作系统：Ubuntu 25

## 启动步骤

### 1. 克隆代码库（如果尚未完成）

\`\`\`bash
git clone https://github.com/netbox-community/netbox.git
cd netbox
\`\`\`

### 2. 创建并激活 Python 虚拟环境

\`\`\`bash
sudo apt install python3.13-venv
# 在项目目录内创建虚拟环境
python3 -m venv .venv

# 激活虚拟环境
source .venv/bin/activate
\`\`\`

### 3. 安装依赖包

\`\`\`bash
# 安装项目依赖
python -m pip install -r requirements.txt

# 安装 pre-commit（用于代码提交验证）
python -m pip install ruff pre-commit
pre-commit install
\`\`\`

### 4. 配置 NetBox

\`\`\`bash
# 复制配置文件
cd netbox
cp configuration_example.py configuration.py

# 生成 SECRET_KEY
python generate_secret_key.py

# 生成后替换netbox/netbox/configuration.py 中的 SECRET_KEY
\`\`\`

编辑 \`configuration.py\` 文件，设置以下参数：

\`\`\`python
# 允许的主机（开发环境可设置为通配符）
ALLOWED_HOSTS = ['*']

# 数据库连接参数
DATABASES = {
    'default': {
        'NAME': 'netbox',
        'USER': 'netbox',
        'PASSWORD': 'netbox',
        'HOST': 'localhost',
        'PORT': '',
        'CONN_MAX_AGE': 300,
        'ENGINE': 'django.db.backends.postgresql',
    }
}

# Redis 配置
REDIS = {
    'tasks': {
        'HOST': 'localhost',
        'PORT': 6379,
        'PASSWORD': '',
        'DATABASE': 0,
        'SSL': False,
    },
    'caching': {
        'HOST': 'localhost',
        'PORT': 6379,
        'PASSWORD': '',
        'DATABASE': 1,
        'SSL': False,
    }
}

# 生成的 SECRET_KEY
SECRET_KEY = 'your-generated-secret-key-here'

# 开发模式设置
DEBUG = True
DEVELOPER = True
\`\`\`

### 5. 初始化数据库

\`\`\`bash
# 运行数据库迁移
python manage.py migrate

# 创建超级用户
python manage.py createsuperuser

Username: qxs
Email address: quxiangshun@gmail.com
Password: 登录密码
# 收集静态文件
python manage.py collectstatic --no-input
\`\`\`

### 6. 启动开发服务器

\`\`\`bash
# 在 netbox 目录下执行
# 本地访问
python manage.py runserver
# 可远程访问
python manage.py runserver 0.0.0.0:8080 --insecure
\`\`\`

开发服务器将在 \`http://127.0.0.1:8000/\` 启动，并且会在代码更改时自动重新加载。`;export{n as default};
