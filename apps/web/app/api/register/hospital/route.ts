import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/db/client";
import Hospital from "@/server/models/hospital.model";
import { checkUserExists, updateUserEntity } from "@/server/helpers";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      address,
      contact,
      ninToHfi,
      type,
      bedCount,
      userId,
      ambulances,
      availableBeds,
      availableAmbulances,
      bloodStock,
    } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          message: "Unauthorized | User not found or invalid userId",
        },
        {
          status: 404,
        },
      );
    }

    await connectDB();
    // check if the user id is valid or not
    const isUserExists = await checkUserExists(userId);
    if (!isUserExists) {
      return NextResponse.json(
        {
          message: "User with this id does not exists",
        },
        {
          status: 404,
        },
      );
    }
    if (isUserExists.userType !== undefined) {
      return NextResponse.json(
        {
          message: "User has already one registered entity",
        },
        {
          status: 401,
        },
      );
    }

    // check for existing hospital with same user id
    const existingHospital = await Hospital.findOne({
      userId: userId,
    });

    if (existingHospital) {
      return NextResponse.json(
        {
          message: "Hospital with same user already exists",
        },
        {
          status: 400,
        },
      );
    }

    console.log(bloodStock);

    const hospital = new Hospital({
      name,
      address,
      contact,
      ninToHfi,
      type,
      bedCount,
      userId,
      availableBeds,
      ambulances,
      availableAmbulances,
      bloodStock,
    });
    await hospital.save();

    await updateUserEntity(userId, "hospital");

    return NextResponse.json(
      {
        message: "Hospital registered successfully",
        data: hospital,
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

// get the list of all the hospitals

export async function GET() {
  try {
    await connectDB();

    const hospitals = await Hospital.find({});

    if (!hospitals) {
      return NextResponse.json(
        {
          message: "No hospitals found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Hospital fetched successfully",
        data: hospitals,
      },
      {
        status: 200,
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
