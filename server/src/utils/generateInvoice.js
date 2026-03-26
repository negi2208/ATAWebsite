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
     HEADER (Logo + Clean UI)
  ========================= */

  const logoPath = path.join(process.cwd(), "assets", "logo.png");

  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 50, 35, { width: 80 });
  }

  doc
    .fontSize(20)
    .text(data.seller.name || "COMPANY NAME", 160, 45);

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

  doc.fontSize(11).text("Seller", 50, 130);

  doc
    .fontSize(10)
    .text(data.seller.name, 50, 145, { width: 250 })
    .text(
      data.seller.address.trim().replace(/\n\s+/g, "\n"),
      { width: 250 })

  doc.fontSize(11).text("Bill To", 350, 130);

  doc
    .fontSize(10)
    .text(data.customer.name, 350, 145)
    .text(data.customer.email)
    .text(data.customer.address);


  /* =========================
     ITEMS TABLE
  ========================= */

  const tableTop = 230;

  doc.fontSize(10);

  doc.text("Item", 50, tableTop);
  doc.text("Qty", 330, tableTop);
  doc.text("Price", 400, tableTop);
  doc.text("Total", 470, tableTop);

  doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();

  let position = tableTop + 25;

  data.items.forEach((item) => {

    const itemTotal = item.quantity * item.price;

    doc
      .fontSize(10)
      .text(item.name, 50, position, { width: 250 })
      .text(item.quantity, 330, position)
      .text(`${item.price}`, 400, position)
      .text(`${itemTotal}`, 470, position);

    position += 25;
  });


  /* =========================
     TOTAL SECTION
  ========================= */

  doc.moveTo(330, position).lineTo(550, position).stroke();

  doc
    .text("Subtotal:", 350, position + 10)
    .text(`${data.subTotal}`, 470, position + 10);

  doc
    .text("Tax:", 350, position + 30)
    .text(`${data.tax}`, 470, position + 30);

  doc
    .fontSize(11)
    .text("Grand Total:", 350, position + 55)
    .text(`${data.total}`, 470, position + 55);


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