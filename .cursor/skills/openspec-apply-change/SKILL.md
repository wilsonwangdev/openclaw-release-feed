---
name: openspec-apply-change
description: 实现 OpenSpec 变更中的任务。当用户想要开始实现、继续实现或逐步完成任务时使用。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.2.0"
---

实现 OpenSpec 变更中的任务。

**输入**：可选指定变更名称。如果省略，检查是否能从对话上下文中推断。如果模糊或有歧义，**必须**提示用户选择可用的变更。

**步骤**

1. **选择变更**

   如果提供了名称，直接使用。否则：
   - 如果用户提到了某个变更，从对话上下文中推断
   - 如果只有一个活跃变更，自动选择
   - 如果有歧义，运行 `openspec list --json` 获取可用变更列表，并使用 **AskUserQuestion tool** 让用户选择

   始终宣布："Using change: <name>"，以及如何覆盖（例如 `/opsx:apply <other>`）。

2. **检查状态以了解 schema**
   ```bash
   openspec status --change "<name>" --json
   ```
   解析 JSON 以了解：
   - `schemaName`：使用的工作流（例如 "spec-driven"）
   - 哪个 artifact 包含任务（spec-driven 通常是 "tasks"，其他 schema 请检查 status）

3. **获取 apply 指令**

   ```bash
   openspec instructions apply --change "<name>" --json
   ```

   返回内容：
   - 上下文文件路径（因 schema 而异——可能是 proposal/specs/design/tasks 或 spec/tests/implementation/docs）
   - 进度（总数、已完成、剩余）
   - 带状态的任务列表
   - 基于当前状态的动态指令

   **处理各种状态：**
   - 如果 `state: "blocked"`（缺少 artifact）：显示消息，建议使用 openspec-continue-change
   - 如果 `state: "all_done"`：祝贺完成，建议归档
   - 否则：继续实现

4. **读取上下文文件**

   读取 apply 指令输出中 `contextFiles` 列出的文件。
   文件因 schema 而异：
   - **spec-driven**：proposal、specs、design、tasks
   - 其他 schema：按照 CLI 输出的 contextFiles

5. **显示当前进度**

   展示：
   - 使用的 schema
   - 进度："N/M tasks complete"
   - 剩余任务概览
   - CLI 输出的动态指令

6. **实现任务（循环直到完成或受阻）**

   对每个待处理任务：
   - 显示正在处理哪个任务
   - 进行所需的代码变更
   - 保持变更最小化和聚焦
   - 在任务文件中标记任务完成：`- [ ]` → `- [x]`
   - 继续下一个任务

   **以下情况暂停：**
   - 任务不清晰 → 请求澄清
   - 实现过程中发现设计问题 → 建议更新 artifact
   - 遇到错误或阻碍 → 报告并等待指导
   - 用户中断

7. **完成或暂停时显示状态**

   展示：
   - 本次会话完成的任务
   - 总体进度："N/M tasks complete"
   - 如果全部完成：建议归档
   - 如果暂停：解释原因并等待指导

**实现过程中的输出**

```
## Implementing: <change-name> (schema: <schema-name>)

Working on task 3/7: <task description>
[...implementation happening...]
✓ Task complete

Working on task 4/7: <task description>
[...implementation happening...]
✓ Task complete
```

**完成时的输出**

```
## Implementation Complete

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 7/7 tasks complete ✓

### Completed This Session
- [x] Task 1
- [x] Task 2
...

All tasks complete! Ready to archive this change.
```

**暂停时的输出（遇到问题）**

```
## Implementation Paused

**Change:** <change-name>
**Schema:** <schema-name>
**Progress:** 4/7 tasks complete

### Issue Encountered
<description of the issue>

**Options:**
1. <option 1>
2. <option 2>
3. Other approach

What would you like to do?
```

**守则**
- 持续推进任务直到完成或受阻
- 开始前始终读取上下文文件（来自 apply 指令输出）
- 如果任务有歧义，先暂停并询问再实现
- 如果实现过程中发现问题，暂停并建议更新 artifact
- 保持代码变更最小化且限定在每个任务范围内
- 完成每个任务后立即更新任务复选框
- 遇到错误、阻碍或不明确的需求时暂停——不要猜测
- 使用 CLI 输出的 contextFiles，不要假设特定的文件名

**灵活的工作流集成**

此技能支持"对变更执行操作"模型：

- **随时可调用**：在所有 artifact 完成前（如果任务已存在）、部分实现后、与其他操作交叉执行
- **允许更新 artifact**：如果实现过程中发现设计问题，建议更新 artifact——不锁定阶段，灵活工作
