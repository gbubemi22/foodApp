/**
 * Generate a PDF invoice and save it to a temporary file.
 * @param orderId - The order ID.
 * @param customerName - The customer's name.
 * @param amount - The total amount.
 * @param items - The list of items in the order.
 * @param date - The order date.
 * @returns The file path of the generated PDF.
 */
export declare const generateInvoicePDF: (orderId: string, customerName: string, amount: number, items: {
    name: string;
    quantity: number;
    price: number;
}[], date?: any) => Promise<string>;
