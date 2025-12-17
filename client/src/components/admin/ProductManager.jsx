import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2 } from 'lucide-react';

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

export default ProductManager;
