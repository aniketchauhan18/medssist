import { Schema, models, model, Document } from "mongoose";
import {
  addressSchema,
  contactSchema,
  IAddress,
  IContact,
} from "./common.model";

interface IChemist extends Document {
  name: string;
  address: IAddress;
  contact: IContact;
  deliveryAvailable: boolean;
  userId: string;
}

const ChemistSchema = new Schema(
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
    deliveryAvailable: {
      type: Boolean,
      default: false,
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

const Chemist = models?.Chemist || model<IChemist>("Chemist", ChemistSchema);
export default Chemist;
