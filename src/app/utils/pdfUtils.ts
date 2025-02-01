import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * Generate a PDF invoice and save it to a temporary file.
 * @param orderId - The order ID.
 * @param customerName - The customer's name.
 * @param amount - The total amount.
 * @param items - The list of items in the order.
 * @param date - The order date.
 * @returns The file path of the generated PDF.
 */
export const generateInvoicePDF = async (
  orderId: string,
  customerName: string,
  amount: number,
  items: { name: string; quantity: number; price: number }[],
  date?: any
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a temporary directory if it doesn't exist

      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);

      // Create a temporary directory if it doesn't exist
      const tmpDir = path.join(__dirname, '..', 'tmp');
      //const tmpDir = path.join(__dirname, '..', 'tmp');
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
      }

      const filePath = path.join(tmpDir, `invoice-${orderId}.pdf`);
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(filePath);
      doc.pipe(writeStream);

      // Add invoice content
      doc.fontSize(20).text('Invoice', { align: 'center' });
      doc.moveDown();
      doc.fontSize(12).text(`Order ID: ${orderId}`);
      doc.text(`Customer: ${customerName}`);
      doc.text(`Date: ${date || new Date().toLocaleDateString()}`);
      doc.moveDown();

      // Add itemized list
      doc.fontSize(14).text('Items:', { underline: true });
      items.forEach((item) => {
        doc.text(`${item.name} - ${item.quantity} x $${item.price.toFixed(2)}`);
      });
      doc.moveDown();

      // Add total amount
      doc.fontSize(14).text(`Total Amount: $${amount.toFixed(2)}`, { align: 'right' });

      // Finalize the PDF
      doc.end();

      // Resolve with the file path once the file is written
      writeStream.on('finish', () => resolve(filePath));
      writeStream.on('error', (err) => reject(err));
    } catch (error) {
      reject(error);
    }
  });
};