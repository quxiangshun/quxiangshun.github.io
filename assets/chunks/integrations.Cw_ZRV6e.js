const n=`# LyEdu 集成指南

> 编辑日期：2024-10-14



## 登录集成

LyEdu 支持多种登录方式，包括用户名密码登录和第三方登录（如 Feishu 登录）。以下是详细的集成指南：

### 1. 用户名密码登录

#### 1.1 基本原理

用户名密码登录是 LyEdu 的默认登录方式，基于 JWT (JSON Web Token) 实现身份认证。具体流程如下：

1. 用户输入用户名和密码
2. 系统验证用户凭证
3. 验证通过后，生成 JWT token
4. 将 token 返回给前端
5. 前端将 token 存储在本地（如 localStorage）
6. 后续请求携带 token 进行身份验证

#### 1.2 前端实现

\`\`\`javascript
// 登录请求
async function login(username, password) {
  const response = await axios.post('/api/auth/login', {
    username,
    password
  });
  
  if (response.data.success) {
    // 存储 token
    localStorage.setItem('token', response.data.token);
    // 设置 axios 默认携带 token
    axios.defaults.headers.common['Authorization'] = \`Bearer \${response.data.token}\`;
    return true;
  }
  return false;
}

// 登出
function logout() {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
}
\`\`\`

#### 1.3 后端实现

LyEdu 使用 Spring Boot Security 和 JWT 实现身份认证，核心代码如下：

\`\`\`java
// 登录接口
@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginRequest request) {
    // 验证用户
    UserDetails userDetails = userDetailsService.loadUserByUsername(request.getUsername());
    if (!passwordEncoder.matches(request.getPassword(), userDetails.getPassword())) {
        return ResponseEntity.badRequest().body(new ErrorResponse("用户名或密码错误"));
    }
    
    // 生成 token
    String token = jwtUtil.generateToken(userDetails.getUsername());
    return ResponseEntity.ok(new LoginResponse(token));
}

// JWT 过滤器
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        String token = extractToken(request);
        if (token != null && jwtUtil.validateToken(token)) {
            String username = jwtUtil.extractUsername(token);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        chain.doFilter(request, response);
    }
}
\`\`\`

### 2. Feishu 登录集成

#### 2.1 准备工作

1. 在 [Feishu 开发者平台](https://open.feishu.cn/) 创建应用
2. 获取 App ID 和 App Secret
3. 配置回调地址为 \`http://your-domain/api/auth/feishu/callback\`
4. 申请必要的权限，如 \`user_info\`、\`contact:user.employee_id.read\` 等

#### 2.2 集成配置

在 LyEdu 系统中配置 Feishu 集成：

1. 进入「系统管理」→「Feishu 集成」
2. 填写以下信息：
   - App ID：Feishu 应用的 App ID
   - App Secret：Feishu 应用的 App Secret
   - 回调地址：\`http://your-domain/api/auth/feishu/callback\`
   - 授权范围：根据需要选择
3. 保存配置并启用集成

#### 2.3 前端实现

\`\`\`javascript
// 跳转到 Feishu 登录页面
function feishuLogin() {
  window.location.href = '/api/auth/feishu/login';
}

// 登录成功后的回调处理
// 前端需要监听 URL 中的 token 参数，获取后存储
\`\`\`

#### 2.4 后端实现

LyEdu 后端提供了完整的 Feishu 登录流程，核心代码如下：

\`\`\`java
// Feishu 登录入口
@GetMapping("/feishu/login")
public void feishuLogin(HttpServletResponse response) throws IOException {
    String redirectUri = "http://your-domain/api/auth/feishu/callback";
    String state = UUID.randomUUID().toString();
    // 存储 state 用于后续验证
    redisTemplate.opsForValue().set("feishu_state:" + state, state, 5, TimeUnit.MINUTES);
    
    String authUrl = String.format(
        "https://open.feishu.cn/open-apis/authen/v1/index?app_id=%s&redirect_uri=%s&state=%s",
        feishuConfig.getAppId(),
        URLEncoder.encode(redirectUri, StandardCharsets.UTF_8),
        state
    );
    
    response.sendRedirect(authUrl);
}

// Feishu 回调处理
@GetMapping("/feishu/callback")
public ResponseEntity<?> feishuCallback(@RequestParam String code, @RequestParam String state) {
    // 验证 state
    if (!redisTemplate.hasKey("feishu_state:" + state)) {
        return ResponseEntity.badRequest().body(new ErrorResponse("无效的请求"));
    }
    
    // 通过 code 获取 access_token
    FeishuTokenResponse tokenResponse = feishuApiService.getAccessToken(code);
    
    // 获取用户信息
    FeishuUserInfo userInfo = feishuApiService.getUserInfo(tokenResponse.getAccessToken());
    
    // 查找或创建用户
    User user = userService.findOrCreateByFeishuOpenId(userInfo.getOpenId(), userInfo);
    
    // 生成 JWT token
    String jwtToken = jwtUtil.generateToken(user.getUsername());
    
    // 重定向到前端，携带 token
    return ResponseEntity.ok(new LoginResponse(jwtToken));
}
\`\`\`

## Feishu 同步

LyEdu 支持与 Feishu 进行数据同步，包括用户同步、部门同步等。以下是详细的同步指南：

### 1. 用户同步

#### 1.1 同步原理

用户同步是将 Feishu 通讯录中的用户信息同步到 LyEdu 系统中，具体流程如下：

1. 通过 Feishu Open API 获取通讯录中的用户列表
2. 对每个用户，在 LyEdu 系统中查找是否存在
3. 如果不存在，创建新用户；如果存在，更新用户信息
4. 同步完成后，生成同步报告

#### 1.2 同步配置

1. 进入「系统管理」→「Feishu 集成」→「同步配置」
2. 启用用户同步
3. 设置同步频率（如每天、每周）
4. 配置同步范围（如全公司、特定部门）
5. 保存配置

#### 1.3 手动同步

除了自动同步外，LyEdu 还支持手动触发同步：

1. 进入「系统管理」→「Feishu 集成」→「手动同步」
2. 选择同步类型（如用户同步、部门同步）
3. 点击「开始同步」按钮
4. 查看同步进度和结果

#### 1.4 后端实现

\`\`\`java
// Feishu 用户同步服务
@Service
public class FeishuSyncService {
    @Autowired
    private FeishuApiService feishuApiService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private DepartmentService departmentService;
    
    // 同步用户
    public SyncResult syncUsers() {
        SyncResult result = new SyncResult();
        List<FeishuUser> feishuUsers = feishuApiService.getAllUsers();
        
        for (FeishuUser feishuUser : feishuUsers) {
            try {
                // 查找或创建用户
                User user = userService.findOrCreateByFeishuUserId(feishuUser.getUserId(), feishuUser);
                // 同步部门信息
                syncUserDepartment(user, feishuUser.getDepartmentIds());
                result.incrementSuccess();
            } catch (Exception e) {
                result.incrementFailure();
                result.addError(feishuUser.getUserId() + ": " + e.getMessage());
            }
        }
        
        return result;
    }
    
    // 同步用户部门
    private void syncUserDepartment(User user, List<String> departmentIds) {
        for (String departmentId : departmentIds) {
            // 查找或创建部门
            Department department = departmentService.findOrCreateByFeishuDepartmentId(departmentId);
            // 关联用户和部门
            userService.addUserToDepartment(user.getId(), department.getId());
        }
    }
}
\`\`\`

### 2. 部门同步

#### 2.1 同步原理

部门同步是将 Feishu 通讯录中的部门结构同步到 LyEdu 系统中，具体流程如下：

1. 通过 Feishu Open API 获取通讯录中的部门列表
2. 对每个部门，在 LyEdu 系统中查找是否存在
3. 如果不存在，创建新部门；如果存在，更新部门信息
4. 建立部门间的层级关系
5. 同步完成后，生成同步报告

#### 2.2 同步配置

1. 进入「系统管理」→「Feishu 集成」→「同步配置」
2. 启用部门同步
3. 设置同步频率（如每天、每周）
4. 保存配置

#### 2.3 后端实现

\`\`\`java
// 同步部门
public SyncResult syncDepartments() {
    SyncResult result = new SyncResult();
    List<FeishuDepartment> feishuDepartments = feishuApiService.getAllDepartments();
    
    for (FeishuDepartment feishuDepartment : feishuDepartments) {
        try {
            // 查找或创建部门
            Department department = departmentService.findOrCreateByFeishuDepartmentId(feishuDepartment.getDepartmentId(), feishuDepartment);
            // 同步父部门
            if (feishuDepartment.getParentId() != null) {
                Department parentDepartment = departmentService.findOrCreateByFeishuDepartmentId(feishuDepartment.getParentId());
                department.setParentId(parentDepartment.getId());
                departmentService.update(department);
            }
            result.incrementSuccess();
        } catch (Exception e) {
            result.incrementFailure();
            result.addError(feishuDepartment.getDepartmentId() + ": " + e.getMessage());
        }
    }
    
    return result;
}
\`\`\`

## 其他集成

### 1. 文件存储集成

LyEdu 支持与多种文件存储服务集成，包括：

- **本地存储**：存储在服务器本地磁盘
- **对象存储**：如 OSS、S3 等
- **Feishu 云文档**：存储在 Feishu 云文档中

#### 1.1 配置方式

1. 进入「系统管理」→「文件存储」
2. 选择存储类型
3. 填写相应的配置参数
4. 保存配置

### 2. 消息通知集成

LyEdu 支持与多种消息通知服务集成，包括：

- **系统内通知**：通过系统内消息中心发送通知
- **邮件通知**：通过邮件发送通知
- **Feishu 消息**：通过 Feishu 发送消息通知

#### 2.1 配置方式

1. 进入「系统管理」→「消息通知」
2. 启用相应的通知方式
3. 填写配置参数
4. 保存配置

### 3. API 集成

LyEdu 提供了完整的 RESTful API，支持与其他系统集成。具体文档请参考 [API 文档](https://quxiangshun.github.io/ly-docs/lyedu/api-docs.html)。

#### 3.1 API 认证

LyEdu API 使用 JWT 进行认证，调用前需要获取 token：

\`\`\`bash
# 获取 token
curl -X POST http://your-domain/api/auth/login \\
  -H "Content-Type: application/json" \\
  -d '{"username": "admin", "password": "123456"}'

# 使用 token 调用 API
curl -X GET http://your-domain/api/courses \\
  -H "Authorization: Bearer your-token"
\`\`\`

## 集成最佳实践

### 1. 安全性

- **保护敏感信息**：App ID、App Secret 等敏感信息应存储在环境变量或配置中心，避免硬编码
- **使用 HTTPS**：所有通信应使用 HTTPS 加密
- **定期更新密钥**：定期更新 JWT 密钥和 Feishu 应用密钥
- **权限控制**：严格控制 API 访问权限，避免越权操作

### 2. 性能优化

- **缓存策略**：对频繁访问的数据使用缓存，如 Feishu 访问令牌
- **批量操作**：使用批量 API 减少请求次数
- **异步处理**：对耗时操作（如同步）使用异步处理
- **限流措施**：对外部 API 调用实施限流，避免触发平台限制

### 3. 可靠性

- **错误处理**：完善的错误处理机制，确保集成过程中的错误能够被及时捕获和处理
- **重试机制**：对网络请求等不稳定操作实施重试机制
- **日志记录**：详细的日志记录，便于问题排查
- **监控告警**：对集成状态进行监控，及时发现和处理异常

## 常见问题

### 1. Feishu 集成失败

**可能原因**：
- App ID 或 App Secret 错误
- 回调地址配置错误
- 权限不足
- 网络连接问题

**解决方案**：
- 检查 Feishu 应用配置
- 确保回调地址与 Feishu 应用中设置的一致
- 申请必要的权限
- 检查网络连接

### 2. 同步数据不完整

**可能原因**：
- Feishu API 限制
- 同步配置错误
- 网络中断

**解决方案**：
- 检查 Feishu API 调用频率限制
- 调整同步配置，如减小同步范围
- 重新触发同步

### 3. API 调用失败

**可能原因**：
- token 过期
- 权限不足
- 请求参数错误
- 服务器错误

**解决方案**：
- 重新获取 token
- 检查用户权限
- 验证请求参数
- 查看服务器日志

## 总结

LyEdu 提供了丰富的集成能力，支持与 Feishu 等第三方系统进行深度集成。通过本文档的指导，您可以快速实现各种集成场景，提升系统的可用性和用户体验。

如果在集成过程中遇到问题，请参考 [技术支持](https://quxiangshun.github.io/ly-docs/lyedu/quick-start.html#技术支持) 部分获取帮助。`;export{n as default};
