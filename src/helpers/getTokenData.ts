import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { conf } from "@/config/conf";

export const getTokenData = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    if (!token) {
      return NextResponse.json(
        { error: "Token not provided or already expired." },
        { status: 401 }
      );
    }

    const decodedToken = jwt.verify(
      token,
      conf.appCredentials.appTokenSceret
    ) as { id: string };

    return decodedToken.id;
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to get token data",
      },
      { status: 500 }
    );
  }
};
