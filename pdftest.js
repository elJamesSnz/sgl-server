const PDFPrinter = require("pdfmake");
const fs = require("fs");
const PDFPrinter1 = require("pdfmake");
const fs1 = require("fs");

const fonts = require("./fonts.js");
const styles = require("./styes.js");
const fonts1 = require("./fonts.js");
const styles1 = require("./styes.js");
const { content } = require("./pdfNoAdeudo");
const { content1 } = require("./pdfAdeudo");
let docDefinition = {
  content: content,
  styles: styles,
};

let docDefinition1 = {
  content1: content1,
  styles1: styles1,
};
let printer = new PDFPrinter(fonts);
let pdfDoc = printer.createPdfKitDocument(docDefinition);
pdfDoc.pipe(fs.createWriteStream("pdfs/pdftestN.pdf"));
pdfDoc.end();

let printer1 = new PDFPrinter1(fonts1);
let pdfDoc1 = printer1.createPdfKitDocument(docDefinition1);
pdfDoc1.pipe(fs1.createWriteStream("pdfs/pdftestA.pdf"));
pdfDoc1.end();
