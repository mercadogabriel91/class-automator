import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class PdfService {
  async generatePdf(data: any): Promise<{
    buffer: Buffer | Uint8Array<ArrayBufferLike>;
    filePath: string;
  }> {
    const { renderToHtml } = await import(
      '../../../frontend/dist/ssr/server-render.cjs'
    );
    // Use the frontend's render function
    const html = renderToHtml(data);

    // Launch puppeteer using Mac's Chrome path
    const browser = await puppeteer.launch({
      headless: true,
      executablePath:
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
      args: ['--no-sandbox'],
    });

    // Create page
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
    });

    await browser.close();

    // Create a directory for PDFs if it doesn't exist
    const pdfDir = path.join(process.cwd(), 'generated-pdfs');
    if (!fs.existsSync(pdfDir)) {
      fs.mkdirSync(pdfDir, { recursive: true });
    }

    // Generate a unique filename with timestamp
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `document-${timestamp}.pdf`;
    const filePath = path.join(pdfDir, filename);

    // Write the PDF to disk
    fs.writeFileSync(filePath, pdf);

    console.log(`PDF saved to: ${filePath}`);

    // Return both the buffer and the file path
    return {
      buffer: pdf,
      filePath,
    };
  }
}
