# 商家预约系统（Merchant Booking）

这是一个为线下商家活动（如密室逃脱、剧本杀等）设计的在线预约平台，支持主题分类、时间段选择、用户报名。

## 技术栈

- 前端：React + TypeScript + Tailwind CSS + Vite
- 后端：FastAPI + PostgreSQL 
- 数据库：PostgreSQL

## 项目结构

merchantBooking/
│
├── backend/              # 后端（FastAPI）
│   └── app/
│       ├── api/          # 路由接口（如 event_theme.py, booking.py）
│       ├── models/       # 数据模型（SQLAlchemy）
│       ├── schemas/      # 请求 & 响应的数据结构（Pydantic）
│       ├── crud/         # 数据库操作逻辑（增删改查）
│       └── main.py       # FastAPI 启动入口
│
├── frontend/             # 前端（React + TypeScript）
│   └── src/
│       ├── pages/        # 页面组件（如 BookingPage.tsx, AdminPage.tsx，register,login）
│       ├── components/   # 可复用组件（如 SlotCard.tsx, ThemeCard.tsx）
│       └── App.tsx       # 应用入口和路由定义
│
└── README.md             # 项目说明文档（当前文件）

✨ 功能简介
用户端（前台）：
查看剧本列表（包含图片、评分、简介）

查看剧本详情和可预约时间段

在线预约并确认人数

查看预约结果


商家端（后台）：
登录后台管理页面

添加 / 编辑 / 删除剧本（包括图片、评分、简介）

管理预约时间段（添加 / 编辑 / 删除）

查看所有预约记录
## 后端使用说明（Python 3.9+）

### 1. 安装依赖

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 2. 创建数据库

确保已安装 PostgreSQL，然后执行：

```bash
createdb booking
```

### 3. 配置环境变量

在 backend 目录下创建 `.env` 文件，内容如下：

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/booking
```

请将 `yourpassword` 替换为你本地 PostgreSQL 的密码。

### 4. 初始化数据库表结构

```bash
alembic upgrade head
```

### 5. 启动 FastAPI 服务

```bash
uvicorn app.main:app --reload
```

访问接口文档：http://localhost:8000/docs

---

## 前端使用说明（Node.js 18+ 推荐）

### 1. 安装依赖

```bash
cd frontend
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

访问地址：http://localhost:5173

---

## 常见问题



## 接口说明（后端）

| 路径                   | 方法       | 说明            |
| -------------------- | -------- | ------------- |
| `/themes`            | `GET`    | 获取所有剧本        |
| `/themes/{theme_id}` | `GET`    | 获取指定剧本详情      |
| `/themes`            | `POST`   | 添加剧本（含图片、评分等） |
| `/themes/{theme_id}` | `PUT`    | 编辑指定剧本信息      |
| `/themes/{theme_id}` | `DELETE` | 删除指定剧本        |


| 路径                 | 方法       | 说明                         |
| ------------------ | -------- | -------------------------- |
| `/slots`           | `GET`    | 获取所有时间段                    |
| `/slots`           | `POST`   | 添加新的时间段                    |
| `/slots/{slot_id}` | `GET`    | 获取指定时间段信息                  |
| `/slots/{slot_id}` | `PUT`    | 更新指定时间段                    |
| `/slots/{slot_id}` | `DELETE` | 删除指定时间段                    |
| `/admin/slot`      | `GET`    | 获取管理端使用的 Slot 卡片数据（包含剧本信息） |

| 路径                              | 方法     | 说明                       |
| ------------------------------- | ------ | ------------------------ |
| `/slots/{slot_id}/participants` | `GET`  | 获取指定时间段的报名用户列表（尚未定义但可拓展） |
| `/participation`                | `POST` | 用户提交预约（报名）               |

| 路径          | 方法     | 说明            |
| ----------- | ------ | ------------- |
| `/login`    | `POST` | 用户登录，返回 token |
| `/register` | `POST` | 用户注册          |
| `/tokenget` | `GET`  | 获取当前用户信息（需登录） |
| `/users/`   | `POST` | 添加用户（通常为后台用途） |


## 环境要求

- Python ≥ 3.9
- Node.js ≥ 18
- PostgreSQL ≥ 13
- Git / npm / curl

---

## 协作建议

- `.env` 文件不要上传至 Git，请在本地自行创建
- 请创建gitignore，不然git会崩溃
- 请用 pip install 下载 requiremnt.txt
- 建议 Git clone 后，先跑通后端，再跑前端

---

## 联系

如有问题，请联系项目发起人。
