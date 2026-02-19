
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
        type: Number,
        required: [true, 'Please provide a price'],
    },
    location: {
        type: String,
        required: [true, 'Please provide a location'], // e.g., Edappal, Amsakachery
    },
    type: {
        type: String,
        enum: ['House', 'Plot', 'Commercial', 'Vehicle', 'Apartment', 'Villa'],
        required: true,
    },
    status: {
        type: String,
        default: 'For Sale', // e.g., For Sale, For Rent, Leased
    },
    bedrooms: {
        type: Number,
    },
    bathrooms: {
        type: Number,
    },
    area: {
        type: String, // e.g., "1500 Sqft", "10 Cents"
    },
    amenities: {
        type: [String],
    },
    images: {
        type: [String], // URL to images
    },
    featured: {
        type: Boolean,
        default: false,
    },
    contactPhone: {
        type: String,
        default: '9895294949',
    },
}, {
    timestamps: true,
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
