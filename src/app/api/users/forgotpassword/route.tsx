import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

connectToDatabase();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { token, password } = reqBody;
        if (!token) {
            return NextResponse.json(
                {
                    error: "Please provide token",
                },
                { status: 400 }
            );
        }

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                error: "Invalid or expired token"
            }, { status: 400 });
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        
        await user.save();
        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        });

    } catch (error: any) {
        console.log("Error in resetPassword:", error);
    }
}