const r=`---\r
title: PostgreSQL：NetBox 库同步（一次落盘恢复）\r
description: pg_dump / pg_restore 将 NetBox 库从 PostgreSQL 17.x 源实例同步到 17.x 目标（如 17.7 → 17.9）\r
---\r
\r
# PostgreSQL：NetBox 库同步（一次落盘恢复）\r
\r
适用于 **PostgreSQL 17.x 主版本一致** 的场景（例如 **17.7 → 17.9**：源、目标均为 PG 17，仅小版本或实例不同）。在一台能同时访问**源**与**目标**的机器上执行：先用 \`pg_dump\` 导出为自定义格式（\`-Fc\`），再用 \`pg_restore\` 覆盖恢复到目标库。\r
\r
## 1. 客户端版本\r
\r
源库为 **PostgreSQL 17** 时，系统自带的 \`pg_dump 14\` 会报错 \`aborting because of server version mismatch\`，无法导出。需安装与**源库主版本一致**的客户端（示例为 **PostgreSQL 17**）。\r
\r
在 Ubuntu 上添加 [PGDG](https://wiki.postgresql.org/wiki/Apt) 源后安装：\r
\r
\`\`\`bash\r
sudo apt-get install postgresql-client-17\r
\`\`\`\r
\r
之后使用 17 自带路径（示例）：\r
\r
\`\`\`text\r
/usr/lib/postgresql/17/bin/pg_dump\r
/usr/lib/postgresql/17/bin/pg_restore\r
/usr/lib/postgresql/17/bin/psql\r
\`\`\`\r
\r
若你的源库不是 17，把主版本号换成与服务器一致即可。\r
\r
---\r
\r
## 2. 通用步骤（占位符）\r
\r
将下列占位符换成你的实际值：\r
\r
| 占位符 | 含义 |\r
|--------|------|\r
| \`<源主机>\` \`<源端口>\` \`<源用户>\` \`<源密码>\` \`<源库名>\` | 导出来源 |\r
| \`<目标主机>\` \`<目标端口>\` \`<目标用户>\` \`<目标密码>\` \`<目标库名>\` | 恢复目标（目标库需已存在） |\r
\r
**导出：**\r
\r
\`\`\`bash\r
PGPASSWORD='<源密码>' \\\r
  /usr/lib/postgresql/17/bin/pg_dump \\\r
  -h <源主机> -p <源端口> -U <源用户> -d <源库名> \\\r
  -Fc --no-owner --no-acl -f /tmp/netbox.dump -v\r
unset PGPASSWORD\r
\`\`\`\r
\r
**导入：**（\`--clean --if-exists\` 会删掉目标上同名对象后再建，执行前确认目标可覆盖）\r
\r
\`\`\`bash\r
PGPASSWORD='<目标密码>' \\\r
  /usr/lib/postgresql/17/bin/pg_restore \\\r
  -h <目标主机> -p <目标端口> -U <目标用户> -d <目标库名> \\\r
  --clean --if-exists --no-owner --no-acl --verbose \\\r
  /tmp/netbox.dump\r
unset PGPASSWORD\r
\`\`\`\r
\r
**校验与清理：**\r
\r
\`\`\`bash\r
PGPASSWORD='<目标密码>' \\\r
  /usr/lib/postgresql/17/bin/psql \\\r
  -h <目标主机> -p <目标端口> -U <目标用户> -d <目标库名> \\\r
  -c "SELECT COUNT(*) FROM django_migrations;"\r
\r
rm -f /tmp/netbox.dump\r
\`\`\`\r
\r
若 NetBox 已指向该库，建议重启应用并视情况清理 Redis，避免旧缓存。\r
\r
---\r
\r
## 3. 实际填写案例\r
\r
以下为同一套流程的**具体参数**示例，便于直接复制修改：\r
\r
| 项目 | 值 |\r
|------|-----|\r
| **源** 主机 / 端口 | \`192.168.0.1\` / \`5432\` |\r
| **源** 用户 / 密码 | \`qxs_src\` / \`123456_src\` |\r
| **源** 数据库名 | \`netbox_src\` |\r
| **目标** 主机 / 端口 | \`192.168.0.2\` / \`5433\` |\r
| **目标** 用户 / 密码 | \`qxs_target\` / \`123456_target\` |\r
| **目标** 数据库名 | \`netbox_target\` |\r
\r
**导出：**\r
\r
\`\`\`bash\r
PGPASSWORD='123456_src' \\\r
  /usr/lib/postgresql/17/bin/pg_dump \\\r
  -h 192.168.0.1 -p 5432 -U qxs_src -d netbox_src \\\r
  -Fc --no-owner --no-acl -f /tmp/netbox.dump -v\r
unset PGPASSWORD\r
\`\`\`\r
\r
**导入：**\r
\r
\`\`\`bash\r
PGPASSWORD='123456_target' \\\r
  /usr/lib/postgresql/17/bin/pg_restore \\\r
  -h 192.168.0.2 -p 5433 -U qxs_target -d netbox_target \\\r
  --clean --if-exists --no-owner --no-acl --verbose \\\r
  /tmp/netbox.dump\r
unset PGPASSWORD\r
\`\`\`\r
\r
**校验与清理：**\r
\r
\`\`\`bash\r
PGPASSWORD='123456_target' \\\r
  /usr/lib/postgresql/17/bin/psql \\\r
  -h 192.168.0.2 -p 5433 -U qxs_target -d netbox_target \\\r
  -c "SELECT COUNT(*) FROM django_migrations;"\r
\r
rm -f /tmp/netbox.dump\r
\`\`\`\r
\r
若 NetBox 已指向该库，建议重启应用并视情况清理 Redis，避免旧缓存。\r
\r
---\r
\r
## 4. 附录：\`sync-netbox-db-manual.sh\`（项目环境）\r
\r
仓库内 \`tech-share/databases/pgsql/sync-netbox-db-manual.sh\` 将**源** \`192.168.0.1:5432\` 的 \`netbox_src\`（用户 \`qxs_src\`）同步到**目标** \`192.168.0.2:5433\` 的 \`netbox_target\`（用户 \`qxs_target\`），分三步手动执行。默认 dump 路径为 \`/tmp/netbox.dump\`；若本机 PostgreSQL 客户端不在默认路径，可设置 \`PG_BIN\`（指向包含 \`pg_dump\` / \`pg_restore\` 的目录）。\r
\r
在 \`tech-share/databases/pgsql\` 目录下执行：\r
\r
\`\`\`bash\r
./sync-netbox-db-manual.sh export   # 1. 导出到 /tmp/netbox.dump\r
./sync-netbox-db-manual.sh import   # 2. 恢复到目标库\r
./sync-netbox-db-manual.sh clean    # 3. 删除 dump 文件\r
\`\`\`\r
\r
脚本全文如下（与文件内容一致，便于离线复制）：\r
\r
\`\`\`bash\r
#!/usr/bin/env bash\r
# 临时脚本：从 192.168.0.1:5432/netbox_src 同步到 192.168.0.2:5433/netbox_target（用完可删）\r
# 用法（分步手动执行）：\r
#   ./sync-netbox-db-manual.sh export   # 1. 导出\r
#   ./sync-netbox-db-manual.sh import   # 2. 导入\r
#   ./sync-netbox-db-manual.sh clean    # 3. 删除本地 dump 文件\r
\r
set -euo pipefail\r
\r
PG_BIN="\${PG_BIN:-/usr/lib/postgresql/17/bin}"\r
DUMP_FILE="\${DUMP_FILE:-/tmp/netbox.dump}"\r
\r
# --- 源：192.168.0.1:5432 ---\r
SRC_HOST="192.168.0.1"\r
SRC_PORT="5432"\r
SRC_USER="qxs_src"\r
SRC_PASS="123456_src"\r
SRC_DB="netbox_src"\r
\r
# --- 目标：192.168.0.2:5433 ---\r
DST_HOST="192.168.0.2"\r
DST_PORT="5433"\r
DST_USER="qxs_target"\r
DST_PASS="123456_target"\r
DST_DB="netbox_target"\r
\r
cmd_export() {\r
  echo "==> 导出到 \${DUMP_FILE}"\r
  PGPASSWORD="\${SRC_PASS}" "\${PG_BIN}/pg_dump" \\\r
    -h "\${SRC_HOST}" -p "\${SRC_PORT}" -U "\${SRC_USER}" -d "\${SRC_DB}" \\\r
    -Fc --no-owner --no-acl -f "\${DUMP_FILE}" -v\r
  echo "==> 导出完成"\r
}\r
\r
cmd_import() {\r
  echo "==> 从 \${DUMP_FILE} 恢复到目标库（会 --clean --if-exists）"\r
  PGPASSWORD="\${DST_PASS}" "\${PG_BIN}/pg_restore" \\\r
    -h "\${DST_HOST}" -p "\${DST_PORT}" -U "\${DST_USER}" -d "\${DST_DB}" \\\r
    --clean --if-exists --no-owner --no-acl --verbose \\\r
    "\${DUMP_FILE}"\r
  echo "==> 导入完成"\r
}\r
\r
cmd_clean() {\r
  echo "==> 删除 \${DUMP_FILE}"\r
  rm -f "\${DUMP_FILE}"\r
  echo "==> 已删除"\r
}\r
\r
usage() {\r
  echo "用法: $0 export | import | clean"\r
  exit 1\r
}\r
\r
case "\${1:-}" in\r
  export) cmd_export ;;\r
  import) cmd_import ;;\r
  clean)  cmd_clean ;;\r
  *) usage ;;\r
esac\r
\`\`\`\r
`;export{r as default};
