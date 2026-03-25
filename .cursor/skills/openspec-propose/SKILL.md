---
name: openspec-propose
description: 提出新变更并一步生成所有 artifact。当用户想快速描述要构建的内容，并获得包含设计、规格和任务的完整提案时使用。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.2.0"
---

提出新变更——创建变更并一步生成所有 artifact。

我将创建包含以下 artifact 的变更：
- proposal.md（做什么 & 为什么）
- design.md（怎么做）
- tasks.md（实现步骤）

准备好实现时，运行 /opsx:apply

---

**输入**：用户的请求应包含变更名称（kebab-case）或要构建的内容的描述。

**步骤**

1. **如果未提供明确的输入，询问用户想要构建什么**

   使用 **AskUserQuestion tool**（开放式，无预设选项）询问：
   > "你想处理什么变更？描述一下你想构建或修复的内容。"

   从用户描述中推导出 kebab-case 名称（例如 "add user authentication" → `add-user-auth`）。

   **重要**：在理解用户想构建什么之前，不要继续。

2. **创建变更目录**
   ```bash
   openspec new change "<name>"
   ```
   这将在 `openspec/changes/<name>/` 下创建带有 `.openspec.yaml` 的脚手架变更。

3. **获取 artifact 构建顺序**
   ```bash
   openspec status --change "<name>" --json
   ```
   解析 JSON 获取：
   - `applyRequires`：实现前需要的 artifact ID 数组（例如 `["tasks"]`）
   - `artifacts`：所有 artifact 的列表及其状态和依赖关系

4. **按顺序创建 artifact 直到可以 apply**

   使用 **TodoWrite tool** 跟踪 artifact 创建进度。

   按依赖顺序遍历 artifact（先处理没有待定依赖的 artifact）：

   a. **对每个状态为 `ready`（依赖已满足）的 artifact**：
      - 获取指令：
        ```bash
        openspec instructions <artifact-id> --change "<name>" --json
        ```
      - 指令 JSON 包含：
        - `context`：项目背景（给你的约束——不要包含在输出中）
        - `rules`：artifact 特定规则（给你的约束——不要包含在输出中）
        - `template`：输出文件要使用的结构
        - `instruction`：此 artifact 类型的 schema 特定指导
        - `outputPath`：artifact 写入位置
        - `dependencies`：需要读取以获取上下文的已完成 artifact
      - 读取已完成的依赖文件获取上下文
      - 使用 `template` 作为结构创建 artifact 文件
      - 将 `context` 和 `rules` 作为约束应用——但不要将它们复制到文件中
      - 显示简要进度："Created <artifact-id>"

   b. **继续直到所有 `applyRequires` artifact 完成**
      - 创建每个 artifact 后，重新运行 `openspec status --change "<name>" --json`
      - 检查 `applyRequires` 中的每个 artifact ID 在 artifacts 数组中是否为 `status: "done"`
      - 当所有 `applyRequires` artifact 完成时停止

   c. **如果某个 artifact 需要用户输入**（上下文不清晰）：
      - 使用 **AskUserQuestion tool** 进行澄清
      - 然后继续创建

5. **显示最终状态**
   ```bash
   openspec status --change "<name>"
   ```

**输出**

完成所有 artifact 后，总结：
- 变更名称和位置
- 已创建的 artifact 列表及简要描述
- 就绪状态："All artifacts created! Ready for implementation."
- 提示："Run `/opsx:apply` or ask me to implement to start working on the tasks."

**Artifact 创建指南**

- 遵循 `openspec instructions` 中每个 artifact 类型的 `instruction` 字段
- schema 定义了每个 artifact 应包含的内容——遵循它
- 创建新 artifact 前读取依赖 artifact 获取上下文
- 使用 `template` 作为输出文件的结构——填充其章节
- **重要**：`context` 和 `rules` 是给你的约束，不是文件的内容
  - 不要将 `<context>`、`<rules>`、`<project_context>` 块复制到 artifact 中
  - 这些指导你写什么，但绝不应该出现在输出中

**守则**
- 创建实现所需的所有 artifact（由 schema 的 `apply.requires` 定义）
- 创建新 artifact 前始终读取依赖 artifact
- 如果上下文严重不清晰，询问用户——但倾向于做出合理决策以保持推进速度
- 如果同名变更已存在，询问用户是继续还是创建新的
- 写入后验证每个 artifact 文件存在，再继续下一个
