import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Star, Truck, Shield, Check } from 'lucide-react';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`/api/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!product) return <div className="h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="py-12 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Image */}
                        <div className="bg-slate-50 rounded-xl overflow-hidden h-[400px] md:h-[500px]">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Info */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs font-bold text-primary bg-blue-50 px-3 py-1 rounded-full uppercase tracking-wider">{product.category}</span>
                                <div className="flex items-center text-amber-400">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-sm text-slate-500 ml-1 font-medium">4.5 (120 reviews)</span>
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
                            <p className="text-slate-500 mb-8 leading-relaxed text-lg">{product.description}</p>

                            <div className="text-3xl font-bold text-slate-900 mb-8">${product.price}</div>

                            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8 text-primary">
                                <p className="font-semibold text-lg">Visit our store to purchase this item.</p>
                                <p className="text-sm opacity-80">We are located at 123 Tech Street, Silicon Valley.</p>
                            </div>

                            {/* Specs */}
                            <div className="border-t border-slate-100 pt-8">
                                <h3 className="font-bold text-slate-900 mb-4">Technical Specifications</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {product.specs && Object.entries(product.specs).map(([key, value]) => (
                                        <div key={key} className="flex flex-col">
                                            <span className="text-sm text-slate-500 capitalize">{key}</span>
                                            <span className="font-medium text-slate-900">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-2 gap-4 mt-8">
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Shield size={20} className="text-primary" /> 2 Year Warranty
                                </div>
                                <div className="flex items-center gap-3 text-sm text-slate-600">
                                    <Check size={20} className="text-primary" /> In Stock
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
