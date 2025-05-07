import { ContentLevel } from "./entities/content-level.entity";
import PdfDocument from "./components/pdf-document/PdfDocument";

const App = (data: any) => {
  const docData: ContentLevel = data;

  return <PdfDocument data={docData} />;
};

export default App;
