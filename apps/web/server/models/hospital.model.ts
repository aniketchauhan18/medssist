import { Schema, models, model } from "mongoose";
import {
  addressSchema,
  contactSchema,
  IAddress,
  IContact,
} from "./common.model";

interface IHospital extends Document {
  name: string;
  address: IAddress;
  contact: IContact;
  ninToHfi: string;
  bedCount?: number;
  userId: string;
  availableBeds?: number;
  ambulances?: number;
  availableAmbulances?: number;
}

const bloodStockSchema = new Schema({
  "A+": { type: Number, required: true },
  "A-": { type: Number, required: true },
  "B+": { type: Number, required: true },
  "B-": { type: Number, required: true },
  "AB+": { type: Number, required: true },
  "AB-": { type: Number, required: true },
  "O+": { type: Number, required: true },
  "O-": { type: Number, required: true },
});

const HospitalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: addressSchema,
      required: true,
    },
    contact: {
      type: contactSchema,
      required: true,
    },
    ninToHfi: {
      type: String,
      required: true,
    },
    bedCount: { type: Number },
    availableBeds: { type: Number },
    ambulances: { type: Number },
    availableAmbulances: { type: Number },
    bloodStock: {
      type: bloodStockSchema,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Hospital =
  models?.Hospital || model<IHospital>("Hospital", HospitalSchema);
export default Hospital;
