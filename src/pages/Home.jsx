import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import FilterSortBar from '../components/FilterSortBar';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sort, setSort] = useState('');
  const [priceRange, setPriceRange] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(res => {
        setProducts(res.data);
        setFiltered(res.data);
      });
    axios.get('https://fakestoreapi.com/products/categories')
      .then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    let temp = [...products];
    if (selectedCategory) {
      temp = temp.filter(p => p.category === selectedCategory);
    }
    temp = temp.filter(p => p.price <= priceRange);

    if (sort === 'price-asc') temp.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') temp.sort((a, b) => b.price - a.price);
    else if (sort === 'name-asc') temp.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === 'name-desc') temp.sort((a, b) => b.title.localeCompare(a.title));
    else if (sort === 'popularity-desc') temp.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));

    setFiltered(temp);
    setCurrentPage(1);
  }, [selectedCategory, sort, priceRange, products]);

  const start = (currentPage - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  return (
    <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="col-span-12 md:col-span-3 bg-white shadow rounded p-4">
        <FilterSortBar
          categories={categories}
          selectedCategory={selectedCategory}
          setCategory={setSelectedCategory}
          sort={sort}
          setSort={setSort}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />
      </aside>

      {/* Product Grid */}
      <main className="col-span-12 md:col-span-9">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginated.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded ${i + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 bg-gray-300 rounded"
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}
