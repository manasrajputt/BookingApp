import express from "express";
import { login, register } from "../controllers/auth.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([
    {
      name: "image",
      maxCount: 1,
    },
  ]),
  register
);
router.post("/login", login);

export default router;
