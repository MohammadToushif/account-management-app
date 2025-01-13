import { dbConnect } from "@/database/dbConnect";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

dbConnect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    // Find user by username or email
    const user = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist." },
        { status: 404 }
      );
    } else {
      // Verify password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return NextResponse.json(
          { error: "Invalid password" },
          { status: 401 }
        );
      }
      return NextResponse.json({
        message: "Login successful",
        success: true
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
