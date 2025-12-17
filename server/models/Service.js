import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String },
    category: { type: String }, // e.g. "Screen Repair"
    device: { type: String },   // e.g. "iPhone"
    createdAt: { type: Date, default: Date.now }
});

export const Service = mongoose.model('Service', serviceSchema);
