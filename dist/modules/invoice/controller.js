import { generateInvoice } from "./service.js";
import fs from "fs";
export const GenerateInvoice = async (req, res, next) => {
    try {
        const { orderId } = req.body;
        const userId = req.user.id;
        // Call the service to generate the invoice
        const filePath = await generateInvoice(orderId, userId);
        if (!filePath) {
            throw new Error("File path is undefined");
        }
        // Send the file to the client
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=invoice-${orderId}.pdf`);
        res.download(filePath, `invoice-${orderId}.pdf`, (err) => {
            if (err) {
                console.error("Error sending file:", err);
                res
                    .status(500)
                    .json({ success: false, message: "Failed to send invoice" });
            }
            // Clean up the file after sending
            fs.unlinkSync(filePath);
        });
    }
    catch (error) {
        console.error("Error generating invoice:", error);
        next(error); // Pass the error to the error-handling middleware
    }
};
