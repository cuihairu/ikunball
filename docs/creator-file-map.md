# Creator 文件落位图

## 目标

明确当前仓库里的文件在正式 `Cocos Creator` 工程里应该放到哪里，避免复制时路径混乱。

## 推荐目标目录

```text
assets/
  scenes/
  prefabs/
    gameplay/
    ui/
  textures/
    characters/
    emoji/
    ui/
    backgrounds/
  audio/
    bgm/
    sfx/
  materials/
  particles/
  configs/
  bundle/
    common/
    gameplay/
    ui/
  scripts/
    core/
    gameplay/
    platform/
    ui/
    cocos/
```

## 当前文件怎么放

### 组件壳

从：

- `apps/game/creator-templates/*.ts`

复制到：

- `assets/scripts/cocos/`

### 业务模板层

从：

- `apps/game/assets/scripts/core/*`
- `apps/game/assets/scripts/gameplay/*`
- `apps/game/assets/scripts/platform/*`
- `apps/game/assets/scripts/ui/*`
- `apps/game/assets/scripts/cocos/*`

复制到：

- `assets/scripts/core/`
- `assets/scripts/gameplay/`
- `assets/scripts/platform/`
- `assets/scripts/ui/`
- `assets/scripts/cocos/`

### 配置

从：

- `packages/game-config/configs/gameplay.v1.json`

可以先复制到：

- `assets/configs/gameplay.v1.json`

后续再决定是否保留一份本地默认值。

### 纹理

建议落位：

- 角色贴图 -> `assets/textures/characters/`
- 表情贴图 -> `assets/textures/emoji/`
- UI 图标和按钮 -> `assets/textures/ui/`
- 背景图 -> `assets/textures/backgrounds/`

### 预制体

建议落位：

- 篮球、篮筐、命中特效 -> `assets/prefabs/gameplay/`
- 通用弹窗、排行榜项 -> `assets/prefabs/ui/`

### 音频

建议落位：

- 背景音乐 -> `assets/audio/bgm/`
- 命中、连击、失败音效 -> `assets/audio/sfx/`

## 第一轮复制建议

如果你只想先跑空壳，不要一次性全复制。

第一轮建议只放：

1. `creator-templates/*.ts`
2. `assets/scripts/gameplay/shot-input.ts`
3. `assets/scripts/gameplay/shot-feedback.ts`
4. `assets/configs/gameplay.v1.json`

跑通后再逐步补其他模板层。
