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
- `assets/scripts/core`：面向 Cocos 的应用上下文和场景流模板
- `assets/scripts/ui`：启动页、首页、对局页、结算页控制器模板
- `assets/scripts/gameplay`：对局会话和核心逻辑模板
- `assets/scripts/platform`：平台桥接模板
- `assets/scripts/cocos`：接近 Cocos Component 的场景组件模板

后续接入 Cocos 时，可以把这些纯 TypeScript 模块迁到 `assets/scripts`，或者作为独立包继续引用。

## Cocos 接入建议

- 先在 Creator 中创建 `Boot`、`Home`、`Gameplay`、`Result` 四个场景
- 再把 `assets/scripts/ui/*-scene-controller.ts` 作为场景脚本参考
- 组件层可直接参考 `assets/scripts/cocos/*.ts`
- 节点绑定和动画播放留在 Creator 组件里实现
- 配置拉取、排行榜提交、复活广告调用继续走 `src` 里的服务层

详细映射说明见 `docs/cocos-component-mapping.md`。

## 当前接入方式

- 在线模式：连接 `http://127.0.0.1:3000`
- 离线模式：使用本地默认配置和本地排行榜降级
- 可通过环境变量 `GAME_API_BASE_URL` 覆盖默认后端地址

可以先用 `pnpm --dir apps/game demo` 做一次简单联调。
- 后端启动后可用 `pnpm --dir apps/game demo:online` 跑一遍真实接口链路。
