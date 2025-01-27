import { Contact } from "../model/contact.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createContact = asyncHandler(async (req, res) => {
  const { contactName, email, phone, addressLine1, city, state, pinCode } =
    req.body;

  if (!contactName) {
    throw new ApiError(400, "Contact Name is required");
  }
  if (!phone) {
    throw new ApiError(400, "Phone number is required");
  }
  console.log("files:-");
  console.log(req.file);
  let localImageUrl = null;
  if (req.file && req.file.path) {
    localImageUrl = req.file?.path;
  }
  const userId = req.user._id;
  let imageUrlResponse = null;
  if (localImageUrl) {
    imageUrlResponse = await uploadOnCloudinary(localImageUrl);
  }
  const imageUrl = imageUrlResponse?.url || "";
  const contact = await Contact.create({
    contactName,
    email,
    phone,
    addressLine1,
    city,
    state,
    pinCode,
    imageUrl,
    userId,
  });
  if (!contact) {
    throw new ApiError(500, "Error while creating contact");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, { contact }, "Contact created successfully"));
});

const getContactsByUserId = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "Unauthorized");
  }
  const contacts = await Contact.find({ userId });
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { contacts },
        "successfully fetched all the contacts"
      )
    );
});

const getContactById = asyncHandler(async (req, res) => {
  const _id = req.query.id;
  const contact = await Contact.findById({ _id });
  return res
    .status(200)
    .json(new ApiResponse(200, { contact }, "Fetched the required contact"));
});

export { createContact, getContactsByUserId, getContactById };
