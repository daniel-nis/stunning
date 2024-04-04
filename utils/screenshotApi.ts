import { IncomingHttpHeaders } from 'http';

const API_ENDPOINT = 'https://api.webgrab.work/screenshot';

interface ScreenshotOptions {
  width?: number;
  height?: number;
  format?: 'jpeg' | 'png' | 'webp';
  fullPage?: boolean;
  quality?: number;
  scale?: number;
  skipCookieConsent?: boolean;
  delay?: number;
  ua?: string;
  cookie?: string;
  omiBackground?: boolean;
}

export async function takeScreenshot(
  url: string,
  options: ScreenshotOptions = {}
): Promise<string> {
  const headersArray: [string, string][] = Object.entries({
    'api-key': process.env.SCREENSHOT_API_KEY || '',
  });

  const queryParams = new URLSearchParams(
    Object.entries({
      url,
      ...options,
    }).filter(([_, value]) => value !== undefined) as [string, string][]
  );

  const response = await fetch(`${API_ENDPOINT}?${queryParams}`, {
    headers: headersArray,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Screenshot API error: ${error}`);
  }

  return response.text();
}

export async function fetchScreenshot(screenshotUrl: string): Promise<Buffer> {
  const response = await fetch(screenshotUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch screenshot: ${response.statusText}`);
  }

  const screenshotArrayBuffer = await response.arrayBuffer();
  const screenshotBuffer = Buffer.from(screenshotArrayBuffer);

  return screenshotBuffer;
}