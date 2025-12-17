import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { Filter } from 'lucide-react';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category'); // 'mobile' or 'accessories' or null
    const search = searchParams.get('search');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = '/api/products';
                const params = new URLSearchParams();
                if (category) params.append('category', category);
                if (search) params.append('search', search);

                if (Array.from(params).length > 0) {
                    url += `?${params.toString()}`;
                }

                const res = await axios.get(url);
                setProducts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProducts();
    }, [category, search]);

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 capitalize">
                            {search ? `Search Results: "${search}"` : (category ? `${category}s` : 'All Products')}
                        </h1>
                        <p className="text-slate-500 mt-2">Showing {products.length} results</p>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-primary hover:text-primary transition-colors">
                        <Filter size={18} /> Filter
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.length > 0 ? (
                        products.map(product => (
                            <ProductCard key={product.id} product={product} onAdd={() => { }} />
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-slate-500">
                            No products found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
