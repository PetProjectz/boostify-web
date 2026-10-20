---
name: cd-reports
description: >-
  Answer questions about Cut+Dry's internal reports by driving the `cd-reports`
  MCP server — today the New Online Revenue roll-ups: revenue, item quantity
  and distinct customers per distributor (DP) or per in-app source, each against
  the preceding period. Use this WHENEVER someone asks about online revenue,
  GMV, top or bottom distributors, how a DP is trending, which part of the app
  is driving orders, acquired vs retained vs baseline orders, or customer counts
  on the platform — including loose phrasings like "how's Driscoll doing", "who
  are our biggest DPs", "did revenue go up last month", "what's driving
  orders", "pull the revenue numbers", or "call the revenue MCP". Also covers
  getting the MCP connected when its tools fail on auth.
triggers:
  - revenue report
  - revenue roll-up
  - rollup report
  - new online revenue
  - revenue by distributor
  - revenue by source
  - top dps
  - top distributors
  - biggest distributors
  - gmv
  - cd-reports
  - get_revenue_by_distributor
  - get_revenue_by_source
  - acquired orders
  - retained orders
  - baseline orders
---

# Cut+Dry Reports

The `cd-reports` MCP server carries Cut+Dry's internal reports, one family of
tools per report. The New Online Revenue roll-ups below are the first family;
everything from "The host follows the branch" onwards is server-level and
applies to whatever is added beside them.

## Revenue roll-ups

Two roll-ups, both returning
**revenue, item quantity and distinct customers** for a period alongside the
equally-long period immediately before it:

- **`get_revenue_by_distributor`** — one row per DP. Answers "who", and "how is
  this DP trending".
- **`get_revenue_by_source`** — one row per in-app surface (search, order guides,
  suggested items, banners, chat, ERP…). Answers "what's driving orders".

Both wrap the monolith's own GraphQL endpoint, so the numbers match the
internal-tools UI and its CSV export exactly — same Snowflake SQL, same 24h Redis
cache, same `VerifiedVendor` name resolution. There is nothing to recompute, and
a number that looks wrong is a filter problem, not an arithmetic one.

## The host follows the branch, and prod is never a default

The server has no default host — it resolves one from the checked-out branch, so
there is nothing to derive by hand:

- a **`<name>-staging`** branch resolves to
  `https://app-<name>.staging.eng.cutanddry.com` (CircleCI strips the `-staging`
  suffix to build the hostname). The `app-` prefix is not a typo: **non-prod has
  no internal host.** `Env::isInternalWeb()` is hardcoded to
  `internal.cutanddry.com`, so off prod the internal tools are served from the
  classic host and `InternalWebLib::redirect()` points at `Domain::getClassic()`.
  An `internal-<name>.staging…` name does resolve — wildcard DNS, same box — but
  it is not the internal web and is not the host to use;
- **anything else** — `main`, `release`, a branch with no box — resolves to
  _nothing_, and every report fails with an error saying so. It does **not** fall
  back to prod.

That last rule is the point. A fallback would make the most dangerous host the
one you get by doing nothing, and a roll-up from the wrong environment is
plausible enough that nothing downstream catches it. Reading production is
therefore a deliberate act: `CD_REPORTS_MCP_BASE_URL=https://internal.cutanddry.com`
in the env block, then a restart. **Ask the user before proposing that** — it
parks a year-long prod impersonation cookie in a file, and the figures it returns
are confidential.

Both the host and the session are resolved per request, so switching branches
switches boxes — and sessions — with no restart. Only an explicit
`CD_REPORTS_MCP_BASE_URL` is read at process start, because it comes from the
environment.

## Then `check_connection`

Run it before the first real query of a session. It reports the host **and where
that host came from** — derived from the branch, or named by an env var — and
warns when an explicit `CD_REPORTS_MCP_BASE_URL` disagrees with the branch. That
last case is the one worth the call: a stale env block pointing at another
branch's box, or at prod, returns a clean and plausible table from the wrong
environment, with no error to catch it.

It also separates "your cookie expired" from "your filters excluded everything" —
two failures that otherwise look identical, because an empty report and an
unauthenticated one both come back with no rows.

The session needs nothing from you. The server mints one from `CD_ADMIN_EMAIL`
and `SECRET_CD_ADMIN_PASSWORD` the first time it needs it, caches it per host
outside the repo, and re-mints it mid-request when it expires — there is no
cookie to paste and no restart to ask for. An auth failure that survives that is
about the _account_, not the cookie, so retrying will not fix it: see
`references/setup.md`.

## Picking the tool

| The question                              | Call                                                                                                                 |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Who are the top/bottom DPs?               | `get_revenue_by_distributor`                                                                                         |
| How is one named DP doing?                | `list_distributors_with_revenue` to resolve the name → `verifiedVendorId`, then `get_revenue_by_source` scoped to it |
| What part of the app drives orders?       | `get_revenue_by_source`, `viewBy: PRIMARY`                                                                           |
| Which specific surface inside a grouping? | `get_revenue_by_source`, `viewBy: SECONDARY`                                                                         |
| Revenue for one DP from one surface       | `get_revenue_by_distributor` with `sourceLevel1` / `sourceLevel2`                                                    |
| What filter values are legal?             | `list_report_filters` — needs no cookie, so it also works while auth is broken                                       |

Distributor names are fuzzy in conversation ("Harbor", "Chefs Want") and exact in
the data. Resolve through `list_distributors_with_revenue` rather than guessing an
id — and if a name matches two rows, ask which one rather than picking.

## The defaults are narrower than the UI

This is the single most common way to report a wrong number:

- **`orderNovelties` defaults to `ACQUIRED`** — first-time orders only.
- **`orderPlacedBy` defaults to `OPERATORS`** — excludes salesperson-placed orders.

Someone asking "what was our revenue last month" almost always means everything.
Pass `orderNovelties: ["ALL"]` unless they specifically asked about acquisition,
and say which filters produced the numbers whenever you report them — a figure
well below what the reader sees on the internal-tools page destroys trust in the
whole answer.

`dateRange` takes `7_days`, `14_days`, `30_days`, `90_days`, `6_months`, `1_year`,
`year_to_date`, `all_time`, or `custom` with both `customStartTime` and
`customEndTime` (`MM/DD/YY`, or epoch milliseconds). A half-specified custom range
is rejected rather than silently falling back — supply both bounds or neither.

`MM/DD/YY` is read in the local timezone of the machine running the server, which
is what the internal-tools picker does with the browser's zone, so the same
calendar dates cover the same window in both. A date that does not exist is
refused rather than rolled into the next month, so a bad bound comes back as an
error instead of a plausible table for the wrong period. Report the window the
filters line states, not the one you asked for.

## Keep the payload small

`limit` truncates the rows in **every** format, so a `limit: 5` call returns five
rows whether you ask for `table`, `json` or `both`. The totals are unaffected —
they always cover all rows — and the JSON carries `rowCount: {shown, total}` so a
truncated payload is visible rather than inferred.

Stay on the default `format: "table"` anyway; `json` is roughly an order of
magnitude more tokens per row. Reach for it only when you need to compute
something the table doesn't show, and pair it with a tight `limit`. A 30-day
distributor call is ~180 rows unlimited, which has overflowed the per-result
token ceiling in practice. If a result does overflow, it is written to a file —
read the head of that file for the table rather than re-running the call.

## Reading the numbers

A table is not an answer. What a reader wants is what moved and why it plausibly
moved. Useful moves, in rough order of how often they pay off:

- **Check the totals line before the rows.** Totals cover every DP, not just the
  ones rendered, so visible rows never sum to them. A top-5 that grew while the
  total barely moved means the tail shrank — that is usually the story.
- **Compare revenue % against quantity %.** Moving together is volume. Diverging
  is price or mix: quantity far ahead of revenue means cheaper items or a large
  low-price account landing; revenue ahead of quantity means the reverse.
- **Compare revenue % against customers %.** Revenue down while customer count
  holds flat means existing customers ordering less — a different problem, with
  different owners, than customers leaving.
- **Size each mover against the total change**, not against itself. A DP up
  10% sounds modest until its absolute gain exceeds the platform's entire
  increase, which means everything else net shrank.
- **Follow a surprising DP into `get_revenue_by_source`** scoped to its
  `verifiedVendorId`. That is where "why" usually lives.

State the period and filters with the numbers, and flag when the 24h cache means
today may not be included yet.

## Formatting

The server already formats tables to the house rules — thousands separators,
percentages to one decimal, `MM/DD/YY` dates. Keep those conventions in any
prose, table or summary you write around it, including numbers you derive
yourself.

## Handling the data

These are real financial figures, and where they came from matters:

- **Say which host produced them.** A staging box carries a staging snapshot, not
  authoritative numbers. `check_connection` reports the host — use it.
- **Keep figures out of anything that gets published.** Revenue totals, customer
  counts and DP-level numbers do not belong in commit messages, PR descriptions,
  committed files, or any external service. Describe that a query ran and what it
  proved; leave the amounts in the conversation.
- **Never echo the session cookie**, and never move it into the repo, a commit,
  a settings file or a memory file. It is a year-long impersonation credential
  for every internal tool, not just these reports. It lives in one place the
  server manages (`0600`, outside the repo, keyed by host); nothing needs to read
  it but the server.

## Reference

- `references/setup.md` — connecting the MCP, the two credentials it needs, where
  the session is cached, host selection, and what each auth failure means.
- `scripts/refresh-cookie.mjs` — mints and caches a session for a host up front,
  printing each step. The server does this on its own, so reach for the script
  only to pre-warm a host, to target one other than the branch's box, or to see
  _where_ authentication is failing — a report failure does not show the steps.
