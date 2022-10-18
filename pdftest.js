const PDFPrinter = require("pdfmake");
const fs = require("fs");

const fonts = require("./fonts.js");

const styles = require("./styes.js");
const { content } = require("./pdfNoAdeudo.js");

let docDefinition = {
  content: content,
  styles: styles,
};

const printer = new PDFPrinter(fonts);
let pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("pdfs/pdftest.pdf"));

pdfDoc.end();
