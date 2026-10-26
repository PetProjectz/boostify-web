import { industries } from '@/aboutContent';
import { contactInfo } from '@/contactInfo';
import { companySummary, MCP_SERVER_CARD_URL, MCP_URL, mcpToolList, SITE_URL } from '@/mcpInfo';
import { services } from '@/services';

/**
 * llms.txt (https://llmstxt.org): a Markdown summary of the site for AI tools,
 * built from the same data the pages and the MCP server use.
 */
const llmsTxt = `# Boostify

> ${companySummary}

Boostify is a digital agency based in ${contactInfo.location}, offering web and mobile development, digital marketing, social media, and business process automation.

## Pages

- [Home](${SITE_URL}/): services, why clients choose Boostify, and client work
- [About](${SITE_URL}/about): company story, founders, expertise, and industries served
- [News](${SITE_URL}/news): latest news and updates
- [Contact](${SITE_URL}/contact): contact details and enquiry form

## Services

${services.map(({ title, description }) => `- **${title}**: ${description}`).join('\n')}

## Industries

${industries.map(({ title, description }) => `- **${title}**: ${description}`).join('\n')}

## Contact

- Location: ${contactInfo.location}
- Email: ${contactInfo.email}
- Phone: ${contactInfo.phone}
- WhatsApp: ${contactInfo.whatsappHref}

## MCP server

Boostify runs a public, read-only Model Context Protocol (MCP) server at ${MCP_URL} (Streamable HTTP, no authentication). Add it as a remote MCP server (custom connector) in an MCP-capable AI app to query Boostify's data directly. Tools:

${mcpToolList.map(({ name, description }) => `- \`${name}\`: ${description}`).join('\n')}

- [MCP Server Card](${MCP_SERVER_CARD_URL}): connection metadata for MCP clients
`;

export const dynamic = 'force-static';

export function GET() {
  return new Response(llmsTxt, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
