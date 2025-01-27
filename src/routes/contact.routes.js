import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import {
  createContact,
  deleteContactById,
  getContactById,
  getContactsByUserId,
  updateContactById,
} from "../controller/contact.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router
  .route("/create-contact")
  .post(verifyJWT, upload.single("imageFile"), createContact);

router
  .route("/getAllContactsByUser")
  .get(verifyJWT, upload.none(), getContactsByUserId);

router.route("/getContactById").get(verifyJWT, getContactById);

router.route("/delete-contact/:id").delete(verifyJWT, deleteContactById);

router.route("/update-contact/:id").put(verifyJWT, updateContactById);

export default router;
