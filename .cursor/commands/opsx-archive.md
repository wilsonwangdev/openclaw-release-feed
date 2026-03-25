---
name: /opsx-archive
id: opsx-archive
category: 工作流
description: 归档已完成的变更（实验性工作流）
---

归档已完成的变更（实验性工作流）。

**输入**：可选在 `/opsx:archive` 后指定变更名称（例如 `/opsx:archive add-auth`）。若省略，尝试从对话上下文中推断。若模糊或有歧义，**必须**提示用户选择可用变更。

**步骤**

1. **若未提供变更名称，提示用户选择**

   运行 `openspec list --json` 获取可用变更。使用 **AskUserQuestion 工具** 让用户选择。

   仅显示活跃变更（未归档的）。
   若可用，显示每个变更使用的 schema。

   **重要**：不要猜测或自动选择变更，始终让用户选择。

2. **检查制品完成状态**

   运行 `openspec status --change "<name>" --json` 检查制品完成情况。

   解析 JSON 以了解：
   - `schemaName`：使用的工作流
   - `artifacts`：制品列表及其状态（`done` 或其他）

   **若有制品未完成：**
   - 显示警告，列出未完成的制品
   - 提示用户确认是否继续
   - 用户确认后继续

3. **检查任务完成状态**

   读取任务文件（通常为 `tasks.md`）检查未完成的任务。

   统计标记为 `- [ ]`（未完成）和 `- [x]`（已完成）的任务数量。

   **若发现未完成任务：**
   - 显示警告，显示未完成任务数量
   - 提示用户确认是否继续
   - 用户确认后继续

   **若任务文件不存在：** 跳过任务相关警告，继续执行。

4. **评估 delta spec 同步状态**

   检查 `openspec/changes/<name>/specs/` 下是否存在 delta specs。若不存在，跳过同步提示继续。

   **若存在 delta specs：**
   - 将每个 delta spec 与 `openspec/specs/<capability>/spec.md` 中对应的主 spec 进行比较
   - 确定需要应用的变更（新增、修改、删除、重命名）
   - 在提示前显示合并摘要

   **提示选项：**
   - 若需要变更："立即同步（推荐）"、"跳过同步直接归档"
   - 若已同步："立即归档"、"仍然同步"、"取消"

   若用户选择同步，使用 Task 工具（subagent_type: "general-purpose", prompt: "Use Skill tool to invoke openspec-sync-specs for change '<name>'. Delta spec analysis: <include the analyzed delta spec summary>"）。无论用户选择如何，继续归档。

5. **执行归档**

   若归档目录不存在，创建之：
   ```bash
   mkdir -p openspec/changes/archive
   ```

   使用当前日期生成目标名称：`YYYY-MM-DD-<change-name>`

   **检查目标是否已存在：**
   - 若是：报错，建议重命名现有归档或使用其他日期
   - 若否：将变更目录移至归档

   ```bash
   mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
   ```

6. **显示摘要**

   展示归档完成摘要，包括：
   - 变更名称
   - 使用的 schema
   - 归档位置
   - Spec 同步状态（已同步 / 跳过同步 / 无 delta specs）
   - 关于警告的说明（未完成的制品/任务）

**成功时的输出**

```
## 归档完成

**变更：** <change-name>
**Schema：** <schema-name>
**归档至：** openspec/changes/archive/YYYY-MM-DD-<name>/
**Specs：** ✓ 已同步至主 specs

所有制品已完成。所有任务已完成。
```

**成功时的输出（无 Delta Specs）**

```
## 归档完成

**变更：** <change-name>
**Schema：** <schema-name>
**归档至：** openspec/changes/archive/YYYY-MM-DD-<name>/
**Specs：** 无 delta specs

所有制品已完成。所有任务已完成。
```

**成功时的输出（有警告）**

```
## 归档完成（有警告）

**变更：** <change-name>
**Schema：** <schema-name>
**归档至：** openspec/changes/archive/YYYY-MM-DD-<name>/
**Specs：** 跳过同步（用户选择跳过）

**警告：**
- 归档时有 2 个未完成制品
- 归档时有 3 个未完成任务
- Delta spec 同步已跳过（用户选择跳过）

若非有意为之，请检查归档内容。
```

**错误时的输出（归档已存在）**

```
## 归档失败

**变更：** <change-name>
**目标：** openspec/changes/archive/YYYY-MM-DD-<name>/

目标归档目录已存在。

**选项：**
1. 重命名现有归档
2. 若为重复项，删除现有归档
3. 等待其他日期再归档
```

**守则**
- 若未提供变更名称，始终提示用户选择
- 使用制品图（openspec status --json）检查完成状态
- 不要因警告而阻止归档——仅告知并确认
- 移至归档时保留 .openspec.yaml（随目录一起移动）
- 显示清晰的操作摘要
- 若请求同步，使用 Skill 工具调用 `openspec-sync-specs`（代理驱动）
- 若存在 delta specs，始终执行同步评估并在提示前显示合并摘要
