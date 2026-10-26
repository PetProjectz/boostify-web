import { createHash } from 'node:crypto';

import {
  MCP_URL,
  mcpDescription,
  mcpProtocolVersions,
  mcpServerInfo,
  SITE_URL,
} from '@/mcpInfo';

/**
 * MCP Server Card (SEP-2127): static metadata that lets clients and registries
 * discover the server before connecting. `<endpoint>/server-card` is the
 * spec's recommended location; `/.well-known/ai-catalog.json` links here.
 * Headers follow the extension's discovery rules (open CORS, 1h cache, ETag).
 */
const card = {
  $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
  name: 'lk.boostify/boostify',
  version: mcpServerInfo.version,
  title: mcpServerInfo.title,
  description: mcpDescription,
  websiteUrl: SITE_URL,
  repository: { url: 'https://github.com/PetProjectz/boostify-web', source: 'github' },
  icons: [{ src: `${SITE_URL}/icon.png`, mimeType: 'image/png', sizes: ['512x512'] }],
  remotes: [{ type: 'streamable-http', url: MCP_URL, supportedProtocolVersions: mcpProtocolVersions }],
};

const body = JSON.stringify(card, null, 2);
const etag = `"${createHash('sha256').update(body).digest('base64url')}"`;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET',
  'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
  'Access-Control-Expose-Headers': 'ETag',
};

const cacheHeaders = { 'Cache-Control': 'public, max-age=3600', ETag: etag };

export function GET(request: Request) {
  if (request.headers.get('if-none-match') === etag) {
    return new Response(null, { status: 304, headers: { ...corsHeaders, ...cacheHeaders } });
  }
  return new Response(body, {
    headers: { 'Content-Type': 'application/mcp-server-card+json', ...corsHeaders, ...cacheHeaders },
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}
