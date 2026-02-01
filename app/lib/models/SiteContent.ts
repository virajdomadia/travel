import mongoose from "mongoose";

const SiteContentSchema = new mongoose.Schema({
    hero: {
        title: { type: String, default: "Soul of" },
        subtitle: { type: String, default: "India" },
        bgImage: { type: String, default: "/hero.png" },
    },
    about: {
        title: { type: String, default: "Your Trusted Travel Partner" },
        description: { type: String, default: "At TravelDCT, we believe that travel is more than just visiting a place—it's about the experience, the memories, and the transformation that happens along the way." },
        image: { type: String, default: "/swiss-alps.png" }
    },
    contact: {
        email: { type: String, default: "contact@traveldct.com" },
        phone: { type: String, default: "+91 98765 43210" },
        address: { type: String, default: "Mumbai, India" },
        socials: {
            instagram: { type: String, default: "#" },
            twitter: { type: String, default: "#" },
            facebook: { type: String, default: "#" }
        }
    },
    theme: {
        primaryColor: { type: String, default: "#3b82f6" }, // blue-500
        secondaryColor: { type: String, default: "#f97316" }, // orange-500
        accentColor: { type: String, default: "#10b981" }, // emerald-500
        backgroundColor: { type: String, default: "#0f172a" }, // slate-900
        textColor: { type: String, default: "#ffffff" },
        fontHeading: { type: String, default: "Inter" },
        fontBody: { type: String, default: "Inter" },
        radius: { type: String, default: "0.5rem" }
    },
    branding: {
        siteName: { type: String, default: "TravelDCT" },
        logoUrl: { type: String, default: "/logo.png" },
        faviconUrl: { type: String, default: "/favicon.ico" }
    }
}, { timestamps: true });

export default mongoose.models.SiteContent || mongoose.model("SiteContent", SiteContentSchema);
