import { Schema, Document, model, models } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
  userType: string;
  createdAt: Date;
  updatedAt: Date;
}

const userType = ["hospital", "ngo", "chemist"];

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    emailVerified: { type: Boolean, required: true },
    image: { type: String },
    userType: { type: String, enum: userType, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
  },
  {
    collection: "user",
  },
);

const User = models?.User || model<IUser>("User", UserSchema);
// const Session = models?.Session || model("Session", SessionSchema);
// const Account = models?.Account || model("Account", AccountSchema);
// const Verification = models?.Verification || model("Verification", VerificationSchema);
export default User;
