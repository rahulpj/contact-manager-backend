import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { createContact } from "../controller/contact.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/create-contact")
  .post(verifyJWT, upload.single("imageFile"), createContact);

export default router;
