import { Schema, models, model, Document } from "mongoose";

interface IMedicine extends Document {
  name: string;
  genericName: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: Date;
  pricePerUnit: number;
  quantity: number;
  isPrescriptionRequired: boolean;
  category?: string;
  chemistId: string;
}

const MedicineSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    genericName: {
      type: String,
      required: true,
    },
    manufacturer: {
      type: String,
      required: true,
    },
    batchNumber: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    isPrescriptionRequired: { type: Boolean, required: true, default: false },
    category: { type: String },
    hospitalId: {
      type: Schema.Types.ObjectId,
      ref: "Hospital",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Medicine =
  models?.Medicine || model<IMedicine>("Medicine", MedicineSchema);
export default Medicine;
