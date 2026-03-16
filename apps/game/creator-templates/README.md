# creator-templates

这里放可直接复制进 `Cocos Creator` 工程的组件壳代码。

这些文件依赖 `cc` 模块，所以不参与当前 workspace 的 TypeScript 构建。

建议用法：

1. 在 Creator 中初始化正式工程。
2. 把对应模板复制到 Creator 管理的 `assets/scripts`。
3. 按文档把 `@property` 字段挂到场景节点上。
4. 再把仓库里 `assets/scripts` 和 `src` 的业务层接进去。

辅助文档：

- `docs/cocos-field-checklist.md`
- `docs/gameplay-node-binding.md`
- `docs/gameplay-feedback-hooks.md`
- `docs/home-result-hooks.md`
