import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    contactName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    addressLine1: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Contact = mongoose.model("Contact", contactSchema);
