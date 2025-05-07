import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
// Entities
import { ContentLevel } from '../content-level/entities/content-level.entity';

@Injectable()
export class PdfService {
  async generatePdf(data: ContentLevel): Promise<{
    buffer: Uint8Array<ArrayBufferLike>;
    filePath: string;
  }> {
    const frontendUrl: string = 'http://localhost:5173';
    try {
      // Launch headless browser
      const browser = await puppeteer.launch({
        headless: true,
        executablePath:
          '/Users/gaben/.cache/puppeteer/chrome/mac_arm-136.0.7103.49/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      // Navigate to the PDF view route
      await page.goto(`${frontendUrl}/pdf-view`, {
        waitUntil: 'networkidle0',
      });

      // Inject the data into the page
      await page.evaluate((injectedData) => {
        // Set global variable for the frontend
        window.__PDF_DATA__ = injectedData;

        // Also dispatch an event to notify components
        document.dispatchEvent(
          new CustomEvent('pdf-data-ready', {
            detail: injectedData,
          }),
        );
      }, data);

      // Wait for the render-complete signal (or timeout after 10 seconds)
      try {
        await page.waitForSelector('#pdf-render-complete', {
          timeout: 10000,
        });
      } catch (e) {
        console.warn(
          'Timeout waiting for render complete signal - generating PDF anyway',
        );
      }

      // Generate PDF
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '20mm',
          bottom: '20mm',
          left: '20mm',
        },
      });

      await browser.close();

      // Generate a timestamp for the filename
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const outputPath = path.resolve(
        __dirname,
        '../generated-pdfs',
        `document-${timestamp}.pdf`,
      );

      // Ensure directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Save PDF to file
      fs.writeFileSync(outputPath, pdf);
      console.log(`PDF saved to: ${outputPath}`);

      return { buffer: pdf, filePath: outputPath };
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error(`Failed to generate PDF: ${error.message}`);
    }
  }
}
