import { ConflictError, NotFoundError } from "../../utils/error.js";
import Role from "./model.js";

export const createRole = async (name: string) => {
  //   const checkName = await Role.findOne({ name: name });

  //   if (checkName) throw new ConflictError(`Role name Already Exites`);

  const role = await Role.create(name);
  const data = role.toJSON();

  return {
    status: true,
    message: `Created successfully`,
    data,
  };
};

export const listAllRoles = async () => {
  const roles = await Role.find({});

  if (roles.length === 0) throw new NotFoundError(`Roles not found`);

  return {
    status: true,
    message: `Fetched successfully`,
    data: roles,
  };
};

export const listOneRole = async (roleId: string) => {
  const role = await Role.findById(roleId);

  if (!role) throw new NotFoundError(`Role not found`);

  const data = role.toJSON();

  return {
    status: true,
    message: `Fetched successfully`,
    data,
  };
};

export const updateRoleService = async (roleId: string, name: string) => {
  const result = await Role.findOneAndUpdate(
    { _id: roleId },
    { $set: { name: name } },
    { new: true, runValidators: true }
  );

  if (!result) throw new NotFoundError(`Role not found`);
  return {
    status: true,
    message: `Updated successfully`,
    data: result.toJSON(),
  };
};

export const deleteRoleService = async (roleId: string) => {
  await Role.findOneAndDelete({ _id: roleId });

  return {
    status: true,
    message: `Deleted Successfully`,
    data: [],
  };
};
