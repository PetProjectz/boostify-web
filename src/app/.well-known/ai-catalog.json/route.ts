import { MCP_SERVER_CARD_URL, mcpServerInfo, SITE_URL } from '@/mcpInfo';
import { organizationLogo } from '@/seo';

/**
 * AI Catalog for domain-level discovery: the well-known file agents and
 * registries crawl to find the AI artifacts a domain publishes. Points at the
 * MCP Server Card, which carries the connection details.
 */
const catalog = {
  specVersion: '1.0',
  host: { displayName: 'Boostify', documentationUrl: SITE_URL, logoUrl: organizationLogo },
  entries: [
    {
      identifier: 'urn:air:boostify.lk:mcp:boostify',
      type: 'application/mcp-server-card+json',
      url: MCP_SERVER_CARD_URL,
      version: mcpServerInfo.version,
      tags: ['digital-agency', 'sri-lanka', 'read-only'],
    },
  ],
};

export const dynamic = 'force-static';

export function GET() {
  return new Response(JSON.stringify(catalog, null, 2), {
    headers: {
      'Content-Type': 'application/ai-catalog+json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
