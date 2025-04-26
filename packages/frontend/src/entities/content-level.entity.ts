export type ContentLevel = {
  id: string;

  lessonNumber: number;

  songs: string[];

  phonics: {
    unit: number;
    letter: string;
    title: string;
    pictures: string[];
  };

  reading: {
    level: string;
    title: string;
    titles: string[];
    image: string;
    images: string[];
  };

  conversations: string[];

  writing: string[];

  vocabulary: string[];
};
