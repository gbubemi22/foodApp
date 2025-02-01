import express from "express";
import { Add, List, ListOne, Remove, Update } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.route("/").post(verifyToken, Add);

router.route("/").get(verifyToken, List);

router.route("/:itemId").get(verifyToken, ListOne);

router.route("/:itemId").delete(verifyToken, Remove);

router.route("/:itemId").patch(verifyToken, Update);

export default router;
