---
title: 决策记录
weight: 70
---

> **设计讨论稿 · 尚未实现。**

| 编号 | 状态 | 内容 | 理由及影响 |
| --- | --- | --- | --- |
| DOC-001 | 本轮采用 | 设计文档置于独立 `docs/` Hugo 站点 | 先讨论内容，再开展业务实现 |
| DOC-002 | 本轮采用 | OINK v1.5.1、Hugo Extended 0.168.0、Go 1.27.3 | 跟随官方 starter 基线并固定依赖 |
| DOC-003 | 发布准备 | GitHub Pages 项目站点，默认路径 `/shw-wui/` | 工作流准备完成不代表已上线；仍需审阅与 Pages 设置 |
| PROD-001 | 待确认 | 目标使用者、首批场景及组件范围 | 无已批准产品规格 |
| TECH-001 | 待确认 | 框架、样式、打包与分发方式 | 仓库无可用实现依据 |

产品决策建议使用：背景 → 候选项 → 结论 → 理由 → 影响 → 验收关联。待确认项不得仅因文档 PR 合并而被视为产品方案已批准。

OINK 依赖来源见 [OINK 官方说明](https://github.com/pgsty/oink)和 [官方 starter](https://github.com/pgsty/oink-starter)。具体构建与发布操作见仓库 `docs/README.md`。
