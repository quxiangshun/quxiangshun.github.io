const n=`# 数据管理

> 编辑日期：2026-03-13  
> 以 [GitHub 仓库](https://github.com/quxiangshun/ly-genealogy) 为准。

## 数据存储位置

- **SQLite 数据库**：位于 \`server/data/\` 目录（开发时为 \`packages/server/data/\`，以实际配置为准）
- **上传文件**：同上，由 API 上传接口写入 \`server/data/\` 下相应子目录

## 备份与恢复

- **备份**：直接复制 \`server/data/\` 整个目录（含数据库文件与上传文件）到安全位置，建议按日期命名
- **恢复**：将备份目录覆盖回 \`server/data/\`（或按部署结构恢复），重启 API 服务

## API 与数据模型

数据通过 **REST API** 读写，主要端点包括（以仓库 README 为准）：

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | /api/auth/login | 登录 |
| POST | /api/auth/change-password | 修改密码 |
| GET | /api/genealogies | 族谱列表 |
| GET | /api/genealogies/:id | 族谱详情 |
| GET | /api/generations/:id | 字辈列表 |
| GET | /api/members | 成员列表 |
| GET | /api/query/autocomplete | 成员搜索 |
| POST | /api/culture/relationship | 亲缘查询 |
| GET | /api/culture/zibei | 字辈搜索 |
| GET | /api/wiki | 百科列表 |
| GET | /api/wiki/:slug | 百科详情 |
| GET | /api/news | 新闻列表 |
| GET | /api/news/:slug | 新闻详情 |
| GET | /api/stats | 统计数据 |

扩展或二次开发时，以仓库内 \`packages/server\` 的路由与数据模型为准。
`;export{n as default};
