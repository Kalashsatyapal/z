import React from 'react';

export default function ProductCard({ product }) {
  return (
    <div className="w-64 h-80 bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={product.imageUrl || '/default-image.jpg'} // Use default image if no image exists
        alt={product.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-indigo-700">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-lg font-semibold text-purple-600 mt-4">${product.price}</p>
      </div>
    </div>
  );
}
