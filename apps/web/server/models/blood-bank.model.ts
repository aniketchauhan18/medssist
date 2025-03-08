import { Schema, models, model } from "mongoose";

interface ICoordinates {
  lat: number;
  lng: number;
}

interface IAddress {
  city: string;
  country: string;
  state: string;
  pincode: string;
  coordinates: ICoordinates;
}

interface IContact {
  phone: string;
  email?: string;
  emergencyPhone?: string;
}

interface IBloodBankSchema extends Document {
  name: string;
  address: IAddress;
  contact: IContact;
  bloodStock: {
    "A+": number;
    "A-": number;
    "B+": number;
    "B-": number;
    "AB+": number;
    "AB-": number;
    "O+": number;
    "O-": number;
  };
  operatingHours: string;
  licenseNumber?: string;
  userId: string;
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

const contactSchema = new Schema({
  phone: { type: String, required: true },
  email: { type: String },
  emergencyPhone: { type: String },
});

const addressSchema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
});

const BloodBankSchema = new Schema(
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
    bloodStock: {
      type: bloodStockSchema,
      required: true,
    },
    operatingHours: { type: String, required: true },
    licenseNumber: { type: String },
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

const BloodBank =
  models.BloodBank || model<IBloodBankSchema>("BloodBank", BloodBankSchema);
export default BloodBank;
