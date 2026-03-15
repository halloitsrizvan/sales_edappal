import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
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

const SiteSettings = mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);
export default SiteSettings;
