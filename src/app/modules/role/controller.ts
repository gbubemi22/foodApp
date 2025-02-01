import { Controller } from "../../utils/constant.js";
import { StatusCodes } from "http-status-codes";
import {
  createRole,
  deleteRoleService,
  listAllRoles,
  listOneRole,
  updateRoleService,
} from "./service.js";

export const Create: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await createRole(req.body));
  } catch (error) {
    next(error);
  }
};

export const listAll: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await listAllRoles());
  } catch (error) {
    next(error);
  }
};

export const listOne: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await listOneRole(req.params.roleId));
  } catch (error) {
    next(error);
  }
};

export const updateRole: Controller = async (req, res, next) => {
  try {
    const { roleId } = req.params;
    const { name } = req.body;
    res.status(StatusCodes.OK).json(await updateRoleService(roleId, name));
  } catch (error) {
    next(error);
  }
};

export const deleteRole: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await deleteRoleService(req.params.roleId));
  } catch (error) {
    next(error);
  }
};
