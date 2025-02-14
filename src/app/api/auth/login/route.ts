import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";

export async function POST(request: NextRequest) {
    try {
        const { fullName, email, photoURL } = await request.json();
        if (!fullName || !email || !photoURL) {
            return NextResponse.json({ error: "Please enter the required fields!!" }, { status: 400 });
        }
        await dbConnect();
        const emailExists = await UserModel.findOne({ email });
        if (emailExists) {
            return NextResponse.json({ error: "Email already exists!!" }, { status: 400 });
        }
        await UserModel.insertOne({ email, fullName, photoURL });
        return NextResponse.json({ message: "Login successful!!" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to login" }, { status: 500 });
    }
}