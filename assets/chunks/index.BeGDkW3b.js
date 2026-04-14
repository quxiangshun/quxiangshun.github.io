const n=`# 数据库

MySQL、PostgreSQL、Redis 相关文档入口；左侧栏可切换各库子页面。

## MySQL

- [数据库迁移：8.0.30 → 8.4.8（容器）](./mysql/migration-8.0-to-8.4)
- [物理机安装 MySQL](./mysql/install)

## PostgreSQL

- [16.4 容器安装（Podman）](./pgsql/docker-pg16.4)
- [17.9 容器安装（Podman）](./pgsql/docker-pg17.9)
- [离线镜像与命名](./pgsql/offline-image)
- [NetBox 库同步（一次落盘）](./pgsql/netbox-db-sync)

## Redis

- [容器化 Redis 7 远程连接排查](./redis/container-remote)
- [Ubuntu 24.04 安装 Redis 8](./redis/install)
`;export{n as default};
