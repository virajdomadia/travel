import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import Contact from "@/app/lib/models/Contact";

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newContact = await Contact.create({
            name,
            email,
            message,
        });

        return NextResponse.json({ success: true, contact: newContact }, { status: 201 });
    } catch (error) {
        console.error("Contact Submission Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
