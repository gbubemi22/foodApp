import { Controller } from "../../utils/constant.js";
import { StatusCodes } from "http-status-codes";
import { create, listAllFavorite, listOneFavorite, remove } from "./service.js";

export const Create: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.body;

    res.status(StatusCodes.CREATED).json(await create(userId, itemId));
  } catch (error) {
    next(error);
  }
};

export const ListAllFavorite: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    res.status(StatusCodes.OK).json(await listAllFavorite(userId));
  } catch (error) {
    next(error);
  }
};

export const ListOneFavorite: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    res.status(StatusCodes.OK).json(await listOneFavorite(itemId, userId));
  } catch (error) {
    next(error);
  }
};

export const Remove: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { itemId } = req.params;
    res.status(StatusCodes.OK).json(await remove(itemId, userId));
  } catch (error) {
    next(error);
  }
};
