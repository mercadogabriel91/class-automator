import { Injectable } from '@nestjs/common';
// Services
import { ContentLevelService } from '../content-level/content-level.service';
import { PdfService } from '../pdf/pdf.service';
import { ClassService } from '../class/class.service';
// Entities
import { Class } from '../class/entities/class.entity';
import { ContentLevel } from '../content-level/entities/content-level.entity';

@Injectable()
export class TaskService {
  constructor(
    private readonly contentLevelService: ContentLevelService,
    private readonly pdfService: PdfService,
    private readonly classService: ClassService,
  ) {}

  async advanceAllclassesLevel(): Promise<void | any> {
    const findAllAutomatedClasses: () => Promise<Class[]> = async () => {
      try {
        return await this.classService.findAllAutomatedClasses();
      } catch (error) {
        throw new Error(`Error finding automated classes: ${error}`);
      }
    };

    const advanceClassLevel = async (classId: string): Promise<Class> => {
      try {
        return await this.classService.advanceToNextLevel(classId);
      } catch (error) {
        throw new Error(`Error advancing class ${classId}:`, error);
      }
    };

    const generatePdfFile: (currentLevel: ContentLevel) => Promise<{
      buffer: Uint8Array<ArrayBufferLike>;
      filePath: string;
    }> = async (currentLevel: ContentLevel) => {
      try {
        return await this.pdfService.generatePdf(currentLevel);
      } catch (error) {
        throw new Error(`Error generating PDF file for current level:`, error);
      }
    };

    /*     ---   1) Get all automated classes     ---     */
    const automatedC: Class[] = await findAllAutomatedClasses();

    for (const cls of automatedC) {
      /*   ---   2) Advance each class to the next level   ---   */
      // const advCls: Class = await advanceClassLevel(cls.id);
      // const { currentLevel } = advCls;

      // /*   ---   3) Generate lesson plan pdf   ---   */
      // await generatePdfFile(currentLevel);

      // console.log(currentLevel);
    }

    try {
      //   // 3) Generate lesson plan pdf
      //   await this.pdfService.generatePdf({
      //     message: `created by teacher id: 67478a61-9cd7-4297-867e-514a7b652986`,
      //   });
      // 4) Send the lesson plan file
    } catch (error) {
      console.error('Error executing task:', error);
    }
  }
}
