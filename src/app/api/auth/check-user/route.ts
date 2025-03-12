import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();
        await dbConnect();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist!!" }, { status: 404 });
        }
        return NextResponse.json({ isNewUser: user.isNewUser }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to check user!!" }, { status: 500 });
    }
}