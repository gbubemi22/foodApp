import { NotFoundError } from "../../utils/error.js";
import Favorite from "./model.js";
import User from "../user/model.js";
import Item from "../store/model.js";
export const create = async (userId, itemId) => {
    const user = await User.findById({ _id: userId });
    if (!user)
        throw new NotFoundError(`User not found`);
    const checkItem = await Item.findById(itemId);
    if (!checkItem)
        throw new NotFoundError(`Item not found`);
    // Create a new favorite entry
    const favorite = await Favorite.create({ userId, itemId });
    return {
        status: true,
        message: `Item added to favorite`,
        data: favorite,
    };
};
export const listAllFavorite = async (userId) => {
    const result = await Favorite.find({ userId }).populate("itemId");
    if (!result)
        throw new NotFoundError(`Favorite Item not found for this user`);
    return {
        status: true,
        message: `Fetched Successfully`,
        data: result,
    };
};
export const listOneFavorite = async (itemId, userId) => {
    const result = await Favorite.findOne({
        _id: itemId,
        userId: userId,
    }).populate("itemId");
    if (!result)
        throw new NotFoundError(`Favorite Item found for this user`);
    return {
        status: true,
        message: `Fetched Successfully`,
        data: result,
    };
};
export const remove = async (itemId, userId) => {
    const result = await Favorite.findOneAndDelete({
        _id: itemId,
        userId: userId,
    });
    if (!result)
        throw new NotFoundError(`Favorite property not found`);
    return {
        status: true,
        message: `Item  Removed Successfully`,
        data: {},
    };
};
