import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

// Models
import { Product } from './models/Product.js';
import { FAQ } from './models/FAQ.js';
import { Service } from './models/Service.js';
import { Contact } from './models/Contact.js';
import { Admin } from './models/Admin.js';
import { Appointment } from './models/Appointment.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import axios from 'axios';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log('MongoDB Connected');
        // Auto-seed admin if none exists
        try {
            const adminCount = await Admin.countDocuments();
            if (adminCount === 0) {
                await new Admin({ username: 'admin', password: 'admin' }).save();
                console.log('Default admin created');
            }
        } catch (err) {
            console.error('Auto-seed error:', err);
        }
    })
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
    });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
// Ensure uploads directory exists - Disabled for GAE Read-Only FS
// const uploadDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir);
// }

// Multer Config
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Serve Uploads Static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Basic Route
// Basic Route removed to allow React Client to load
// app.get('/', (req, res) => {
//    res.send('Mobile Shop API is running');
// });

// Product Routes
app.get('/api/products', async (req, res) => {
    try {
        const { category, search, featured } = req.query;
        let query = {};

        if (category) {
            query.category = { $regex: new RegExp(category, 'i') };
        }

        if (featured === 'true') {
            query.isFeatured = true;
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } }
            ];
        }

        const products = await Product.find(query);
        // Map _id to id for frontend compatibility
        res.json(products.map(p => ({ ...p.toObject(), id: p._id })));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ ...product.toObject(), id: product._id });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Routes
app.post('/api/products', upload.single('image'), async (req, res) => {
    const productData = req.body;
    if (req.file) {
        // Store relative path for production compatibility
        productData.image = `/uploads/${req.file.filename}`;
    }
    // Handle specs parsing if sent as JSON string from frontend FormData
    if (typeof productData.specs === 'string') {
        try {
            productData.specs = JSON.parse(productData.specs);
        } catch (e) {
            productData.specs = {};
        }
    }

    try {
        const newProduct = new Product(productData);
        await newProduct.save();
        res.json({ ...newProduct.toObject(), id: newProduct._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    const productData = req.body;
    if (req.file) {
        productData.image = `/uploads/${req.file.filename}`;
    }
    // Handle specs parsing
    if (typeof productData.specs === 'string') {
        try {
            productData.specs = JSON.parse(productData.specs);
        } catch (e) {
            // Keep existing if parse fails or handle appropriately
        }
    }

    try {
        productData.updatedAt = Date.now();
        const updated = await Product.findByIdAndUpdate(req.params.id, productData, { new: true });
        if (!updated) return res.status(404).json({ message: 'Product not found' });
        res.json({ ...updated.toObject(), id: updated._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const success = await Product.findByIdAndDelete(req.params.id);
        if (!success) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// FAQ Routes
app.get('/api/faqs', async (req, res) => {
    const faqs = await FAQ.find();
    res.json(faqs.map(f => ({ ...f.toObject(), id: f._id })));
});

app.post('/api/faqs', async (req, res) => {
    const newFaq = new FAQ(req.body);
    await newFaq.save();
    res.json({ ...newFaq.toObject(), id: newFaq._id });
});

app.put('/api/faqs/:id', async (req, res) => {
    const updated = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ ...updated.toObject(), id: updated._id });
});

app.delete('/api/faqs/:id', async (req, res) => {
    await FAQ.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
});

// Contact Routes
app.get('/api/contact', async (req, res) => {
    const contact = await Contact.findOne();
    res.json(contact ? { ...contact.toObject(), id: contact._id } : {});
});

import nodemailer from 'nodemailer';

app.post('/api/contact/message', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!email && !phone) {
        return res.status(400).json({ message: 'Please provide either an Email or Phone Number.' });
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const contactInfo = [];
    if (email) contactInfo.push(`Email: ${email}`);
    if (phone) contactInfo.push(`Phone: ${phone}`);

    const mailOptions = {
        from: email || process.env.EMAIL_USER, // Use shop email if no user email
        to: process.env.EMAIL_USER,
        subject: `New Message from ${name} - Mobile Shop`,
        text: `Name: ${name}\n${contactInfo.join('\n')}\n\nMessage:\n${message}`,
        replyTo: email || undefined
    };

    try {
        await transporter.sendMail(mailOptions);

        // Also save to database
        const newAppointment = new Appointment({
            name,
            email,
            phone,
            deviceModel: "Enquiry", // Default or extract if passed
            description: message
        });
        // Try to parse message for model if standard format
        if (message.startsWith("Device Model:")) {
            const lines = message.split('\n');
            const modelLine = lines.find(l => l.startsWith("Device Model:"));
            if (modelLine) newAppointment.deviceModel = modelLine.replace("Device Model:", "").trim();
        }

        console.log('Attempting to save Appointment at /api/contact/message');
        console.log('Appointment Model Name:', Appointment.modelName);
        console.log('New Appointment Data:', newAppointment);

        await newAppointment.save();
        console.log('Appointment saved successfully');

        res.json({ message: 'Email sent and appointment saved' });
    } catch (error) {
        console.error('Email/DB error details:', error);
        console.error('Error Stack:', error.stack);
        // Even if email fails, try to save to DB? For now fail both to be safe
        res.status(500).json({ message: 'Failed to process request', error: error.toString() });
    }
});

// Appointment Routes
app.get('/api/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.patch('/api/appointments/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updated = await Appointment.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/stats', async (req, res) => {
    try {
        const products = await Product.countDocuments();
        const services = await Service.countDocuments();
        const appointments = await Appointment.countDocuments({ status: 'Pending' });
        res.json({ products, services, appointments });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/contact', async (req, res) => {
    let contact = await Contact.findOne();
    if (contact) {
        contact = await Contact.findByIdAndUpdate(contact._id, req.body, { new: true });
    } else {
        contact = new Contact(req.body);
        await contact.save();
    }
    res.json({ ...contact.toObject(), id: contact._id });
});

// Services Routes
app.get('/api/services', async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services.map(s => ({ ...s.toObject(), id: s._id })));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/services', async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.json({ ...newService.toObject(), id: newService._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/services/:id', async (req, res) => {
    try {
        const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ ...updated.toObject(), id: updated._id });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/services/:id', async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




// Reviews Route (Proxy to Google Places API)
let reviewsCache = {
    data: null,
    timestamp: 0
};

app.get('/api/reviews', async (req, res) => {
    // Check cache (1 hour)
    const CACHE_DURATION = 60 * 60 * 1000;
    if (reviewsCache.data && (Date.now() - reviewsCache.timestamp < CACHE_DURATION)) {
        return res.json(reviewsCache.data);
    }

    const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
    const PLACE_ID = process.env.GOOGLE_PLACE_ID;

    if (!API_KEY || !PLACE_ID) {
        return res.status(500).json({ message: 'Server missing Google API credentials' });
    }

    try {
        const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews,user_ratings_total&key=${API_KEY}`);

        if (response.data.status === 'OK') {
            const result = response.data.result;
            const data = {
                rating: result.rating,
                total: result.user_ratings_total,
                reviews: result.reviews.map(r => ({
                    id: r.time, // Use timestamp as ID
                    name: r.author_name,
                    rating: r.rating,
                    date: r.relative_time_description,
                    text: r.text,
                    initial: r.author_name.charAt(0),
                    source: 'google',
                    photo: r.profile_photo_url
                }))
            };

            // Update cache
            reviewsCache = {
                data: data,
                timestamp: Date.now()
            };

            res.json(data);
        } else {
            console.error('Google API Error:', response.data);
            res.status(500).json({ message: 'Failed to fetch from Google' });
        }
    } catch (err) {
        console.error('Reviews Fetch Error:', err.message);
        res.status(500).json({ message: err.message });
    }
});

// Auth Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (admin && admin.password === password) {
            res.json({ success: true, token: 'demo-token-123' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/admin/profile', async (req, res) => {
    const { username, password, newPassword } = req.body;
    try {
        const admin = await Admin.findOne({ username });
        if (!admin || admin.password !== password) {
            return res.status(401).json({ message: 'Invalid current credentials' });
        }

        admin.password = newPassword;
        await admin.save();
        res.json({ message: 'Profile updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Seed Route (Temporary for Dev)
app.post('/api/seed', async (req, res) => {
    const products = [
        {
            name: "iPhone 15 Pro",
            brand: "Apple",
            price: 999,
            category: "Mobile",
            image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&q=80&w=800",
            description: "The ultimate iPhone with Titanium design.",
            specs: { screen: "6.1 inch", chip: "A17 Pro", storage: "128GB" }
        },
        {
            name: "Samsung Galaxy S24 Ultra",
            brand: "Samsung",
            price: 1199,
            category: "Mobile",
            image: "https://images.unsplash.com/photo-1706606991536-e3538b2b7372?auto=format&fit=crop&q=80&w=800",
            description: "Galaxy AI is here.",
            specs: { screen: "6.8 inch", chip: "Snapdragon 8 Gen 3", storage: "256GB" }
        },
        {
            name: "AirPods Pro 2",
            brand: "Apple",
            price: 249,
            category: "Accessories",
            image: "https://images.unsplash.com/photo-1604054923518-e499a1a695a9?auto=format&fit=crop&q=80&w=800",
            description: "Rich sound. Intelligent noise cancellation.",
            specs: { type: "Headphones" }
        }
    ];

    const faqs = [
        { q: "What is your warranty policy?", a: "We offer a 1-year official warranty on all devices." },
        { q: "How long do repairs take?", a: "Most repairs are done within 1-2 hours." }
    ];

    const services = [
        { title: "Screen Replacement", price: "$49+", description: "Cracked screen replacement" },
        { title: "Battery Replacement", price: "$29+", description: "New battery installation" },
        { title: "Hardware Repair", price: "$39+", description: "Port, button, and sensor repairs" },
        { title: "Software Issues", price: "$19+", description: "OS reinstallation and updates" }
    ];

    const contact = {
        address: "JEKA MOBILE AND REPAIR SHOP, SYDNEY, AUSTRALIA",
        phone: "+1 (555) 123-4567",
        email: "jekamobilerepair@gmail.com"
    };

    // Actual seed
    await Product.deleteMany({});
    await FAQ.deleteMany({});
    await Service.deleteMany({});
    await Contact.deleteMany({});
    await Admin.deleteMany({});

    // Create default admin if not exists
    const adminExists = await Admin.findOne();
    if (!adminExists) {
        await new Admin({ username: 'admin', password: 'admin' }).save();
    }

    await Product.insertMany(products);
    await FAQ.insertMany(faqs);
    await Service.insertMany(services);
    await new Contact(contact).save();

    res.json({ message: 'Seeded successfully' });
});

// Serve React App in Production
const clientDist = path.join(__dirname, 'dist');
if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientDist, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
