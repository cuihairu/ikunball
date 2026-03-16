# 图片生成工具建议

## 目标

围绕“篮球 + 小鸡 + ikun 梗图感”快速产出：

- 角色立绘
- 表情变化
- 皮肤概念图
- 宣传图
- 商店或活动图标

## 推荐组合

### 1. ChatGPT Images

适合：

- 快速探索角色方向
- 让同一只小鸡做多个动作和情绪版本
- 先出草图，再筛风格

### 2. Midjourney

适合：

- 做更强风格化的视觉概念图
- 做宣发海报和封面图

### 3. Stable Diffusion

适合：

- 需要本地可控生成
- 需要批量调参
- 需要后期做固定角色资产

## 实际工作流

1. 先确定一只主角小鸡的标准外观。
2. 基于同一角色扩展动作、表情、服装、篮球姿势。
3. 把 AI 图作为概念稿，不直接全部丢进游戏。
4. 用脚本统一裁切、压缩、改尺寸，再进入游戏项目。

## 提示词方向

建议固定几个关键词，减少风格漂移：

- yellow chick
- basketball
- meme face
- sporty
- cute but chaotic
- bold outline
- simple mobile game style

## tools/art 后续建议

后续可以在 `tools/art` 里补这些内容：

- `prompts/`：不同角色和场景的提示词模板
- `raw/`：原始生成图
- `exports/`：裁切后的游戏资源
- `scripts/`：压缩、重命名、批量改尺寸脚本

## 当前提示词模板

- `tools/art/prompts/character-base.md`
- `tools/art/prompts/character-emotes.md`
- `tools/art/prompts/character-actions.md`
- `tools/art/prompts/backgrounds.md`
- `tools/art/prompts/promo-images.md`
- `tools/art/prompts/ui-icons.md`
- `tools/art/prompts/variables.md`
- `tools/art/prompts/character-template.md`
- `tools/art/prompts/background-template.md`
- `tools/art/prompts/batch-plan.md`

## 当前整理工具

- `tools/art/exports/manifest.sample.json`
- `tools/art/scripts/rename-from-manifest.ps1`

## 配套文档

- 占位资源清单见 `docs/placeholder-assets-checklist.md`
- 资源命名规范见 `docs/asset-naming-conventions.md`
- AI 资源导入规则见 `docs/ai-asset-import-rules.md`
