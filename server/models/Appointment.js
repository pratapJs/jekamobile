import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String }, // Not required if phone present
    phone: { type: String },
    deviceModel: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Completed', 'Cancelled'], default: 'Pending' },
    date: { type: Date, default: Date.now }
});

export const Appointment = mongoose.model('Appointment', appointmentSchema);
