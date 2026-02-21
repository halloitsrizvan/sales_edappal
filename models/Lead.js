
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
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Force re-register model to pick up schema changes in dev
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Lead;
}

export default mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
