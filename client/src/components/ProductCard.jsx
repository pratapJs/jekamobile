import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden group border border-slate-100"
        >
            <div className="relative h-64 overflow-hidden bg-slate-50">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 object-center group-hover:scale-110 transition-transform duration-500"
                />
            </div>
            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">{product.category}</span>
                </div>
                <Link to={`/product/${product.id}`} className="block">
                    <h3 className="font-bold text-lg text-slate-800 mb-1 hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-slate-500 mb-3 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-900">${product.price}</span>
                    <Link to={`/product/${product.id}`} className="text-primary text-sm font-medium hover:underline">View Details</Link>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;
