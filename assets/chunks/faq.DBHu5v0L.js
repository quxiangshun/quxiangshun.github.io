const r=`# LyEdu 常见问题\r
\r
> 编辑日期：2026-02-26  \r
> 基于 [ly-edu](https://gitee.com/quxiangshun/ly-edu) 项目与使用反馈整理\r
\r
## 一、开发环境\r
\r
### 1. 一键启动脚本报错\r
\r
**现象**：\`.\\scripts\\dev\\start.ps1\` 执行失败。\r
\r
**排查**：\r
- 确认已复制 \`dev-config.example.yml\` 为 \`dev-config.yml\`\r
- 检查 \`database\`、\`redis\` 连接信息是否正确\r
- 若本机无 MySQL，设置 \`start_docker_mysql_redis: true\`，确保 Docker 已启动\r
- PowerShell 执行策略：\`Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser\`\r
\r
### 2. Python 依赖安装失败\r
\r
**现象**：\`pip install -r requirements.txt\` 报错。\r
\r
**排查**：\r
- 使用 Python 3.10+，确认 \`python --version\`\r
- 使用国内源：\`pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple\`\r
- 若缺少 \`openpyxl\` 等，可单独 \`pip install openpyxl\`\r
\r
### 3. 前端 npm install 慢或失败\r
\r
**现象**：依赖安装超时或网络错误。\r
\r
**解决**：\r
- 配置 npm 镜像：\`npm config set registry https://registry.npmmirror.com\`\r
- 或在 \`scripts/docker/.env\` 中配置 \`NPM_REGISTRY\`\r
- 使用 pnpm：\`pnpm install\`（若项目支持）\r
\r
### 4. 数据库迁移失败\r
\r
**现象**：\`alembic upgrade head\` 或 Flyway 报错。\r
\r
**排查**：\r
- 确认数据库已创建，且用户有足够权限\r
- 检查 \`DATABASE_URL\` / \`application.yml\` 中的库名、字符集\r
- 若表已存在冲突，可先备份，再根据报错信息决定是否 \`downgrade\` 或手动修复\r
\r
## 二、Feishu 集成\r
\r
### 1. Feishu 登录失败\r
\r
**现象**：扫码后无法登录或提示错误。\r
\r
**排查**：\r
- App ID、App Secret 是否正确\r
- 回调地址是否与 Feishu 应用配置一致（含协议、域名、路径）\r
- Feishu 应用是否已发布/生效，权限是否已开通\r
- 网络能否访问 \`open.feishu.cn\`\r
\r
### 2. 通讯录同步不完整\r
\r
**现象**：部门或用户同步缺失。\r
\r
**排查**：\r
- 检查 Feishu 应用是否有通讯录读取权限\r
- 查看同步日志或管理后台的同步记录\r
- 是否有 API 调用频率限制导致的失败\r
\r
## 三、视频与播放\r
\r
### 1. 视频无法播放\r
\r
**现象**：视频加载失败或黑屏。\r
\r
**排查**：\r
- 确认视频已成功上传，文件存在且可读\r
- 检查视频格式（推荐 MP4、WebM）\r
- 浏览器控制台是否有 CORS、404 等错误\r
- 若使用 CDN，检查 CDN 配置与回源\r
\r
### 2. 播放器防拖拽/禁倍速不生效\r
\r
**现象**：配置了仍可拖拽或倍速。\r
\r
**排查**：\r
- 在「系统配置」→「播放器配置」中确认已保存\r
- 清除浏览器缓存后重试\r
- 确认前端播放器组件已读取该配置\r
\r
## 四、部署与运行\r
\r
### 1. Docker 容器启动失败\r
\r
**现象**：\`docker compose up -d\` 后容器退出。\r
\r
**排查**：\r
- \`docker compose logs api\` 查看日志\r
- 确认 MySQL、Redis 先于 API 启动完成\r
- 检查环境变量、数据卷挂载是否正确\r
\r
### 2. 系统运行缓慢\r
\r
**现象**：页面加载慢、接口响应慢。\r
\r
**排查**：\r
- 检查 CPU、内存、磁盘 IO\r
- 优化数据库索引与慢查询\r
- 配置 Redis 缓存热点数据\r
- 视频等大文件考虑 CDN 或对象存储\r
\r
### 3. 访问 404 或路由错误\r
\r
**现象**：刷新页面或直接访问子路径出现 404。\r
\r
**排查**：\r
- Nginx/Caddy 需配置 SPA fallback：\`try_files $uri $uri/ /index.html\`\r
- 检查前端 \`base\` 或 \`publicPath\` 与部署路径是否一致\r
\r
## 五、考试与证书\r
\r
### 1. 考试提交失败\r
\r
**现象**：交卷时报错或成绩未保存。\r
\r
**排查**：\r
- 检查网络与 API 状态\r
- 查看后端日志是否有异常\r
- 确认考试未过期、未重复提交\r
\r
### 2. 证书未生成\r
\r
**现象**：学习/考试完成但无证书。\r
\r
**排查**：\r
- 确认证书规则与任务/考试关联正确\r
- 检查证书模板是否已配置\r
- 查看任务完成状态与颁证逻辑\r
\r
## 六、获取帮助\r
\r
- **Issues**：[Gitee](https://gitee.com/quxiangshun/ly-edu/issues) / [GitHub](https://github.com/quxiangshun/ly-edu/issues)\r
- **文档**：[快速开始](/projects/lyedu/quick-start)、[集成说明](/projects/lyedu/integrations)\r
- **错误码**：[错误码说明](/projects/lyedu/error-codes)\r
`;export{r as default};
