import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
// Entities
import { ContentLevel } from '../content-level/entities/content-level.entity';

@Injectable()
export class PdfService {
  private readonly puppeteerExecutablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH;
  private readonly frontendUrl = process.env.FRONTEND_URL;

  async generatePdf(data: ContentLevel): Promise<{
    buffer: Uint8Array<ArrayBufferLike>;
    filePath: string;
  }> {
    try {
      // Launch browser with comprehensive font support
      const browser = await puppeteer.launch({
        headless: true,
        executablePath: this.puppeteerExecutablePath,
        args: [
          // Font and rendering arguments
          '--font-render-hinting=none',
          '--disable-font-subpixel-positioning',
          '--disable-features=FontPrewarming',

          // International support
          '--lang=zh-CN',
          '--no-sandbox',
          '--disable-setuid-sandbox',

          // Additional font rendering flags
          '--enable-font-antialiasing',
          '--enable-font-smoothing',
        ],

        // Enhanced viewport for font clarity
        defaultViewport: {
          width: 1600,
          height: 900,
          deviceScaleFactor: 2,
        },
      });

      const page = await browser.newPage();

      // Set language preferences
      await page.setExtraHTTPHeaders({
        'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
        'Content-Type': 'text/html; charset=utf-8',
      });

      // Comprehensive font and character support CSS
      await page.addStyleTag({
        content: `
          /* Comprehensive Font Support */
          @font-face {
            font-family: 'Noto Sans CJK SC';
            src: local('Noto Sans CJK SC Regular'),
                 local('NotoSansCJKSC-Regular'),
                 url('https://fonts.gstatic.com/ea/notosanscjksc/v1/NotoSansCJKsc-Regular.woff2') format('woff2');
            font-weight: 400;
            font-style: normal;
          }

          body, html {
            font-family: 
              'Noto Sans CJK SC', 
              'PingFang SC', 
              'Heiti SC', 
              'Microsoft YaHei', 
              'Songti SC', 
              '-apple-system', 
              'BlinkMacSystemFont', 
              'Segoe UI', 
              'Roboto', 
              'Helvetica', 
              'Arial', 
              sans-serif !important;
            font-feature-settings: 'liga' 1;
            -webkit-font-smoothing: antialiased;
            text-rendering: optimizeLegibility;
          }

          /* Ensure Chinese characters are rendered */
          .chinese-text {
            font-family: 
              'Noto Sans CJK SC', 
              'PingFang SC', 
              'Heiti SC', 
              'Microsoft YaHei' !important;
            font-size: 16px !important;
          }

          /* Force UTF-8 encoding */
          @charset "UTF-8";
        `,
      });

      // Navigate to PDF view with longer timeout
      await page.goto(`${this.frontendUrl}/pdf-view`, {
        waitUntil: 'networkidle0',
        timeout: 60000,
      });

      // Inject data with UTF-8 encoding safeguards
      await page.evaluate((injectedData) => {
        // Ensure proper encoding
        const encoder = new TextEncoder();
        const decoder = new TextDecoder('utf-8');

        // Convert data to ensure proper UTF-8 handling
        const safeData = JSON.parse(
          decoder.decode(encoder.encode(JSON.stringify(injectedData))),
        );

        // Set global variable with safe data
        window.__PDF_DATA__ = safeData;

        // Debug: Log potential Chinese content areas
        console.log('Injected Data Keys:', Object.keys(safeData));

        // Dispatch event
        document.dispatchEvent(
          new CustomEvent('pdf-data-ready', {
            detail: safeData,
          }),
        );

        // Force Chinese text rendering
        const chineseElements = document.querySelectorAll(
          '[lang="zh-CN"], .chinese-text',
        );
        chineseElements.forEach((el) => {
          console.log('Chinese Element Content:', el.textContent);
          el.classList.add('chinese-text');
        });
      }, data);

      // Enhanced font and content loading wait
      await page.evaluate(() => {
        return new Promise<void>((resolve) => {
          // Wait for fonts to load
          document.fonts.ready.then(() => {
            console.log('Fonts loaded completely');

            // Additional wait to ensure rendering
            setTimeout(resolve, 3000);
          });
        });
      });

      // Generate PDF with enhanced options
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
          top: '10mm',
          right: '10mm',
          bottom: '10mm',
          left: '10mm',
        },
        tagged: true,
        displayHeaderFooter: false,
      });

      await browser.close();

      // Save PDF
      const timestamp = new Date().toISOString().replace(/:/g, '-');
      const outputPath = path.resolve(
        __dirname,
        '../generated-pdfs',
        `document-${timestamp}.pdf`,
      );

      // Ensure output directory exists
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Write PDF file with UTF-8 encoding
      fs.writeFileSync(outputPath, pdf);
      console.log(`PDF saved to: ${outputPath}`);

      return { buffer: pdf, filePath: outputPath };
    } catch (error) {
      console.error('Detailed PDF Generation Error:', error);
      throw new Error(`Comprehensive PDF Generation Failure: ${error.message}`);
    }
  }
}
