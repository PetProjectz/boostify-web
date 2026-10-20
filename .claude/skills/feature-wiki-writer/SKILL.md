---
name: feature-wiki-writer
description: "Create or update the feature documentation for a shipped Cut+Dry feature. When invoked, read the shipped feature's ticket (OR paper trail) AND the real repository code, then write or update the feature doc under the right audience folder in `docs/features/` (`operator-and-distributor/`, `manufacturer/`, `operator/`, or `distributor/`) following this repo's feature-doc pattern, and wire it into that folder's `README.md` index. Every claim is grounded in the code or the paper trail — never guessed. Load it whenever you need to document a shipped feature or update the feature wiki."
metadata:
  version: "1.1.0"
---

# Feature Wiki Writer

When invoked, **create or update the feature documentation for a shipped feature**
as a doc under the right audience folder in `docs/features/`, following this repo's
hierarchical linked-doc pattern.

## Folder structure

`docs/features/` is partitioned by audience — pick the folder that fits the feature:

| Folder                      | Scope                                                                                                                                                                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `operator-and-distributor/` | Anything both operators (restaurants) and distributors touch: ordering, payments, invoices, pricing, catalog, order guides, integrations, platform features. Has nested `ordering-flows/` and `order-flow-features/` subfolders (each with its own README). |
| `manufacturer/`             | Manufacturer-portal features (campaigns/ads, rebates & cashback). Has a nested `rebate-campaigns/` subfolder.                                                                                                                                               |
| `operator/`                 | Operator-only features.                                                                                                                                                                                                                                     |
| `distributor/`              | Distributor-only features.                                                                                                                                                                                                                                  |

Each folder (and most subfolders) has its own `README.md` index. The top-level
`docs/features/README.md` only points at the audience folders — don't add
individual feature entries there. If a feature genuinely fits none of the existing
folders, prefer an existing one over inventing a new folder; only add a new folder
(with its own `README.md` index, linked from `docs/features/README.md`) when no
existing audience fits.

## Inputs

- The shipped feature's paper trail, in order: **PRD → UI/UX spec → tech spec →
  PR → code review**. Use it for product intent, scope, and terminology.
  The paper trail often spells out the **deployment procedure** (flags to flip,
  migrations/backfills, one-offs, phased rollout). Read it to work out the end
  state, but document only the feature's current post-deployment behavior.
- **The real repository code.** `docs/features/` docs describe _how the feature
  works today_, so behavior claims must be verified against the actual code — the
  paper trail alone is not sufficient.

## Procedure

1. **Locate the target doc.** Pick the audience folder (see the table above),
   derive the kebab-case `<slug>` from the feature, and check whether
   `docs/features/<area>/<slug>.md` already exists — **update** it if so, otherwise
   **create** it. Skim that folder's `README.md`, the top-level
   `docs/features/README.md`, and `docs/CLAUDE.md` first so you extend/link existing
   docs instead of duplicating them.
2. **Research.** Read the paper trail for product intent, then read the relevant
   code (UI entry → GraphQL/controllers → libraries → GPNode data model →
   background jobs) to confirm how it actually works. Ground every claim; if you
   can't verify a claim, omit it.
3. **Write to the template** (below), one concept per file, ≤ ~700 words. State
   current behavior only — no history, no "recently/previously", no rollout
   steps.
4. **Wire it in.** Add or update the link + one-liner in the **folder's own**
   `README.md` index (e.g. `docs/features/<area>/README.md`) under the right group —
   not the top-level `docs/features/README.md`.
5. **Verify** before finishing: every referenced path exists, the most specific
   claims (class/method names, flow assertions) hold against the code, and every
   relative link resolves — including cross-folder `Related features` links (a doc
   in one audience folder linking to another uses `../<other-area>/<slug>.md`).

## Template

`docs/features/<area>/<slug>.md`, ≤ ~700 words:

```markdown
# <Feature Name>

**Portals:** <which portals surface it>

## What it does

<2-4 product-level sentences>

## How it works

<optional Mermaid diagram — conservative flowchart/sequenceDiagram syntax>
<runtime flow: UI entry → GraphQL/controllers → libraries → GPNode data model → background jobs>

## Key files

| Path | Purpose | <!-- 5-10 rows -->

## Related features

- <relative markdown link to related feature> — <relationship phrase>
<!-- Use same-folder paths like `./slug.md` and cross-folder paths like `../<other-area>/slug.md`; include ~4-8 genuinely meaningful relations. -->
```

## Definition of done

Report back: **status**, the **doc path** created or updated
(`docs/features/<area>/<slug>.md`), the **folder README index entry**
added/updated, and any **open questions** (claims you could not verify against the
code).

## Boundaries

- Docs-only — never change product code while documenting.
- Current behavior only; ground every claim in the code or the paper trail, never
  guess.
- Leave out rollout steps, migration/backfill and one-off runs, flag-flip
  sequencing, and staged-release plans. A flag or setting that still gates
  behavior after the rollout _is_ current behavior — document it as a condition
  on the feature, not as a deployment step.
- Parents summarize, children detail — don't duplicate content that already lives
  in another doc; link to it instead.
