# assets/scripts

这里是准备交给 `Cocos Creator` 管理的脚本目录。

当前建议分层：

- `core`：应用上下文、场景流、全局状态
- `gameplay`：对局逻辑、投篮输入、结果判定
- `platform`：平台桥接
- `ui`：页面控制器
- `cocos`：接近 `Component` 的场景模板

如果你已经在 Creator 里建好了正式项目：

1. 先把 `creator-templates` 里的组件壳复制进来。
2. 再把这里的业务模板层逐步接入。
