import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";

export async function POST(request: NextRequest) {
    try {
        const { fullName, email, photoURL, isNewUser } = await request.json();
        if (!fullName || !email || !photoURL || !isNewUser) {
            return NextResponse.json({ error: "Please enter the required fields!!" }, { status: 400 });
        }
        await dbConnect();
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return NextResponse.json({ error: "Email already exists!!" }, { status: 400 });
        }
        await User.insertOne({ email, fullName, photoURL, isNewUser });
        return NextResponse.json({ message: "Login successful!!" }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to login" }, { status: 500 });
    }
}