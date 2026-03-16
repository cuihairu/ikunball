# Cocos 游戏工程规划

## 目标

为 `apps/game` 提供一套清晰的 Cocos Creator 工程落地结构，保证第一版原型能快速推进，不把平台适配、玩法逻辑、UI 逻辑混在一起。

## 建议版本

- `Cocos Creator 3.8.x`

原因：

- 对小游戏平台支持成熟
- 资料相对多
- 3.x 的组件和资源组织方式更适合后续扩展

## 建议工程结构

下面是 `apps/game/assets` 里的推荐目录：

```text
assets/
  audio/
    bgm/
    sfx/
  bundle/
    common/
    gameplay/
    ui/
  configs/
  materials/
  particles/
  prefabs/
    gameplay/
    ui/
  scenes/
    Boot.scene
    Home.scene
    Gameplay.scene
    Result.scene
  scripts/
    core/
    gameplay/
    platform/
    ui/
    utils/
  textures/
    characters/
    emoji/
    ui/
    backgrounds/
```

## 场景职责

### `Boot.scene`

只做启动初始化：

- 加载基础配置
- 初始化平台能力
- 预加载首页资源
- 检查本地存档

不要把业务逻辑堆在这里。

### `Home.scene`

负责：

- 开始游戏入口
- 排行榜入口
- 当前角色展示
- 活动或公告位

### `Gameplay.scene`

这是主战斗场景，承载：

- 角色
- 篮球
- 篮筐
- 分数和连击 UI
- 倒计时
- 局内音效

### `Result.scene`

负责：

- 本局得分
- 最高分
- 是否复活
- 广告按钮
- 再来一局

## 脚本层次建议

### `scripts/core`

放全局基础能力：

- `GameManager`
- `EventBus`
- `AudioManager`
- `SceneFlow`
- `ConfigManager`

### `scripts/gameplay`

放对局逻辑：

- `PlayerController`
- `BallController`
- `ShootController`
- `HoopController`
- `ScoreSystem`
- `ComboSystem`
- `GameplayTimer`

### `scripts/ui`

放页面和组件：

- `HomeView`
- `GameplayHUD`
- `ResultView`
- `LeaderboardView`
- `PowerBar`

### `scripts/platform`

放小游戏平台相关封装接入层：

- `AdBridge`
- `StorageBridge`
- `LoginBridge`
- `ShareBridge`

这层尽量不要直接调用平台全局对象，统一从 `packages/platform-sdk` 走一层适配。

### `scripts/utils`

放纯工具：

- 时间格式化
- 数值映射
- 节流防抖
- 随机工具

## 第一版核心节点

`Gameplay.scene` 里建议至少有这些节点：

- `Canvas`
- `Background`
- `Player`
- `BallSpawn`
- `Ball`
- `Hoop`
- `ScoreRoot`
- `ComboRoot`
- `PowerBar`
- `TimerLabel`
- `PauseButton`
- `HitEffectRoot`

## 第一版组件关系

建议采用一个主控节点 + 多子系统的方式：

- `GameManager` 负责对局状态切换
- `ShootController` 负责输入和投篮触发
- `BallController` 负责球体运动与状态
- `ScoreSystem` 负责计分
- `ComboSystem` 负责连击和表情等级
- `GameplayHUD` 负责局内展示

不要把计分和动画逻辑都写进 `PlayerController`。

## 资源规范

### 纹理命名

- 角色：`chick_idle`, `chick_happy`, `chick_hyped`, `chick_broken`
- UI：`ui_btn_start`, `ui_panel_result`
- 背景：`bg_home`, `bg_gameplay`

### 预制体命名

- `pf_ball`
- `pf_hoop`
- `pf_hit_effect`
- `pf_score_popup`

### 音频命名

- `bgm_home`
- `bgm_gameplay`
- `sfx_hit`
- `sfx_combo`
- `sfx_fail`

## 分包建议

第一版先别过度拆包，但可以预留 bundle 思路：

- `common`：通用 UI、公共素材、基础脚本
- `gameplay`：对局核心资源
- `ui`：排行榜、结果页等资源

后面资源体积变大时再正式启用分包。

## 与配置包的关系

以下数据尽量不要硬编码：

- 局内时长
- 广告复活时长
- 基础得分
- 完美出手判定窗口
- 连击阈值
- 表情切换阈值

这些放到 `packages/game-config`，客户端启动后读取本地默认值，后续再支持后端覆盖。

## 第一阶段开发顺序

1. 建立 `Boot`、`Home`、`Gameplay`、`Result` 四个场景。
2. 完成 `Gameplay.scene` 的投篮、命中、分数和倒计时。
3. 加入小鸡表情切换。
4. 加入结算和广告复活占位按钮。
5. 最后再接平台广告和排行榜。
