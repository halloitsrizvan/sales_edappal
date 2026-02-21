
import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        maxlength: 100,
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
    },
    price: {
        type: String, // Keep as string for display format like "45 Lakhs"
    },
    priceAmount: {
        type: Number, // For sorting/filtering
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    type: {
        type: String, // House, Plot, Commercial, etc.
        required: true,
    },
    status: {
        type: String, // For Sale, Sold, Rent
        default: 'For Sale',
    },
    area: String,
    beds: Number,
    baths: Number,
    parking: String,
    age: String,
    amenities: [String],
    images: [String], // Array of image URLs
    featured: {
        type: Boolean,
        default: false,
    },
    viewCount: {
        type: Number,
        default: 0,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    ownerName: String,
    ownerPhone: String,
    paymentScreenshot: String,
}, {
    timestamps: true,
});

// Force re-register model to pick up schema changes in dev
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Property;
}

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
