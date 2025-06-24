import React from 'react';

export default function FilterSortBar({
    categories,
    selectedCategory,
    setCategory,
    sort,
    setSort,
    priceRange,
    setPriceRange
}) {
    return (
        <div className="space-y-4 text-sm">

            {/* Category Filter */}
            <div>
                <label className="block font-medium mb-1">Category</label>
                <select
                    className="p-2 border rounded"
                    value={selectedCategory}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* Sort Option */}
            <div>
                <label className="block font-medium mb-1">Sort By</label>
                <select
                    className="p-2 border rounded"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort By</option>
                    <option value="price-asc">Price Low to High</option>
                    <option value="price-desc">Price High to Low</option>
                    <option value="name-asc">Name A-Z</option>
                    <option value="name-desc">Name Z-A</option>
                    <option value="popularity-desc">Most Popular</option>
                </select>
            </div>


            {/* Price Range Filter */}
            <div className="flex items-center gap-2">
                <label className="block font-medium mb-1">Max Price: ${priceRange}</label>
                <input
                    type="range"
                    id="priceRange"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                />
                <span>${priceRange}</span>
            </div>
        </div>
    );
}
