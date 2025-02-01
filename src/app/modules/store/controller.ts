import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import { add, list, listOne, remove, update } from "./service.js";
import { uploadToCloudinary } from "../../utils/upload.js";

export const Add: Controller = async (req, res, next) => {
  try {
    const vendorId = req.user.id;
    if (!req.files || !req.files.image) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No image uploaded" });
    }
    const image = req.files.image;

    const imageUrl = await uploadToCloudinary(image);
    res
      .status(StatusCodes.CREATED)
      .json(await add(vendorId, imageUrl, req.body));
  } catch (error) {
    next(error);
  }
};

export const List: Controller = async (req, res, next) => {
  try {
    const vendorId = req.user.id;
    console.log(vendorId);
    res.status(StatusCodes.OK).json(await list(vendorId));
  } catch (error) {
    next(error);
  }
};

export const ListOne: Controller = async (req, res, next) => {
  try {
    const vendorId = req.user.id;
    const { itemId } = req.params;
    res.status(StatusCodes.OK).json(await listOne(itemId, vendorId));
  } catch (error) {
    next(error);
  }
};

export const Remove: Controller = async (req, res, next) => {
  try {
    const vendorId = req.user.id;
    const { itemId } = req.params; // Upload the image to Cloudinary
    res.status(StatusCodes.OK).json(await remove(itemId, vendorId));
  } catch (error) {
    next(error);
  }
};

export const Update: Controller = async (req, res, next) => {
  try {
    const vendorId = req.user.id;
    const itemId = req.params.itemId;

    let imageUrl: string | undefined;

    // Check if an image was uploaded
    if (req.files && req.files.image) {
      const image = req.files.image;
      imageUrl = await uploadToCloudinary(image);
    }

    res.status(StatusCodes.OK).json(
      await update(itemId, vendorId, {
        ...req.body,
        image: imageUrl,
      })
    );
  } catch (error) {
    next(error);
  }
};
