---
name: /opsx-propose
id: opsx-propose
category: 工作流
description: 提议新变更——一步创建变更并生成所有制品
---

提议新变更——一步创建变更并生成所有制品。

我将创建包含以下制品的变更：
- proposal.md（做什么 & 为什么）
- design.md（怎么做）
- tasks.md（实施步骤）

准备好实施后，运行 /opsx:apply

---

**输入**：`/opsx:propose` 后的参数是变更名称（kebab-case），或用户想要构建的内容描述。

**步骤**

1. **若未提供输入，询问用户想要构建什么**

   使用 **AskUserQuestion 工具**（开放式，无预设选项）询问：
   > "你想要进行什么变更？描述你想要构建或修复的内容。"

   从描述中推导 kebab-case 名称（例如 "添加用户认证" → `add-user-auth`）。

   **重要**：在理解用户想要构建什么之前，不要继续。

2. **创建变更目录**
   ```bash
   openspec new change "<name>"
   ```
   这会在 `openspec/changes/<name>/` 下创建带有 `.openspec.yaml` 的变更脚手架。

3. **获取制品构建顺序**
   ```bash
   openspec status --change "<name>" --json
   ```
   解析 JSON 以获取：
   - `applyRequires`：实施前需要的制品 ID 数组（例如 `["tasks"]`）
   - `artifacts`：所有制品列表及其状态和依赖关系

4. **按顺序创建制品直到可以实施**

   使用 **TodoWrite 工具** 跟踪制品创建进度。

   按依赖顺序遍历制品（无待处理依赖的制品优先）：

   a. **对每个 `ready`（依赖已满足）的制品**：
      - 获取指引：
        ```bash
        openspec instructions <artifact-id> --change "<name>" --json
        ```
      - 指引 JSON 包含：
        - `context`：项目背景（作为你的约束——不要包含在输出中）
        - `rules`：制品特定规则（作为你的约束——不要包含在输出中）
        - `template`：输出文件使用的结构
        - `instruction`：该制品类型的 schema 特定指导
        - `outputPath`：制品写入路径
        - `dependencies`：需要读取的已完成依赖制品
      - 读取已完成的依赖文件获取上下文
      - 使用 `template` 作为结构创建制品文件
      - 将 `context` 和 `rules` 作为约束应用——但不要将其复制到文件中
      - 简要显示进度："已创建 <artifact-id>"

   b. **继续直到所有 `applyRequires` 制品完成**
      - 创建每个制品后，重新运行 `openspec status --change "<name>" --json`
      - 检查 `applyRequires` 中的每个制品 ID 在 artifacts 数组中是否为 `status: "done"`
      - 当所有 `applyRequires` 制品完成时停止

   c. **若制品需要用户输入**（上下文不明确）：
      - 使用 **AskUserQuestion 工具** 进行澄清
      - 然后继续创建

5. **显示最终状态**
   ```bash
   openspec status --change "<name>"
   ```

**输出**

完成所有制品后，总结：
- 变更名称和位置
- 已创建的制品列表及简要描述
- 就绪状态："所有制品已创建！可以开始实施。"
- 提示："运行 `/opsx:apply` 开始实施。"

**制品创建指南**

- 遵循 `openspec instructions` 中每种制品类型的 `instruction` 字段
- Schema 定义了每个制品应包含的内容——遵循它
- 创建新制品前先读取依赖制品获取上下文
- 使用 `template` 作为输出文件的结构——填充其中的各个部分
- **重要**：`context` 和 `rules` 是对你的约束，不是文件内容
  - 不要将 `<context>`、`<rules>`、`<project_context>` 块复制到制品中
  - 这些指导你的写作，但绝不应出现在输出中

**守则**
- 创建实施所需的所有制品（由 schema 的 `apply.requires` 定义）
- 创建新制品前始终读取依赖制品
- 若上下文严重不明确，询问用户——但优先做出合理决策以保持推进节奏
- 若同名变更已存在，询问用户是继续该变更还是创建新变更
- 写入后验证每个制品文件存在，再继续下一个
