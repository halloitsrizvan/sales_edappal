
import mongoose from 'mongoose';

const SettingsSchema = new mongoose.Schema({
    phone: {
        type: String,
        default: '9895294949',
    },
    whatsapp: {
        type: String,
        default: '9895294949',
    },
    address: {
        type: String,
        default: 'Amsakachery, Edappal',
    },
    email: {
        type: String,
        default: 'salesedappal@gmail.com',
    },
    lastReadNotificationsAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

// Force re-register model to pick up schema changes in dev
if (process.env.NODE_ENV === 'development') {
    delete mongoose.models.Settings;
}

export default mongoose.models.Settings || mongoose.model('Settings', SettingsSchema);
