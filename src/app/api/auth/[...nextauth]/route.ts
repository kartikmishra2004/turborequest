import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

const handler = NextAuth(authOptions);

export function GET(req: NextRequest) {
    return handler(req, NextResponse);
}

export function POST(req: NextRequest) {
    return handler(req, NextResponse);
}