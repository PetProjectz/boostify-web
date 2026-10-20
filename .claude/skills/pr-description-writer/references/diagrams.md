# PR description diagrams

Use a diagram only when it makes the change easier to review than prose.

## Diagram choices

- **Rules, conditions, branching:** `flowchart TD` with decisions as diamonds.
- **Call chain across components/services:** `sequenceDiagram` with one participant per class.
- **Status or lifecycle change:** `stateDiagram-v2`.
- **New graph nodes/edges:** `erDiagram`, or a `flowchart LR` of node → edge → node.
- **Old behavior vs new behavior:** a table with old, new, and effect columns.

## Rules

- Label nodes with real names from the diff: class, method, flag, setting, or file.
- Make the delta visible: mark new nodes or branches and keep the old path visible.
- Use one diagram per idea; two small diagrams are better than one dense diagram.
- Keep syntax conservative: plain `flowchart`, `sequenceDiagram`, `stateDiagram-v2`, quoted labels when needed, no styling directives.
- Check the rendered diagram against the diff before shipping it.
