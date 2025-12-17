import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import ServiceGrid from '../components/ServiceGrid';
import Testimonials from '../components/Testimonials';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products?featured=true')
            .then(res => {
                setFeaturedProducts(res.data.slice(0, 8));
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <Hero />
            {/* Featured Products */}
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-semibold mb-2 block uppercase tracking-wider text-sm">Top Picks</span>
                            <h2 className="text-3xl font-bold text-slate-900">Featured Products</h2>
                        </div>
                        <Link to="/shop" className="text-slate-600 hover:text-primary font-medium flex items-center gap-1 group">
                            View All <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map(product => (
                                <ProductCard key={product.id} product={product} onAdd={() => { }} />
                            ))
                        ) : (
                            <div className="col-span-4 text-center py-12 text-slate-500">
                                Loading products...
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Service Highlights Grid */}
            <ServiceGrid />

            {/* Testimonials Section */}
            <Testimonials />
        </div>
    );
};

export default Home;
