import { checkHospitalExists } from "@/server/helpers";
import Medicine from "@/server/models/medicine.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      genericName,
      manufacturer,
      batchNumber,
      expiryDate,
      pricePerUnit,
      quantity,
      isPrescriptionRequired,
      category,
      hospitalId,
    } = await req.json();

    // TODO: Add validation for the fields in future if time permits
    if (!hospitalId) {
      return NextResponse.json(
        {
          message: "Hospital ID is required",
        },
        {
          status: 400,
        },
      );
    }

    const existingHospital = await checkHospitalExists(hospitalId);

    if (!existingHospital) {
      return NextResponse.json(
        {
          message: "Hospital with the provided ID does not exist",
        },
        {
          status: 404,
        },
      );
    }

    const newMedicine = new Medicine({
      name,
      genericName,
      manufacturer,
      batchNumber,
      expiryDate,
      pricePerUnit,
      quantity,
      isPrescriptionRequired,
      category,
      hospitalId,
    });
    await newMedicine.save();

    return NextResponse.json(
      {
        message: "Medicine added successfully",
        data: newMedicine,
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
