import mongoose from "mongoose";

export type TrackDocument = mongoose.Document & {
  orderId: mongoose.Types.ObjectId;
  riderId: mongoose.Types.ObjectId;
  vendorId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  status: string;
  pickupLocation: {
    latitude: number;
    longitude: number;
  };
  currentLocation: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
};

const TrackSchema = new mongoose.Schema<TrackDocument>(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      required: true,
    },
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: [
        "ACCEPTED",
        "PENDING",
        "PICKED_UP",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELLED",
      ],
      default: "pending",
    },
    pickupLocation: {
      latitude: Number,
      longitude: Number,
    },
    currentLocation: {
      latitude: Number,
      longitude: Number,
    },
    destination: {
      latitude: Number,
      longitude: Number,
    },
  },
  {
    timestamps: true,
    collection: "Track",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

const Track = mongoose.model<TrackDocument>("Roles", TrackSchema);

export default Track;
