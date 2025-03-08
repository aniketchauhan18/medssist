import { Schema } from "mongoose";

export interface ICoordinates {
  lat: number;
  lng: number;
}

export interface IAddress {
  city: string;
  country: string;
  state: string;
  pincode: string;
  coordinates: ICoordinates;
}

export interface IContact {
  phone: string;
  email?: string;
  emergencyPhone?: string;
}

export const contactSchema = new Schema({
  phone: { type: String, required: true },
  email: { type: String },
  emergencyPhone: { type: String },
});

export const addressSchema = new Schema({
  city: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
});
