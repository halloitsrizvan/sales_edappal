
import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide a phone number'],
    },
    email: {
        type: String,
    },
    propertyId: {
        type: String,
    },
    message: {
        type: String,
    },
    contacted: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'Checked', 'Rejected'],
        default: 'New',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
