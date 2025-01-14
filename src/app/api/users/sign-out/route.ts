import { dbConnect } from "@/database/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { conf } from "@/config/conf";

dbConnect();

export async function GET(request: NextRequest) {
  try {
    // Retrieve token from cookies
    const token = request.cookies.get("token")?.value;

    // Handle missing token
    if (!token) {
      return NextResponse.json(
        { error: "Token not provided or already expired." },
        { status: 401 }
      );
    }

    // Verify the token
    jwt.verify(token, conf.appCredentials.appTokenSceret) as { id: string };

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
