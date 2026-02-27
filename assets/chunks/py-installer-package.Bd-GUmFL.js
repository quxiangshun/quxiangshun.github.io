const n=`# LyEdu 后端 exe 打包技术分享\r
\r
本文档总结 LyEdu Python API（FastAPI）使用 PyInstaller 打包为独立可执行文件的完整过程、遇到的问题及解决方案。\r
\r
---\r
\r
## 一、打包步骤\r
\r
### 1.1 环境准备\r
\r
\`\`\`bash\r
# 安装 PyInstaller\r
p# windows\r
.\\.venv\\Scripts\\pip.exe install pyinstaller\r
# Linux\r
.\\.venv\\bin\\pip install pyinstaller\r
\r
# 确保项目依赖已安装\r
cd lyedu-api-python\r
.\\.venv\\Scripts\\pip.exe install -r requirements.txt\r
\`\`\`\r
\r
### 1.2 打包命令\r
\r
**推荐使用 spec 文件**（便于维护 datas、icon 等配置）：\r
\r
\`\`\`powershell\r
cd lyedu-api-python\r
python -m PyInstaller lyedu_backend.spec\r
\`\`\`\r
\r
或首次生成 spec 后打包：\r
\r
\`\`\`powershell\r
python -m PyInstaller --onefile --name lyedu_backend main.py\r
\`\`\`\r
\r
### 1.3 输出产物\r
\r
- \`dist/lyedu_backend.exe\`：单文件可执行程序\r
- \`build/\`：构建缓存（可删除）\r
- \`lyedu_backend.spec\`：打包配置\r
\r
---\r
\r
## 二、核心实现要点\r
\r
### 2.1 程序入口\r
\r
必须在 \`main.py\` 末尾添加 uvicorn 启动逻辑，否则 exe 加载完路由后立即退出（闪退）：\r
\r
\`\`\`python\r
if __name__ == "__main__":\r
    import uvicorn\r
    uvicorn.run(app, host=config.HOST, port=config.PORT)\r
\`\`\`\r
\r
### 2.2 配置策略分离\r
\r
| 场景 | 配置来源 | 说明 |\r
|------|----------|------|\r
| 打包 exe | 仅 \`~/.lyedu/conf/config.ini\` | 无则生成模板并提示后退出 |\r
| 开发环境 | \`.env\` / \`.env.dev\` | 不使用 config.ini |\r
\r
打包时通过 \`sys.frozen\` 判断，使用 \`sys.executable\` 所在目录解析路径（exe 所在目录），而非 \`__file__\`（临时解压目录）。\r
\r
### 2.3 ENV 环境变量\r
\r
- 开发默认 \`ENV=dev\`\r
- 生产命令行启动需显式添加：\`ENV=prod lyedu_backend.exe\`（Windows：\`set ENV=prod && lyedu_backend.exe\`）\r
\r
### 2.4 打包数据文件（datas）\r
\r
\`lyedu_backend.spec\` 中需将 alembic 目录和 alembic.ini 一起打包：\r
\r
\`\`\`python\r
datas=[\r
    ('alembic.ini', '.'),\r
    ('alembic', 'alembic'),\r
],\r
\`\`\`\r
\r
### 2.5 Alembic 迁移在 exe 中的使用\r
\r
- 打包后 alembic 解压在 \`sys._MEIPASS\`\r
- 每次启动将 alembic 覆盖复制到 \`~/.lyedu/alembic\`，便于用户统一管理，且支持 v2、v3 等新迁移随 exe 更新\r
- 运行时通过 \`Config.set_main_option("script_location", str(script_dir))\` 使用绝对路径，避免 cwd 不同导致找不到目录\r
\r
### 2.6 exe 图标\r
\r
在 spec 的 EXE 中设置：\`icon='favicon.ico'\`，图标文件需与 spec 同目录。\r
\r
---\r
\r
## 三、问题与解决方案\r
\r
### 3.1 闪退（双击后窗口一闪而过）\r
\r
**原因**：无 \`if __name__ == "__main__"\` 启动 uvicorn，进程加载完即退出。\r
\r
**解决**：在 \`main.py\` 末尾添加上面的 uvicorn 启动代码。\r
\r
### 3.2 配置/错误信息一闪而过，用户无法阅读\r
\r
**原因**：控制台输出后立即退出。\r
\r
**解决**：\r
\r
- Windows：使用 \`ctypes.windll.user32.MessageBoxW\` 弹出消息框，必须点击确定才关闭\r
- 配置缺失、MySQL/Redis 连接失败、启动失败等场景均弹窗提示\r
\r
### 3.3 使用错误配置仍能启动\r
\r
**原因**：未在启动前验证 MySQL/Redis 连接。\r
\r
**解决**：在 \`lyedu_config\` 中增加 \`test_mysql_connection()\`、\`test_redis_connection()\`，启动前校验，失败则弹窗并退出。\r
\r
### 3.4 Redis 连接失败（connection refused）\r
\r
**原因**：\r
\r
1. Docker 中 Redis 默认只监听 \`127.0.0.1\`，宿主机通过端口映射连接时被拒绝  \r
2. \`localhost\` 可能解析为 IPv6 \`::1\`，而 Redis 仅监听 IPv4\r
\r
**解决**：\r
\r
- compose 中增加：\`command: redis-server --bind 0.0.0.0 ...\`\r
- 代码中将 \`localhost\` 替换为 \`127.0.0.1\`\r
\r
### 3.5 redis-py 报错：unexpected keyword argument 'connect_timeout'\r
\r
**原因**：redis-py 使用 \`socket_connect_timeout\` 而非 \`connect_timeout\`。\r
\r
**解决**：将所有 Redis 客户端的 \`connect_timeout\` 改为 \`socket_connect_timeout\`。\r
\r
### 3.6 Redis 7 需要默认用户名\r
\r
**原因**：Redis 6+ ACL 要求显式提供用户名。\r
\r
**解决**：在配置中增加 \`REDIS_USERNAME=default\`，连接时传入 \`username\` 参数。\r
\r
### 3.7 Alembic 报错：Path doesn't exist: alembic\r
\r
**原因**：\`alembic.ini\` 的 \`script_location = alembic\` 为相对路径，exe 运行时 cwd 可能是 exe 所在目录或用户目录，导致解析失败。\r
\r
**解决**：调用 \`Config.set_main_option("script_location", str(script_dir))\`，传入 alembic 的绝对路径。\r
\r
### 3.8 数据库迁移版本（v2、v3）如何随 exe 更新？\r
\r
**解决**：每次启动时从 \`_MEIPASS\` 覆盖复制 alembic 到 \`~/.lyedu/alembic\`，保证用户目录与当前 exe 内的迁移脚本一致。\r
\r
---\r
\r
## 四、用户目录结构\r
\r
打包后用户需在 \`~/.lyedu/\` 下维护配置与 alembic：\r
\r
\`\`\`\r
~/.lyedu/\r
├── conf/\r
│   ├── config.ini          # 实际配置（必须）\r
│   └── config.ini.template # 模板（自动生成）\r
├── alembic/\r
│   ├── env.py\r
│   ├── script.py.mako\r
│   └── versions/\r
│       ├── v1_init_schema.py\r
│       └── ...              # v2、v3 等由 exe 覆盖更新\r
└── alembic.ini\r
\`\`\`\r
\r
### 4.1 config.ini 示例（与 compose-mysql-redis.yml 一致）\r
\r
\`\`\`ini\r
[mysql]\r
host = 127.0.0.1\r
port = 3306\r
user = root\r
password = lyedu123456\r
database = lyedu\r
charset = utf8mb4\r
\r
[redis]\r
host = 127.0.0.1\r
user = default\r
port = 6379\r
db = 0\r
password = lyedu123456\r
\`\`\`\r
\r
---\r
\r
## 五、Redis Docker 相关\r
\r
- 使用 ACL 时，\`redis-acl.conf\` 首行必须是有效的 \`user\` 行，不能以注释开头\r
- 推荐 ACL 格式：\`user default on >lyedu123456 ~* &* +@all\`\r
- compose 中需加 \`--bind 0.0.0.0\` 以便宿主机连接\r
\r
---\r
\r
## 六、打包检查清单\r
\r
- [ ] \`main.py\` 有 \`if __name__ == "__main__"\` 且启动 uvicorn\r
- [ ] \`config.py\` 中打包分支使用 \`sys.frozen\`、\`sys.executable\`\r
- [ ] \`lyedu_backend.spec\` 中 \`datas\` 包含 alembic、alembic.ini\r
- [ ] Redis 使用 \`socket_connect_timeout\`、\`username\`\r
- [ ] 错误场景有 MessageBox 或 pause，避免闪退\r
- [ ] 启动前校验 MySQL、Redis 连接\r
\r
---\r
\r
## 七、跨平台说明\r
\r
- **Windows**：使用 MessageBox 展示错误\r
- **macOS / Linux**：使用 \`input("按回车键退出...")\` 暂停\r
\r
\`sys.frozen\`、\`sys._MEIPASS\` 在 PyInstaller 打包后可用，开发环境不存在这些属性。\r
`;export{n as default};
