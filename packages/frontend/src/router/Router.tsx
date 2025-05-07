import { createBrowserRouter, RouterProvider } from "react-router-dom";
// @ts-expect-error
import App from "../App.tsx";
import PdfView from "../views/PdfView";

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/pdf-view",
    element: <PdfView />,
  },
]);

export default router;
