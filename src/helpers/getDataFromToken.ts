import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email?: string;
}

export const getDataFromToken = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
        return decodedToken.id; 
    } catch (error: unknown) {
        console.error("Error in getDataFromToken:", error);
        throw new Error("Invalid token");
    }
}