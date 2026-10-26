import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

import { expertise, founders, industries, storyParagraphs } from '@/aboutContent';
import { contactInfo } from '@/contactInfo';
import { fetchNewsFromSheet } from '@/lib/newsSheet';
import {
  companySummary,
  MCP_SERVER_CARD_URL,
  MCP_URL,
  mcpConnectHelp,
  mcpDescription,
  mcpInstructions,
  mcpServerInfo,
  mcpToolList,
  mcpTools,
  SITE_URL,
} from '@/mcpInfo';
import { services } from '@/services';
import { socialLinks } from '@/socialLinks';

/**
 * Public, read-only MCP server at https://boostify.lk/mcp. Lets AI apps
 * (Claude, ChatGPT, Cursor, ...) answer questions about Boostify from the same
 * data the website renders.
 */
const readOnly = { readOnlyHint: true, destructiveHint: false, idempotentHint: true } as const;

function json(data: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] };
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_company_info',
      {
        ...mcpTools.get_company_info,
        annotations: { ...readOnly, openWorldHint: false },
      },
      async () =>
        json({
          name: 'Boostify',
          website: SITE_URL,
          summary: companySummary,
          story: storyParagraphs,
          founders: founders.map(({ photo, ...founder }) => ({ ...founder, photo: `${SITE_URL}${photo}` })),
          contact: {
            location: contactInfo.location,
            email: contactInfo.email,
            phone: contactInfo.phone,
            whatsapp: contactInfo.whatsapp,
            whatsappLink: contactInfo.whatsappHref,
            contactPage: `${SITE_URL}/contact`,
          },
          socialLinks,
        }),
    );

    server.registerTool(
      'list_services',
      {
        ...mcpTools.list_services,
        annotations: { ...readOnly, openWorldHint: false },
      },
      async () =>
        json({
          services: services.map(({ title, description }) => ({ title, description })),
          expertise,
        }),
    );

    server.registerTool(
      'list_industries',
      {
        ...mcpTools.list_industries,
        annotations: { ...readOnly, openWorldHint: false },
      },
      async () => json({ industries }),
    );

    server.registerTool(
      'get_news',
      {
        ...mcpTools.get_news,
        inputSchema: z.object({
          limit: z.number().int().min(1).max(50).optional().describe('Maximum number of posts to return. Defaults to all.'),
        }),
        annotations: { ...readOnly, openWorldHint: true },
      },
      async ({ limit }) => {
        try {
          const news = await fetchNewsFromSheet();
          return json({ news: limit ? news.slice(0, limit) : news, newsPage: `${SITE_URL}/news` });
        } catch (error) {
          console.error('MCP get_news failed', error);
          return {
            content: [{ type: 'text' as const, text: `News is unavailable right now. See ${SITE_URL}/news instead.` }],
            isError: true,
          };
        }
      },
    );
  },
  {
    serverInfo: { name: mcpServerInfo.name, version: mcpServerInfo.version },
    instructions: mcpInstructions,
  },
);

/**
 * MCP clients only GET this endpoint to open an SSE stream (and always accept
 * `text/event-stream`); those still go to the handler. Any other GET is a
 * browser or an AI web-lookup tool, so describe the server instead of
 * answering with a bare 405.
 */
function GET(request: Request) {
  if (request.headers.get('accept')?.includes('text/event-stream')) {
    return handler(request);
  }
  return Response.json({
    name: mcpServerInfo.title,
    description: mcpDescription,
    about: mcpConnectHelp,
    endpoint: MCP_URL,
    transport: 'streamable-http',
    authentication: 'none',
    tools: mcpToolList,
    serverCard: MCP_SERVER_CARD_URL,
    website: SITE_URL,
  });
}

export { GET, handler as POST };
