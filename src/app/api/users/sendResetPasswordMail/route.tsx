import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectToDatabase();

export async function GET(req: NextRequest){
    try {
        const userID = await getDataFromToken(req);
        const user = await User.findOne({ _id: userID }).select("-password");

        if(!user){
            return NextResponse.json({
                error: "User not found"
            }, { status: 400 });
        }

        await sendEmail({email: user.email, emailType: "RESET", userId: user._id});
        return NextResponse.json({
            message: "Reset password email sent successfully",
            success: true
        });
    } catch (error: any) {
        console.log("Error in sendResetPasswordMail:", error);
    }
}

