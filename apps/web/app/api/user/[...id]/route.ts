import { checkUserExists } from "@/server/helpers";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const user = await checkUserExists(id);
    if (!user?.userType) {
      return NextResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({
      message: "User fetched successfully",
      data: user,
    });
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
