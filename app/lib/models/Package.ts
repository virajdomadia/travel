import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, default: 0 },
    duration: { type: String, required: true },
    date: { type: Date },
    lat: { type: Number },
    lng: { type: Number },

    // Optional/Legacy fields
    category: { type: String },
    tags: [{ type: String }],
    amenities: [{ type: String }],
    hotelType: { type: String, enum: ['Luxury', 'Boutique', 'Resort', 'Homestay'], default: 'Luxury' },
    stops: { type: String, default: 'Non-stop' },

    // MakeMyTrip-style fields
    gallery: [String],
    inclusions: [String],
    exclusions: [String],
    policies: mongoose.Schema.Types.Mixed,
    itinerary: [mongoose.Schema.Types.Mixed],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
}, { timestamps: true, strict: false });

export default mongoose.models.Package || mongoose.model('Package', PackageSchema);
