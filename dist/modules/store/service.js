import { NotFoundError } from "../../utils/error.js";
import Item from "./model.js";
export const add = async (vendorId, image, payload) => {
    const store = await Item.create({ vendorId, image, ...payload });
    return {
        success: true,
        message: `Item added  successfully.`,
        data: store.toJSON(),
    };
};
export const list = async (vendorId) => {
    const result = await Item.find({ vendorId: vendorId });
    if (!result) {
        throw new NotFoundError(`Item not found`);
    }
    return {
        success: true,
        message: `fetched successfully`,
        data: result,
    };
};
export const listOne = async (itemId, vendorId) => {
    const result = await Item.findOne({ _id: itemId, vendorId: vendorId });
    if (result) {
        throw new NotFoundError(`Item not found`);
    }
    return {
        success: true,
        message: `fetched successfully`,
        data: result,
    };
};
export const update = async (itemId, vendorId, payload) => {
    // Check if the item exists
    const existingItem = await Item.findOne({ _id: itemId, vendorId: vendorId });
    if (!existingItem) {
        throw new NotFoundError(`Item not found`);
    }
    // Prepare the update object
    const updateData = { ...payload };
    // Update the item
    const updatedItem = await Item.findOneAndUpdate({ _id: itemId, vendorId: vendorId }, { $set: updateData }, { new: true, runValidators: true });
    if (!updatedItem) {
        throw new NotFoundError(`Item not found after update attempt`);
    }
    return {
        success: true,
        message: `Updated successfully`,
        data: updatedItem,
    };
};
export const remove = async (itemId, vendorId) => {
    const result = await Item.findOne({ _id: itemId, vendorId: vendorId });
    if (result) {
        throw new NotFoundError(`Item not found`);
    }
    await Item.findByIdAndDelete({ _id: itemId, vendorId });
    return {
        success: true,
        message: `Deleted successfully`,
        data: [],
    };
};
