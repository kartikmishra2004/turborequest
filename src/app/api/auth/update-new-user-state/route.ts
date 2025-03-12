import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";
import { auth } from "@/auth";

export async function PUT(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized!!" }, { status: 401 });
    }
    try {
        const { email } = await request.json();
        if (!email) {
            return NextResponse.json({ error: "Please enter the required fields!!" }, { status: 400 });
        }
        await dbConnect();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist!!" }, { status: 404 });
        }
        await User.findOneAndUpdate({ email: email }, { isNewUser: false });
        return NextResponse.json({ message: "New user state updated!!" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to update new user state!!" }, { status: 500 });
    }
}