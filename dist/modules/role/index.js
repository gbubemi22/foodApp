"use strict";
// import express from "express";
// import {
//   listAll,
//   listOne,
//   updateRole,
//   deleteRole,
//   Create,
// } from "./controller.js";
// import { verifyToken } from "../../middleware/auth.js";
// import {
//   fetchRoleDetails,
//   checkRole,
//   authorizePermissions,
// } from "../../middleware/checkRoles.js";
// import { AdminVerifyToken } from "../../middleware/admin.auth.js";
// const router = express.Router();
// router.post("/", AdminVerifyToken, authorizePermissions("Super-Admin"), Create);
// router.route("/").get(AdminVerifyToken, listAll);
// router.route("/:roleId").get(AdminVerifyToken, listOne);
// router
//   .route("/:roleId")
//   .patch(AdminVerifyToken, authorizePermissions("Super-Admin"), updateRole);
// router
//   .route("/:roleId")
//   .delete(AdminVerifyToken, authorizePermissions("Super-Admin"), deleteRole);
// export default router;
