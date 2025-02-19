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
        const { name, type, method, URL, headers, body, email, collectionName } = await request.json();
        if (!name || !type || !method || !URL || !headers || !body || !email || !collectionName) {
            return NextResponse.json({ error: "Please enter the required fields!!" }, { status: 400 });
        }
        await dbConnect();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist!!" }, { status: 404 });
        }
        const collection = user.collections.some(collection => collection.name === collectionName);
        if (!collection) {
            return NextResponse.json({ error: "Collection does not exist!!" }, { status: 404 });
        }
        await User.findOneAndUpdate({ email: email, "collections.name": collectionName }, { $push: { "collections.$.requests": { name: name, type: type, method: method, URL: URL, headers: headers, body: body } } }, { new: true });
        return NextResponse.json({ message: "Request created successfully!!" }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Failed to create request!!" }, { status: 500 });
    }
}