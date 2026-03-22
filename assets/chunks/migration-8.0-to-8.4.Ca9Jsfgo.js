const n=`# MySQL 数据库迁移：从 8.0.30 到 8.4.8

> 编辑日期：2026-03-13  
> 场景：将运行在旧版 MySQL 容器中的数据库，迁移/还原到新版 MySQL 8.4.8 容器中，目标库名保持一致。下文以示例容器 ID 说明，请按实际替换。

## 场景说明

- **源**：容器内 MySQL 8.0.30，数据库名如 \`signoff\`
- **目标**：容器内 MySQL 8.4.8，目标数据库同名 \`signoff\`
- **方式**：从源容器导出 SQL，再导入到目标容器

## 操作步骤

### 第一步：从源容器导出数据库

在**源容器所在服务器**上执行，将源容器中的目标数据库导出为 SQL 文件：

\`\`\`bash
# 方式一：命令行传入密码（替换 <源容器ID>、<root密码>）
docker exec <源容器ID> mysqldump -uroot -p<root密码> signoff > signoff_backup.sql

# 方式二：交互输入密码（避免明文）
docker exec -i <源容器ID> mysqldump -uroot -p signoff > signoff_backup.sql
# 执行后会提示输入密码，输入源容器的 root 密码即可
\`\`\`

::: tip 容器 ID
可用 \`docker ps\` 查看容器 ID 或名称，上述命令中也可用容器名称替代 ID，例如：\`docker exec mysql8_attendance mysqldump ...\`
:::

### 第二步：在目标容器中导入

#### 1. 在目标容器中创建空数据库（若不存在）

\`\`\`bash
# 替换 <目标容器ID>、<root密码>
docker exec -i <目标容器ID> mysql -uroot -p<root密码> -e "CREATE DATABASE IF NOT EXISTS signoff;"

# 交互输入密码
docker exec -i <目标容器ID> mysql -uroot -p -e "CREATE DATABASE IF NOT EXISTS signoff;"
\`\`\`

#### 2. 将备份文件导入目标容器的 signoff 数据库

\`\`\`bash
docker exec -i <目标容器ID> mysql -uroot -p<root密码> signoff < signoff_backup.sql

# 交互输入密码
docker exec -i <目标容器ID> mysql -uroot -p signoff < signoff_backup.sql
\`\`\`

### 验证导入结果（可选）

\`\`\`bash
docker exec -i <目标容器ID> mysql -uroot -p<root密码> -e "USE signoff; SHOW TABLES;"
\`\`\`

确认表列表与源库一致即表示迁移成功。

---

## 跨服务器迁移

若源容器与目标容器**不在同一台服务器**：

1. **在源服务器**完成第一步，得到 \`signoff_backup.sql\`。
2. **将备份文件复制到目标服务器**：

\`\`\`bash
scp signoff_backup.sql 目标服务器用户@目标服务器IP:/目标路径/
\`\`\`

3. **在目标服务器**上进入备份文件所在目录，执行第二步的创建数据库与导入命令。

---

## 注意事项

| 项 | 说明 |
| --- | --- |
| 版本兼容 | MySQL 8.0.30 导出的 SQL 导入到 8.4.8 完全兼容，无需额外处理。 |
| 权限 | 确保执行命令的用户有 Docker 操作权限，必要时加 \`sudo\`。 |
| 密码安全 | 生产环境建议使用交互输入或配置文件，避免密码出现在命令行与历史中。 |
| 磁盘空间 | 导出前确认宿主机有足够空间存放 \`signoff_backup.sql\`。 |

---

## 总结

1. **核心流程**：\`mysqldump\` 从源容器导出 → 得到 SQL 文件 → 在目标容器中 \`CREATE DATABASE\`（若需要）→ \`mysql ... < 文件\` 导入。
2. **跨服务器**：先把备份文件拷到目标服务器，再在目标服务器执行导入。
3. **验证**：导入后用 \`USE signoff; SHOW TABLES;\` 确认表结构存在，必要时抽样检查数据。
`;export{n as default};
