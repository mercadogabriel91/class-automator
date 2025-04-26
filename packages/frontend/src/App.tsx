import React from "react";
import { ContentLevel } from "./entities/content-level.entity";
import PdfDocument from './components/pdf-document/PdfDocument'

const App = (data: ContentLevel) => {
  const { songs, phonics, reading, conversations, writing, vocabulary } = data;

  const dummyData: ContentLevel = {
    id: "8700bb4d-3384-4ceb-ac72-bd4e63d80819",
    lessonNumber: 2,
    songs: ["Attack the B point", "Attack the B point"],
    phonics: {
      unit: 1,
      title: "Letter B Sounds",
      letter: "B",
      pictures: ["Bpple.png", "Bravo.png"],
    },
    reading: {
      level: "B",
      title: "Bophos",
      images: ["bpple.png", "Bophos.png"],
      titles: ["The banking", "Big bang"],
      image: "Bophos.png",
    },
    conversations: ["Hello!", "we are taking the B point"],
    writing: ["I came to B", "attack the B"],
    vocabulary: ["Bapple", "Banana", "Bcat"],
  };

  return (
    <PdfDocument data={dummyData}/>
  );
};

export default App;
