const n=`# Git 一键同步代码到 GitHub、Gitee、GitCode 总结文档\r
\r
> 编辑日期：2026-02-26\r
\r
\r
\r
## 背景\r
\r
在开源项目开发中，为了提高项目的知名度和可访问性，我们通常会将代码同步到多个代码托管平台，如 GitHub、Gitee、GitCode 等。手动同步代码到多个平台不仅繁琐，而且容易出错。因此，本文将介绍如何实现 Git 一键同步代码到多个代码托管平台的方法。\r
\r
### 背景与目标\r
\r
本地项目需同时同步到 Gitee / GitHub / GitCode 三平台，实现：\r
\r
1. 默认从 Gitee 拉取更新（git pull）\r
2. 一键命令推送到三个平台（git push-all）\r
3. 解决全程遇到的分支、冲突、认证、历史无关等问题\r
\r
### 环境与初始问题\r
\r
- 本地分支：main（空分支/无提交）\r
- 远程仓库：三平台均为 ly-docs\r
- 初始报错合集：\r
  1. fatal: couldn't find remote ref main\r
  2. fatal: refusing to merge unrelated histories\r
  3. ! [rejected] main -> main (fetch first)\r
  4. fatal: no commit on branch 'main' yet\r
  5. HTTP Basic: Access denied（密码登录失效）\r
  6. 自动合并冲突：CONFLICT (add/add)\r
\r
## 核心问题与解决方案清单\r
\r
### 1. 远程不存在 main 分支 / 历史无关\r
\r
**现象**\r
\r
\`\`\`\r
fatal: couldn't find remote ref main\r
fatal: refusing to merge unrelated histories\r
\`\`\`\r
\r
**原因**\r
\r
本地与远程是两个独立仓库，无共同提交历史。\r
\r
**解决**\r
\r
\`\`\`bash\r
git pull origin main --allow-unrelated-histories\r
\`\`\`\r
\r
冲突文件手动解决后：\r
\r
\`\`\`bash\r
git add .\r
git commit -m "merge: 解决无关历史合并冲突"\r
\`\`\`\r
\r
### 2. 本地分支为空，无法设置跟踪\r
\r
**现象**\r
\r
\`\`\`\r
fatal: no commit on branch 'main' yet\r
\`\`\`\r
\r
**原因**\r
\r
空分支不能绑定上游远程分支。\r
\r
**解决**\r
\r
\`\`\`bash\r
git commit --allow-empty -m "init: 初始化空分支"\r
git branch --set-upstream-to=origin/main main\r
\`\`\`\r
\r
### 3. 推送被拒：non-fast-forward\r
\r
**现象**\r
\r
\`\`\`\r
! [rejected] main -> main (non-fast-forward)\r
\`\`\`\r
\r
**原因**\r
\r
本地分支落后远程，必须先拉取合并。\r
\r
**解决**\r
\r
\`\`\`bash\r
git pull\r
# 有冲突则解决后提交\r
git push-all\r
\`\`\`\r
\r
### 4. 认证失败：密码登录已废弃\r
\r
**现象**\r
\r
\`\`\`\r
remote: HTTP Basic: Access denied.\r
\`\`\`\r
\r
**原因**\r
\r
GitHub/Gitee/GitCode 均禁用密码，必须用 Token。\r
\r
**解决**\r
\r
各平台生成 Token 后，替换远程地址：\r
\r
\`\`\`bash\r
# Gitee\r
git remote set-url origin \`https://用户名:Token@gitee.com/用户名/ly-docs.git\`\r
\r
# GitHub\r
git remote set-url github \`https://用户名:Token@github.com/用户名/ly-docs.git\`\r
\r
# GitCode\r
git remote set-url gitcode \`https://用户名:Token@gitcode.com/用户名/ly-docs.git\`\r
\`\`\`\r
\r
### 5. 文件冲突：add/add 冲突\r
\r
**现象**\r
\r
\`\`\`\r
Auto-merging README.md\r
CONFLICT (add/add): Merge conflict in README.md\r
\`\`\`\r
\r
**原因**\r
\r
本地与远程同时新增同名文件，内容不同。\r
\r
**解决**\r
\r
1. 打开文件删除 \`<<<<<<< HEAD\` / \`=======\` / \`>>>>>>> origin/main\`\r
2. 保留需要的内容\r
3. 标记解决并提交\r
\r
\`\`\`bash\r
git add README.md .gitignore\r
git commit -m "fix: 解决add/add冲突"\r
\`\`\`\r
\r
## 实现原理\r
\r
Git 支持多个远程仓库，我们可以通过配置多个远程仓库地址，然后使用脚本来批量推送代码到这些仓库。具体原理如下：\r
\r
1. 为本地仓库添加多个远程仓库地址\r
2. 创建一个同步脚本，用于批量推送代码到所有远程仓库\r
3. 执行脚本，实现一键同步\r
\r
## 配置步骤\r
\r
### 1. 准备工作\r
\r
- 确保本地已安装 Git\r
- 在各个代码托管平台（GitHub、Gitee、GitCode）上创建同名仓库\r
- 确保本地仓库已初始化并配置好用户信息\r
\r
### 2. 配置多个远程仓库\r
\r
#### 方法一：使用 git remote 命令添加\r
\r
\`\`\`bash\r
# 查看当前远程仓库\r
git remote -v\r
\r
# 添加 GitHub 远程仓库\r
git remote add github https://github.com/your-username/your-repo.git\r
\r
# 添加 Gitee 远程仓库\r
git remote add gitee https://gitee.com/your-username/your-repo.git\r
\r
# 添加 GitCode 远程仓库\r
git remote add gitcode https://gitcode.com/your-username/your-repo.git\r
\r
# 查看配置结果\r
git remote -v\r
\`\`\`\r
\r
#### 方法二：直接编辑 .git/config 文件\r
\r
打开本地仓库中的 \`.git/config\` 文件，添加以下内容：\r
\r
\`\`\`ini\r
[remote "github"]\r
    url = https://github.com/your-username/your-repo.git\r
    fetch = +refs/heads/*:refs/remotes/github/*\r
[remote "gitee"]\r
    url = https://gitee.com/your-username/your-repo.git\r
    fetch = +refs/heads/*:refs/remotes/gitee/*\r
[remote "gitcode"]\r
    url = https://gitcode.com/your-username/your-repo.git\r
    fetch = +refs/heads/*:refs/remotes/gitcode/*\r
\`\`\`\r
\r
### 3. 创建同步脚本\r
\r
#### Windows 平台（sync.bat）\r
\r
\`\`\`batch\r
@echo off\r
echo 开始同步代码到多个平台...\r
\r
echo 同步到 GitHub...\r
git push github --all\r
git push github --tags\r
\r
echo 同步到 Gitee...\r
git push gitee --all\r
git push gitee --tags\r
\r
echo 同步到 GitCode...\r
git push gitcode --all\r
git push gitcode --tags\r
\r
echo 同步完成！\r
pause\r
\`\`\`\r
\r
#### Linux/Mac 平台（sync.sh）\r
\r
\`\`\`bash\r
#!/bin/bash\r
echo "开始同步代码到多个平台..."\r
\r
echo "同步到 GitHub..."\r
git push github --all\r
git push github --tags\r
\r
echo "同步到 Gitee..."\r
git push gitee --all\r
git push gitee --tags\r
\r
echo "同步到 GitCode..."\r
git push gitcode --all\r
git push gitcode --tags\r
\r
echo "同步完成！"\r
\`\`\`\r
\r
### 4. 配置脚本权限（仅 Linux/Mac 平台）\r
\r
\`\`\`bash\r
chmod +x sync.sh\r
\`\`\`\r
\r
## 使用方法\r
\r
1. 在本地仓库中进行代码修改和提交\r
2. 执行同步脚本：\r
   - Windows：双击 \`sync.bat\` 文件\r
   - Linux/Mac：在终端中执行 \`./sync.sh\`\r
3. 脚本会自动将代码同步到所有配置的远程仓库\r
\r
## 高级配置\r
\r
### 1. 使用 SSH 连接\r
\r
为了避免每次推送都需要输入密码，建议使用 SSH 连接远程仓库。具体步骤如下：\r
\r
1. 生成 SSH 密钥对：\r
\r
\`\`\`bash\r
ssh-keygen -t rsa -b 4096 -C "your-email@example.com"\r
\`\`\`\r
\r
2. 将公钥添加到各个代码托管平台：\r
   - GitHub：Settings → SSH and GPG keys → New SSH key\r
   - Gitee：设置 → SSH 公钥 → 添加公钥\r
   - GitCode：设置 → SSH 密钥 → 添加密钥\r
\r
3. 修改远程仓库地址为 SSH 格式：\r
\r
\`\`\`bash\r
# 修改 GitHub 远程仓库地址\r
git remote set-url github git@github.com:your-username/your-repo.git\r
\r
# 修改 Gitee 远程仓库地址\r
git remote set-url gitee git@gitee.com:your-username/your-repo.git\r
\r
# 修改 GitCode 远程仓库地址\r
git remote set-url gitcode git@gitcode.com:your-username/your-repo.git\r
\`\`\`\r
\r
### 2. 配置默认推送行为\r
\r
可以配置 Git 的默认推送行为，使其默认推送到所有远程仓库：\r
\r
\`\`\`bash\r
# 查看当前默认推送行为\r
git config --get push.default\r
\r
# 设置默认推送行为为 simple（仅推送当前分支到对应远程分支）\r
git config push.default simple\r
\`\`\`\r
\r
### 3. 使用 Git Hooks 自动同步\r
\r
可以使用 Git Hooks 在提交代码后自动执行同步脚本：\r
\r
1. 进入 \`.git/hooks\` 目录\r
2. 创建 \`post-commit\` 文件：\r
\r
\`\`\`bash\r
#!/bin/bash\r
# 切换到仓库根目录\r
cd "$(git rev-parse --show-toplevel)"\r
\r
# 执行同步脚本\r
if [ -f "sync.sh" ]; then\r
    ./sync.sh\r
elif [ -f "sync.bat" ]; then\r
    ./sync.bat\r
fi\r
\`\`\`\r
\r
3. 配置脚本权限：\r
\r
\`\`\`bash\r
chmod +x post-commit\r
\`\`\`\r
\r
## 常见问题\r
\r
### 1. 推送失败\r
\r
**可能原因**：\r
- 网络连接问题\r
- 远程仓库地址错误\r
- 权限不足\r
\r
**解决方案**：\r
- 检查网络连接\r
- 验证远程仓库地址是否正确\r
- 确保已配置正确的 SSH 密钥或用户名密码\r
\r
### 2. 同步速度慢\r
\r
**可能原因**：\r
- 网络延迟\r
- 代码仓库较大\r
- 多个远程仓库同时推送\r
\r
**解决方案**：\r
- 使用 SSH 连接，提高传输速度\r
- 考虑使用 \`git push --mirror\` 命令，仅推送必要的引用\r
- 在脚本中添加适当的延迟，避免同时推送导致的网络拥塞\r
\r
### 3. 分支不同步\r
\r
**可能原因**：\r
- 某些分支仅存在于部分远程仓库\r
- 分支名称不一致\r
\r
**解决方案**：\r
- 使用 \`git push --all\` 命令，确保所有分支都被推送\r
- 统一分支命名规范，避免分支名称不一致\r
\r
## 最终最优配置\r
\r
### 1. 远程结构\r
\r
\`\`\`\r
origin   → Gitee（默认拉取）\r
github   → GitHub\r
gitcode  → GitCode\r
\`\`\`\r
\r
### 2. 一键推送配置\r
\r
\`\`\`bash\r
git config --global alias.push-all '!git push origin main && git push github main && git push gitcode main'\r
\`\`\`\r
\r
### 3. 日常工作流\r
\r
\`\`\`bash\r
# 从 Gitee 拉取\r
git pull\r
\r
# 提交修改\r
git add .\r
git commit -m "feat: 更新内容"\r
\r
# 一键推三平台\r
git push-all\r
\`\`\`\r
\r
## 关键命令速查表\r
\r
| 问题场景 | 命令 |\r
|---------|------|\r
| 允许合并无关历史 | \`git pull origin main --allow-unrelated-histories\` |\r
| 空分支初始化提交 | \`git commit --allow-empty -m "init"\` |\r
| 绑定默认上游(Gitee) | \`git branch --set-upstream-to=origin/main main\` |\r
| 一键推送到三平台 | \`git push-all\` |\r
| 查看远程地址 | \`git remote -v\` |\r
| 查看分支跟踪 | \`git branch -vv\` |\r
\r
## 最佳实践\r
\r
### 1. 仓库管理\r
\r
- 在本地仓库中保持代码的整洁和规范\r
- 定期清理无用分支，减少同步数据量\r
- 使用标签（tags）管理版本，确保版本信息同步到所有平台\r
\r
### 2. 同步策略\r
\r
- 对于大型仓库，考虑使用 \`git push --mirror\` 命令，提高同步效率\r
- 对于频繁更新的仓库，建议使用 Git Hooks 自动同步\r
- 对于重要的版本发布，建议手动执行同步脚本，确保同步成功\r
\r
### 3. 安全考虑\r
\r
- 使用 SSH 连接远程仓库，避免明文传输密码\r
- 定期更新 SSH 密钥，提高安全性\r
- 确保同步脚本的权限设置正确，避免被恶意修改\r
\r
### 4. 避坑总结\r
\r
1. **永远不要用密码**：三平台均必须用 Token\r
2. **分支名统一**：本地/远程都用 main\r
3. **冲突不可怕**：先解决再提交，不要跳过合并\r
4. **空分支必须先提交**：才能绑定远程\r
5. **推送被拒一定先 pull**：不要直接强制推送\r
6. **多平台同步用 git alias 最稳定**：不要用复杂脚本\r
\r
## Gitee / GitHub / GitCode Token 申请完整步骤\r
\r
Token（个人访问令牌）是三平台替代密码登录的唯一合法方式，遵循「最小权限原则」申请，既能满足 Git 推送需求，又能保障账号安全。以下是三个平台的详细申请步骤，全程网页端操作，步骤清晰可直接对照执行。\r
\r
### 1. Gitee Token 申请步骤\r
\r
1. **登录 Gitee 官网**：打开 \`https://gitee.com\`，登录个人账号（本文以账号 \`quxiangshun\` 为例）。\r
\r
2. **进入私人令牌页面**：点击页面右上角「个人头像」→ 下拉菜单选择「设置」→ 左侧菜单栏找到「私人令牌」，点击进入令牌管理页面。\r
\r
3. **生成新令牌**：点击页面右上角「生成新令牌」，进入配置页面，按以下要求填写：\r
   - **令牌描述（Note）**：填写易识别的备注，如「Git 多平台同步 - ly-docs 仓库专用」，便于后续区分令牌用途。\r
   - **有效期**：推荐选择「长期有效」（个人使用），或按需选择短期（如30天），到期后需重新申请。\r
   - **权限勾选**：仅勾选「仓库管理（repo）」相关权限（最小权限原则），具体勾选以下选项：\r
     - repo：仓库的读写权限（核心，必须勾选）\r
     - projects：项目管理权限（辅助，可选勾选）\r
\r
4. **确认生成并保存**：配置完成后，滚动到页面底部，点击「提交」，会弹出账号密码验证弹窗，输入 Gitee 登录密码确认。验证通过后，会生成一串 Token（如本文提供的 7a**************7c），该 Token 仅显示一次，务必立即复制并保存到安全位置（如记事本、密码管理器），关闭页面后无法再次查看。\r
\r
5. **Token 失效/替换**：若 Token 不慎泄露或失效，回到「私人令牌」页面，找到对应令牌，点击「撤销」即可失效，随后重新按上述步骤生成新 Token。\r
\r
### 2. GitHub Token 申请步骤\r
\r
1. **登录 GitHub 官网**：打开 \`https://github.com\`，登录个人账号（本文以账号 \`quxiangshun\` 为例）。\r
\r
2. **进入开发者设置页面**：点击页面右上角「个人头像」→ 下拉菜单选择「Settings」（设置）→ 左侧菜单栏滚动到最底部，点击「Developer settings」（开发者设置）→ 再选择「Personal access tokens」（个人访问令牌）→ 点击「Tokens (classic)」（经典令牌，推荐新手使用，权限更易控制）。\r
\r
3. **生成新的经典令牌**：点击页面右上角「Generate new token」→ 下拉选择「Generate new token (classic)」，进入配置页面，按以下要求填写：\r
   - **Note（备注）**：填写令牌用途，如「Git 多平台同步 - ly-docs 仓库推送专用」，便于后续识别。\r
   - **Expiration（有效期）**：推荐选择短期（如30天），安全性更高；个人使用可选择「No expiration」（永不过期），到期后需重新生成。\r
   - **Select scopes（权限范围）**：仅勾选「repo」分类下的所有权限（满足 Git 推送需求即可），具体勾选：\r
     - repo:status：仓库状态访问权限\r
     - repo_deployment：仓库部署权限\r
     - public_repo：公共仓库读写权限\r
     - repo:invite：仓库邀请权限\r
     - security_events：安全事件权限\r
\r
4. **生成并保存 Token**：滚动到页面底部，点击「Generate token」（生成令牌），生成一串以 ghp_ 开头的 Token（如本文提供的 github_pat_11A********）。该 Token 仅显示一次，立即复制并保存到安全位置，关闭页面后无法找回。\r
\r
5. **Token 管理**：若 Token 泄露、过期，回到「Personal access tokens」页面，找到对应 Token，点击「Revoke」（撤销）即可失效，重新生成新 Token 替换即可。\r
\r
### 3. GitCode Token 申请步骤\r
\r
1. **登录 GitCode 官网**：打开 \`https://gitcode.com\`，登录个人账号（本文以账号 \`quxiangshun\` 为例），GitCode 与 Gitee 操作逻辑相近，流程基本一致。\r
\r
2. **进入访问令牌页面**：点击页面右上角「个人头像」→ 下拉菜单选择「设置」→ 左侧菜单栏找到「访问令牌」，点击进入令牌管理页面。\r
\r
3. **生成新令牌**：点击页面「生成令牌」按钮，进入配置页面，按以下要求填写：\r
   - **令牌名称**：填写备注，如「ly-docs 仓库多平台同步专用」，便于区分。\r
   - **有效期**：按需选择，推荐「长期有效」（个人使用），或短期有效，到期重新申请。\r
   - **权限勾选**：仅勾选「仓库管理」相关权限（最小权限），具体勾选「仓库管理」分类下的所有选项，确保拥有仓库的读写权限，满足 Git 推送需求。\r
\r
4. **确认生成并保存**：配置完成后，点击「生成」按钮，会生成一串 Token（如本文提供的 jN********Zs）。该 Token 仅显示一次，立即复制并保存，关闭页面后无法再次查看。\r
\r
5. **Token 失效处理**：若 Token 泄露、失效，回到「访问令牌」页面，找到对应令牌，点击「删除」即可失效，重新按上述步骤生成新 Token 替换。\r
\r
### Token 通用注意事项\r
\r
1. **安全性第一**：Token 等价于账号密码，请勿公开分享（如截图、发给他人），避免账号被盗用；若不慎泄露，立即在对应平台撤销 Token 并重新生成。\r
\r
2. **最小权限原则**：申请时仅勾选 Git 推送所需权限（如 repo 权限），无需勾选无关权限（如账号管理、支付相关），降低泄露风险。\r
\r
3. **定期更换**：即使设置为永不过期，也建议定期（如3个月）重新生成 Token，提升账号安全性。\r
\r
4. **用途区分**：若有多个项目，建议为每个项目生成单独的 Token，便于管理和撤销，避免一个 Token 泄露影响所有项目。\r
\r
## 总结\r
\r
通过本文介绍的方法，我们可以实现 Git 一键同步代码到 GitHub、Gitee、GitCode 等多个代码托管平台，大大提高了开发效率。具体步骤如下：\r
\r
1. 为本地仓库添加多个远程仓库地址\r
2. 创建同步脚本，用于批量推送代码\r
3. 执行脚本，实现一键同步\r
\r
此外，我们还介绍了一些高级配置和最佳实践，帮助你更好地管理多平台代码同步。希望本文对你有所帮助！\r
\r
## 相关链接\r
\r
- [Git 官方文档](https://git-scm.com/doc)\r
- [GitHub 帮助文档](https://docs.github.com/en)\r
- [Gitee 帮助文档](https://gitee.com/help)\r
- [GitCode 帮助文档](https://gitcode.net/help)`;export{n as default};
