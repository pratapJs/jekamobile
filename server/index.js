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

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

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
app.get('/', (req, res) => {
    res.send('Mobile Shop API is running');
});

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
    const { name, email, message } = req.body;

    // Create transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER, // Send TO the shop email
        subject: `New Message from ${name} - Mobile Shop`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Email error:', error);
        res.status(500).json({ message: 'Failed to send email' });
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
    const services = await Service.find();
    res.json(services.map(s => ({ ...s.toObject(), id: s._id })));
});

app.post('/api/services', async (req, res) => {
    const newService = new Service(req.body);
    await newService.save();
    res.json({ ...newService.toObject(), id: newService._id });
});

app.put('/api/services/:id', async (req, res) => {
    const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ ...updated.toObject(), id: updated._id });
});

app.delete('/api/services/:id', async (req, res) => {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
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

    await Product.insertMany(products);
    await FAQ.insertMany(faqs);
    await Service.insertMany(services);
    await new Contact(contact).save();

    res.json({ message: 'Seeded successfully' });
});

// Serve React App in Production
const clientDist = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientDist)) {
    app.use(express.static(clientDist));
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientDist, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
