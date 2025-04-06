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
declare const Track: mongoose.Model<TrackDocument, {}, {}, {}, mongoose.Document<unknown, {}, TrackDocument> & mongoose.Document<unknown, any, any> & {
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
} & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Track;
