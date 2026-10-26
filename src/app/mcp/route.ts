import { createMcpHandler } from 'mcp-handler';
import { z } from 'zod';

import { expertise, founders, industries, storyParagraphs } from '@/aboutContent';
import { contactInfo } from '@/contactInfo';
import { fetchNewsFromSheet } from '@/lib/newsSheet';
import { services } from '@/services';
import { socialLinks } from '@/socialLinks';

/**
 * Public, read-only MCP server at https://boostify.lk/mcp. Lets AI apps
 * (Claude, ChatGPT, Cursor, ...) answer questions about Boostify from the same
 * data the website renders.
 */
const SITE_URL = 'https://boostify.lk';

const readOnly = { readOnlyHint: true, destructiveHint: false, idempotentHint: true } as const;

function json(data: unknown) {
  return { content: [{ type: 'text' as const, text: JSON.stringify(data, null, 2) }] };
}

const handler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_company_info',
      {
        title: 'Get company info',
        description:
          'Who Boostify is: company background, founders, contact details (email, phone, WhatsApp, location), and social media links.',
        annotations: { ...readOnly, openWorldHint: false },
      },
      async () =>
        json({
          name: 'Boostify',
          website: SITE_URL,
          summary:
            'Boostify combines technology, strategy, and creative excellence to help ambitious businesses grow faster and lead confidently in the digital world.',
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
        title: 'List services',
        description:
          "Boostify's core services, plus the wider areas of expertise the team works in (development, marketing, automation, branding, media production).",
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
        title: 'List industries',
        description: 'The industries Boostify serves, with the kind of work done in each.',
        annotations: { ...readOnly, openWorldHint: false },
      },
      async () => json({ industries }),
    );

    server.registerTool(
      'get_news',
      {
        title: 'Get news',
        description: 'Latest news and updates posted by Boostify, read live from the source the /news page uses.',
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
    serverInfo: { name: 'boostify', version: '1.0.0' },
    instructions:
      'Read-only information about Boostify, a digital agency in Sri Lanka (web and mobile development, digital marketing, social media, business process automation). Use these tools to answer questions about the company, its services, the industries it serves, and its latest news. For enquiries, point people to the contact details from get_company_info.',
  },
);

export { handler as GET, handler as POST };
