import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// @ts-expect-error
import App from "../App.tsx";

const PdfView: React.FC = () => {
  const dummyData = {
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

  const [searchParams] = useSearchParams();
  const [pdfData, setPdfData] = useState<any>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Method 1: Get data from URL query params if present
    const dataParam = searchParams.get("data");
    if (dataParam) {
      console.log(dataParam);
      try {
        const parsedData = JSON.parse(decodeURIComponent(dataParam));
        setPdfData(parsedData);
      } catch (e) {
        console.error("Error parsing data from URL:", e);
      }
    }

    // Method 2: Get data injected by Puppeteer
    if (window.__PDF_DATA__) {
      setPdfData(window.__PDF_DATA__);
    }

    // Listen for the custom event from Puppeteer
    const handlePdfDataReady = (event: CustomEvent) => {
      setPdfData(event.detail);
    };

    document.addEventListener(
      "pdf-data-ready",
      handlePdfDataReady as EventListener
    );

    return () => {
      document.removeEventListener(
        "pdf-data-ready",
        handlePdfDataReady as EventListener
      );
    };
  }, [searchParams]);

  useEffect(() => {
    if (pdfData) {
      // Give components time to render with the data
      const timer = setTimeout(() => {
        setIsReady(true);

        // Create a signal element for Puppeteer to detect
        const signalElement = document.createElement("div");
        signalElement.id = "pdf-render-complete";
        signalElement.style.display = "none";
        document.body.appendChild(signalElement);
      }, 1000); // Adjust timing based on component complexity

      return () => clearTimeout(timer);
    }
  }, [pdfData]);

  if (!pdfData) {
    return <div>Loading PDF data...</div>;
  }

  // Apply PDF-specific styles
  return (
    <div className="pdf-container">
      {/* Pass the data to your existing component */}
      <App {...pdfData} />
      {isReady && <div id="pdf-render-complete" style={{ display: "none" }} />}
    </div>
  );
};

export default PdfView;
