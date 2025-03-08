import { connectDB } from "@/server/db/client";
import { checkUserExists, updateUserEntity } from "@/server/helpers";
import Ngo from "@/server/models/ngo.model";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      name,
      address,
      contact,
      darpanId,
      services,
      resources,
      operationalAreas,
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
    // check if the user id is valid or not
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

    // check for existing hospital with same user id
    const existingNgo = await Ngo.findOne({
      userId: userId,
    });

    if (existingNgo) {
      return NextResponse.json(
        {
          message: "Ngo with same user already exists",
        },
        {
          status: 400,
        },
      );
    }

    const ngo = new Ngo({
      name,
      address,
      contact,
      darpanId,
      services,
      resources,
      operationalAreas,
      userId,
    });
    await ngo.save();
    await updateUserEntity(userId, "ngo");

    return NextResponse.json(
      {
        message: "NGO registered successfully",
        data: ngo,
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
    const ngos = await Ngo.find({});
    if (!ngos) {
      return NextResponse.json(
        {
          message: "No NGO found",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        message: "NGOs fetched successfully",
        data: ngos,
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
