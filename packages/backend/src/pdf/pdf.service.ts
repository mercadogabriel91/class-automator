import { Injectable } from '@nestjs/common';
import { Browser, Page, LaunchOptions } from 'puppeteer';
import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
// Entities
import { ContentLevel } from '../content-level/entities/content-level.entity';
import { AdvanceLevelResponse } from '../task/entities/task-classes';

@Injectable()
export class PdfService {
  private readonly puppeteerExecutablePath =
    process.env.PUPPETEER_EXECUTABLE_PATH;
  private readonly frontendUrl = process.env.FRONTEND_URL;
  private readonly frontEndRoute = 'pdf-view';
  private readonly outputDirectory = path.resolve(
    __dirname,
    '../generated-pdfs',
  );

  /**
   * Generate PDF from ContentLevel data
   * @param data ContentLevel data to be rendered in the PDF
   * @returns Promise with PDF buffer and file path
   */
  async generatePdf(data: ContentLevel): Promise<AdvanceLevelResponse> {
    let browser: Browser | null = null;

    try {
      browser = await this.launchBrowser();
      const page = await this.setupPage(browser);
      await this.navigateToTemplate(page);
      await this.injectData(page, data);
      await this.waitForRendering(page);

      const pdf = await this.renderPdf(page);
      const outputPath = await this.savePdf(pdf as Buffer<ArrayBufferLike>);

      return { buffer: pdf, filePath: outputPath };
    } catch (error) {
      console.error('PDF Generation Error:', error);
      throw new Error(`PDF Generation Failed: ${error.message}`);
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }

  /**
   * Launch browser with optimized configurations
   */
  private async launchBrowser(): Promise<Browser> {
    const options: LaunchOptions = {
      headless: true,
      executablePath: this.puppeteerExecutablePath,
      args: [
        // Font rendering optimizations
        '--font-render-hinting=none',
        '--disable-font-subpixel-positioning',
        '--disable-features=FontPrewarming',
        '--enable-font-antialiasing',
        '--enable-font-smoothing',

        // Security and internationalization
        '--lang=zh-CN',
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
      defaultViewport: {
        width: 1600,
        height: 900,
        deviceScaleFactor: 2,
      },
    };

    return puppeteer.launch(options);
  }

  /**
   * Set up page with language headers and font styles
   */
  private async setupPage(browser: Browser): Promise<Page> {
    const page = await browser.newPage();

    // Set language preferences
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
      'Content-Type': 'text/html; charset=utf-8',
    });

    // Add comprehensive font support
    await page.addStyleTag({
      content: this.getFontStyles(),
    });

    return page;
  }

  /**
   * Navigate to the PDF template page
   */
  private async navigateToTemplate(page: Page): Promise<void> {
    await page.goto(`${this.frontendUrl}/${this.frontEndRoute}`, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });
  }

  /**
   * Inject data into the page with UTF-8 encoding safeguards
   */
  private async injectData(page: Page, data: ContentLevel): Promise<void> {
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
        el.classList.add('chinese-text');
      });
    }, data);
  }

  /**
   * Wait for fonts and content to fully render
   */
  private async waitForRendering(page: Page): Promise<void> {
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
  }

  /**
   * Render the page as PDF
   */
  private async renderPdf(
    page: Page,
  ): Promise<Buffer<ArrayBufferLike> | Uint8Array<ArrayBufferLike>> {
    return page.pdf({
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
  }

  /**
   * Save PDF to disk with timestamp
   */
  private async savePdf(pdf: Buffer): Promise<string> {
    const timestamp = new Date().toISOString().replace(/:/g, '-');

    const outputPath = path.resolve(
      this.outputDirectory,
      `document-${timestamp}.pdf`,
    );

    // Ensure output directory exists
    if (!fs.existsSync(this.outputDirectory)) {
      fs.mkdirSync(this.outputDirectory, { recursive: true });
    }

    // Write PDF file
    fs.writeFileSync(outputPath, pdf);
    console.log(`PDF saved to: ${outputPath}`);

    return outputPath;
  }

  /**
   * Get CSS styles for comprehensive font support
   */
  private getFontStyles(): string {
    return `
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
    `;
  }
}
