import { connectDB } from "@/server/db/client";
import { checkUserExists, updateUserEntity } from "@/server/helpers";
import Chemist from "@/server/models/chemist.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, address, contact, deliveryAvailable, userId } =
      await req.json();

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

    // check for existing chemist with same user id
    const existingChemist = await Chemist.findOne({
      userId: userId,
    });

    if (existingChemist) {
      return NextResponse.json(
        {
          message: "Chemist with same user already exists",
        },
        {
          status: 400,
        },
      );
    }

    const chemist = new Chemist({
      name,
      address,
      contact,
      deliveryAvailable,
      userId,
    });
    await chemist.save();
    await updateUserEntity(userId, "chemist");

    return NextResponse.json(
      {
        message: "Chemist registered successfully",
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Internal Server Error",
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
    const chemists = await Chemist.find({});

    if (!chemists) {
      return NextResponse.json(
        {
          message: "No chemists found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "Chemists found",
        data: chemists,
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
