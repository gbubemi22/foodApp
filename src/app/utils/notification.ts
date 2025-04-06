import firebaseAdmin from "./firebase.js";

export const sendNotificationToRider = async (
  deviceToken: string,
  payload: any
) => {
  try {
    const message = {
      notification: {
        title: "New Order Request",
        body: `You have a new order request.`,
      },
      data: payload, // order details, etc.
      token: deviceToken,
    };
    await firebaseAdmin.messaging().send(message);
  } catch (err) {
    console.error("Failed to send FCM notification", err);
  }
};
