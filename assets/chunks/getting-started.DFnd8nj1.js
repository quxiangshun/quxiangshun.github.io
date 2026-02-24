const e=`---
title: Getting Started 入门
description: NetBox 开发入门中英对照
---

# Getting Started / 开发入门

*内容来源 / Source: [NetBox Labs Documentation](https://netboxlabs.com/docs/netbox/development/getting-started/) | 如有侵权请[联系我们](/contact)删除*

## 环境要求 | Requirements

**中文：** Python 3.12+、Redis、PostgreSQL、Linux 或兼容环境。

**English:** Python 3.12 or later, Redis, PostgreSQL, a Linux system or compatible environment.

## 步骤概要 | Steps

| 步骤 | 中文 | English |
|-----|------|---------|
| 1. Fork | Fork 官方 git 仓库，克隆到本地 | Fork the repo, clone your fork locally |
| 2. 分支 | 基于 main 或 feature 创建分支，命名如 1234-device-typerror | Create branch from main/feature, name as issue-description |
| 3. 虚拟环境 | \`python3 -m venv ~/.venv/netbox\`，激活 | Create and activate virtual environment |
| 4. 依赖 | \`pip install -r requirements.txt\` | Install required packages |
| 5. Pre-commit | \`pip install ruff pre-commit\` 并 \`pre-commit install\` | Install and enable pre-commit |
| 6. 配置 | 复制 configuration_example.py 为 configuration.py，设置 DEVELOPER、DEBUG、SECRET_KEY、REDIS、DATABASES、ALLOWED_HOSTS | Copy config, set parameters |
| 7. 启动 | \`./manage.py runserver\` | Start development server |

## 其他 | Other

- **UI 开发**：参阅 Web UI Development Guide
- **示例数据**：使用 netbox-demo-data 仓库
- **测试**：\`python manage.py test\`，可用 \`--keepdb\`、\`--parallel\`
- **提交 PR**：commit 消息以 Fixes/Closes 加 issue 号开头

## 官方文档

- [Getting Started 完整文档 →](https://netboxlabs.com/docs/netbox/development/getting-started/)
`;export{e as default};
