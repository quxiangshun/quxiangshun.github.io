const n=`# 常见问题

> 编辑日期：2026-02-26



## 1. 项目概览

### 1.1 Ly 系列项目是什么？

Ly 系列项目是一系列开源项目的集合，旨在为企业和开发者提供高质量、易用的解决方案。目前主要包含 LyEdu（企业级教育训练系统）和 LyMom（制造运营管理系统）两个项目。

### 1.2 如何选择适合的项目？

- **LyEdu**：适合需要企业内部培训和学习管理的组织
- **LyMom**：适合需要生产管理、设备监控和数据分析的制造企业

### 1.3 项目的开源协议是什么？

Ly 系列项目采用 MIT 开源协议，允许自由使用、修改和分发。

## 2. 安装与部署

### 2.1 如何快速部署 LyEdu 项目？

推荐使用 Docker Compose 进行快速部署，具体步骤如下：

1. 克隆代码仓库：\`git clone https://github.com/quxiangshun/ly-edu.git\`
2. 进入项目目录：\`cd ly-edu\`
3. 启动服务：\`docker compose up -d\`
4. 访问应用：\`http://localhost\`

### 2.2 如何快速部署 LyMom 项目？

同样推荐使用 Docker Compose 进行快速部署：

1. 克隆代码仓库：\`git clone https://github.com/quxiangshun/ly-factmesh-back.git\`
2. 进入项目目录：\`cd ly-factmesh-back\`
3. 启动服务：\`docker compose up -d\`
4. 访问应用：\`http://localhost\`

### 2.3 部署环境有什么要求？

- **硬件**：至少 4 核 CPU、8GB 内存、50GB 存储空间
- **软件**：Docker 20.10.0+、Docker Compose 1.29.0+
- **网络**：稳定的网络连接

## 3. 技术问题

### 3.1 如何解决 Git 多平台同步的认证问题？

GitHub、Gitee、GitCode 均已禁用密码登录，必须使用 Token 进行认证。具体步骤如下：

1. 在各平台生成个人访问令牌（Token）
2. 使用 Token 替换远程地址：\`https://用户名:Token@github.com/用户名/仓库名.git\`
3. 验证连接：\`git remote -v\`

详细步骤请参考 [Git 一键同步](/tech-share/git/git-sync) 文档。

### 3.2 如何解决本地分支为空无法设置跟踪的问题？

空分支不能绑定上游远程分支，需要先创建一个初始提交：

\`\`\`bash
git commit --allow-empty -m "init: 初始化空分支"
git branch --set-upstream-to=origin/main main
\`\`\`

### 3.3 如何解决远程不存在 main 分支或历史无关的问题？

本地与远程是两个独立仓库，无共同提交历史时，可以使用以下命令：

\`\`\`bash
git pull origin main --allow-unrelated-histories
\`\`\`

冲突文件手动解决后：

\`\`\`bash
git add .
git commit -m "merge: 解决无关历史合并冲突"
\`\`\`

## 4. 功能使用

### 4.1 LyEdu 如何集成 Feishu 登录？

1. 在 Feishu 开发者平台创建应用
2. 获取 App ID 和 App Secret
3. 在 LyEdu 系统中配置 Feishu 集成
4. 启用 Feishu 登录功能

详细步骤请参考 [LyEdu 集成说明](/projects/lyedu/integrations) 文档。

### 4.2 LyMom 如何集成工业设备？

LyMom 支持多种工业协议，包括 OPC UA、Modbus TCP 和 MQTT。具体步骤如下：

1. 进入「设备管理」→「设备接入」
2. 点击「添加设备」按钮
3. 填写设备信息，选择通信协议
4. 配置设备连接参数
5. 保存并启用设备

### 4.3 如何创建和管理课程（LyEdu）？

1. 进入「课程管理」→「课程列表」
2. 点击「新建课程」按钮
3. 填写课程基本信息
4. 点击「添加章节」按钮，为课程添加章节和视频
5. 保存课程并发布

## 5. 开发与贡献

### 5.1 如何搭建开发环境？

详细的开发环境搭建步骤请参考 [开发环境搭建](/dev-env-setup) 文档。

### 5.2 如何贡献代码？

1. Fork 代码仓库
2. 创建特性分支：\`git checkout -b feature/xxx\`
3. 提交代码：\`git commit -m "feat: 描述你的变更"\`
4. 推送到远程：\`git push origin feature/xxx\`
5. 创建 Pull Request

### 5.3 代码提交有什么规范？

使用 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范：

\`\`\`
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
\`\`\`

常见类型：
- \`feat\`：新功能
- \`fix\`：修复 bug
- \`docs\`：文档更新
- \`style\`：代码风格调整
- \`refactor\`：代码重构
- \`test\`：测试相关
- \`chore\`：构建、依赖等调整

## 6. 故障排查

### 6.1 推送被拒：non-fast-forward

**原因**：本地分支落后远程，必须先拉取合并。

**解决方案**：

\`\`\`bash
git pull
# 有冲突则解决后提交
git push
\`\`\`

### 6.2 文件冲突：add/add

**原因**：本地与远程同时新增同名文件，内容不同。

**解决方案**：

1. 打开冲突文件
2. 删除 \`<<<<<<< HEAD\` / \`=======\` / \`>>>>>>> origin/main\` 标记
3. 保留需要的内容
4. 标记解决并提交：\`git add . && git commit -m "fix: 解决add/add冲突"\`

### 6.3 数据库连接失败

**可能原因**：
- 数据库服务未启动
- 连接参数配置错误
- 网络连接问题

**解决方案**：
- 检查数据库服务状态
- 验证连接参数
- 检查网络连接

## 7. 其他问题

### 7.1 如何获取技术支持？

- **GitHub Issues**：在对应项目的 GitHub 仓库提交 Issue
- **文档中心**：参考 [官方文档](/) 获取帮助
- **社区交流**：加入相关技术社区进行交流

### 7.2 项目的未来规划是什么？

Ly 系列项目将持续迭代和扩展，未来计划推出以下项目：

- **LyCRM**：客户关系管理系统
- **LyERP**：企业资源计划系统
- **LyIoT**：物联网平台

### 7.3 如何报告安全问题？

请通过项目的 GitHub Issues 或邮件方式报告安全问题，我们会及时处理。`;export{n as default};
