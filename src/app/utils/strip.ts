import Stripe from "stripe";
import { BadRequestError, NotFoundError } from "./error.js";
import Order from "../modules/order/model.js";
import { PaymentStatusEnum } from "../modules/order/type.js";
import Transaction from "../modules/transaction/model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const initiatePayment = async (
  amount: number,
  currency: string,
  referenceId: string
) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"], // Allow card payments
      mode: "payment", // One-time payment mode
      success_url: `http://localhost:6000/v1/success?session_id={CHECKOUT_SESSION_ID}`, // Include the protocol
      // Redirect URL after success
      cancel_url: `http://localhost/cancel`, // Redirect URL after cancellation
      line_items: [
        {
          price_data: {
            currency: currency || "ngn", // Default to NGN if no currency is provided,
            product_data: {
              name: "Food Delivery", // Hardcoded name
              description: "Payment for food delivery services", // Hardcoded description
            },
            unit_amount: amount, // Total amount in the smallest unit (e.g., cents for USD)
          },
          quantity: 1, // Single transaction for the entire total
        },
      ],
      metadata: {
        referenceId, // Add a reference ID for tracking
      },
    });
    console.log(session);
    console.log(session.metadata);
    return session.url;
  } catch (error) {
    console.error(error);
    throw new BadRequestError(`Error creating Payment`);
  }
};

export const verifyPayment = async (sessionId: string) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if session is successful and has referenceId
    if (session.payment_status !== "paid") {
      throw new BadRequestError("Payment was not successful");
    }

    if (!session.metadata || !session.metadata.referenceId) {
      throw new BadRequestError("Reference ID not found in session metadata");
    }

    const referenceId = session.metadata.referenceId;

    // Find the order by referenceId
    const order = await Order.findOneAndUpdate(
      { reference: referenceId },
      { paymentStatus: PaymentStatusEnum.PAID },
      { new: true }
    );
    if (!order) {
      throw new NotFoundError("Order not found");
    }

    await Transaction.findOneAndUpdate(
      { referenceId },
      { status: PaymentStatusEnum.PAID }
    );

    return {
      message: "Payment verified and order updated successfully",
      order,
    };
  } catch (error) {
    console.error(error);
    throw new BadRequestError(`Error verifying Payment`);
  }
};
