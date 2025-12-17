import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    q: { type: String, required: true },
    a: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const FAQ = mongoose.model('FAQ', faqSchema);
