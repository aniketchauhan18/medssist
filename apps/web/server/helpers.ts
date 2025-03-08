/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDB } from "./db/client";
import Hospital from "./models/hospital.model";
import User from "./models/user.model";

// export const checkUserEntity = async(userId: any) => {
//   const user = await User.findOne({_id: userId});
//   return user;
// }

export const checkUserExists = async (userId: any) => {
  await connectDB();
  const user = await User.findOne({ _id: userId });
  return user;
};

export const updateUserEntity = async (userId: any, entity: string) => {
  const updatedUser = await User.updateOne(
    {
      _id: userId,
    },
    {
      $set: {
        userType: entity,
      },
    },
  );
  return updatedUser;
};

export const checkUserIsRegistered = async (userId: string) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    console.log(err);
  }
};

export const checkHospitalExists = async (id: string) => {
  try {
    const hospital = await Hospital.findById(id);
    return hospital;
  } catch (err) {
    console.log(err);
  }
};
