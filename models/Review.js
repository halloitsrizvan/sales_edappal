
import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
    },
    email: {
        type: String,
    },
    rating: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    text: {
        type: String,
        required: [true, 'Please provide your feedback'],
    },
    showInPage: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
