import { StatusCodes } from "http-status-codes";
import { createRole, deleteRoleService, listAllRoles, listOneRole, updateRoleService, } from "./service.js";
export const Create = async (req, res, next) => {
    try {
        res.status(StatusCodes.CREATED).json(await createRole(req.body));
    }
    catch (error) {
        next(error);
    }
};
export const listAll = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await listAllRoles());
    }
    catch (error) {
        next(error);
    }
};
export const listOne = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await listOneRole(req.params.roleId));
    }
    catch (error) {
        next(error);
    }
};
export const updateRole = async (req, res, next) => {
    try {
        const { roleId } = req.params;
        const { name } = req.body;
        res.status(StatusCodes.OK).json(await updateRoleService(roleId, name));
    }
    catch (error) {
        next(error);
    }
};
export const deleteRole = async (req, res, next) => {
    try {
        res.status(StatusCodes.OK).json(await deleteRoleService(req.params.roleId));
    }
    catch (error) {
        next(error);
    }
};
