// packages/frontend/src/server-render.tsx
import React from "react";
import ReactDOMServer from "react-dom/server";
// @ts-ignore
import App from "./App.tsx"; // Or whatever component you want to render
//import { createStylesString } from "./styles"; // If you're using CSS-in-JS


// Export a function that takes data and returns rendered HTML
export function renderToHtml(data: any): string {
  const appHtml = ReactDOMServer.renderToString(<App {...data} />);
  //const stylesString = createStylesString(); // If using CSS-in-JS

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>PDF Document</title>
       
      </head>
      <body>
        <div id="root">${appHtml}</div>
      </body>
    </html>
  `;
}
