import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function GET(request: NextRequest) {
  try {
    const userID = await getDataFromToken(request);
    const user = await User.findOne({ _id: userID }).select("-password");

    return NextResponse.json({
      message: "User found",
      success: true,
      data: user
    });
  } catch (error: unknown) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
