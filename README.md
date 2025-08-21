# 乒乓球管理系统

一个基于 Next.js 的乒乓球运动员和比赛管理系统，使用 shadcn/ui、Tailwind CSS 和 React Query 构建。

## 功能特性

### 🔐 用户认证
- 登录系统
- 用户角色管理
- 会话管理

### 👥 运动员管理
- 运动员信息增删改查
- 基本信息管理（姓名、性别、年龄等）
- 排名和积分管理
- 打法信息记录

### 🏆 比赛管理
- 比赛信息增删改查
- 比赛结果记录
- 分页和筛选功能
- 比赛时间管理

### 📊 数据统计
- 运动员总数统计
- 比赛总数统计
- 胜率计算
- 本月比赛统计

## 技术栈

- **前端框架**: Next.js 15
- **UI 组件库**: shadcn/ui
- **样式**: Tailwind CSS
- **状态管理**: React Query (TanStack Query)
- **类型安全**: TypeScript
- **图标**: Lucide React

## 快速开始

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 测试账号

系统提供了两个测试账号：

1. **管理员账号**
   - 用户名: `admin`
   - 密码: `123456`

2. **普通用户账号**
   - 用户名: `user`
   - 密码: `123456`

## 项目结构

```
pingpang-admin/
├── app/                    # Next.js App Router
│   ├── login/             # 登录页面
│   ├── players/           # 运动员管理页面
│   ├── competitions/      # 比赛管理页面
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 主页面
├── components/            # React 组件
│   ├── ui/               # shadcn/ui 组件
│   ├── layout/           # 布局组件
│   └── providers/        # 上下文提供者
├── hooks/                # 自定义 Hooks
├── lib/                  # 工具函数和 API
├── types/                # TypeScript 类型定义
└── public/               # 静态资源
```

## API 接口

### 认证相关
- `POST /user/login` - 用户登录

### 运动员相关
- `GET /player/all` - 获取运动员列表
- `POST /system/player/update` - 更新运动员信息
- `POST /system/player` - 查询运动员详情

### 比赛相关
- `POST /system/comp_info` - 获取比赛列表（支持分页和筛选）

## 主要功能页面

### 1. 登录页面 (`/login`)
- 用户认证
- 表单验证
- 错误提示

### 2. 主页面 (`/`)
- 数据统计概览
- 快速导航
- 最近比赛记录

### 3. 运动员管理 (`/players`)
- 运动员列表展示
- 添加新运动员
- 编辑运动员信息
- 删除运动员

### 4. 比赛管理 (`/competitions`)
- 比赛列表展示
- 高级筛选功能
- 分页导航
- 添加/编辑/删除比赛

## 开发说明

### Mock 数据
系统使用 Mock 数据模拟后端 API，数据存储在 `lib/mock-data.ts` 中。

### 状态管理
使用 React Query 进行服务器状态管理，提供缓存、同步和错误处理功能。

### 样式系统
基于 Tailwind CSS 和 shadcn/ui 组件库，提供一致的设计系统。

## 构建和部署

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 许可证

MIT License
