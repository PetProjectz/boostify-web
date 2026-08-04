export interface NewsItem {
  title: string;
  paragraphs: string[];
  image: string;
  date: string;
}

// Public Google Sheet ("Boostify News") shared as "anyone with the link can view".
const DEFAULT_SHEET_ID = '13zW_uSBf5Z-s4p9Ucnnw_ma_DoRZvf9QRfUHlmCMalQ';
const SHEET_ID = process.env.GOOGLE_SHEETS_NEWS_ID || DEFAULT_SHEET_ID;

// Google Visualization API: reads a published sheet's data as JSON without
// requiring an API key. Response is wrapped in a JSONP-style callback.
const SHEET_ENDPOINT = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=0`;

type GVizCell = { v: unknown; f?: string } | null;
type GVizRow = { c: GVizCell[] };

function driveShareLinkToImageUrl(url: string): string {
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (!match) return url;
  return `https://lh3.googleusercontent.com/d/${match[1]}`;
}

function cellText(cell: GVizCell): string {
  if (!cell) return '';
  if (typeof cell.f === 'string') return cell.f;
  return typeof cell.v === 'string' ? cell.v : String(cell.v ?? '');
}

/**
 * Fetches the Boostify News sheet in real time (no caching) so the /news
 * page always reflects the current spreadsheet contents.
 */
export async function fetchNewsFromSheet(): Promise<NewsItem[]> {
  const res = await fetch(SHEET_ENDPOINT, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch news sheet: ${res.status}`);
  }

  const text = await res.text();
  const start = text.indexOf('setResponse(') + 'setResponse('.length;
  const end = text.lastIndexOf(');');
  const data = JSON.parse(text.slice(start, end));

  const rows: GVizRow[] = data?.table?.rows ?? [];

  return rows
    .map((row): NewsItem | null => {
      const [titleCell, para1Cell, para2Cell, imageCell, dateCell] = row.c;
      const title = cellText(titleCell);
      if (!title) return null;

      const paragraphs = [cellText(para1Cell), cellText(para2Cell)].filter(Boolean);
      const rawImage = cellText(imageCell);

      return {
        title,
        paragraphs,
        image: rawImage ? driveShareLinkToImageUrl(rawImage) : '',
        date: cellText(dateCell),
      };
    })
    .filter((item): item is NewsItem => item !== null);
}
