import { Controller, Post, Res } from '@nestjs/common';
// Services
import { PdfService } from './pdf.service';

@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}
}
