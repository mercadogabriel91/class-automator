import { Controller, Post, Res } from '@nestjs/common';
// Services
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  // @Post()
  // async generate(@Res() res): Promise<any> {
  //   const { buffer, filePath } = await this.pdfService.generatePdf({
  //     message: 'this is some data',
  //   });
  // }
}
