import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";

connectToDatabase();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json(); // get the token from the request body
        const { token } = reqBody;
        if (!token) {
            return NextResponse.json(
                {
                    error: "Please provide token",
                },
                { status: 400 }
            );
        }
        
        console.log("Token:", token); 

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        if (!user) {
            return NextResponse.json(
                {
                    error: "Invalid or expired token: from verifymail/route.tsx",
                },
                { status: 400 }
            );
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({
            message: "Email verified successfully",
            success: true,
        });
    } catch (error: any) {
        console.log("Error in emailVerification:", error);
    }
}