import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    if (body.test === true) {
        return NextResponse.json({ success: true, message: "Dummy API response" }, { status: 200 });
    }
    return NextResponse.json({ success: false }, { status: 400 });
}