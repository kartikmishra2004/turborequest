import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";
import { auth } from "@/auth";

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized!!" }, { status: 401 });
    }
    try {
        const { name, email } = await request.json();
        if (!name || !email) {
            return NextResponse.json({ error: "Please enter the required fields!!" }, { status: 400 });
        }
        await dbConnect();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist!!" }, { status: 404 });
        }
        await User.findOneAndUpdate({ email: email }, { $push: { collections: { name: name } } });
        return NextResponse.json({ message: "Collection created successfully!!" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Failed to create collection!!" }, { status: 500 });
    }
} 