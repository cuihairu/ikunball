# Cocos 组件映射说明

## 目标

把当前 `apps/game/assets/scripts` 下的模板快速迁入 `Cocos Creator`，减少你正式建场景时的空转。

## 当前分层

- `assets/scripts/core`：应用上下文、场景流、全局状态
- `assets/scripts/gameplay`：对局状态机和玩法逻辑
- `assets/scripts/ui`：页面控制器
- `assets/scripts/cocos`：接近 `Component` 的组件模板

## 推荐迁移方式

### 1. 先建四个场景

- `Boot`
- `Home`
- `Gameplay`
- `Result`

### 2. 每个场景挂一个主组件

可以分别参考：

- `assets/scripts/cocos/boot-scene.ts`
- `assets/scripts/cocos/home-scene.ts`
- `assets/scripts/cocos/gameplay-scene.ts`
- `assets/scripts/cocos/result-scene.ts`

### 3. 把占位节点接口替换成真实 Cocos 节点

当前模板使用的是这些抽象接口：

- `TextLikeNode`
- `ButtonLikeNode`
- `ToggleLikeNode`
- `ProgressLikeNode`
- `SceneNavigator`
- `SchedulerLike`

正式接入时，把它们换成：

- `Label`
- `Button`
- `Node`
- `ProgressBar`
- `director.loadScene`
- `schedule/update`

## 推荐对应关系

### BootScene

- 文本节点：加载状态
- 生命周期：`onLoad`
- 动作：预加载配置后跳转首页

### HomeScene

- 文本节点：最高分、排行榜前三
- 按钮：开始游戏
- 动作：读取排行榜、点击开始进入对局

### GameplayScene

- 文本节点：分数、连击、倒计时
- 进度节点：力度条或连击条
- 按钮：复活按钮
- 生命周期：`onLoad` / `start` / `onDestroy`
- 动作：处理命中、未命中、倒计时、广告复活

### ResultScene

- 文本节点：本局得分、最高分
- 显隐节点：是否已复活标记
- 按钮：提交分数、返回首页

## 接入原则

- 场景组件只处理节点绑定、生命周期、播放动画
- 业务逻辑尽量继续放在 `core/gameplay/ui` 这些模板层
- 平台调用和接口请求继续走 `src` 里的服务层

## 下一步建议

1. 先用 Cocos Creator 初始化工程。
2. 把这些模板文件复制到 Creator 管理的 `assets/scripts`。
3. 先打通 `Boot -> Home -> Gameplay -> Result` 的空场景流转。
4. 再逐步接上真实的 Label、Button、ProgressBar、AudioSource。
