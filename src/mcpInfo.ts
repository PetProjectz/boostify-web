import { SUPPORTED_PROTOCOL_VERSIONS } from '@modelcontextprotocol/server';

/**
 * Public description of the Boostify MCP server. The server itself
 * (`src/app/mcp/route.ts`) and its discovery documents (plain `GET /mcp`,
 * `/mcp/server-card`, `/.well-known/ai-catalog.json`, `/llms.txt`) all read
 * from here, so what they advertise can't drift from what the server serves.
 */
export const SITE_URL = 'https://boostify.lk';
export const MCP_URL = `${SITE_URL}/mcp`;
export const MCP_SERVER_CARD_URL = `${MCP_URL}/server-card`;

export const companySummary =
  'Boostify combines technology, strategy, and creative excellence to help ambitious businesses grow faster and lead confidently in the digital world.';

export const mcpServerInfo = { name: 'boostify', title: 'Boostify', version: '1.0.0' } as const;

/** One-line summary for discovery documents (Server Cards cap it at 100 characters). */
export const mcpDescription = 'Read-only info about Boostify: company, services, industries served, and latest news.';

export const mcpInstructions =
  'Read-only information about Boostify, a digital agency in Sri Lanka (web and mobile development, digital marketing, social media, business process automation). Use these tools to answer questions about the company, its services, the industries it serves, and its latest news. For enquiries, point people to the contact details from get_company_info.';

export const mcpProtocolVersions = [...SUPPORTED_PROTOCOL_VERSIONS];

export const mcpConnectHelp = `This is a Model Context Protocol (MCP) endpoint, not a web page. To use it, add ${MCP_URL} as a remote MCP server (custom connector) in an MCP-capable AI app such as Claude, ChatGPT, or Cursor. Transport: Streamable HTTP. No authentication required.`;

export const mcpTools = {
  get_company_info: {
    title: 'Get company info',
    description:
      'Who Boostify is: company background, founders, contact details (email, phone, WhatsApp, location), and social media links.',
  },
  list_services: {
    title: 'List services',
    description:
      "Boostify's core services, plus the wider areas of expertise the team works in (development, marketing, automation, branding, media production).",
  },
  list_industries: {
    title: 'List industries',
    description: 'The industries Boostify serves, with the kind of work done in each.',
  },
  get_news: {
    title: 'Get news',
    description: 'Latest news and updates posted by Boostify, read live from the source the /news page uses.',
  },
} as const;

export const mcpToolList = Object.entries(mcpTools).map(([name, tool]) => ({ name, ...tool }));
