
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    userId: {
        type: String, // Or ObjectId if we linked stricter
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    destinationId: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        required: true,
    },
    approved: {
        type: Boolean,
        default: true, // Auto-approve for now, admin can moderate later
    },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
