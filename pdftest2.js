const PDFPrinter = require("pdfmake");
const fs = require("fs");

const fonts = require("./fonts.js");
const styles = require("./styes.js");

const { content } = require("./pdfAdeudo");
let docDefinition = {
  content: content,
  styles: styles,
};

let printer = new PDFPrinter(fonts);
let pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("pdfs/pdftestA.pdf"));
pdfDoc.end();
