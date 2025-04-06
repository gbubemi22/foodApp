import { sendNotificationToRider } from "../../utils/notification.js";
import { haversineDistance } from "../../utils/distanceCal.js";
import { BadRequestError, NotFoundError } from "../../utils/error.js";
import Rider from "../rider/model.js";
import Vendor from "../vendor/model.js";
import Order from "../order/model.js";
import Track from "../track/model.js";
import sendEmail from "../../utils/mailtrap.js";
import { Tracking } from "../../template/orderTracking.js";
import User from "../user/model.js";

export const findNearbyRiders = async (vendorId: string, orderId: any) => {
  const vendor = await Vendor.findById(vendorId);
  if (!vendor) throw new NotFoundError(`Vendor with ID ${vendorId} not found`);

  const allAvailableRiders = await Rider.find({ isAvailable: true });

  const nearbyRiders = allAvailableRiders.filter((rider) => {
    const distance = haversineDistance(
      {
        latitude: vendor.location.latitude,
        longitude: vendor.location.longitude,
      },
      {
        latitude: rider.location.latitude,
        longitude: rider.location.longitude,
      }
    );
    return distance <= 10;
  });

  const order = await Order.findById(orderId);
  if (!order) throw new NotFoundError(`Order with ID ${orderId} not found`);
  const location = {
    latitude: order.latitude,
    longitude: order.longitude,
  };

  await Promise.all(
    nearbyRiders.map(async (rider) => {
      if (!rider.deviceToken) return;

      try {
        const response = await sendNotificationToRider(rider.deviceToken, {
          orderId: String(order._id),
          vendorId,
          vendorName: vendor.businessName,
          totalAmount: String(order.totalAmount),
          pickupLocation: JSON.stringify(vendor.location),
          deliveryLocation: JSON.stringify(location),
        });

        //  await NotificationLog.create({
        //    riderId: rider._id,
        //    orderId: orderDetails._id,
        //    success: true,
        //    message: `Notification sent successfully`,
        //  });
      } catch (error: any) {
        //  await NotificationLog.create({
        //    riderId: rider._id,
        //    orderId: orderDetails._id,
        //    success: false,
        //    message: error.message || "Failed to send notification",
        //  });
      }
    })
  );

  return {
    nearbyRiders,
  };
};

export const acceptOrder = async (riderId: string, orderId: string) => {
  const order = await Order.findById(orderId);
  if (!order || order.riderId) {
    throw new BadRequestError("Order not found or already assigned");
  }

  const rider = await Rider.findById(riderId);
  if (!rider) {
    throw new NotFoundError("Rider not found");
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { riderId: riderId },
    { new: true }
  );

  if (!updatedOrder) {
    throw new NotFoundError("Order not found");
  }

  const vendor = await Vendor.findById(order.vendorId);
  if (!vendor) {
    throw new NotFoundError("Vendor not found");
  }

  const user = await User.findById(order.userId);
  if (!user) {
    throw new NotFoundError("User not found");
  }
  

  await Track.create({
    orderId,
    riderId,
    vendorId: order.vendorId,
    customerId: order.userId,
    status: "ACCEPTED",
    pickupLocation: {
      latitude: vendor.location.latitude,
      longitude: vendor.location.longitude,
    },
    destination: {
      latitude: order.latitude,
      longitude: order.longitude,
    },
    currentLocation: {
      latitude: rider.location.latitude,
      longitude: rider.location.longitude,
    },
  });

  await sendEmail(user.email, "Thank You", Tracking(order.id));

  return updatedOrder;
};

export const updateRiderLocation = async (
  riderId: string,
  newLocation: { latitude: number; longitude: number }
) => {
  const track = await Track.findOne({ riderId, status: { $ne: "DELIVERED" } });

  if (!track) {
    throw new NotFoundError(`No active track found for rider ${riderId}`);
  }

  const updatedLocation = await Track.findOneAndUpdate(
    { riderId },
    {
      $set: {
        "currentLocation.latitude": newLocation.latitude,
        "currentLocation.longitude": newLocation.longitude,
      },
    },
    { new: true }
  );

  await Rider.findOneAndUpdate(
    { _id: riderId },
    {
      $set: {
        "location.latitude": newLocation.latitude,
        "location.longitude": newLocation.longitude,
      },
    },
    {
      new: true,
    }
  )

  if (!updatedLocation) {
    throw new NotFoundError(
      `Failed to update rider location for rider ${riderId}`
    );
  }

  return updatedLocation;
};

export const getRiderCurrentLocationByOrder = async (orderId: string) => {
  const track = await Track.findOne({ orderId, status: { $ne: "DELIVERED" } });

  if (!track) {
    throw new NotFoundError(`No active delivery found for order ${orderId}`);
  }

  const order = await Order.findById(orderId);

  if(!order) {
    throw new NotFoundError(`Order with ID ${orderId} not found`);
  }

  return {
    riderId: track.riderId,
    currentLocation: track.currentLocation,
    order: order,
  };
};
