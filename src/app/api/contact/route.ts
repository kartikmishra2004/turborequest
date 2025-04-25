import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Contact from "@/model/Contact.model";

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json();
        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "Please enter the required fields!!" }, { status: 400 });
        }
        await dbConnect();
        Contact.insertOne({ name, email, subject, message });
        return NextResponse.json({ message: "message sent successfully!!" }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Failed to send message!!" }, { status: 500 });
    }
}