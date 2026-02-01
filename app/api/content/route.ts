import { NextResponse } from "next/server";
import dbConnect from "@/app/lib/db";
import SiteContent from "@/app/lib/models/SiteContent";

export async function GET() {
    try {
        await dbConnect();
        let content = await SiteContent.findOne();
        if (!content) {
            content = await SiteContent.create({});
        }
        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();

        let content = await SiteContent.findOne();
        if (!content) {
            content = await SiteContent.create(body);
        } else {
            // Update fields individually to allow partial updates
            if (body.hero) content.hero = { ...content.hero, ...body.hero };
            if (body.about) content.about = { ...content.about, ...body.about };
            if (body.contact) content.contact = { ...content.contact, ...body.contact };
            if (body.theme) content.theme = { ...content.theme, ...body.theme };
            if (body.branding) content.branding = { ...content.branding, ...body.branding };
            await content.save();
        }

        return NextResponse.json(content);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update content" }, { status: 500 });
    }
}
