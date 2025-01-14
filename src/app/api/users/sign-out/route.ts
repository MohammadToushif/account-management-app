import { dbConnect } from "@/database/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    // Extract user ID from the token
    const userId = await getTokenData(request);

    if (!userId) {
      return NextResponse.json(
        {
          message: "Invalid or missing token.",
          success: false,
        },
        { status: 401 }
      );
    }

    // Create a response to clear the token
    const response = NextResponse.json({
      message: "Logged out successfully",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to logout" },
      { status: 500 }
    );
  }
}
