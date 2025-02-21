import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/model/User.model";
import { auth } from "@/auth";

export async function PUT(request: NextRequest) {
    const session = await auth();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized!!" }, { status: 401 });
    }
    try {
        const { email, collectionName, requestName, type, method, URL, headers, body } = await request.json();
        if (!email || !collectionName || !requestName) {
            return NextResponse.json({ error: "Please enter the required fields!!" }, { status: 400 });
        }
        await dbConnect();
        const user = await User.findOne({ email: email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist!!" }, { status: 404 });
        }
        const collection = user.collections.find(collection => collection.name === collectionName);
        if (!collection) {
            return NextResponse.json({ error: "Collection does not exist!!" }, { status: 404 });
        }
        const req = collection.requests.find(req => req.name === requestName);
        if (!req) {
            return NextResponse.json({ error: "Request does not exist!!" }, { status: 404 });
        }
        req.type = type || req.type;
        req.method = method || req.method;
        req.URL = URL || req.URL;
        req.headers = headers || req.headers;
        req.body = body || req.body;
        await user.save();
        return NextResponse.json({ message: "Request updated successfully!!" });
    } catch {
        return NextResponse.json({ error: "Failed to update request!!" }, { status: 500 });
    }
}