---
name: openspec-archive-change
description: 归档已完成的变更。当用户想要在实现完成后归档和收尾一个变更时使用。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.2.0"
---

归档已完成的变更。

**输入**：可选指定变更名称。如果省略，检查是否能从对话上下文中推断。如果模糊或有歧义，**必须**提示用户选择可用的变更。

**步骤**

1. **如果未提供变更名称，提示用户选择**

   运行 `openspec list --json` 获取可用变更。使用 **AskUserQuestion tool** 让用户选择。

   仅显示活跃变更（未归档的）。
   如果可用，显示每个变更使用的 schema。

   **重要**：不要猜测或自动选择变更，始终让用户选择。

2. **检查 artifact 完成状态**

   运行 `openspec status --change "<name>" --json` 检查 artifact 完成情况。

   解析 JSON 以了解：
   - `schemaName`：使用的工作流
   - `artifacts`：artifact 列表及其状态（`done` 或其他）

   **如果有 artifact 未完成：**
   - 显示警告，列出未完成的 artifact
   - 使用 **AskUserQuestion tool** 确认用户是否要继续
   - 用户确认后继续

3. **检查任务完成状态**

   读取任务文件（通常是 `tasks.md`）检查未完成的任务。

   统计标记为 `- [ ]`（未完成）和 `- [x]`（已完成）的任务数量。

   **如果发现未完成的任务：**
   - 显示警告，展示未完成任务数量
   - 使用 **AskUserQuestion tool** 确认用户是否要继续
   - 用户确认后继续

   **如果没有任务文件：** 跳过任务相关的警告，继续执行。

4. **评估 delta spec 同步状态**

   检查 `openspec/changes/<name>/specs/` 下是否存在 delta spec。如果没有，跳过同步提示。

   **如果存在 delta spec：**
   - 将每个 delta spec 与 `openspec/specs/<capability>/spec.md` 中对应的主 spec 进行比较
   - 确定将要应用的变更（新增、修改、移除、重命名）
   - 在提示前展示合并摘要

   **提示选项：**
   - 如果需要变更："Sync now (recommended)"、"Archive without syncing"
   - 如果已同步："Archive now"、"Sync anyway"、"Cancel"

   如果用户选择同步，使用 Task tool（subagent_type: "general-purpose", prompt: "Use Skill tool to invoke openspec-sync-specs for change '<name>'. Delta spec analysis: <include the analyzed delta spec summary>"）。无论选择如何，继续归档。

5. **执行归档**

   如果归档目录不存在，创建它：
   ```bash
   mkdir -p openspec/changes/archive
   ```

   使用当前日期生成目标名称：`YYYY-MM-DD-<change-name>`

   **检查目标是否已存在：**
   - 如果已存在：报错，建议重命名现有归档或使用不同日期
   - 如果不存在：将变更目录移至归档

   ```bash
   mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
   ```

6. **显示摘要**

   展示归档完成摘要，包括：
   - 变更名称
   - 使用的 schema
   - 归档位置
   - spec 是否已同步（如果适用）
   - 关于警告的说明（未完成的 artifact/任务）

**成功时的输出**

```
## Archive Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/
**Specs:** ✓ Synced to main specs (or "No delta specs" or "Sync skipped")

All artifacts complete. All tasks complete.
```

**守则**
- 如果未提供变更名称，始终提示选择
- 使用 artifact graph（openspec status --json）检查完成情况
- 不要因为警告而阻止归档——只需通知并确认
- 移至归档时保留 .openspec.yaml（它随目录一起移动）
- 展示清晰的操作摘要
- 如果请求同步，使用 openspec-sync-specs 方法（agent 驱动）
- 如果存在 delta spec，始终运行同步评估并在提示前展示合并摘要
