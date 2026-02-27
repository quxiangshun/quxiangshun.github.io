const r=`---\r
title: LyEdu 接口文档\r
description: FastAPI + Uvicorn 集成结构、接口文档与 Swagger\r
---\r
\r
# FastAPI + Uvicorn 集成结构\r
\r
本文档说明 lyedu-api-python 中 \`pip install fastapi uvicorn\` 的依赖关系与集成方式。\r
\r
## 一、依赖配置\r
\r
\`\`\`\r
requirements.txt\r
├── fastapi>=0.115.0      # Web 框架：路由、中间件、OpenAPI 文档\r
└── uvicorn[standard]>=0.34.0   # ASGI 服务器：运行 FastAPI 应用\r
\`\`\`\r
\r
- **fastapi**：构建 REST API，提供路由、请求校验（Pydantic）、自动文档（/docs）、CORS 等\r
- **uvicorn[standard]**：\`[standard]\` 含 uvloop、httptools，提升异步性能\r
\r
## 二、集成结构\r
\r
\`\`\`\r
lyedu-api-python/\r
├── main.py                 # 入口：创建 FastAPI 实例，注册路由，启动 uvicorn\r
├── config.py               # 配置（HOST/PORT/MYSQL/REDIS 等）\r
├── routers/                # 路由模块（挂载到 /api 下）\r
│   ├── auth.py\r
│   ├── course.py\r
│   └── ...\r
├── services/               # 业务逻辑层\r
├── models/                 # 数据模型\r
├── util/                   # 工具（logger、jwt、upload 等）\r
└── alembic/                # 数据库迁移\r
\`\`\`\r
\r
### main.py 中的集成关系\r
\r
\`\`\`\r
┌─────────────────────────────────────────────────────────────┐\r
│  from fastapi import FastAPI                                 │\r
│  app = FastAPI(title='LyEdu API', lifespan=...)              │\r
│  app.add_middleware(CORSMiddleware, ...)                     │\r
│  app.include_router(xxx.router, prefix='/api')               │\r
└─────────────────────────────────────────────────────────────┘\r
                              │\r
                              ▼\r
┌─────────────────────────────────────────────────────────────┐\r
│  if __name__ == "__main__":                                  │\r
│      if "--serve" in sys.argv:                               │\r
│          import uvicorn                                       │\r
│          uvicorn.run(app, host=config.HOST, port=config.PORT) │\r
└─────────────────────────────────────────────────────────────┘\r
\`\`\`\r
\r
- **FastAPI**：定义 \`app\`，挂载所有 router\r
- **Uvicorn**：加载 \`app\`，监听端口，处理 HTTP 请求\r
\r
## 三、启动方式\r
\r
| 方式 | 命令 | 适用场景 |\r
|------|------|----------|\r
| 开发 | \`python main.py\` | 主进程启动子进程 \`--serve\`，后台运行并等待就绪后退出 |\r
| 直接 | \`python main.py --serve\` | 内部使用，由主进程 fork 后调用 |\r
| 命令行 | \`uvicorn main:app --host 0.0.0.0 --port 9700\` | Docker、生产环境常用 |\r
| 打包 exe | 双击运行 | Windows 下等价于 \`python main.py\` |\r
\r
### Docker 中的用法\r
\r
\`\`\`dockerfile\r
# Dockerfile：pip install -r requirements.txt\r
ENTRYPOINT ["./docker-entrypoint.sh"]\r
\`\`\`\r
\r
\`\`\`bash\r
# docker-entrypoint.sh 末尾\r
exec uvicorn main:app --host 0.0.0.0 --port 9700\r
\`\`\`\r
\r
## 四、请求链路\r
\r
\`\`\`\r
HTTP 请求\r
    │\r
    ▼\r
Uvicorn (ASGI 服务器)\r
    │\r
    ▼\r
FastAPI (Starlette 应用)\r
    │\r
    ├─→ CORS 中间件\r
    ├─→ NoCache 中间件\r
    ├─→ 路由匹配 /api/xxx\r
    │       │\r
    │       ▼\r
    │   routers/*.py 中的 @router.get/post/...\r
    │       │\r
    │       ▼\r
    │   services/*.py 业务逻辑\r
    │       │\r
    │       ▼\r
    │   db / Redis 等\r
    │\r
    ▼\r
HTTP 响应\r
\`\`\`\r
\r
## 五、相关配置\r
\r
| 变量 | 默认值 | 说明 |\r
|------|--------|------|\r
| \`HOST\` | \`0.0.0.0\` | 监听地址，0.0.0.0 允许外网访问 |\r
| \`PORT\` | \`9700\` | 监听端口 |\r
\r
配置来源：\`.env\` / \`.env.dev\`（开发）或 \`~/.lyedu/conf/config.ini\`（打包后）。\r
\r
---\r
\r
## 六、接口文档\r
\r
| 文档 | 路径 | 说明 |\r
|------|------|------|\r
| **Swagger UI** | \`/docs\` | FastAPI 自动生成，可在线调试接口 |\r
| **OpenAPI JSON** | \`/openapi.json\` | 标准 OpenAPI 3.0 规范 |\r
| **接口说明（人工维护）** | \`docs/LYEDU_API_PYTHON.md\` | 业务说明、入参/出参、示例，供前端对接 |\r
| **接口文档（运行时）** | \`/interface-doc\` | 服务运行时提供接口说明 Markdown（开发环境含仓库文档时可用） |\r
\r
### 文档关系\r
\r
\`\`\`\r
LYEDU_API_PYTHON.md  ←→  代码 routers/*.py\r
        │                         │\r
        │                         ▼\r
        │                   OpenAPI schema\r
        │                         │\r
        └─────────────────────────┼──→ /docs (Swagger UI)\r
                                 └──→ /interface-doc (Markdown)\r
\`\`\`\r
\r
- **Swagger \`/docs\`**：随代码自动更新，适合快速调试\r
- **LYEDU_API_PYTHON.md**：人工编写，含业务规则、可见性说明、错误示例，便于前后端协同\r
- 新增接口时建议同步更新 \`docs/LYEDU_API_PYTHON.md\`\r
`;export{r as default};
