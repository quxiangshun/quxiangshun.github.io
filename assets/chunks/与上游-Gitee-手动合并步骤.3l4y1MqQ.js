const n=`---
outline: deep
description: 将 Gitee quxiangshun/new-api 的 main 合并到功能分支，含 unrelated histories 与 -X theirs
---

# 与上游 Gitee（quxiangshun/new-api）手动合并步骤

## 文档地图（usage_log 相关）

| 文档 | 读它当你需要… |
|------|----------------|
| **[日志插件.md](./日志插件.md)** | 业务：\`usage_log\` 做什么、环境变量、附件与 API。 |
| **[插件开发.md](./插件开发.md)** | 机制：\`ext\` 包、目录、开发步骤与表初始化。 |
| **[usage_log与上游合并-源码入侵.md](./usage_log与上游合并-源码入侵.md)** | 合并后恢复：\`main.go\` / \`relay-router\` / \`middleware\` / 前端 / i18n。 |
| **本文** | **Git**：\`unrelated histories\`、\`stash\`、\`-X theirs\`、自检命令。 |

**合并完整链路：** \`git merge\`（本文）→ 按 **[源码侵入](./usage_log与上游合并-源码入侵.md)** 恢复侵入点 → \`go build\` 与功能回归。

---

本文说明如何将 **\`https://gitee.com/quxiangshun/new-api\`** 的默认分支（一般为 **\`main\`**）合并到本仓库的**功能分支**，在**与上游无共同祖先**（\`unrelated histories\`）时仍可操作。

- 本文只写 **Git 命令与注意事项**，不写业务逻辑。

---

## 1. 前置条件

### 1.1 远程 \`upstream\`

若尚未添加，执行（URL 按上游实际为准）：

\`\`\`bash
git remote add upstream https://gitee.com/quxiangshun/new-api.git
\`\`\`

已存在则跳过；可用 \`git remote -v\` 核对。

### 1.2 当前分支

切换到要更新的功能分支，例如：

\`\`\`bash
git checkout feature/enhance_log
\`\`\`

### 1.3 取回上游最新引用

\`\`\`bash
git fetch upstream
\`\`\`

---

## 2. 为何会出现「拒绝合并不相关历史」

若本仓库（例如内网 \`origin\`）与 Gitee 上游**从未共享过同一套初始提交**，则：

\`\`\`bash
git merge upstream/main
\`\`\`

可能报错：

\`\`\`text
fatal: refusing to merge unrelated histories
\`\`\`

此时必须使用 **\`--allow-unrelated-histories\`** 才允许合并。合并后本地分支会多出**一整段上游历史**，\`git log\` /「领先远程若干提交」的数字会变大，**属正常现象**。

---

## 3. 推荐流程概览

1. **暂存**未提交的本机改动（避免与合并混在一起）。
2. 使用 **\`--allow-unrelated-histories\`** 合并 \`upstream/main\`。
3. 若出现**大量 add/add 冲突**，可**中止**后改用 **\`-X theirs\`**（冲突时优先**上游**版本），再合并一次。
4. **恢复**暂存；若 \`go.sum\` 等冲突，用 **\`go mod tidy\`** 等方式处理。
5. **自检**是否已包含上游最新 \`main\`（见第 6 节）。
6. 若不需要提交「依赖/构建配置」类的本机差异，可将相关文件**恢复为当前分支 HEAD**（见第 5 节）。

---

## 4. 逐步命令

### 4.1 暂存本机未提交修改（含未跟踪文件可选）

\`\`\`bash
git stash push -u -m "wip: before merge upstream/main"
\`\`\`

不需要保留工作区改动时可跳过；**合并前工作区尽量干净**，冲突更少。

### 4.2 首次尝试（可选）

\`\`\`bash
git merge upstream/main --allow-unrelated-histories
\`\`\`

- 若**成功**：跳到 [4.4](#44-恢复暂存并处理-go-依赖)。

- 若出现**极多冲突**且你希望冲突时**以 Gitee 为准**（与本项目此前做法一致）：

\`\`\`bash
git merge --abort
git merge upstream/main --allow-unrelated-histories -X theirs \\
  -m "Merge upstream/main (gitee quxiangshun/new-api), prefer upstream on conflicts"
\`\`\`

说明：

- **\`-X theirs\`**：在冲突块中优先采用**被合并进来的分支**（此处即 **\`upstream/main\`**）的版本。
- 你本分支上**与上游同文件、同位置的定制**可能被覆盖；合并后需按业务做一次回归，必要时从旧提交 **cherry-pick** 或按《源码侵入》文档**补回**侵入代码。

### 4.3 若未使用 \`-X theirs\` 且需手动解决冲突

在编辑器或 \`git mergetool\` 中解决后：

\`\`\`bash
git add -A
git commit   # 完成合并提交（若合并未自动完成）
\`\`\`

### 4.4 恢复暂存并处理 Go 依赖

\`\`\`bash
git stash pop
\`\`\`

- 若 **\`go.sum\` 报冲突**：在仓库根目录执行：

\`\`\`bash
go mod tidy
git add go.mod go.sum
\`\`\`

其他文件按冲突提示解决后 \`git add\`。

- 若 **\`stash pop\` 失败**且暂存仍在，可稍后解决冲突后再 **\`git stash drop\`**（确认内容已不需要时）。

### 4.5 合并完成后的提交

若上述步骤产生了新的暂存修改（例如仅 \`go.mod\` / \`go.sum\` 整理），按需提交：

\`\`\`bash
git status
git commit -m "chore: merge upstream 后整理依赖"
\`\`\`

---

## 5. 不提交「本机对依赖/构建配置的临时改动」

若你希望**工作区与当前提交一致**（例如 \`go.mod\`、\`go.sum\`、\`web/package.json\`、\`web/bun.lock\`、\`web/vite.config.js\` 等**以上游合并结果为准**，不额外提交本地差异），可在确认不需要这些未提交改动后执行：

\`\`\`bash
git restore --staged go.mod go.sum web/bun.lock web/package.json web/vite.config.js 2>/dev/null || true
git restore go.mod go.sum web/bun.lock web/package.json web/vite.config.js 2>/dev/null || true
\`\`\`

未跟踪的本地文件（如 \`web/bunfig.toml\`、Vite 生成的 \`web/vite.config.js.timestamp-*.mjs\`）若不需要纳入版本库，可删除：

\`\`\`bash
rm -f web/bunfig.toml web/vite.config.js.timestamp-*.mjs
\`\`\`

再执行 \`git status\` 确认工作区干净或仅剩你**有意保留**的修改。

---

## 6. 自检：功能分支是否已包含上游当前 \`main\`

每次合并前建议先 **\`git fetch upstream\`**，再检查：

\`\`\`bash
# 上游 main 是否已全部进入当前分支（为「是」则未落后上游）
git merge-base --is-ancestor upstream/main HEAD && echo "已包含 upstream/main"

# 上游比当前分支「多出来」的提交数，应为 0
git rev-list --count HEAD..upstream/main
\`\`\`

第二行输出为 **\`0\`** 表示：**在已 fetch 的前提下**，当前 \`HEAD\` 已包含 **\`upstream/main\` 指向的最新提交**，与 Gitee 默认分支**同步**（你仍可能多出大量**本仓库自有**提交，这是正常的）。

---

## 7. 常见问题

| 现象 | 说明 |
|------|------|
| \`ahead of origin by 数千 commits\` | 无关历史合并后，图里会同时存在两套祖先，数字会很大；只要第 6 节检查通过，**不代表**未同步上游。 |
| \`-X theirs\` 后某功能坏了 | 冲突处采用了上游文件，**本分支定制被覆盖**；对照《源码侵入》文档或历史提交补回。 |
| 希望优先保留本分支 | 勿用 \`-X theirs\`，改为手动解决冲突时选 **ours**；或合并后从旧提交恢复文件。 |

---

## 8. 一键复制版（与上文 4.2 中「中止后带策略再合并」一致）

\`\`\`bash
git fetch upstream
git checkout feature/enhance_log   # 换成你的分支名
git stash push -u -m "wip: before merge upstream/main"

git merge upstream/main --allow-unrelated-histories -X theirs \\
  -m "Merge upstream/main (gitee quxiangshun/new-api), prefer upstream on conflicts"

git stash pop
# 若 go.sum 冲突：
go mod tidy && git add go.mod go.sum

git merge-base --is-ancestor upstream/main HEAD && git rev-list --count HEAD..upstream/main
\`\`\`

按团队规范修改合并说明 \`-m\` 文案即可。
`;export{n as default};
