import { Injectable } from '@nestjs/common';
// Services
import { PdfService } from '../pdf/pdf.service';
import { ClassService } from '../class/class.service';
// Entities
import { Class } from '../class/entities/class.entity';
import { ContentLevel } from '../content-level/entities/content-level.entity';
import { AdvanceLevelResponse } from './entities/task-classes';

@Injectable()
export class TaskService {
  constructor(
    private readonly pdfService: PdfService,
    private readonly classService: ClassService,
  ) {}

  async advanceAllclassesLevel(): Promise<
    AdvanceLevelResponse | undefined | string
  > {
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

    const generatePdfFile: (
      currentLevel: ContentLevel,
    ) => Promise<AdvanceLevelResponse> = async (currentLevel: ContentLevel) => {
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

      /*   ---   3) Generate lesson plan pdf   ---   */
      const { filePath } = await generatePdfFile(cls.currentLevel);
      return filePath;
    }

    try {
    } catch (error) {
      console.error('Error executing task:', error);
    }
  }
}
