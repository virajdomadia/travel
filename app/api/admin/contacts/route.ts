import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Contact from "@/app/lib/models/Contact";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const contacts = await Contact.find({}).sort({ createdAt: -1 });
        return NextResponse.json(contacts);
    } catch (error) {
        console.error("Fetch Contacts Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
