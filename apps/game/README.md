# game

这里放 `Cocos Creator` 游戏主工程。

建议后续目录：

```text
assets/
  audio/
  bundle/
  configs/
  prefabs/
  scenes/
  scripts/
  textures/
```

游戏主循环建议先做：

- 进入游戏
- 控制投篮
- 命中反馈
- 连击反馈
- 失败结算
- 广告复活

## 推荐场景

- `Boot.scene`
- `Home.scene`
- `Gameplay.scene`
- `Result.scene`

## 推荐脚本分层

- `scripts/core`
- `scripts/gameplay`
- `scripts/platform`
- `scripts/ui`
- `scripts/utils`

详细规划见 `docs/cocos-project-plan.md`。

## 当前代码骨架

- `src/bootstrap.ts`：游戏服务装配入口
- `src/services/game-client.ts`：游戏侧高层调用封装
- `src/services/http-game-api.ts`：后端接口客户端
- `src/services/local-fallback-game-api.ts`：离线降级实现
- `src/platform/game-platform.ts`：平台能力封装入口

后续接入 Cocos 时，可以把这些纯 TypeScript 模块迁到 `assets/scripts`，或者作为独立包继续引用。

## 当前接入方式

- 在线模式：连接 `http://127.0.0.1:3000`
- 离线模式：使用本地默认配置和本地排行榜降级

可以先用 `pnpm --dir apps/game demo` 做一次简单联调。
