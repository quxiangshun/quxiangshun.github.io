const n=`# 贡献指南

> 编辑日期：2026-02-26



感谢您对 Ly 系列开源项目的关注和支持！我们欢迎并鼓励社区贡献，无论是代码、文档还是其他形式的帮助。本指南将帮助您了解如何有效地参与到项目中来。

## 贡献方式

### 1. 报告问题

如果您发现了 bug 或者有新功能建议，请在 GitHub 仓库中提交 Issue：

1. **搜索现有 Issue**：在提交新 Issue 前，请先搜索是否已有类似的 Issue，避免重复
2. **创建新 Issue**：
   - 选择合适的 Issue 模板（如 bug 报告、功能请求等）
   - 提供清晰、详细的描述
   - 包含必要的上下文信息（如版本、环境、复现步骤等）
   - 如有可能，附上截图、日志或代码示例

### 2. 提交代码

如果您希望直接贡献代码，请按照以下流程操作：

#### 2.1 Fork 仓库

1. 访问项目的 GitHub 仓库（如 [ly-edu](https://github.com/quxiangshun/ly-edu) 或 [ly-factmesh-back](https://github.com/quxiangshun/ly-factmesh-back)）
2. 点击右上角的 "Fork" 按钮，将仓库 Fork 到您自己的 GitHub 账号

#### 2.2 克隆仓库

\`\`\`bash
# 克隆您 Fork 的仓库
git clone https://github.com/your-username/ly-edu.git
# 进入项目目录
cd ly-edu
# 添加 upstream 远程仓库
git remote add upstream https://github.com/quxiangshun/ly-edu.git
\`\`\`

#### 2.3 创建分支

\`\`\`bash
# 从 main 分支创建新分支
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
# 或修复分支
git checkout -b fix/your-fix-name
\`\`\`

#### 2.4 编写代码

- 遵循项目的代码规范
- 编写清晰、简洁的代码
- 添加必要的注释
- 确保代码通过测试

#### 2.5 提交代码

使用 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范提交代码：

\`\`\`bash
git add .
git commit -m "feat: 描述您的功能"
# 或 git commit -m "fix: 描述您的修复"
\`\`\`

#### 2.6 推送代码

\`\`\`bash
git push origin feature/your-feature-name
\`\`\`

#### 2.7 创建 Pull Request

1. 访问您 Fork 的 GitHub 仓库
2. 点击 "Compare & pull request" 按钮
3. 填写 Pull Request 标题和描述
4. 选择合适的标签
5. 点击 "Create pull request" 按钮

### 3. 改进文档

文档是项目的重要组成部分，您可以通过以下方式改进文档：

- 修正文档中的错误或过时信息
- 补充缺失的文档内容
- 改进文档的结构和可读性
- 翻译文档到其他语言

### 4. 测试和反馈

- 测试项目的功能，报告 bug
- 提供使用反馈和建议
- 分享您的使用案例和经验

## 代码规范

### 前端代码规范

- **框架**：Vue 3
- **语言**：TypeScript
- **风格**：遵循 [Vue 3 风格指南](https://vuejs.org/style-guide/)
- **格式化**：使用 Prettier 进行代码格式化
- **检查**：使用 ESLint 进行代码质量检查

### 后端代码规范

- **Java**：遵循 [Google Java 风格指南](https://google.github.io/styleguide/javaguide.html)
- **Python**：遵循 [PEP 8](https://peps.python.org/pep-0008/)
- **命名**：使用清晰、描述性的命名
- **缩进**：使用 4 个空格进行缩进
- **注释**：添加必要的文档注释

## 提交规范

使用 [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) 规范：

\`\`\`
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
\`\`\`

### 类型说明

- **feat**：新功能
- **fix**：修复 bug
- **docs**：文档更新
- **style**：代码风格调整（不影响功能）
- **refactor**：代码重构（不添加功能或修复 bug）
- **test**：添加或修改测试
- **chore**：构建过程或辅助工具的变动
- **perf**：性能优化
- **ci**：CI 配置更改
- **build**：构建系统或外部依赖的更改
- **revert**：回滚之前的提交

## 分支管理

### 分支策略

- **main**：主分支，用于发布生产版本
- **develop**：开发分支，用于集成开发
- **feature/xxx**：特性分支，用于开发新功能
- **fix/xxx**：修复分支，用于修复 bug
- **hotfix/xxx**：热修复分支，用于紧急修复生产问题

### 分支命名规范

- 使用小写字母和连字符
- 功能分支：\`feature/功能描述\`
- 修复分支：\`fix/问题描述\`
- 热修复分支：\`hotfix/问题描述\`

## 开发流程

1. **需求讨论**：在 GitHub Issues 中讨论功能需求或 bug 修复
2. **分支创建**：从 develop 分支创建功能或修复分支
3. **代码开发**：实现功能或修复 bug
4. **测试验证**：确保代码通过测试
5. **代码审查**：提交 Pull Request，进行代码审查
6. **合并分支**：代码审查通过后，合并到 develop 分支
7. **发布准备**：从 develop 分支合并到 main 分支，准备发布

## 行为准则

我们希望所有参与者都能在友好、尊重的环境中贡献代码。请遵循以下行为准则：

- **尊重他人**：尊重不同的观点和经验
- **包容多样**：欢迎来自不同背景的贡献者
- **建设性批评**：提供建设性的反馈和建议
- **专注问题**：讨论聚焦于项目相关的问题
- **互相帮助**：帮助其他贡献者，尤其是新手

## 常见问题

### 如何找到适合的任务？

- 查看 GitHub Issues 中的 "good first issue" 标签
- 查看 "help wanted" 标签的 Issues
- 询问项目维护者是否有适合的任务

### 如何获取帮助？

- 在 GitHub Issues 中提问
- 加入项目的社区交流渠道
- 查看项目文档和代码注释

### 提交的代码何时会被合并？

代码审查和合并时间取决于项目维护者的工作量，一般会在 1-2 周内处理。如果您的 Pull Request 长时间未被处理，可以礼貌地提醒维护者。

## 感谢

再次感谢您对 Ly 系列项目的贡献！您的参与将帮助我们创建更好的开源解决方案。

## 联系我们

如果您有任何问题或建议，请通过以下方式联系我们：

- **GitHub Issues**：在对应项目的 GitHub 仓库提交 Issue
- **邮件**：quxiangshun@example.com

期待您的贡献！`;export{n as default};
