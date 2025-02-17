import { NextResponse } from "next/server";
import { auth } from "@/auth";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export async function GET() {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized!!" }, { status: 401 });
    }
    try {
        await dbConnect();
        const user = await UserModel.findOne({ fullName: session.user?.name });
        return NextResponse.json({ message: "Success!!", user });
    } catch (error) {
        return NextResponse.json({ error: "Failed to get user!!" }, { status: 500 });
    }
}