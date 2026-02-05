import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
    },
    mobile: {
        type: String,
        required: [true, "Please provide a mobile number"],
    },
    destination: {
        type: String,
        required: [true, "Please provide a destination"],
    },
    message: {
        type: String,
        required: [true, "Please provide a message"],
    },
    status: {
        type: String,
        enum: ["New", "Read", "Replied"],
        default: "New",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
