import { ContentLevel } from "./entities/content-level.entity";
import PdfDocument from "./components/pdf-document/PdfDocument";

const App = (data: ContentLevel) => {
  const dummyData: ContentLevel = {
    id: "8700bb4d-3384-4ceb-ac72-bd4e63d80819",
    lessonNumber: 2,
    songs: ["Attack the B point", "Attack the B point"],
    phonics: {
      unit: 2,
      title: "Letter B Sounds",
      letter: "B",
      pictures: ["bookSample.png", "writingSample.png"],
    },
    reading: {
      level: "B",
      title: "RAZ A",
      images: ["bookSample.png", "Bophos.png"],
      titles: ["30. This is my halloween", "31. Halloween houses"],
      image: "Bophos.png",
    },
    conversations: ["Hello!", "we are taking the B point"],
    writing: ["writingSample.png"],
    vocabulary: ["Bapple", "Banana", "Bcat", "Bonk"],
  };

  return <PdfDocument data={dummyData} />;
};

export default App;
