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
    }
}, { timestamps: true });

export default mongoose.models.SiteContent || mongoose.model("SiteContent", SiteContentSchema);
