export const BACKGROUND_MARKER = /^<!--bg:(.*?)-->\s*/;
const WP_TOC_REGEX = /^Contents[\s\S]*?(?=^##|^###|^\S)/m;

function stripWordpressTOC(markdown: string) {
  return markdown.replace(WP_TOC_REGEX, (segment) => {
    if (segment.includes('[Toggle') || segment.includes('ez-toc')) {
      return '';
    }
    return segment;
  });
}

export function sanitizeMarkdown(markdown: string) {
  if (!markdown) return '';
  return stripWordpressTOC(markdown)
    .replace(/^\s*Contents[^\n]*$/gim, '')
    .replace(/^\s*Toggle[^\n]*$/gim, '')
    .trim();
}

export function splitMarkdownMetadata(markdown: string | null | undefined) {
  if (!markdown) {
    return { content: '', backgroundImage: '' };
  }
  const match = markdown.match(BACKGROUND_MARKER);
  if (!match) {
    return { content: sanitizeMarkdown(markdown), backgroundImage: '' };
  }
  const content = markdown.slice(match[0].length).trimStart();
  return {
    content: sanitizeMarkdown(content),
    backgroundImage: match[1],
  };
}

export function injectBackgroundMetadata(content: string, backgroundImage?: string) {
  const body = sanitizeMarkdown(content?.trim() || '');
  if (!backgroundImage) {
    return body;
  }
  return `<!--bg:${backgroundImage}-->\n\n${body}`;
}

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9가-힣\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export function extractHeadings(markdown: string) {
  const regex = /^#{2,3}\s+(.+)$/gm;
  const headings: { text: string; level: number; id: string }[] = [];
  let match;
  while ((match = regex.exec(markdown))) {
    const raw = match[1].trim();
    headings.push({
      text: raw,
      level: match[0].startsWith('###') ? 3 : 2,
      id: slugify(raw),
    });
  }
  return headings;
}

export function plainText(children: any): string {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map((child) => plainText(child)).join('');
  }
  if (typeof children === 'object' && children && 'props' in children) {
    return plainText(children.props?.children);
  }
  return '';
}
