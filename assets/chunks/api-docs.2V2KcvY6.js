const n=`# LyEdu API 文档\r
\r
> 编辑日期：2026-02-26  \r
> 基于 [ly-edu](https://gitee.com/quxiangshun/ly-edu) 项目结构整理\r
\r
## 一、API 概览\r
\r
LyEdu 提供 RESTful API，支持课程管理、学习跟踪、考试、证书、用户/部门等模块。前后端通过 JWT 进行认证。\r
\r
### 在线文档\r
\r
- **Python 后端**：http://localhost:9700/docs 或 http://localhost:9700/api-docs（启动后访问）\r
- **Java 后端**：http://localhost:8080/api-docs（若启用 SpringDoc）\r
\r
根据实际使用的后端，访问对应地址查看交互式 API 文档。\r
\r
## 二、认证方式\r
\r
### 1. 用户名密码登录\r
\r
\`\`\`bash\r
curl -X POST http://localhost:9700/api/auth/login \\\r
  -H "Content-Type: application/json" \\\r
  -d '{"username": "admin", "password": "123456"}'\r
\`\`\`\r
\r
响应示例：\r
\r
\`\`\`json\r
{\r
  "access_token": "eyJhbGciOiJIUzI1NiIs...",\r
  "token_type": "bearer",\r
  "expires_in": 86400\r
}\r
\`\`\`\r
\r
### 2. 携带 Token 调用\r
\r
\`\`\`bash\r
curl -X GET http://localhost:9700/api/courses \\\r
  -H "Authorization: Bearer <your-token>"\r
\`\`\`\r
\r
## 三、主要接口模块\r
\r
以下为功能对照，具体路径以 Swagger / OpenAPI 文档为准：\r
\r
| 模块 | 说明 | 典型路径 |\r
|------|------|----------|\r
| 认证 | 登录、登出、刷新 token | /api/auth/* |\r
| 用户 | 用户 CRUD、部门关联 | /api/users/* |\r
| 部门 | 部门树、用户列表 | /api/departments/* |\r
| 课程 | 课程、章节、视频、附件 | /api/courses/* |\r
| 学习 | 学习进度、学习记录 | /api/learning/* |\r
| 考试 | 题库、试卷、考试、成绩 | /api/exams/* |\r
| 证书 | 证书、证书模板 | /api/certificates/* |\r
| 任务 | 周期任务、新员工任务 | /api/tasks/* |\r
| 知识库 | 知识中心、文档 | /api/knowledge/* |\r
| 积分 | 积分规则、流水、排行 | /api/points/* |\r
| 系统 | 系统配置、图片库 | /api/system/* |\r
\r
## 四、通用响应格式\r
\r
### 成功\r
\r
\`\`\`json\r
{\r
  "code": 0,\r
  "message": "success",\r
  "data": { ... }\r
}\r
\`\`\`\r
\r
### 失败\r
\r
\`\`\`json\r
{\r
  "code": 400,\r
  "message": "错误描述",\r
  "detail": "可选详情"\r
}\r
\`\`\`\r
\r
## 五、常见状态码\r
\r
| HTTP 状态码 | 说明 |\r
|-------------|------|\r
| 200 | 成功 |\r
| 201 | 创建成功 |\r
| 400 | 请求参数错误 |\r
| 401 | 未认证或 token 失效 |\r
| 403 | 无权限 |\r
| 404 | 资源不存在 |\r
| 500 | 服务器错误 |\r
\r
业务错误码见 [错误码说明](/projects/lyedu/error-codes)。\r
\r
## 六、接口调用示例\r
\r
### 获取课程列表\r
\r
\`\`\`bash\r
curl -X GET "http://localhost:9700/api/courses?page=1&size=10" \\\r
  -H "Authorization: Bearer <token>"\r
\`\`\`\r
\r
### 上传文件\r
\r
\`\`\`bash\r
curl -X POST http://localhost:9700/api/files/upload \\\r
  -H "Authorization: Bearer <token>" \\\r
  -F "file=@/path/to/file.pdf"\r
\`\`\`\r
\r
具体字段与分页参数以实际 API 文档为准。\r
\r
## 七、Postman / 前端对接\r
\r
1. 从 Swagger 导出 OpenAPI JSON\r
2. 导入 Postman 自动生成请求集合\r
3. 前端在 \`api/\` 目录封装 Axios 调用，统一添加 \`Authorization\` 头\r
\r
## 相关链接\r
\r
- [前端开发指南](/projects/lyedu/frontend-dev)\r
- [后端开发指南](/projects/lyedu/backend-dev)\r
- [集成说明](/projects/lyedu/integrations)\r
- [错误码说明](/projects/lyedu/error-codes)\r
- [项目仓库](https://gitee.com/quxiangshun/ly-edu)\r
`;export{n as default};
