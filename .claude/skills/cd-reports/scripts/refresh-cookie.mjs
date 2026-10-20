#!/usr/bin/env node
/**
 * Mint a Cut+Dry employee session for the cd-reports MCP and cache it.
 *
 * You rarely need this: the MCP server mints its own session on first use and
 * re-mints it when it expires. Run it to pre-warm a host, to point at a host
 * other than the branch's own box, or to see exactly where authentication is
 * failing -- it prints each step, which a report failure does not.
 *
 * Credentials come from the environment and nowhere else, so they stay out of
 * shell history and `ps`. They are the only credentials read from there:
 *
 *   export CD_ADMIN_EMAIL='you@cutanddry.com'
 *   export SECRET_CD_ADMIN_PASSWORD='...'
 *
 * Or put the same two keys in the `env` block of .claude/settings.local.json
 * (gitignored) to keep them across sessions.
 *
 * Usage:
 *   node refresh-cookie.mjs                  # the checked-out branch's box
 *   node refresh-cookie.mjs --branch foo     # app-foo.staging.eng.cutanddry.com
 *   node refresh-cookie.mjs --host <url>     # an explicit host
 */

import { boxForBranch, describeHost } from '../../../../tools/mcp-reports/src/config.js';
import {
  getCredentials,
  getStorePath,
  mintSession,
} from '../../../../tools/mcp-reports/src/session.js';

function fail(message) {
  console.error(`\n  ✗ ${message}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    // Without this check a trailing --host swallows undefined and silently
    // mints against the branch box instead.
    const value = () => argv[++i] ?? fail(`${arg} needs a value.`);
    if (arg === '--host') args.host = value();
    else if (arg === '--branch') args.branch = value();
    else fail(`Unknown argument "${arg}".`);
  }
  if (args.host && args.branch) {
    fail('Pass --host or --branch, not both.');
  }

  if (args.branch) {
    args.host = boxForBranch(args.branch) || boxForBranch(`${args.branch}-staging`);
  }
  if (!args.host) {
    const { baseUrl, branch, branchReason } = describeHost();
    if (!baseUrl) {
      const why = branch
        ? `branch "${branch}" has no staging box`
        : `no branch to derive one from (${branchReason})`;
      fail(
        `No host to mint for: ${why}. Pass --branch <name>, or --host <url> to ` +
          'name one outright.',
      );
    }
    args.host = baseUrl;
  }

  args.host = args.host.replace(/\/+$/, '');
  if (!/^https?:\/\//.test(args.host)) {
    fail(`--host must be a full URL, got "${args.host}".`);
  }
  return args;
}

const { host } = parseArgs(process.argv.slice(2));
const credentials = getCredentials();
if (!credentials) {
  fail(
    'Set your Cut+Dry employee credentials in the environment first:\n' +
      "    export CD_ADMIN_EMAIL='you@cutanddry.com'\n" +
      "    export SECRET_CD_ADMIN_PASSWORD='...'\n\n" +
      '  They are read from the environment on purpose -- passing a password as a flag ' +
      'writes it to your shell history and exposes it in `ps`.',
  );
}

console.log(`\n  Host     ${host}`);
console.log(`  Account  ${credentials.email}\n`);

try {
  await mintSession(host, { onProgress: step => console.log(`  ✓ ${step}`) });
} catch (error) {
  fail(error.message);
}

console.log(`\n  Cached in ${getStorePath()} (0600), keyed by host.`);
console.log('  Nothing to paste and no restart: the MCP server reads it per request.\n');
console.log('  This cookie is a full impersonation credential for every internal tool,');
console.log('  valid for a year. Keep it out of shell profiles and committed files.\n');
