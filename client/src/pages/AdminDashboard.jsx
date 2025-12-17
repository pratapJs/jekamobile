import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, Package, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('products');
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('isAdmin')) navigate('/login');
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 py-12">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-2">
                        <Package /> Admin Dashboard
                    </h1>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-slate-200 overflow-x-auto pb-1">
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'products' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('faq')}
                        className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'faq' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        FAQ
                    </button>
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'services' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Repair Services
                    </button>
                    <button
                        onClick={() => setActiveTab('contact')}
                        className={`pb-4 px-4 font-medium transition-colors ${activeTab === 'contact' ? 'text-primary border-b-2 border-primary' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Contact Details
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'products' && <ProductManager />}
                {activeTab === 'faq' && <FAQManager />}
                {activeTab === 'services' && <ServiceManager />}
                {activeTab === 'contact' && <ContactManager />}
            </div>
        </div>
    );
};

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [formData, setFormData] = useState({
        name: '', brand: '', price: '', category: 'Mobile', image: '', description: '', specs: {}, isFeatured: false
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => { fetchProducts(); }, []);

    const fetchProducts = async () => {
        const res = await axios.get('/api/products');
        setProducts(res.data);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            await axios.delete(`/api/products/${id}`);
            fetchProducts();
        }
    };

    const handleEdit = (product) => {
        setIsEditing(true);
        setCurrentProduct(product);
        setFormData({ ...product, isFeatured: product.isFeatured || false });
        setImageFile(null); // Reset file on edit start
    };

    const handleChange = (e) => {
        if (e.target.name === 'imageFile') {
            setImageFile(e.target.files[0]);
        } else if (e.target.type === 'checkbox') {
            setFormData({ ...formData, [e.target.name]: e.target.checked });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('name', formData.name);
        data.append('brand', formData.brand);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('description', formData.description);
        data.append('specs', JSON.stringify(formData.specs)); // Stringify object for FormData
        data.append('isFeatured', formData.isFeatured);

        // If image file is selected, append it
        if (imageFile) {
            data.append('image', imageFile);
        } else {
            // Otherwise keep the existing URL string
            data.append('image', formData.image);
        }

        try {
            if (isEditing) {
                await axios.put(`/api/products/${currentProduct.id}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('/api/products', data, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            setIsEditing(false);
            setCurrentProduct(null);
            setFormData({ name: '', brand: '', price: '', category: 'Mobile', image: '', description: '', specs: {}, isFeatured: false });
            setImageFile(null);
            fetchProducts();
        } catch (err) { console.error(err); }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
                    <h2 className="text-xl font-bold mb-6">{isEditing ? 'Edit Product' : 'Add Product'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                        <input type="text" name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                        <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" required />
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg">
                            <option value="Mobile">Mobile</option>
                            <option value="Accessories">Accessories</option>
                        </select>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="isFeatured"
                                id="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                className="w-5 h-5 accent-primary"
                            />
                            <label htmlFor="isFeatured" className="text-sm font-medium text-slate-700">Feature this product</label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Image Upload</label>
                            <input type="file" name="imageFile" onChange={handleChange} className="w-full px-4 py-2 border rounded-lg mb-2" accept="image/*" />
                            <p className="text-xs text-slate-500 text-center">- OR -</p>
                            <input type="text" name="image" placeholder="Image URL (Optional if uploading)" value={formData.image} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg mt-2" />
                        </div>

                        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg" rows="3"></textarea>
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-primary text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors">{isEditing ? 'Update' : 'Create'}</button>
                            {isEditing && <button type="button" onClick={() => { setIsEditing(false); setFormData({ name: '', brand: '', price: '', category: 'Mobile', image: '', description: '', specs: {}, isFeatured: false }); setImageFile(null); }} className="px-4 border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>}
                        </div>
                    </form>
                </div>
            </div>
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase text-xs">
                            <tr><th className="p-4">Product</th><th className="p-4">Price</th><th className="p-4">Category</th><th className="p-4 text-right">Actions</th></tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {products.map(product => (
                                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="p-4"><div className="flex items-center gap-3"><img src={product.image} alt="" className="w-10 h-10 rounded bg-slate-100 object-cover" /><span className="font-medium text-slate-900">{product.name}</span></div></td>
                                    <td className="p-4 text-slate-600">${product.price}</td>
                                    <td className="p-4 text-slate-600"><span className="bg-blue-50 text-primary px-2 py-1 rounded text-xs font-bold">{product.category}</span></td>
                                    <td className="p-4"><div className="flex justify-end gap-2"><button onClick={() => handleEdit(product)} title="Edit" className="p-2 text-slate-400 hover:text-primary transition-colors"><Edit2 size={18} /></button><button onClick={() => handleDelete(product.id)} title="Delete" className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button></div></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const FAQManager = () => {
    const [faqs, setFaqs] = useState([]);
    const [formData, setFormData] = useState({ q: '', a: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { fetchFaqs(); }, []);

    const fetchFaqs = async () => {
        const res = await axios.get('/api/faqs');
        setFaqs(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await axios.put(`/api/faqs/${editingId}`, formData);
        } else {
            await axios.post('/api/faqs', formData);
        }
        setFormData({ q: '', a: '' });
        setEditingId(null);
        fetchFaqs();
    };

    const handleEdit = (faq) => {
        setFormData({ q: faq.q, a: faq.a });
        setEditingId(faq.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this FAQ?')) {
            await axios.delete(`/api/faqs/${id}`);
            fetchFaqs();
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit FAQ' : 'Add FAQ'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Question" value={formData.q} onChange={e => setFormData({ ...formData, q: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                        <textarea placeholder="Answer" rows="4" value={formData.a} onChange={e => setFormData({ ...formData, a: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-primary text-white py-2 rounded-lg font-bold">{editingId ? 'Update' : 'Add'}</button>
                            {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ q: '', a: '' }); }} className="px-4 border rounded-lg">Cancel</button>}
                        </div>
                    </form>
                </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
                {faqs.map(faq => (
                    <div key={faq.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-start group">
                        <div>
                            <h3 className="font-bold text-slate-900">{faq.q}</h3>
                            <p className="text-slate-600 mt-1">{faq.a}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(faq)} title="Edit" className="p-2 text-slate-400 hover:text-primary"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(faq.id)} title="Delete" className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({ title: '', price: '', description: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => { fetchServices(); }, []);

    const fetchServices = async () => {
        const res = await axios.get('/api/services');
        setServices(res.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`/api/services/${editingId}`, formData);
            } else {
                await axios.post('/api/services', formData);
            }
            setFormData({ title: '', price: '', description: '' });
            setEditingId(null);
            fetchServices();
        } catch (err) { console.error(err); }
    };

    const handleEdit = (service) => {
        setFormData({ title: service.title, price: service.price, description: service.description || '' });
        setEditingId(service.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this service?')) {
            await axios.delete(`/api/services/${id}`);
            fetchServices();
        }
    };

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 sticky top-24">
                    <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Service' : 'Add Service'}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Service Title" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                        <input type="text" placeholder="Price (e.g. $49+)" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2 border rounded-lg" required />
                        <textarea placeholder="Description" rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border rounded-lg"></textarea>
                        <div className="flex gap-2">
                            <button type="submit" className="flex-1 bg-primary text-white py-2 rounded-lg font-bold">{editingId ? 'Update' : 'Add'}</button>
                            {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', price: '', description: '' }); }} className="px-4 border rounded-lg">Cancel</button>}
                        </div>
                    </form>
                </div>
            </div>
            <div className="lg:col-span-2 space-y-4">
                {services.map(service => (
                    <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex justify-between items-center group">
                        <div>
                            <h3 className="font-bold text-slate-900">{service.title}</h3>
                            <p className="text-primary font-bold">{service.price}</p>
                            <p className="text-sm text-slate-500">{service.description}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(service)} title="Edit" className="p-2 text-slate-400 hover:text-primary"><Edit2 size={18} /></button>
                            <button onClick={() => handleDelete(service.id)} title="Delete" className="p-2 text-slate-400 hover:text-red-500"><Trash2 size={18} /></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ContactManager = () => {
    const [formData, setFormData] = useState({ address: '', phone: '', email: '' });

    useEffect(() => {
        axios.get('/api/contact').then(res => {
            if (res.data) setFormData({
                address: res.data.address || '',
                phone: res.data.phone || '',
                email: res.data.email || ''
            });
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/contact', formData);
        alert('Contact details updated!');
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6">Manage Contact Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                    <input type="text" value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border rounded-lg" />
                </div>
                <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors">
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default AdminDashboard;
