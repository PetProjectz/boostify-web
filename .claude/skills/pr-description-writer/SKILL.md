---
name: pr-description-writer
description: >-
  Write the description body for a cut-and-dry pull request, grounded in the
  actual diff rather than the branch name or the ticket. Use WHENEVER the user
  wants a PR write-up: "write the PR description", "draft the description for
  this branch", "update the description on PR 123", "summarize this branch for
  review", "write up what this PR does". Produces the house format — Jira link on
  line one, Summary and "How was it tested?" — with the reasoning a reviewer
  cannot get from reading the diff: why the change is shaped this way, what was
  deliberately left out, what was actually run, and the assumptions the change
  rests on (a one-off or backfill that must run first, a catalog/ERP sync or ES
  reindex that must have completed, a flag or setting that must be on, a parent
  PR that must land first). Shows the draft in chat by default; only touches
  GitHub when explicitly asked.
---

# PR Description Writer

Write the **description body** for a pull request in this repo. A reviewer can
already read the diff — the description exists to give them what the diff cannot:
the problem, the reasoning, the risk, and the evidence it works.

Authority for format: `.cursor/rules/git/cd-monolith-pr-guidelines.mdc` and
`pull_request_template.md`. This skill is the authority on _content quality_.

## 1. Gather — never write from the branch name alone

Work through the GitHub CLI, not the local checkout — the local branch can be
stale, mid-rebase, or carrying uncommitted work that is not part of the PR.

1. **Resolve the PR and, above all, its base branch.** Use `gh pr view --json number,url,body,headRefName,baseRefName` when no PR number is given, or `gh pr view <number> --json number,url,body,headRefName,baseRefName` when the user names one. The base is not always `main` — a stacked branch sits on another feature branch, and some PRs open against `release`. Take it from the PR itself.
2. **Get the diff against that base branch.** Use `gh pr diff <number>` for an existing PR; it compares against the PR's own base. Get the changed-file list first with `gh pr view <number> --json files`, then read the diff itself. If no PR exists yet, use the repository compare API on `<base>...<head>`, naming the intended base explicitly — never diff against whatever `main` happens to be.
3. **Read the whole diff.** On a large PR, pull per-file patches with `gh api repos/{owner}/{repo}/pulls/<number>/files --paginate` and walk them one file at a time rather than one wall of text.
4. **Read the surrounding code** for any hunk whose purpose is not self-evident.

Then:

- **Ticket.** Derive the key from the branch name (`<key>-<number>-staging` →
  `KEY-NUMBER`), or take the one the user gives you. Read it (Atlassian MCP
  `getJiraIssue`) for product intent and terminology. The ticket is context,
  **not** the scope — describe what the diff does, and flag any gap between the two.
- **Staging URL.** A `<name>-staging` branch gets `app-<name>.staging.eng.cutanddry.com`.
  Include it only if the box actually exists — never as an assumption.
- **Test evidence.** What was actually run, in this session or by the user? Do not
  write a test line you cannot back.
- **Preconditions the change depends on.** Sweep the diff for anything that has to
  already be true when this merges, and ask the user about anything you can't
  settle from the code. Signals to look for:
  - a **one-off** under `app/oneoffs/` (registered in
    `app/libraries/one_offs/RunOneOffs.php`) that seeds or backfills the data the
    new code reads — especially when the new read path has no fallback for a node
    the one-off hasn't reached yet;
  - a **sync or reindex** that must have completed — catalog, order guide,
    invoices, inventory, an ERP/integration sync, or an ElasticSearch reindex for
    a changed index or mapping;
  - a **feature flag, DP setting, or config value** that must be switched on (or
    left off) for the new path to be exercised;
  - a **parent or sibling PR** that must land first, or a data/schema change made
    outside this repo.

## 2. Body skeleton

Line one is the Jira link (omit it if there genuinely is no ticket), then the
template's required sections. Strip the template's HTML comments.

```markdown
[TICKET-123](https://getcodify.atlassian.net/browse/TICKET-123)

## Summary

<the problem, then what this change does about it, then why it's shaped that way>

## How was it tested?

<commands actually run + results; manual steps on staging; what is NOT covered>

## Screenshots/GIF (if visual change)

### Desktop(Screenshots/GIF)

### Mobile(Screenshots/GIF)
```

Keep the Screenshots section only for a visual change — drop it on a backend-only
PR rather than shipping two empty headings.

**Optional sections, when they earn their place**

| Section                                      | Add it when                                                                   |
| -------------------------------------------- | ----------------------------------------------------------------------------- |
| `### Frontend` / `### Backend` under Summary | The change spans both and the halves read separately                          |
| `## Solution`                                | The _how_ needs room the Summary can't give — see below                       |
| `## Assumptions`                             | The change is only correct if something else has already happened — see below |
| `## Deliberate deviations`                   | You knowingly diverged from the ticket                                        |
| `## Follow-ups`                              | You scoped something out on purpose and it needs to be named so it isn't lost |

### Solution

**Show it, don't narrate it.** This section is a diagram or table plus short captions. Use `references/diagrams.md` to choose the diagram type and rendering rules. If you cannot verify the diagram against the diff, omit it.

### Assumptions

Every precondition found in step 1 goes here, as a bullet naming **what must
already be true** and **what breaks if it isn't**. The consequence is the point —
"the one-off must run first" is a note; "until the one-off runs, users without the
backfilled edge fall through to the empty branch and see no pricing" is a
deployment instruction the reviewer can act on. Name the one-off class, the sync,
the flag or the PR number exactly, and say when it has to happen relative to the
merge. If the change is correct on its own, leave the section out entirely rather
than filling it with "none".

Length scales with the change: a one-line fix gets three sentences and a test
command; a large feature earns sections, tables, and a diagram.

## 3. Quality bar

This is what separates a useful description from a changelog.

1. **Every claim traceable to a hunk.** If you can't point at the code that makes
   it true, cut the sentence. Never infer behaviour from a file name.
2. **Why, not what.** The diff shows what changed. Write the constraint that
   forced the shape — the ordering that made two saves necessary, the guard that
   had to run before the transaction opened, the fallback that keeps the change
   additive.
3. **Lead with the problem** on a fix or a parity gap. What was wrong, what it
   cost, then the remedy.
4. **Name the real things** — bold the class, method and file names taken from
   this diff so a reviewer can jump straight to them.
5. **Surface the bad news yourself.** A permission that narrows, a path that now
   fails closed, a backfill that must run first — state it.
6. **"How was it tested?" means evidence.** Exact commands and their results
   (`third_party/vendor/bin/phpunit --filter 'FooTest'` — 12 tests pass), the
   manual steps on the staging box, and an explicit note on anything you could
   **not** run. Marking a suite as unrun is fine; implying you ran it is not.
7. **No filler.** Never "TSIA", never a bare "Locally", never restating the diff
   stat, never marketing adjectives ("robust", "comprehensive", "significantly
   improved"). An empty required section is a defect.
8. **Do not copy other PRs.** Never open merged or open PRs to imitate their
   style, and never treat one as a model because it is recent or by the same
   author. The bar in this file is the standard; existing descriptions range
   from excellent to a single word, and averaging them drags the output down.

## 4. Deliver

Write the body to a scratchpad file and **show it in chat**. Stop there by
default — the user reviews before anything reaches GitHub.

Only on an explicit ask, apply it to the open PR by editing the PR's body from
that file (pass the file, never a giant inline string — the body contains
markdown, backticks and newlines that a shell argument will mangle).

When updating an existing description, **preserve** anything the author added that
you can't regenerate — embedded screenshots, reviewer-facing notes, links.

## Definition of done

Report: the **body** (in chat), whether it was **applied to GitHub** or is a draft
only, and any **open questions** — claims you couldn't ground in the diff, tests
you couldn't run, or a mismatch between the ticket and the change.

## Boundaries

- Description body only — nothing else about the PR is yours to write or change.
- Never edit product code, amend commits, or push to make the description true.
- Never invent test results, ticket keys, staging URLs, or screenshots — and never
  invent an assumption. A precondition is stated only when the code shows it or
  the user confirms it; guessing at one sends the deployer chasing a job that
  doesn't exist.
- Never create a PR, edit an open one, or change a base branch without being asked.
- When the diff and the ticket disagree, describe the **diff** and say so.
