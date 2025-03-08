import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/server/db/client";
import BloodBank from "@/server/models/blood-bank.model";
import { checkUserExists, updateUserEntity } from "@/server/helpers";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      address,
      contact,
      bloodStock,
      operatingHours,
      licenseNumber,
      userId,
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
    const isUserExits = await checkUserExists(userId);
    if (!isUserExits) {
      return NextResponse.json(
        {
          message: "User with this id does not exists",
        },
        {
          status: 404,
        },
      );
    }

    if (isUserExits.userType !== undefined) {
      return NextResponse.json(
        {
          message: "User has already one registered entity",
        },
        {
          status: 401,
        },
      );
    }

    const existingBloodBank = await BloodBank.findOne({
      userId: userId,
    });

    if (existingBloodBank) {
      return NextResponse.json(
        {
          message: "Blood bank with same user already exists",
        },
        {
          status: 400,
        },
      );
    }

    const bloodBank = new BloodBank({
      name,
      address,
      contact,
      bloodStock,
      operatingHours,
      licenseNumber,
      userId,
    });

    await bloodBank.save();
    await updateUserEntity(userId, "blood-bank");

    return NextResponse.json(
      {
        message: "Blood Banks registered successfully",
        data: bloodBank,
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

export async function GET() {
  try {
    await connectDB();
    const bloodBanks = await BloodBank.find({});
    if (!bloodBanks) {
      return NextResponse.json(
        {
          message: "No blood banks found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Blood Banks fetched successfully",
        data: bloodBanks,
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
