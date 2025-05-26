import { ApiProperty } from '@nestjs/swagger';

export class AdvanceLevelResponse {
  @ApiProperty({
    description: 'Binary data buffer containing the processed file content',
    example: 'Uint8Array(1024) [137, 80, 78, 71, 13, 10, 26, 10, ...]',
    type: 'string',
    format: 'binary',
  })
  buffer: Uint8Array<ArrayBufferLike>;

  @ApiProperty({
    description: 'File path or name of the generated/processed file',
    example: 'generated-pdfs/document-2025-05-25T06-20-37.425Z.pdf',
  })
  filePath: string;
}
