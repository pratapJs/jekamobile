import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    noticeText: { type: String, default: '' },
    showNotice: { type: Boolean, default: false },
    openingHours: [{
        day: { type: String },
        isOpen: { type: Boolean, default: true },
        start: { type: String, default: '09:00' },
        end: { type: String, default: '17:00' }
    }],
    updatedAt: { type: Date, default: Date.now }
});

export const Contact = mongoose.model('Contact', contactSchema);
