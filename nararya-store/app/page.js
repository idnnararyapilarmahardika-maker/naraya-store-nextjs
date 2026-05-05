'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import SkeletonCard from '@/components/SkeletonCard';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['all']);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState(4);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('https://dummyjson.com/products?limit=100');
                const data = await res.json();
                setProducts(data.products);
                const uniqueCats = ['all', ...new Set(data.products.map(p => p.category))];
                setCategories(uniqueCats);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const displayedProducts = filteredProducts.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 4);
    };

    const handleCategoryChange = (cat) => {
        setSelectedCategory(cat);
        setVisibleCount(4);
    };

    return (
        <main className="p-6 md:p-12 max-w-7xl mx-auto bg-gray-50 min-h-screen">
            <header className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2"> Nararya Store</h1>
                <p className="text-gray-500">Tugas Fullstack: Filter, Load More & Skeleton</p>
            </header>

            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => handleCategoryChange(cat)}
                        className={`px-5 py-2 rounded-full text-sm font-medium transition-all capitalize ${selectedCategory === cat
                                ? 'bg-black text-white shadow-lg scale-105'
                                : 'bg-white text-gray-600 hover:bg-gray-200 border'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    [...Array(4)].map((_, index) => (
                        <SkeletonCard key={index} />
                    ))
                ) : (
                    displayedProducts.map((product) => (
                        <div key={product.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            <div className="relative h-48 overflow-hidden bg-gray-100">
                                <img src={product.thumbnail} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="p-4">
                                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{product.category}</span>
                                <h3 className="mt-2 text-lg font-bold text-gray-900 line-clamp-2 h-14">{product.title}</h3>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xl font-bold text-green-600">${product.price}</span>
                                    <Link href={`/posts/${product.id}`} className="text-sm bg-gray-900 text-white px-3 py-1 rounded hover:bg-gray-700 transition">
                                        Lihat Detail
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {!isLoading && displayedProducts.length < filteredProducts.length && (
                <div className="mt-12 text-center">
                    <button onClick={handleLoadMore} className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition shadow-md active:scale-95">
                        Muat Lebih Banyak (+4)
                    </button>
                </div>
            )}
        </main>
    );
}