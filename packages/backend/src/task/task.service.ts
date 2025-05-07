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

  async advanceAllclassesLevel(): Promise<string | undefined> {
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

      /*   ---   3) Generate lesson plan pdf   ---   */
      const dummyData: ContentLevel = {
        id: '8700bb4d-3384-4ceb-ac72-bd4e63d80819',
        lessonNumber: 2,
        songs: ['Attack the B point', 'Attack the B point'],
        phonics: {
          unit: 2,
          title: 'Letter B Sounds',
          letter: 'B',
          pictures: ['bookSample.png', 'writingSample.png'],
        },
        reading: {
          level: 'B',
          title: 'RAZ A',
          images: ['bookSample.png', 'Bophos.png'],
          titles: ['30. This is my halloween', '31. Halloween houses'],
          image: 'Bophos.png',
        },
        conversations: ['Hello!', 'we are taking the B point'],
        writing: ['writingSample.png'],
        vocabulary: ['BBB', 'BBB', 'BBB', 'BBB'],
      };

      const { filePath } = await generatePdfFile(dummyData);

      return filePath;

      // console.log(currentLevel);
    }

    try {
    } catch (error) {
      console.error('Error executing task:', error);
    }
  }
}
