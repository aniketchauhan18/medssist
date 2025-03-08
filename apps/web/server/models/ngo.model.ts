import { Schema, models, model } from "mongoose";
import {
  addressSchema,
  contactSchema,
  IAddress,
  IContact,
} from "./common.model";

interface INgo extends Document {
  name: string;
  address: IAddress;
  contact: IContact;
  darpanId: string;
  services: string[];
  resources: {
    ambulances: number;
    volunteers: number;
  };
  operationalAreas: string[];
  userId: string;
}

const resourcesSchema = new Schema({
  ambulances: { type: Number },
  volunteers: { type: Number },
});

const NgoSchema = new Schema(
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
    darpanId: {
      type: String,
      unique: true,
    },
    services: { type: [String], required: true, default: [] },
    resources: {
      type: resourcesSchema,
    },
    operationalAreas: { type: [String], required: true, default: [] },
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

const Ngo = models?.Ngo || model<INgo>("Ngo", NgoSchema);
export default Ngo;
