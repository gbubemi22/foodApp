//////  For customers  ////////
import { NotFoundError } from "../../utils/error.js";
import Item from "../store/model.js";
export const listAll = async () => {
    const result = await Item.find({}).populate({
        path: "vendorId", // The field to populate
        select: "firstName businessName location businessDescription phoneNumber email", // Fields to include
    });
    return {
        success: true,
        message: `fetched successfully`,
        data: result,
    };
};
export const listOneForCustomer = async (itemId) => {
    const result = await Item.findById(itemId).populate({
        path: "vendorId", // The field to populate
        select: "firstName businessName location businessDescription phoneNumber email", // Fields to include
    });
    if (!result) {
        throw new NotFoundError(`Item not found`);
    }
    return {
        success: true,
        message: `fetched successfully`,
        data: result,
    };
};
export const listFreshFoodForCustomer = async () => {
    const result = await Item.find({ category: "Fresh_food" })
        .populate({
        path: 'vendorId', // The field to populate
        select: 'firstName businessName location businessDescription phoneNumber email', // Fields to include
    });
    return {
        success: true,
        message: `fetched successfully`,
        data: result,
    };
};
export const listFoodForCustomer = async () => {
    const result = await Item.find({ category: "Food" }).populate({
        path: "vendorId", // The field to populate
        select: "firstName businessName location businessDescription phoneNumber email", // Fields to include
    });
    return {
        success: true,
        message: `fetched successfully`,
        data: result,
    };
};
export const listExtrasForCustomer = async () => {
    const result = await Item.find({ category: "Extras" }).populate({
        path: "vendorId", // The field to populate
        select: "firstName businessName location businessDescription phoneNumber email", // Fields to include
    });
    return {
        success: true,
        message: `fetched successfully`,
        data: result,
    };
};
