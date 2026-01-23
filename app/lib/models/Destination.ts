import mongoose from 'mongoose';

const DestinationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    lat: {
        type: Number,
        required: true, // Assuming lat/lng are required
    },
    lng: {
        type: Number,
        required: true,
    },
    tags: {
        type: [String],
        default: [],
    },
    category: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export default mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
