// models/Visitor.js
import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    companions: {
      type: Number,
      default: 0,
    },
    resident: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference your existing User model
      required: true,
    },
    qrCode: {
      type: String, // e.g., a URL or base64-encoded QR code
    },
    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Visitor ||
  mongoose.model("Visitor", visitorSchema);
