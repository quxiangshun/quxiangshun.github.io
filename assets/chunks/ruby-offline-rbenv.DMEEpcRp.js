const n=`# 离线 Ubuntu 环境下使用 rbenv 安装 Ruby 版本（2023 年 10 月 1 日）

> 编辑日期：2026-03-15

## 离线环境 Ubuntu 多版本 Ruby 安装文档（rbenv 方式）

## 一、环境说明

- 系统：Ubuntu 22.04 x86_64（离线/内网环境）

- 工具：rbenv + ruby-build

- 安装版本：Ruby 3.2.11（可扩展多版本）

- 用户：root

---

## 二、前置准备（有网机器下载）

1. **rbenv**

    - 下载：[https://github.com/rbenv/rbenv/archive/refs/heads/master.zip](https://github.com/rbenv/rbenv/archive/refs/heads/master.zip)

2. **ruby-build**

    - 下载：[https://github.com/rbenv/ruby-build/archive/refs/heads/master.zip](https://github.com/rbenv/ruby-build/archive/refs/heads/master.zip)

3. **Ruby 源码包**

    - 下载：[https://cache.ruby-lang.org/pub/ruby/3.2/ruby-3.2.11.tar.gz](https://cache.ruby-lang.org/pub/ruby/3.2/ruby-3.2.11.tar.gz)

4. **系统编译依赖包（.deb）**

    - libffi-dev

    - libreadline-dev

    - libyaml-dev

    - libssl-dev

    - zlib1g-dev

    - gcc make

将以上所有文件统一放入 \`pkg\` 目录，拷贝至离线机器 \`/root/pkg\`。

---

## 三、离线机器部署步骤

### 3.1 安装系统依赖

\`\`\`bash
cd /root/pkg
dpkg -i *.deb
# 或在线临时安装（如有网）
apt install -y gcc make libffi-dev libreadline-dev libyaml-dev libssl-dev zlib1g-dev
\`\`\`

### 3.2 安装 rbenv

\`\`\`bash
# 解压 rbenv 到正确目录
unzip rbenv-master.zip
mv rbenv-master ~/.rbenv

# 安装 ruby-build 插件
mkdir -p ~/.rbenv/plugins
unzip ruby-build-master.zip
mv ruby-build-master ~/.rbenv/plugins/ruby-build
\`\`\`

### 3.3 配置环境变量

\`\`\`bash
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(rbenv init -)"' >> ~/.bashrc
source ~/.bashrc
\`\`\`

### 3.4 验证 rbenv

\`\`\`bash
rbenv --version
\`\`\`

---

## 四、离线安装 Ruby

### 4.1 放置 Ruby 源码到缓存目录

\`\`\`bash
mkdir -p ~/.rbenv/cache
mv /root/pkg/ruby-3.2.11.tar.gz ~/.rbenv/cache/
\`\`\`

### 4.2 安装指定 Ruby 版本

\`\`\`bash
rbenv install 3.2.11
\`\`\`

### 4.3 设置全局默认版本

\`\`\`bash
rbenv global 3.2.11
rbenv rehash
\`\`\`

### 4.4 验证安装

\`\`\`bash
ruby -v
gem -v
\`\`\`

---

## 五、多版本 Ruby 管理常用命令

- 查看已安装版本

    \`\`\`bash
    rbenv versions
    \`\`\`

- 安装其他版本（提前放入 cache）

    \`\`\`bash
    rbenv install 3.1.0
    \`\`\`

- 切换全局版本

    \`\`\`bash
    rbenv global 3.1.0
    \`\`\`

- 目录单独指定版本

    \`\`\`bash
    cd /project
    rbenv local 3.2.11
    \`\`\`

- 卸载版本

    \`\`\`bash
    rbenv uninstall 3.1.0
    \`\`\`

---

## 六、常见编译错误及原因

|错误模块|缺失依赖|解决方法|
|---|---|---|
|fiddle|libffi-dev|安装 libffi-dev|
|psych|libyaml-dev|安装 libyaml-dev|
|readline|libreadline-dev|安装 libreadline-dev|
|openssl|libssl-dev|安装 libssl-dev|
|zlib|zlib1g-dev|安装 zlib1g-dev|

---

## 七、目录结构（安装完成后）

\`\`\`text
/root/.rbenv/
├── bin/              # rbenv 命令
├── cache/            # Ruby 源码缓存
│   └── ruby-3.2.11.tar.gz
├── plugins/
│   └── ruby-build/   # 编译插件
└── versions/         # 多版本 Ruby 安装目录
    └── 3.2.11/
\`\`\`
`;export{n as default};
