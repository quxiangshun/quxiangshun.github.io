const n=`---
title: PostgreSQL 16.4 容器安装（Podman）
description: 使用 Podman 运行 PostgreSQL 16.4，挂载配置与数据目录
---

# PostgreSQL 16.4 容器安装（Podman）

本文提供在 Linux 上使用 **Podman** 启动 PostgreSQL 16.4 的示例脚本（镜像为 \`localhost/pgsql:16.4\`，需事先构建或导入）。若需 **17.9** 与 16.4 并存，见 [PostgreSQL 17.9 容器安装](./docker-pg17.9)。离线 \`save\`/\`load\` 后镜像名不是 \`localhost/pgsql:16.4\` 时，见 [离线镜像与命名](./offline-image)。

## 前置说明

- 宿主机需准备目录与配置文件，例如：
  - \`/opt/pgsql164/conf/postgresql.conf\`
  - \`/opt/pgsql164/conf/pg_hba.conf\`
  - \`/opt/pgsql164/data\`（**首次初始化前必须为空目录**）
  - \`/opt/pgsql164/logs\`（日志目录）
- **配置文件不要挂进数据目录**：\`postgresql.conf\` / \`pg_hba.conf\` 挂到容器 **\`/etc/postgresql/\`**，数据目录只挂 **\`/var/lib/postgresql/data\`**，否则首次 \`initdb\` 会报目录非空（排障见 [17.9 文档](./docker-pg17.9) 文末「常见错误」）。
- 配置文件在宿主机需对容器内 **\`postgres\` 可读**，见 [17.9 文档 · 配置文件权限](./docker-pg17.9#conf-perms)。

## 本地尚无配置文件时

宿主机还没有 **\`/opt/pgsql164/conf/postgresql.conf\`**、**\`pg_hba.conf\`** 时，先只挂数据目录完成初始化，再拷贝默认配置到宿主机，最后跑正式脚本。步骤与 [PostgreSQL 17.9 文档](./docker-pg17.9) 中「本地尚无配置文件时」相同，版本换成 **16.4** 即可。

\`\`\`bash
chmod +x bootstrap-conf.sh
sudo mkdir -p /opt/pgsql164/conf /opt/pgsql164/data /opt/pgsql164/logs
# /opt/pgsql164/data 须完全为空；若有残留：podman rm -f pgsql164-init && sudo find /opt/pgsql164/data -mindepth 1 -delete
./bootstrap-conf.sh 16.4
./docker-pg16.4.sh
\`\`\`

- 卷挂载使用 \`:Z\` 标签，适用于 rootless Podman 的 SELinux 场景。
- 若使用 **Docker**，可将命令中的 \`podman\` 换为 \`docker\`，并视环境去掉或调整 \`:Z\`。

## 脚本

仓库内脚本路径：\`tech-share/databases/pgsql/docker-pg16.4.sh\`。

\`\`\`bash
#!/bin/bash
podman run -d \\
  --name pgsql164 \\
  --restart=always \\
  --memory=1G \\
  --cpus=1 \\
  -p 0.0.0.0:5432:5432 \\
  -e TZ=Asia/Shanghai \\
  -e POSTGRES_PASSWORD=123456 \\
  -e POSTGRES_USER=postgres \\
  -e POSTGRES_DB=postgres \\
  -v /opt/pgsql164/conf/postgresql.conf:/etc/postgresql/postgresql.conf:Z \\
  -v /opt/pgsql164/conf/pg_hba.conf:/etc/postgresql/pg_hba.conf:Z \\
  -v /opt/pgsql164/data:/var/lib/postgresql/data:Z \\
  -v /opt/pgsql164/logs:/var/log/postgresql:Z \\
  localhost/pgsql:16.4 \\
  postgres -c config_file=/etc/postgresql/postgresql.conf -c hba_file=/etc/postgresql/pg_hba.conf
\`\`\`

## 使用

\`\`\`bash
chmod +x docker-pg16.4.sh
./docker-pg16.4.sh
\`\`\`

> **安全提示**：示例中的 \`POSTGRES_PASSWORD\` 仅为演示，生产环境请使用强密码并通过密钥或编排工具注入。
`;export{n as default};
