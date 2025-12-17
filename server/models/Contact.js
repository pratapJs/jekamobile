import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    address: { type: String },
    phone: { type: String },
    email: { type: String },
    updatedAt: { type: Date, default: Date.now }
});

export const Contact = mongoose.model('Contact', contactSchema);
