# Connecting the MCP

The server is registered in the repo's `.mcp.json` and lives at
`tools/mcp-reports/`. Its own `README.md` is the authority; this file
covers what goes wrong in practice.

## Install

```bash
cd tools/mcp-reports && npm install
```

## The credential

Both reports need a **Cut+Dry employee** session. This is not a permission check
you can work around, and it bites in two separate places. The fields are absent
from the GraphQL schema entirely for anyone who is not an employee, because
`GraphQLRootQueryRegistry::getQuery()` merges the internal queries in only when
`ViewerContext::get()->getAuthUser()?->isEmployee()` (`:37-44`) — a non-employee
gets "Cannot query field", not a permission error. `InternalWebLib::graphqlCheck()`
is the second, independent check inside each root query, and it is the one that
raises `Operation not permitted`.

The server handles the session itself. These two are the only credentials it
reads from the environment (`CD_REPORTS_MCP_BASE_URL`, the session-file path and
the cookie escape hatch are read from there too — see the table below):

```bash
export CD_ADMIN_EMAIL='you@cutanddry.com'
export SECRET_CD_ADMIN_PASSWORD='...'
```

…or, to keep them across sessions, in the `env` block of
`.claude/settings.local.json` (gitignored):

```json
"env": {
  "CD_ADMIN_EMAIL": "you@cutanddry.com",
  "SECRET_CD_ADMIN_PASSWORD": "..."
}
```

From those, `session.js` mints a session the first time it needs one, caches it,
and re-mints it when the host rejects it — mid-request, on the failing call, so
nothing surfaces but the answer. There is no cookie to paste and no restart.

No browser is involved, and no Google SSO: an SSO-shaped login page is not
evidence that SSO is the only door. It runs the same two-step exchange the
Playwright suite has been using for every run (`ui_automation/utils/adminLoginAs.ts`)
— worth checking there first for any auth problem here, since that suite has
usually solved it already:

1. `POST <classic>/api/v1/auth` with `{email, password}` → an `access_token`.
   `AuthAPI::create` takes email and password directly; the Google branch is only
   one of its three input shapes.
2. `GET <host>/login/loginWithAccessToken?access_token=…` →
   `Login::loginWithAccessToken` calls `doLogin()`, which mints the session
   cookies. `InternalWebLib::preRouteHook` deliberately lets a request carrying
   `access_token` through unauthenticated — but only on **prod**, since it does
   nothing unless `Env::isInternalWeb()` is true and that is the prod `internal.`
   host alone. Off prod the route is simply not behind that gate, so nothing has
   to let the request through.

Redirects are followed by hand so the `Set-Cookie` on an intermediate 302 — where
the session cookie actually arrives — is not dropped.

### Where the session lives

`~/.claude/projects/<project-slug>/credentials/report-sessions.json`, written
`0600`, keyed by host:

```json
{
  "sessions": {
    "https://app-<prefix>.staging.eng.cutanddry.com": {
      "cookie": "…",
      "account": "…",
      "capturedAt": "…"
    }
  }
}
```

Keyed by host because a cookie is only valid for the host it was captured from,
so switching branches switches sessions with nothing to re-point. Override the
location with `CD_REPORTS_MCP_SESSION_FILE`.

It is a **sibling of** `memory/`, not a file in it, and that is the whole point:
everything under `memory/` exists to be read back into a prompt, and this is a
year-long impersonation credential for every internal tool. It belongs somewhere
the server reads and nothing else does. Do not copy it into a memory file, the
repo, a commit, or a settings file.

**One precondition that is not about the credential.** `InternalWebLib::accessCheck`
calls `employeeRequiresAuth()` — `isEmployeeEmail() && !hasRecentlyAuthedWithGSuite()`
— and that Google timestamp lives on the _account_, not on the session. A password
session is refused until the account has a Google sign-in on record for that
environment: once ever on staging, within the last 30 days on prod
(`HasLoginData::hasRecentlyAuthedWithGSuite`, which short-circuits on
`!GPEnv::isProdEnv()`). Minting probes `/internaltools` and names this when it is
what went wrong, because no amount of re-minting fixes it. The fix is one sign-in
at `<host>/login/googleSpa?redirect=/internaltools`.

Login-As does not substitute for any of this — it impersonates another user _from_
an employee session, it does not create one.

## Getting it into the environment

`.mcp.json` forwards the credential, host, session-file and timeout variables
from the environment the client was launched with. Either export them before
starting the client, or — for Claude Code — put them in the `env` block of
`.claude/settings.local.json`, which is gitignored while `.mcp.json` is
committed:

```json
"env": {
  "CD_ADMIN_EMAIL": "you@cutanddry.com",
  "SECRET_CD_ADMIN_PASSWORD": "..."
}
```

Those two are the whole configuration on a `<name>-staging` branch. Everything
else has a resolved default: the host comes from the branch, and the session
comes from the credential store or a fresh mint.

**The environment is read at process start**, so a variable added mid-session
does not reach a running server — set them, then restart the client (`/exit`,
then `claude --continue` to keep the conversation). This applies to the
environment _only_. The session cookie is not an environment variable any more,
which is exactly why it no longer costs a restart.

Editing the settings file is the user's job, not yours; agents are blocked from
writing to their own configuration. Give them the block to paste.

## Environment variables

| Variable                                         | Default                                                      | Purpose                                                                                    |
| ------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `CD_ADMIN_EMAIL` / `ADMIN_EMAIL`                 | —                                                            | Employee email. Required                                                                   |
| `SECRET_CD_ADMIN_PASSWORD` / `CD_ADMIN_PASSWORD` | —                                                            | That account's password. Required. Never a flag, never committed                           |
| `CD_REPORTS_MCP_BASE_URL` / `CD_ADMIN_BASE_URL`  | derived from the checked-out branch                          | Overrides the host. The only way to reach prod; there is no fallback to it                 |
| `CD_REPORTS_MCP_SESSION_FILE`                    | `~/.claude/projects/<slug>/credentials/report-sessions.json` | Where the minted session is cached                                                         |
| `SECRET_CD_ADMIN_COOKIE` / `CD_ADMIN_COOKIE`     | —                                                            | Escape hatch: pins a cookie and disables minting. For CI, or for a session you cannot mint |
| `CD_REPORTS_MCP_TIMEOUT_MS`                      | `60000`                                                      | Request timeout; raise for a cold, wide Snowflake run                                      |

## Which host gets read

`config.js` resolves this itself, from the branch checked out in this repo
(`git branch --show-current`, asked of the server file's own repo rather than the
client's cwd). There is no default host, so nothing silently points at prod.

A `<name>-staging` branch's box is
`https://app-<name>.staging.eng.cutanddry.com` — CircleCI strips the `-staging`
suffix for the hostname. The `app-` prefix is not a typo: `Env::isInternalWeb()`
(`app/libraries/internal_tools/Env.php:6`) is hardcoded to
`internal.cutanddry.com`, so **there is no internal host outside prod** — as
`Domain.php:51` puts it, "Elsewhere (local/staging/test) there is no internal
host". On non-prod `InternalWebLib::redirect()` serves `/internaltools` from
`Domain::getClassic()`. An `internal-<name>.staging…` hostname resolves on
wildcard DNS and answers from the same box, and will even hand back a working
session — but the app does not treat it as internal, so you authenticate
somewhere useless. Minting refuses an `internal-` host off prod for exactly that
reason. A hostname resolving proves nothing; `Env::isInternalWeb()` and
`Domain::` decide what a host _is_.

A branch with no box of its own (`main`, `release`, anything not ending
`-staging`) resolves to **no host at all**, and every report fails with an error
that says which branch it was and how to name a host deliberately. When there is
no branch at all the error says which of the three reasons applies — a detached
HEAD, a missing `git` binary, and a non-checkout are different faults. Prod is a
deliberate act — `CD_REPORTS_MCP_BASE_URL=https://internal.cutanddry.com` plus a
restart — and never something the server drifts into on its own.
`refresh-cookie.mjs` defaults the same way, to the branch's own box: the most
dangerous host must not be the one you get by doing nothing.

For the same reason, any host that is not on `.staging.eng.cutanddry.com` is
treated as production when `check_connection` decides which warning to print. The employee gate checks the user, not the host, so
`app.cutanddry.com` reads prod figures just as well as `internal.cutanddry.com`
does.

Feed the branch straight to the helper — `refresh-cookie.mjs --branch <name>`
derives the hostname the same way CircleCI and `config.js` do, and writes the
matching `CD_REPORTS_MCP_BASE_URL` into the env block it hands the user, so host
and cookie cannot drift apart.

Prefer a staging session where the data serves the purpose: non-prod Google
auth stays valid indefinitely
(`HasLoginData::hasRecentlyAuthedWithGSuite`), while prod re-auths monthly and a
prod `session_v_8` is a far more dangerous credential to have sitting in a file.

Remember that staging data is a snapshot. Say so when reporting numbers from it.

## What each failure means

| Symptom                                                                    | Cause                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `No host to query: …`                                                      | No `CD_REPORTS_MCP_BASE_URL`, and the branch gives nothing — either it has no box, or there is no branch (detached HEAD, no `git` on PATH, not a checkout). The message names which. Check out the `-staging` branch you meant, or name a host outright. Working as designed — it is refusing to guess prod. |
| `Cannot read reports from <host>` naming the wrong host                    | A stale `CD_REPORTS_MCP_BASE_URL` reached the process, or a new value did not — the environment is read at process start. Re-point it and restart.                                                                                                                                                           |
| `check_connection` warns that the host is not the one the branch calls for | The env block still names the host from whenever it was last pasted. It used to be silent; the server now says so. Drop the variable to fall back to the branch's box, or re-point it, then restart.                                                                                                         |
| `No stored session … and no credentials to mint one with`                  | `CD_ADMIN_EMAIL` / `SECRET_CD_ADMIN_PASSWORD` did not reach the server. Almost always a missing restart rather than a missing value.                                                                                                                                                                         |
| `Authentication rejected for <email>`                                      | Wrong password, or the account does not exist on _that_ environment — staging and prod hold separate user data.                                                                                                                                                                                              |
| A report fails on auth even though minting succeeded                       | The account, not the session: it is not a Cut+Dry employee, or not one on this environment. Re-minting cannot fix it, so the server does not keep trying.                                                                                                                                                    |
| `has no Google sign-in on record for this environment`                     | `employeeRequiresAuth()` — a property of the account. Sign in once at `<host>/login/googleSpa?redirect=/internaltools`, then retry. Not a bug.                                                                                                                                                               |
| `Operation not permitted`                                                  | Authenticated as an employee, but refused by `graphqlCheck()`. Most likely the wrong account.                                                                                                                                                                                                                |
| An expired session                                                         | Invisible: `GP::redirect()` answers HTTP **200** with `{"redirect": "…/login/index"}` rather than a 401 because the request is JSON (`graphp/core/GP.php:321`). The server detects that, discards the cached session, re-mints and retries the same call — you should never see this one.                    |
| Timeout                                                                    | A cold, wide Snowflake run. Raise `CD_REPORTS_MCP_TIMEOUT_MS` or narrow the range.                                                                                                                                                                                                                           |

`list_report_filters` needs no cookie, so it still answers while auth is broken —
useful for confirming the server itself is alive.
