import { connectDB } from "@/server/db/client";
import Hospital from "@/server/models/hospital.model";
import BloodBank from "@/server/models/blood-bank.model";
import Medicine from "@/server/models/medicine.model";

export const getHospitalByUserId = async (userId: string) => {
  try {
    await connectDB();
    const hospital = await Hospital.findOne({
      userId,
    });
    return hospital;
  } catch (err) {
    console.log(err);
  }
};
export const getBloodBankByUserId = async (userId: string) => {
  try {
    await connectDB();
    const bloodBank = await BloodBank.findOne({
      userId,
    });
    return bloodBank;
  } catch (err) {
    console.log(err);
  }
};

export const getMedicinesByHospitalId = async (hospitalId: string) => {
  try {
    await connectDB();
    const medicines = await Medicine.find({
      hospitalId,
    });
    return medicines;
  } catch (err) {
    console.log(err);
  }
};

export const getFilteredMedicines = async (
  query: string,
  hospitalId: string
) => {
  try {
    await connectDB();
    const filteredMedicines = await Medicine.find({
      $and: [
        { hospitalId: { $ne: hospitalId } },
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { genericName: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
          ],
        },
      ],
    });
    return filteredMedicines;
  } catch (err) {
    console.log(err);
  }
};
