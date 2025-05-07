/**
 *
 * Add the global window property for PDF data
 *
 **/

declare global {
  interface Window {
    __PDF_DATA__?: any;
  }
}

export {};
