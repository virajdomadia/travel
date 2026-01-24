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
        type: String, // Storing Base64 string directly
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
    amenities: {
        type: [String],
        default: [],
    },
    hotelType: {
        type: String,
        enum: ['Luxury', 'Boutique', 'Resort', 'Homestay'],
        default: 'Luxury',
    },
    stops: {
        type: String,
        default: 'Non-stop',
    },
    // New MakeMyTrip-style fields
    gallery: [String],
    inclusions: [String],
    exclusions: [String],
    policies: mongoose.Schema.Types.Mixed,
    itinerary: [mongoose.Schema.Types.Mixed],
}, { timestamps: true, strict: false });

export default mongoose.models.Destination || mongoose.model('Destination', DestinationSchema);
