import mongoose from 'mongoose';

const DealSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    originalPrice: {
        type: Number,
        required: true,
    },
    discountedPrice: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
    features: {
        type: [String],
        default: [],
    },
}, { timestamps: true });

export default mongoose.models.Deal || mongoose.model('Deal', DealSchema);
