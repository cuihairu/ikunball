# backend

后端服务目录。

建议后续放这些模块：

- `src/modules/rank` 排行榜
- `src/modules/config` 活动和数值配置下发
- `src/modules/player` 玩家基础数据
- `src/modules/ad` 广告相关开关和实验配置

第一版只需要最小接口，不要把后台做重。

## 当前接口

- `GET /health`
- `GET /config/game`
- `GET /leaderboard`
- `POST /leaderboard/submit`

## 当前实现

- `cmd/server/main.go`：服务启动入口
- `internal/server/server.go`：路由和接口实现
- `internal/config/gameplay.go`：读取共享玩法配置
- `internal/storage/sqlite.go`：SQLite 数据库初始化
- `internal/leaderboard/store.go`：Gorm 排行榜存储

当前默认使用 `Gin + Gorm + SQLite`，数据库文件默认落在 `apps/backend/data/app.db`。

## 运行方式

- 开发运行：`go run ./cmd/server`
- 构建：`go build ./...`
- 测试接口后端默认监听 `3000`
- 可通过 `DATABASE_PATH` 覆盖默认 SQLite 路径
