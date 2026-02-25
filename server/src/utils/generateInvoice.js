import PDFDocument from "pdfkit";
import { finished } from "stream/promises";
import fs from "fs";
import path from "path";

export const generateInvoice = async (data, filePath) => {
  
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const doc = new PDFDocument({ size: "A4", margin: 50 });
  const writeStream = fs.createWriteStream(filePath);

  doc.pipe(writeStream);

  /* =========================
     HEADER
  ========================= */
  doc
    .fontSize(20)
    .text(data.seller.name || "COMPANY NAME", 50, 45);

  doc
    .fontSize(10)
    .text("INVOICE", 400, 50, { align: "right" })
    .text(`Invoice No: ${data.invoiceNumber}`, { align: "right" })
    .text(`Date: ${data.invoiceDate}`, { align: "right" });

  doc.moveDown(2);
  doc.moveTo(50, 110).lineTo(550, 110).stroke();

  /* =========================
     SELLER & CUSTOMER
  ========================= */
  doc.moveDown();

  doc.fontSize(11).text("Seller", 50, 130);
  doc
    .fontSize(10)
    .text(data.seller.name)
    .text(data.seller.address);

  doc.fontSize(11).text("Bill To", 350, 130);
  doc
    .fontSize(10)
    .text(data.customer.name)
    .text(data.customer.email)
    .text(data.customer.address);

  doc.moveDown(3);

  /* =========================
     ITEMS TABLE HEADER
  ========================= */
  const tableTop = 230;

  doc.fontSize(10);
  doc.text("No", 50, tableTop);
  doc.text("Item", 90, tableTop);
  doc.text("Qty", 350, tableTop, { width: 50, align: "right" });
  doc.text("Price", 420, tableTop, { width: 60, align: "right" });
  doc.text("Total", 490, tableTop, { width: 60, align: "right" });

  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  /* =========================
     ITEMS ROWS
  ========================= */
  let position = tableTop + 25;

  data.items.forEach((item, i) => {
    const itemTotal = item.quantity * item.price;

    doc
      .fontSize(10)
      .text(i + 1, 50, position)
      .text(item.name, 90, position, { width: 240 })
      .text(item.quantity, 350, position, { width: 50, align: "right" })
      .text(`₹${item.price}`, 420, position, { width: 60, align: "right" })
      .text(`₹${itemTotal}`, 490, position, { width: 60, align: "right" });

    position += 25;
  });

  doc.moveDown(2);

  /* =========================
     TOTAL SECTION
  ========================= */
  doc.moveTo(350, position).lineTo(550, position).stroke();

  doc
    .fontSize(10)
    .text("Subtotal:", 400, position + 10, { align: "right" })
    .text(`₹${data.subTotal}`, 550, position + 10, { align: "right" });

  doc
    .text("Tax:", 400, position + 25, { align: "right" })
    .text(`₹${data.tax}`, 550, position + 25, { align: "right" });

  doc
    .fontSize(11)
    .text("Grand Total:", 400, position + 45, { align: "right" })
    .text(`₹${data.total}`, 550, position + 45, { align: "right" });

  doc.moveDown(4);

  /* =========================
     FOOTER
  ========================= */
  doc
    .fontSize(9)
    .text(
      "This is a system generated invoice. Thank you for your business.",
      50,
      760,
      { align: "center" }
    );

  doc.end();
  await finished(writeStream);
};
