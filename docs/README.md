# shw-wui 文档站（设计讨论稿）

本站独立于未来组件实现。公开内容位于 `content/`，全部产品方案为设计讨论稿、尚未实现。此提交只准备文档与工作流，不表示站点已上线。

## 依赖与来源

按 [OINK 官方 README](https://github.com/pgsty/oink) 及 [OINK Starter](https://github.com/pgsty/oink-starter) 固定基线：

- OINK `v1.5.1`（发布提交 `ef3f1192250684b2d92a22a877e220e1ff6789f2`），由 `go.mod` / `go.sum` 锁定。
- Hugo **Extended** `0.168.0`，使用内置 LibSass；无需外部 Sass、Node.js 或 npm。
- Go `1.27.3`、Git，用于 Hugo Module 下载。
- 参考 starter 提交 `6662307ed544eefcfe7bd80a15bffbf3daedc147`；只采用必要配置，未复制示例产品内容。

OINK 使用 Apache-2.0，保留于主题模块的 LICENSE / NOTICE，项目根 LICENSE 不变。

## 本地预览与生产构建

确认 `go version` 与 `hugo version`（含 `extended`）后，在仓库根执行：

```sh
cd docs
go mod download github.com/pgsty/oink
hugo server
```

生产构建：

```sh
cd docs
hugo --cleanDestinationDir --gc --minify --environment production --printPathWarnings
```

预期仅有上游 LibSass 弃用警告；保留日志并检查其他警告，不使用 `--panicOnWarning`。生成的 `public/`、`resources/`、模块缓存与锁文件均忽略，不提交构建产物。首次构建需要下载锁定的模块。

默认 `baseURL` 是 `https://shyun-cc.github.io/shw-wui/`。内部内容链接使用 Hugo `relref`，主题资源由 OINK 处理，避免手写站点根路径。更换项目名或自定义域名时同步修改 `hugo.yaml` 并重新检查链接。

## GitHub Pages 发布准备

`.github/workflows/docs-pages.yml` 对文档 PR 执行构建，对合并到 `main` 的文档变更或 `main` 上手动运行执行构建与部署。PR 不部署。构建仅有 `contents: read`；部署作业单独使用 Pages 必需的 `pages: write` 和 `id-token: write`，不需要新增凭据。

维护者审阅本稿后，需自行确认仓库 **Settings → Pages → Source: GitHub Actions**。工作流不自动开启 Pages（`enablement: false`）、不改仓库可见性或保护规则。如果现有设置不满足要求，部署应失败并由维护者处理。

发布成功后另行验证首页、`/shw-wui/design/`、九个讨论页面、样式、搜索与移动端布局；记录实际部署结果。当前仅准备工作流，没有公开部署成功的证据。

## 内容维护

先更新待确认问题与决策，再同步目标、边界、概念模型和验收。产品决策不会因基础文档 PR 合并自动生效。只提交允许公开的资料；不要加入私人聊天、内部标识、凭据或未授权设计资源。
